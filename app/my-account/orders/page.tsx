"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase"; 

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [showRecycleModal, setShowRecycleModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const storedUserId = localStorage.getItem("userId");
      const userId = storedUserId ? Number(storedUserId) : 10; 

      const { data, error } = await supabase
        .from("Order") 
        .select("*")
        .eq("userId", userId) 
        .order("createdAt", { ascending: false });

      if (!error && data) {
        setOrders(data);
      }
      setLoading(false);
    };

    fetchOrders();

    const channel = supabase
      .channel("orders_realtime")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "Order" }, 
      (payload) => {
        setOrders(current => current.map(order => 
          order.id === payload.new.id ? { ...order, ...payload.new } : order
        ));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const openRecycleModal = (id: any) => {
    setSelectedOrderId(id);
    setShowRecycleModal(true);
  };

  const confirmRecycle = async () => {
    if (!selectedOrderId) return;

    // CẬP NHẬT: Thêm is_recycled: true để hệ thống ghi nhận
    const { error } = await supabase
      .from("Order")
      .update({ 
        status: "RECYCLE",
        is_recycled: true 
      }) 
      .eq("id", selectedOrderId);

    if (!error) {
      setOrders(orders.map(order => 
        order.id === selectedOrderId ? { ...order, status: "RECYCLE", is_recycled: true } : order
      ));
      setShowRecycleModal(false);
      setSelectedOrderId(null);
    } else {
      alert("Lỗi cập nhật: " + error.message);
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === "all") return true;
    return order.status?.toUpperCase() === filter.toUpperCase();
  });

  if (loading) return <div className="min-h-screen bg-[#1a1f2e] text-zinc-500 p-10 italic text-center">Đang tải danh sách đơn hàng...</div>;

  return (
    <div className="min-h-screen bg-[#1a1f2e] text-white font-sans">
      <div className="p-4 max-w-2xl mx-auto">
        <h1 className="text-xl font-bold mb-6 mt-4">Danh sách đơn hàng</h1>

        <div className="relative mb-6">
          <input 
            type="text" 
            placeholder="Search order no" 
            className="w-full bg-[#2a303f] border border-zinc-700 rounded-md py-3 px-4 outline-none text-zinc-300"
          />
        </div>

        <div className="flex gap-4 mb-8">
          <button onClick={() => setFilter("all")} className={`flex-1 p-3 rounded-lg border ${filter === 'all' ? 'border-zinc-500 bg-[#2a303f]' : 'border-zinc-800 bg-[#242936]'} text-left`}>
            <div className="text-[12px] font-bold">All</div>
            <div className="text-[11px] text-zinc-500">Orders: {orders.length}</div>
          </button>
          <button onClick={() => setFilter("SUCCESS")} className={`flex-1 p-3 rounded-lg border ${filter === 'SUCCESS' ? 'border-zinc-500 bg-[#2a303f]' : 'border-zinc-800 bg-[#242936]'} text-left`}>
            <div className="text-[12px] font-bold">SUCCESS</div>
            <div className="text-[11px] text-zinc-500">Orders: {orders.filter(o => o.status === 'SUCCESS').length}</div>
          </button>
          <button onClick={() => setFilter("PENDING")} className={`flex-1 p-3 rounded-lg border ${filter === 'PENDING' ? 'border-zinc-500 bg-[#2a303f]' : 'border-zinc-800 bg-[#242936]'} text-left`}>
            <div className="text-[12px] font-bold uppercase">PENDING</div>
            <div className="text-[11px] text-zinc-500">Orders: {orders.filter(o => o.status === 'PENDING').length}</div>
          </button>
        </div>

        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
             <div className="text-center py-10 text-zinc-500 italic">Không tìm thấy đơn hàng nào.</div>
          ) : (
            filteredOrders.map((order) => {
              // Nhận diện đơn tái chế thành công dựa trên is_recycled
              const isRecycledSuccess = order.status === 'SUCCESS' && order.is_recycled === true; 

              return (
                <div key={order.id} className="bg-[#1f2535] border-b border-zinc-800 pb-4 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-[13px]">
                      <span className="text-zinc-400 font-medium">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                      </span>
                      <span className="ml-2 text-blue-400">ID: {order.id}</span>
                    </div>
                    
                    <span className={`px-3 py-1 rounded text-[11px] uppercase font-bold border ${
                      isRecycledSuccess ? 'text-green-400 border-green-500 bg-green-900/20' : 
                      order.status === 'SUCCESS' ? 'text-green-400 border-green-900 bg-green-900/20' : 
                      order.status === 'RECYCLE' ? 'text-orange-400 border-orange-900 bg-orange-900/20' :
                      'text-yellow-500 border-yellow-900 bg-yellow-900/20'
                    }`}>
                      {isRecycledSuccess ? "SẢN PHẨM TÁI CHẾ THÀNH CÔNG" : order.status}
                    </span>
                  </div>

                  <div className="flex gap-4 mb-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#2a303f] flex-shrink-0">
                      <img 
                        src={order.image_url && order.image_url !== "NULL" ? order.image_url : "https://placehold.co/150x150/2a303f/white?text=No+Image"} 
                        className="w-full h-full object-cover" 
                        alt="Product" 
                      />
                    </div>
                    <p className="text-[13px] leading-tight text-zinc-300">{order.product_name || "Sản phẩm không xác định"}</p>
                  </div>

                  <div className="flex justify-between items-center border-t border-zinc-800/50 pt-4">
                    <div className="text-[15px] font-bold italic text-white">Total: ${Number(order.amount).toFixed(2)}</div>
                    <div className="flex gap-2">
                      {/* Nút bấm ẩn hoàn toàn khi isRecycledSuccess = true */}
                      {!isRecycledSuccess && (
                        <>
                          <button className="bg-[#d01345] text-white px-4 py-2 rounded-md text-[13px] font-bold flex items-center gap-1 opacity-50 cursor-not-allowed">
                            Hủy
                          </button>
                          {order.status === 'SUCCESS' && (
                            <button 
                              onClick={() => openRecycleModal(order.id)}
                              className="bg-[#f2a100] text-white px-4 py-2 rounded-md text-[13px] font-bold flex items-center gap-1"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                              Tái chế
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {showRecycleModal && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="w-full max-w-[320px] bg-[#242936] rounded-xl overflow-hidden border border-zinc-800">
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
              <span className="text-zinc-400 text-[11px] font-bold uppercase tracking-wider">ĐƠN HÀNG TÁI CHẾ</span>
              <button onClick={() => setShowRecycleModal(false)} className="text-zinc-500 hover:text-white">✕</button>
            </div>
            <div className="p-8 text-center">
              <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                <span className="text-2xl font-bold">!</span>
              </div>
              <p className="text-zinc-300 text-[14px] font-medium leading-relaxed mb-8">
                Bạn có chắc chắn muốn yêu cầu tái chế đơn hàng này không?
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={confirmRecycle}
                  className="flex-1 bg-[#d01345] text-white py-3 rounded-lg font-bold text-[12px] active:scale-95 transition-all"
                >
                  Vâng, chắc chắn
                </button>
                <button 
                  onClick={() => setShowRecycleModal(false)}
                  className="flex-1 bg-[#343a4a] text-zinc-300 py-3 rounded-lg font-bold text-[12px]"
                >
                  Hủy bỏ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}