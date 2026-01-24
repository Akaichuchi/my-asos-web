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

  // State cho bình luận
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
          setReviews(item.reviews || []); // Giả sử API trả về reviews kèm theo

          // --- LOGIC: SẢN PHẨM VỪA XEM ---
          const currentRecent = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
          const filteredRecent = currentRecent.filter((p: any) => p.id !== item.id);
          const updatedRecent = [{
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.images?.split(',')[0].trim()
          }, ...filteredRecent].slice(0, 5); // Lưu tối đa 5 sản phẩm
          
          localStorage.setItem("recentlyViewed", JSON.stringify(updatedRecent));
          setRecentlyViewed(updatedRecent);

          // 2. Lấy sản phẩm liên quan
          if (item.category) {
            const relatedRes = await fetch(`/api/products?category=${item.category}`);
            const relatedData = await relatedRes.json();
            const filtered = relatedData.filter((p: any) => p.id !== item.id).slice(0, 4);
            setRelatedProducts(filtered);
          }
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

  const handleAddToBag = () => {
    if (!selectedSize) { alert("Please select a size before adding to bag!"); return; }
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = currentCart.findIndex((item: any) => item.id === product.id && item.size === selectedSize);

    if (existingItemIndex > -1) {
      currentCart[existingItemIndex].quantity += 1;
    } else {
      currentCart.push({ id: product.id, name: product.name, price: product.price, image: activeImg, category: product.category, quantity: 1, size: selectedSize });
    }
    localStorage.setItem("cart", JSON.stringify(currentCart));
    router.push("/cart");
  };

  const handleAddToWishlist = () => {
    const currentWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (!currentWishlist.find((item: any) => item.id === product.id)) {
      currentWishlist.push({ id: product.id, name: product.name, price: product.price, image: activeImg });
      localStorage.setItem("wishlist", JSON.stringify(currentWishlist));
      alert("Đã thêm vào mục yêu thích! ❤️");
    }
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment) return;
    const newReview = { id: Date.now(), rating, comment, date: new Date().toLocaleDateString() };
    setReviews([newReview, ...reviews]);
    setComment("");
    alert("Cảm ơn bạn đã đánh giá!");
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-black italic animate-pulse">NEWEGG IS LOADING...</div>;
  if (!product) return <div className="p-20 text-center font-bold">SẢN PHẨM KHÔNG TỒN TẠI</div>;

  const images = product.images ? product.images.split(',') : [];

  return (
    <div className="bg-white min-h-screen text-[#2d2d2d] font-sans pb-20">
      <nav className="max-w-[1300px] mx-auto px-4 py-3 text-[11px] text-[#666] flex items-center gap-2">
        <Link href="/" className="hover:underline">Home</Link> <span>›</span>
        <Link href={`/${product.category}`} className="hover:underline capitalize">{product.category}</Link> <span>›</span>
        <span className="text-[#2d2d2d] font-medium truncate">{product.name}</span>
      </nav>

      <main className="max-w-[1300px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 pt-4">
        {/* THUMBNAILS */}
        <div className="hidden md:flex md:col-span-1 flex-col gap-2">
          {images.map((img: string, i: number) => (
            <button key={i} onClick={() => setActiveImg(img.trim())} className={`border-2 ${activeImg === img.trim() ? 'border-[#2d2d2d]' : 'border-transparent'} transition-all`}>
              <img src={img.trim()} alt="thumb" className="w-full aspect-[3/4] object-cover" />
            </button>
          ))}
        </div>

        {/* MAIN IMAGE */}
        <div className="md:col-span-7 relative group">
          <div className="bg-[#F3F3F3] overflow-hidden">
            <img src={activeImg} alt={product.name} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
            <button onClick={handleShare} className="p-2 bg-white/80 rounded-full hover:bg-white shadow-sm transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 100-2.684 3 3 0 000 2.684zm0 12.684a3 3 0 100-2.684 3 3 0 000 2.684z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
            {copied && <span className="bg-[#2d2d2d] text-white text-[10px] py-1 px-2 rounded-sm animate-fade-in-up">Link copied!</span>}
          </div>
        </div>

        {/* INFO COLUMN */}
        <div className="md:col-span-4 space-y-6">
          <header className="space-y-2">
            <h1 className="text-[18px] leading-snug font-normal">{product.name}</h1>
            <div className="flex items-center gap-3">
               <span className="text-[20px] font-bold text-[#d01345]">${product.price}</span>
               {product.originalPrice && <span className="text-gray-400 line-through text-[16px]">${product.originalPrice}</span>}
            </div>
          </header>

          <div className="bg-[#eef1f7] p-4 border-l-4 border-[#018849] text-[12px] font-bold uppercase tracking-wider">
            NEW HERE? Get 20% off with code: <span className="underline cursor-pointer">WELCOME</span>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex justify-between items-center text-[12px] font-bold uppercase tracking-widest">
              <label>Size:</label>
              <button className="text-[#666] underline">Size Guide</button>
            </div>
            <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="w-full border border-[#ddd] py-3 px-4 text-[14px] outline-none bg-white cursor-pointer">
              <option value="">Please select</option>
              {['XS', 'S', 'M', 'L', 'XL', '2XL'].map(size => <option key={size} value={size}>{size}</option>)}
            </select>

            <div className="flex gap-4 pt-2">
              <button onClick={handleAddToBag} className="flex-1 bg-[#018849] text-white py-4 font-bold uppercase text-[14px] tracking-widest hover:bg-[#016d3a] transition-all active:scale-95">Add to Bag</button>
              <button onClick={handleAddToWishlist} className="w-14 h-14 border border-[#ddd] rounded-full flex items-center justify-center hover:bg-gray-50 transition-all group">
                <svg className="w-6 h-6 group-hover:text-red-500 group-hover:fill-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </button>
            </div>
          </div>

          {/* REVIEWS SECTION */}
          <div className="pt-8 border-t border-[#eee]">
            <h3 className="font-bold uppercase text-[12px] mb-4">Reviews ({reviews.length})</h3>
            <form onSubmit={submitReview} className="space-y-3 mb-6">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <button key={s} type="button" onClick={() => setRating(s)} className={`text-xl ${rating >= s ? 'text-yellow-400' : 'text-gray-300'}`}>★</button>
                ))}
              </div>
              <textarea 
                value={comment} 
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review..." 
                className="w-full border p-3 text-sm h-24 outline-none focus:border-black"
              />
              <button type="submit" className="bg-[#2d2d2d] text-white px-6 py-2 text-[12px] font-bold uppercase hover:bg-black">Post Review</button>
            </form>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {reviews.map((r: any) => (
                <div key={r.id} className="border-b pb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-yellow-400 text-xs">{"★".repeat(r.rating)}</span>
                    <span className="text-[10px] text-gray-400">{r.date}</span>
                  </div>
                  <p className="text-[13px] text-[#666]">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* --- YOU MIGHT ALSO LIKE --- */}
      <section className="max-w-[1300px] mx-auto px-4 md:px-8 mt-20 border-t border-gray-100 pt-10">
        <h2 className="text-[16px] font-bold uppercase tracking-[2px] mb-8">You might also like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {relatedProducts.map((item: any) => (
            <Link key={item.id} href={`/product/${item.id}`} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#F3F3F3] mb-3">
                <img src={item.image || item.images?.split(',')[0]} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              </div>
              <h3 className="text-[12px] text-[#2d2d2d] line-clamp-2 mb-1 group-hover:underline">{item.name}</h3>
              <p className="text-[13px] font-bold text-[#d01345]">${item.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* --- RECENTLY VIEWED (SẢN PHẨM VỪA XEM) --- */}
      <section className="max-w-[1300px] mx-auto px-4 md:px-8 mt-20 pt-10 border-t-4 border-black">
        <h2 className="text-[16px] font-bold uppercase tracking-[2px] mb-8">Recently Viewed</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {recentlyViewed.map((item: any) => (
            <Link key={item.id} href={`/product/${item.id}`} className="min-w-[150px] md:min-w-[200px] group block">
              <div className="aspect-[3/4] bg-[#F3F3F3] mb-2 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-[11px] text-gray-500 truncate">{item.name}</p>
              <p className="text-[12px] font-bold">${item.price}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}