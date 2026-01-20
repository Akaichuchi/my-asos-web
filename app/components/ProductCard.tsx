'use client';
export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="group relative border border-gray-100 p-2">
      <div className="aspect-[3/4] overflow-hidden bg-gray-100">
        <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
      </div>
      <div className="mt-2">
        <h3 className="text-[10px] text-gray-700 uppercase truncate">{product.name}</h3>
        <p className="text-sm font-bold mt-1">{product.price}</p>
        <button 
          onClick={() => window.open('https://zalo.me/SỐ_ĐIỆN_THOẠI_CỦA_BẠN', '_blank')}
          className="w-full mt-2 py-2 bg-black text-white text-[10px] font-bold uppercase"
        >
          Liên hệ Zalo
        </button>
      </div>
    </div>
  );
}