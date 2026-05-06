export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Budi Santoso",
      location: "Jakarta",
      rating: 5,
      text: "Sangat membantu dalam mencari rumah impian. Proses cepat dan mudah. Tim sangat profesional dan responsif dalam menjawab semua pertanyaan saya.",
      avatar: "BS"
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      location: "Bandung",
      rating: 5,
      text: "Platform terbaik untuk properti di Indonesia! Interface mudah digunakan dan pilihan propertinya sangat lengkap. Highly recommended!",
      avatar: "SN"
    },
    {
      id: 3,
      name: "Ahmad Wijaya",
      location: "Surabaya",
      rating: 5,
      text: "Agen yang membantu sangat berpengalaman dan sabar. Mereka membantu saya menemukan rumah yang sempurna untuk keluarga dalam waktu singkat.",
      avatar: "AW"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white border-y border-slate-200">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
            Cerita Sukses Pelanggan Kami
          </h2>
          <p className="text-lg text-[#64748B]">
            Ribuan keluarga telah menemukan rumah impian mereka bersama kami
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#64748B] leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
                <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB] via-[#3B82F6] to-[#06B6D4] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">{testimonial.avatar}</span>
                </div>
                <div>
                  <div className="font-bold text-[#0F172A]">{testimonial.name}</div>
                  <div className="text-sm text-[#64748B]">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-slate-200">
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-[#2563EB] to-[#3B82F6] bg-clip-text text-transparent mb-2">10K+</div>
            <div className="text-[#64748B]">Properti Terjual</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-[#2563EB] to-[#3B82F6] bg-clip-text text-transparent mb-2">50K+</div>
            <div className="text-[#64748B]">Pengguna Aktif</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-[#2563EB] to-[#3B82F6] bg-clip-text text-transparent mb-2">500+</div>
            <div className="text-[#64748B]">Agen Profesional</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#10B981] mb-2">98%</div>
            <div className="text-[#64748B]">Kepuasan Pelanggan</div>
          </div>
        </div>
      </div>
    </section>
  );
}
