"use client";
import Link from "next/link";

export default function WomenPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* --- SEO STRATEGY --- */}
      <article className="sr-only">
        <h2>Xu hướng thời trang nữ 2026: BST Cool Girl Staples</h2>
        <p>Khám phá phong cách dẫn đầu tại ASOS Việt Nam với các thiết kế cao cấp dành cho phái đẹp.</p>
      </article>

      {/* 1. THANH ĐIỀU HƯỚNG PHỤ (SUB-NAV) - GIỐNG HÌNH MẪU 2 */}
      <div className="bg-[#525252] w-full hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex gap-1 text-[12px] font-medium text-white py-1">
          {[
            { name: "Sale", color: "bg-[#d01345]" },
            { name: "Trending", color: "" },
            { name: "New in", color: "" },
            { name: "Clothing", color: "" },
            { name: "Dresses", color: "" },
            { name: "Shoes", color: "" },
            { name: "Accessories", color: "" },
            { name: "Brands", color: "" },
            { name: "Beauty", color: "" }
          ].map((item) => (
            <button 
              key={item.name} 
              className={`px-3 py-2 hover:bg-white hover:text-black transition-colors uppercase tracking-tight ${item.color}`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* 2. TOP PROMO BANNER (Dải đen thông báo - Cập nhật bố cục) */}
      <div className="bg-black text-white py-2 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button className="border border-white px-5 py-1 text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            WOMEN
          </button>
          <div className="text-center">
            <p className="text-[13px] font-black uppercase tracking-tighter">
              The Winter Sale: up to 70% off*
            </p>
            <p className="text-[10px] font-medium italic">Last chance to save big</p>
          </div>
          <button className="border border-white px-5 py-1 text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            MEN
          </button>
        </div>
      </div>

      {/* 3. HERO SECTION (Chính diện giống image_9bb892.jpg) */}
      <section className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-[#F3F3F3]">
        <img 
          src="https://images.asos-media.com/navigation/ww_cool_girl_staples_desktop_1680x600_120124" 
          alt="Women Cool Girl Staples Collection 2026"
          className="w-full h-full object-cover object-center"
        />

        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 lg:px-32">
          <div className="max-w-md space-y-6">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-black leading-[0.9]">
              Cool girl <br /> staples
            </h2>
            <Link 
              href="/women/new-in"
              className="inline-block bg-white text-black px-12 py-4 text-sm font-black uppercase tracking-[0.2em] border-2 border-transparent hover:bg-black hover:text-white transition-all duration-300 shadow-lg"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </section>

      {/* 4. CATEGORY QUICK LINKS */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { name: 'Dresses', img: 'https://images.asos-media.com/products/asos-design-satin-midi-dress/204556123-1' },
            { name: 'Tops', img: 'https://images.asos-media.com/products/asos-design-baby-tee/204334123-1' },
            { name: 'Shoes', img: 'https://images.asos-media.com/products/adidas-originals-gazelle/203998123-1' },
            { name: 'Accessories', img: 'https://images.asos-media.com/products/asos-design-shoulder-bag/204112123-1' },
            { name: 'Beauty', img: 'https://images.asos-media.com/products/charlotte-tilbury-lipstick/202113123-1' },
            { name: 'Sale', img: 'https://images.asos-media.com/products/sale-items-placeholder/101' }
          ].map((item) => (
            <div key={item.name} className="group cursor-pointer text-center">
              <div className="aspect-[3/4] bg-gray-100 mb-3 overflow-hidden border border-gray-100">
                 <img 
                  src={item.img + "?$n_480w$"} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400x533?text=" + item.name }}
                 />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest group-hover:underline">{item.name}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}