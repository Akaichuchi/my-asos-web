"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SavedItemsPage() {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("wishlist");
    if (data) {
      setWishlist(JSON.parse(data));
    }
    setLoading(false);
  }, []);

  const removeItem = (id: string) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const moveToBag = (item: any) => {
    // 1. Thêm vào giỏ hàng
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const newItem = { ...item, quantity: 1, selectedSize: "M" }; // Mặc định size M hoặc yêu cầu chọn
    localStorage.setItem("cart", JSON.stringify([...currentCart, newItem]));
    
    // 2. Xóa khỏi danh sách yêu thích
    removeItem(item.id);
    
    // 3. Chuyển hướng sang giỏ hàng
    router.push("/cart");
  };

  if (loading) return <div className="py-20 text-center font-black italic animate-pulse">LOADING SAVED ITEMS...</div>;

  if (wishlist.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <div className="text-6xl mb-6">❤️</div>
        <h1 className="text-2xl font-black uppercase italic mb-4">You have no Saved Items</h1>
        <p className="text-gray-600 mb-8 text-sm">Start hearting items you love and they'll show up here.</p>
        <Link href="/men/all" className="inline-block border-2 border-black px-10 py-3 font-bold uppercase hover:bg-black hover:text-white transition-all">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto py-10 px-4">
      <div className="flex justify-between items-end border-b-2 border-black pb-4 mb-8">
        <h1 className="text-2xl font-black uppercase italic">Saved Items</h1>
        <span className="text-sm font-bold text-gray-500">{wishlist.length} items</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div key={item.id} className="group relative flex flex-col border border-gray-100 p-2 hover:shadow-xl transition-shadow">
            {/* Ảnh sản phẩm */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
              <Link href={`/product/${item.id}`}>
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              </Link>
              {/* Nút xóa nhanh */}
              <button 
                onClick={() => removeItem(item.id)}
                className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full hover:bg-white shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Thông tin */}
            <div className="mt-4 flex-1 space-y-1">
              <h3 className="text-[13px] text-gray-700 line-clamp-2 h-10">{item.name}</h3>
              <p className="font-black text-[15px]">${Number(item.price).toFixed(2)}</p>
            </div>

            {/* Nút Move to Bag */}
            <button 
              onClick={() => moveToBag(item)}
              className="mt-4 w-full border border-black py-2 text-[12px] font-black uppercase hover:bg-black hover:text-white transition-all"
            >
              Move to Bag
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}