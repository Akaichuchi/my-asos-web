"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  images: string;
  category: string;
  tag?: string;
  isSellingFast?: boolean;
  hasMoreColors?: boolean;
}

export default function AllWomenProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch("/api/products?category=women");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Lỗi fetch sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  // HÀM XỬ LÝ LƯU - ĐÃ ĐỒNG BỘ 100% VỚI LOGIC TRANG CHI TIẾT CỦA BẠN
  const handleToggleWishlist = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();

    // Sử dụng Key "wishlist" và cấu trúc Object giống hệt trang chi tiết
    const currentWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const isExisted = currentWishlist.find((item: any) => item.id === product.id);

    if (!isExisted) {
      currentWishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images // Đồng bộ ảnh
      });
      localStorage.setItem("wishlist", JSON.stringify(currentWishlist));
      alert("Đã thêm vào mục yêu thích! ❤️");
    } else {
      // Nếu đã có thì xóa (Logic Toggle chuyên nghiệp)
      const newWishlist = currentWishlist.filter((item: any) => item.id !== product.id);
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      alert("Đã xóa khỏi mục yêu thích.");
    }

    // Kích hoạt sự kiện để Header cập nhật số lượng ngay lập tức
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="bg-white min-h-screen text-black">
      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-4">
        {/* BREADCRUMBS - GIỮ NGUYÊN */}
        <nav className="text-[11px] text-gray-500 mb-4 flex items-center gap-2">
          <Link href="/" className="hover:underline">Home</Link> <span>›</span>
          <Link href="/women" className="hover:underline">Women</Link> <span>›</span>
          <span className="text-gray-400 font-medium">CTAS</span>
        </nav>

        {/* TIÊU ĐỀ & CHIPS - GIỮ NGUYÊN */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <h1 className="text-2xl font-black uppercase tracking-widest">CTAS</h1>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {["Summer rodeo", "Face + Body Bestsellers", "Trending styles", "For Love & Lemons", "Bubble"].map((tag) => (
              <button key={tag} className="px-4 py-1.5 border border-gray-300 text-[13px] font-medium whitespace-nowrap hover:border-black">
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* THANH CÔNG CỤ - GIỮ NGUYÊN */}
        <div className="sticky top-[64px] z-30 bg-white/95 border-y border-gray-100 py-3 flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider border-r pr-4">
              Sort <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2"/></svg>
            </button>
            <button className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider">
              Filter <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 4h18M6 12h12m-9 8h6" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </div>
          <p className="text-[12px] text-gray-400 font-medium">{products.length.toLocaleString()} styles found</p>
        </div>

        {/* GRID SẢN PHẨM */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12">
          {loading ? (
            [...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-100 aspect-[3/4] w-full rounded-sm" />
            ))
          ) : (
            products.map((item) => {
              const discount = item.originalPrice 
                ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) 
                : 0;

              return (
                <div key={item.id} className="group flex flex-col relative">
                  {/* Bọc phần hình ảnh - Nhấn vào để xem chi tiết */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#f3f3f3]">
                    <Link href={`/product/${item.id}`} className="block w-full h-full">
                      {discount > 0 && (
                        <span className="absolute top-0 left-0 z-10 bg-white text-[#d01345] px-2 py-1 text-[12px] font-bold">
                          -{discount}%
                        </span>
                      )}
                      
                      <img 
                        src={item.images} 
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>

                    {/* NÚT TIM - ĐÃ ĐỒNG BỘ LOGIC CHI TIẾT */}
                    <button 
                      onClick={(e) => handleToggleWishlist(e, item)}
                      className="absolute bottom-3 right-3 z-20 bg-white/90 p-2 rounded-full shadow-sm hover:bg-white transition-all active:scale-95 group/heart"
                      title="Save for later"
                    >
                      <svg className="w-5 h-5 group-hover/heart:fill-red-500 group-hover/heart:stroke-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>

                  {/* THÔNG TIN SẢN PHẨM */}
                  <div className="mt-3 space-y-1">
                    <Link href={`/product/${item.id}`}>
                      <h3 className="text-[13px] text-gray-700 leading-snug group-hover:underline cursor-pointer min-h-[36px] line-clamp-2">
                        {item.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center gap-2">
                      {item.originalPrice && (
                        <p className="text-[14px] text-gray-500 line-through">${item.originalPrice.toFixed(2)}</p>
                      )}
                      <p className={`text-[14px] font-black tracking-tight ${item.originalPrice ? 'text-[#d01345]' : 'text-black'}`}>
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 pt-1 min-h-[22px]">
                      <span className="text-[9px] font-bold uppercase text-gray-400 border border-gray-200 px-1.5 py-0.5">More colors</span>
                      <span className="text-[9px] font-bold uppercase bg-[#eeeeee] text-[#2d2d2d] px-1.5 py-0.5">
                        {item.tag || "Selling Fast"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}