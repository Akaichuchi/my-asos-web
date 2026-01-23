"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

interface Product {
  id: string | number;
  name: string;
  price: string;
  originalPrice?: string;
  img: string;
}

export default function WomenPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [beautyProducts, setBeautyProducts] = useState<Product[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const beautyScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/products?category=women&limit=20").then(res => res.json()).then(data => setProducts(data)).catch(() => {});
    fetch("/api/products?category=beauty&limit=20").then(res => res.json()).then(data => setBeautyProducts(data)).catch(() => {});
  }, []);

  const bottomGallery = [
    { src: "/images/209569608-2.webp", label: "The latest drops" },
    { src: "/images/209573837-2.webp", label: "Activewear" },
    { src: "/images/209691728-1-brown.webp", label: "Trainers" },
    { src: "/images/210106831-2.webp", label: "Basics" },
    { src: "/images/210146548-1-chocolate.webp", label: "Arrange" },
    { src: "/images/210146548-1-chocolate.webp", label: "Maxi Dresses" },
  ];

  // DỮ LIỆU CHUẨN 100% THEO HÌNH MẪU E99A17 VÀ E90A97
  const trendingGrid = [
    { src: "/images/date-nightv4.webp", title: "Dinner, then drinks", desc: "Easy styles that work beyond the table." },
    { src: "/images/going-out.webp", title: "Out past 7", desc: "Made for cold nights and late finishes." },
    { src: "/images/cool-girl.webp", title: "Campus, but make it chic", desc: "Elevated staples that work harder than your timetable." },
    { src: "/images/out-past-7v2 (1).webp", title: "Date nights, prioritised", desc: "Comfortable, confident and made to be noticed." },
    { src: "/images/wellness.webp", title: "2026 is your wellness era", desc: "Feel-good fits and everyday self-care." },
    { src: "/images/ski.webp", title: "Learning to ski?", desc: "Cold-weather layers that keep things chic, not bulky." },
    { src: "/images/vacation.webp", title: "PTO well spent", desc: "Swim, lounge, repeat. Holiday dressing starts here." },
    { src: "/images/winter-wedding-guestv2.webp", title: "Wedding Season, Winter Style", desc: "Chic layers and standout looks for cold-weather ceremonies." }
  ];

  return (
    <main className="min-h-screen bg-white w-full overflow-x-hidden">
      {/* 1. TOP VIDEO */}
      <div className="bg-black text-white py-2 w-full text-center">
        <p className="text-[12px] font-black uppercase tracking-tighter">The Winter Sale: up to 70% off*</p>
      </div>
      <section className="relative w-full">
        <video autoPlay muted loop playsInline className="w-full h-auto object-cover min-h-[350px] md:min-h-[550px]">
          <source src="/images/videodaidienjpc.mp4" type="video/mp4" />
        </video>
      </section>

      {/* 2. CATEGORY BUTTONS */}
      <div className="w-full bg-black py-8 flex flex-wrap justify-center gap-3 px-4">
        {["View all Sale", "Dresses", "Coats + jackets", "Footwear", "Tops", "Gifts"].map((item) => (
          <button key={item} className="border border-white text-white px-8 py-3 text-[11px] font-black uppercase hover:bg-white hover:text-black transition-all">
            {item}
          </button>
        ))}
      </div>

      {/* 3. MỤC THAY THẾ: STYLE YOUR NEW YEAR (2 HÀNG CHUẨN MẪU) */}
      <section className="w-full py-16 px-4 md:px-10 max-w-[1600px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[28px] md:text-[34px] font-bold tracking-tight mb-2">Style your New Year, your way</h2>
          <p className="text-[14px] md:text-[16px]">Fresh plans, better outfits. Whatever you’re saying yes to this year, dress for it.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
          {trendingGrid.map((item, index) => (
            <div key={index} className="flex flex-col items-center group cursor-pointer text-center">
              <div className="relative aspect-[3/4] w-full mb-5 overflow-hidden">
                <img src={item.src} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="font-bold text-[15px] mb-1">{item.title}</h3>
              <p className="text-[13px] text-gray-600 leading-tight max-w-[250px]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FACE + BODY SECTION */}
      <div className="w-full flex justify-center mb-8">
        <Link href="/shop" className="bg-black text-white px-16 py-3 text-[14px] font-black uppercase tracking-widest">SHOP NOW</Link>
      </div>
      <div className="relative w-full px-4 md:px-10 max-w-[1800px] mx-auto">
        <img src="/images/fbmobile.webp" className="block md:hidden w-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" alt="Beauty" />
        <img src="/images/fbdesktop.webp" className="hidden md:block w-full border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" alt="Beauty" />
      </div>

      {/* 5. TOP PICKS SCROLL */}
      <section className="w-full py-16">
        <div className="w-full text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold lowercase italic tracking-tight">Face + Body: Top Picks</h2>
        </div>
        <div className="relative max-w-[1800px] mx-auto px-4 md:px-10">
          <div ref={beautyScrollRef} className="flex overflow-x-auto gap-1 no-scrollbar scroll-smooth">
            {beautyProducts.map((p) => (
              <div key={p.id} className="min-w-[50%] md:min-w-[25%] px-2 group">
                <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-gray-50 shadow-sm">
                  <img src={p.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={p.name} />
                </div>
                <div className="text-[11px] space-y-1">
                  <p className="text-black font-medium uppercase line-clamp-2 h-8">{p.name}</p>
                  <p className="font-black italic text-black">{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. NEW IN SECTION */}
      <section className="w-full py-20 border-t border-gray-100">
        <div className="w-full text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">New in</h2>
        </div>
        <div className="flex overflow-x-auto md:grid md:grid-cols-6 gap-1 px-1">
          {bottomGallery.map((item, index) => (
            <div key={index} className="min-w-[160px] relative aspect-[3/4] overflow-hidden group cursor-pointer">
              <img src={item.src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.label} />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all"></div>
              <div className="absolute bottom-4 w-full text-center px-2">
                <span className="bg-white/90 px-3 py-2 text-[10px] font-bold uppercase text-black inline-block">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL SHOP NOW */}
      <div className="w-full flex justify-center pb-20">
        <Link href="/shop" className="bg-black text-white px-16 py-3 text-[14px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all">SHOP NOW</Link>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}