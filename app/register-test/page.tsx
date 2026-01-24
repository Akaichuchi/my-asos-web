'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isShaking, setIsShaking] = useState(false); 
  const usernameInputRef = useRef<HTMLInputElement>(null); 

  useEffect(() => {
    if (usernameInputRef.current) {
      usernameInputRef.current.focus();
    }
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username.length < 3) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setMessage({ text: '❌ Tên người dùng phải có ít nhất 3 ký tự!', type: 'error' });
      return;
    }

    setMessage({ text: 'Đang xử lý...', type: 'info' });

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // 1. Lưu thông tin vào localStorage để Header nhận diện
      localStorage.setItem('userName', username);

      setMessage({ text: '✅ Thành công! Đang chuyển hướng...', type: 'success' });
      setUsername('');
      setPassword('');
      
      // 2. CẬP NHẬT ĐIỀU HƯỚNG: Sử dụng window.location.href để ép tải lại tại trang chủ
      setTimeout(() => {
        window.location.href = '/'; 
      }, 1500);
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setMessage({ text: `❌ Lỗi: ${data.error}`, type: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-10 font-sans bg-[#F3F3F3] p-4 relative overflow-hidden">
      
      <div className={`w-full max-w-[420px] bg-white p-8 md:p-12 shadow-2xl border-t-4 border-black animate-in fade-in zoom-in duration-700 ${isShaking ? 'animate-shake' : ''}`}
            style={isShaking ? {animation: 'shake 0.5s ease-in-out'} : {}}>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">NEWEGG</h1>
          <h2 className="text-lg font-bold text-gray-800 uppercase tracking-widest">Đăng ký tài khoản</h2>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-4 gap-2 mb-10">
            {[
              { icon: '🏷️', label: 'Exclusive discounts' },
              { icon: '📦', label: 'Easily tracked orders' },
              { icon: '🚚', label: 'Returns reminders' },
              { icon: '⚡', label: 'Speedy checkout' }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center mb-1 text-lg shadow-sm">
                  {item.icon}
                </div>
                <span className="text-[9px] text-center leading-tight text-gray-500 font-bold uppercase">{item.label}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Username:*</label>
              <input 
                ref={usernameInputRef}
                type="text" 
                placeholder="Tên người dùng"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className={`w-full border-2 p-4 text-sm focus:border-black outline-none transition-all ${isShaking ? 'border-red-500' : 'border-gray-100 bg-gray-50'}`}
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Password:*</label>
              <input 
                type="password" 
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full border-2 p-4 text-sm focus:border-black outline-none transition-all ${isShaking ? 'border-red-500' : 'border-gray-100 bg-gray-50'}`}
              />
            </div>

            <button type="submit" className="w-full bg-black text-white font-bold py-4 mt-4 hover:bg-gray-800 transition-colors uppercase tracking-widest active:scale-95 shadow-lg">
              Đăng ký ngay
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
            <p className="text-[10px] text-gray-400 font-bold uppercase mb-6 tracking-widest">Or continue with</p>
            <div className="flex justify-center gap-6">
              <button type="button" className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm">
                <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-6 h-6" alt="Google" />
              </button>
              <button type="button" className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" className="w-6 h-6" alt="Facebook" />
              </button>
              <button type="button" className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" className="w-5 h-5" alt="Apple" />
              </button>
            </div>
          </div>
        </div>
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