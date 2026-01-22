"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full font-sans bg-white">
      {/* 1. THANH SOCIAL & PAYMENT - Kích thước lớn và đồng đều */}
      <div className="w-full py-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
          {/* Social Icons */}
          <div className="flex items-center gap-8">
            <img src="/snapchat.webp" className="w-10 h-10 object-contain cursor-pointer" alt="Snapchat" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" className="w-10 h-10 cursor-pointer" alt="FB" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" className="w-10 h-10 cursor-pointer" alt="IG" />
            <div className="h-10 w-[1px] bg-gray-300 mx-2 hidden md:block"></div>
          </div>

          {/* Payment Methods - Phóng to để cân bằng với Social */}
          <div className="flex flex-wrap justify-center gap-6 items-center">
            <img src="https://images.asos-media.com/navigation/visa-png" className="h-6 md:h-7" alt="Visa" />
            <img src="https://images.asos-media.com/navigation/mastercard-png" className="h-8 md:h-10" alt="MC" />
            <img src="https://images.asos-media.com/navigation/pay-pal-png" className="h-6 md:h-7" alt="PP" />
            <img src="https://images.asos-media.com/navigation/american-express-png" className="h-6 md:h-7" alt="Amex" />
            <img src="https://images.asos-media.com/navigation/visa-electron-png" className="h-6 md:h-7" alt="VisaE" />
          </div>
        </div>
      </div>

      {/* 2. PHẦN NỘI DUNG CHÍNH (Nền xám/đen) */}
      <div className="w-full bg-[#4a4a4a] md:bg-[#2d2d2d] text-white pt-10 pb-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          
          {/* Logo & App Download (Hiển thị chính trên Mobile) */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center border border-gray-500 shadow-xl">
                <span className="text-white font-black text-4xl italic">n</span>
              </div>
              <div className="text-left">
                <p className="font-black text-lg tracking-tight uppercase">NEWEGG</p>
                <div className="flex text-white text-sm">★★★★★ <span className="ml-1 text-gray-300 text-xs">1.8m</span></div>
              </div>
            </div>
            <button className="bg-black border-2 border-white text-white px-10 py-3 text-xs font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
              DOWNLOAD THE APP
            </button>
          </div>

          {/* Desktop Links (Ẩn trên điện thoại theo hình mẫu) */}
          <div className="hidden md:grid grid-cols-3 gap-20 w-full border-t border-gray-600 pt-10 mb-10">
            <div>
              <h4 className="font-black text-[13px] uppercase tracking-widest mb-6">Help & Information</h4>
              <ul className="space-y-4 text-[12px] text-gray-300">
                <li>Help</li><li>Track order</li><li>Delivery & returns</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-[13px] uppercase tracking-widest mb-6">About NEWEGG</h4>
              <ul className="space-y-4 text-[12px] text-gray-300">
                <li>About us</li><li>Careers</li><li>Corporate responsibility</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-[13px] uppercase tracking-widest mb-6">More From NEWEGG</h4>
              <ul className="space-y-4 text-[12px] text-gray-300">
                <li>Mobile apps</li><li>Gift vouchers</li><li>Black Friday</li>
              </ul>
            </div>
          </div>

          {/* International Flags (Luôn hiển thị) */}
          <div className="w-full border-t border-gray-600 md:border-none pt-8 md:pt-0 flex flex-col items-center">
            <p className="text-gray-300 text-[11px] font-bold uppercase mb-5 tracking-widest">Some of our international sites:</p>
            <div className="flex flex-wrap justify-center gap-4 max-w-xs md:max-w-none">
              {['es', 'de', 'au', 'fr', 'it', 'us', 'dk', 'nl', 'pl', 'se'].map((cc) => (
                <div key={cc} className="w-7 h-7 rounded-full overflow-hidden border-2 border-gray-500 hover:scale-110 transition-transform">
                  <img src={`https://flagcdn.com/w40/${cc}.png`} className="w-full h-full object-cover" alt={cc} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. THANH COPYRIGHT */}
      <div className="w-full bg-[#222222] py-4 text-[#999]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-widest font-black uppercase">
          <p>© 2026 NEWEGG</p>
          <div className="flex gap-4 mt-3 md:mt-0">
            <span>Privacy & Cookies</span>
            <span>|</span>
            <span>Ts&Cs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}