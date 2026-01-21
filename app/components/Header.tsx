"use client";
import { useState } from "react";

export default function Header() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");

  const menuData = {
    categories: ["Sale Winter essentials", "View all Sale", "Sale Coats & Jackets", "Sale Sweaters & Cardigans", "Sale Shoes & Sneakers", "Sale Dresses", "Sale Tops", "Sale Jeans", "Sale Activewear"],
    prices: [
      { label: "$25 and Under", img: "https://images.asos-media.com/products/asos-design-oversized-t-shirt-in-white/204344445-1-white?$n_320w$" },
      { label: "$50 and Under", img: "https://images.asos-media.com/products/asos-design-slim-jeans-in-blue/204123456-1-blue?$n_320w$" },
      { label: "$75 and Under", img: "https://images.asos-media.com/products/asos-design-sneakers-in-white/203987654-1-white?$n_320w$" },
      { label: "$100 and Under", img: "https://images.asos-media.com/products/asos-design-heavyweight-t-shirt-in-black/204556677-1-black?$n_320w$" }
    ],
    brands: ["A-Z of Brands", "adidas", "ASOS Design", "Free People", "Mango", "Miss Selfridge", "New Balance", "Nike", "Topshop"]
  };

  const handleCategoryClick = (category: string) => {
    if (activeCategory === category && isMegaMenuOpen) {
      setIsMegaMenuOpen(false);
      setActiveCategory("");
    } else {
      setActiveCategory(category);
      setIsMegaMenuOpen(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      {/* 1. THANH ĐEN TRÊN CÙNG - Giữ nguyên 100% */}
      <div className="bg-[#2d2d2d] text-white text-[10px] py-2 px-4 flex justify-end gap-4 uppercase font-bold">
        <span className="cursor-pointer hover:underline">Help & FAQs</span>
        <span className="cursor-pointer">🇻ietnam</span>
      </div>

      {/* 2. HEADER CHÍNH */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16 gap-4">
          
          {/* Nút Menu cho điện thoại - Kích hoạt Side Menu */}
          <button className="md:hidden" onClick={() => setIsSideMenuOpen(true)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo ASOS */}
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter cursor-pointer">ASOS</h1>

          {/* Menu chính Desktop */}
          <nav className="hidden md:flex gap-6 font-bold text-xs tracking-widest border-l border-r border-gray-200 px-6 h-full items-center">
            <span className="hover:bg-gray-100 h-full flex items-center px-4 cursor-pointer">WOMEN</span>
            <span className="hover:bg-gray-100 h-full flex items-center px-4 cursor-pointer border-l border-gray-200">MEN</span>
          </nav>

          {/* Tìm kiếm */}
          <div className="flex-1 max-w-2xl relative hidden sm:block">
            <input 
              type="text" 
              placeholder="Tìm kiếm sản phẩm ASOS 2026..." 
              className="w-full bg-gray-100 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Icons tiện ích */}
          <div className="flex gap-3 md:gap-5 items-center">
            <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          </div>
        </div>
      </div>

      {/* 3. THANH DANH MỤC PHỤ - CHỈ HIỆN TRÊN DESKTOP (md:flex) */}
      <div className="bg-[#525252] w-full hidden md:block relative">
        <div className="max-w-7xl mx-auto px-4 flex gap-6 text-[10px] font-bold text-white uppercase tracking-widest py-2">
          {["Sale", "Trending", "New in", "Clothing", "Dresses", "Shoes", "Accessories", "Brands", "Beauty"].map((item) => (
            <button 
              key={item}
              onClick={() => handleCategoryClick(item)}
              className={`px-2 py-1 transition-colors hover:bg-white hover:text-black 
                ${item === "Sale" ? "bg-white text-black" : ""} 
                ${item === "Trending" ? "text-[#ffeb3b]" : ""} 
                ${activeCategory === item && isMegaMenuOpen ? "bg-white !text-black" : ""}`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mega Menu Desktop */}
        {isMegaMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-2xl z-50 text-black">
            <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8 p-8">
              <div>
                <h3 className="font-bold text-[11px] mb-4 tracking-widest uppercase text-black">Shop by Category</h3>
                <ul className="space-y-2 text-gray-600 text-[12px]">
                  {menuData.categories.map((cat, i) => <li key={i} className="hover:underline cursor-pointer">{cat}</li>)}
                </ul>
              </div>
              <div className="border-x border-gray-100 px-8">
                <h3 className="font-bold text-[11px] mb-4 tracking-widest uppercase text-black">Shop by Price</h3>
                <div className="grid grid-cols-2 gap-4">
                  {menuData.prices.map((p, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <img src={p.img} className="w-16 h-16 rounded-full object-cover border border-gray-200" alt="" />
                      <span className="text-[10px] mt-2">{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-[11px] mb-4 tracking-widest uppercase text-black">Shop by Brand</h3>
                <ul className="space-y-2 text-gray-600 text-[12px]">
                  {menuData.brands.map((b, i) => <li key={i} className="hover:underline cursor-pointer">{b}</li>)}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. SIDE MENU CHO ĐIỆN THOẠI (Mobile Drawer) */}
      {isSideMenuOpen && (
        <>
          {/* Overlay làm mờ nền */}
          <div className="fixed inset-0 bg-black/50 z-[60] md:hidden" onClick={() => setIsSideMenuOpen(false)} />
          
          {/* Nội dung Menu bên trái */}
          <div className="fixed inset-y-0 left-0 w-[280px] bg-white z-[70] shadow-2xl md:hidden flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <span className="font-black text-xl tracking-tighter">ASOS</span>
              <button onClick={() => setIsSideMenuOpen(false)} className="text-gray-500">✕</button>
            </div>
            
            {/* Các mục từ thanh danh mục phụ được chuyển vào đây */}
            <div className="flex-1 overflow-y-auto py-2">
              <div className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Discover</div>
              {["Sale", "Trending", "New in", "Clothing", "Dresses", "Shoes", "Accessories", "Brands", "Beauty"].map((item) => (
                <button 
                  key={item}
                  className={`w-full text-left px-4 py-3 text-sm font-bold uppercase tracking-widest border-b border-gray-50 flex justify-between items-center
                    ${item === "Sale" ? "text-red-600" : "text-black"}`}
                >
                  {item}
                  <span className="text-gray-300">›</span>
                </button>
              ))}
            </div>

            <div className="p-4 bg-gray-50 text-[10px] font-bold text-center text-gray-400 uppercase tracking-widest">
              ASOS Vietnam 2026
            </div>
          </div>
        </>
      )}
    </header>
  );
}