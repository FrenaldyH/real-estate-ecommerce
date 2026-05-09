package service

import (
	"context"
	"fmt"
	"log/slog"
	"strings"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/dto"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/repository"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/gemini"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
	"github.com/pgvector/pgvector-go"
)

// ─── Interface ────────────────────────────────────────────────────────────────

type AIService interface {
	// Chat answers a user question using RAG: embed → search → generate.
	Chat(ctx context.Context, req dto.ChatRequest) (*dto.ChatResponse, error)

	// IndexProperties fetches all properties from DB, embeds them, and stores in knowledge_chunks.
	IndexProperties(ctx context.Context) error

	// IndexFAQ embeds static FAQ entries and stores them in knowledge_chunks.
	IndexFAQ(ctx context.Context) error

	// IndexBusinessContext embeds static business knowledge and stores in knowledge_chunks.
	IndexBusinessContext(ctx context.Context) error
}

// ─── Implementation ───────────────────────────────────────────────────────────

type aiService struct {
	gemini        *gemini.Client
	knowledgeRepo repository.KnowledgeRepository
	propertyRepo  repository.PropertyRepository
}

func NewAIService(
	geminiClient *gemini.Client,
	knowledgeRepo repository.KnowledgeRepository,
	propertyRepo repository.PropertyRepository,
) AIService {
	return &aiService{
		gemini:        geminiClient,
		knowledgeRepo: knowledgeRepo,
		propertyRepo:  propertyRepo,
	}
}

// ─── Chat (RAG pipeline) ─────────────────────────────────────────────────────

func (s *aiService) Chat(ctx context.Context, req dto.ChatRequest) (*dto.ChatResponse, error) {
	// [1] Embed user query into a 768-dim vector
	queryEmbedding, err := s.gemini.Embed(ctx, req.Message)
	if err != nil {
		logger.Log.Error("failed to embed user query", slog.String("error", err.Error()))
		return nil, fmt.Errorf("failed to process your question")
	}

	// [2] Retrieve top-5 most relevant knowledge chunks by cosine distance
	chunks, err := s.knowledgeRepo.SimilaritySearch(pgvector.NewVector(queryEmbedding), 5)
	if err != nil {
		logger.Log.Error("similarity search failed", slog.String("error", err.Error()))
		return nil, fmt.Errorf("failed to retrieve knowledge")
	}

	// [3] Compose grounded context from retrieved chunks
	retrievedContext := buildContext(chunks)

	// [4] Build system prompt with injected context
	systemPrompt := buildSystemPrompt(retrievedContext)

	// [5] Map history DTO → gemini.ChatMessage (Gemini uses "model" not "assistant")
	var history []gemini.ChatMessage
	for _, h := range req.History {
		role := h.Role
		if role == "assistant" {
			role = "model"
		}
		history = append(history, gemini.ChatMessage{
			Role:    role,
			Content: h.Content,
		})
	}

	// [6] Generate answer via Gemini
	answer, err := s.gemini.Generate(ctx, systemPrompt, history, req.Message)
	if err != nil {
		logger.Log.Error("generation failed", slog.String("error", err.Error()))
		return nil, fmt.Errorf("failed to generate answer")
	}

	return &dto.ChatResponse{Answer: answer}, nil
}

// ─── Indexing ────────────────────────────────────────────────────────────────

func (s *aiService) IndexProperties(ctx context.Context) error {
	logger.Log.Info("starting property indexing")

	properties, err := s.propertyRepo.FindAll()
	if err != nil {
		return fmt.Errorf("failed to fetch properties: %w", err)
	}

	// Clear stale chunks before re-indexing to prevent duplicates
	if err := s.knowledgeRepo.DeleteBySource(model.ChunkSourceProperty); err != nil {
		return fmt.Errorf("failed to clear old property chunks: %w", err)
	}

	var chunks []model.KnowledgeChunk
	for _, p := range properties {
		text := propertyToText(p)
		embedding, err := s.gemini.Embed(ctx, text)
		if err != nil {
			logger.Log.Error("failed to embed property", slog.Uint64("property_id", uint64(p.ID)), slog.String("error", err.Error()))
			continue // skip individual failure, do not abort the full batch
		}

		refID := p.ID
		chunks = append(chunks, model.KnowledgeChunk{
			Source:    model.ChunkSourceProperty,
			RefID:     &refID,
			Title:     p.Title,
			Content:   text,
			Embedding: pgvector.NewVector(embedding),
		})
	}

	if err := s.knowledgeRepo.BulkCreate(chunks); err != nil {
		return fmt.Errorf("failed to save property chunks: %w", err)
	}

	logger.Log.Info("property indexing completed", slog.Int("count", len(chunks)))
	return nil
}

func (s *aiService) IndexFAQ(ctx context.Context) error {
	logger.Log.Info("starting FAQ indexing")

	if err := s.knowledgeRepo.DeleteBySource(model.ChunkSourceFAQ); err != nil {
		return fmt.Errorf("failed to clear old FAQ chunks: %w", err)
	}

	var chunks []model.KnowledgeChunk
	for _, faq := range staticFAQs() {
		text := fmt.Sprintf("Q: %s\nA: %s", faq.question, faq.answer)
		embedding, err := s.gemini.Embed(ctx, text)
		if err != nil {
			logger.Log.Error("failed to embed FAQ entry", slog.String("question", faq.question), slog.String("error", err.Error()))
			continue
		}

		chunks = append(chunks, model.KnowledgeChunk{
			Source:    model.ChunkSourceFAQ,
			Title:     faq.question,
			Content:   text,
			Embedding: pgvector.NewVector(embedding),
		})
	}

	if err := s.knowledgeRepo.BulkCreate(chunks); err != nil {
		return fmt.Errorf("failed to save FAQ chunks: %w", err)
	}

	logger.Log.Info("FAQ indexing completed", slog.Int("count", len(chunks)))
	return nil
}

func (s *aiService) IndexBusinessContext(ctx context.Context) error {
	logger.Log.Info("starting business context indexing")

	if err := s.knowledgeRepo.DeleteBySource(model.ChunkSourceBusiness); err != nil {
		return fmt.Errorf("failed to clear old business context chunks: %w", err)
	}

	var chunks []model.KnowledgeChunk
	for _, bc := range staticBusinessContext() {
		embedding, err := s.gemini.Embed(ctx, bc.content)
		if err != nil {
			logger.Log.Error("failed to embed business context", slog.String("title", bc.title), slog.String("error", err.Error()))
			continue
		}

		chunks = append(chunks, model.KnowledgeChunk{
			Source:    model.ChunkSourceBusiness,
			Title:     bc.title,
			Content:   bc.content,
			Embedding: pgvector.NewVector(embedding),
		})
	}

	if err := s.knowledgeRepo.BulkCreate(chunks); err != nil {
		return fmt.Errorf("failed to save business context chunks: %w", err)
	}

	logger.Log.Info("business context indexing completed", slog.Int("count", len(chunks)))
	return nil
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

func buildContext(chunks []model.KnowledgeChunk) string {
	if len(chunks) == 0 {
		return "Tidak ada informasi relevan yang ditemukan dalam basis pengetahuan."
	}
	var sb strings.Builder
	for i, c := range chunks {
		sb.WriteString(fmt.Sprintf("[%d] %s\n%s\n\n", i+1, c.Title, c.Content))
	}
	return sb.String()
}

func buildSystemPrompt(knowledgeContext string) string {
	return fmt.Sprintf(`Kamu adalah Asisten AI Customer Service untuk platform properti real estate terpercaya di Indonesia.
Platform ini menghubungkan pembeli dan penyewa dengan agen properti profesional untuk transaksi jual-beli dan sewa properti di seluruh Indonesia.

REFERENSI INFORMASI (gunakan HANYA ini untuk menjawab):
---
%s
---

ATURAN MENJAWAB:
- Jawab dalam Bahasa Indonesia yang ramah, jelas, dan profesional
- Gunakan HANYA informasi dari referensi di atas; jangan mengarang fakta
- Jika informasi tidak tersedia, akui dengan jujur dan arahkan ke tim support
- JANGAN membuat atau berasumsi tentang harga, alamat, atau detail properti yang tidak ada
- Format harga menggunakan Rupiah: Rp 500.000.000 (bukan USD atau format lain)
- Saat merekomendasikan properti, sebutkan fitur utama: nama, lokasi, harga, tipe, dan luas
- Jika ada beberapa properti relevan, tampilkan maksimal 3 pilihan terbaik
- Untuk pertanyaan teknis (masalah akun, transaksi, verifikasi), arahkan ke tim support
- Gunakan bahasa yang hangat namun tetap profesional, seperti agen properti berpengalaman`, knowledgeContext)
}

func propertyToText(p model.Property) string {
	var sb strings.Builder

	sb.WriteString(fmt.Sprintf("Properti: %s\n", p.Title))
	sb.WriteString(fmt.Sprintf("Tipe listing: %s\n", p.ListingType))
	sb.WriteString(fmt.Sprintf("Status: %s\n", p.Status))
	sb.WriteString(fmt.Sprintf("Harga: Rp %.0f\n", p.Price))

	if p.ListingType == model.ListingTypeRent && p.RentPeriod != "" && p.RentPeriod != "-" {
		sb.WriteString(fmt.Sprintf("Periode sewa: %s\n", p.RentPeriod))
	}

	if p.PropertyType.Name != "" {
		sb.WriteString(fmt.Sprintf("Tipe properti: %s\n", p.PropertyType.Name))
	}

	sb.WriteString(fmt.Sprintf("Metode pembayaran: %s\n", p.PaymentMethod))
	sb.WriteString(fmt.Sprintf("Alamat: %s\n", p.Address))
	sb.WriteString(fmt.Sprintf("Kota: %s\n", p.City))
	sb.WriteString(fmt.Sprintf("Provinsi: %s\n", p.Province))
	sb.WriteString(fmt.Sprintf("Luas tanah: %d m²\n", p.LandSize))
	sb.WriteString(fmt.Sprintf("Luas bangunan: %d m²\n", p.BuildingSize))
	sb.WriteString(fmt.Sprintf("Lantai: %d\n", p.Floors))
	sb.WriteString(fmt.Sprintf("Sertifikat: %s\n", p.Certificate))
	sb.WriteString(fmt.Sprintf("Furnished: %s\n", p.Furnishing))
	sb.WriteString(fmt.Sprintf("Tahun dibangun: %d\n", p.YearBuilt))
	sb.WriteString(fmt.Sprintf("Daya listrik: %d VA\n", p.ElectricalPower))
	sb.WriteString(fmt.Sprintf("Akses mobil: %v\n", p.HasCarAccess))
	sb.WriteString(fmt.Sprintf("Bisa negosiasi: %v\n", p.IsNegotiable))

	if p.FacingDirection != nil && *p.FacingDirection != "" {
		sb.WriteString(fmt.Sprintf("Arah hadap: %s\n", *p.FacingDirection))
	}

	if p.ImbPbb {
		sb.WriteString("Dokumen IMB/PBB: Tersedia\n")
	}

	if len(p.Facilities) > 0 {
		var names []string
		for _, f := range p.Facilities {
			if f.FacilityType.Name != "" {
				names = append(names, f.FacilityType.Name)
			}
		}
		if len(names) > 0 {
			sb.WriteString(fmt.Sprintf("Fasilitas: %s\n", strings.Join(names, ", ")))
		}
	}

	sb.WriteString(fmt.Sprintf("Deskripsi: %s", p.Description))
	return sb.String()
}

// ─── FAQ Static Data ──────────────────────────────────────────────────────────

type faqItem struct {
	question string
	answer   string
}

func staticFAQs() []faqItem {
	return []faqItem{
		{
			question: "Bagaimana cara mendaftarkan properti untuk dijual atau disewakan?",
			answer:   "Anda perlu mendaftar sebagai agen terlebih dahulu. Setelah akun agen diverifikasi oleh admin, Anda bisa login dan menggunakan menu 'Tambah Properti' untuk mengunggah data, foto, dan detail properti Anda.",
		},
		{
			question: "Apakah platform ini gratis untuk digunakan?",
			answer:   "Melihat dan mencari listing properti sepenuhnya gratis tanpa perlu akun. Untuk mendaftarkan properti sebagai agen, silakan hubungi tim kami untuk informasi paket yang tersedia.",
		},
		{
			question: "Bagaimana cara menghubungi agen properti?",
			answer:   "Setiap halaman detail properti menampilkan informasi kontak agen, termasuk nomor telepon dan email. Anda bisa langsung menghubungi agen untuk pertanyaan lebih lanjut atau menjadwalkan kunjungan.",
		},
		{
			question: "Apa itu listing type 'dijual' dan 'disewa'?",
			answer:   "'Dijual' berarti properti ditawarkan untuk dibeli secara permanen (kepemilikan berpindah tangan). 'Disewa' berarti properti tersedia untuk disewa dalam jangka waktu tertentu (bulanan atau tahunan) tanpa perpindahan kepemilikan.",
		},
		{
			question: "Apakah harga properti bisa dinegosiasikan?",
			answer:   "Tergantung kebijakan penjual. Setiap properti memiliki keterangan 'Bisa Negosiasi' atau 'Harga Tetap' di halaman detailnya. Jika bisa negosiasi, hubungi agen secara langsung untuk mendiskusikan harga.",
		},
		{
			question: "Apa perbedaan sertifikat SHM dan HGB?",
			answer:   "SHM (Sertifikat Hak Milik) adalah kepemilikan penuh atas tanah dan bangunan, tidak terbatas waktu, dapat diwariskan, dan paling kuat secara hukum. HGB (Hak Guna Bangunan) adalah hak mendirikan bangunan di atas tanah negara atau pihak lain dengan jangka waktu tertentu (20-30 tahun) yang dapat diperpanjang. SHM lebih disarankan untuk investasi jangka panjang.",
		},
		{
			question: "Bagaimana cara menyimpan properti favorit ke wishlist?",
			answer:   "Klik ikon hati pada kartu atau halaman detail properti untuk menambahkannya ke wishlist. Fitur ini memerlukan akun yang sudah login. Seluruh wishlist Anda dapat dilihat di halaman profil.",
		},
		{
			question: "Bagaimana cara melaporkan properti yang mencurigakan?",
			answer:   "Jika menemukan listing mencurigakan atau tidak sesuai, hubungi tim support kami melalui email atau nomor di halaman Kontak Kami. Tim kami akan menindaklanjuti dalam 1×24 jam kerja.",
		},
		{
			question: "Apa itu KPR dan properti mana yang mendukungnya?",
			answer:   "KPR (Kredit Pemilikan Rumah) adalah fasilitas kredit dari bank untuk membeli properti. Properti yang mendukung KPR ditandai dengan metode pembayaran 'KPR' atau 'Semua Metode'. Untuk pengajuan, hubungi agen yang akan membantu proses ke bank rekanan. Persyaratan umum: slip gaji/bukti penghasilan, NPWP, dan dokumen identitas.",
		},
		{
			question: "Apa perbedaan pembayaran cash, KPR, dan cash bertahap?",
			answer:   "Cash (tunai): Pembayaran penuh sekaligus, biasanya mendapat harga terbaik. KPR: Cicilan melalui bank dengan uang muka 10-30% dan cicilan bulanan hingga 30 tahun. Cash bertahap: Cicilan langsung ke penjual tanpa bank, tenor lebih fleksibel (1-5 tahun), biasanya lebih murah dari KPR dari sisi bunga.",
		},
		{
			question: "Bagaimana cara memberikan ulasan atau review properti?",
			answer:   "Buka halaman detail properti, lalu klik tombol 'Tulis Ulasan'. Fitur ini memerlukan akun yang sudah login. Rating dan ulasan Anda sangat membantu calon pembeli/penyewa lain dalam mengambil keputusan.",
		},
		{
			question: "Apakah bisa mencari properti berdasarkan kota atau harga?",
			answer:   "Ya! Gunakan fitur filter di halaman pencarian untuk memfilter berdasarkan kota, provinsi, tipe properti, rentang harga, tipe listing (jual/sewa), dan status. Kombinasikan filter untuk hasil yang paling sesuai.",
		},
		{
			question: "Bagaimana cara menjadi agen properti di platform ini?",
			answer:   "Daftar akun terlebih dahulu, lalu ajukan permohonan sebagai agen melalui menu profil. Tim admin akan memverifikasi data Anda dalam 1-3 hari kerja. Setelah disetujui, Anda dapat mulai mengunggah listing properti.",
		},
		{
			question: "Apa itu PPJB dan AJB dalam transaksi properti?",
			answer:   "PPJB (Perjanjian Pengikatan Jual Beli) adalah perjanjian awal antara pembeli dan penjual, biasanya digunakan saat properti masih inden atau dalam proses KPR. AJB (Akta Jual Beli) adalah dokumen resmi pemindahan kepemilikan yang dibuat di hadapan PPAT/notaris setelah seluruh pembayaran lunas.",
		},
		{
			question: "Apa itu IMB atau PBG pada properti?",
			answer:   "IMB (Izin Mendirikan Bangunan) atau nama barunya PBG (Persetujuan Bangunan Gedung) adalah dokumen resmi legalitas bangunan dari pemerintah. Properti dengan IMB/PBB berarti bangunannya legal dan terdaftar. Ini penting untuk dipastikan sebelum membeli properti.",
		},
		{
			question: "Berapa biaya tambahan saat membeli properti?",
			answer:   "Selain harga properti, biaya tambahan yang perlu diperhitungkan: BPHTB (Bea Perolehan Hak atas Tanah dan Bangunan) sebesar 5% dari nilai transaksi, biaya notaris/PPAT (0,5-1% dari nilai properti), biaya balik nama sertifikat, dan biaya appraisal bank (jika KPR).",
		},
	}
}

// ─── Business Context Static Data ────────────────────────────────────────────

type businessContextItem struct {
	title   string
	content string
}

func staticBusinessContext() []businessContextItem {
	return []businessContextItem{
		{
			title: "Tentang Platform Properti Kami",
			content: `Platform kami adalah marketplace properti real estate terpercaya di Indonesia yang menghubungkan pembeli, penyewa, dan agen properti profesional.
Kami menyediakan layanan jual-beli dan sewa berbagai jenis properti di seluruh wilayah Indonesia.
Didukung oleh teknologi AI dan sistem pencarian canggih, platform kami memudahkan Anda menemukan properti yang tepat sesuai kebutuhan dan anggaran.
Komitmen kami: transparansi informasi, keamanan transaksi, dan kemudahan akses untuk semua pengguna.`,
		},
		{
			title: "Jenis Properti yang Tersedia di Platform",
			content: `Platform kami menawarkan berbagai jenis properti:
- Rumah: Hunian tapak dari berbagai tipe (tipe 21, 36, 45, 54, 70, 120, dll) di berbagai kota Indonesia
- Apartemen: Unit mulai dari studio hingga 4 kamar tidur di kota-kota besar
- Tanah/Kavling: Lahan kosong untuk dibangun sendiri, baik di perumahan maupun area mandiri
- Ruko (Rumah Toko): Properti komersial yang sekaligus bisa dijadikan tempat usaha dan hunian
- Kantor: Ruang kerja dan gedung perkantoran untuk kebutuhan bisnis
- Gudang: Properti industri dan logistik untuk kebutuhan penyimpanan
- Villa: Hunian premium untuk liburan, investasi, atau tempat tinggal eksklusif
Setiap properti dilengkapi spesifikasi lengkap: luas, fasilitas, sertifikat, dan kondisi bangunan.`,
		},
		{
			title: "Status Properti dan Ketersediaan",
			content: `Setiap properti memiliki status yang selalu diperbarui:
- Available (Tersedia): Properti aktif dan siap ditransaksikan
- Sold (Terjual): Properti sudah berpindah kepemilikan, tidak tersedia
- Rented (Tersewa): Properti sudah disewa, saat ini tidak tersedia untuk penyewa baru
- Inactive (Tidak Aktif): Listing sedang dinonaktifkan sementara oleh pemilik/agen
Untuk konfirmasi ketersediaan terkini, selalu hubungi agen yang bersangkutan.`,
		},
		{
			title: "Metode Pembayaran Properti yang Didukung",
			content: `Platform mendukung empat metode pembayaran:
1. Cash (Tunai): Pembayaran penuh sekaligus. Biasanya mendapatkan harga terbaik dan negosiasi lebih mudah. Proses paling cepat.
2. KPR (Kredit Pemilikan Rumah): Fasilitas kredit dari bank. Uang muka minimal 10-30%, cicilan bulanan dengan tenor 5-30 tahun. Persyaratan: slip gaji/SIUP, NPWP, KTP, dan dokumen pendukung lainnya.
3. Cash Bertahap: Cicilan langsung ke penjual/pengembang tanpa melalui bank. Tenor lebih fleksibel (1-5 tahun), proses lebih sederhana, biasanya tanpa bunga atau bunga lebih rendah dari KPR.
4. Semua Metode: Properti yang menerima semua opsi pembayaran di atas.
Pilih metode sesuai kemampuan finansial dan kebutuhan Anda.`,
		},
		{
			title: "Dokumen Legal dan Sertifikat Properti",
			content: `Jenis sertifikat dan dokumen penting dalam transaksi properti:
- SHM (Sertifikat Hak Milik): Status kepemilikan tertinggi. Berlaku selamanya, dapat diwariskan, paling aman untuk investasi jangka panjang. Digunakan untuk rumah tapak dan tanah.
- HGB (Hak Guna Bangunan): Hak mendirikan bangunan di atas tanah negara/pihak lain. Berlaku 20-30 tahun, dapat diperpanjang. Umum untuk apartemen dan properti komersial.
- SHGB (Sertifikat Hak Guna Bangunan): Versi tersertifikat dari HGB, lebih kuat secara hukum dibanding HGB biasa.
- PPJB (Perjanjian Pengikatan Jual Beli): Perjanjian awal sebelum AJB, digunakan untuk properti inden atau saat proses KPR berlangsung.
- AJB (Akta Jual Beli): Dokumen resmi pemindahan kepemilikan di hadapan PPAT/notaris.
- IMB/PBG (Izin Mendirikan Bangunan/Persetujuan Bangunan Gedung): Legalitas konstruksi bangunan dari pemerintah daerah.
- PBB (Pajak Bumi dan Bangunan): Bukti pembayaran pajak tahunan, diperlukan saat transaksi.
Selalu pastikan kelengkapan dokumen sebelum transaksi untuk keamanan investasi.`,
		},
		{
			title: "Fitur Pencarian dan Filter Properti",
			content: `Platform menyediakan fitur pencarian dan filter canggih:
- Filter berdasarkan kota (contoh: Jakarta, Surabaya, Bandung, Bali, Yogyakarta, Medan)
- Filter berdasarkan provinsi
- Filter berdasarkan tipe properti (rumah, apartemen, tanah, ruko, dll)
- Filter berdasarkan rentang harga minimum dan maksimum
- Filter berdasarkan tipe listing: dijual atau disewa
- Filter berdasarkan status: tersedia, terjual, tersewa
- Properti unggulan (featured) ditampilkan di halaman utama dan hasil pencarian teratas
Gunakan kombinasi filter untuk menemukan properti yang paling sesuai.`,
		},
		{
			title: "Peran dan Hak Akses Pengguna",
			content: `Platform memiliki tiga peran pengguna dengan hak akses berbeda:
1. User (Pengguna Umum): Gratis, mendaftar dengan NIK, email, dan nomor telepon. Dapat mencari properti, melihat detail, menambah ke wishlist, memberikan review/rating, dan menghubungi agen.
2. Agent (Agen Properti): Perlu verifikasi admin. Dapat membuat dan mengelola listing properti, mengunggah foto, mengupdate status properti, dan berinteraksi dengan calon pembeli/penyewa.
3. Owner (Admin Platform): Mengelola keseluruhan platform, memverifikasi akun agen, mengelola konten dan kategori properti.
Proses verifikasi agen memakan waktu 1-3 hari kerja setelah pengajuan.`,
		},
		{
			title: "Spesifikasi Teknis dan Fasilitas Properti",
			content: `Setiap listing properti menampilkan spesifikasi teknis lengkap:
- Ukuran: Luas tanah (m²) dan luas bangunan (m²)
- Struktur: Jumlah lantai dan tahun dibangun
- Utilitas: Daya listrik (VA) — umumnya 900, 1.300, 2.200, 3.500, atau 5.500 VA
- Orientasi: Arah hadap bangunan (Utara, Selatan, Timur, Barat, dsb)
- Akses: Ketersediaan akses jalan untuk kendaraan roda empat
- Furnishing: Fully furnished (lengkap dengan furnitur), semi furnished, atau unfurnished (kosong)
- Fasilitas internal: kolam renang, garasi, carport, taman, dapur set, AC, CCTV, dll
- Fasilitas area/lingkungan: keamanan 24 jam, playground, area olahraga, dll
- Kondisi dokumen IMB/PBB
Informasi ini membantu Anda membandingkan dan memilih properti dengan lebih tepat.`,
		},
		{
			title: "Fitur Wishlist dan Review Properti",
			content: `Platform menyediakan fitur sosial untuk membantu keputusan pembelian:
Wishlist:
- Simpan properti favorit dengan klik ikon hati
- Akses semua properti tersimpan dari halaman profil
- Mudah dibandingkan satu sama lain
- Memerlukan akun yang sudah login

Review dan Rating:
- Berikan penilaian bintang dan ulasan teks untuk properti yang pernah Anda kunjungi
- Ulasan dari pembeli/penyewa sebelumnya membantu calon transaksi berikutnya
- Satu pengguna dapat memberikan satu ulasan per properti
- Review bisa diupdate jika pendapat berubah
- Memerlukan akun yang sudah login`,
		},
		{
			title: "Tips Investasi Properti di Indonesia",
			content: `Panduan investasi properti melalui platform kami:
- Kota dengan nilai investasi tinggi: Jakarta, Surabaya, Bali, Bandung, Tangerang, Bekasi, Bogor, Yogyakarta
- Properti SHM lebih aman untuk investasi jangka panjang dibanding HGB
- Lokasi strategis (dekat pusat bisnis, sekolah favorit, rumah sakit, akses tol/MRT) meningkatkan nilai properti secara signifikan
- Properti dijual cenderung mengalami apresiasi nilai 5-10% per tahun di lokasi premium
- Properti disewa menghasilkan passive income rutin (yield rata-rata 4-7% per tahun)
- Pertimbangkan usia bangunan, kondisi fisik, dan estimasi biaya renovasi
- Cek rencana tata ruang kota (RTRW) untuk potensi pengembangan kawasan
- Verifikasi semua dokumen dan legalitas sebelum transaksi
- Konsultasikan dengan agen berpengalaman untuk panduan investasi yang lebih spesifik`,
		},
		{
			title: "Layanan dan Jam Operasional Customer Support",
			content: `Tim kami siap membantu Anda di setiap tahap pencarian dan transaksi properti:
- Jam operasional support: Senin–Jumat, 08.00–17.00 WIB
- Pertanyaan seputar listing properti: Hubungi agen langsung melalui kontak di halaman properti
- Masalah teknis akun (login, registrasi, verifikasi): Hubungi tim support platform
- Permohonan menjadi agen: Ajukan melalui menu profil, verifikasi 1-3 hari kerja
- Laporan properti mencurigakan: Gunakan fitur lapor di halaman properti atau hubungi support
- Penanganan komplain: Maksimal 3 hari kerja
- Verifikasi data properti baru: 1-3 hari kerja setelah submission
Kami berkomitmen memberikan respons yang cepat dan solusi yang tepat untuk setiap pertanyaan.`,
		},
		{
			title: "Panduan Lengkap Membeli Properti",
			content: `Langkah-langkah membeli properti melalui platform kami:
1. Tentukan kebutuhan: tipe properti, lokasi, budget, dan metode pembayaran
2. Gunakan fitur filter untuk mempersempit hasil pencarian
3. Bandingkan beberapa properti dengan spesifikasi serupa
4. Simpan kandidat ke wishlist untuk memudahkan perbandingan
5. Hubungi agen untuk informasi lebih detail dan jadwal viewing
6. Kunjungi properti secara langsung untuk memverifikasi kondisi fisik
7. Periksa kelengkapan dokumen legal (sertifikat, IMB, PBB)
8. Jika KPR: ajukan pre-approval kredit ke bank terlebih dahulu
9. Negosiasikan harga jika properti memiliki keterangan 'Bisa Negosiasi'
10. Tandatangani PPJB dan lunasi pembayaran sesuai kesepakatan
11. Proses AJB di hadapan notaris/PPAT untuk pemindahan hak kepemilikan resmi`,
		},
		{
			title: "Panduan Lengkap Menyewa Properti",
			content: `Langkah-langkah menyewa properti melalui platform kami:
1. Tentukan kebutuhan: lokasi, tipe properti, budget sewa bulanan/tahunan
2. Filter properti dengan tipe listing 'disewa'
3. Perhatikan periode sewa minimum yang tertera di listing
4. Hubungi agen untuk detail syarat sewa dan negosiasi harga
5. Kunjungi properti untuk memastikan kondisi sesuai harapan
6. Cek kelengkapan furnitur/fasilitas jika mencari fully furnished
7. Tanyakan biaya tambahan: listrik, air, internet, iuran lingkungan
8. Baca dengan teliti perjanjian sewa sebelum menandatangani
9. Dokumentasikan kondisi properti saat awal sewa sebagai bukti
10. Simpan semua bukti pembayaran sewa selama masa kontrak`,
		},
	}
}
