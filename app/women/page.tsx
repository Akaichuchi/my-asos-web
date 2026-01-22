"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function WomenPage() {
  // Loại bỏ hoàn toàn logic gây vòng lặp reload
  useEffect(() => {
    console.log("Women Page Initialized");
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* --- SEO STRATEGY --- */}
      <article className="sr-only">
        <h2>Xu hướng thời trang nữ 2026: BST Cool Girl Staples</h2>
        <p>Khám phá phong cách dẫn đầu tại ASOS Việt Nam với các thiết kế cao cấp dành cho phái đẹp.</p>
      </article>

      {/* CHÚ Ý: Đã loại bỏ phần 1 (THANH ĐIỀU HƯỚNG PHỤ) trong tệp này 
          vì nó đã được tích hợp trong Header tổng ở layout.tsx. 
          Việc này giúp xóa bỏ lỗi "2 thanh danh mục" như trong ảnh image_9ab1cf.png
      */}

      {/* 1. TOP PROMO BANNER (Dải đen thông báo) */}
      <div className="bg-black text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button className="hidden md:block border border-white px-5 py-1 text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            WOMEN
          </button>
          <div className="text-center flex-1">
            <p className="text-[13px] font-black uppercase tracking-tighter">
              The Winter Sale: up to 70% off*
            </p>
            <p className="text-[10px] font-medium italic">Last chance to save big</p>
          </div>
          <button className="hidden md:block border border-white px-5 py-1 text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            MEN
          </button>
        </div>
      </div>

      {/* 2. HERO SECTION (Giữ nguyên 100% theo image_9bb892.jpg) */}
      <section className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-[#F3F3F3]">
        <img 
          src="https://images.asos-media.com/navigation/ww_cool_girl_staples_desktop_1680x600_120124" 
          alt="Women Cool Girl Staples Collection 2026"
          className="w-full h-full object-cover object-center"
        />

        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 lg:px-32">
          <div className="max-w-md space-y-6">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-black leading-[0.9] uppercase">
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

      {/* 3. CATEGORY QUICK LINKS (Giữ nguyên logic và bố cục) */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { name: 'Dresses', img: 'https://images.asos-media.com/products/asos-design-satin-midi-dress-in-wine/204556123-1' },
            { name: 'Tops', img: 'https://images.asos-media.com/products/asos-design-baby-tee-with-ribbon-detail-in-white/204334123-1' },
            { name: 'Shoes', img: 'https://images.asos-media.com/products/adidas-originals-gazelle-sneakers-in-black/203998123-1' },
            { name: 'Accessories', img: 'https://images.asos-media.com/products/asos-design-shoulder-bag-with-buckle-detail-in-black/204112123-1' },
            { name: 'Beauty', img: 'https://images.asos-media.com/products/charlotte-tilbury-matte-revolution-lipstick/202113123-1' },
            { name: 'Sale', img: 'https://images.asos-media.com/products/asos-design-oversized-sweatshirt-in-washed-stone/204512123-1' }
          ].map((item) => (
            <div key={item.name} className="group cursor-pointer text-center">
              <div className="aspect-[3/4] bg-gray-100 mb-3 overflow-hidden border border-gray-100 rounded-sm">
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