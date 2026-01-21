import Header from "./components/Header";
import ProductCard from "./components/ProductCard";

export default function Home() {
  const products = [
    { 
      id: 1, 
      name: "Áo khoác ASOS Design - Mẫu mới 2026", 
      price: "1.250.000đ", 
      image: "https://images.asos-media.com/products/asos-design-oversized-t-shirt-in-white-with-back-print/204344445-1-white?$n_640w$&wid=513" 
    },
    { 
      id: 2, 
      name: "Quần Jean Slim Fit - Denim Blue", 
      price: "950.000đ", 
      image: "https://images.asos-media.com/products/asos-design-slim-jeans-in-light-wash-blue/204123456-1-blue?$n_640w$&wid=513" 
    },
    { 
      id: 3, 
      name: "Giày Sneaker Trắng Unisex", 
      price: "1.500.000đ", 
      image: "https://images.asos-media.com/products/asos-design-sneakers-in-white/203987654-1-white?$n_640w$&wid=513" 
    },
    { 
      id: 4, 
      name: "Áo Thun Oversize Đen", 
      price: "450.000đ", 
      image: "https://images.asos-media.com/products/asos-design-oversized-heavyweight-t-shirt-in-black/204556677-1-black?$n_640w$&wid=513" 
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Banner Quảng Cáo Giữ Nguyên Bố Cục 100% */}
      <div className="w-full relative h-[450px] md:h-[650px] bg-black overflow-hidden">
        <img 
          src="https://images.asos-media.com/products/asos-design-oversized-t-shirt-in-white-with-back-print/204344445-1-white" 
          className="w-full h-full object-cover opacity-85"
          alt="ASOS Campaign 2026"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
          <h2 className="text-6xl md:text-9xl font-black italic tracking-tighter uppercase">This is ASOS</h2>
          <div className="flex flex-col md:flex-row gap-3 mt-6">
            <button className="bg-white text-black px-10 py-3 font-bold text-xs hover:bg-gray-200 transition-colors uppercase tracking-widest">Shop Womens</button>
            <button className="bg-white text-black px-10 py-3 font-bold text-xs hover:bg-gray-200 transition-colors uppercase tracking-widest">Shop Mens</button>
          </div>
        </div>
      </div>

      {/* 4 ô màu sắc tiện ích - Giữ Nguyên 100% */}
      <div className="grid grid-cols-2 md:grid-cols-4 w-full text-center">
        <div className="bg-[#d0ff00] p-6 md:p-8 flex items-center justify-center h-[160px] md:h-[200px]">
          <p className="font-bold text-xs md:text-base uppercase leading-tight">New here? <br/> Get your first-timer discount</p>
        </div>
        <div className="bg-[#c1f5ff] p-6 md:p-8 flex items-center justify-center h-[160px] md:h-[200px]">
          <p className="font-bold text-xs md:text-base uppercase leading-tight">Download our app for exclusive discounts</p>
        </div>
        <div className="bg-[#ffc1d1] p-6 md:p-8 flex items-center justify-center h-[160px] md:h-[200px]">
          <p className="font-bold text-xs md:text-base uppercase leading-tight">ASOS PREMIER <br/> UNLIMITED DELIVERY</p>
        </div>
        <div className="bg-[#26e382] p-6 md:p-8 flex items-center justify-center h-[160px] md:h-[200px]">
          <p className="font-bold text-xs md:text-base uppercase leading-tight">Easy returns</p>
        </div>
      </div>

      {/* Brand Grid Section - Giữ Nguyên 100% */}
      <div className="max-w-7xl mx-auto px-4 mt-12 flex flex-col items-center">
        <button className="border-2 border-black px-8 py-3 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all mb-10">
          Shop Women&apos;s Brands
        </button>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <div className="relative aspect-[3/4] bg-gray-100 group cursor-pointer overflow-hidden">
            <img src="https://images.asos-media.com/products/adidas-originals-adicolor-classics-t-shirt-in-burgundy/204111222-1-burgundy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Adidas" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/5">
               <img src="https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" className="w-16 md:w-24 invert opacity-90" alt="Adidas Logo" />
            </div>
          </div>
          <div className="relative aspect-[3/4] bg-gray-100 group cursor-pointer overflow-hidden">
            <img src="https://images.asos-media.com/products/new-balance-9060-sneakers-in-grey-and-black/203555666-1-grey" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="New Balance" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/5">
               <img src="https://upload.wikimedia.org/wikipedia/commons/e/ea/New_Balance_logo.svg" className="w-16 md:w-24 invert opacity-90" alt="NB Logo" />
            </div>
          </div>
          <div className="relative aspect-[3/4] bg-gray-100 group cursor-pointer overflow-hidden">
            <img src="https://images.asos-media.com/products/asos-design-relaxed-revere-shirt-in-green-textured-fabric/204777888-1-green" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="ASOS Design" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
               <span className="text-white font-black text-xl md:text-3xl italic tracking-tighter">asos <span className="text-xs font-normal not-italic">design</span></span>
            </div>
          </div>
          <div className="relative aspect-[3/4] bg-gray-100 group cursor-pointer overflow-hidden">
            <img src="https://images.asos-media.com/products/topman-oversized-t-shirt-with-front-and-back-city-print-in-white/204344465-1-white" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Topman" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
               <span className="text-white font-black text-xl md:text-3xl uppercase tracking-tighter">Topman</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 text-center">
        <h3 className="text-xl md:text-3xl font-bold uppercase tracking-widest italic">The biggest brands</h3>
      </div>

      {/* Danh sách sản phẩm Giữ Nguyên 100% */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Discover & Categories - Giữ Nguyên 100% */}
      <div className="max-w-7xl mx-auto px-4 py-16 border-t border-gray-100">
        <div className="flex flex-col items-center mb-16">
          <button className="border-2 border-black px-8 py-3 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all">
            Shop Men&apos;s Brands
          </button>
        </div>

        <div className="mb-14">
          <h3 className="text-lg md:text-xl font-bold mb-6 tracking-tight">Discover more from</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 text-[11px] md:text-xs text-gray-500">
            {["adidas", "AllSaints", "Calvin Klein", "Converse", "Crocs", "Dr Martens", "Levi&apos;s", "New Balance", "Puma", "The North Face", "Timberland", "Tommy Hilfiger"].map((brand) => (
              <a key={brand} href="#" className="hover:underline hover:text-black transition-colors">{brand}</a>
            ))}
          </div>
        </div>

        <div className="mb-14 text-gray-500 text-[11px] md:text-xs">
          <h3 className="text-black text-lg md:text-xl font-bold mb-6 tracking-tight">Women&apos;s categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3">
            {["Women's Activewear", "Blouses", "Women's Boots", "Dresses", "Women's Gifts", "Women's Jeans", "Women's Jewelry", "Women's Loungewear", "Women's Pants", "Women's Petite Clothing", "Women's Plus Size Clothing", "Women's Shirts", "Women's Shoes", "Women's Shorts", "Skirts", "Women's Suits", "Women's Swimwear", "Women's Tall Clothing", "Women's Tops", "Women's Tracksuits"].map((cat) => (
              <a key={cat} href="#" className="hover:underline hover:text-black transition-colors">{cat}</a>
            ))}
          </div>
        </div>

        <div className="mb-14 text-gray-500 text-[11px] md:text-xs">
          <h3 className="text-black text-lg md:text-xl font-bold mb-6 tracking-tight">Men&apos;s categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3">
            {["Men's Accessories", "Men's Bags", "Men's Coats & Jackets", "Gifts for Men", "Men's Jeans", "Men's Jewelry", "Men's Loungewear", "Men's Partywear", "Men's Plus Size Clothing", "Men's Polo Shirts", "Men's Shirts", "Men's Shoes", "Men's Shorts", "Men's Sportswear", "Men's Suits", "Men's Swimwear", "Men's Tall Clothing", "Men's Tracksuits", "Men's Two Piece Sets", "Men's Workwear"].map((cat) => (
              <a key={cat} href="#" className="hover:underline hover:text-black transition-colors">{cat}</a>
            ))}
          </div>
        </div>
      </div>
      
      {/* CẬP NHẬT FOOTER CHUẨN 3 TẦNG ASOS */}
      <footer className="w-full">
        {/* TẦNG 1: SOCIAL & PAYMENT (Màu xám nhạt #eeeeee) */}
        <div className="bg-[#eeeeee] py-6 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="flex gap-6 items-center md:pr-8 md:border-r border-gray-300">
              <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" className="w-5 h-5 opacity-70" alt="Facebook" /></a>
              <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" className="w-5 h-5 opacity-70" alt="Instagram" /></a>
              <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/3670/3670162.png" className="w-5 h-5 opacity-70" alt="Snapchat" /></a>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4 opacity-80">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3 border border-gray-300 px-1 bg-white" alt="Visa" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5" alt="Mastercard" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-3 border border-gray-300 px-1 bg-white" alt="PayPal" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" className="h-4" alt="Amex" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c4/Klarna_Logo.svg" className="h-3 px-1 bg-[#ffb3c7]" alt="Klarna" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_Pay_logo.svg" className="h-4 border border-black px-1 bg-white" alt="Apple Pay" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Afterpay_logo_2021.svg" className="h-4 px-1 bg-[#b2fce4]" alt="Afterpay" />
            </div>
          </div>
        </div>

        {/* TẦNG 2: DIRECTORY LINKS (Màu xám vừa #dddddd) */}
        <div className="bg-[#dddddd] py-12">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <h4 className="text-[12px] font-bold uppercase tracking-widest mb-5 text-gray-800">Help and Information</h4>
              <ul className="text-[11px] text-gray-600 space-y-3">
                <li><a href="#" className="hover:text-black">Help</a></li>
                <li><a href="#" className="hover:text-black">Track order</a></li>
                <li><a href="#" className="hover:text-black">Delivery & returns</a></li>
                <li><a href="#" className="hover:text-black">ASOS Premier</a></li>
                <li><a href="#" className="hover:text-black">10% Student Discount</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[12px] font-bold uppercase tracking-widest mb-5 text-gray-800">About ASOS</h4>
              <ul className="text-[11px] text-gray-600 space-y-3">
                <li><a href="#" className="hover:text-black">About us</a></li>
                <li><a href="#" className="hover:text-black">Careers at ASOS</a></li>
                <li><a href="#" className="hover:text-black">Corporate responsibility</a></li>
                <li><a href="#" className="hover:text-black">Investors&apos; site</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[12px] font-bold uppercase tracking-widest mb-5 text-gray-800">More From ASOS</h4>
              <ul className="text-[11px] text-gray-600 space-y-3">
                <li><a href="#" className="hover:text-black">Mobile and ASOS apps</a></li>
                <li><a href="#" className="hover:text-black">ASOS Marketplace</a></li>
                <li><a href="#" className="hover:text-black">Gift vouchers</a></li>
                <li><a href="#" className="hover:text-black">Black Friday</a></li>
                <li><a href="#" className="hover:text-black">ASOS x Thrift+</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[12px] font-bold uppercase tracking-widest mb-5 text-gray-800">Shopping from:</h4>
              <div className="flex items-center gap-2 text-[11px] text-gray-600 mb-5">
                <span>You&apos;re in</span>
                <img src="https://flagcdn.com/w20/vn.png" className="w-4 h-3 object-cover rounded-sm" alt="VN" />
                <span className="font-bold border-l border-gray-400 pl-2 ml-1">CHANGE</span>
              </div>
              <p className="text-[11px] text-gray-600 mb-3">Some of our international sites:</p>
              <div className="flex flex-wrap gap-2">
                {['gb', 'us', 'de', 'fr', 'au', 'it', 'es', 'jp'].map(flag => (
                  <img key={flag} src={`https://flagcdn.com/w20/${flag}.png`} className="w-4 h-4 rounded-full object-cover border border-gray-300" alt={flag} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* TẦNG 3: LEGAL & COPYRIGHT (Màu xám đậm #cccccc) */}
        <div className="bg-[#cccccc] py-4">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-700 font-bold uppercase tracking-widest gap-4">
            <span>© 2026 ASOS</span>
            <div className="flex gap-4 items-center">
              <a href="#" className="hover:underline">Privacy & Cookies</a>
              <span className="opacity-30">|</span>
              <a href="#" className="hover:underline">Ts&Cs</a>
              <span className="opacity-30">|</span>
              <a href="#" className="hover:underline">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}