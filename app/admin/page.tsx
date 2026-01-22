'use client';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pin, setPin] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const correctPin = '1234'; 

  // State cho chỉnh sửa sản phẩm và số dư
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [amountChange, setAmountChange] = useState<{ [key: string]: string }>({});

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === correctPin) setIsAuthorized(true);
    else { alert('Mã PIN không chính xác!'); setPin(''); }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/register');
      const data: any = await res.json();
      if (Array.isArray(data)) setUsers(data);
    } catch (error) {
      console.error("Lỗi tải dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthorized) fetchUsers();
  }, [isAuthorized]);

  // --- TÍNH NĂNG 1: XÓA KHÁCH HÀNG (KẾT NỐI DB) ---
  const handleDeleteUser = async (id: string) => {
    if (confirm('XÁC NHẬN: Bạn muốn xóa khách hàng này vĩnh viễn?')) {
      try {
        const res = await fetch(`/api/register?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          setUsers(users.filter(u => u.id !== id));
          alert('Đã xóa thành công!');
        }
      } catch (error) {
        alert('Lỗi khi xóa!');
      }
    }
  };

  // --- TÍNH NĂNG 2: CẬP NHẬT SỐ DƯ ---
  const handleUpdateBalance = async (userId: string) => {
    const change = parseFloat(amountChange[userId]);
    if (isNaN(change)) return alert('Vui lòng nhập số tiền hợp lệ');

    try {
      const res = await fetch('/api/register', {
        method: 'PUT',
        body: JSON.stringify({ userId, change }),
      });
      if (res.ok) {
        alert('Đã cập nhật số dư!');
        fetchUsers();
      }
    } catch (error) {
      alert('Lỗi cập nhật!');
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <form onSubmit={handlePinSubmit} className="bg-white border-4 border-black p-8 shadow-[10px_10px_0px_0px_rgba(255,255,255,1)] max-w-sm w-full">
          <h2 className="text-2xl font-black uppercase mb-4 italic text-center">Admin Access</h2>
          <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="****" className="w-full border-2 border-black p-3 text-center text-2xl mb-4 outline-none" autoFocus />
          <button type="submit" className="w-full bg-black text-white py-3 font-black uppercase hover:bg-gray-800 transition-all">Xác thực</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f3f3] font-sans">
      {/* Top Bar */}
      <div className="bg-black text-white p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-black uppercase tracking-tighter italic">ASOS Management Hub</h1>
        <div className="flex gap-4">
          <button onClick={() => setActiveTab('users')} className={`px-4 py-2 text-xs font-bold uppercase ${activeTab === 'users' ? 'bg-white text-black' : 'border border-white'}`}>Khách hàng</button>
          <button onClick={() => setActiveTab('products')} className={`px-4 py-2 text-xs font-bold uppercase ${activeTab === 'products' ? 'bg-white text-black' : 'border border-white'}`}>Sản phẩm</button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 lg:p-10">
        {/* QUẢN LÝ KHÁCH HÀNG & XÓA */}
        {activeTab === 'users' && (
          <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-6 italic underline">User Control</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 uppercase text-[10px] font-bold border-b-2 border-black text-black">
                    <th className="p-3">Email</th>
                    <th className="p-3">Số dư</th>
                    <th className="p-3">Cộng/Trừ</th>
                    <th className="p-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium">
                  {loading ? (
                    <tr><td colSpan={4} className="p-3 text-center italic">Đang tải...</td></tr>
                  ) : users.map((user: any) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-bold">{user.email}</td>
                      <td className="p-3 font-bold text-green-600">${user.balance?.toFixed(2)}</td>
                      <td className="p-3">
                        <input 
                          type="number" 
                          className="border-2 border-black p-1 w-20 outline-none" 
                          placeholder="+/-"
                          onChange={(e) => setAmountChange({...amountChange, [user.id]: e.target.value})}
                        />
                      </td>
                      <td className="p-3 text-right flex justify-end gap-2">
                        <button onClick={() => handleUpdateBalance(user.id)} className="bg-black text-white px-3 py-1 text-[10px] font-bold uppercase hover:bg-green-600">Lưu $</button>
                        <button onClick={() => handleDeleteUser(user.id)} className="bg-red-600 text-white px-3 py-1 text-[10px] font-bold uppercase hover:bg-red-800">Xóa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* QUẢN LÝ & CHỈNH SỬA SẢN PHẨM */}
        {activeTab === 'products' && (
          <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-6 italic underline">Product Inventory</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 border border-dashed border-black">
              <div className="md:col-span-2">
                <label className="text-[10px] font-bold uppercase">Tên sản phẩm:*</label>
                <input type="text" className="w-full border-2 border-gray-200 p-2 outline-none focus:border-black" defaultValue={editingProduct?.name || ''} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase">Giá tiền ($):*</label>
                <input type="number" className="w-full border-2 border-gray-200 p-2 outline-none focus:border-black" defaultValue={editingProduct?.price || ''} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase">Lượt Tym ❤️:*</label>
                <input type="number" className="w-full border-2 border-gray-200 p-2 outline-none focus:border-black" defaultValue={editingProduct?.hearts || ''} />
              </div>
              <button type="submit" className="md:col-span-2 bg-black text-white py-3 font-black uppercase hover:bg-gray-800">
                {editingProduct ? 'Cập nhật sản phẩm' : 'Đăng sản phẩm mới'}
              </button>
              {editingProduct && (
                <button type="button" onClick={() => setEditingProduct(null)} className="md:col-span-2 border-2 border-black py-2 font-bold uppercase text-xs">Hủy</button>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}