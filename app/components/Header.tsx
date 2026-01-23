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

  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [user, setUser] = useState({ name: "" });

  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const wishlistRef = useRef<HTMLDivElement>(null);
  const bagRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  const wishlistPath = isLoggedIn ? "/wishlist" : "/register-test";
  const bagPath = isLoggedIn ? "/cart" : "/register-test";

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

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
    mobileNav: [
      { name: "Home", img: "https://images.asos-media.com/navigation/ww_gbl_home_117075775_1x1", path: "/" },
      { name: "Sale", img: "https://images.asos-media.com/navigation/ww_sale_gbl_1734344_1x1", path: "/women" },
      { name: "New in", img: "https://images.asos-media.com/navigation/ww_gbl_new_in_1615715_1x1", path: "/women" },
      { name: "Clothing", img: "https://images.asos-media.com/navigation/ww_gbl_clothing_8799_1x1", path: "/women" },
      { name: "Dresses", img: "https://images.asos-media.com/navigation/ww_gbl_dresses_8799_1x1", path: "/women" },
      { name: "Shoes", img: "https://images.asos-media.com/navigation/ww_gbl_shoes_4172_1x1", path: "/women" },
      { name: "Accessories", img: "https://images.asos-media.com/navigation/ww_gbl_accessories_4174_1x1", path: "/women" }
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
      {/* TOP STRIP */}
      <div className="bg-[#eeeeee] text-gray-500 text-[10px] py-1.5 px-4 flex justify-end gap-5 uppercase font-medium border-b border-gray-200">
        <Link href="/" className="hover:text-black transition-colors">Marketplace</Link>
        <Link href="/" className="hover:text-black transition-colors">Help & FAQs</Link>
        <button className="flex items-center gap-1">
          <img src="https://flagcdn.com/w20/vn.png" className="w-3.5 h-2.5 object-cover" alt="Vietnam Flag" />
        </button>
      </div>

      {/* MAIN NAV BAR */}
      <div className="bg-[#2d2d2d] text-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14 md:h-16 gap-4">
          <button className="md:hidden p-2" onClick={() => setIsSideMenuOpen(true)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>

          <Link href="/" className="text-3xl md:text-[34px] font-black tracking-tighter uppercase decoration-none">NEWEGG</Link>

          <nav className="hidden md:flex gap-0 font-bold text-[13px] tracking-widest h-full items-center ml-4">
            {/* Đã cập nhật /women */}
            <Link href="/women" className="hover:bg-[#525252] h-full flex items-center px-6 transition-colors border-r border-gray-600">WOMEN</Link>
            {/* Đã cập nhật /men */}
            <Link href="/men" className="hover:bg-[#525252] h-full flex items-center px-6 transition-colors border-r border-gray-600">MEN</Link>
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
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>

          <div className="flex gap-1.5 md:gap-4 items-center h-full">
            <div className="relative h-full flex items-center" ref={accountRef} onMouseEnter={() => setIsAccountOpen(true)} onMouseLeave={() => setIsAccountOpen(false)}>
              <button className="p-2 hover:bg-[#525252] transition-colors rounded-full">
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

            <Link href={wishlistPath} className="relative h-full flex items-center p-2 hover:bg-[#525252] transition-colors rounded-full" title="My Wishlist">
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </Link>

            <Link href={bagPath} className="relative h-full flex items-center p-2 hover:bg-[#525252] transition-colors rounded-full" title="My Shopping Bag">
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                <span className="absolute bottom-1 right-1 bg-[#d01345] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <div className={`fixed inset-0 z-[200] transition-all duration-300 ${isSideMenuOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isSideMenuOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setIsSideMenuOpen(false)} />
        <div className={`absolute top-0 left-0 w-[85%] max-w-[340px] h-full bg-white transform transition-transform duration-300 flex flex-col ${isSideMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex border-b border-gray-200 sticky top-0 bg-white z-10">
            <Link href="/women" onClick={() => setIsSideMenuOpen(false)} className="flex-1 py-4 text-[13px] font-bold uppercase border-b-2 border-black tracking-widest text-center">Women</Link>
            <Link href="/men" onClick={() => setIsSideMenuOpen(false)} className="flex-1 py-4 text-[13px] font-bold uppercase text-gray-400 bg-gray-50 border-b-2 border-transparent tracking-widest text-center">Men</Link>
            <button onClick={() => setIsSideMenuOpen(false)} className="p-4 bg-black text-white"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
          </div>

          <div className="flex-1 overflow-y-auto pb-10">
            {/* Promo Banners */}
            <div className="p-3">
              <div className="bg-black text-white p-4 text-center mb-2">
                <p className="text-[10px] font-bold uppercase tracking-widest">Extra 30% off 1000s of Sale styles</p>
                <p className="text-[13px] font-black italic uppercase">With code: EXTRA30</p>
              </div>
              <Link href="/women" onClick={() => setIsSideMenuOpen(false)} className="border-2 border-black p-4 bg-white block text-center">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-1">The Winter Sale: last chance</span>
                <div className="flex justify-between items-center px-2">
                  <span className="text-[22px] font-black italic tracking-tighter uppercase">Up to 70% off</span>
                  <span className="text-[10px] border border-black px-4 py-1.5 font-bold uppercase">Shop</span>
                </div>
              </Link>
            </div>

            {/* List with Images */}
            <div className="px-3 space-y-1">
              {menuData.mobileNav.map((item) => (
                <Link key={item.name} href={item.path} onClick={() => setIsSideMenuOpen(false)} className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-sm">
                  <span className="text-[12px] font-bold uppercase tracking-[0.2em]">{item.name}</span>
                  <div className="w-[56px] h-[56px] overflow-hidden">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Sidebar Account Section */}
            <div className="p-5 mt-6 border-t border-gray-100">
                <h4 className="text-[20px] font-black italic mb-6 uppercase tracking-tighter">
                  {isLoggedIn ? `HI ${user.name.toUpperCase()}` : "WELCOME TO NEWEGG"}
                </h4>
                
                {!isLoggedIn && (
                  <div className="flex gap-3 mb-8">
                    <Link href="/register-test" onClick={() => setIsSideMenuOpen(false)} className="flex-1 bg-black text-white py-3.5 text-[11px] font-black uppercase text-center tracking-widest">Sign In</Link>
                    <Link href="/register-test" onClick={() => setIsSideMenuOpen(false)} className="flex-1 border border-gray-300 py-3.5 text-[11px] font-bold uppercase text-center tracking-widest bg-white">Join</Link>
                  </div>
                )}

                <ul className="space-y-6 text-[13px] font-bold uppercase tracking-widest">
                  <li className="flex items-center gap-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    <Link href="/" onClick={() => setIsSideMenuOpen(false)}>My Account</Link>
                  </li>
                  <li className="flex items-center gap-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    <Link href={bagPath} onClick={() => setIsSideMenuOpen(false)}>My Orders</Link>
                  </li>
                  {isLoggedIn && <li onClick={handleSignOut} className="text-gray-400 cursor-pointer pl-10">Sign Out</li>}
                  <li className="flex justify-between items-center border-t pt-6 text-[11px] text-gray-500">Help & Information <span className="text-lg">+</span></li>
                </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORY NAV - DESKTOP */}
      <div className="bg-[#525252] w-full hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex gap-6 text-[11px] font-bold text-white uppercase tracking-widest py-2">
          {["Sale", "Trending", "New in", "Clothing", "Dresses", "Shoes", "Accessories", "Brands", "Beauty"].map((item) => (
            <button 
              key={item} 
              onMouseEnter={() => {setActiveCategory(item); setIsMegaMenuOpen(true);}}
              className={`px-2 py-1 transition-colors hover:bg-white hover:text-black ${item === "Sale" ? "bg-[#d01345] text-white" : ""} ${activeCategory === item && isMegaMenuOpen ? "bg-white !text-black" : ""}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* MEGA MENU - DESKTOP */}
      {isMegaMenuOpen && (
        <div 
          className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-2xl hidden md:block"
          onMouseLeave={() => setIsMegaMenuOpen(false)}
        >
          <div className="max-w-7xl mx-auto p-10 grid grid-cols-4 gap-10">
            <div>
              <h4 className="font-bold text-[13px] mb-6 uppercase tracking-widest border-b pb-2">New Products</h4>
              <ul className="space-y-4 text-[12px] text-gray-500">
                {["View all", "New In: Today", "New In: Selling Fast", "Clothing", "Dresses", "Tops", "Shoes"].map(i => (
                  <li key={i} className="hover:text-black hover:underline cursor-pointer">{i}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[13px] mb-6 uppercase tracking-widest border-b pb-2">Winter</h4>
              <ul className="space-y-4">
                {[
                  { name: "Essentials", img: "https://images.asos-media.com/navigation/ww_gbl_winter_essentials_117075775_1x1" },
                  { name: "Loungewear", img: "https://images.asos-media.com/navigation/ww_gbl_loungewear_117075775_1x1" },
                  { name: "Faux fur", img: "https://images.asos-media.com/navigation/ww_gbl_faux_fur_117075775_1x1" },
                  { name: "Leather", img: "https://images.asos-media.com/navigation/ww_gbl_leather_117075775_1x1" }
                ].map(item => (
                  <li key={item.name} className="flex items-center gap-3 text-[12px] text-gray-500 hover:text-black cursor-pointer group">
                    <img src={item.img} className="w-8 h-8 rounded-full border group-hover:opacity-80" />
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[13px] mb-6 uppercase tracking-widest border-b pb-2">Your Most Hyped</h4>
              <ul className="space-y-4 text-[12px] text-gray-500">
                {["Dresses", "Tops", "Knits & sweats", "Jeans", "Collections"].map(i => (
                  <li key={i} className="hover:text-black hover:underline cursor-pointer">{i}</li>
                ))}
              </ul>
            </div>

            <div className="border-l pl-10 text-center">
              <h4 className="font-bold text-[13px] mb-6 uppercase tracking-widest">New Edits</h4>
              <div className="relative group cursor-pointer overflow-hidden aspect-[3/4] mb-4">
                <img src="https://images.asos-media.com/navigation/ww_gbl_new_edits_117075775_1x1" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/5 flex items-end justify-center p-4">
                  <span className="bg-white text-black text-[10px] font-bold px-6 py-2 uppercase tracking-widest shadow-lg">Arrange</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}