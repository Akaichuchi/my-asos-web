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

  const categories = [
    { src: "/images/shirts.webp", label: "Shirts" },
    { src: "/images/coats.webp", label: "Coats" },
    { src: "/images/tees.webp", label: "Tees" },
    { src: "/images/sweaters.webp", label: "Sweaters" },
    { src: "/images/pants.webp", label: "Pants" },
    { src: "/images/shoes.webp", label: "Shoes & Sneakers" },
  ];

  const whatToWear = [
    { src: "/images/209471272-2.webp", label: "Going out" },
    { src: "/images/208603184-1-brown.webp", label: "The winter shop" },
    { src: "/images/208619203-2.webp", label: "Date night, sorted" },
    { src: "/images/209544589-1-washedsandstone.webp", label: "Cozy season" },
  ];

  // DỮ LIỆU LOGO THƯƠNG HIỆU MỚI
  const popularBrands = [
    { src: "/images/nike-logo.webp", alt: "Nike" },
    { src: "/images/adidas-logo.webp", alt: "Adidas" },
    { src: "/images/the-north-face-logo.webp", alt: "The North Face" },
    { src: "/images/topman-logo.webp", alt: "Topman" },
    { src: "/images/logo_mango_870x500_v1.webp", alt: "Mango" },
    { src: "/images/reclaimed-vintage-logo.webp", alt: "Reclaimed Vintage" },
  ];

  return (
    <main className="min-h-screen bg-white w-full overflow-x-hidden">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-black text-white py-2 w-full text-center">
        <p className="text-[12px] font-black uppercase tracking-tighter">
          25% OFF COLD-WEATHER WINS* | Use code: CHILLY
        </p>
      </div>

      {/* 2. HEADER: HIỂN THỊ THEO THIẾT BỊ (KHÔNG NÚT) */}
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

      {/* 4. SHOP BY CATEGORY (KHÔNG TIÊU ĐỀ CHỮ) */}
      <section className="w-full py-16 bg-white border-t border-gray-100">
        <div className="w-full text-center mb-12">
          <h2 className="text-[24px] font-bold text-black tracking-tight uppercase">Shop by Category</h2>
        </div>
        <div className="flex overflow-x-auto md:grid md:grid-cols-6 gap-4 px-4 md:px-10 no-scrollbar">
          {categories.map((cat, index) => (
            <div key={index} className="min-w-[150px] flex flex-col items-center group cursor-pointer">
              <div className="w-full aspect-[4/5] overflow-hidden bg-gray-50">
                <img 
                  src={cat.src} 
                  alt={cat.label} 
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WHAT TO WEAR (TIÊU ĐỀ TRONG HÌNH) */}
      <section className="w-full py-10 bg-white border-t border-gray-100">
        <div className="w-full text-center mb-10">
          <h2 className="text-[28px] font-bold text-black tracking-tight">What to Wear</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 px-1 max-w-[1920px] mx-auto">
          {whatToWear.map((item, index) => (
            <div key={index} className="relative aspect-[3/4] overflow-hidden group cursor-pointer">
              <img src={item.src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={item.label} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90"></div>
              <div className="absolute bottom-6 w-full text-center">
                <span className="text-white text-[14px] font-bold uppercase tracking-[0.15em]">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. MỤC MỚI: POPULAR BRANDS (DƯỚI CÙNG) */}
      <section className="w-full py-16 bg-white border-t border-gray-100 pb-20">
        <div className="w-full text-center mb-12">
          <h2 className="text-[24px] font-bold text-black tracking-tight uppercase">Popular Brands</h2>
        </div>
        <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center opacity-80">
          {popularBrands.map((brand, index) => (
            <div key={index} className="w-full max-w-[120px] h-[60px] flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer">
              <img 
                src={brand.src} 
                alt={brand.alt} 
                className="max-w-full max-h-full object-contain" 
              />
            </div>
          ))}
        </div>
      </section>

      {/* 7. MÔ TẢ THƯƠNG HIỆU */}
      <section className="w-full py-20 bg-white flex justify-center px-4 md:px-20 border-t border-gray-100">
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