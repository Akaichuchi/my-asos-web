'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isShaking, setIsShaking] = useState(false); // Giữ nguyên Tính năng 1: Shake
  const emailInputRef = useRef<HTMLInputElement>(null); // Giữ nguyên Tính năng 2: Focus

  // 1. Giữ nguyên: Tự động Focus vào ô Email khi trang vừa tải xong
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.includes('@')) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setMessage({ text: '❌ Email không hợp lệ!', type: 'error' });
      return;
    }

    setMessage({ text: 'Đang kiểm tra tài khoản...', type: 'info' });

    // Gọi API login để kiểm tra email đã có trong database chưa
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email }),
    });

    const data = await response.json();

    if (response.ok) {
      // ĐĂNG NHẬP THÀNH CÔNG
      localStorage.setItem('userEmail', email); // Lưu email để Header hiện "Hi, Akai"
      setMessage({ text: '✅ Đăng nhập thành công! Đang quay lại...', type: 'success' });
      
      setTimeout(() => {
        router.push('/');
        window.location.reload(); 
      }, 1500);
    } else {
      // THẤT BẠI: Nếu tài khoản chưa tồn tại hoặc lỗi khác
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setMessage({ text: `❌ Lỗi: ${data.error || 'Tài khoản không tồn tại!'}`, type: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans bg-white relative">
      
      {/* Giữ nguyên: QR CODE MOBILE */}
      <div className="block lg:hidden w-full h-[120px] overflow-hidden animate-in fade-in duration-1000">
        <img src="/images/1111111.webp" alt="Banner Mobile" className="w-full h-full object-cover" />
      </div>

      <div className="w-full lg:w-3/5 flex flex-col items-center px-4 pt-10 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-black tracking-tighter uppercase">NEWEGG</h1>
        </div>

        <div className="w-full max-w-md">
          <h2 className="text-center text-xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-center text-gray-500 text-sm mb-8">Enter your email to sign in</p>

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

          <form onSubmit={handleLogin} className={`space-y-4 ${isShaking ? 'animate-bounce' : ''}`} style={isShaking ? {animation: 'shake 0.5s ease-in-out'} : {}}>
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
              Sign In
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
            <p className="text-xs text-gray-400 font-bold uppercase mb-6 tracking-widest">Or sign in with</p>
            <div className="flex justify-center gap-6">
              <button type="button" className="w-12 h-12 border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all">
                <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-6 h-6" alt="Google" />
              </button>
              <button type="button" className="w-12 h-12 border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" className="w-6 h-6" alt="Facebook" />
              </button>
              <button type="button" className="w-12 h-12 border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" className="w-5 h-5" alt="Apple" />
              </button>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Don't have an account? <a href="/register" className="text-orange-500 font-bold hover:underline">Join for free</a>
            </p>
          </div>
        </div>
      </div>

      {/* Giữ nguyên: QR CODE PC */}
      <div className="hidden lg:block lg:w-2/5 h-full min-h-screen relative overflow-hidden animate-in fade-in duration-1000">
        <img src="/images/Snipaste_2026-01-23_19-09-41.webp" alt="QR Pattern PC" className="w-full h-full object-cover" />
      </div>

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