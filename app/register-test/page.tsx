'use client';
import { useState, useEffect, useRef } from 'react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isShaking, setIsShaking] = useState(false); // Tính năng 1: Shake
  const emailInputRef = useRef<HTMLInputElement>(null); // Tính năng 2: Focus

  // 1. Tự động Focus vào ô Email khi trang vừa tải xong
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Kiểm tra định dạng email cơ bản trước khi gửi
    if (!email.includes('@')) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setMessage({ text: '❌ Email không hợp lệ!', type: 'error' });
      return;
    }

    setMessage({ text: 'Đang xử lý...', type: 'info' });

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage({ text: '✅ Thành công! Hãy mở Prisma Studio để cộng tiền.', type: 'success' });
      setEmail('');
    } else {
      // 2. Hiệu ứng rung khi có lỗi từ server
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setMessage({ text: `❌ Lỗi: ${data.error}`, type: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans bg-white relative">
      
      {/* QR CODE MOBILE với Tính năng 3: Fade-in animation */}
      <div className="block lg:hidden w-full h-[120px] overflow-hidden animate-in fade-in duration-1000">
        <img 
          src="/1111111.webp" 
          alt="Banner Mobile" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full lg:w-3/5 flex flex-col items-center px-4 pt-10 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-black tracking-tighter uppercase">NEWEGG</h1>
        </div>

        <div className="w-full max-w-md">
          <h2 className="text-center text-xl font-bold mb-2">Hi friend!</h2>
          <p className="text-center text-gray-500 text-sm mb-8">Enter your email to sign in or join for</p>

          <div className="grid grid-cols-4 gap-2 mb-10">
            {[
              { icon: '🏷️', label: 'Exclusive discounts' },
              { icon: '📦', label: 'Easily tracked orders' },
              { icon: '🚚', label: 'Returns reminders' },
              { icon: '⚡', label: 'Speedy checkout' }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center mb-1 text-lg">
                  {item.icon}
                </div>
                <span className="text-[10px] text-center leading-tight text-gray-600 font-bold uppercase">{item.label}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleRegister} className={`space-y-4 ${isShaking ? 'animate-bounce' : ''}`} style={isShaking ? {animation: 'shake 0.5s ease-in-out'} : {}}>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-widest">Email address:*</label>
              <input 
                ref={emailInputRef}
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full border-2 p-3 focus:border-black outline-none transition-all ${isShaking ? 'border-red-500' : 'border-gray-200'}`}
              />
            </div>

            <button type="submit" className="w-full bg-black text-white font-bold py-4 mt-4 hover:bg-gray-800 transition-colors uppercase tracking-widest active:scale-95">
              Continue
            </button>
          </form>

          {message.text && (
            <div className={`mt-6 p-4 text-center text-sm font-medium border animate-in slide-in-from-top-2 ${
              message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          <div className="mt-10 text-center border-t pt-6">
            <p className="text-xs text-gray-400 font-bold uppercase mb-6 tracking-widest">Or continue with</p>
            <div className="flex justify-center gap-6">
              <button className="w-12 h-12 border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all">
                <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-6 h-6" alt="Google" />
              </button>
              <button className="w-12 h-12 border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" className="w-6 h-6" alt="Facebook" />
              </button>
              <button className="w-12 h-12 border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" className="w-5 h-5" alt="Apple" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* QR CODE PC với Tính năng 3: Fade-in animation */}
      <div className="hidden lg:block lg:w-2/5 h-full min-h-screen relative overflow-hidden animate-in fade-in duration-1000">
        <img 
          src="/Snipaste_2026-01-23_19-09-41.webp" 
          alt="QR Pattern PC" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* CSS cho hiệu ứng Shake */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}