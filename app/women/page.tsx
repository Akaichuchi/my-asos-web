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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Lấy dữ liệu từ Admin (giới hạn 20 sản phẩm cho thanh trượt)
        const response = await fetch("/api/products?category=women&limit=20");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        // Dữ liệu mẫu hiển thị tràn màn hình nếu API chưa sẵn sàng
        const mockData = Array(12).fill(null).map((_, i) => ({
          id: i,
          name: "ASOS DESIGN New Season Collection 2026",
          price: "$25.00",
          img: "https://images.asos-media.com/products/asos-design-crew-neck-mini-dress/204123888-1",
          tag: i % 2 === 0 ? "NEW IN" : "SELLING FAST"
        }));
        setProducts(mockData);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-white w-full overflow-x-hidden">
      {/* 1. BANNER TRÊN CÙNG - TRÀN VIỀN */}
      <div className="bg-black text-white py-2 w-full border-b border-gray-800">
        <div className="w-full flex justify-between items-center px-4 md:px-10">
          <div className="hidden md:block border border-white px-4 py-1 text-[10px] font-bold uppercase">Women</div>
          <div className="text-center">
            <p className="text-[12px] font-black uppercase tracking-tighter">The Winter Sale: up to 70% off*</p>
          </div>
          <div className="hidden md:block border border-white px-4 py-1 text-[10px] font-bold uppercase">Men</div>
        </div>
      </div>

      {/* 2. HERO VIDEO - TRÀN MÀN HÌNH 100% */}
      <section className="relative w-full overflow-hidden bg-gray-100">
        <video autoPlay muted loop playsInline className="w-full h-auto object-cover min-h-[350px] md:min-h-[550px]">
          <source src="/images/videodaidienjpc.mp4" type="video/mp4" />
        </video>
      </section>

      {/* 3. HỆ THỐNG NÚT BẤM DANH MỤC */}
      <div className="w-full bg-black py-8">
        <div className="w-full px-4 flex flex-wrap justify-center gap-3">
          {["View all", "Dresses", "Coats", "Shoes", "Tops", "Accessories"].map((item) => (
            <button key={item} className="border border-white text-white px-8 py-3 text-[12px] font-black uppercase hover:bg-white hover:text-black transition-all">
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* 4. THANH TRƯỢT SẢN PHẨM: KÉO TỪ PHẢI SANG TRÁI */}
      <section className="w-full py-16">
        <div className="px-4 md:px-10 mb-10 flex justify-between items-end">
          <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter">
            Sale: selling fast
          </h2>
          <span className="text-[11px] font-bold uppercase text-gray-400">Scroll to explore →</span>
        </div>
        
        {loading ? (
          <div className="px-10 py-20 animate-pulse font-bold uppercase">Loading...</div>
        ) : (
          /* Vùng kéo sản phẩm */
          <div className="flex overflow-x-auto gap-6 px-4 md:px-10 pb-10 no-scrollbar cursor-grab active:cursor-grabbing">
            {products.slice(0, 20).map((product) => (
              <div key={product.id} className="min-w-[280px] md:min-w-[380px] flex-shrink-0 group relative">
                {/* Ảnh sản phẩm to tràn khung hình mẫu */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#F6F6F6] mb-6">
                  <img 
                    src={product.img} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.tag && (
                    <span className="absolute top-4 left-0 bg-white px-3 py-1 text-[10px] font-bold uppercase italic shadow-sm">
                      {product.tag}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-[13px] text-gray-900 font-semibold uppercase leading-tight group-hover:underline">
                    {product.name}
                  </h3>
                  <p className="font-bold text-[16px] text-[#d01345]">{product.price}</p>
                </div>
                <Link href={`/product/${product.id}`} className="absolute inset-0 z-10" />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CSS bổ sung để ẩn thanh cuộn (Thêm vào globals.css hoặc dùng Tailwind inline) */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}