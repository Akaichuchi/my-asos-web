"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; 

export default function AdminOrderApproval() {
  const [pendingOrders, setPendingOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // CẬP NHẬT: Khớp chính xác tên cột trong database (created_at và amount)
  const fetchPendingOrders = async () => {
    const { data, error } = await supabase
      .from("Order")
      .select(`
        *,
        User:userId ( fullName, username )
      `)
      .or('status.eq.RECYCLE,status.eq.PENDING') 
      .order("created_at", { ascending: false }); // Sửa từ createdAt thành created_at

    if (!error) {
      setPendingOrders(data || []);
    } else {
      console.error("Lỗi fetch đơn hàng:", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPendingOrders();

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

  const handleApprove = async (orderId: string) => {
    if (!confirm("Xác nhận Duyệt đơn này? Bạn sẽ phải cộng tiền thủ công bên tab Khách hàng.")) return;
    try {
      const { error } = await supabase
        .from("Order")
        .update({ status: "SUCCESS" }) 
        .eq("id", orderId);

      if (error) throw error;

      alert(`Đã duyệt đơn hàng thành công! Hãy sang danh sách khách hàng để cộng tiền.`);
      fetchPendingOrders();
      
    } catch (err: any) {
      alert("Lỗi xử lý: " + err.message);
    }
  };

  const handleReject = async (orderId: string) => {
    if (!confirm("Bạn có chắc chắn muốn TỪ CHỐI đơn này không?")) return;
    try {
      const { error } = await supabase
        .from("Order")
        .update({ status: "REJECTED" })
        .eq("id", orderId);

      if (error) throw error;
      alert("Đã từ chối đơn hàng.");
      fetchPendingOrders();
    } catch (err: any) {
      alert("Lỗi khi từ chối: " + err.message);
    }
  };

  if (loading) return <div className="p-10 text-white italic animate-pulse text-center">Đang tải dữ liệu admin...</div>;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      <h1 className="text-2xl font-bold mb-8 border-l-4 border-yellow-500 pl-4 uppercase italic">
        ADMIN - PHÊ DUYỆT ĐƠN HÀNG
      </h1>

      <div className="overflow-x-auto bg-[#1e293b] rounded-lg border border-zinc-800 shadow-xl">
        <table className="w-full text-left">
          <thead className="bg-[#334155] text-[12px] uppercase tracking-wider">
            <tr>
              <th className="p-4">Hình ảnh</th>
              <th className="p-4">Sản phẩm / Khách hàng</th>
              <th className="p-4">Mã User</th>
              <th className="p-4 text-right">Số tiền đơn</th>
              <th className="p-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-700">
            {pendingOrders.map((order) => (
              <tr key={order.id} className="hover:bg-zinc-800/50 transition-colors">
                <td className="p-4">
                  {order.image_url ? (
                    <img src={order.image_url} alt="" className="w-12 h-16 object-cover rounded bg-white/10 border border-zinc-700" />
                  ) : (
                    <div className="w-12 h-16 bg-zinc-800 rounded flex items-center justify-center text-[10px] text-zinc-500">No Image</div>
                  )}
                </td>
                <td className="p-4">
                  <div className="text-sm font-black uppercase text-yellow-500">{order.product_name || "Sản phẩm"}</div>
                  <div className="text-[11px] text-blue-400 font-bold italic">Khách: {order.User?.fullName || "N/A"}</div>
                  <div className="text-[10px] text-zinc-500 font-mono">{order.id.toString().slice(0,8)}...</div>
                </td>
                <td className="p-4 text-zinc-400 text-xs font-mono">
                  {order.userId}
                </td>
                <td className="p-4 font-black text-red-400 text-right text-lg font-mono">
                  {/* CẬP NHẬT: Dùng đúng cột amount thay vì total_amount */}
                  ${Number(order.amount || 0).toFixed(2)}
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-2 items-center">
                    <button 
                      onClick={() => handleApprove(order.id)}
                      className="w-full bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded font-black text-[10px] uppercase transition-all"
                    >
                      Duyệt Thành Công
                    </button>
                    <button 
                      onClick={() => handleReject(order.id)}
                      className="w-full bg-transparent border border-zinc-600 hover:bg-red-600 hover:border-red-600 text-zinc-400 hover:text-white px-4 py-1 rounded font-bold text-[10px] uppercase transition-all"
                    >
                      Từ chối đơn
                    </button>
                  </div>
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