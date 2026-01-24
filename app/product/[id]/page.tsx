"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]); 
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);
  const [activeImg, setActiveImg] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [copied, setCopied] = useState(false);

  // State cho số lượng
  const [quantity, setQuantity] = useState(1);

  // State cho bình luận và đánh giá
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await fetch(`/api/products?id=${params.id}`);
        const data = await res.json();
        const item = Array.isArray(data) ? data.find((p: any) => p.id.toString() === params.id) : data;
        
        if (item) {
          setProduct(item);
          if (item.images) setActiveImg(item.images.split(',')[0].trim());
          setReviews(item.reviews || []);

          const currentRecent = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
          const filteredRecent = currentRecent.filter((p: any) => p.id !== item.id);
          const updatedRecent = [{
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.images?.split(',')[0].trim()
          }, ...filteredRecent].slice(0, 5);
          localStorage.setItem("recentlyViewed", JSON.stringify(updatedRecent));
          setRecentlyViewed(updatedRecent);
        }

        if (item?.category) {
          const relatedRes = await fetch(`/api/products?category=${item.category}`);
          const relatedData = await relatedRes.json();
          const filtered = relatedData.filter((p: any) => p.id !== item.id).slice(0, 4);
          setRelatedProducts(filtered);
        }
      } catch (error) {
        console.error("Lỗi:", error);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchProductData();
  }, [params.id]);

  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Cập nhật logic: Thêm vào giỏ hàng và chuyển hướng sang trang /cart ngay lập tức
  const handleBuyNow = () => {
    if (!selectedSize) { 
      alert("Vui lòng chọn kích cỡ trước khi thanh toán!"); 
      return; 
    }

    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = currentCart.findIndex(
      (item: any) => item.id === product.id && item.size === selectedSize
    );

    if (existingItemIndex > -1) {
      currentCart[existingItemIndex].quantity += quantity;
    } else {
      currentCart.push({
        id: product.id, 
        name: product.name, 
        price: product.price, 
        image: activeImg,
        category: product.category, 
        quantity: quantity, 
        size: selectedSize
      });
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
    
    // Điều hướng khách hàng đến trang giỏ hàng
    router.push("/cart");
  };

  const handleAddToWishlist = () => {
    const currentWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (!currentWishlist.find((item: any) => item.id === product.id)) {
      currentWishlist.push({ id: product.id, name: product.name, price: product.price, image: activeImg });
      localStorage.setItem("wishlist", JSON.stringify(currentWishlist));
      alert("Đã thêm vào mục yêu thích! ❤️");
    } else {
      alert("Sản phẩm đã có trong mục yêu thích.");
    }
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment) return;
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: params.id, rating, comment }),
      });
      if (res.ok) {
        const savedReview = await res.json();
        setReviews([savedReview, ...reviews]);
        setComment("");
        setRating(5);
        alert("Cảm ơn bạn đã đánh giá! ⭐");
      }
    } catch (error) {
      console.error("Lỗi gửi review:", error);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-black italic animate-pulse">ĐANG TẢI DỮ LIỆU...</div>;
  if (!product) return <div className="p-20 text-center font-bold">SẢN PHẨM KHÔNG TỒN TẠI</div>;

  const images = product.images ? product.images.split(',') : [];

  return (
    <div className="bg-white min-h-screen text-[#2d2d2d] font-sans pb-20">
      <nav className="max-w-[1300px] mx-auto px-4 py-3 text-[11px] text-[#666] flex items-center gap-2">
        <Link href="/" className="hover:underline">Trang chủ</Link> <span>›</span>
        <Link href={`/${product.category}`} className="hover:underline capitalize">{product.category}</Link> <span>›</span>
        <span className="text-[#2d2d2d] font-medium truncate">{product.name}</span>
      </nav>

      <main className="max-w-[1300px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 pt-4">
        <div className="hidden md:flex md:col-span-1 flex-col gap-2">
          {images.map((img: string, i: number) => (
            <button key={i} onClick={() => setActiveImg(img.trim())} className={`border-2 ${activeImg === img.trim() ? 'border-[#2d2d2d]' : 'border-transparent'} transition-all`}>
              <img src={img.trim()} alt="thumb" className="w-full aspect-[3/4] object-cover" />
            </button>
          ))}
        </div>

        <div className="md:col-span-7 relative group">
          <div className="bg-[#F3F3F3] overflow-hidden">
            <img src={activeImg} alt={product.name} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
        </div>

        <div className="md:col-span-4 space-y-6">
          <header className="space-y-2">
            <h1 className="text-[18px] leading-snug text-[#2d2d2d] font-normal">{product.name}</h1>
            <div className="flex items-center gap-3">
               <span className="text-[20px] font-bold text-[#d01345]">${product.price}</span>
               {product.originalPrice && <span className="text-gray-400 line-through text-[16px]">${product.originalPrice}</span>}
            </div>
          </header>

          <div className="py-2 px-3 bg-[#ccff00] text-black text-[10px] font-black uppercase italic inline-block">Sản phẩm đang bán rất chạy! 🔥</div>

          <div className="space-y-4 pt-4">
            <div className="flex justify-between items-center text-[12px] font-bold uppercase tracking-widest">
              <label>Kích cỡ:</label>
              <button className="text-[#666] underline">Hướng dẫn chọn size</button>
            </div>
            <div className="relative">
              <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="w-full border border-[#ddd] py-3 px-4 text-[14px] focus:border-[#2d2d2d] outline-none appearance-none bg-white cursor-pointer font-bold">
                <option value="">Vui lòng chọn size</option>
                {['XS', 'S', 'M', 'L', 'XL', '2XL'].map(size => <option key={size} value={size}>{size}</option>)}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#666]">▼</div>
            </div>

            <div className="pt-2">
              <label className="block text-[12px] font-bold uppercase tracking-widest mb-2">Số lượng:</label>
              <div className="flex items-center border border-[#ddd] w-max bg-white">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 font-black border-r border-[#ddd] hover:bg-gray-100">-</button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 font-black border-l border-[#ddd] hover:bg-gray-100">+</button>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              {/* Đã bỏ nút "Thêm vào giỏ hàng", chỉ giữ lại "Thanh toán ngay" */}
              <button onClick={handleBuyNow} className="w-full bg-[#2d2d2d] text-white py-4 font-bold uppercase text-[14px] tracking-widest hover:bg-black transition-all shadow-md active:scale-95">
                Thanh toán ngay
              </button>
              
              <button onClick={handleAddToWishlist} className="text-[12px] uppercase font-bold text-gray-400 hover:text-black flex items-center justify-center gap-2 pt-2">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                 Thêm vào yêu thích
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-[#2d2d2d]">
            <details className="group border-b border-[#eee] py-4 cursor-pointer" open>
              <summary className="list-none font-bold uppercase text-[12px] flex justify-between items-center">Chi tiết sản phẩm <span className="group-open:rotate-45 transition-transform text-lg">+</span></summary>
              <div className="mt-4 text-[13px] text-[#666]">{product.details || "Chưa có mô tả chi tiết."}</div>
            </details>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <h3 className="text-[12px] font-bold uppercase mb-4 tracking-widest">Đánh giá từ khách hàng</h3>
            <form onSubmit={submitReview} className="space-y-3 mb-6">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button key={star} type="button" onClick={() => setRating(star)} className={`text-xl ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}>★</button>
                ))}
              </div>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Viết đánh giá của bạn..." className="w-full border border-gray-200 p-3 text-[13px] outline-none focus:border-[#2d2d2d] h-20 resize-none" />
              <button type="submit" className="bg-[#2d2d2d] text-white px-4 py-2 text-[11px] font-bold uppercase hover:bg-black transition-colors">Gửi đánh giá</button>
            </form>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {reviews.length > 0 ? reviews.map((r: any) => (
                <div key={r.id} className="border-b border-gray-50 pb-3">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-yellow-500">{"★".repeat(r.rating)}</span>
                    <span className="text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-[12px] text-[#666]">{r.comment}</p>
                </div>
              )) : <p className="text-[11px] text-gray-400 italic">Chưa có bình luận nào.</p>}
            </div>
          </div>
        </div>
      </main>

      {/* --- MỤC SẢN PHẨM LIÊN QUAN --- */}
      <section className="max-w-[1300px] mx-auto px-4 md:px-8 mt-20 border-t border-gray-100 pt-10">
        <h2 className="text-[16px] font-bold uppercase tracking-[2px] mb-8 text-center md:text-left">Có thể bạn sẽ thích</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {relatedProducts.map((item: any) => (
            <Link key={item.id} href={`/product/${item.id}`} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#F3F3F3] mb-3">
                <img src={item.images?.split(',')[0].trim()} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="text-[12px] text-[#2d2d2d] line-clamp-2 mb-1 group-hover:underline">{item.name}</h3>
              <p className="text-[13px] font-bold text-[#d01345]">${item.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* --- MỤC SẢN PHẨM VỪA XEM --- */}
      <section className="max-w-[1300px] mx-auto px-4 md:px-8 mt-20 border-t border-gray-100 pt-10">
        <h2 className="text-[16px] font-bold uppercase tracking-[2px] mb-8 text-center md:text-left">Sản phẩm vừa xem</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {recentlyViewed.map((item: any) => (
            <Link key={item.id} href={`/product/${item.id}`} className="group block opacity-80 hover:opacity-100 transition-opacity">
              <div className="aspect-[3/4] overflow-hidden bg-[#F3F3F3] mb-2">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-[11px] text-[#666] truncate">{item.name}</p>
              <p className="text-[12px] font-bold">${item.price}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}