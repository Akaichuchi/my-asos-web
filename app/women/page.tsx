"use client";
import Link from "next/link";

export default function WomenPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* --- SEO Article Section (Ẩn với người dùng, tốt cho Google) --- */}
      <article className="sr-only">
        <h1>Thời Trang Nữ ASOS 2026 - Xu Hướng Cool Girl Staples</h1>
        <p>Khám phá bộ sưu tập quần áo nữ mới nhất tại ASOS. Từ phong cách dạo phố năng động đến trang phục dự tiệc sang trọng.</p>
      </article>

      {/* 1. TOP PROMO BANNER (Dải đen thông báo) */}
      <div className="bg-black text-white py-3 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-2 md:gap-8">
          <button className="border border-white px-6 py-1 text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            WOMEN
          </button>
          <div className="text-center">
            <p className="text-[13px] font-black uppercase tracking-tighter">
              The Winter Sale: up to 70% off*
            </p>
            <p className="text-[11px] font-medium italic">Last chance to save big</p>
          </div>
          <button className="border border-white px-6 py-1 text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            MEN
          </button>
        </div>
      </div>

      {/* 2. HERO SECTION (Phần hình ảnh chính giống image_9bb892.jpg) */}
      <section className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-[#F3F3F3]">
        {/* Background Image - Bạn thay link ảnh thật của bạn vào đây */}
        <img 
          src="https://images.asos-media.com/navigation/ww_cool_girl_staples_desktop_1680x600_120124" 
          alt="Women Cool Girl Staples Collection 2026"
          className="w-full h-full object-cover object-center"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 lg:px-32">
          <div className="max-w-md space-y-6">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-black leading-none">
              Cool girl <br /> staples
            </h2>
            <Link 
              href="/women/new-in"
              className="inline-block bg-white text-black px-12 py-4 text-sm font-black uppercase tracking-[0.2em] border-2 border-transparent hover:bg-transparent hover:border-black hover:text-black transition-all duration-300 shadow-lg hover:shadow-none"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY QUICK LINKS (Tùy chọn thêm để giống ASOS hơn) */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {['Dresses', 'Top', 'Shoes', 'Accessories', 'Beauty', 'Sale'].map((item) => (
            <div key={item} className="group cursor-pointer text-center">
              <div className="aspect-[3/4] bg-gray-100 mb-3 overflow-hidden">
                 <img 
                  src={`https://source.unsplash.com/400x533/?fashion,${item}`} 
                  alt={item}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                 />
              </div>
              <span className="text-xs font-black uppercase tracking-widest">{item}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}