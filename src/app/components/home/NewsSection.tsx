import { ImageWithFallback } from '../common/ImageWithFallback';
import { useNavigate } from 'react-router';

export function NewsSection() {
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      date: "16 April 2026",
      title: "Tips Memilih Rumah yang Tepat untuk Keluarga",
      excerpt: "Panduan lengkap untuk menemukan rumah impian yang sesuai dengan kebutuhan dan budget keluarga Anda."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      date: "14 April 2026",
      title: "Investasi Properti di 2026: Peluang dan Strategi",
      excerpt: "Analisis mendalam tentang tren pasar properti dan strategi investasi terbaik untuk tahun ini."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1560184897-ae75f418493e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      date: "12 April 2026",
      title: "Panduan KPR untuk Pembeli Rumah Pertama",
      excerpt: "Semua yang perlu Anda ketahui tentang kredit pemilikan rumah, dari persiapan hingga approval."
    }
  ];

  const handleArticleClick = (articleId: number) => {
    navigate(`/blog/${articleId}`);
  };

  return (
    <section id="news" className="py-20 bg-slate-50">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
            Insight & Tips Properti
          </h2>
          <p className="text-lg text-[#64748B]">
            Panduan lengkap dari para ahli untuk keputusan investasi yang tepat
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article key={article.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => handleArticleClick(article.id)}>
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-[#64748B] mb-3">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <time>{article.date}</time>
                </div>

                <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:bg-gradient-to-r group-hover:from-[#2563EB] group-hover:to-[#3B82F6] group-hover:bg-clip-text group-hover:text-transparent transition-all">
                  {article.title}
                </h3>

                <p className="text-[#64748B] mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                <button className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] bg-clip-text text-transparent font-semibold hover:gap-3 transition-all">
                  Baca Selengkapnya
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button onClick={() => navigate('/blog')} className="px-8 py-3 border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white rounded-xl transition-all">
            Lihat Semua Artikel
          </button>
        </div>
      </div>
    </section>
  );
}