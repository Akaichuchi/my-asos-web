'use client';
import { useState } from 'react';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f8f8] font-sans">
      {/* Header đơn giản phong cách ASOS */}
      <nav className="bg-black text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-black uppercase tracking-tighter">ASOS Admin</h1>
        <span className="text-xs font-bold bg-red-600 px-2 py-1 uppercase">2026 Editor Mode</span>
      </nav>

      <div className="max-w-5xl mx-auto p-6 lg:p-12">
        <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-3xl font-black uppercase mb-8 italic">Inventory Management</h2>
          
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tên sản phẩm */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase mb-2">Product Name:*</label>
              <input type="text" className="w-full border-2 border-gray-200 p-3 focus:border-black outline-none font-medium" placeholder="Ex: ASOS DESIGN oversized t-shirt" />
            </div>

            {/* Giá và Lượt yêu thích */}
            <div>
              <label className="block text-xs font-bold uppercase mb-2">Price ($):*</label>
              <input type="number" className="w-full border-2 border-gray-200 p-3 focus:border-black outline-none font-medium" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase mb-2">Initial Hearts ❤️:*</label>
              <input type="number" className="w-full border-2 border-gray-200 p-3 focus:border-black outline-none font-medium" placeholder="0" />
            </div>

            {/* Mô tả sản phẩm */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase mb-2">Product Description & Tags:*</label>
              <textarea className="w-full border-2 border-gray-200 p-3 focus:border-black outline-none font-medium" rows={4} placeholder="Describe the material, fit, and style..."></textarea>
            </div>

            {/* Hình ảnh */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase mb-2">Image URL:*</label>
              <input type="text" className="w-full border-2 border-gray-200 p-3 focus:border-black outline-none font-medium" placeholder="https://media.asos-media.com/..." />
            </div>

            {/* Nút gửi */}
            <div className="md:col-span-2 pt-4">
              <button 
                type="button"
                className="w-full bg-black text-white font-black py-5 uppercase tracking-widest hover:bg-gray-800 transition-all text-lg shadow-[4px_4px_0px_0px_rgba(255,0,0,1)]"
              >
                Publish Product to Store
              </button>
            </div>
          </form>
        </div>

        {/* Chú thích SEO Journalism */}
        <p className="mt-8 text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center">
          Professional inventory system v2.1 // Optimized for 2026 Core Web Vitals
        </p>
      </div>
    </div>
  );
}