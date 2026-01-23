"use client";
import { useEffect, useState } from "react";

export default function MenPage() {
  const [products, setProducts] = useState([]);

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

  const popularBrands = [
    { src: "/images/nike-logo.webp", alt: "Nike" },
    { src: "/images/adidas-logo.webp", alt: "Adidas" },
    { src: "/images/the-north-face-logo.webp", alt: "The North Face" },
    { src: "/images/topman-logo.webp", alt: "Topman" },
    { src: "/images/logo_mango_870x500_v1.webp", alt: "Mango" },
    { src: "/images/reclaimed-vintage-logo.webp", alt: "Reclaimed Vintage" },
  ];

  const trendingSneakers = [
    { src: "/images/208594074-1-midblue.webp", label: "adidas Running Adizero Evo SL sneakers in white and black" },
    { src: "/images/208669736-1-lightgreen.webp", label: "adidas Running Adizero Evo SL sneakers in white and purple" },
    { src: "/images/208669507-1-white.webp", label: "adidas Running Adizero Evo SL sneakers in bright green" },
    { src: "/images/208669443-1-white.webp", label: "Nike Running Vomero 18 sneakers in white and blue" },
  ];

  return (
    <main className="min-h-screen bg-white w-full overflow-x-hidden">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-black text-white py-2 w-full text-center">
        <p className="text-[12px] font-black uppercase tracking-tighter">
          25% OFF COLD-WEATHER WINS* | Use code: CHILLY
        </p>
      </div>

      {/* 2. HEADER: RESPONSIVE HERO (KHÔNG NÚT) */}
      <section className="relative w-full">
        <div className="block md:hidden w-full">
          <img src="/images/app-hero.webp" alt="Mobile" className="w-full h-auto object-cover" />
        </div>
        <div className="hidden md:block w-full">
          <img src="/images/desktop-hero.webp" alt="Desktop" className="w-full h-auto object-cover" />
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

      {/* 4. SHOP BY CATEGORY (KHÔNG CHỮ) */}
      <section className="w-full py-16 bg-white border-t border-gray-100">
        <div className="w-full text-center mb-12">
          <h2 className="text-[24px] font-bold text-black tracking-tight uppercase">Shop by Category</h2>
        </div>
        <div className="flex overflow-x-auto md:grid md:grid-cols-6 gap-4 px-4 md:px-10 no-scrollbar">
          {categories.map((cat, index) => (
            <div key={index} className="min-w-[150px] flex flex-col items-center">
              <div className="w-full aspect-[4/5] overflow-hidden bg-gray-50">
                <img src={cat.src} alt={cat.label} className="w-full h-full object-contain" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WHAT TO WEAR (CHỮ TRONG ẢNH) */}
      <section className="w-full py-10 bg-white border-t border-gray-100">
        <div className="w-full text-center mb-10">
          <h2 className="text-[28px] font-bold text-black tracking-tight">What to Wear</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 px-1 max-w-[1920px] mx-auto">
          {whatToWear.map((item, index) => (
            <div key={index} className="relative aspect-[3/4] overflow-hidden group cursor-pointer">
              <img src={item.src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={item.label} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 w-full text-center px-2">
                <span className="text-white text-[14px] font-bold uppercase tracking-[0.15em]">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. POPULAR BRANDS */}
      <section className="w-full py-20 bg-white border-t border-gray-100">
        <div className="w-full text-center mb-16">
          <h2 className="text-[24px] font-bold text-black tracking-tight uppercase">Popular Brands</h2>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center justify-items-center">
          {popularBrands.map((brand, index) => (
            <div key={index} className="w-full flex items-center justify-center opacity-90">
              <img src={brand.src} alt={brand.alt} className="w-full max-h-[120px] object-contain" />
            </div>
          ))}
        </div>
      </section>

      {/* 7. TRENDING SNEAKERS (FULL VIỀN) */}
      <section className="w-full py-12 bg-white border-t border-gray-100">
        <div className="w-full text-center mb-10 px-4">
          <h2 className="text-[28px] md:text-[36px] font-bold text-black tracking-tight uppercase">
            Trending: Most Wanted Sneakers
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 px-1 max-w-[100%] mx-auto">
          {trendingSneakers.map((item, index) => (
            <div key={index} className="flex flex-col group cursor-pointer">
              <div className="w-full aspect-[1/1.2] overflow-hidden bg-gray-50 mb-3">
                <img src={item.src} alt={item.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="px-4 pb-6">
                <p className="text-[11px] text-gray-800 font-normal leading-relaxed uppercase tracking-wider">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. MỤC MỚI: SHOP NOW & BRAND DESCRIPTION (CUỐI TRANG) */}
      <section className="w-full py-24 bg-white border-t border-gray-100 flex flex-col items-center px-4">
        {/* Nút SHOP NOW Đen */}
        <button className="bg-black text-white px-12 py-4 text-[14px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all mb-16">
          SHOP NOW
        </button>
        
        {/* Nội dung đoạn văn chi tiết */}
        <div className="max-w-[900px] text-center">
          <p className="text-[14px] text-gray-800 leading-[1.8] font-normal">
            Level up your off-duty 'fits with **NEWEGG**, serving up on-trend menswear and accessories from your fave brands. 
            Raise your layer game with elevated basics from Only & Sons ft. *all* those must-have closet essentials – 
            from smart-casj polos to oversized tees and throw-on shirts in tonal hues. If you're scrolling for trousers 
            and jeans, from on-trend cargos to classic chinos and denim, Pull&Bear delivers – while Jack & Jones’ edit 
            of sneakers and office-ready footwear keeps your kicks on point (think Derbys, brogues and Chelsea boots 
            to finish off the 'fit). For chill-beating styles, filter by The North Face for iconic puffers in 
            colour-block hues and versatile monochromes. And for working up a sweat, Nike and New Balance have 
            got athleisurewear wrapped up – with tech-focused performance wear guaranteed to wick moisture, 
            and make those early-morning runs a breeze. Let’s scroll.
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