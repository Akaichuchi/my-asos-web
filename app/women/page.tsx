"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

interface Product {
  id: string | number;
  name: string;
  price: string;
  originalPrice?: string;
  img: string;
  tag?: string;
}

export default function WomenPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [beautyProducts, setBeautyProducts] = useState<Product[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const beautyScrollRef = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      
      ref.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  useEffect(() => {
    fetch("/api/products?category=women&limit=20")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => {});

    fetch("/api/products?category=beauty&limit=20")
      .then(res => res.json())
      .then(data => setBeautyProducts(data))
      .catch(() => {});
  }, []);

  // Danh sách 6 hình ảnh mới cho mục "New in" theo yêu cầu
  const newInImages = [
    { src: "/images/209569608-2.webp", label: "The latest drops" },
    { src: "/images/209573837-2.webp", label: "Activewear" },
    { src: "/images/209691728-1-brown.webp", label: "Trainers" },
    { src: "/images/210106831-2.webp", label: "Basics" },
    { src: "/images/210146548-1-chocolate.webp", label: "Arrange" },
    { src: "/images/210146548-1-chocolate.webp", label: "Maxi Dresses" }, // Hình thứ 6 dùng tạm link cuối hoặc bạn đổi link khác
  ];

  return (
    <main className="min-h-screen bg-white w-full overflow-x-hidden">
      {/* 1. TOP BANNER & VIDEO */}
      <div className="bg-black text-white py-2 w-full border-b border-gray-800">
        <div className="w-full flex justify-between items-center px-4 md:px-10">
          <div className="hidden md:block border border-white px-4 py-1 text-[10px] font-bold uppercase">Women</div>
          <div className="text-center">
            <p className="text-[12px] font-black uppercase tracking-tighter">The Winter Sale: up to 70% off*</p>
          </div>
          <div className="hidden md:block border border-white px-4 py-1 text-[10px] font-bold uppercase">Men</div>
        </div>
      </div>

      <section className="relative w-full">
        <video autoPlay muted loop playsInline className="w-full h-auto object-cover min-h-[350px] md:min-h-[550px]">
          <source src="/images/videodaidienjpc.mp4" type="video/mp4" />
        </video>
      </section>

      {/* 2. HỆ THỐNG NÚT DANH MỤC */}
      <div className="w-full bg-black py-8">
        <div className="w-full px-4 flex flex-wrap justify-center gap-3">
          {["View all Sale", "Dresses", "Coats + jackets", "Footwear", "Tops", "Gifts"].map((item) => (
            <button key={item} className="border border-white text-white px-8 py-3 text-[11px] font-black uppercase hover:bg-white hover:text-black transition-all">
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* 3. KHU VỰC SẢN PHẨM SALE */}
      <section className="w-full py-16 relative">
        <div className="w-full text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold lowercase tracking-tight">Sale: selling fast</h2>
        </div>
        <div className="relative group max-w-[1800px] mx-auto px-4 md:px-10">
          <div ref={scrollRef} className="flex overflow-x-auto gap-1 no-scrollbar scroll-smooth">
            {products.map((product) => (
              <div key={product.id} className="min-w-[50%] md:min-w-[25%] flex-shrink-0 px-2 group">
                <div className="relative aspect-[3/4] mb-4 bg-gray-50 overflow-hidden">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="text-[11px] space-y-1">
                  <p className="text-gray-600 uppercase tracking-tight line-clamp-2 h-8">{product.name}</p>
                  <div className="flex gap-2 font-bold">
                    <span className="text-gray-400 line-through">{product.originalPrice}</span>
                    <span className="text-[#d01345]">{product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* NÚT SHOP NOW ĐEN */}
        <div className="w-full flex justify-center mt-10">
          <Link href="/shop" className="bg-black text-white px-16 py-3 text-[12px] font-bold uppercase tracking-widest">
            SHOP NOW
          </Link>
        </div>
      </section>

      {/* MỚI: MỤC "NEW IN" 6 HÌNH */}
      <section className="w-full py-10">
        <div className="w-full text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">New in</h2>
        </div>
        <div className="flex overflow-x-auto md:grid md:grid-cols-6 gap-1 px-1">
          {newInImages.map((item, index) => (
            <div key={index} className="min-w-[160px] relative aspect-[3/4] overflow-hidden group cursor-pointer">
              <img src={item.src} alt={item.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all"></div>
              <div className="absolute bottom-4 w-full text-center">
                <span className="bg-white/90 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-black">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BANNER MỸ PHẨM */}
      <div className="w-full px-4 md:px-10 max-w-[1800px] mx-auto mt-10">
        <div className="w-full flex justify-center mb-8">
          <Link href="/shop" className="bg-black text-white px-16 py-3 text-[14px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all">
            SHOP NOW
          </Link>
        </div>
        <div className="relative w-full">
          <img src="/images/fbmobile.webp" className="block md:hidden w-full h-auto border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
          <img src="/images/fbdesktop.webp" className="hidden md:block w-full h-auto border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" />
        </div>
      </div>

      {/* KHU VỰC SẢN PHẨM MỸ PHẨM */}
      <section className="w-full py-16 relative">
        <div className="w-full text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold lowercase tracking-tight italic">Face + Body: Top Picks</h2>
        </div>
        <div className="relative group max-w-[1800px] mx-auto px-4 md:px-10">
          <div ref={beautyScrollRef} className="flex overflow-x-auto gap-1 no-scrollbar scroll-smooth">
            {beautyProducts.map((product) => (
              <div key={product.id} className="min-w-[50%] md:min-w-[25%] flex-shrink-0 px-2 group">
                <div className="relative aspect-[3/4] mb-4 bg-gray-50 overflow-hidden shadow-sm">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="text-[11px] space-y-1">
                  <p className="text-black font-medium uppercase tracking-tight line-clamp-2 h-8">{product.name}</p>
                  <p className="font-black italic text-black">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BESTSELLERS TITLE */}
      <div className="w-full text-center py-10">
        <h2 className="text-3xl font-bold tracking-tight">Bestsellers</h2>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}