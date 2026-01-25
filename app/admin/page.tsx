'use client';
import { useState, useEffect } from 'react';
import Script from 'next/script';
import { supabase } from '@/lib/supabase'; 
import Swal from 'sweetalert2'; // THÊM THƯ VIỆN THÔNG BÁO

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
    category: "women", tag: "SELLING FAST", sizeFit: "", details: ""  
  });

  const [amountChange, setAmountChange] = useState<{ [key: string]: string }>({});

  // Cấu hình Toast mặc định cho đẹp
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    background: '#1e293b',
    color: '#fff'
  });

  // --- HÀM SAO CHÉP LINK SẢN PHẨM MỚI THÊM ---
  const handleCopyProductLink = (id: any) => {
    const productUrl = `${window.location.origin}/product/${id}`;
    navigator.clipboard.writeText(productUrl);
    Toast.fire({
      icon: 'success',
      title: 'Đã sao chép link sản phẩm!'
    });
  };

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('Order') 
        .select(`
          *,
          User:userId ( fullName, username, balance )
        `)
        .or('status.eq.RECYCLE,status.eq.PENDING')
        .order('created_at', { ascending: false }); 
      
      if (!error && data) {
        setOrders(data);
      }
      else if (error) console.error("Lỗi truy vấn Supabase:", error.message);
    } catch (err) { console.error("Lỗi tải đơn hàng:", err); }
  };

  const handleApproveOrder = async (orderId: string) => {
    const result = await Swal.fire({
      title: 'XÁC NHẬN DUYỆT?',
      text: "Bạn cần cộng tiền thủ công bên tab Khách hàng sau khi duyệt.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ĐỒNG Ý DUYỆT',
      cancelButtonText: 'HỦY'
    });

    if (result.isConfirmed) {
      try {
        const { error } = await supabase
          .from('Order')
          .update({ status: 'SUCCESS' }) 
          .eq('id', orderId);

        if (error) throw error;
        Toast.fire({ icon: 'success', title: 'Đã duyệt đơn thành công!' });
        fetchOrders(); 
      } catch (err) { Toast.fire({ icon: 'error', title: 'Lỗi khi duyệt đơn!' }); }
    }
  };

  const handleRejectOrder = async (orderId: string) => {
    const result = await Swal.fire({
      title: 'TỪ CHỐI ĐƠN?',
      text: "Đơn hàng này sẽ chuyển sang trạng thái REJECTED.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'XÁC NHẬN TỪ CHỐI',
      cancelButtonText: 'QUAY LẠI'
    });

    if (result.isConfirmed) {
      try {
        const { error } = await supabase
          .from('Order')
          .update({ status: 'REJECTED' })
          .eq('id', orderId);
        if (error) throw error;
        Toast.fire({ icon: 'success', title: 'Đã từ chối đơn hàng.' });
        fetchOrders();
      } catch (err) { Toast.fire({ icon: 'error', title: 'Lỗi xử lý!' }); }
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    const result = await Swal.fire({
      title: 'CẢNH BÁO XÓA!',
      text: "Dữ liệu đơn hàng sẽ bị mất vĩnh viễn!",
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#000',
      confirmButtonText: 'XÓA VĨNH VIỄN',
      cancelButtonText: 'HỦY'
    });

    if (result.isConfirmed) {
      try {
        const { error } = await supabase.from('Order').delete().eq('id', orderId);
        if (error) throw error;
        Toast.fire({ icon: 'success', title: 'Đã xóa đơn hàng!' });
        fetchOrders();
      } catch (err) { Toast.fire({ icon: 'error', title: 'Lỗi khi xóa!' }); }
    }
  };

  const handleUpload = () => {
    // @ts-ignore
    const widget = window.cloudinary.createUploadWidget(
      { 
        cloudName: 'dmfaq7hjj', 
        uploadPreset: 'ml_default', 
        sources: ['local', 'url', 'camera'],
        multiple: true 
      }, 
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          const newImageUrl = result.info.secure_url;
          setProductForm(prev => ({
            ...prev,
            images: prev.images ? `${prev.images}, ${newImageUrl}` : newImageUrl
          }));
        }
      }
    );
    widget.open();
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === correctPin) {
      setIsAuthorized(true);
    } else { 
      Swal.fire({ icon: 'error', title: 'Sai mã PIN!', text: 'Vui lòng kiểm tra lại.', confirmButtonColor: '#000' });
      setPin(''); 
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/register');
      const data: any = await res.json();
      if (Array.isArray(data)) setUsers(data);
    } catch (error) { console.error("Lỗi tải dữ liệu:", error); }
    finally { setLoading(false); }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (Array.isArray(data)) setProducts(data);
    } catch (error) { console.error("Lỗi tải sản phẩm:", error); }
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchUsers();
      fetchProducts();
      fetchOrders(); 

      const channel = supabase
        .channel('admin-order-updates')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'Order' },
          () => { fetchOrders(); }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [isAuthorized]);

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingProduct ? 'PUT' : 'POST';
    const productData = {
      name: productForm.name,
      price: parseFloat(productForm.price) || 0,
      originalPrice: productForm.originalPrice ? parseFloat(productForm.originalPrice) : null,
      images: productForm.images,
      category: productForm.category,
      tag: productForm.tag,
      sizeFit: productForm.sizeFit,
      details: productForm.details,
    };
    const payload = editingProduct ? { ...productData, id: editingProduct.id } : productData;
    try {
      const res = await fetch('/api/products', {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        Toast.fire({ icon: 'success', title: editingProduct ? 'Đã cập nhật!' : 'Đã đăng sản phẩm!' });
        setEditingProduct(null);
        setProductForm({ name: "", price: "", originalPrice: "", images: "", category: "women", tag: "SELLING FAST", sizeFit: "", details: "" });
        fetchProducts();
      } else {
        const errorData = await res.json();
        Swal.fire('Lỗi', errorData.error || 'Thao tác thất bại', 'error');
      }
    } catch (error) { Toast.fire({ icon: 'error', title: 'Lỗi kết nối!' }); }
  };

  const handleDeleteProduct = async (id: number) => {
    const result = await Swal.fire({
      title: 'XÓA SẢN PHẨM?',
      text: "Hành động này không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'XÓA NGAY',
      confirmButtonColor: '#000'
    });

    if (result.isConfirmed) {
      await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      Toast.fire({ icon: 'success', title: 'Đã xóa sản phẩm.' });
      fetchProducts();
    }
  };

  const handleDeleteUser = async (id: string) => {
    const result = await Swal.fire({
      title: 'XÓA KHÁCH HÀNG?',
      text: "Xác nhận xóa tài khoản này vĩnh viễn khỏi hệ thống?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'XÓA VĨNH VIỄN',
      confirmButtonColor: '#d33'
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/register?id=${id}`, { method: 'DELETE' });
        if (res.ok) { 
          setUsers(users.filter(u => u.id !== id)); 
          Toast.fire({ icon: 'success', title: 'Đã xóa khách hàng.' });
        }
      } catch (error) { Toast.fire({ icon: 'error', title: 'Lỗi khi xóa!' }); }
    }
  };

  const handleUpdateBalance = async (userId: string) => {
    const changeAmount = parseFloat(amountChange[userId]);
    if (isNaN(changeAmount)) return Toast.fire({ icon: 'warning', title: 'Nhập số tiền hợp lệ!' });
    
    const user = users.find(u => u.id === userId);
    const currentBalance = user?.balance || 0;
    const newBalance = currentBalance + changeAmount;
    
    try {
      const res = await fetch('/api/register', {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, balance: newBalance }),
      });
      if (res.ok) { 
        Swal.fire({
          icon: 'success',
          title: 'CẬP NHẬT XONG!',
          text: `Số dư mới: $${newBalance.toFixed(2)}`,
          confirmButtonColor: '#000'
        });
        setAmountChange({ ...amountChange, [userId]: "" }); 
        fetchUsers(); 
      } else { Toast.fire({ icon: 'error', title: 'Lỗi cập nhật!' }); }
    } catch (error) { Toast.fire({ icon: 'error', title: 'Lỗi server!' }); }
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
        <h1 className="text-2xl font-black uppercase tracking-tighter italic">NEWEGG Management Hub</h1>
        <div className="flex gap-4">
          <button onClick={() => setActiveTab('users')} className={`px-4 py-2 text-xs font-bold uppercase ${activeTab === 'users' ? 'bg-white text-black' : 'border border-white'}`}>Khách hàng</button>
          <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 text-xs font-bold uppercase ${activeTab === 'orders' ? 'bg-white text-black' : 'border border-white'}`}>Đơn hàng</button>
          <button onClick={() => setActiveTab('products')} className={`px-4 py-2 text-xs font-bold uppercase ${activeTab === 'products' ? 'bg-white text-black' : 'border border-white'}`}>Sản phẩm</button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 lg:p-10">
        {activeTab === 'users' && (
          <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-6 italic underline">User Control</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 uppercase text-[10px] font-bold border-b-2 border-black text-black">
                    <th className="p-3">Họ Tên / Username</th>
                    <th className="p-3">Quốc Gia</th>
                    <th className="p-3">Số dư (Hiện tại)</th>
                    <th className="p-3">Nạp/Trừ ($)</th>
                    <th className="p-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium">
                  {loading ? (
                    <tr><td colSpan={5} className="p-3 text-center italic">Đang tải...</td></tr>
                  ) : users.map((user: any) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50 text-black">
                      <td className="p-3">
                        <div className="font-black uppercase text-blue-600">{user.fullName || "Tên chưa cập nhật"}</div>
                        <div className="text-[11px] text-gray-500 font-bold italic">@{user.username}</div>
                      </td>
                      <td className="p-3 uppercase text-[11px]">{user.country || "VN"}</td>
                      <td className="p-3 font-black text-green-600 font-mono">${(user.balance || 0).toFixed(2)}</td>
                      <td className="p-3">
                        <input type="number" className="border-2 border-black p-1 w-24 outline-none font-bold" placeholder="+/-" value={amountChange[user.id] || ""} onChange={(e) => setAmountChange({...amountChange, [user.id]: e.target.value})} />
                      </td>
                      <td className="p-3 text-right flex justify-end gap-2">
                        <button onClick={() => handleUpdateBalance(user.id)} className="bg-black text-white px-3 py-1 text-[10px] font-bold uppercase hover:bg-blue-600">Lưu $</button>
                        <button onClick={() => handleDeleteUser(user.id)} className="bg-red-600 text-white px-3 py-1 text-[10px] font-bold uppercase">Xóa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-black">
            <h2 className="text-2xl font-black uppercase mb-6 italic underline">Duyệt Đơn Hàng</h2>
            <div className="grid grid-cols-1 gap-4">
              {orders.length === 0 ? (
                <p className="italic text-gray-400 text-center py-10">Không có đơn hàng nào cần duyệt.</p>
              ) : orders.map((order) => (
                <div key={order.id} className="border-2 border-black p-4 flex flex-col md:flex-row justify-between items-center bg-gray-50 hover:bg-white transition-all">
                  <div className="flex gap-4 items-center w-full">
                    <div>
                      <div className="text-[10px] font-bold text-blue-600 uppercase">
                        KHÁCH: {order.User?.fullName || 'N/A'} (@{order.User?.username || 'unknown'})
                      </div>
                      <div className="text-sm font-black uppercase leading-tight">{order.product_name || 'Đơn dịch vụ'}</div>
                      <div className="text-[10px] text-gray-400 font-mono">Đặt lúc: {order.created_at}</div>
                      <div className="text-lg font-mono font-black text-red-600 italic">Giá trị: ${order.amount || 0}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 md:mt-0 w-full md:w-auto">
                    <div className={`px-3 py-1 text-[10px] font-black uppercase border-2 border-black ${order.status === 'RECYCLE' ? 'bg-yellow-400' : 'bg-orange-400'}`}>
                      {order.status}
                    </div>
                    <button 
                      onClick={() => handleApproveOrder(order.id)}
                      className="bg-green-500 text-white px-4 py-2 text-[10px] font-black uppercase hover:bg-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      Duyệt
                    </button>
                    <button 
                      onClick={() => handleRejectOrder(order.id)}
                      className="bg-white text-black border-2 border-black px-4 py-2 text-[10px] font-black uppercase hover:bg-gray-200"
                    >
                      Từ chối
                    </button>
                    <button 
                      onClick={() => handleDeleteOrder(order.id)}
                      className="bg-red-600 text-white px-4 py-2 text-[10px] font-black uppercase hover:bg-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      Xóa
                    </button>
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
                  <div className="md:col-span-2">
                    <div className="flex justify-between items-end mb-1">
                      <label className="text-[10px] font-bold uppercase text-blue-600">Hình ảnh sản phẩm (Nhiều ảnh):*</label>
                      <button type="button" onClick={handleUpload} className="bg-blue-600 text-white text-[9px] px-2 py-1 font-bold uppercase rounded">+ Tải ảnh từ máy</button>
                    </div>
                    <textarea className="w-full border-2 border-black p-2 outline-none h-20 text-xs" value={productForm.images} onChange={(e) => setProductForm({...productForm, images: e.target.value})} placeholder="Link ảnh..." required />
                  </div>
                  <div className="md:col-span-2 grid grid-cols-2 gap-4">
                      <div>
                          <label className="text-[10px] font-bold uppercase italic">Size & Fit (Mô tả):</label>
                          <textarea className="w-full border-2 border-gray-300 p-2 outline-none" value={productForm.sizeFit} onChange={(e) => setProductForm({...productForm, sizeFit: e.target.value})} />
                      </div>
                      <div>
                          <label className="text-[10px] font-bold uppercase italic">Product Details (Vải/Mô tả):</label>
                          <textarea className="w-full border-2 border-gray-300 p-2 outline-none" value={productForm.details} onChange={(e) => setProductForm({...productForm, details: e.target.value})} />
                      </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase">Danh mục:*</label>
                    <select className="w-full border-2 border-black p-2 outline-none font-bold" value={productForm.category} onChange={(e) => setProductForm({...productForm, category: e.target.value})}>
                      <option value="women">Nữ (Women)</option>
                      <option value="men">Nam (Men)</option>
                    </select>
                  </div>
                  <button type="submit" className="md:col-span-2 bg-black text-white py-3 font-black uppercase hover:bg-gray-800 transition-all">
                    {editingProduct ? 'Cập nhật sản phẩm' : 'Đăng sản phẩm ngay'}
                  </button>
               </form>
            </div>

            <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-xl font-black uppercase mb-4 italic">Inventory</h2>
              <div className="grid grid-cols-1 gap-6">
                {products.map((p) => (
                  <div key={p.id} className="border-2 border-black p-4 bg-white flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-32 flex-shrink-0">
                        <img src={p.images?.split(',')[0]} className="w-full aspect-[3/4] object-cover border border-black" alt={p.name} />
                    </div>
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-black uppercase underline">{p.name}</p>
                        <p className="text-xs font-bold text-red-600">{p.price} <span className="text-gray-400 line-through ml-2">{p.originalPrice}</span></p>
                        <p className="text-[10px] text-gray-500 italic">Category: {p.category}</p>
                    </div>
                    <div className="flex md:flex-col gap-2 justify-center">
                        {/* NÚT SAO CHÉP MỚI */}
                        <button onClick={() => handleCopyProductLink(p.id)} className="bg-blue-600 text-white text-[10px] px-4 py-2 font-bold uppercase hover:bg-black transition-all">CHÉP LINK</button>
                        
                        <button onClick={() => { setEditingProduct(p); setProductForm(p); }} className="bg-black text-white text-[10px] px-4 py-2 font-bold uppercase">SỬA</button>
                        <button onClick={() => handleDeleteProduct(p.id)} className="bg-red-600 text-white text-[10px] px-4 py-2 font-bold uppercase">XÓA</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}