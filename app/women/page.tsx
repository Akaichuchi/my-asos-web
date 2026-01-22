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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Lấy sản phẩm từ Admin hoặc hiển thị dữ liệu mẫu theo phong cách ASOS
    fetch("/api/products?category=women&limit=20")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => {
        setProducts([
          { id: 1, name: "ASOS DESIGN short trench in stone", price: "$39.94", originalPrice: "$99.48", img: "https://images.asos-media.com/products/asos-design-short-trench-coat-in-stone/205123456-1" },
          { id: 2, name: "ASOS DESIGN crew neck mini dress with wide cuff", price: "$16.58", originalPrice: "$47.37", img: "https://images.asos-media.com/products/asos-design-crew-neck-mini-dress/204123888-1" },
          { id: 3, name: "Topshop twill clean skort in red", price: "$15.11", originalPrice: "$60.01", img: "https://images.asos-media.com/products/topshop-twill-clean-skort-in-red/203987111-1" },
          { id: 4, name: "Weekend Collective baggy barrel fit jeans", price: "$22.11", originalPrice: "$63.16", img: "https://images.asos-media.com/products/weekend-collective-baggy-barrel-jeans/204556222-1" },
        ]);
      });
  }, []);

  return (
    <main className="min-h-screen bg-white w-full overflow-x-hidden">
      {/* 1. TOP BANNER & VIDEO (GIỮ NGUYÊN 100%) */}
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

      {/* 2. HỆ THỐNG NÚT DANH MỤC (GIỮ NGUYÊN 100%) */}
      <div className="w-full bg-black py-8">
        <div className="w-full px-4 flex flex-wrap justify-center gap-3">
          {["View all Sale", "Dresses", "Coats + jackets", "Footwear", "Tops", "Gifts"].map((item) => (
            <button key={item} className="border border-white text-white px-8 py-3 text-[11px] font-black uppercase hover:bg-white hover:text-black transition-all">
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* 3. KHU VỰC SẢN PHẨM VỚI HIỆU ỨNG GIỐNG MẪU */}
      <section className="w-full py-16 relative">
        <div className="w-full text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold lowercase tracking-tight">Sale: selling fast</h2>
        </div>
        
        <div className="relative group max-w-[1800px] mx-auto px-4 md:px-10">
          {/* Nút mũi tên trái */}
          <button onClick={() => scroll("left")} className="absolute left-2 top-[40%] z-20 opacity-30 hover:opacity-100 transition-opacity">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 19l-7-7 7-7" /></svg>
          </button>

          {/* Thanh trượt sản phẩm */}
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

          {/* Nút mũi tên phải */}
          <button onClick={() => scroll("right")} className="absolute right-2 top-[40%] z-20 opacity-30 hover:opacity-100 transition-opacity">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5l7 7-7 7" /></svg>
          </button>

          {/* Các dấu chấm trang (Dots) */}
          <div className="flex justify-center gap-2 mt-8">
            {[0, 1, 2, 3].map((dot) => (
              <div key={dot} className={`w-2 h-2 rounded-full ${dot === 0 ? "bg-black" : "bg-gray-300"}`} />
            ))}
          </div>
        </div>

        {/* 4. NÚT SHOP NOW ĐẶC TRƯNG */}
        <div className="w-full flex justify-center mt-12">
          <Link href="/shop" className="bg-black text-white px-16 py-3 text-[14px] font-black uppercase tracking-widest hover:bg-gray-800 transition-colors">
            SHOP NOW
          </Link>
        </div>
      </section>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}