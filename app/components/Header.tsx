"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link"; 

export default function Header() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false); // New
  const [isBagOpen, setIsBagOpen] = useState(false); // New
  const [activeCategory, setActiveCategory] = useState("");

  // --- LOGIC TÌM KIẾM THÔNG MINH ---
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const wishlistRef = useRef<HTMLDivElement>(null); // New
  const bagRef = useRef<HTMLDivElement>(null); // New

  const allSuggestions = [
    "Dresses for winter", "White sneakers", "Adidas originals", 
    "Nike Air Max", "Black coats", "Jeans slim fit", "Tops for women",
    "Mens jackets", "Accessories for men", "Beauty care sets"
  ];
  
  const filteredSuggestions = allSuggestions.filter(item => 
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (wishlistRef.current && !wishlistRef.current.contains(event.target as Node)) {
        setIsWishlistOpen(false);
      }
      if (bagRef.current && !bagRef.current.contains(event.target as Node)) {
        setIsBagOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [balance, setBalance] = useState(150.00);
  const authPath = "/register-test";

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

  // Logic xử lý khi click vào các icon chức năng
  const handleIconClick = (type: 'wishlist' | 'bag') => {
    if (!isLoggedIn) {
      window.location.href = authPath;
    } else {
      if (type === 'wishlist') {
        setIsWishlistOpen(!isWishlistOpen);
        setIsBagOpen(false);
        setIsAccountOpen(false);
      } else {
        setIsBagOpen(!isBagOpen);
        setIsWishlistOpen(false);
        setIsAccountOpen(false);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 font-sans text-black">
      {/* 1. TOP BAR */}
      <div className="bg-[#2d2d2d] text-white text-[10px] py-2 px-4 flex justify-end gap-4 uppercase font-bold">
        <span className="cursor-pointer hover:underline">Help & FAQs</span>
        <span className="cursor-pointer">🇻ietnam</span>
      </div>

      {/* 2. HEADER CHÍNH */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16 gap-4">
          <button className="md:hidden" onClick={() => setIsSideMenuOpen(true)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>

          <h1 className="text-2xl md:text-3xl font-black tracking-tighter cursor-pointer uppercase italic">ASOS</h1>

          <nav className="hidden md:flex gap-6 font-bold text-xs tracking-widest border-l border-r border-gray-200 px-6 h-full items-center">
            <span className="hover:bg-gray-100 h-full flex items-center px-4 cursor-pointer">WOMEN</span>
            <span className="hover:bg-gray-100 h-full flex items-center px-4 cursor-pointer border-l border-gray-200">MEN</span>
          </nav>

          {/* SEARCH BOX */}
          <div className="flex-1 max-w-2xl relative hidden sm:block" ref={searchRef}>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(e.target.value.length > 0);
              }}
              onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
              placeholder="Tìm kiếm sản phẩm ASOS 2026..." 
              className="w-full bg-gray-100 rounded-full py-2.5 px-5 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:bg-white transition-all"
            />
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white mt-2 shadow-2xl border border-gray-100 z-[110] rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="p-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">Gợi ý tìm kiếm</div>
                {filteredSuggestions.map((item, index) => (
                  <div 
                    key={index}
                    onClick={() => { setSearchQuery(item); setShowSuggestions(false); }}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 cursor-pointer text-sm transition-colors border-b border-gray-50 last:border-0"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4 items-center">
            {/* ACCOUNT SECTION */}
            <div className="relative group py-4" onMouseEnter={() => setIsAccountOpen(true)} onMouseLeave={() => setIsAccountOpen(false)}>
              <Link href={authPath} className="block p-1">
                <svg className="w-6 h-6 hover:text-gray-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </Link>
              {isAccountOpen && (
                <div className="absolute right-[-10px] top-full w-72 bg-white shadow-2xl border border-gray-100 z-[100] p-6 text-black animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="absolute top-[-8px] right-[15px] w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100"></div>
                  {!isLoggedIn ? (
                    <div className="space-y-6">
                      <p className="text-[12px] font-black uppercase italic tracking-tight">Welcome to ASOS</p>
                      <div className="flex gap-3">
                        <Link href={authPath} className="flex-1 bg-black text-white py-2.5 text-[11px] font-black uppercase text-center tracking-widest hover:bg-[#333]">Sign In</Link>
                        <Link href={authPath} className="flex-1 border-2 border-black py-2.5 text-[11px] font-black uppercase text-center tracking-widest hover:bg-gray-100">Join</Link>
                      </div>
                      <ul className="space-y-4 pt-2">
                        <Link href={authPath} className="flex items-center gap-4 py-1 text-[12px] font-bold uppercase tracking-widest hover:text-gray-500"><span className="text-xl opacity-70">👤</span> My Account</Link>
                        <Link href={authPath} className="flex items-center gap-4 py-3 border-t border-gray-100 text-[12px] font-bold uppercase tracking-widest italic hover:text-gray-500"><span className="text-xl opacity-70">🛍️</span> My Orders</Link>
                        <Link href="#" className="flex items-center gap-4 py-1 border-t border-gray-100 text-[12px] font-bold uppercase tracking-widest hover:text-gray-500"><span className="text-xl opacity-70">💬</span> Help & Returns</Link>
                      </ul>
                    </div>
                  ) : (
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Account Balance</p>
                      <p className="text-xl font-black text-green-600">${balance.toFixed(2)}</p>
                      <ul className="mt-4 space-y-4 text-[12px] font-bold uppercase tracking-widest border-t border-gray-100 pt-4">
                        <li className="hover:text-gray-500 cursor-pointer">👤 My Account</li>
                        <li className="hover:text-gray-500 cursor-pointer border-t border-gray-50 pt-3">🛍️ My Orders</li>
                        <li className="hover:text-gray-500 cursor-pointer border-t border-gray-50 pt-3">💬 Help & Returns</li>
                        <li className="pt-2 text-gray-400 cursor-pointer hover:text-black border-t border-gray-50 mt-2">Sign Out</li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* WISHLIST SECTION - Updated */}
            <div className="relative py-4" ref={wishlistRef}>
              <button onClick={() => handleIconClick('wishlist')} className="p-1 hover:text-gray-500 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </button>
              {isLoggedIn && isWishlistOpen && (
                <div className="absolute right-[-20px] top-full w-80 bg-white shadow-2xl border border-gray-100 z-[100] animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="absolute top-[-8px] right-[25px] w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100"></div>
                  <div className="p-8 flex flex-col items-center text-center">
                    <svg className="w-10 h-10 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    <p className="font-bold text-sm mb-2">You have no Saved Items</p>
                    <p className="text-[11px] text-gray-500 leading-relaxed mb-6">Start saving as you shop by selecting the little heart.</p>
                    <button className="w-full bg-black text-white py-3 text-[11px] font-black uppercase tracking-widest hover:bg-[#333]">Start Shopping</button>
                  </div>
                </div>
              )}
            </div>

            {/* SHOPPING BAG SECTION - Updated */}
            <div className="relative py-4" ref={bagRef}>
              <button onClick={() => handleIconClick('bag')} className="p-1 hover:text-gray-500 transition-colors relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                <span className="absolute top-1 right-0 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
              </button>
              {isLoggedIn && isBagOpen && (
                <div className="absolute right-[-10px] top-full w-80 bg-white shadow-2xl border border-gray-100 z-[100] animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="absolute top-[-8px] right-[15px] w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100"></div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <p className="font-bold text-[11px] uppercase tracking-widest">My Bag, 0 items</p>
                      <p className="font-bold text-sm">$0.00</p>
                    </div>
                    <div className="py-10 flex flex-col items-center border-t border-b border-gray-50">
                      <svg className="w-12 h-12 text-gray-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                      <p className="text-[12px] font-medium text-gray-500">Your bag is empty</p>
                    </div>
                    <button className="w-full bg-black text-white py-3 text-[11px] font-black uppercase tracking-widest mt-6 hover:bg-[#333]">View Bag</button>
                  </div>
                  <div className="bg-gray-50 p-3 text-center border-t border-gray-100">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Free Delivery Worldwide*</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. SUB-NAV (Giữ nguyên 100%) */}
      <div className="bg-[#525252] w-full hidden md:block relative">
        <div className="max-w-7xl mx-auto px-4 flex gap-6 text-[10px] font-bold text-white uppercase tracking-widest py-2.5">
          {["Sale", "Trending", "New in", "Clothing", "Dresses", "Shoes", "Accessories", "Brands", "Beauty"].map((item) => (
            <button key={item} onClick={() => handleCategoryClick(item)} className={`px-2 py-1 transition-colors hover:bg-white hover:text-black ${item === "Sale" ? "bg-white text-black" : ""} ${item === "Trending" ? "text-[#ffeb3b]" : ""} ${activeCategory === item && isMegaMenuOpen ? "bg-white !text-black" : ""}`}>{item}</button>
          ))}
        </div>
        {isMegaMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-2xl z-50 text-black">
            <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8 p-10">
              <div>
                <h3 className="font-black text-[11px] mb-6 tracking-widest uppercase border-b pb-2">Shop by Category</h3>
                <ul className="space-y-2.5 text-gray-600 text-[12px]">
                  {menuData.categories.map((cat, i) => <li key={i} className="hover:underline cursor-pointer">{cat}</li>)}
                </ul>
              </div>
              <div className="border-x border-gray-100 px-10">
                <h3 className="font-black text-[11px] mb-6 tracking-widest uppercase border-b pb-2">Shop by Price</h3>
                <div className="grid grid-cols-2 gap-6">
                  {menuData.prices.map((p, i) => (
                    <div key={i} className="flex flex-col items-center group cursor-pointer">
                      <img src={p.img} className="w-16 h-16 rounded-full object-cover border border-gray-200 group-hover:border-black transition-all" alt="" />
                      <span className="text-[10px] mt-2 font-bold group-hover:underline">{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-black text-[11px] mb-6 tracking-widest uppercase border-b pb-2">Shop by Brand</h3>
                <ul className="space-y-2.5 text-gray-600 text-[12px]">
                  {menuData.brands.map((b, i) => <li key={i} className="hover:underline cursor-pointer">{b}</li>)}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}