"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string; // Tên biến image đồng bộ với dữ liệu Men của bạn
  brand: string;
  isSellingFast?: boolean;
  hasMoreColors?: boolean;
}

export default function AllMenProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        // Gọi API lấy toàn bộ sản phẩm category là men
        const response = await fetch("/api/products?category=men");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Lỗi fetch sản phẩm nam:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  // LOGIC XỬ LÝ YÊU THÍCH - ĐỒNG BỘ 100% VỚI TRANG CHI TIẾT
  const handleToggleWishlist = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();

    // Sử dụng KEY "wishlist" để đồng bộ dữ liệu toàn trang
    const currentWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const isExisted = currentWishlist.find((item: any) => item.id === product.id);

    if (!isExisted) {
      currentWishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image // Lưu đúng ảnh của sản phẩm nam
      });
      localStorage.setItem("wishlist", JSON.stringify(currentWishlist));
      alert("Đã thêm vào mục yêu thích! ❤️");
    } else {
      const newWishlist = currentWishlist.filter((item: any) => item.id !== product.id);
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      alert("Đã xóa khỏi mục yêu thích.");
    }

    // Bắn sự kiện cập nhật Header
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="bg-white min-h-screen text-black">
      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-4">
        {/* BREADCRUMBS - GIỮ NGUYÊN */}
        <nav className="text-[11px] text-gray-500 mb-4 flex items-center gap-2">
          <Link href="/" className="hover:underline">Home</Link> <span>›</span>
          <Link href="/men" className="hover:underline">Men</Link> <span>›</span>
          <span className="text-gray-400 font-medium">All Styles</span>
        </nav>

        {/* HEADER DANH MỤC & CHIPS - GIỮ NGUYÊN */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <h1 className="text-2xl font-black uppercase tracking-widest">MEN'S CLOTHING</h1>
          
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {["New In", "T-Shirts", "Hoodies", "Jeans", "Shoes", "Accessories", "Suits"].map((tag) => (
              <button key={tag} className="px-5 py-1.5 border border-gray-300 text-[13px] font-bold whitespace-nowrap hover:border-black transition-all">
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* TOOLBAR: SORT & FILTER - GIỮ NGUYÊN */}
        <div className="sticky top-[64px] z-30 bg-white/95 border-y border-gray-100 py-3 flex justify-between items-center mb-8">
          <div className="flex gap-6">
            <button className="flex items-center gap-2 text-[12px] font-black uppercase tracking-widest border-r pr-6">
              Sort <span className="text-[10px]">▼</span>
            </button>
            <button className="flex items-center gap-2 text-[12px] font-black uppercase tracking-widest">
              Filter <span className="text-[10px]">▼</span>
            </button>
          </div>
          <p className="text-[12px] text-gray-400 font-medium">{products.length} styles found</p>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12">
          {loading ? (
            [...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="bg-gray-100 aspect-[3/4] w-full" />
                <div className="h-4 bg-gray-100 w-3/4" />
                <div className="h-4 bg-gray-100 w-1/4" />
              </div>
            ))
          ) : (
            products.map((item) => (
              <div key={item.id} className="group flex flex-col relative">
                {/* ẢNH VÀ NÚT TIM - ĐÃ TÁCH BIỆT NÚT BẤM */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#f3f3f3]">
                  <Link href={`/product/${item.id}`} className="block w-full h-full">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                  
                  {/* NÚT TIM TÁCH BIỆT KHỎI LINK */}
                  <button 
                    onClick={(e) => handleToggleWishlist(e, item)}
                    className="absolute bottom-3 right-3 z-20 bg-white/90 p-2 rounded-full shadow-sm hover:bg-white transition-all active:scale-90 group/heart"
                    title="Save for later"
                  >
                    <svg className="w-5 h-5 group-hover/heart:fill-red-500 group-hover/heart:stroke-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                {/* THÔNG TIN SẢN PHẨM - GIỮ NGUYÊN */}
                <div className="mt-3 space-y-1">
                  <Link href={`/product/${item.id}`}>
                    <h3 className="text-[13px] text-gray-700 leading-snug group-hover:underline cursor-pointer min-h-[36px] line-clamp-2">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-[14px] font-black tracking-tight">${item.price.toFixed(2)}</p>
                  
                  {/* BADGES */}
                  <div className="flex flex-wrap gap-2 pt-1 min-h-[22px]">
                    {item.isSellingFast && (
                      <span className="text-[9px] font-bold uppercase bg-[#eeeeee] text-[#2d2d2d] px-1.5 py-0.5">Selling Fast</span>
                    )}
                    {item.hasMoreColors && (
                      <span className="text-[9px] font-bold uppercase text-gray-400 border border-gray-200 px-1.5 py-0.5">More colors</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}