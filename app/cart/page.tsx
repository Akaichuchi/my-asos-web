"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("balance");
  const [userBalance, setUserBalance] = useState(1001.00); 

  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data) {
      setCartItems(JSON.parse(data));
    }
    
    const savedBalance = localStorage.getItem("user_balance");
    if (savedBalance) setUserBalance(parseFloat(savedBalance));
    
    setLoading(false);
  }, []);

  const totalPrice = cartItems.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);

  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (id: string, qty: number) => {
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: qty } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === "balance") {
      if (userBalance < totalPrice) {
        alert("SỐ DƯ KHÔNG ĐỦ!");
        return;
      }

      const confirmOrder = confirm(`XÁC NHẬN THANH TOÁN $${totalPrice.toFixed(2)}?`);
      if (confirmOrder) {
        const newBalance = userBalance - totalPrice;
        setUserBalance(newBalance);
        localStorage.setItem("user_balance", newBalance.toString());
        localStorage.removeItem("cart");
        setCartItems([]);
        alert("THANH TOÁN THÀNH CÔNG!");
        router.push("/"); 
      }
    }
  };

  if (loading) return <div className="py-20 text-center font-black italic animate-pulse">LOADING...</div>;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-[600px] mx-auto py-24 px-4 text-center">
        <h1 className="text-[30px] font-black uppercase italic mb-6">Túi hàng đang trống</h1>
        <Link href="/" className="inline-block bg-black text-white px-12 py-4 font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans text-black pb-20">
      <div className="max-w-[600px] mx-auto px-4 pt-10">
        <h1 className="text-[28px] font-black uppercase italic tracking-tighter mb-8 border-b-4 border-black pb-2">GIỎ HÀNG</h1>

        {/* Bảng Header Đen Trắng */}
        <div className="grid grid-cols-3 border-b-2 border-black py-4 text-center text-[12px] font-black uppercase tracking-widest mb-8">
          <div>Giá</div>
          <div>Số lượng</div>
          <div>Tổng</div>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="space-y-10 mb-12">
          {cartItems.map((item, index) => (
            <div key={index} className="border-b border-zinc-100 pb-8">
              <div className="flex gap-5 mb-6">
                <div className="w-24 aspect-[3/4] bg-zinc-100 overflow-hidden">
                   <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="text-[14px] font-black leading-tight uppercase tracking-tight">{item.name}</h3>
                  <p className="text-[11px] text-zinc-500 font-bold uppercase">Size: {item.size || item.selectedSize}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 items-center text-center">
                <div className="text-[16px] font-bold">${Number(item.price).toFixed(2)}</div>
                <div className="flex justify-center">
                  <select 
                    value={item.quantity} 
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="border-2 border-black p-1 text-[14px] outline-none bg-white font-black cursor-pointer"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-[16px] font-black">${(Number(item.price) * item.quantity).toFixed(2)}</span>
                  <button onClick={() => removeItem(item.id)} className="text-zinc-300 hover:text-black transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nút màu đen chuẩn Style trang chủ */}
        <Link href="/" className="inline-block bg-black text-white px-10 py-4 text-[12px] font-black uppercase tracking-widest hover:invert transition-all mb-12">
          Tiếp tục mua sắm
        </Link>

        {/* Mã giảm giá - Viền đen đậm */}
        <div className="mb-12">
          <h2 className="text-[20px] font-black uppercase italic mb-6 tracking-tighter text-zinc-400">Ưu đãi</h2>
          <div className="flex gap-2">
            <input type="text" placeholder="COUPON CODE" className="flex-1 border-2 border-black px-4 py-3 outline-none text-[14px] font-black placeholder:text-zinc-300" />
            <button className="bg-black text-white px-8 py-3 text-[11px] font-black uppercase tracking-widest active:scale-95 transition-transform">
              ÁP DỤNG
            </button>
          </div>
        </div>

        {/* Tổng kết đơn hàng - Thiết kế tối giản */}
        <div className="mb-10 bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-[22px] font-black uppercase italic mb-6 border-b-2 border-zinc-100 pb-2">Thanh toán</h2>
          <div className="space-y-4 text-[15px] font-bold">
            <div className="flex justify-between">
              <span className="text-zinc-400 uppercase">Tạm tính</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400 uppercase">Vận chuyển</span>
              <span className="text-black font-black underline">MIỄN PHÍ</span>
            </div>
            <div className="flex justify-between text-[20px] pt-4 border-t-2 border-black">
              <span className="uppercase font-black">Tổng cộng</span>
              <span className="font-black">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Lựa chọn phương thức - Tông màu đen */}
          <div className="mt-10 space-y-2">
            <label className="flex items-center gap-3 cursor-pointer p-4 border-2 border-black bg-zinc-50 transition-all">
              <input 
                type="radio" 
                checked={paymentMethod === "balance"} 
                onChange={() => setPaymentMethod("balance")} 
                className="w-5 h-5 accent-black" 
              />
              <span className="text-[13px] font-black uppercase tracking-tight">Thanh toán số dư (${userBalance.toFixed(2)})</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-4 border-2 border-zinc-100 opacity-30 grayscale">
              <input type="radio" disabled className="w-5 h-5 accent-black" />
              <span className="text-[13px] font-black uppercase tracking-tight">Thanh toán điểm</span>
            </label>
          </div>

          <button 
            onClick={handlePlaceOrder}
            className="w-full bg-black text-white py-6 mt-8 text-[16px] font-black uppercase tracking-[6px] hover:invert transition-all active:translate-y-1"
          >
            ĐẶT HÀNG
          </button>
        </div>

        {/* Footer info Đen Trắng */}
        <div className="bg-black text-white p-10 text-center font-black uppercase italic text-[11px] tracking-[4px] leading-relaxed">
            Hài lòng tuyệt đối hoặc hoàn trả trong 30 ngày <br/>
            <span className="text-zinc-500">Hỗ trợ khách hàng 24/7</span>
        </div>
      </div>
    </div>
  );
}