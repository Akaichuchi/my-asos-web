"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [activeImg, setActiveImg] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [copied, setCopied] = useState(false); // Trạng thái thông báo đã chép link

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products?id=${params.id}`);
        const data = await res.json();
        const item = Array.isArray(data) ? data.find((p: any) => p.id.toString() === params.id) : data;
        setProduct(item);
        if (item?.images) setActiveImg(item.images.split(',')[0].trim());
      } catch (error) {
        console.error("Lỗi:", error);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchProduct();
  }, [params.id]);

  // --- LOGIC NÂNG CẤP: SAO CHÉP LIÊN KẾT ---
  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Tự ẩn sau 2 giây
    });
  };

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to bag!");
      return;
    }
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = currentCart.findIndex((item: any) => item.id === product.id && item.size === selectedSize);

    if (existingItemIndex > -1) {
      currentCart[existingItemIndex].quantity += 1;
    } else {
      currentCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: activeImg,
        category: product.category,
        quantity: 1,
        size: selectedSize
      });
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
    router.push("/cart");
  };

  const handleAddToWishlist = () => {
    const currentWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const isExisted = currentWishlist.find((item: any) => item.id === product.id);

    if (!isExisted) {
      currentWishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: activeImg
      });
      localStorage.setItem("wishlist", JSON.stringify(currentWishlist));
      alert("Đã thêm vào mục yêu thích! ❤️");
    } else {
      alert("Sản phẩm đã có trong mục yêu thích.");
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-black italic animate-pulse">NEWEGG IS LOADING...</div>;
  if (!product) return <div className="p-20 text-center font-bold">SẢN PHẨM KHÔNG TỒN TẠI</div>;

  const images = product.images ? product.images.split(',') : [];

  return (
    <div className="bg-white min-h-screen text-[#2d2d2d] font-sans pb-20">
      {/* BREADCRUMBS */}
      <nav className="max-w-[1300px] mx-auto px-4 py-3 text-[11px] text-[#666] flex items-center gap-2">
        <Link href="/" className="hover:underline">Home</Link> <span>›</span>
        <Link href={`/${product.category}`} className="hover:underline capitalize">{product.category}</Link> <span>›</span>
        <span className="text-[#2d2d2d] font-medium truncate">{product.name}</span>
      </nav>

      <main className="max-w-[1300px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 pt-4">
        
        {/* THUMBNAILS (Desktop) */}
        <div className="hidden md:flex md:col-span-1 flex-col gap-2">
          {images.map((img: string, i: number) => (
            <button 
              key={i}
              onClick={() => setActiveImg(img.trim())}
              className={`border-2 ${activeImg === img.trim() ? 'border-[#2d2d2d]' : 'border-transparent'} transition-all`}
            >
              <img src={img.trim()} alt="thumb" className="w-full aspect-[3/4] object-cover" />
            </button>
          ))}
        </div>

        {/* MAIN IMAGE */}
        <div className="md:col-span-7 relative group">
          <div className="bg-[#F3F3F3] overflow-hidden">
            <img 
              src={activeImg} 
              alt={product.name} 
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
            />
          </div>
          
          {/* NÚT CHIA SẺ NÂNG CẤP */}
          <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
            <button 
              onClick={handleShare}
              className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors shadow-sm active:scale-90"
              title="Copy link"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 100-2.684 3 3 0 000 2.684zm0 12.684a3 3 0 100-2.684 3 3 0 000 2.684z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {copied && (
              <span className="bg-[#2d2d2d] text-white text-[10px] py-1 px-2 rounded-sm shadow-md animate-fade-in-up">
                Link copied!
              </span>
            )}
          </div>
        </div>

        {/* INFO COLUMN */}
        <div className="md:col-span-4 space-y-6">
          <header className="space-y-2">
            <h1 className="text-[18px] leading-snug text-[#2d2d2d] font-normal">{product.name}</h1>
            <div className="flex items-center gap-3">
               <span className="text-[20px] font-bold text-[#d01345]">${product.price}</span>
               {product.originalPrice && (
                 <span className="text-gray-400 line-through text-[16px]">${product.originalPrice}</span>
               )}
            </div>
          </header>

          <div className="bg-[#eef1f7] p-4 border-l-4 border-[#018849]">
            <p className="text-[12px] font-bold text-[#2d2d2d] uppercase tracking-wider">
              NEW HERE? Get 20% off with code: <span className="underline cursor-pointer">WELCOME</span>
            </p>
          </div>

          <div className="py-2 px-3 bg-[#ccff00] text-black text-[10px] font-black uppercase italic inline-block">
              Limited Time Only! Selling Fast 🔥
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <label className="text-[12px] font-bold uppercase tracking-widest text-[#2d2d2d]">Size:</label>
              <button className="text-[11px] text-[#666] underline font-bold uppercase">Size Guide</button>
            </div>
            
            <div className="relative">
              <select 
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full border border-[#ddd] py-3 px-4 text-[14px] focus:border-[#2d2d2d] outline-none appearance-none bg-white cursor-pointer"
              >
                <option value="">Please select</option>
                {['XS', 'S', 'M', 'L', 'XL', '2XL'].map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#666]">▼</div>
            </div>

            <div className="flex gap-4 pt-2">
              <button 
                onClick={handleAddToBag}
                className="flex-1 bg-[#018849] text-white py-4 font-bold uppercase text-[14px] tracking-widest hover:bg-[#016d3a] transition-all shadow-md active:scale-95"
              >
                Add to Bag
              </button>
              <button 
                onClick={handleAddToWishlist}
                className="w-14 h-14 border border-[#ddd] rounded-full flex items-center justify-center hover:bg-gray-50 transition-all group"
              >
                <svg className="w-6 h-6 text-[#2d2d2d] group-hover:text-red-500 group-hover:fill-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="pt-8 space-y-px border-t border-[#2d2d2d]">
            <details className="group border-b border-[#eee] py-4 cursor-pointer" open>
              <summary className="list-none font-bold uppercase text-[12px] flex justify-between items-center text-[#2d2d2d]">
                Product Details <span className="group-open:rotate-45 transition-transform text-lg">+</span>
              </summary>
              <div className="mt-4 text-[13px] text-[#666] leading-relaxed">
                {product.details || "No details provided for this product."}
              </div>
            </details>

            <details className="group border-b border-[#eee] py-4 cursor-pointer">
              <summary className="list-none font-bold uppercase text-[12px] flex justify-between items-center text-[#2d2d2d]">
                Size & Fit <span className="group-open:rotate-45 transition-transform text-lg">+</span>
              </summary>
              <div className="mt-4 text-[13px] text-[#666] italic">
                {product.sizeFit || "Standard NEWEGG Fit."}
              </div>
            </details>
          </div>

          <div className="pt-4 space-y-4">
            <div className="flex items-start gap-3 text-[13px]">
              <span className="font-bold">Shipped by NEWEGG</span>
            </div>
            <div className="flex items-start gap-3 text-[12px] text-[#666]">
              <div className="mt-0.5">🚚</div>
              <p>Free delivery on qualifying orders.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}