"use client";
import Link from "next/link";

/**
 * Footer Component - Nâng cấp: 
 * 1. Ẩn hoàn toàn mạng xã hội & thanh toán trên Mobile.
 * 2. Tăng kích thước logo Snapchat (/snapchat.webp) thêm một chút.
 * 3. Giữ nguyên bố cục lề trái 100%.
 */
export default function Footer() {
  return (
    <footer className="w-full font-sans bg-white">
      {/* 1. THANH SOCIAL & PAYMENT - ẨN HOÀN TOÀN TRÊN MOBILE (hidden md:block) */}
      <div className="hidden md:block w-full py-5 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-row justify-center items-center gap-10">
          
          {/* Nhóm Social - Snapchat tăng kích thước lên w-12 h-12 */}
          <div className="flex items-center gap-6">
            <img 
              src="/images/snapchat.webp" 
              className="w-12 h-12 object-contain" 
              alt="Snapchat" 
            />
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" 
              className="w-9 h-9 object-contain" 
              alt="FB" 
            />
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" 
              className="w-9 h-9 object-contain" 
              alt="IG" 
            />
            <div className="h-9 w-[1px] bg-gray-300 mx-2"></div>
          </div>

          {/* Nhóm Thanh toán */}
          <div className="flex flex-wrap gap-5 items-center">
            <img src="https://images.asos-media.com/navigation/visa-png" className="h-5" alt="Visa" />
            <img src="https://images.asos-media.com/navigation/mastercard-png" className="h-8" alt="MC" />
            <img src="https://images.asos-media.com/navigation/pay-pal-png" className="h-5" alt="PP" />
            <img src="https://images.asos-media.com/navigation/american-express-png" className="h-5" alt="Amex" />
            <img src="https://images.asos-media.com/navigation/visa-electron-png" className="h-5" alt="VisaE" />
          </div>
        </div>
      </div>

      {/* 2. PHẦN NỘI DUNG CHÍNH - GIỮ NGUYÊN BỐ CỤC LỀ TRÁI */}
      <div className="w-full bg-[#2d2d2d] text-white pt-12 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
          
          {/* MỤC DOWNLOAD APP - CĂN TRÁI TUYỆT ĐỐI */}
          <div className="flex flex-col items-start text-left">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center border border-gray-600 shadow-xl">
                <span className="text-white font-black text-3xl italic">n</span>
              </div>
              <div className="text-left">
                <p className="font-black text-sm tracking-tight uppercase">NEWEGG</p>
                <div className="flex text-white text-xs">★★★★★ <span className="ml-1 text-gray-400">1.8m</span></div>
              </div>
            </div>
            <button className="bg-black border border-white text-white px-6 py-2.5 text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              DOWNLOAD THE APP
            </button>
          </div>

          {/* Help & Information - Chỉ hiện Desktop */}
          <div className="hidden md:block">
            <h4 className="font-black text-[13px] uppercase tracking-widest mb-6">Help & Information</h4>
            <ul className="space-y-4 text-[12px] text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Help</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Track order</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Delivery & returns</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Sitemap</Link></li>
            </ul>
          </div>

          {/* About NEWEGG - Chỉ hiện Desktop */}
          <div className="hidden md:block">
            <h4 className="font-black text-[13px] uppercase tracking-widest mb-6">About NEWEGG</h4>
            <ul className="space-y-4 text-[12px] text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">About us</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Careers at NEWEGG</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Corporate responsibility</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Investors' site</Link></li>
            </ul>
          </div>

          {/* Shopping From & Circular Flags - GIỮ LỀ TRÁI */}
          <div className="flex flex-col items-start border-t border-gray-700 pt-8 md:border-t-0 md:pt-0">
            <h4 className="font-black text-[13px] uppercase tracking-widest mb-4">Shopping from:</h4>
            <div className="flex items-center gap-2 mb-6 text-[12px]">
              <span className="text-gray-400">You're in</span>
              <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-500">
                <img src="https://flagcdn.com/w40/vn.png" className="w-full h-full object-cover" alt="VN" />
              </div>
              <span className="font-black text-white border-l border-gray-600 pl-2 uppercase">| CHANGE</span>
            </div>
            
            <p className="text-gray-400 text-[11px] mb-4">Some of our international sites:</p>
            <div className="flex flex-wrap gap-3 justify-start">
              {['es', 'de', 'au', 'fr', 'it', 'us', 'dk', 'nl', 'pl', 'se'].map((cc) => (
                <div key={cc} className="w-6 h-6 rounded-full overflow-hidden border border-gray-700 cursor-pointer hover:scale-110 transition-transform">
                  <img src={`https://flagcdn.com/w40/${cc}.png`} className="w-full h-full object-cover" alt={cc} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. THANH COPYRIGHT */}
      <div className="w-full bg-[#222222] py-4 text-[#888]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-widest font-black uppercase">
          <p>© 2026 NEWEGG</p>
          <div className="flex gap-4 mt-3 md:mt-0">
            <Link href="/" className="hover:text-white">Privacy & Cookies</Link>
            <span>|</span>
            <Link href="/" className="hover:text-white">Ts&Cs</Link>
            <span>|</span>
            <Link href="/" className="hover:text-white">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}