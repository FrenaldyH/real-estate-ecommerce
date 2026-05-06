import { useNavigate } from 'react-router';

export function CategoryList() {
  const navigate = useNavigate();

  const categories = [
    { name: 'Beli Rumah', count: '500+', icon: '🏠', link: '/properties?type=buy&propertyType=rumah' },
    { name: 'Beli Apartemen', count: '300+', icon: '🏢', link: '/properties?type=buy&propertyType=apartemen' },
    { name: 'Beli Tanah', count: '150+', icon: '🌳', link: '/properties?type=buy&propertyType=tanah' },
    { name: 'Sewa Rumah', count: '250+', icon: '🏡', link: '/properties?type=rent&propertyType=rumah' },
    { name: 'Sewa Apartemen', count: '200+', icon: '🏘️', link: '/properties?type=rent&propertyType=apartemen' },
    { name: 'Sewa Ruko', count: '100+', icon: '🏪', link: '/properties?type=rent&propertyType=ruko' },
  ];

  const handleCategoryClick = (link: string) => {
    navigate(link);
  };

  return (
    <section className="py-20 bg-white border-y border-slate-200">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
            Cari Berdasarkan Kebutuhan Anda
          </h2>
          <p className="text-lg text-[#64748B]">
            Rumah keluarga, apartemen modern, atau investasi tanah? Semua ada di sini
          </p>
        </div>

        {/* Category List */}
        <div className="space-y-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category.link)}
              className="w-full bg-white border-2 border-slate-200 rounded-xl p-6 flex justify-between items-center hover:border-transparent hover:ring-2 hover:ring-[#3B82F6] hover:shadow-lg hover:shadow-blue-500/20 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-2xl group-hover:bg-blue-50 transition-colors">
                  {category.icon}
                </div>
                <span className="font-bold text-lg text-[#0F172A] group-hover:bg-gradient-to-r group-hover:from-[#2563EB] group-hover:to-[#3B82F6] group-hover:bg-clip-text group-hover:text-transparent transition-all">
                  {category.name}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[#64748B]">{category.count} Properti</span>
                <svg className="w-6 h-6 text-slate-400 group-hover:text-[#3B82F6] group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 rounded-xl p-6 text-center border border-blue-200 shadow-md">
            <div className="text-4xl font-bold bg-gradient-to-r from-[#2563EB] to-[#3B82F6] bg-clip-text text-transparent mb-2">500+</div>
            <div className="text-[#64748B]">Rumah Dijual</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 text-center border border-emerald-200">
            <div className="text-4xl font-bold text-[#10B981] mb-2">300+</div>
            <div className="text-[#64748B]">Apartemen</div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 text-center border border-amber-200">
            <div className="text-4xl font-bold text-[#F59E0B] mb-2">150+</div>
            <div className="text-[#64748B]">Properti Sewa</div>
          </div>
        </div>
      </div>
    </section>
  );
}