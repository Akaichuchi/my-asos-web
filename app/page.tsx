import Link from "next/link";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Banner Quảng Cáo */}
      <div className="w-full relative h-[450px] md:h-[650px] bg-black overflow-hidden">
        <picture>
          <source 
            media="(max-width: 767px)" 
            srcSet="/images/nenchinhmobile.webp" 
          />
          <img 
            src="/images/nenchinhdesktop.webp" 
            className="w-full h-full object-cover opacity-90"
            alt="NEWEGG Campaign 2026"
          />
        </picture>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center z-10">
          <h2 className="text-6xl md:text-9xl font-black italic tracking-tighter uppercase drop-shadow-2xl">
            This is NEWEGG
          </h2>
          <div className="flex flex-col md:flex-row gap-3 mt-6">
            <Link 
              href="/women" 
              className="bg-white text-black px-10 py-3 font-bold text-xs hover:bg-black hover:text-white transition-all uppercase tracking-widest flex items-center justify-center min-w-[180px]"
            >
              Shop Womens
            </Link>
            <Link 
              href="/men" 
              className="bg-white text-black px-10 py-3 font-bold text-xs hover:bg-black hover:text-white transition-all uppercase tracking-widest flex items-center justify-center min-w-[180px]"
            >
              Shop Mens
            </Link>
          </div>
        </div>
      </div>

      {/* 4 ô tiện ích */}
      <div className="grid grid-cols-2 md:grid-cols-4 w-full text-center">
        <div className="bg-[#d0ff00] p-6 md:p-8 flex items-center justify-center h-[160px] md:h-[200px]">
          <p className="font-bold text-xs md:text-base uppercase leading-tight">New here? <br/> Get your first-timer discount</p>
        </div>
        <div className="bg-[#c1f5ff] p-6 md:p-8 flex items-center justify-center h-[160px] md:h-[200px]">
          <p className="font-bold text-xs md:text-base uppercase leading-tight">Download our app for exclusive discounts</p>
        </div>
        <div className="bg-[#ffc1d1] p-6 md:p-8 flex items-center justify-center h-[160px] md:h-[200px]">
          <p className="font-bold text-xs md:text-base uppercase leading-tight">NEWEGG PREMIER <br/> UNLIMITED DELIVERY</p>
        </div>
        <div className="bg-[#26e382] p-6 md:p-8 flex items-center justify-center h-[160px] md:h-[200px]">
          <p className="font-bold text-xs md:text-base uppercase leading-tight">Easy returns</p>
        </div>
      </div>

      {/* SECTION 1: The biggest labels (Women) */}
      <div className="w-full py-12 bg-white">
        <h2 className="text-center text-4xl md:text-7xl font-black mb-12 tracking-tighter uppercase italic">
          The biggest labels
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-0">
          <img src="/images/promo_bau_hp_ww_01v2.webp" alt="Adidas" className="w-full h-auto block" />
          <img src="/images/promo_bau_hp_ww_02---v3.webp" alt="Mango" className="w-full h-auto block" />
          <img src="/images/promo_bau_hp_ww_03.webp" alt="NEWEGG Design" className="w-full h-auto block" />
          <img src="/images/promo_bau_hp_ww_04.webp" alt="Topshop" className="w-full h-auto block" />
        </div>
        <div className="flex justify-center mt-12 mb-16">
          <Link 
            href="/brands" 
            className="border-2 border-black px-12 py-4 font-bold text-xs uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all"
          >
            Shop Women&apos;s Brands
          </Link>
        </div>
      </div>

      {/* SECTION 2: The biggest labels (Men) */}
      <div className="w-full pb-20 bg-white border-t border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-0 pt-12">
          <img src="/images/promo_bau_hp_mw_01.webp" alt="Adidas Men" className="w-full h-auto block" />
          <img src="/images/promo_bau_hp_mw_02---v3.webp" alt="New Balance" className="w-full h-auto block" />
          <img src="/images/promo_bau_hp_mw_03.webp" alt="NEWEGG Design Men" className="w-full h-auto block" />
          <img src="/images/promo_bau_hp_mw_04.webp" alt="Topman" className="w-full h-auto block" />
        </div>
        <div className="flex justify-center mt-12">
          <Link 
            href="/men-brands" 
            className="border-2 border-black px-12 py-4 font-bold text-xs uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all"
          >
            Shop Men&apos;s Brands
          </Link>
        </div>
      </div>

      {/* ĐÃ LOẠI BỎ TOÀN BỘ PHẦN BRAND GRID VÀ DANH SÁCH SẢN PHẨM DƯỚI NÀY */}
    </main>
  );
}