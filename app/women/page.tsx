"use client";
import { useEffect, useState, useRef } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // 1. Logic kéo chuột (Drag to Scroll) cho máy tính
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Tốc độ kéo
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    // Lấy tối đa 20 sản phẩm từ Admin
    fetch("/api/products?category=women&limit=20")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => {
        // Dữ liệu dự phòng nếu lỗi API
        setProducts(Array(10).fill(null).map((_, i) => ({
          id: i,
          name: "ASOS DESIGN New Season Collection 2026",
          price: "$25.00",
          img: "https://images.asos-media.com/products/asos-design-crew-neck-mini-dress/204123888-1",
          tag: "SELLING FAST"
        })));
      });
  }, []);

  return (
    <main className="min-h-screen bg-white w-full overflow-x-hidden">
      {/* 1. BANNER ĐEN - GIỮ NGUYÊN 100% */}
      <div className="bg-black text-white py-2 w-full border-b border-gray-800">
        <div className="w-full flex justify-between items-center px-4 md:px-10">
          <div className="hidden md:block border border-white px-4 py-1 text-[10px] font-bold uppercase">Women</div>
          <div className="text-center">
            <p className="text-[12px] font-black uppercase tracking-tighter">The Winter Sale: up to 70% off*</p>
          </div>
          <div className="hidden md:block border border-white px-4 py-1 text-[10px] font-bold uppercase">Men</div>
        </div>
      </div>

      {/* 2. HERO VIDEO - GIỮ NGUYÊN 100% */}
      <section className="relative w-full">
        <video autoPlay muted loop playsInline className="w-full h-auto object-cover min-h-[350px] md:min-h-[550px]">
          <source src="/images/videodaidienjpc.mp4" type="video/mp4" />
        </video>
      </section>

      {/* 3. NÚT DANH MỤC - GIỮ NGUYÊN 100% */}
      <div className="w-full bg-black py-8">
        <div className="w-full px-4 flex flex-wrap justify-center gap-3">
          {["View all", "Dresses", "Coats", "Shoes", "Tops"].map((item) => (
            <button key={item} className="border border-white text-white px-8 py-3 text-[12px] font-black uppercase hover:bg-white hover:text-black transition-all">
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* 4. KHU VỰC SẢN PHẨM TRƯỢT NGANG */}
      <section className="w-full py-16">
        {/* TIÊU ĐỀ ĐÃ CĂN GIỮA CHÍNH XÁC */}
        <div className="w-full text-center mb-10 px-4">
          <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">
            Sale: selling fast
          </h2>
          <p className="text-[11px] font-bold text-gray-400 mt-2 uppercase tracking-widest md:hidden">Scroll to explore →</p>
        </div>
        
        {/* THANH TRƯỢT CÓ TÍNH NĂNG KÉO CHUỘT */}
        <div 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex overflow-x-auto gap-6 px-4 md:px-10 pb-10 no-scrollbar ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} select-none`}
        >
          {products.map((product) => (
            <div key={product.id} className="min-w-[280px] md:min-w-[400px] flex-shrink-0 group relative">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#F6F6F6] mb-6">
                <img 
                  src={product.img} 
                  alt={product.name}
                  draggable="false" // Ngăn trình duyệt kéo ảnh mặc định
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                />
                {product.tag && (
                  <span className="absolute top-4 left-0 bg-white px-3 py-1 text-[10px] font-bold uppercase italic border-r border-b">
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
      </section>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}