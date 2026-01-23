"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu từ localStorage khi trang load
  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data) {
      setCartItems(JSON.parse(data));
    }
    setLoading(false);
  }, []);

  // Tính tổng tiền
  const totalPrice = cartItems.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);

  // Xóa sản phẩm
  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  if (loading) return <div className="py-20 text-center font-black italic">LOADING BAG...</div>;

  // GIAO DIỆN KHI GIỎ HÀNG TRỐNG (Giữ nguyên ý tưởng của bạn)
  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <h1 className="text-2xl font-black uppercase italic mb-4">Your bag is empty</h1>
        <p className="text-gray-600 mb-8">Items remain in your bag for 60 minutes, and then they’re moved to your Saved Items.</p>
        <div className="flex justify-center gap-4">
          <Link href="/women" className="inline-block bg-black text-white px-10 py-3 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
            Shop Women
          </Link>
          <Link href="/men" className="inline-block bg-black text-white px-10 py-3 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
            Shop Men
          </Link>
        </div>
      </div>
    );
  }

  // GIAO DIỆN KHI CÓ SẢN PHẨM
  return (
    <div className="max-w-5xl mx-auto py-10 px-4 flex flex-col md:flex-row gap-10">
      {/* DANH SÁCH SẢN PHẨM */}
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-black uppercase italic border-b pb-4">My Bag</h1>
        {cartItems.map((item, index) => (
          <div key={index} className="flex gap-4 border-b pb-6 relative">
            <img src={item.image} alt={item.name} className="w-24 md:w-32 aspect-[3/4] object-cover bg-gray-100" />
            <div className="flex-1 space-y-1">
              <p className="font-bold text-[#d01345]">${Number(item.price).toFixed(2)}</p>
              <h3 className="text-sm md:text-base text-gray-800">{item.name}</h3>
              <p className="text-[12px] text-gray-500 uppercase font-bold">Size: {item.selectedSize || "N/A"}</p>
              <div className="flex items-center gap-4 mt-4">
                <select className="border p-1 text-sm outline-none">
                  <option>Qty: {item.quantity}</option>
                </select>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="text-[12px] font-bold uppercase underline text-gray-400 hover:text-black"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TỔNG KẾT ĐƠN HÀNG (Checkout) */}
      <div className="md:w-80 space-y-6">
        <div className="bg-gray-50 p-6 space-y-4">
          <h2 className="font-black uppercase italic text-lg">Total</h2>
          <div className="flex justify-between font-bold border-t pt-4">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <p className="text-[11px] text-gray-500 italic">Delivery charges and taxes calculated at checkout.</p>
          <button className="w-full bg-[#018849] text-white py-4 font-black uppercase tracking-widest hover:bg-[#016a3a] transition-all shadow-lg">
            Checkout
          </button>
        </div>
        
        <div className="border p-4 text-[12px] space-y-2">
          <p className="font-bold uppercase italic">We Accept:</p>
          <div className="flex gap-2 opacity-50 grayscale">
            <span className="border px-1">VISA</span>
            <span className="border px-1">PAYPAL</span>
            <span className="border px-1">APPLE PAY</span>
          </div>
        </div>
      </div>
    </div>
  );
}