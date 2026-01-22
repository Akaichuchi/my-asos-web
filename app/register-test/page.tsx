'use client';
import { useState } from 'react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
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
      setMessage({ text: `❌ Lỗi: ${data.error}`, type: 'error' });
    }
  };

  return (
    // Bố cục chính: flex-col-reverse để Pattern lên đầu trên mobile, lg:flex-row để sang phải trên PC
    <div className="min-h-screen flex flex-col-reverse lg:flex-row font-sans bg-white">
      
      {/* PHẦN FORM BÊN TRÁI: Giữ nguyên 100% logic và cấu trúc bạn đã gửi */}
      <div className="w-full lg:w-3/5 flex flex-col items-center px-4 pt-10 pb-12">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-4xl font-black tracking-tighter uppercase">asos</h1>
        </div>

        <div className="w-full max-w-md">
          <h2 className="text-center text-xl font-bold mb-2">Hi friend!</h2>
          <p className="text-center text-gray-500 text-sm mb-8">Enter your email to sign in or join for</p>

          {/* Lợi ích - Chạy tốt trên điện thoại */}
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

          {/* Form Đăng ký */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-widest">Email address:*</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border-2 border-gray-200 p-3 focus:border-black outline-none transition-all"
              />
            </div>

            <button type="submit" className="w-full bg-black text-white font-bold py-4 mt-4 hover:bg-gray-800 transition-colors uppercase tracking-widest">
              Continue
            </button>
          </form>

          {/* Thông báo */}
          {message.text && (
            <div className={`mt-6 p-4 text-center text-sm font-medium border ${
              message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          {/* Cập nhật Phụ trợ với Logo chuyên nghiệp */}
          <div className="mt-10 text-center border-t pt-6">
            <p className="text-xs text-gray-400 font-bold uppercase mb-6 tracking-widest">Or continue with</p>
            <div className="flex justify-center gap-6">
              {/* Google */}
              <button className="w-12 h-12 border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all">
                <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-6 h-6" alt="Google" />
              </button>
              {/* Facebook */}
              <button className="w-12 h-12 border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" className="w-6 h-6" alt="Facebook" />
              </button>
              {/* Apple */}
              <button className="w-12 h-12 border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" className="w-5 h-5" alt="Apple" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PHẦN MÃ VẠCH (PATTERN) BÊN PHẢI: Giữ nguyên bố cục bạn đã gửi */}
      <div 
        className="w-full lg:w-2/5 h-48 lg:h-auto bg-repeat"
        style={{ 
          backgroundImage: 'url("https://media.asos-media.com/i/asos/customer-care-pattern-black-white")',
          backgroundSize: '300px'
        }}
      >
      </div>
      
    </div>
  );
}