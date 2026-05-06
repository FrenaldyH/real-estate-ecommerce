import { ImageWithFallback } from '../common/ImageWithFallback';

export function AppDownload() {
  const features = [
    {
      title: "Notifikasi Real-time",
      description: "Dapatkan update properti baru langsung ke ponsel Anda"
    },
    {
      title: "Pencarian Lebih Mudah",
      description: "Filter dan cari properti dengan cepat dan akurat"
    },
    {
      title: "Chat Langsung dengan Agen",
      description: "Komunikasi instan dengan agen properti profesional"
    }
  ];

  const handleAppStoreClick = () => {
    alert('Aplikasi RumahKu akan segera tersedia di App Store!');
  };

  const handleGooglePlayClick = () => {
    alert('Aplikasi RumahKu akan segera tersedia di Google Play Store!');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#2563EB] via-[#3B82F6] to-[#06B6D4] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzE0IDAgNi0yLjY4NiA2LTZzLTIuNjg2LTYtNi02LTYgMi42ODYtNiA2IDIuNjg2IDYgNiA2ek0wIDM4YzMuMzE0IDAgNi0yLjY4NiA2LTZzLTIuNjg2LTYtNi02LTYgMi42ODYtNiA2IDIuNjg2IDYgNiA2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Properti di Genggaman Anda
            </h2>
            <p className="text-xl text-blue-50 mb-8">
              Cari, bandingkan, dan hubungi agen langsung dari smartphone Anda
            </p>

            {/* Features List */}
            <div className="space-y-6 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-lg mb-1">{feature.title}</div>
                    <div className="text-blue-50">{feature.description}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={handleAppStoreClick} className="flex items-center gap-3 bg-black text-white px-6 py-4 rounded-xl hover:bg-gray-900 transition-colors">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs">Download di</div>
                  <div className="font-bold">App Store</div>
                </div>
              </button>

              <button onClick={handleGooglePlayClick} className="flex items-center gap-3 bg-black text-white px-6 py-4 rounded-xl hover:bg-gray-900 transition-colors">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs">Download di</div>
                  <div className="font-bold">Google Play</div>
                </div>
              </button>
            </div>
          </div>

          {/* Right: Phone Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-72 h-[600px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-8 border-gray-800">
                <div className="h-full bg-white rounded-[2.5rem] overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1706808849803-f61304e024ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                    alt="App Screenshot"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#F59E0B] rounded-full blur-3xl opacity-30"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#10B981] rounded-full blur-3xl opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
