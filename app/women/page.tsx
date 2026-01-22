"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

// Cấu trúc sản phẩm chuẩn để Admin đổ dữ liệu vào
interface Product {
  id: string | number;
  name: string;
  price: string;
  img: string;
  tag?: string;
}

export default function WomenPage() {
  // 1. Khởi tạo danh sách sản phẩm (Giữ nguyên từ code của bạn)
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "ASOS DESIGN sculpting halter neck crop top in black", price: "$37.99", img: "https://images.asos-media.com/products/asos-design-sculpting-halter-neck-crop-top-in-black/204344445-1-black", tag: "SELLING FAST" },
    { id: 2, name: "ASOS DESIGN long line t-shirt in black", price: "$29.99", img: "https://images.asos-media.com/products/asos-design-long-line-t-shirt-in-black/204123456-1-black" },
    { id: 3, name: "Topshop high neck ruffle button front long sleeve top", price: "$48.00", img: "https://images.asos-media.com/products/topshop-high-neck-ruffle-button-front-long-sleeve-top/203987654-1-grey", tag: "SELLING FAST" },
    { id: 4, name: "Topshop Sally folded bag in burgundy", price: "$47.99", img: "https://images.asos-media.com/products/topshop-sally-folded-bag-in-burgundy/204556677-1-burgundy" },
  ]);

  useEffect(() => {
    console.log("Trang Women đã nạp dữ liệu ổn định");
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* --- SEO STRATEGY (Giữ nguyên) --- */}
      <article className="sr-only">
        <h2>Bộ sưu tập Cool Girl Staples 2026 - Thời trang nữ ASOS</h2>
        <p>Mua sắm các mẫu áo crop top, túi xách và phụ kiện mới nhất được cập nhật từ hệ thống Admin.</p>
      </article>

      {/* 1. THANH BANNER ĐEN (Cố định bố cục) */}
      <div className="bg-black text-white py-2 px-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-center">
          <div className="hidden md:block border border-white px-4 py-1 text-[10px] font-bold">WOMEN</div>
          <div>
            <p className="text-[12px] font-black uppercase tracking-tighter">The Winter Sale: up to 70% off*</p>
            <p className="text-[9px] italic">Last chance to save big</p>
          </div>
          <div className="hidden md:block border border-white px-4 py-1 text-[10px] font-bold">MEN</div>
        </div>
      </div>

      {/* --- PHẦN MỚI TÍCH HỢP: HERO VIDEO & BANNER GIỮA --- */}
      <section className="relative w-full">
        {/* Chèn Video (Auto-switch PC/Mobile) */}
        <div className="relative w-full overflow-hidden bg-[#F6F6F6]">
          <video autoPlay muted loop playsInline className="hidden md:block w-full h-auto object-cover">
            <source src="/videodaidienjpc.mp4" type="video/mp4" />
          </video>
          <video autoPlay muted loop playsInline className="block md:hidden w-full h-auto object-cover">
            <source src="/videodt.mp4" type="video/mp4" />
          </video>
          
          {/* Lớp phủ chữ trên Video giống hình mẫu */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center pointer-events-none px-4">
            <h1 className="text-[#d01345] text-4xl md:text-7xl font-black uppercase italic tracking-tighter drop-shadow-md">
              The Winter Sale
            </h1>
            <div className="text-[#d01345] text-4xl md:text-7xl font-black uppercase italic tracking-tighter drop-shadow-md">
              Up to 70% Off
            </div>
          </div>
        </div>

        {/* Hệ thống nút bấm nhanh (Dưới Video) */}
        <div className="w-full bg-black py-4">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-2 md:gap-4">
            {["View all Sale", "Dresses", "Coats + jackets", "Footwear", "Tops", "Gifts"].map((item) => (
              <button key={item} className="border border-white text-white px-4 py-2 text-[10px] md:text-[12px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. THANH LỌC & SẮP XẾP (Giữ nguyên nhưng thêm bóng đổ nhẹ) */}
      <div className="max-w-7xl mx-auto px-4 py-4 border-b border-gray-100 sticky top-0 bg-white z-10 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button className="border px-4 py-2 text-[11px] font-bold flex items-center gap-2 uppercase hover:bg-gray-50 transition-colors">Sort <span className="text-[8px]">▼</span></button>
            <button className="border px-4 py-2 text-[11px] font-bold flex items-center gap-2 uppercase hover:bg-gray-50 transition-colors">Filter <span className="text-[8px]">▼</span></button>
          </div>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">{products.length} styles found</p>
        </div>
      </div>

      {/* 3. GRID SẢN PHẨM (Giữ nguyên bố cục của bạn) */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-center text-xl md:text-2xl font-black uppercase italic mb-10 tracking-tighter">Sale: selling fast</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative flex flex-col">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#F6F6F6] mb-4">
                <img 
                  src={product.img} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <button className="absolute bottom-3 right-3 bg-white/90 p-2 rounded-full shadow-md hover:bg-black hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              <div className="space-y-1 text-left">
                <h3 className="text-[12px] leading-snug text-gray-800 group-hover:underline cursor-pointer min-h-[32px] line-clamp-2">
                  {product.name}
                </h3>
                <p className="font-bold text-[13px]">{product.price}</p>
                
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