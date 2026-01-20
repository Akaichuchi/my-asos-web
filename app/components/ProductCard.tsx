export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="group cursor-pointer flex flex-col h-full bg-white border border-gray-50 md:border-none p-1 md:p-0">
      <div className="relative overflow-hidden aspect-[3/4] bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="mt-2 md:mt-3 flex flex-col flex-1 px-1">
        <h3 className="text-[11px] md:text-sm text-gray-600 line-clamp-2 min-h-[32px] md:min-h-[40px]">
          {product.name}
        </h3>
        <p className="text-[12px] md:text-sm font-black mt-1">{product.price}</p>
        
        {/* Nút liên hệ chuẩn SEO & UX */}
        <button className="mt-auto mb-1 w-full bg-[#eeeeee] hover:bg-black hover:text-white py-2 text-[10px] font-bold transition-all uppercase tracking-tighter">
          Chát Zalo: 0xxx.xxx.xxx
        </button>
      </div>
    </div>
  );
}