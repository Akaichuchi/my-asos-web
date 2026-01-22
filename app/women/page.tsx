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
      .catch(() => {
        setProducts([
          { id: 1, name: "ASOS DESIGN short trench in stone", price: "$39.94", originalPrice: "$99.48", img: "https://images.asos-media.com/products/asos-design-short-trench-coat-in-stone/205123456-1" },
          { id: 2, name: "ASOS DESIGN crew neck mini dress with wide cuff", price: "$16.58", originalPrice: "$47.37", img: "https://images.asos-media.com/products/asos-design-crew-neck-mini-dress/204123888-1" },
        ]);
      });

    fetch("/api/products?category=beauty&limit=20")
      .then(res => res.json())
      .then(data => setBeautyProducts(data))
      .catch(() => {
        setBeautyProducts([
          { id: 101, name: "The Ordinary Niacinamide 10% + Zinc 1%", price: "$12.00", img: "https://images.asos-media.com/products/the-ordinary-niacinamide-10-zinc-1-30ml/11234567-1" },
          { id: 102, name: "COSRX Advanced Snail 96 Mucin Power Essence", price: "$25.00", originalPrice: "$30.00", img: "https://images.asos-media.com/products/cosrx-advanced-snail-96-mucin-power-essence/22345678-1" },
        ]);
      });
  }, []);

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
          <button onClick={() => scroll(scrollRef, "left")} className="absolute left-2 top-[40%] z-20 opacity-30 hover:opacity-100 transition-opacity">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 19l-7-7 7-7" /></svg>
          </button>
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
          <button onClick={() => scroll(scrollRef, "right")} className="absolute right-2 top-[40%] z-20 opacity-30 hover:opacity-100 transition-opacity">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </section>

      {/* CẬP NHẬT: BANNER MỸ PHẨM CHỈ CÓ 1 NÚT ĐEN DUY NHẤT Ở GIỮA PHÍA TRÊN */}
      <div className="w-full px-4 md:px-10 max-w-[1800px] mx-auto">
        <div className="w-full flex justify-center mb-8">
          <Link href="/shop" className="bg-black text-white px-16 py-3 text-[14px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all">
            SHOP NOW
          </Link>
        </div>
        <div className="relative w-full">
          <div className="block md:hidden">
            <img src="/images/fbmobile.webp" className="w-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" alt="Beauty Mobile" />
          </div>
          <div className="hidden md:block">
            <img src="/images/fbdesktop.webp" className="w-full border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" alt="Beauty Desktop" />
          </div>
        </div>
      </div>

      {/* KHU VỰC SẢN PHẨM MỸ PHẨM */}
      <section className="w-full py-16 relative">
        <div className="w-full text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold lowercase tracking-tight italic">Face + Body: Top Picks</h2>
        </div>
        <div className="relative group max-w-[1800px] mx-auto px-4 md:px-10">
          <button onClick={() => scroll(beautyScrollRef, "left")} className="absolute left-2 top-[40%] z-20 opacity-30 hover:opacity-100 transition-opacity">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div ref={beautyScrollRef} className="flex overflow-x-auto gap-1 no-scrollbar scroll-smooth">
            {beautyProducts.map((product) => (
              <div key={product.id} className="min-w-[50%] md:min-w-[25%] flex-shrink-0 px-2 group">
                <div className="relative aspect-[3/4] mb-4 bg-gray-50 overflow-hidden">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 shadow-sm" />
                </div>
                <div className="text-[11px] space-y-1">
                  <p className="text-black font-medium uppercase tracking-tight line-clamp-2 h-8">{product.name}</p>
                  <div className="flex gap-2 font-black italic">
                    <span className="text-black">{product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => scroll(beautyScrollRef, "right")} className="absolute right-2 top-[40%] z-20 opacity-30 hover:opacity-100 transition-opacity">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </section>

      {/* NÚT SHOP NOW CUỐI TRANG */}
      <div className="w-full flex justify-center pb-20">
        <Link href="/shop" className="bg-black text-white px-16 py-3 text-[14px] font-black uppercase tracking-widest hover:bg-gray-800">
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