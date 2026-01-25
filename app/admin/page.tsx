'use client';
import { useState, useEffect } from 'react';
import Script from 'next/script';
import { supabase } from '@/lib/supabase'; 
import Swal from 'sweetalert2'; 

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [pin, setPin] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const correctPin = '1234'; 

  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [productForm, setProductForm] = useState({
    name: "", price: "", originalPrice: "", images: "", 
    category: "women", tag: "SELLING FAST", sizeFit: "", 
    description: "", details: "" // Thêm description vào form
  });

  const [amountChange, setAmountChange] = useState<{ [key: string]: string }>({});

  const [showMoneyModal, setShowMoneyModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [bonusAmount, setBonusAmount] = useState<number>(0);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    background: '#1e293b',
    color: '#fff'
  });

  const handleCopyProductLink = (id: any) => {
    const productUrl = `${window.location.origin}/product/${id}`;
    navigator.clipboard.writeText(productUrl);
    Toast.fire({ icon: 'success', title: 'Đã sao chép link sản phẩm!' });
  };

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('Order') 
        .select(`*, User:userId ( id, fullName, username, balance )`)
        .or('status.eq.RECYCLE,status.eq.PENDING')
        .order('created_at', { ascending: false }); 
      if (!error && data) setOrders(data);
    } catch (err) { console.error("Lỗi tải đơn hàng:", err); }
  };

  const handleApproveOrder = (order: any) => {
    setSelectedOrder(order);
    setBonusAmount(Number(order.amount || 0));
    setShowMoneyModal(true);
  };

  const confirmFinalApprove = async () => {
    if (!selectedOrder) return;
    try {
      await supabase.from('Order').update({ status: 'SUCCESS' }).eq('id', selectedOrder.id);
      const currentBalance = Number(selectedOrder.User?.balance || 0);
      const newBalance = currentBalance + Number(bonusAmount);

      const res = await fetch('/api/register', {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedOrder.userId, balance: newBalance }),
      });

      if (res.ok) {
        Toast.fire({ icon: 'success', title: 'Đã duyệt & nạp tiền thành công!' });
        setShowMoneyModal(false);
        fetchOrders();
        fetchUsers();
      }
    } catch (err) { Toast.fire({ icon: 'error', title: 'Lỗi xử lý đơn!' }); }
  };

  const handleRejectOrder = async (orderId: string) => {
    const result = await Swal.fire({
      title: 'TỪ CHỐI ĐƠN?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'XÁC NHẬN',
      cancelButtonText: 'QUAY LẠI'
    });
    if (result.isConfirmed) {
      await supabase.from('Order').update({ status: 'REJECTED' }).eq('id', orderId);
      Toast.fire({ icon: 'success', title: 'Đã từ chối đơn.' });
      fetchOrders();
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    const result = await Swal.fire({
      title: 'XÓA VĨNH VIỄN?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'XÓA',
      confirmButtonColor: '#000'
    });
    if (result.isConfirmed) {
      await supabase.from('Order').delete().eq('id', orderId);
      fetchOrders();
    }
  };

  // --- HÀM ĐÃ ĐƯỢC CẬP NHẬT ĐỂ SỬA LỖI ---
  const handleChangePassword = async (userId: string, username: string) => {
    const { value: newPassword } = await Swal.fire({
      title: 'ĐỔI MẬT KHẨU',
      text: `Tài khoản: ${username}`,
      input: 'text',
      inputPlaceholder: 'Nhập mật khẩu mới...',
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonText: 'HỦY',
      confirmButtonText: 'CẬP NHẬT'
    });

    if (newPassword) {
      // Hiển thị trạng thái đang xử lý
      Swal.fire({ 
        title: 'Đang thực hiện...', 
        allowOutsideClick: false, 
        didOpen: () => { Swal.showLoading(); } 
      });

      try {
        const res = await fetch('/api/register', {
          method: 'PUT',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: userId, password: newPassword }),
        });

        if (res.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: `Đã đổi pass cho ${username} thành: ${newPassword}`,
            confirmButtonColor: '#000'
          });
          fetchUsers();
        } else {
          throw new Error();
        }
      } catch (error) {
        Swal.fire('Lỗi', 'Không thể cập nhật mật khẩu qua API!', 'error');
      }
    }
  };

  const handleUpload = () => {
    // @ts-ignore
    const widget = window.cloudinary.createUploadWidget(
      { cloudName: 'dmfaq7hjj', uploadPreset: 'ml_default', sources: ['local', 'url', 'camera'], multiple: true }, 
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          const newImageUrl = result.info.secure_url;
          setProductForm(prev => ({ ...prev, images: prev.images ? `${prev.images}, ${newImageUrl}` : newImageUrl }));
        }
      }
    );
    widget.open();
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === correctPin) setIsAuthorized(true);
    else { Swal.fire({ icon: 'error', title: 'Sai mã PIN!' }); setPin(''); }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/register');
      const data = await res.json();
      if (Array.isArray(data)) setUsers(data);
    } catch (error) { console.error(error); }
    finally { setLoading(false); }
  };

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    if (Array.isArray(data)) setProducts(data);
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchUsers(); fetchProducts(); fetchOrders();
      const channel = supabase.channel('admin-updates').on('postgres_changes', { event: '*', schema: 'public', table: 'Order' }, () => fetchOrders()).subscribe();
      return () => { supabase.removeChannel(channel); };
    }
  }, [isAuthorized]);

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = { ...productForm, price: parseFloat(productForm.price) || 0, originalPrice: parseFloat(productForm.originalPrice) || null };
    const res = await fetch('/api/products', {
      method: editingProduct ? 'PUT' : 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingProduct ? { ...productData, id: editingProduct.id } : productData),
    });
    if (res.ok) { 
        Toast.fire({ icon: 'success', title: 'Thành công!' }); 
        setEditingProduct(null); 
        setProductForm({ name: "", price: "", originalPrice: "", images: "", category: "women", tag: "SELLING FAST", sizeFit: "", description: "", details: "" });
        fetchProducts(); 
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (confirm('Xóa sản phẩm này?')) {
      await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      fetchProducts();
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (confirm('Xóa khách hàng này?')) {
      await fetch(`/api/register?id=${id}`, { method: 'DELETE' });
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleUpdateBalance = async (userId: string) => {
    const changeAmount = parseFloat(amountChange[userId]);
    if (isNaN(changeAmount)) return;
    const user = users.find(u => u.id === userId);
    const newBalance = (user?.balance || 0) + changeAmount;
    const res = await fetch('/api/register', {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId, balance: newBalance }),
    });
    if (res.ok) { fetchUsers(); setAmountChange({ ...amountChange, [userId]: "" }); Swal.fire('Đã nạp!', `$${newBalance}`, 'success'); }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-black flex items-start justify-center p-6 pt-20">
        <form onSubmit={handlePinSubmit} className="bg-white border-4 border-black p-8 shadow-[10px_10px_0px_0px_rgba(255,255,255,1)] max-w-sm w-full">
          <h2 className="text-2xl font-black uppercase mb-4 italic text-center">Admin Access</h2>
          <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="****" className="w-full border-2 border-black p-3 text-center text-2xl mb-4 outline-none" autoFocus />
          <button type="submit" className="w-full bg-black text-white py-3 font-black uppercase hover:bg-gray-800 transition-all">Xác thực</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f3f3] font-sans text-black">
      <Script src="https://upload-widget.cloudinary.com/global/all.js" strategy="afterInteractive" />
      
      <div className="bg-black text-white p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-black uppercase tracking-tighter italic">NEWEGG Hub</h1>
        <div className="flex gap-4">
          <button onClick={() => setActiveTab('users')} className={`px-4 py-2 text-xs font-bold uppercase ${activeTab === 'users' ? 'bg-white text-black' : 'border'}`}>Khách hàng</button>
          <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 text-xs font-bold uppercase ${activeTab === 'orders' ? 'bg-white text-black' : 'border'}`}>Đơn hàng</button>
          <button onClick={() => setActiveTab('products')} className={`px-4 py-2 text-xs font-bold uppercase ${activeTab === 'products' ? 'bg-white text-black' : 'border'}`}>Sản phẩm</button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 lg:p-10">
        {activeTab === 'users' && (
          <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-6 italic underline">User Control</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-100 uppercase text-[10px] font-bold border-b-2 border-black">
                    <th className="p-3">User/Pass</th>
                    <th className="p-3">Số dư</th>
                    <th className="p-3">Nạp/Trừ ($)</th>
                    <th className="p-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {users.map((user: any) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="font-black text-blue-600 uppercase">{user.fullName}</div>
                        <div className="text-[10px] text-gray-500 italic">@{user.username} | Pass: {user.password}</div>
                      </td>
                      <td className="p-3 font-black text-green-600">${(user.balance || 0).toFixed(2)}</td>
                      <td className="p-3">
                        <input type="number" className="border-2 border-black p-1 w-20 outline-none" value={amountChange[user.id] || ""} onChange={(e) => setAmountChange({...amountChange, [user.id]: e.target.value})} />
                      </td>
                      <td className="p-3 text-right flex justify-end gap-2 mt-2">
                        <button onClick={() => handleUpdateBalance(user.id)} className="bg-black text-white px-2 py-1 text-[9px] font-bold uppercase">Lưu $</button>
                        <button onClick={() => handleChangePassword(user.id, user.username)} className="bg-yellow-400 border border-black px-2 py-1 text-[9px] font-bold uppercase">Đổi Pass</button>
                        <button onClick={() => handleDeleteUser(user.id)} className="bg-red-600 text-white px-2 py-1 text-[9px] font-bold uppercase">Xóa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-6 italic underline">Duyệt Đơn Hàng</h2>
            <div className="grid grid-cols-1 gap-4">
              {orders.map((order) => (
                <div key={order.id} className="border-2 border-black p-4 flex flex-col md:flex-row gap-4 items-center bg-gray-50">
                  <img src={order.image_url && order.image_url !== 'EMPTY' ? order.image_url : 'https://via.placeholder.com/150'} className="w-16 h-20 object-cover border border-black flex-shrink-0" alt="prod" />
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-blue-600 uppercase">Khách: {order.User?.username}</div>
                    <div className="text-sm font-black uppercase leading-tight">{order.product_name}</div>
                    <div className="text-lg font-black text-red-600">${order.amount}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleApproveOrder(order)} className="bg-green-500 text-white px-4 py-2 text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Duyệt</button>
                    <button onClick={() => handleRejectOrder(order.id)} className="bg-white border-2 border-black px-4 py-2 text-[10px] font-black uppercase">Từ chối</button>
                    <button onClick={() => handleDeleteOrder(order.id)} className="bg-red-600 text-white px-4 py-2 text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Xóa</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-10">
            <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-2xl font-black uppercase mb-6 italic underline">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <form onSubmit={handleProductSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 border border-dashed border-black">
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold uppercase">Tên sản phẩm:*</label>
                    <input type="text" className="w-full border-2 border-black p-2 outline-none" value={productForm.name} onChange={(e) => setProductForm({...productForm, name: e.target.value})} required />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase">Giá Sale ($):*</label>
                    <input type="text" className="w-full border-2 border-black p-2 outline-none" value={productForm.price} onChange={(e) => setProductForm({...productForm, price: e.target.value})} required />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase">Giá Gốc ($):</label>
                    <input type="text" className="w-full border-2 border-black p-2 outline-none" value={productForm.originalPrice} onChange={(e) => setProductForm({...productForm, originalPrice: e.target.value})} />
                  </div>

                  {/* THÊM 2 Ô MÔ TẢ MỚI */}
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold uppercase text-blue-600">Mô tả ngắn (Description):</label>
                    <input type="text" className="w-full border-2 border-black p-2 outline-none" value={productForm.description} onChange={(e) => setProductForm({...productForm, description: e.target.value})} placeholder="VD: Bảo hành 12 tháng, giao hàng nhanh..." />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold uppercase text-red-600">Chi tiết sản phẩm (Details):</label>
                    <textarea className="w-full border-2 border-black p-2 outline-none h-24 text-xs" value={productForm.details} onChange={(e) => setProductForm({...productForm, details: e.target.value})} placeholder="Nhập chi tiết thông số kỹ thuật..." />
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex justify-between items-end mb-1">
                      <label className="text-[10px] font-bold uppercase text-blue-600">Hình ảnh (Cloudinary):*</label>
                      <button type="button" onClick={handleUpload} className="bg-blue-600 text-white text-[9px] px-2 py-1 font-bold uppercase rounded">+ Tải ảnh</button>
                    </div>
                    <textarea className="w-full border-2 border-black p-2 outline-none h-20 text-xs" value={productForm.images} onChange={(e) => setProductForm({...productForm, images: e.target.value})} required />
                  </div>
                  <button type="submit" className="md:col-span-2 bg-black text-white py-3 font-black uppercase hover:bg-gray-800 transition-all">
                    {editingProduct ? 'Cập nhật' : 'Đăng ngay'}
                  </button>
                </form>
            </div>

            <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-xl font-black uppercase mb-4 italic">Inventory</h2>
              <div className="grid grid-cols-1 gap-6">
                {products.map((p) => (
                  <div key={p.id} className="border-2 border-black p-4 bg-white flex flex-col md:flex-row gap-4">
                    <img src={p.images?.split(',')[0]} className="w-24 aspect-[3/4] object-cover border border-black" alt={p.name} />
                    <div className="flex-1">
                        <p className="text-sm font-black uppercase underline">{p.name}</p>
                        <p className="text-xs font-bold text-red-600">${p.price}</p>
                    </div>
                    <div className="flex md:flex-col gap-2">
                        <button onClick={() => handleCopyProductLink(p.id)} className="bg-blue-600 text-white text-[10px] px-4 py-2 font-bold uppercase">Link</button>
                        <button onClick={() => { setEditingProduct(p); setProductForm(p); }} className="bg-black text-white text-[10px] px-4 py-2 font-bold uppercase">Sửa</button>
                        <button onClick={() => handleDeleteProduct(p.id)} className="bg-red-600 text-white text-[10px] px-4 py-2 font-bold uppercase">Xóa</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {showMoneyModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm border-[4px] border-black p-8 shadow-[15px_15px_0px_0px_rgba(0,0,0,0.2)]">
            <h3 className="text-lg font-black uppercase mb-4 text-center italic underline">Xác nhận nạp tiền</h3>
            <p className="text-center text-[10px] font-bold text-gray-400 mb-6 uppercase">User: {selectedOrder?.User?.username}</p>
            <input 
              type="number"
              value={bonusAmount}
              onChange={(e) => setBonusAmount(Number(e.target.value))}
              className="w-full border-4 border-black p-4 text-4xl font-black text-green-600 text-center outline-none bg-gray-50 focus:bg-white"
              autoFocus
            />
            <div className="flex gap-4 mt-8">
              <button onClick={confirmFinalApprove} className="flex-1 bg-black text-white font-black py-4 uppercase text-xs hover:bg-green-600">Duyệt & Nạp</button>
              <button onClick={() => setShowMoneyModal(false)} className="flex-1 bg-gray-200 text-black font-black py-4 uppercase text-xs">Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}