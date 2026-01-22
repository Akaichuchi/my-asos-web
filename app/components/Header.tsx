"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link"; 

/**
 * Header Component - Optimized for SEO and User Experience
 * Phù hợp với tiêu chuẩn giao diện thương mại điện tử quốc tế (ASOS Style)
 */
export default function Header() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [user, setUser] = useState({ name: "" });

  // Keywords optimization for internal search
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const wishlistRef = useRef<HTMLDivElement>(null);
  const bagRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

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

  const menuData = {
    categories: ["Sale Winter essentials", "View all Sale", "Sale Coats & Jackets", "Sale Sweaters & Cardigans", "Sale Shoes & Sneakers", "Sale Dresses", "Sale Tops", "Sale Jeans", "Sale Activewear"],
    prices: [
      { label: "$25 and Under", img: "https://images.asos-media.com/products/asos-design-oversized-t-shirt-in-white/204344445-1-white?$n_320w$", path: "/" },
      { label: "$50 and Under", img: "https://images.asos-media.com/products/asos-design-slim-jeans-in-blue/204123456-1-blue?$n_320w$", path: "/" },
      { label: "$75 and Under", img: "https://images.asos-media.com/products/asos-design-sneakers-in-white/203987654-1-white?$n_320w$", path: "/" },
      { label: "$100 and Under", img: "https://images.asos-media.com/products/asos-design-heavyweight-t-shirt-in-black/204556677-1-black?$n_320w$", path: "/" }
    ],
    brands: ["A-Z of Brands", "adidas", "ASOS Design", "Free People", "Mango", "Miss Selfridge", "New Balance", "Nike", "Topshop"],
    mobileNav: [
      { name: "Home", img: "https://images.asos-media.com/navigation/ww_gbl_home_117075775_1x1", path: "/" },
      { name: "Sale", img: "https://images.asos-media.com/navigation/ww_sale_gbl_1734344_1x1", path: "/" },
      { name: "New in", img: "https://images.asos-media.com/navigation/ww_gbl_new_in_1615715_1x1", path: "/" },
      { name: "Clothing", img: "https://images.asos-media.com/navigation/ww_gbl_clothing_8799_1x1", path: "/" },
      { name: "Dresses", img: "https://images.asos-media.com/navigation/ww_gbl_dresses_8799_1x1", path: "/" },
      { name: "Shoes", img: "https://images.asos-media.com/navigation/ww_gbl_shoes_4172_1x1", path: "/" },
      { name: "Accessories", img: "https://images.asos-media.com/navigation/ww_gbl_accessories_4174_1x1", path: "/" }
    ]
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

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser({ name: "" });
    setIsSideMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 font-sans text-black">
      {/* 1. TOP BAR - Secondary Navigation */}
      <div className="bg-[#eeeeee] text-gray-500 text-[10px] py-1.5 px-4 flex justify-end gap-5 uppercase font-medium border-b border-gray-200">
        <Link href="/" className="hover:text-black transition-colors" title="Visit Marketplace">Marketplace</Link>
        <Link href="/" className="hover:text-black transition-colors" title="Customer Help & FAQs">Help & FAQs</Link>
        <button className="flex items-center gap-1" aria-label="Change Country">
          <img src="https://flagcdn.com/w20/vn.png" className="w-3.5 h-2.5 object-cover" alt="Vietnam Flag" />
        </button>
      </div>

      {/* 2. MAIN HEADER */}
      <div className="bg-[#2d2d2d] text-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14 md:h-16 gap-4">
          <button className="md:hidden p-2" onClick={() => setIsSideMenuOpen(true)} aria-label="Open Mobile Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>

          <Link href="/" className="text-3xl md:text-[34px] font-black tracking-tighter uppercase decoration-none" title="ASOS Home">asos</Link>

          <nav className="hidden md:flex gap-0 font-bold text-[13px] tracking-widest h-full items-center ml-4">
            <Link href="/" className="hover:bg-[#525252] h-full flex items-center px-6 transition-colors border-r border-gray-600">WOMEN</Link>
            <Link href="/" className="hover:bg-[#525252] h-full flex items-center px-6 transition-colors border-r border-gray-600">MEN</Link>
          </nav>

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
              aria-label="Search products"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black" aria-label="Submit Search">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>

          <div className="flex gap-1.5 md:gap-4 items-center h-full">
            <div className="relative h-full flex items-center" ref={accountRef} onMouseEnter={() => setIsAccountOpen(true)} onMouseLeave={() => setIsAccountOpen(false)}>
              <button className="p-2 hover:bg-[#525252] transition-colors rounded-full" aria-haspopup="true">
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </button>
              {isAccountOpen && (
                <div className="absolute right-0 top-full w-64 bg-white shadow-2xl border border-gray-100 z-[100] p-5 text-black">
                  {!isLoggedIn ? (
                    <div className="flex gap-3 mb-5 border-b pb-5">
                      <Link href="/register-test" onClick={() => setIsAccountOpen(false)} className="flex-1 bg-black text-white py-2 text-[11px] font-black uppercase text-center tracking-widest">Sign In</Link>
                      <Link href="/register-test" onClick={() => setIsAccountOpen(false)} className="flex-1 border border-black py-2 text-[11px] font-bold uppercase text-center tracking-widest">Join</Link>
                    </div>
                  ) : (
                    <div className="mb-5 border-b pb-2 text-[14px] font-black italic uppercase">Hi {user.name}</div>
                  )}
                  <ul className="space-y-4 text-[13px] font-medium">
                    <li><Link href="/" className="hover:underline flex items-center gap-3">👤 My Account</Link></li>
                    <li><Link href="/" className="hover:underline flex items-center gap-3">🛍️ My Orders</Link></li>
                    {isLoggedIn && <li onClick={handleSignOut} className="hover:underline cursor-pointer text-gray-400">Sign Out</li>}
                  </ul>
                </div>
              )}
            </div>

            <Link href="/" className="relative h-full flex items-center p-2 hover:bg-[#525252] transition-colors rounded-full" title="My Wishlist">
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </Link>

            <Link href="/" className="relative h-full flex items-center p-2 hover:bg-[#525252] transition-colors rounded-full" title="My Shopping Bag">
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                <span className="absolute bottom-1 right-1 bg-[#d01345] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. SIDEBAR MOBILE */}
      <div className={`fixed inset-0 z-[200] transition-all duration-300 ${isSideMenuOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isSideMenuOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setIsSideMenuOpen(false)} />
        <div className={`absolute top-0 left-0 w-[85%] max-w-[340px] h-full bg-white transform transition-transform duration-300 flex flex-col ${isSideMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          
          <div className="flex border-b border-gray-200">
            <button className="flex-1 py-4 text-[13px] font-bold uppercase border-b-2 border-black tracking-widest">Women</button>
            <button className="flex-1 py-4 text-[13px] font-bold uppercase text-gray-400 bg-gray-50 border-b-2 border-transparent tracking-widest">Men</button>
            <button onClick={() => setIsSideMenuOpen(false)} className="p-4 bg-black text-white" aria-label="Close Sidebar"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <Link href="/" onClick={() => setIsSideMenuOpen(false)} className="p-4 border-b border-gray-100 bg-white block">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-1">The Winter Sale: last chance</span>
              <div className="flex justify-between items-center">
                <span className="text-[20px] font-black italic tracking-tighter uppercase">Up to 70% off</span>
                <span className="text-[10px] border border-black px-3 py-1 font-bold uppercase">Shop</span>
              </div>
            </Link>

            {menuData.mobileNav.map((item) => (
              <Link key={item.name} href={item.path} onClick={() => setIsSideMenuOpen(false)} className="flex items-center justify-between p-4 border-b border-gray-50 active:bg-gray-100 transition-colors">
                <span className="text-[13px] font-bold uppercase tracking-[0.15em]">{item.name}</span>
                <div className="w-[60px] h-[60px] rounded-full overflow-hidden bg-gray-100 border border-gray-100 shadow-sm">
                  <img src={item.img} alt={`Category: ${item.name}`} className="w-full h-full object-cover" />
                </div>
              </Link>
            ))}

            <div className="bg-[#EEEEEE] p-4 text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">More ASOS</div>
            <div className="grid grid-cols-2 gap-px bg-gray-200 border-b border-gray-200">
                <Link href="/" onClick={() => setIsSideMenuOpen(false)} className="bg-white p-6 text-center">
                  <span className="text-[10px] font-black uppercase tracking-widest leading-tight">ASOS Premier</span><br/>
                  <span className="text-[9px] text-gray-500 lowercase">Unlimited shipping</span>
                </Link>
                <Link href="/" onClick={() => setIsSideMenuOpen(false)} className="bg-white p-6 text-center border-l border-gray-50">
                  <span className="text-[10px] font-black uppercase tracking-widest leading-tight">10% Student</span><br/>
                  <span className="text-[9px] text-gray-500 lowercase">Discount</span>
                </Link>
            </div>

            <div className="p-5">
                <h4 className="text-[18px] font-black italic mb-6 uppercase tracking-tighter">
                  Hi {isLoggedIn ? user.name : "Akai"}
                </h4>
                <ul className="space-y-6 text-[13px] font-bold uppercase tracking-widest">
                  <li><Link href="/" onClick={() => setIsSideMenuOpen(false)} className="flex items-center gap-4">👤 My Account</Link></li>
                  <li><Link href="/" onClick={() => setIsSideMenuOpen(false)} className="flex items-center gap-4">📦 My Orders</Link></li>
                  <li><Link href="/" onClick={() => setIsSideMenuOpen(false)} className="flex items-center gap-4">↩️ My Returns</Link></li>
                  {isLoggedIn ? (
                    <li onClick={handleSignOut} className="flex items-center gap-4 text-gray-400 cursor-pointer">Sign Out</li>
                  ) : (
                    <li><Link href="/register-test" onClick={() => setIsSideMenuOpen(false)} className="flex items-center gap-4 text-gray-400 underline decoration-1 underline-offset-4">Sign In</Link></li>
                  )}
                </ul>
            </div>
          </div>
          
          <div className="p-4 border-t bg-gray-50 flex justify-between items-center text-[11px] font-bold sticky bottom-0">
             <Link href="/" className="flex items-center gap-2 uppercase tracking-widest italic">You're in 🇻🇳 | Change</Link>
             <img src="https://flagcdn.com/w40/vn.png" className="w-5 shadow-sm" alt="Vietnam Flag Indicator"/>
          </div>
        </div>
      </div>

      {/* 4. SUB-NAV (DESKTOP) */}
      <div className="bg-[#525252] w-full hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex gap-6 text-[11px] font-bold text-white uppercase tracking-widest py-2">
          {["Sale", "Trending", "New in", "Clothing", "Dresses", "Shoes", "Accessories", "Brands", "Beauty"].map((item) => (
            <button 
              key={item} 
              onClick={() => handleCategoryClick(item)} 
              className={`px-2 py-1 transition-colors hover:bg-white hover:text-black ${item === "Sale" ? "bg-[#d01345] text-white" : ""} ${activeCategory === item && isMegaMenuOpen ? "bg-white !text-black" : ""}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}