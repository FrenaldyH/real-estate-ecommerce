export function WhyChooseUs() {
  const features = [
    {
      id: 1,
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Terpercaya",
      description: "Platform properti #1 di Indonesia dengan ribuan transaksi sukses"
    },
    {
      id: 2,
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Cepat & Mudah",
      description: "Proses pencarian properti yang simple dan intuitif"
    },
    {
      id: 3,
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "Agen Profesional",
      description: "Tim berpengalaman siap membantu menemukan properti ideal"
    },
    {
      id: 4,
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Aman & Legal",
      description: "Semua properti terverifikasi dan legal"
    }
  ];

  const partners = [
    "Agung Podomoro",
    "Sinarmas Land",
    "Ciputra Group",
    "Lippo Group",
    "Summarecon",
    "Alam Sutera"
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
            Dipercaya Lebih dari 50.000 Pengguna
          </h2>
          <p className="text-lg text-[#64748B]">
            Pengalaman berbeda dalam mencari properti idaman Anda
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature) => (
            <div key={feature.id} className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2563EB] via-[#3B82F6] to-[#06B6D4] rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/30">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-3">{feature.title}</h3>
              <p className="text-[#64748B] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Partners Section */}
        <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-10 border border-slate-200 shadow-lg overflow-hidden">
          <h3 className="text-2xl font-bold text-center text-[#0F172A] mb-8">
            Partner & Developer Terpercaya
          </h3>
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex gap-8 animate-scroll">
                {/* First set of partners */}
                {partners.map((partner, index) => (
                  <div
                    key={`first-${index}`}
                    className="flex-shrink-0 w-48 h-28 bg-white rounded-xl border-2 border-slate-200 flex items-center justify-center shadow-sm hover:shadow-lg hover:border-transparent hover:ring-2 hover:ring-[#3B82F6] transition-all p-6 group"
                  >
                    <span className="text-sm font-bold text-[#0F172A] text-center group-hover:bg-gradient-to-r group-hover:from-[#2563EB] group-hover:to-[#3B82F6] group-hover:bg-clip-text group-hover:text-transparent transition-all">{partner}</span>
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {partners.map((partner, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex-shrink-0 w-48 h-28 bg-white rounded-xl border-2 border-slate-200 flex items-center justify-center shadow-sm hover:shadow-lg hover:border-transparent hover:ring-2 hover:ring-[#3B82F6] transition-all p-6 group"
                  >
                    <span className="text-sm font-bold text-[#0F172A] text-center group-hover:bg-gradient-to-r group-hover:from-[#2563EB] group-hover:to-[#3B82F6] group-hover:bg-clip-text group-hover:text-transparent transition-all">{partner}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <style>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .animate-scroll {
              animation: scroll 20s linear infinite;
            }
            .animate-scroll:hover {
              animation-play-state: paused;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
