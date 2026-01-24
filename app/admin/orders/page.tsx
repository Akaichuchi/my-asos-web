"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; // Đảm bảo đường dẫn này đúng với file cấu hình của bạn

export default function AdminOrderApproval() {
  const [pendingOrders, setPendingOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Hàm lấy danh sách đơn hàng đang chờ (pending) từ Supabase
  const fetchPendingOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    if (!error) {
      setPendingOrders(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPendingOrders();

    // Thiết lập Realtime để tự động cập nhật danh sách khi khách nhấn "Tái chế"
    const channel = supabase
      .channel("admin_check_orders")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        () => {
          fetchPendingOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleApprove = async (orderId: string, amount: number, userId: string) => {
    try {
      // 1. Cập nhật trạng thái đơn hàng thành 'success' trên Supabase
      const { error: orderError } = await supabase
        .from("orders")
        .update({ status: "success" })
        .eq("id", orderId);

      if (orderError) throw orderError;

      // 2. Cộng tiền cho User vào bảng profiles (hoặc users tùy cấu hình của bạn)
      // Lấy số dư hiện tại của khách
      const { data: profile, error: profileFetchError } = await supabase
        .from("profiles")
        .select("balance")
        .eq("id", userId)
        .single();

      if (profileFetchError) throw profileFetchError;

      // Tính toán và cập nhật số dư mới
      const newBalance = (profile.balance || 0) + amount;
      const { error: balanceError } = await supabase
        .from("profiles")
        .update({ balance: newBalance })
        .eq("id", userId);

      if (balanceError) throw balanceError;

      // 3. Cập nhật giao diện cục bộ
      setPendingOrders(prev => prev.filter(o => o.id !== orderId));
      alert(`Đã phê duyệt đơn ${orderId} và cộng $${amount.toFixed(2)} vào tài khoản khách!`);
      
    } catch (err: any) {
      alert("Lỗi xử lý: " + err.message);
    }
  };

  if (loading) return <div className="p-10 text-white italic animate-pulse">Đang tải dữ liệu admin...</div>;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      <h1 className="text-2xl font-bold mb-8 border-l-4 border-yellow-500 pl-4">
        ADMIN - PHÊ DUYỆT TÁI CHẾ
      </h1>

      <div className="overflow-x-auto bg-[#1e293b] rounded-lg border border-zinc-800 shadow-xl">
        <table className="w-full text-left">
          <thead className="bg-[#334155] text-[12px] uppercase tracking-wider">
            <tr>
              <th className="p-4">Mã đơn</th>
              <th className="p-4">Khách hàng</th>
              <th className="p-4 text-right">Số tiền hoàn</th>
              <th className="p-4 text-center">Trạng thái</th>
              <th className="p-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-700">
            {pendingOrders.map((order) => (
              <tr key={order.id} className="hover:bg-zinc-800/50 transition-colors">
                <td className="p-4 text-blue-400 font-mono text-sm">{order.id}</td>
                <td className="p-4 text-zinc-400 text-xs truncate max-w-[150px]">
                  {order.user_id}
                </td>
                <td className="p-4 font-black text-green-400 text-right">
                  ${Number(order.total_price || order.total).toFixed(2)}
                </td>
                <td className="p-4 text-center">
                  <span className="bg-yellow-900/30 text-yellow-500 px-3 py-1 rounded-full text-[11px] font-bold">
                    PENDING
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button 
                    onClick={() => handleApprove(order.id, (order.total_price || order.total), order.user_id)}
                    className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded font-black text-[12px] uppercase transition-all active:scale-95"
                  >
                    PHÊ DUYỆT & CỘNG TIỀN
                  </button>
                </td>
              </tr>
            ))}
            {pendingOrders.length === 0 && (
              <tr>
                <td colSpan={5} className="p-20 text-center text-zinc-500 italic uppercase tracking-widest text-sm">
                  Không có đơn hàng nào chờ duyệt.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}