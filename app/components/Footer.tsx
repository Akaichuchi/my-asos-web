"use client";
import Link from "next/link";

/**
 * Footer Component - Đồng bộ giao diện ASOS cho tất cả các trang
 */
export default function Footer() {
  return (
    <footer className="bg-[#eeeeee] border-t border-gray-200 font-sans text-black">
      {/* Social & Payment Bar */}
      <div className="border-b border-gray-300 py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-6">
            <span className="hover:opacity-70 cursor-pointer">Facebook</span>
            <span className="hover:opacity-70 cursor-pointer">Instagram</span>
            <span className="hover:opacity-70 cursor-pointer">Snapchat</span>
          </div>
          <div className="flex gap-4 items-center">
            <img src="https://images.asos-media.com/navigation/visa-png" alt="Visa" className="h-4" />
            <img src="https://images.asos-media.com/navigation/mastercard-png" alt="Mastercard" className="h-4" />
            <img src="https://images.asos-media.com/navigation/pay-pal-png" alt="PayPal" className="h-4" />
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-[11px] font-black uppercase tracking-widest mb-4 text-gray-500">Help & Information</h4>
          <ul className="text-[12px] space-y-3 text-gray-600">
            <li><Link href="/" className="hover:text-blue-600">Help</Link></li>
            <li><Link href="/" className="hover:text-blue-600">Track order</Link></li>
            <li><Link href="/" className="hover:text-blue-600">Delivery & returns</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-black uppercase tracking-widest mb-4 text-gray-500">About ASOS</h4>
          <ul className="text-[12px] space-y-3 text-gray-600">
            <li><Link href="/" className="hover:text-blue-600">About us</Link></li>
            <li><Link href="/" className="hover:text-blue-600">Careers at ASOS</Link></li>
            <li><Link href="/" className="hover:text-blue-600">Corporate responsibility</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-black uppercase tracking-widest mb-4 text-gray-500">More From ASOS</h4>
          <ul className="text-[12px] space-y-3 text-gray-600">
            <li><Link href="/" className="hover:text-blue-600">Mobile and ASOS apps</Link></li>
            <li><Link href="/" className="hover:text-blue-600">ASOS Marketplace</Link></li>
            <li><Link href="/" className="hover:text-blue-600">Gift vouchers</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-black uppercase tracking-widest mb-4 text-gray-500">Shopping From:</h4>
          <div className="text-[12px] flex items-center gap-2 mt-2">
            <span>You're in</span>
            <img src="https://flagcdn.com/w20/vn.png" alt="Vietnam" className="w-4" />
            <span className="font-bold border-l border-gray-400 pl-2 cursor-pointer">CHANGE</span>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="bg-[#dddddd] py-3">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-[10px] text-gray-600 font-medium">
          <p>© 2026 ASOS</p>
          <div className="flex gap-4">
            <Link href="/">Privacy & Cookies</Link>
            <Link href="/">Ts&Cs</Link>
            <Link href="/">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}