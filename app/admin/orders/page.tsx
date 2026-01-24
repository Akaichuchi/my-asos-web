"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; 

export default function AdminOrderApproval() {
  const [pendingOrders, setPendingOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // CẬP NHẬT: Truy vấn các đơn hàng có trạng thái "RECYCLE" để hiển thị đúng mục tái chế
  const fetchPendingOrders = async () => {
    const { data, error } = await supabase
      .from("Order")
      .select("*")
      .eq("status", "RECYCLE") // SỬA: Đổi PENDING thành RECYCLE để khớp với hành động khách bấm
      .order("createdAt", { ascending: false });

    if (!error) {
      setPendingOrders(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPendingOrders();

    // Thiết lập Realtime cho bảng Order
    const channel = supabase
      .channel("admin_check_orders")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Order" },
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
      // 1. Cập nhật trạng thái đơn hàng thành 'SUCCESS' (hoặc RECYCLED nếu bạn muốn phân biệt)
      const { error: orderError } = await supabase
        .from("Order")
        .update({ status: "SUCCESS" })
        .eq("id", orderId);

      if (orderError) throw orderError;

      // 2. Lấy số dư hiện tại từ bảng profiles (Giữ nguyên theo code gốc của bạn)
      const { data: profile, error: profileFetchError } = await supabase
        .from("profiles")
        .select("balance")
        .eq("id", userId)
        .single();

      if (profileFetchError) throw profileFetchError;

      // Tính toán và cộng tiền
      const newBalance = (profile.balance || 0) + Number(amount);
      const { error: balanceError } = await supabase
        .from("profiles")
        .update({ balance: newBalance })
        .eq("id", userId);

      if (balanceError) throw balanceError;

      // 3. Cập nhật giao diện cục bộ
      setPendingOrders(prev => prev.filter(o => o.id !== orderId));
      alert(`Đã phê duyệt đơn ${orderId} và cộng $${Number(amount).toFixed(2)} vào tài khoản khách!`);
      
    } catch (err: any) {
      alert("Lỗi xử lý: " + err.message);
    }
  };

  if (loading) return <div className="p-10 text-white italic animate-pulse text-center">Đang tải dữ liệu admin...</div>;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      <h1 className="text-2xl font-bold mb-8 border-l-4 border-yellow-500 pl-4">
        ADMIN - PHÊ DUYỆT TÁI CHẾ
      </h1>

      <div className="overflow-x-auto bg-[#1e293b] rounded-lg border border-zinc-800 shadow-xl">
        <table className="w-full text-left">
          <thead className="bg-[#334155] text-[12px] uppercase tracking-wider">
            <tr>
              <th className="p-4">Hình ảnh</th>
              <th className="p-4">Sản phẩm</th>
              <th className="p-4">Mã User</th>
              <th className="p-4 text-right">Số tiền hoàn</th>
              <th className="p-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-700">
            {pendingOrders.map((order) => (
              <tr key={order.id} className="hover:bg-zinc-800/50 transition-colors">
                <td className="p-4">
                  {order.image_url ? (
                    <img src={order.image_url} alt="" className="w-12 h-16 object-cover rounded bg-white/10" />
                  ) : (
                    <div className="w-12 h-16 bg-zinc-800 rounded flex items-center justify-center text-[10px] text-zinc-500">No Image</div>
                  )}
                </td>
                <td className="p-4">
                  {/* SỬA: Dùng product_name (viết thường có gạch dưới) khớp với Database của bạn */}
                  <div className="text-sm font-bold uppercase">{order.product_name || "Sản phẩm"}</div>
                  <div className="text-[10px] text-zinc-500 font-mono">{order.id}</div>
                </td>
                <td className="p-4 text-zinc-400 text-xs font-mono">
                  {order.userId}
                </td>
                <td className="p-4 font-black text-green-400 text-right">
                  ${Number(order.amount).toFixed(2)}
                </td>
                <td className="p-4 text-center">
                  <button 
                    onClick={() => handleApprove(order.id, order.amount, order.userId)}
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