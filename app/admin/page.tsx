'use client';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  // KHAI BÁO TÁCH BIỆT ĐỂ HẾT LỖI DÒNG ĐỎ
  const [activeTab, setActiveTab] = useState('users'); 
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);

  // LOGIC TỰ ĐỘNG LẤY DỮ LIỆU TỪ DATABASE
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/register');
        const data = await res.json();
        if (Array.isArray(data)) {
          setUsers(data); 
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu khách hàng:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f3f3] font-sans">
      {/* Top Bar: GIỮ NGUYÊN PHONG CÁCH ASOS */}
      <div className="bg-black text-white p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-black uppercase tracking-tighter italic">ASOS Management Hub</h1>
        <div className="flex gap-4">
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 text-xs font-bold uppercase transition-all ${activeTab === 'users' ? 'bg-white text-black' : 'border border-white'}`}
          >
            Quản lý Khách hàng
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 text-xs font-bold uppercase transition-all ${activeTab === 'products' ? 'bg-white text-black' : 'border border-white'}`}
          >
            Quản lý Sản phẩm
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 lg:p-10">
        
        {/* TAB 1: QUẢN LÝ KHÁCH HÀNG - GIỮ NGUYÊN BỐ CỤC */}
        {activeTab === 'users' && (
          <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-in fade-in duration-300">
            <h2 className="text-2xl font-black uppercase mb-6 italic underline">User & Balance Control</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 uppercase text-[10px] font-bold tracking-widest border-b-2 border-black">
                    <th className="p-3">Email Khách hàng</th>
                    <th className="p-3">Số dư hiện tại</th>
                    <th className="p-3">Cộng/Trừ tiền</th>
                    <th className="p-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium">
                  {loading ? (
                    <tr><td colSpan={4} className="p-3 text-center italic">Đang tải dữ liệu...</td></tr>
                  ) : users.length === 0 ? (
                    <tr><td colSpan={4} className="p-3 text-center italic text-gray-400">Chưa có khách hàng nào.</td></tr>
                  ) : (
                    users.map((user: any) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-bold">{user.email}</td>
                        <td className="p-3 font-bold text-green-600">${user.balance.toFixed(2)}</td>
                        <td className="p-3">
                          <input type="number" className="border-2 border-gray-200 p-1 w-24 outline-none focus:border-black" placeholder="+/- $" />
                        </td>
                        <td className="p-3 text-right">
                          <button className="bg-black text-white px-3 py-1 text-xs font-bold uppercase hover:bg-red-600 transition-colors">Cập nhật</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: QUẢN LÝ SẢN PHẨM - GIỮ NGUYÊN 100% */}
        {activeTab === 'products' && (
          <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-in fade-in duration-300">
            <h2 className="text-2xl font-black uppercase mb-6 italic underline">Product Inventory</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 p-4 bg-gray-50 border border-dashed border-black">
              <div className="md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest">Tên sản phẩm:*</label>
                <input type="text" className="w-full border-2 border-gray-200 p-2 outline-none focus:border-black" />
              </div>
              <div>
                <label className="text-[10 tax] font-bold uppercase tracking-widest">Giá tiền ($):*</label>
                <input type="number" className="w-full border-2 border-gray-200 p-2 outline-none focus:border-black" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest">Lượt Tym ❤️:*</label>
                <input type="number" className="w-full border-2 border-gray-200 p-2 outline-none focus:border-black" />
              </div>
              <div className="md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest">Mô tả & Hình ảnh:*</label>
                <textarea className="w-full border-2 border-gray-200 p-2 outline-none focus:border-black" rows={2}></textarea>
              </div>
              <button className="md:col-span-2 bg-black text-white py-3 font-black uppercase tracking-widest hover:bg-gray-800 transition-all">Đăng sản phẩm mới</button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}