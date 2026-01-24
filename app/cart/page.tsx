"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("balance");
  const [userBalance, setUserBalance] = useState(0); 
  const [isOrdered, setIsOrdered] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data) {
      setCartItems(JSON.parse(data));
    }
    
    const fetchBalance = async () => {
      try {
        const response = await fetch('/api/user/10'); 
        const userData = await response.json();
        if (userData && userData.balance !== undefined) {
          setUserBalance(userData.balance);
          localStorage.setItem("user_balance", userData.balance.toString());
        }
      } catch (error) {
        console.error("Không thể lấy số dư thực tế");
        const savedBalance = localStorage.getItem("user_balance");
        if (savedBalance) setUserBalance(parseFloat(savedBalance));
      }
    };

    fetchBalance();
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

  const handlePlaceOrder = async () => {
    if (paymentMethod === "balance") {
      if (userBalance < totalPrice) {
        alert("SỐ DƯ KHÔNG ĐỦ!");
        return;
      }

      const confirmOrder = confirm(`XÁC NHẬN THANH TOÁN $${totalPrice.toFixed(2)}?`);
      if (confirmOrder) {
        try {
          // LẤY DỮ LIỆU ĐỂ HIỆN HÌNH ẢNH
          const firstItem = cartItems[0]; 

          const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: 10,
              totalAmount: totalPrice,
              // Gửi thêm productName và imageUrl để Database ghi nhận
              productName: cartItems.length > 1 
                ? `${firstItem.name} và ${cartItems.length - 1} món khác` 
                : firstItem.name,
              imageUrl: firstItem.image // Key này phải khớp với cột image_url trong DB
            }),
          });

          const result = await response.json();

          if (response.ok) {
            const newBalance = userBalance - totalPrice;
            setUserBalance(newBalance);
            localStorage.setItem("user_balance", newBalance.toString());
            localStorage.removeItem("cart");
            setCartItems([]);
            setIsOrdered(true);
          } else {
            alert("LỖI: " + result.error);
          }
        } catch (error) {
          alert("Lỗi kết nối hệ thống. Vui lòng thử lại!");
        }
      }
    }
  };

  if (loading) return <div className="py-20 text-center font-black italic animate-pulse">LOADING...</div>;

  if (isOrdered) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-[450px] bg-[#fdf8f8] p-12 text-center shadow-sm border border-zinc-100">
          <h2 className="text-[14px] font-medium uppercase tracking-[4px] mb-12 text-zinc-500">
            CẢM ƠN BẠN ĐÃ ĐẶT HÀNG!
          </h2>
          <div className="space-y-4">
            <Link 
              href="/" 
              className="block w-full bg-[#8e7c74] text-white py-4 text-[11px] font-bold uppercase tracking-[2px] hover:brightness-90 transition-all"
            >
              TIẾP TỤC MUA SẮM
            </Link>
            <button 
              onClick={() => router.push("/my-account/orders")} 
              className="block w-full bg-[#8e7c74] text-white py-4 text-[11px] font-bold uppercase tracking-[2px] hover:brightness-90 transition-all"
            >
              THEO DÕI ĐƠN CỦA TÔI
            </button>
          </div>
        </div>
      </div>
    );
  }

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
        <h1 className="text-[28px] font-black uppercase italic tracking-tighter mb-8 border-b-4 border-black pb-2 text-center">GIỎ HÀNG CỦA BẠN</h1>

        <div className="grid grid-cols-3 border-b-2 border-black py-4 text-center text-[12px] font-black uppercase tracking-widest mb-8">
          <div>Giá</div>
          <div>Số lượng</div>
          <div>Tổng cộng</div>
        </div>

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

        <Link href="/" className="inline-block bg-[#8e7c74] text-white px-10 py-4 text-[12px] font-black uppercase tracking-widest hover:brightness-90 transition-all mb-12">
          TIẾP TỤC MUA SẮM
        </Link>

        <div className="mb-12">
          <h2 className="text-[20px] font-black uppercase italic mb-6 tracking-tighter text-zinc-400">MÃ GIẢM GIÁ</h2>
          <div className="flex gap-2">
            <input type="text" placeholder="Coupon code" className="flex-1 border-2 border-black px-4 py-3 outline-none text-[14px] font-black" />
            <button className="bg-[#8e7c74] text-white px-8 py-3 text-[11px] font-black uppercase tracking-widest">
              ÁP DỤNG MÃ GIẢM GIÁ
            </button>
          </div>
        </div>

        <div className="mb-10 bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-[22px] font-black uppercase italic mb-6 border-b-2 border-zinc-100 pb-2">TỔNG GIỎ HÀNG</h2>
          <div className="space-y-4 text-[15px] font-bold">
            <div className="flex justify-between border-b border-zinc-100 pb-2">
              <span className="text-zinc-400 uppercase">Tổng cộng</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-100 pb-2">
              <span className="text-zinc-400 uppercase">Vận chuyển</span>
              <span className="text-black font-black underline">$0.00</span>
            </div>
            <div className="flex justify-between text-[20px] pt-4 border-t-2 border-black">
              <span className="uppercase font-black">Tổng cộng</span>
              <span className="font-black">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-10 space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" checked={paymentMethod === "balance"} onChange={() => setPaymentMethod("balance")} className="w-5 h-5 accent-black" />
              <span className="text-[14px] font-medium">Thanh toán bằng Số dư</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer opacity-50">
              <input type="radio" disabled className="w-5 h-5 accent-black" />
              <span className="text-[14px] font-medium">Thanh toán bằng Điểm</span>
            </label>
          </div>

          <button 
            onClick={handlePlaceOrder}
            className="w-full bg-[#8e7c74] text-white py-6 mt-8 text-[16px] font-black uppercase tracking-[6px] hover:brightness-90 transition-all active:translate-y-1"
          >
            ĐẶT HÀNG
          </button>
        </div>

        <div className="bg-black text-white p-10 text-center font-black uppercase italic text-[11px] tracking-[4px] leading-relaxed">
            Hài lòng tuyệt đối hoặc hoàn trả trong 30 ngày <br/>
            <span className="text-zinc-500">Hỗ trợ khách hàng 24/7</span>
        </div>
      </div>
    </div>
  );
}