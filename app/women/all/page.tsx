"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  isSellingFast?: boolean;
  hasMoreColors?: boolean;
}

export default function AllWomenProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch("/api/products?category=women");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Lỗi fetch sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  return (
    <div className="bg-white min-h-screen text-black">
      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-4">
        {/* BREADCRUMBS - GIỐNG MẪU */}
        <nav className="text-[11px] text-gray-500 mb-4 flex items-center gap-2">
          <Link href="/" className="hover:underline">Home</Link> <span>›</span>
          <Link href="/women" className="hover:underline">Women</Link> <span>›</span>
          <span className="text-gray-400 font-medium">CTAS</span>
        </nav>

        {/* TIÊU ĐỀ & CHIPS */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <h1 className="text-2xl font-black uppercase tracking-widest">CTAS</h1>
          
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {["Summer rodeo", "Face + Body Bestsellers", "Trending styles", "For Love & Lemons", "Bubble"].map((tag) => (
              <button key={tag} className="px-4 py-1.5 border border-gray-300 text-[13px] font-medium whitespace-nowrap hover:border-black">
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* THANH CÔNG CỤ */}
        <div className="sticky top-[64px] z-30 bg-white/95 border-y border-gray-100 py-3 flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider border-r pr-4">
              Sort <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2"/></svg>
            </button>
            <button className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider">
              Filter <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 4h18M6 12h12m-9 8h6" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </div>
          <p className="text-[12px] text-gray-400 font-medium">54,183 styles found</p>
        </div>

        {/* GRID SẢN PHẨM - ĐÃ SỬA LỖI ĐÓNG NGOẶC */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12">
          {loading ? (
            [...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-100 aspect-[3/4] w-full rounded-sm" />
            ))
          ) : (
            products.map((item) => (
              <div key={item.id} className="group flex flex-col relative">
                {/* ẢNH VÀ NÚT TIM */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#f3f3f3]">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button className="absolute bottom-3 right-3 bg-white/90 p-2 rounded-full shadow-sm hover:bg-white transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  </button>
                </div>

                {/* THÔNG TIN SẢN PHẨM */}
                <div className="mt-3 space-y-1">
                  <h3 className="text-[13px] text-gray-700 leading-snug group-hover:underline cursor-pointer min-h-[36px] line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-[14px] font-black tracking-tight">${item.price.toFixed(2)}</p>
                  
                  {/* BADGES */}
                  <div className="flex flex-wrap gap-2 pt-1 min-h-[22px]">
                    {item.hasMoreColors && (
                      <span className="text-[9px] font-bold uppercase text-gray-400 border border-gray-200 px-1.5 py-0.5">More colors</span>
                    )}
                    {item.isSellingFast && (
                      <span className="text-[9px] font-bold uppercase bg-[#eeeeee] text-[#2d2d2d] px-1.5 py-0.5">Selling Fast</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}