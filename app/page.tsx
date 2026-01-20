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
      
      {/* Banner Quảng Cáo Giống ASOS 100% */}
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