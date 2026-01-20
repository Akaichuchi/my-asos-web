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

      {/* ĐÃ SỬA LỖI: Thay dấu nháy đơn thành &apos; */}
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

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      
      <footer className="py-10 border-t border-gray-100 text-center text-[10px] text-gray-400 uppercase tracking-widest">
        © 2026 ASOS CLONE - Trang web của bạn
      </footer>
    </main>
  );
}