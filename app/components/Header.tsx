"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link"; 
import { 
  Home, Tag, Sparkles, Shirt, ShoppingBag, 
  Footprints, Watch, User, Package, LogOut, 
  Search, Heart, ShoppingCart, Menu, X,
  Layers, Coffee, Zap, Diamond, Stars, Flame, ChevronRight
} from "lucide-react";

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
  
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const searchRef = useRef<HTMLDivElement>(null);
  const wishlistRef = useRef<HTMLDivElement>(null);
  const bagRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  const wishlistPath = "/saved-items";
  const bagPath = "/cart";

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUser({ name: storedName });
      setIsLoggedIn(true);
    }

    const updateCounts = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setCartCount(cart.length);
      setWishlistCount(wishlist.length);
    };

    updateCounts();
    window.addEventListener("storage", updateCounts);
    return () => window.removeEventListener("storage", updateCounts);
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

  // CẬP NHẬT: Thay thế URL ảnh lỗi bằng Icon Lucide cho Mobile
  const menuData = {
    mobileNav: [
      { name: "Trang chủ", icon: <Home size={22} strokeWidth={1.5} />, path: "/" },
      { name: "Giảm giá", icon: <Tag size={22} strokeWidth={1.5} />, path: "/women" },
      { name: "Hàng mới", icon: <Sparkles size={22} strokeWidth={1.5} />, path: "/women" },
      { name: "Quần áo", icon: <Shirt size={22} strokeWidth={1.5} />, path: "/women" },
      { name: "Váy đầm", icon: <ShoppingBag size={22} strokeWidth={1.5} />, path: "/women" },
      { name: "Giày dép", icon: <Footprints size={22} strokeWidth={1.5} />, path: "/women" },
      { name: "Phụ kiện", icon: <Watch size={22} strokeWidth={1.5} />, path: "/women" }
    ],
    // Icon cho Mega Menu Mùa đông
    winterIcons: [
      { name: "Cơ bản", icon: <Layers size={20} className="text-zinc-500" /> },
      { name: "Đồ mặc nhà", icon: <Coffee size={20} className="text-zinc-500" /> },
      { name: "Lông nhân tạo", icon: <Zap size={20} className="text-zinc-500" /> },
      { name: "Đồ da", icon: <Diamond size={20} className="text-zinc-500" /> }
    ]
  };

  const handleSignOut = () => {
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUser({ name: "" });
    setIsSideMenuOpen(false);
    window.location.reload(); 
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 font-sans text-black">
      {/* TOP STRIP */}
      <div className="bg-[#eeeeee] text-gray-500 text-[10px] py-1.5 px-4 flex justify-end gap-5 uppercase font-medium border-b border-gray-200">
        <Link href="/" className="hover:text-black transition-colors">Thị trường</Link>
        <Link href="/" className="hover:text-black transition-colors">Trợ giúp & FAQs</Link>
        <button className="flex items-center gap-1">
          <img src="https://flagcdn.com/w20/vn.png" className="w-3.5 h-2.5 object-cover" alt="Vietnam Flag" />
        </button>
      </div>

      {/* MAIN NAV BAR */}
      <div className="bg-[#2d2d2d] text-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14 md:h-16 gap-4">
          <button className="md:hidden p-2" onClick={() => setIsSideMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>

          <Link href="/" className="text-3xl md:text-[34px] font-black tracking-tighter uppercase decoration-none">NEWEGG</Link>

          <nav className="hidden md:flex gap-0 font-bold text-[13px] tracking-widest h-full items-center ml-4">
            <Link href="/women" className="hover:bg-[#525252] h-full flex items-center px-6 transition-colors border-r border-gray-600">NỮ</Link>
            <Link href="/men" className="hover:bg-[#525252] h-full flex items-center px-6 transition-colors border-r border-gray-600">NAM</Link>
          </nav>

          <div className="flex-1 max-w-2xl relative hidden sm:block" ref={searchRef}>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(e.target.value.length > 0);
              }}
              placeholder="Tìm kiếm sản phẩm, thương hiệu..." 
              className="w-full bg-white text-black rounded-full py-2 px-5 pr-10 text-sm focus:outline-none"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">
              <Search className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-1.5 md:gap-4 items-center h-full">
            <div className="relative h-full flex items-center" ref={accountRef} onMouseEnter={() => setIsAccountOpen(true)} onMouseLeave={() => setIsAccountOpen(false)}>
              <button className="p-2 hover:bg-[#525252] transition-colors rounded-full">
                <User className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
              </button>
              {isAccountOpen && (
                <div className="absolute right-0 top-full w-64 bg-white shadow-2xl border border-gray-100 z-[100] p-5 text-black">
                  {!isLoggedIn ? (
                    <div className="flex gap-3 mb-5 border-b pb-5">
                      <Link href="/login" onClick={() => setIsAccountOpen(false)} className="flex-1 bg-black text-white py-2 text-[11px] font-black uppercase text-center tracking-widest">Đăng nhập</Link>
                      <Link href="/register-test" onClick={() => setIsAccountOpen(false)} className="flex-1 border border-black py-2 text-[11px] font-bold uppercase text-center tracking-widest">Tham gia</Link>
                    </div>
                  ) : (
                    <div className="mb-5 border-b pb-2 text-[14px] font-black italic uppercase">Xin chào {user.name}</div>
                  )}
                  <ul className="space-y-4 text-[13px] font-medium">
                    <li><Link href="/my-account" className="hover:underline flex items-center gap-3"><User size={16}/> Tài khoản của tôi</Link></li>
                    <li><Link href="/my-orders" className="hover:underline flex items-center gap-3"><Package size={16}/> Theo dõi đơn hàng</Link></li>
                    {isLoggedIn && <li onClick={handleSignOut} className="hover:underline cursor-pointer text-gray-400 flex items-center gap-3"><LogOut size={16}/> Đăng xuất</li>}
                  </ul>
                </div>
              )}
            </div>

            <Link href={wishlistPath} className="relative h-full flex items-center p-2 hover:bg-[#525252] transition-colors rounded-full">
                <Heart className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.8} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1.5 right-0 bg-white text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-black shadow-sm">
                    {wishlistCount}
                  </span>
                )}
            </Link>

            <Link href={bagPath} className="relative h-full flex items-center p-2 hover:bg-[#525252] transition-colors rounded-full">
                <ShoppingCart className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.8} />
                {cartCount > 0 && (
                  <span className="absolute bottom-1 right-1 bg-[#d01345] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <div className={`fixed inset-0 z-[200] transition-all duration-300 ${isSideMenuOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isSideMenuOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setIsSideMenuOpen(false)} />
        <div className={`absolute top-0 left-0 w-[85%] max-w-[340px] h-full bg-white transform transition-transform duration-300 flex flex-col ${isSideMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex border-b border-gray-200 sticky top-0 bg-white z-10">
            <Link href="/women" onClick={() => setIsSideMenuOpen(false)} className="flex-1 py-4 text-[13px] font-bold uppercase border-b-2 border-black tracking-widest text-center">Nữ</Link>
            <Link href="/men" onClick={() => setIsSideMenuOpen(false)} className="flex-1 py-4 text-[13px] font-bold uppercase text-gray-400 bg-gray-50 border-b-2 border-transparent tracking-widest text-center">Nam</Link>
            <button onClick={() => setIsSideMenuOpen(false)} className="p-4 bg-black text-white"><X size={24}/></button>
          </div>

          <div className="flex-1 overflow-y-auto pb-10">
            <div className="p-3">
              <div className="bg-black text-white p-4 text-center mb-2">
                <p className="text-[10px] font-bold uppercase tracking-widest">Giảm thêm 30% hàng ngàn sản phẩm</p>
                <p className="text-[13px] font-black italic uppercase">Mã: EXTRA30</p>
              </div>
              <Link href="/women" onClick={() => setIsSideMenuOpen(false)} className="border-2 border-black p-4 bg-white block text-center">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Winter Sale: Cơ hội cuối</span>
                <div className="flex justify-between items-center px-2">
                  <span className="text-[22px] font-black italic tracking-tighter uppercase">Lên đến 70%</span>
                  <span className="text-[10px] border border-black px-4 py-1.5 font-bold uppercase">Mua ngay</span>
                </div>
              </Link>
            </div>

            <div className="px-3 space-y-1">
              {menuData.mobileNav.map((item) => (
                <Link key={item.name} href={item.path} onClick={() => setIsSideMenuOpen(false)} className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-sm group">
                  <span className="text-[12px] font-bold uppercase tracking-[0.2em]">{item.name}</span>
                  <div className="text-zinc-400 group-hover:text-black transition-colors">
                    {item.icon}
                  </div>
                </Link>
              ))}
            </div>

            <div className="p-5 mt-6 border-t border-gray-100">
                <h4 className="text-[20px] font-black italic mb-6 uppercase tracking-tighter">
                  {isLoggedIn ? `XIN CHÀO ${user.name.toUpperCase()}` : "CHÀO MỪNG ĐẾN VỚI NEWEGG"}
                </h4>
                
                {!isLoggedIn && (
                  <div className="flex gap-3 mb-8">
                    <Link href="/login" onClick={() => setIsSideMenuOpen(false)} className="flex-1 bg-black text-white py-3.5 text-[11px] font-black uppercase text-center tracking-widest">Đăng nhập</Link>
                    <Link href="/register-test" onClick={() => setIsSideMenuOpen(false)} className="flex-1 border border-gray-300 py-3.5 text-[11px] font-bold uppercase text-center tracking-widest bg-white">Tham gia</Link>
                  </div>
                )}

                <ul className="space-y-6 text-[13px] font-bold uppercase tracking-widest">
                  <li className="flex items-center gap-4">
                    <User size={24} strokeWidth={1.5} />
                    <Link href="/my-account" onClick={() => setIsSideMenuOpen(false)}>Tài khoản của tôi</Link>
                  </li>
                  <li className="flex items-center gap-4">
                    <Package size={24} strokeWidth={1.5} />
                    <Link href="/my-orders" onClick={() => setIsSideMenuOpen(false)}>Theo dõi đơn hàng</Link>
                  </li>
                  {isLoggedIn && <li onClick={handleSignOut} className="text-gray-400 cursor-pointer pl-10 flex items-center gap-2 lowercase"><LogOut size={16}/> Đăng xuất</li>}
                  <li className="flex justify-between items-center border-t pt-6 text-[11px] text-gray-500">Trợ giúp & Thông tin <span className="text-lg">+</span></li>
                </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORY NAV - DESKTOP */}
      <div className="bg-[#525252] w-full hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex gap-6 text-[11px] font-bold text-white uppercase tracking-widest py-2">
          {["Sale", "Xu hướng", "Hàng mới", "Quần áo", "Váy đầm", "Giày dép", "Phụ kiện", "Thương hiệu", "Làm đẹp"].map((item) => (
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

      {/* MEGA MENU - DESKTOP CẬP NHẬT ICON */}
      {isMegaMenuOpen && (
        <div 
          className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-2xl hidden md:block"
          onMouseLeave={() => setIsMegaMenuOpen(false)}
        >
          <div className="max-w-7xl mx-auto p-10 grid grid-cols-4 gap-10">
            <div>
              <h4 className="font-bold text-[13px] mb-6 uppercase tracking-widest border-b pb-2">Sản phẩm mới</h4>
              <ul className="space-y-4 text-[12px] text-gray-500">
                <li className="hover:text-black flex items-center gap-2"><Flame size={14} className="text-orange-500"/> Bán chạy nhất</li>
                <li className="hover:text-black flex items-center gap-2"><Sparkles size={14} className="text-blue-500"/> Mới trong ngày</li>
                {["Xem tất cả", "Quần áo", "Váy đầm", "Áo", "Giày"].map(i => (
                  <li key={i} className="hover:text-black hover:underline cursor-pointer">{i}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[13px] mb-6 uppercase tracking-widest border-b pb-2">Mùa đông</h4>
              <ul className="space-y-4">
                {menuData.winterIcons.map(item => (
                  <li key={item.name} className="flex items-center gap-3 text-[12px] text-gray-500 hover:text-black cursor-pointer group">
                    <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center border group-hover:bg-zinc-100 transition-colors">
                      {item.icon}
                    </div>
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[13px] mb-6 uppercase tracking-widest border-b pb-2">Được yêu thích</h4>
              <ul className="space-y-4 text-[12px] text-gray-500">
                {["Váy đầm", "Áo", "Áo len", "Quần jeans", "Bộ sưu tập"].map(i => (
                  <li key={i} className="hover:text-black flex items-center gap-2 cursor-pointer group">
                    <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" /> {i}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-l pl-10 text-center flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-zinc-50 rounded-2xl flex items-center justify-center mb-4 text-zinc-300 border border-dashed border-zinc-200">
                <Stars size={40} strokeWidth={1} />
              </div>
              <h4 className="font-bold text-[13px] mb-2 uppercase tracking-widest">Bộ sưu tập mới</h4>
              <p className="text-[10px] text-zinc-400 mb-5 px-6 italic">Khám phá phong cách mới nhất vừa cập bến tuần này.</p>
              <button className="bg-black text-white text-[10px] font-bold px-8 py-2.5 uppercase tracking-widest shadow-lg hover:bg-zinc-800 transition-all active:scale-95">
                Khám phá
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}