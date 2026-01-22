import Link from "next/link";
import ProductCard from "./components/ProductCard";

export default function Home() {
  const products = [
    { 
      id: 1, 
      name: "Áo khoác ASOS Design - Mẫu mới 2026", 
      price: "1.250.000đ", 
      image: "https://images.asos-media.com/products/asos-design-oversized-t-shirt-in-white-with-back-print/204344445-1-white?$n_640w$&wid=513" 
    },
    { 
      id: 2, 
      name: "Quần Jean Slim Fit - Denim Blue", 
      price: "950.000đ", 
      image: "https://images.asos-media.com/products/asos-design-slim-jeans-in-light-wash-blue/204123456-1-blue?$n_640w$&wid=513" 
    },
    { 
      id: 3, 
      name: "Giày Sneaker Trắng Unisex", 
      price: "1.500.000đ", 
      image: "https://images.asos-media.com/products/asos-design-sneakers-in-white/203987654-1-white?$n_640w$&wid=513" 
    },
    { 
      id: 4, 
      name: "Áo Thun Oversize Đen", 
      price: "450.000đ", 
      image: "https://images.asos-media.com/products/asos-design-oversized-heavyweight-t-shirt-in-black/204556677-1-black?$n_640w$&wid=513" 
    },
  ];

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
            alt="ASOS Campaign 2026"
          />
        </picture>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center z-10">
          <h2 className="text-6xl md:text-9xl font-black italic tracking-tighter uppercase drop-shadow-2xl">
            This is ASOS
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
          <p className="font-bold text-xs md:text-base uppercase leading-tight">ASOS PREMIER <br/> UNLIMITED DELIVERY</p>
        </div>
        <div className="bg-[#26e382] p-6 md:p-8 flex items-center justify-center h-[160px] md:h-[200px]">
          <p className="font-bold text-xs md:text-base uppercase leading-tight">Easy returns</p>
        </div>
      </div>

      {/* PHẦN CẬP NHẬT: The biggest labels - Tiêu đề SIÊU LỚN & FULL WIDTH */}
      <div className="w-full py-16 bg-white">
        <h2 className="text-center text-4xl md:text-7xl font-black mb-12 tracking-tighter uppercase italic">
          The biggest labels
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-0">
          <img src="/images/promo_bau_hp_ww_01v2.webp" alt="Adidas" className="w-full h-auto block" />
          <img src="/images/promo_bau_hp_ww_02---v3.webp" alt="Mango" className="w-full h-auto block" />
          <img src="/images/promo_bau_hp_ww_03.webp" alt="Asos Design" className="w-full h-auto block" />
          <img src="/images/promo_bau_hp_ww_04.webp" alt="Topshop" className="w-full h-auto block" />
        </div>
      </div>

      {/* Brand Grid Section - Giữ nguyên 100% */}
      <div className="max-w-7xl mx-auto px-4 mt-6 flex flex-col items-center">
        <Link 
          href="/brands" 
          className="border-2 border-black px-8 py-3 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all mb-10 inline-block"
        >
          Shop Women&apos;s Brands
        </Link>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <div className="relative aspect-[3/4] bg-gray-100 group cursor-pointer overflow-hidden">
            <img src="https://images.asos-media.com/products/adidas-originals-adicolor-classics-t-shirt-in-burgundy/204111222-1-burgundy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Adidas" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" className="w-16 md:w-24 invert opacity-90" alt="Adidas Logo" />
            </div>
          </div>
        </div>
      </div>

      {/* Danh sách sản phẩm - Giữ nguyên 100% */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}