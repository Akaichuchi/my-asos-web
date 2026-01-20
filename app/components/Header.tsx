export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      {/* Thanh đen trên cùng - Giống ASOS 100% */}
      <div className="bg-[#2d2d2d] text-white text-[10px] py-2 px-4 flex justify-end gap-4 uppercase font-bold">
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

          {/* Menu chính cho máy tính */}
          <nav className="hidden md:flex gap-6 font-bold text-xs tracking-widest border-l border-r border-gray-200 px-6 h-full items-center">
            <span className="hover:bg-gray-100 h-full flex items-center px-4 cursor-pointer">WOMEN</span>
            <span className="hover:bg-gray-100 h-full flex items-center px-4 cursor-pointer border-l border-gray-200">MEN</span>
          </nav>

          {/* Thanh tìm kiếm chuẩn SEO */}
          <div className="flex-1 max-w-2xl relative hidden sm:block">
            <input 
              type="text" 
              placeholder="Tìm kiếm sản phẩm ASOS 2026..." 
              className="w-full bg-gray-100 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Biểu tượng tiện ích */}
          <div className="flex gap-3 md:gap-5 items-center">
            <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          </div>
        </div>
      </div>
    </header>
  );
}