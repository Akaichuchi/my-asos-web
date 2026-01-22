"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: string | number;
  name: string;
  price: string;
  img: string;
  tag?: string;
}

export default function WomenPage() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "ASOS DESIGN sculpting halter neck crop top in black", price: "$37.99", img: "https://images.asos-media.com/products/asos-design-sculpting-halter-neck-crop-top-in-black/204344445-1-black", tag: "SELLING FAST" },
    { id: 2, name: "ASOS DESIGN long line t-shirt in black", price: "$29.99", img: "https://images.asos-media.com/products/asos-design-long-line-t-shirt-in-black/204123456-1-black" },
    { id: 3, name: "Topshop high neck ruffle button front long sleeve top", price: "$48.00", img: "https://images.asos-media.com/products/topshop-high-neck-ruffle-button-front-long-sleeve-top/203987654-1-grey", tag: "SELLING FAST" },
    { id: 4, name: "Topshop Sally folded bag in burgundy", price: "$47.99", img: "https://images.asos-media.com/products/topshop-sally-folded-bag-in-burgundy/204556677-1-burgundy" },
  ]);

  return (
    <main className="min-h-screen bg-white">
      {/* 1. THANH BANNER ĐEN TRÊN CÙNG (GIỮ NGUYÊN) */}
      <div className="bg-black text-white py-2 px-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-center">
          <div className="hidden md:block border border-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest">Women</div>
          <div>
            <p className="text-[12px] font-black uppercase tracking-tighter">The Winter Sale: up to 70% off*</p>
            <p className="text-[9px] italic">Last chance to save big</p>
          </div>
          <div className="hidden md:block border border-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest">Men</div>
        </div>
      </div>

      {/* --- ĐÃ LOẠI BỎ THANH CHỮ CHẠY "SALE: LAST CHANCE" TẠI ĐÂY --- */}

      {/* 2. HERO VIDEO SECTION (GIỮ NGUYÊN - KHÔNG CÓ TIÊU ĐỀ ĐÈ LÊN) */}
      <section className="relative w-full overflow-hidden bg-[#F6F6F6]">
        <video autoPlay muted loop playsInline className="hidden md:block w-full h-auto object-cover">
          <source src="/images/videodaidienjpc.mp4" type="video/mp4" />
        </video>
        <video autoPlay muted loop playsInline className="block md:hidden w-full h-auto object-cover">
          <source src="/images/videodt.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute bottom-4 right-4 text-white text-[10px] font-medium opacity-80">
          Limited time only. Selected styles marked down as shown.
        </div>
      </section>

      {/* 3. HỆ THỐNG NÚT BẤM DƯỚI VIDEO (GIỮ NGUYÊN) */}
      <div className="w-full bg-black py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-3">
          {["View all Sale", "Dresses", "Coats + jackets", "Footwear", "Tops", "Gifts"].map((item) => (
            <button key={item} className="border border-white text-white px-6 py-2 text-[11px] font-extrabold uppercase tracking-widest hover:bg-white hover:text-black transition-all min-w-[120px]">
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* 4. GRID SẢN PHẨM (GIỮ NGUYÊN - KHÔNG CÓ SORT/FILTER) */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-center text-2xl md:text-3xl font-black uppercase italic mb-12 tracking-tight">
          Sale: selling fast
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative flex flex-col">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#F6F6F6] mb-4">
                <img 
                  src={product.img} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <button className="absolute bottom-3 right-3 bg-white/90 p-2 rounded-full shadow-sm hover:bg-black hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              <div className="space-y-1">
                <h3 className="text-[12px] leading-snug text-gray-800 group-hover:underline cursor-pointer min-h-[32px] line-clamp-2 uppercase font-medium">
                  {product.name}
                </h3>
                <p className="font-bold text-[14px] text-[#d01345]">{product.price}</p>
                
                {product.tag && (
                  <div className="mt-2">
                    <span className="text-[10px] font-black bg-gray-100 px-2 py-1 uppercase italic tracking-tighter">
                      {product.tag}
                    </span>
                  </div>
                )}
              </div>

              <Link href={`/product/${product.id}`} className="absolute inset-0 z-0">
                <span className="sr-only">View {product.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}