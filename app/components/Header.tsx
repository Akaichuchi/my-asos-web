"use client";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Dữ liệu danh mục mô phỏng theo hình ảnh image_d39353.jpg
  const categories = [
    {
      title: "SHOP BY CATEGORY",
      items: ["Sale Winter essentials", "View all Sale", "Sale Coats & Jackets", "Sale Sweaters & Cardigans", "Sale Shoes & Sneakers", "Sale Dresses", "Sale Tops", "Sale Jeans", "Sale Activewear"]
    },
    {
      title: "SHOP BY PRICE",
      isPrice: true,
      items: [
        { label: "$25 and Under", img: "https://images.asos-media.com/products/asos-design-oversized-t-shirt-in-white/204344445-1-white?$n_320w$" },
        { label: "$50 and Under", img: "https://images.asos-media.com/products/asos-design-slim-jeans-in-blue/204123456-1-blue?$n_320w$" },
        { label: "$75 and Under", img: "https://images.asos-media.com/products/asos-design-sneakers-in-white/203987654-1-white?$n_320w$" },
        { label: "$100 and Under", img: "https://images.asos-media.com/products/asos-design-heavyweight-t-shirt-in-black/204556677-1-black?$n_320w$" }
      ]
    },
    {
      title: "SHOP BY BRAND",
      items: ["A-Z of Brands", "adidas", "ASOS Design", "Free People", "Mango", "Miss Selfridge", "New Balance", "Nike", "Topshop"]
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      {/* Thanh đen trên cùng - Giữ nguyên 100% */}
      <div className="bg-[#2d2d2d] text-white text-[10px] py-2 px-4 flex justify-end gap-4 uppercase font-bold">
        <span className="cursor-pointer hover:underline">Marketplace</span>
        <span className="cursor-pointer hover:underline">Help & FAQs</span>
        <span className="cursor-pointer">🇻ietnam</span>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16 gap-4">
          {/* Nút Menu cho điện thoại */}
          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>

          {/* Logo ASOS */}
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter cursor-pointer">ASOS</h1>

          {/* Menu chính - Cập nhật tính năng Mega Menu */}
          <nav className="hidden md:flex gap-0 font-bold text-xs tracking-widest border-l border-r border-gray-200 px-0 h-full items-center">
            <div 
              className="h-full flex items-center px-8 cursor-pointer hover:bg-[#525252] hover:text-white transition-colors"
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              WOMEN
            </div>
            <div 
              className="h-full flex items-center px-8 cursor-pointer border-l border-gray-200 hover:bg-[#525252] hover:text-white transition-colors"
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              MEN
            </div>
          </nav>

          {/* Thanh tìm kiếm chuẩn SEO - Giữ nguyên */}
          <div className="flex-1 max-w-2xl relative hidden sm:block">
            <input 
              type="text" 
              placeholder="Tìm kiếm sản phẩm ASOS 2026..." 
              className="w-full bg-gray-100 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Biểu tượng tiện ích - Giữ nguyên */}
          <div className="flex gap-3 md:gap-5 items-center">
            <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          </div>
        </div>
      </div>

      {/* PHẦN MEGA MENU HIỂN THỊ KHI HOVER (Theo image_d39353.jpg) */}
      {isMenuOpen && (
        <div 
          className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl z-50"
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => setIsMenuOpen(false)}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8 p-8">
            {categories.map((col, idx) => (
              <div key={idx} className={idx === 1 ? "border-x border-gray-100 px-8" : ""}>
                <h3 className="font-bold text-[11px] mb-4 tracking-widest text-black uppercase">{col.title}</h3>
                
                {col.isPrice ? (
                  /* Hiển thị Shop by Price với hình ảnh tròn */
                  <div className="grid grid-cols-2 gap-4">
                    {col.items.map((item: any, i) => (
                      <div key={i} className="flex flex-col items-center cursor-pointer group">
                        <div className="w-16 h-16 rounded-full overflow-hidden mb-2 border border-gray-100 group-hover:border-black transition-colors">
                          <img src={item.img} alt={item.label} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[11px] text-gray-600 group-hover:underline text-center">{item.label}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Hiển thị danh sách văn bản thông thường */
                  <ul className="space-y-2">
                    {col.items.map((item: any, i) => (
                      <li key={i} className="text-[12px] text-gray-600 hover:text-black hover:underline cursor-pointer">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Thanh phụ: SALE, TRENDING... (Theo image_d39353.jpg) */}
      <div className="bg-[#525252] w-full py-2">
        <div className="max-w-7xl mx-auto px-4 flex gap-6 text-[10px] font-bold text-white uppercase tracking-widest overflow-x-auto whitespace-nowrap">
          <span className="bg-white text-black px-2 cursor-pointer hover:bg-gray-200">Sale</span>
          <span className="text-[#ffeb3b] cursor-pointer hover:underline">Trending</span>
          <span className="cursor-pointer hover:underline">New in</span>
          <span className="cursor-pointer hover:underline">Clothing</span>
          <span className="cursor-pointer hover:underline">Dresses</span>
          <span className="cursor-pointer hover:underline">Shoes</span>
          <span className="cursor-pointer hover:underline">Accessories</span>
          <span className="cursor-pointer hover:underline">Brands</span>
          <span className="cursor-pointer hover:underline">Beauty</span>
        </div>
      </div>
    </header>
  );
}