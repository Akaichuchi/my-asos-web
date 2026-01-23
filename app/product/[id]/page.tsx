"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Thêm useRouter để chuyển hướng
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter(); // Khởi tạo router
  const [product, setProduct] = useState<any>(null);
  const [activeImg, setActiveImg] = useState("");
  const [loading, setLoading] = useState(true);

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

  // --- LOGIC XỬ LÝ GIỎ HÀNG ---
  const handleAddToBag = () => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    // Kiểm tra sản phẩm đã có trong giỏ hàng chưa (dựa trên ID)
    const existingItemIndex = currentCart.findIndex((item: any) => item.id === product.id);

    if (existingItemIndex > -1) {
      currentCart[existingItemIndex].quantity += 1;
    } else {
      currentCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: activeImg,
        category: product.category,
        quantity: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
    router.push("/cart"); // Nhảy sang trang giỏ hàng
  };

  // --- LOGIC XỬ LÝ YÊU THÍCH ---
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

  if (loading) return <div className="h-screen flex items-center justify-center font-black italic animate-pulse">ASOS IS LOADING...</div>;
  if (!product) return <div className="p-20 text-center font-bold">SẢN PHẨM KHÔNG TỒN TẠI</div>;

  const images = product.images ? product.images.split(',') : [];

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 font-sans">
      {/* Breadcrumb */}
      <nav className="text-[10px] uppercase font-bold mb-6 text-gray-500">
        <Link href="/" className="hover:underline">Home</Link> / 
        <Link href={`/${product.category}`} className="mx-2 hover:underline">{product.category}</Link> / 
        <span className="text-black">{product.name}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-8">
        {/* PHẦN 1: GALLERY ẢNH */}
        <div className="md:w-[60%] flex gap-3">
          <div className="hidden md:flex flex-col gap-2 w-16">
            {images.map((img: string, i: number) => (
              <img 
                key={i} 
                src={img.trim()} 
                onClick={() => setActiveImg(img.trim())}
                className={`cursor-pointer border-2 ${activeImg === img.trim() ? 'border-black' : 'border-transparent'} hover:border-gray-400`}
                alt="thumb"
              />
            ))}
          </div>
          <div className="flex-1 bg-[#F3F3F3]">
            <img src={activeImg} className="w-full h-auto object-cover" alt={product.name} />
          </div>
        </div>

        {/* PHẦN 2: THÔNG TIN CHI TIẾT */}
        <div className="md:w-[40%] space-y-6">
          <h1 className="text-xl font-medium tracking-tight text-[#2d2d2d] uppercase">{product.name}</h1>
          
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-black text-[#d01345] italic">{product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-lg">{product.originalPrice}</span>
            )}
          </div>

          <div className="py-3 px-4 bg-[#ccff00] text-black text-[11px] font-extrabold uppercase tracking-tighter italic">
            Limited Time Only! Selling Fast 🔥
          </div>

          {/* NÚT TƯƠNG TÁC */}
          <div className="flex gap-3">
            <button 
              onClick={handleAddToBag}
              className="flex-1 bg-[#018849] text-white py-4 font-black uppercase hover:bg-[#016a3a] transition-colors shadow-lg"
            >
              Add to Bag
            </button>
            
            {/* Nút hình trái tim */}
            <button 
              onClick={handleAddToWishlist}
              className="w-14 h-14 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all group"
            >
              <svg className="w-6 h-6 text-gray-400 group-hover:text-red-500 group-hover:fill-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Accordion Chi tiết */}
          <div className="border-t border-black mt-8">
            <details className="group border-b border-gray-200 py-4 cursor-pointer" open>
              <summary className="list-none font-black uppercase text-[12px] flex justify-between items-center">
                Product Details <span className="group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="mt-3 text-sm text-gray-600 leading-relaxed">
                {product.details || "No details provided for this product."}
              </div>
            </details>

            <details className="group border-b border-gray-200 py-4 cursor-pointer">
              <summary className="list-none font-black uppercase text-[12px] flex justify-between items-center">
                Size & Fit <span className="group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="mt-3 text-sm text-gray-600 italic">
                {product.sizeFit || "Standard ASOS Fit."}
              </div>
            </details>
          </div>

          {/* ĐÁNH GIÁ (REVIEWS) */}
          <div className="pt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black uppercase text-[12px]">Reviews (★ ★ ★ ★ ☆)</h3>
                <span className="text-[10px] font-bold underline cursor-pointer">Write a review</span>
              </div>
              <div className="bg-gray-50 p-4 border border-black/5">
                <p className="text-[10px] font-black uppercase">Verified Buyer - 5 days ago</p>
                <p className="text-sm mt-1">"The material is amazing! Perfect for summer."</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}