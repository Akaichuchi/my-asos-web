"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: string | number;
  name: string;
  price: string;
  originalPrice?: string;
  img: string;
}

export default function MenPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Giữ nguyên tính năng kết nối dữ liệu từ API Admin
    fetch("/api/products?category=men&limit=20")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => {});
  }, []);

  return (
    <main className="min-h-screen bg-white w-full overflow-x-hidden">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-black text-white py-2 w-full text-center">
        <p className="text-[12px] font-black uppercase tracking-tighter">
          25% OFF COLD-WEATHER WINS* | Use code: CHILLY
        </p>
      </div>

      {/* 2. HEADER: HIỂN THỊ THEO THIẾT BỊ (KHÔNG CÓ NÚT) */}
      <section className="relative w-full">
        {/* Hình cho Mobile */}
        <div className="block md:hidden w-full">
          <img 
            src="/images/app-hero.webp" 
            alt="Men Collection Mobile" 
            className="w-full h-auto object-cover"
          />
        </div>
        {/* Hình cho Desktop */}
        <div className="hidden md:block w-full">
          <img 
            src="/images/desktop-hero.webp" 
            alt="Men Collection Desktop" 
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* 3. CATEGORY BUTTONS (BLACK SECTION) */}
      <div className="w-full bg-black py-8 flex flex-wrap justify-center gap-3 px-4">
        {["New in", "Clothing", "Shoes", "Accessories", "Brands", "Sale"].map((item) => (
          <button key={item} className="border border-white text-white px-8 py-3 text-[11px] font-black uppercase hover:bg-white hover:text-black transition-all">
            {item}
          </button>
        ))}
      </div>

      {/* 4. DƯỚI ĐÂY LÀ KHÔNG GIAN CHO CÁC MỤC TIẾP THEO GIỐNG TRANG WOMEN */}
      <section className="w-full py-20 text-center">
        <h2 className="text-[28px] font-bold text-black tracking-tight mb-10">Elevated Essentials</h2>
        <div className="w-full flex justify-center">
           <Link href="/shop-men" className="bg-black text-white px-16 py-3 text-[14px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all">
            SHOP NOW
          </Link>
        </div>
      </section>

      {/* PHẦN MÔ TẢ THƯƠNG HIỆU CUỐI TRANG */}
      <section className="w-full py-20 bg-gray-50 flex justify-center px-4 md:px-20 border-t border-gray-100">
        <div className="max-w-[1000px] text-center">
          <p className="text-[14px] text-gray-700 leading-relaxed font-normal italic">
            Your one-stop destination for fashion-forward 'fits, **NEWEGG Men** serves up the hottest menswear and accessories...
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