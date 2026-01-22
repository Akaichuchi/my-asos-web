'use client';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // --- PHẦN CÀI ĐẶT MÃ PIN ---
  const [pin, setPin] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const correctPin = '1234'; // <--- THAY ĐỔI MÃ PIN CỦA BẠN TẠI ĐÂY

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === correctPin) {
      setIsAuthorized(true);
    } else {
      alert('Mã PIN không chính xác!');
      setPin('');
    }
  };

  useEffect(() => {
    if (!isAuthorized) return;
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/register');
        const data: any = await res.json();
        if (Array.isArray(data)) {
          setUsers(data);
        }
      } catch (error) {
        console.error("Lỗi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [isAuthorized]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <form onSubmit={handlePinSubmit} className="bg-white border-4 border-black p-8 shadow-[10px_10px_0px_0px_rgba(255,255,255,1)] max-w-sm w-full">
          <h2 className="text-2xl font-black uppercase mb-4 italic text-center">Admin Access</h2>
          <input 
            type="password" 
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="MÃ PIN"
            className="w-full border-2 border-black p-3 text-center text-2xl outline-none mb-4"
            autoFocus
          />
          <button type="submit" className="w-full bg-black text-white py-3 font-black uppercase hover:bg-gray-800 transition-all">Vào hệ thống</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f3f3] font-sans">
      {/* Top Bar ASOS Hub */}
      <div className="bg-black text-white p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-black uppercase tracking-tighter italic">ASOS Management Hub</h1>
        <div className="flex gap-4">
          <button onClick={() => setActiveTab('users')} className={`px-4 py-2 text-xs font-bold uppercase ${activeTab === 'users' ? 'bg-white text-black' : 'border border-white'}`}>Khách hàng</button>
          <button onClick={() => setActiveTab('products')} className={`px-4 py-2 text-xs font-bold uppercase ${activeTab === 'products' ? 'bg-white text-black' : 'border border-white'}`}>Sản phẩm</button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 lg:p-10">
        {activeTab === 'users' && (
          <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-6 italic underline text-black">User Control</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 uppercase text-[10px] font-bold border-b-2 border-black">
                    <th className="p-3">Email</th>
                    <th className="p-3 text-right">Số dư ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={2} className="p-3 text-center italic">Đang tải...</td></tr>
                  ) : users.map((user: any) => (
                    <tr key={user.id} className="border-b">
                      <td className="p-3 font-bold">{user.email}</td>
                      <td className="p-3 font-bold text-green-600 text-right">${user.balance?.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* Tab Sản phẩm vẫn giữ nguyên bên dưới */}
      </div>
    </div>
  );
}