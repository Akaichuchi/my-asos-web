"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: string | number;
  name: string;
  price: string;
  img: string;
}

export default function MenPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products?category=men&limit=20")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => {});
  }, []);

  // Dữ liệu cho mục Shop by Category
  const categories = [
    { src: "/images/shirts.webp", label: "Shirts" },
    { src: "/images/coats.webp", label: "Coats" },
    { src: "/images/tees.webp", label: "Tees" },
    { src: "/images/sweaters.webp", label: "Sweaters" },
    { src: "/images/pants.webp", label: "Pants" },
    { src: "/images/shoes.webp", label: "Shoes & Sneakers" },
  ];

  return (
    <main className="min-h-screen bg-white w-full overflow-x-hidden">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-black text-white py-2 w-full text-center">
        <p className="text-[12px] font-black uppercase tracking-tighter">
          25% OFF COLD-WEATHER WINS* | Use code: CHILLY
        </p>
      </div>

      {/* 2. HEADER: HIỂN THỊ THEO THIẾT BỊ (KHÔNG CÓ NÚT TRONG HÌNH) */}
      <section className="relative w-full">
        <div className="block md:hidden w-full">
          <img src="/images/app-hero.webp" alt="Mobile Hero" className="w-full h-auto object-cover" />
        </div>
        <div className="hidden md:block w-full">
          <img src="/images/desktop-hero.webp" alt="Desktop Hero" className="w-full h-auto object-cover" />
        </div>
      </section>

      {/* 3. CATEGORY BUTTONS */}
      <div className="w-full bg-black py-8 flex flex-wrap justify-center gap-3 px-4">
        {["New in", "Clothing", "Shoes", "Accessories", "Brands", "Sale"].map((item) => (
          <button key={item} className="border border-white text-white px-8 py-3 text-[11px] font-black uppercase hover:bg-white hover:text-black transition-all">
            {item}
          </button>
        ))}
      </div>

      {/* 4. ELEVATED ESSENTIALS SECTION */}
      <section className="w-full py-16 text-center">
        <h2 className="text-[28px] md:text-[40px] font-bold text-black tracking-tight mb-8">Elevated Essentials</h2>
        <div className="w-full flex justify-center mb-10">
           <Link href="/shop-men" className="bg-black text-white px-16 py-3 text-[14px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all">
            SHOP NOW
          </Link>
        </div>
      </section>

      {/* 5. SHOP BY CATEGORY (MỤC MỚI THÊM Ở DƯỚI CÙNG) */}
      <section className="w-full py-10 bg-white border-t border-gray-100 pb-20">
        <div className="w-full text-center mb-10">
          <h2 className="text-[24px] font-bold text-black tracking-tight uppercase">Shop by Category</h2>
        </div>
        <div className="flex overflow-x-auto md:grid md:grid-cols-6 gap-4 px-4 md:px-10 no-scrollbar">
          {categories.map((cat, index) => (
            <div key={index} className="min-w-[150px] flex flex-col items-center group cursor-pointer">
              <div className="w-full aspect-[4/5] overflow-hidden mb-4">
                <img 
                  src={cat.src} 
                  alt={cat.label} 
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              <span className="text-[14px] font-bold text-black uppercase tracking-wide">{cat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* MÔ TẢ THƯƠNG HIỆU */}
      <section className="w-full py-20 bg-white flex justify-center px-4 md:px-20 border-t border-gray-100">
        <div className="max-w-[1000px] text-center">
          <p className="text-[14px] text-gray-700 leading-relaxed font-normal italic">
            Your one-stop destination for fashion-forward 'fits, **NEWEGG Men**...
          </p>
        </div>
      </section>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}