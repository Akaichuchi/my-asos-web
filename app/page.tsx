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

        <div className="mb-14">
          <h3 className="text-lg md:text-xl font-bold mb-6 tracking-tight">Women&apos;s categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 text-[11px] md:text-xs text-gray-500">
            {["Women's Activewear", "Blouses", "Women's Boots", "Dresses", "Women's Gifts", "Women's Jeans", "Women's Jewelry", "Women's Loungewear", "Women's Pants", "Women's Petite Clothing", "Women's Plus Size Clothing", "Women's Shirts", "Women's Shoes", "Women's Shorts", "Skirts", "Women's Suits", "Women's Swimwear", "Women's Tall Clothing", "Women's Tops", "Women's Tracksuits"].map((cat) => (
              <a key={cat} href="#" className="hover:underline hover:text-black transition-colors">{cat}</a>
            ))}
          </div>
        </div>

        <div className="mb-14">
          <h3 className="text-lg md:text-xl font-bold mb-6 tracking-tight">Men&apos;s categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 text-[11px] md:text-xs text-gray-500">
            {["Men's Accessories", "Men's Bags", "Men's Coats & Jackets", "Gifts for Men", "Men's Jeans", "Men's Jewelry", "Men's Loungewear", "Men's Partywear", "Men's Plus Size Clothing", "Men's Polo Shirts", "Men's Shirts", "Men's Shoes", "Men's Shorts", "Men's Sportswear", "Men's Suits", "Men's Swimwear", "Men's Tall Clothing", "Men's Tracksuits", "Men's Two Piece Sets", "Men's Workwear"].map((cat) => (
              <a key={cat} href="#" className="hover:underline hover:text-black transition-colors">{cat}</a>
            ))}
          </div>
        </div>
      </div>
      
      {/* PHẦN CẬP NHẬT MỚI: LOGO THANH TOÁN & MẠNG XÃ HỘI */}
      <footer className="bg-[#f0f0f0] py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Social Icons */}
          <div className="flex gap-6 items-center">
            <a href="#" className="grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" className="w-5 h-5" alt="Facebook" />
            </a>
            <a href="#" className="grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
              <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" className="w-5 h-5" alt="Instagram" />
            </a>
            <a href="#" className="grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
              <img src="https://cdn-icons-png.flaticon.com/512/3670/3670151.png" className="w-5 h-5" alt="TikTok" />
            </a>
          </div>

          {/* Payment Methods */}
          <div className="flex flex-wrap justify-center gap-6 md:border-l md:border-gray-300 md:pl-8">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3 opacity-50 hover:opacity-100 transition-opacity" alt="Visa" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5 opacity-50 hover:opacity-100 transition-opacity" alt="Mastercard" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4 opacity-50 hover:opacity-100 transition-opacity" alt="PayPal" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/American_Express_logo_%282018%29.svg" className="h-4 opacity-50 hover:opacity-100 transition-opacity" alt="Amex" />
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-gray-200 text-center text-[10px] text-gray-400 uppercase tracking-widest">
          © 2026 ASOS CLONE - Trang web của bạn
        </div>
      </footer>
    </main>
  );
}