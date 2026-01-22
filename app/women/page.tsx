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

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      ref.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Tự động lấy sản phẩm Quần áo Nữ từ Admin
    fetch("/api/products?category=women&limit=20").then(res => res.json()).then(data => setProducts(data)).catch(() => {});
    // Tự động lấy sản phẩm Mỹ phẩm từ Admin
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

  return (
    <main className="min-h-screen bg-white w-full overflow-x-hidden">
      {/* 1. TOP VIDEO & NAV */}
      <div className="bg-black text-white py-2 w-full text-center">
        <p className="text-[12px] font-black uppercase tracking-tighter">The Winter Sale: up to 70% off*</p>
      </div>
      <section className="relative w-full">
        <video autoPlay muted loop playsInline className="w-full h-auto object-cover min-h-[350px] md:min-h-[550px]">
          <source src="/images/videodaidienjpc.mp4" type="video/mp4" />
        </video>
      </section>

      {/* 2. HỆ THỐNG NÚT DANH MỤC QUẦN ÁO */}
      <div className="w-full bg-black py-8 flex flex-wrap justify-center gap-3 px-4">
        {["View all Sale", "Dresses", "Coats + jackets", "Footwear", "Tops", "Gifts"].map((item) => (
          <button key={item} className="border border-white text-white px-8 py-3 text-[11px] font-black uppercase hover:bg-white hover:text-black transition-all">
            {item}
          </button>
        ))}
      </div>

      {/* 3. MỤC QUẦN ÁO NỮ: SALE SELLING FAST */}
      <section className="w-full py-16">
        <div className="w-full text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold lowercase tracking-tight">Sale: selling fast</h2>
        </div>
        <div className="relative max-w-[1800px] mx-auto px-4 md:px-10">
          <div ref={scrollRef} className="flex overflow-x-auto gap-1 no-scrollbar scroll-smooth">
            {products.map((p) => (
              <div key={p.id} className="min-w-[50%] md:min-w-[25%] px-2 group">
                <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-gray-50">
                  <img src={p.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={p.name} />
                </div>
                <div className="text-[11px] space-y-1">
                  <p className="text-gray-600 uppercase line-clamp-2 h-8">{p.name}</p>
                  <div className="flex gap-2 font-bold">
                    <span className="text-gray-400 line-through">{p.originalPrice}</span>
                    <span className="text-[#d01345]">{p.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center mt-10">
          <Link href="/shop" className="bg-black text-white px-16 py-3 text-[12px] font-bold uppercase tracking-widest">SHOP NOW</Link>
        </div>
      </section>

      {/* 4. BANNER MỸ PHẨM: CHỈ NÚT ĐEN GIỮA TRÊN */}
      <div className="w-full px-4 md:px-10 max-w-[1800px] mx-auto mt-10">
        <div className="w-full flex justify-center mb-8">
          <Link href="/shop" className="bg-black text-white px-16 py-3 text-[14px] font-black uppercase tracking-widest">SHOP NOW</Link>
        </div>
        <div className="relative w-full">
          <img src="/images/fbmobile.webp" className="block md:hidden w-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
          <img src="/images/fbdesktop.webp" className="hidden md:block w-full border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" />
        </div>
      </div>

      {/* 5. MỤC MỸ PHẨM LÀM ĐẸP (TOP PICKS) */}
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

      {/* 6. HÀNG 6 HÌNH "NEW IN" - DƯỚI CÙNG TRANG */}
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
                <span className="bg-white/90 px-3 py-2 text-[10px] font-bold uppercase text-black inline-block">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NÚT SHOP NOW CHỐT TRANG CUỐI CÙNG */}
      <div className="w-full flex justify-center pb-20">
        <Link href="/shop" className="bg-black text-white px-16 py-3 text-[14px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all">
          SHOP NOW
        </Link>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}