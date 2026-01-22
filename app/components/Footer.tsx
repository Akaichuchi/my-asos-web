"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full font-sans bg-white">
      {/* 1. THANH SOCIAL & PAYMENT (Căn giữa, responsive) */}
      <div className="w-full py-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="flex items-center gap-6">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" className="w-5 h-5" alt="FB" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" className="w-5 h-5" alt="IG" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c2/Snapchat_logo.svg" className="w-5 h-5 bg-[#fffc00] p-0.5 rounded-full" alt="SC" />
            <div className="h-5 w-[1px] bg-gray-300 mx-2 hidden md:block"></div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <img src="https://images.asos-media.com/navigation/visa-png" className="h-3" alt="Visa" />
            <img src="https://images.asos-media.com/navigation/mastercard-png" className="h-5" alt="MC" />
            <img src="https://images.asos-media.com/navigation/pay-pal-png" className="h-3" alt="PP" />
            <img src="https://images.asos-media.com/navigation/american-express-png" className="h-3" alt="Amex" />
            <img src="https://images.asos-media.com/navigation/visa-electron-png" className="h-3" alt="VisaE" />
          </div>
        </div>
      </div>

      {/* 2. PHẦN NỘI DUNG CHÍNH (Nền đen xám đậm) */}
      <div className="w-full bg-[#2d2d2d] text-white pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          
          {/* App Section - Tối ưu hiển thị mobile */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center border border-gray-600">
                <span className="text-white font-black text-2xl italic">n</span>
              </div>
              <div className="text-left">
                <p className="font-bold text-sm tracking-tighter uppercase">NEWEGG</p>
                <p className="text-[11px] text-gray-400">★★★★★ 1.8m</p>
              </div>
            </div>
            <button className="w-full md:w-auto bg-black border border-white text-white px-6 py-2.5 text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              DOWNLOAD THE APP
            </button>
          </div>

          {/* Links Columns - Tự động giãn cách trên Mobile */}
          <div className="text-center md:text-left">
            <h4 className="font-black text-[12px] uppercase tracking-widest mb-5">Help & Information</h4>
            <ul className="space-y-3 text-[12px] text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Help</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Track order</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Delivery & returns</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Sitemap</Link></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-black text-[12px] uppercase tracking-widest mb-5">About NEWEGG</h4>
            <ul className="space-y-3 text-[12px] text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">About us</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Careers at NEWEGG</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Corporate responsibility</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Investors' site</Link></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-black text-[12px] uppercase tracking-widest mb-5">More From NEWEGG</h4>
            <ul className="space-y-3 text-[12px] text-gray-400 mb-6">
              <li><Link href="/" className="hover:text-white transition-colors">Mobile and NEWEGG apps</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Gift vouchers</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Black Friday</Link></li>
            </ul>
            
            <div className="pt-4 border-t border-gray-700">
              <p className="font-black text-[11px] uppercase mb-3">Shopping from:</p>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <span className="text-gray-400 text-[11px]">You're in</span>
                <img src="https://flagcdn.com/w20/vn.png" className="w-4 h-3" alt="VN" />
                <span className="font-black text-white text-[11px] border-l border-gray-600 pl-2 cursor-pointer">| CHANGE</span>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 opacity-60">
                {['es', 'de', 'au', 'fr', 'it', 'us'].map((cc) => (
                  <img key={cc} src={`https://flagcdn.com/w20/${cc}.png`} alt={cc} className="w-4 h-3 cursor-pointer hover:opacity-100" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. THANH COPYRIGHT (Màu đen tuyền cực mỏng) */}
      <div className="w-full bg-[#222222] py-3 text-[#777] border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-tighter uppercase font-bold">
          <p>© 2026 NEWEGG</p>
          <div className="flex gap-4 mt-2 md:mt-0">
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