"use client";
import Link from "next/link";

/**
 * Footer Component - Khớp 100% theo mẫu hình ảnh NEWEGG (Black Theme)
 * Đưa mạng xã hội và logo thanh toán lên thanh trên cùng của chân trang
 */
export default function Footer() {
  return (
    <footer className="w-full font-sans">
      {/* THANH TRÊN CÙNG: Mạng xã hội & Logo thanh toán (Nền trắng/xám cực nhẹ) */}
      <div className="w-full bg-[#ffffff] py-4 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex justify-center items-center">
          {/* Nhóm Mạng xã hội */}
          <div className="flex gap-8 items-center border-r border-gray-300 pr-10">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" className="w-6 h-6 cursor-pointer" alt="Facebook" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" className="w-6 h-6 cursor-pointer" alt="Instagram" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c2/Snapchat_logo.svg" className="w-6 h-6 bg-[#fffc00] p-1 rounded-full cursor-pointer" alt="Snapchat" />
          </div>

          {/* Dấu gạch đứng phân cách (Nếu cần giống ảnh 100%) */}
          <div className="h-8 w-[1px] bg-gray-300 mx-4 hidden md:block"></div>

          {/* Nhóm Cổng thanh toán */}
          <div className="flex gap-6 items-center pl-4">
            <img src="https://images.asos-media.com/navigation/visa-png" alt="Visa" className="h-4" />
            <img src="https://images.asos-media.com/navigation/mastercard-png" alt="Mastercard" className="h-6" />
            <img src="https://images.asos-media.com/navigation/pay-pal-png" alt="PayPal" className="h-4" />
            <img src="https://images.asos-media.com/navigation/american-express-png" alt="Amex" className="h-4" />
            <img src="https://images.asos-media.com/navigation/visa-electron-png" alt="Visa Electron" className="h-4" />
          </div>
        </div>
      </div>

      {/* PHẦN CHÍNH: Nền đen (Nội dung NEWEGG) */}
      <div className="w-full bg-[#2d2d2d] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* App Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center border border-gray-600">
                <span className="text-white font-black text-3xl italic">n</span>
              </div>
              <div className="text-[11px]">
                <p className="font-bold text-[13px] tracking-tight">NEWEGG</p>
                <p className="text-gray-400">★★★★★ 1.8m</p>
              </div>
            </div>
            <button className="bg-black border border-white text-white px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              DOWNLOAD THE APP
            </button>
          </div>

          {/* Help & Information */}
          <div className="text-[12px]">
            <h4 className="font-black uppercase tracking-widest mb-6 text-white">Help & Information</h4>
            <ul className="space-y-3 text-gray-400 font-medium">
              <li><Link href="/" className="hover:text-white">Help</Link></li>
              <li><Link href="/" className="hover:text-white">Track order</Link></li>
              <li><Link href="/" className="hover:text-white">Delivery & returns</Link></li>
              <li><Link href="/" className="hover:text-white">Sitemap</Link></li>
            </ul>
          </div>

          {/* About NEWEGG */}
          <div className="text-[12px]">
            <h4 className="font-black uppercase tracking-widest mb-6 text-white">About NEWEGG</h4>
            <ul className="space-y-3 text-gray-400 font-medium">
              <li><Link href="/" className="hover:text-white">About us</Link></li>
              <li><Link href="/" className="hover:text-white">Careers at NEWEGG</Link></li>
              <li><Link href="/" className="hover:text-white">Corporate responsibility</Link></li>
              <li><Link href="/" className="hover:text-white">Investors' site</Link></li>
            </ul>
          </div>

          {/* More From & Shopping From */}
          <div className="text-[12px]">
            <h4 className="font-black uppercase tracking-widest mb-6 text-white">More From NEWEGG</h4>
            <ul className="space-y-3 text-gray-400 font-medium mb-8">
              <li><Link href="/" className="hover:text-white">Mobile and NEWEGG apps</Link></li>
              <li><Link href="/" className="hover:text-white">Gift vouchers</Link></li>
              <li><Link href="/" className="hover:text-white">Black Friday</Link></li>
            </ul>
            
            <h4 className="font-black uppercase tracking-widest mb-3 text-white">Shopping from:</h4>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-gray-400">You're in</span>
              <img src="https://flagcdn.com/w20/vn.png" className="w-5 h-3.5 object-cover" alt="Vietnam" />
              <span className="font-black border-l border-gray-600 pl-2 text-white cursor-pointer uppercase tracking-tighter">| CHANGE</span>
            </div>

            <p className="text-gray-400 text-[11px] mb-2">Some of our international sites:</p>
            <div className="flex flex-wrap gap-2.5 opacity-70">
              {['es', 'de', 'au', 'fr', 'dk', 'it', 'nl', 'pl', 'us', 'se'].map((cc) => (
                <img key={cc} src={`https://flagcdn.com/w20/${cc}.png`} alt={cc} className="w-4 h-3 cursor-pointer hover:opacity-100 transition-opacity" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* THANH CUỐI: Bản quyền */}
      <div className="w-full bg-[#222222] py-4 text-[#999999]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-widest font-bold uppercase">
          <p>© 2026 NEWEGG</p>
          <div className="flex gap-5 mt-2 md:mt-0">
            <Link href="/" className="hover:text-white">Privacy & Cookies</Link>
            <span className="text-gray-700">|</span>
            <Link href="/" className="hover:text-white">Ts&Cs</Link>
            <span className="text-gray-700">|</span>
            <Link href="/" className="hover:text-white">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}