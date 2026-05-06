import { useParams, useNavigate, Link } from 'react-router';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { useState } from 'react';
import { LoginModal } from '../components/auth/LoginModal';
import { RegisterModal } from '../components/auth/RegisterModal';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { allBlogArticles } from '../data/blogArticles';

export function BlogArticlePage() {
  const navigate = useNavigate();
  const params = useParams();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Support both id and slug
  const articleId = params.id || params.slug;
  
  // Find article by id or slug
  const article = allBlogArticles.find(a => 
    a.id.toString() === articleId || a.slug === articleId
  );

  // Get related articles (same category, exclude current)
  const relatedArticles = article 
    ? allBlogArticles
        .filter(a => a.category === article.category && a.id !== article.id)
        .slice(0, 3)
    : [];

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#0F172A] mb-4">Artikel Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-6">Maaf, artikel yang Anda cari tidak tersedia.</p>
          <button
            onClick={() => navigate('/blog')}
            className="px-6 py-3 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-all"
          >
            Kembali ke Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />

      {/* Hero Section */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 pt-8">
        <div className="mb-6">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#2563EB] transition-all mb-4"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Blog
          </button>
          
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
              {article.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex items-center gap-4 text-gray-600">
            <span>📅 {article.date}</span>
            <span>•</span>
            <span>⏱️ {article.readTime} baca</span>
          </div>
        </div>

        <ImageWithFallback
          src={article.image}
          alt={article.title}
          className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl mb-12 shadow-lg"
        />
      </div>

      {/* Content Section */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="prose prose-lg max-w-none">
              {/* Introduction */}
              <div className="text-lg text-gray-700 leading-relaxed mb-8">
                <p className="mb-6">{article.excerpt}</p>
                
                <p className="mb-6">
                  Dalam artikel ini, kami akan membahas secara mendalam tentang {article.title.toLowerCase()} 
                  yang dapat membantu Anda membuat keputusan yang tepat. Mari kita mulai dengan pembahasan lengkapnya.
                </p>
              </div>

              {/* Section 1 */}
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mt-8 mb-4">
                Mengapa Ini Penting?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Memahami topik ini sangat penting untuk siapa saja yang ingin membuat keputusan terbaik 
                dalam hal properti. Dengan informasi yang tepat, Anda dapat menghindari kesalahan umum 
                dan memaksimalkan hasil yang Anda dapatkan.
              </p>

              {/* Section 2 */}
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mt-10 mb-4">
                Panduan Lengkap
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Berikut adalah panduan lengkap yang telah kami susun berdasarkan pengalaman dan riset mendalam:
              </p>
              
              <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-6">
                <li className="leading-relaxed">
                  <strong>Riset dan Persiapan:</strong> Lakukan riset menyeluruh sebelum membuat keputusan. 
                  Kumpulkan informasi dari berbagai sumber terpercaya.
                </li>
                <li className="leading-relaxed">
                  <strong>Konsultasi dengan Ahli:</strong> Jangan ragu untuk berkonsultasi dengan 
                  profesional di bidang ini untuk mendapatkan perspektif yang lebih luas.
                </li>
                <li className="leading-relaxed">
                  <strong>Pertimbangkan Jangka Panjang:</strong> Pikirkan dampak jangka panjang dari 
                  keputusan Anda, bukan hanya keuntungan jangka pendek.
                </li>
                <li className="leading-relaxed">
                  <strong>Budget dan Finansial:</strong> Pastikan Anda memiliki perencanaan finansial 
                  yang matang dan realistis.
                </li>
              </ul>

              {/* Section 3 */}
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mt-10 mb-4">
                Tips dan Strategi Terbaik
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Berdasarkan pengalaman para ahli dan praktisi di industri properti, berikut adalah 
                beberapa tips yang dapat Anda terapkan:
              </p>
              
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-l-4 border-[#2563EB] p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">💡 Pro Tips</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Selalu lakukan due diligence sebelum membuat komitmen</li>
                  <li>✓ Manfaatkan teknologi dan platform digital untuk riset</li>
                  <li>✓ Networking dengan komunitas properti untuk insight tambahan</li>
                  <li>✓ Dokumentasikan semua proses dengan baik</li>
                </ul>
              </div>

              {/* Section 4 */}
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mt-10 mb-4">
                Kesalahan yang Harus Dihindari
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Untuk memastikan kesuksesan Anda, hindari kesalahan-kesalahan umum berikut:
              </p>
              
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold text-red-900 mb-3">⚠️ Warning</h3>
                <ul className="space-y-2 text-red-800">
                  <li>✗ Terburu-buru dalam mengambil keputusan</li>
                  <li>✗ Tidak melakukan riset yang cukup</li>
                  <li>✗ Mengabaikan biaya tersembunyi</li>
                  <li>✗ Tidak mempertimbangkan lokasi dengan matang</li>
                </ul>
              </div>

              {/* Conclusion */}
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mt-10 mb-4">
                Kesimpulan
              </h2>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  Dengan memahami dan menerapkan panduan yang telah kami bagikan, Anda akan lebih siap 
                  dalam membuat keputusan yang tepat. Ingat, kesuksesan dalam properti memerlukan 
                  kombinasi antara pengetahuan, strategi, dan eksekusi yang baik. Jangan ragu untuk 
                  terus belajar dan berkonsultasi dengan para ahli.
                </p>
              </div>

              {/* CTA */}
              <div className="mt-12 p-8 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] rounded-2xl text-white text-center">
                <h3 className="text-2xl font-bold mb-3">Siap Untuk Memulai?</h3>
                <p className="mb-6 text-blue-100">
                  Temukan properti impian Anda bersama RumahKu
                </p>
                <button
                  onClick={() => navigate('/properties')}
                  className="px-8 py-3 bg-white text-[#2563EB] rounded-xl font-bold hover:shadow-2xl transition-all"
                >
                  Lihat Properti
                </button>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Share Section */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-[#0F172A] mb-4">Bagikan Artikel</h3>
                <div className="flex gap-3">
                  <button className="flex-1 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                    <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <button className="flex-1 p-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all">
                    <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </button>
                  <button className="flex-1 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all">
                    <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-[#0F172A] mb-6">Artikel Terkait</h3>
                  <div className="space-y-6">
                    {relatedArticles.map((relatedArticle) => (
                      <Link
                        key={relatedArticle.id}
                        to={`/blog/${relatedArticle.slug}`}
                        className="flex gap-4 group cursor-pointer"
                      >
                        <ImageWithFallback
                          src={relatedArticle.image}
                          alt={relatedArticle.title}
                          className="w-24 h-20 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-[#0F172A] group-hover:text-[#2563EB] transition-all line-clamp-2 mb-1">
                            {relatedArticle.title}
                          </h4>
                          <p className="text-xs text-gray-500">{relatedArticle.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate('/blog')}
                    className="w-full mt-6 px-4 py-2 border-2 border-[#2563EB] text-[#2563EB] rounded-lg hover:bg-[#2563EB] hover:text-white transition-all font-semibold"
                  >
                    Lihat Semua Artikel
                  </button>
                </div>
              )}

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-[#2563EB] to-[#3B82F6] rounded-xl p-6 text-white">
                <h3 className="text-lg font-bold mb-2">📬 Newsletter</h3>
                <p className="text-sm text-blue-100 mb-4">
                  Dapatkan tips properti terbaru langsung ke email Anda
                </p>
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="w-full px-4 py-2 rounded-lg text-gray-900 mb-3"
                />
                <button className="w-full px-4 py-2 bg-white text-[#2563EB] rounded-lg font-semibold hover:shadow-lg transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
    </div>
  );
}
