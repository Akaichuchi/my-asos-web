"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link"; 

export default function Header() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");

  // --- LOGIC TÌM KIẾM THÔNG MINH ---
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const wishlistRef = useRef<HTMLDivElement>(null);
  const bagRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

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
      const target = event.target as Node;
      if (searchRef.current && !searchRef.current.contains(target)) setShowSuggestions(false);
      if (wishlistRef.current && !wishlistRef.current.contains(target)) setIsWishlistOpen(false);
      if (bagRef.current && !bagRef.current.contains(target)) setIsBagOpen(false);
      if (accountRef.current && !accountRef.current.contains(target)) setIsAccountOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Giả lập trạng thái đăng nhập để test tính năng (Thay bằng true để xem menu đã đăng nhập)
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

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 font-sans text-black">
      {/* 1. TOP BAR */}
      <div className="bg-[#eeeeee] text-gray-500 text-[10px] py-1.5 px-4 flex justify-end gap-5 uppercase font-medium border-b border-gray-200">
        <span className="cursor-pointer hover:text-black transition-colors">Marketplace</span>
        <span className="cursor-pointer hover:text-black transition-colors">Help & FAQs</span>
        <span className="cursor-pointer flex items-center gap-1">
          <img src="https://flagcdn.com/w20/vn.png" className="w-3.5 h-2.5 object-cover" alt="VN" />
        </span>
      </div>

      {/* 2. HEADER CHÍNH */}
      <div className="bg-[#2d2d2d] text-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14 md:h-16 gap-4">
          <button className="md:hidden" onClick={() => setIsSideMenuOpen(true)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>

          {/* LOGO - Quay về trang chủ */}
          <Link href="/" className="text-3xl md:text-[34px] font-black tracking-tighter uppercase lowercase decoration-none">asos</Link>

          <nav className="hidden md:flex gap-0 font-bold text-[13px] tracking-widest h-full items-center ml-4">
            <Link href="/women" className="hover:bg-[#525252] h-full flex items-center px-6 transition-colors border-r border-gray-600">WOMEN</Link>
            <Link href="/men" className="hover:bg-[#525252] h-full flex items-center px-6 transition-colors border-r border-gray-600">MEN</Link>
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
              placeholder="Search for items, brands and inspiration..." 
              className="w-full bg-white text-black rounded-full py-2 px-5 pr-10 text-sm focus:outline-none"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white mt-1 shadow-2xl border border-gray-100 z-[110] rounded-lg text-black overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                {filteredSuggestions.map((item, index) => (
                  <div key={index} onClick={() => { setSearchQuery(item); setShowSuggestions(false); }} className="px-5 py-3 hover:bg-gray-100 cursor-pointer text-sm transition-colors border-b border-gray-50 last:border-0 flex items-center gap-3">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-1.5 md:gap-4 items-center h-full">
            {/* ACCOUNT SECTION */}
            <div className="relative h-full flex items-center" ref={accountRef} onMouseEnter={() => setIsAccountOpen(true)} onMouseLeave={() => setIsAccountOpen(false)}>
              <button className="p-2 hover:bg-[#525252] transition-colors rounded-full"><svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></button>
              {isAccountOpen && (
                <div className="absolute right-0 top-full w-64 bg-white shadow-2xl border border-gray-100 z-[100] p-5 text-black animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="flex gap-3 mb-5 border-b pb-5">
                    <Link href={authPath} className="flex-1 bg-black text-white py-2 text-[11px] font-black uppercase text-center tracking-widest hover:bg-[#333]">Sign In</Link>
                    <Link href={authPath} className="flex-1 border border-black py-2 text-[11px] font-bold uppercase text-center tracking-widest hover:bg-gray-100">Join</Link>
                  </div>
                  <ul className="space-y-4 text-[13px] font-medium">
                    <li className="flex items-center gap-3 cursor-pointer hover:underline"><span className="text-lg">👤</span> My Account</li>
                    <li className="flex items-center gap-3 cursor-pointer hover:underline"><span className="text-lg">🛍️</span> My Orders</li>
                    <li className="flex items-center gap-3 cursor-pointer hover:underline"><span className="text-lg">💬</span> Help & Returns</li>
                  </ul>
                </div>
              )}
            </div>

            {/* WISHLIST SECTION */}
            <div className="relative h-full flex items-center" ref={wishlistRef}>
              <button onClick={() => setIsWishlistOpen(!isWishlistOpen)} className="p-2 hover:bg-[#525252] transition-colors rounded-full"><svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg></button>
              {isWishlistOpen && (
                <div className="absolute right-[-10px] top-full w-72 bg-white shadow-2xl border border-gray-100 z-[100] p-6 text-black animate-in fade-in slide-in-from-top-1 duration-200 text-center">
                  <p className="font-bold text-sm mb-1">Your Saved Items is empty</p>
                  <p className="text-[11px] text-gray-500 mb-4">Click the heart icon on products to save them for later.</p>
                  <button className="w-full bg-black text-white py-2 text-[11px] font-black uppercase">Start Shopping</button>
                </div>
              )}
            </div>

            {/* SHOPPING BAG SECTION */}
            <div className="relative h-full flex items-center" ref={bagRef}>
              <button onClick={() => setIsBagOpen(!isBagOpen)} className="p-2 hover:bg-[#525252] transition-colors rounded-full relative">
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                <span className="absolute bottom-1 right-1 bg-[#d01345] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-[#2d2d2d]">0</span>
              </button>
              {isBagOpen && (
                <div className="absolute right-0 top-full w-72 bg-white shadow-2xl border border-gray-100 z-[100] p-6 text-black animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="flex justify-between font-bold text-xs uppercase mb-4"><span>My Bag</span><span>$0.00</span></div>
                  <div className="py-8 text-center border-y border-gray-100"><p className="text-[12px] text-gray-400 font-medium">Your bag is empty</p></div>
                  <button className="w-full bg-[#018849] text-white py-2.5 text-[11px] font-black uppercase tracking-widest mt-4">Checkout</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. SUB-NAV */}
      <div className="bg-[#525252] w-full hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex gap-6 text-[11px] font-bold text-white uppercase tracking-widest py-2">
          {["Sale", "Trending", "New in", "Clothing", "Dresses", "Shoes", "Accessories", "Brands", "Beauty"].map((item) => (
            <button key={item} onClick={() => handleCategoryClick(item)} className={`px-2 py-1 transition-colors hover:bg-white hover:text-black ${item === "Sale" ? "bg-[#d01345] text-white" : ""} ${activeCategory === item && isMegaMenuOpen ? "bg-white !text-black" : ""}`}>{item}</button>
          ))}
        </div>
        {/* MEGA MENU (Giữ nguyên 100%) */}
        {isMegaMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-2xl z-50 text-black animate-in fade-in duration-200">
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