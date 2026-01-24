"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase"; // Import kết nối Supabase của bạn

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [showRecycleModal, setShowRecycleModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu THẬT từ Supabase thay vì mockOrders
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setOrders(data);
      }
      setLoading(false);
    };

    fetchOrders();

    // Lắng nghe Realtime: Nếu Admin duyệt đơn, trang này tự cập nhật trạng thái mới
    const channel = supabase
      .channel("orders_realtime")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "orders" }, 
      (payload) => {
        setOrders(current => current.map(order => 
          order.id === payload.new.id ? { ...order, status: payload.new.status } : order
        ));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Xử lý khi nhấn nút Tái chế (Mở Modal hình 2) - Giữ nguyên logic UI
  const openRecycleModal = (id: string) => {
    setSelectedOrderId(id);
    setShowRecycleModal(true);
  };

  // Xử lý khi xác nhận Tái chế (Chuyển sang hình 3 và đẩy lên Supabase)
  const confirmRecycle = async () => {
    if (!selectedOrderId) return;

    // Cập nhật lên Database để Admin nhận được dữ liệu
    const { error } = await supabase
      .from("orders")
      .update({ status: "pending" })
      .eq("id", selectedOrderId);

    if (!error) {
      // Cập nhật UI tại chỗ cho khách hàng thấy trạng thái "pending"
      setOrders(orders.map(order => 
        order.id === selectedOrderId ? { ...order, status: "pending" } : order
      ));
      setShowRecycleModal(false);
      setSelectedOrderId(null);
    } else {
      console.error("Lỗi cập nhật:", error.message);
    }
  };

  // Logic lọc đơn hàng cho các Tab - Giữ nguyên
  const filteredOrders = orders.filter(order => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  if (loading) return <div className="min-h-screen bg-[#1a1f2e] text-zinc-500 p-10 italic">Đang tải...</div>;

  return (
    <div className="min-h-screen bg-[#1a1f2e] text-white font-sans">
      {/* Breadcrumb - Giữ nguyên 100% */}
      <div className="p-4 flex items-center gap-2 text-zinc-400 text-sm border-b border-zinc-800">
        <Link href="/" className="flex items-center gap-1 hover:text-white">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
          Trang chủ
        </Link>
        <span>&gt;</span>
        <span className="text-zinc-500">Danh sách đơn hàng</span>
      </div>

      <div className="p-4 max-w-2xl mx-auto">
        <h1 className="text-xl font-bold mb-6">Danh sách đơn hàng</h1>

        {/* Search Bar - Giữ nguyên 100% */}
        <div className="relative mb-6">
          <input 
            type="text" 
            placeholder="Search order no" 
            className="w-full bg-[#2a303f] border border-zinc-700 rounded-md py-3 px-4 outline-none text-zinc-300"
          />
        </div>

        {/* Tabs Filter - Giữ nguyên UI, cập nhật số lượng thật */}
        <div className="flex gap-4 mb-8">
          <button onClick={() => setFilter("all")} className={`flex-1 p-3 rounded-lg border ${filter === 'all' ? 'border-zinc-500 bg-[#2a303f]' : 'border-zinc-800 bg-[#242936]'} text-left`}>
            <div className="text-[12px] font-bold">All</div>
            <div className="text-[11px] text-zinc-500">Orders: {orders.length}</div>
          </button>
          <button onClick={() => setFilter("created")} className={`flex-1 p-3 rounded-lg border ${filter === 'created' ? 'border-zinc-500 bg-[#2a303f]' : 'border-zinc-800 bg-[#242936]'} text-left`}>
            <div className="text-[12px] font-bold">created</div>
            <div className="text-[11px] text-zinc-500">Orders: {orders.filter(o => o.status === 'created').length}</div>
          </button>
          <button onClick={() => setFilter("pending")} className={`flex-1 p-3 rounded-lg border ${filter === 'pending' ? 'border-zinc-500 bg-[#2a303f]' : 'border-zinc-800 bg-[#242936]'} text-left`}>
            <div className="text-[12px] font-bold uppercase">pending</div>
            <div className="text-[11px] text-zinc-500">Orders: {orders.filter(o => o.status === 'pending').length}</div>
          </button>
        </div>

        {/* Order List - Ánh xạ từ các cột Supabase (product_name, total_price, image_url) */}
        <div className="space-y-4">
          {filteredOrders.map((order, idx) => (
            <div key={order.id} className="bg-[#1f2535] border-b border-zinc-800 pb-4">
              <div className="flex justify-between items-center mb-4">
                <div className="text-[13px]">
                  <span className="text-zinc-400 font-medium">{new Date(order.created_at).toLocaleDateString()}</span>
                  <span className="ml-2 text-blue-400">{order.id}</span>
                </div>
                {/* Status Badge - Giữ nguyên logic màu sắc */}
                <span className={`px-3 py-1 rounded text-[11px] uppercase font-bold border ${
                  order.status === 'created' ? 'text-blue-400 border-blue-900 bg-blue-900/20' : 
                  order.status === 'success' ? 'text-green-400 border-green-900 bg-green-900/20' : 
                  'text-yellow-500 border-yellow-900 bg-yellow-900/20'
                }`}>
                  {order.status}
                </span>
              </div>

              <div className="flex gap-4 mb-4">
                <img src={order.image_url} className="w-16 h-16 rounded-lg object-cover bg-white" alt="" />
                <p className="text-[13px] leading-tight text-zinc-300">{order.product_name}</p>
              </div>

              <div className="flex justify-between items-center border-t border-zinc-800/50 pt-4">
                <div className="text-[15px] font-bold italic">Total: ${Number(order.total_price).toFixed(2)}</div>
                <div className="flex gap-2">
                  <button className="bg-[#d01345] text-white px-4 py-2 rounded-md text-[13px] font-bold flex items-center gap-1 opacity-50 cursor-not-allowed">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                    Hủy
                  </button>
                  {order.status === 'created' && (
                    <button 
                      onClick={() => openRecycleModal(order.id)}
                      className="bg-[#f2a100] text-white px-4 py-2 rounded-md text-[13px] font-bold flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                      Tái chế
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL TÁI CHẾ (Hình 2) - Giữ nguyên thiết kế UI */}
      {showRecycleModal && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="w-full max-sm bg-[#242936] rounded-xl overflow-hidden">
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
              <span className="text-zinc-400 text-sm font-bold uppercase">ĐƠN HÀNG TÁI CHẾ</span>
              <button onClick={() => setShowRecycleModal(false)} className="text-zinc-500 hover:text-white">✕</button>
            </div>
            <div className="p-8 text-center">
              <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                <span className="text-2xl font-bold">!</span>
              </div>
              <p className="text-zinc-300 text-[15px] font-medium leading-relaxed mb-8">
                Bạn có chắc chắn muốn yêu cầu tái chế đơn hàng này không?
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={confirmRecycle}
                  className="flex-1 bg-[#d01345] text-white py-3 rounded-lg font-bold text-sm active:scale-95 transition-all"
                >
                  Vâng, tôi chắc chắn
                </button>
                <button 
                  onClick={() => setShowRecycleModal(false)}
                  className="flex-1 bg-[#343a4a] text-zinc-300 py-3 rounded-lg font-bold text-sm"
                >
                  Không, hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}