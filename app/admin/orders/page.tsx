"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; 
import Swal from 'sweetalert2'; // THÊM THƯ VIỆN THÔNG BÁO

export default function AdminOrderApproval() {
  const [pendingOrders, setPendingOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- THÊM STATE QUẢN LÝ BẢNG CỘNG TIỀN ---
  const [showMoneyModal, setShowMoneyModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [bonusAmount, setBonusAmount] = useState<number>(0);

  // Cấu hình thông báo Toast nhỏ ở góc màn hình
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    background: '#1e293b',
    color: '#fff'
  });

  const fetchPendingOrders = async () => {
    const { data, error } = await supabase
      .from("Order")
      .select(`
        *,
        User:userId ( fullName, username, balance )
      `) // Lấy thêm balance để cộng tiền
      .or('status.eq.RECYCLE,status.eq.PENDING') 
      .order("created_at", { ascending: false });

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

  // --- LOGIC XỬ LÝ DUYỆT & CỘNG TIỀN MỚI ---
  const handleApproveClick = (order: any) => {
    setSelectedOrder(order);
    setBonusAmount(Number(order.amount || 0)); // Mặc định hiện số tiền đơn hàng
    setShowMoneyModal(true);
  };

  const handleFinalApprove = async () => {
    if (!selectedOrder) return;

    try {
      // 1. Cập nhật trạng thái đơn hàng sang SUCCESS
      const { error: orderError } = await supabase
        .from("Order")
        .update({ status: "SUCCESS" }) 
        .eq("id", selectedOrder.id);

      if (orderError) throw orderError;

      // 2. Tính toán và cộng tiền vào balance của User
      const currentBalance = Number(selectedOrder.User?.balance || 0);
      const newBalance = currentBalance + Number(bonusAmount);

      const { error: userError } = await supabase
        .from("User")
        .update({ balance: newBalance })
        .eq("id", selectedOrder.userId);

      if (userError) throw userError;

      // Thông báo thành công kiểu Toast của bạn
      Toast.fire({
        icon: 'success',
        title: `Đã duyệt & cộng $${bonusAmount} cho khách thành công!`
      });

      setShowMoneyModal(false);
      fetchPendingOrders();
      
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi xử lý',
        text: err.message,
        background: '#1e293b',
        color: '#fff'
      });
    }
  };

  const handleReject = async (orderId: string) => {
    // Thay thế confirm bằng Swal cảnh báo
    const result = await Swal.fire({
      title: 'TỪ CHỐI ĐƠN?',
      text: "Bạn có chắc chắn muốn từ chối đơn hàng này không?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'XÁC NHẬN TỪ CHỐI',
      cancelButtonText: 'HỦY',
      confirmButtonColor: '#dc2626', // Màu đỏ
      cancelButtonColor: '#334155',
      background: '#1e293b',
      color: '#fff'
    });

    if (result.isConfirmed) {
      try {
        const { error } = await supabase
          .from("Order")
          .update({ status: "REJECTED" })
          .eq("id", orderId);

        if (error) throw error;
        Toast.fire({
          icon: 'success',
          title: 'Đã từ chối đơn hàng.'
        });
        fetchPendingOrders();
      } catch (err: any) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi khi từ chối',
          text: err.message,
          background: '#1e293b',
          color: '#fff'
        });
      }
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-10">
      <div className="text-white italic animate-pulse text-center uppercase font-black tracking-widest">
        Đang tải dữ liệu admin...
      </div>
    </div>
  );

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
                  {/* GIỮ NGUYÊN HIỂN THỊ ẢNH */}
                  {order.image_url && order.image_url !== 'EMPTY' ? (
                    <img src={order.image_url} alt="" className="w-12 h-16 object-cover rounded bg-white/10 border border-zinc-700" />
                  ) : (
                    <div className="w-12 h-16 bg-zinc-800 rounded flex items-center justify-center text-[10px] text-zinc-500">No Image</div>
                  )}
                </td>
                <td className="p-4">
                  <div className="text-sm font-black uppercase text-yellow-500">{order.product_name || "Sản phẩm"}</div>
                  <div className="text-[11px] text-blue-400 font-bold italic">Khách: {order.User?.fullName || "N/A"}</div>
                  <div className="text-[10px] text-zinc-500 font-mono italic">Ngày: {order.created_at}</div>
                </td>
                <td className="p-4 text-zinc-400 text-xs font-mono">
                  {order.userId}
                </td>
                <td className="p-4 font-black text-red-400 text-right text-lg font-mono">
                  ${Number(order.amount || 0).toFixed(2)}
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-2 items-center">
                    <button 
                      onClick={() => handleApproveClick(order)} // ĐỔI LÀM MỞ MODAL
                      className="w-full bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded font-black text-[10px] uppercase transition-all shadow-md active:scale-95"
                    >
                      Duyệt & Cộng Tiền
                    </button>
                    <button 
                      onClick={() => handleReject(order.id)}
                      className="w-full bg-transparent border border-zinc-600 hover:bg-red-600 hover:border-red-600 text-zinc-400 hover:text-white px-4 py-1 rounded font-bold text-[10px] uppercase transition-all active:scale-95"
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

      {/* --- BẢNG NHẬP TIỀN CỘNG TRỰC TIẾP (MODAL) --- */}
      {showMoneyModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
          <div className="bg-[#1e293b] w-full max-w-sm border-2 border-yellow-500 p-6 rounded-xl shadow-[0_0_50px_rgba(234,179,8,0.2)]">
            <h3 className="text-lg font-black uppercase mb-2 text-center text-yellow-500 italic">Xác nhận cộng tiền</h3>
            <p className="text-[11px] text-zinc-400 text-center mb-6 uppercase tracking-widest">
              Khách: <span className="text-white">{selectedOrder?.User?.username}</span>
            </p>
            
            <div className="mb-6">
              <label className="block text-[10px] font-black uppercase mb-2 text-zinc-500">Số tiền cộng vào tài khoản ($)</label>
              <input 
                type="number"
                value={bonusAmount}
                onChange={(e) => setBonusAmount(Number(e.target.value))}
                className="w-full bg-[#0f172a] border-2 border-zinc-700 p-4 text-3xl font-black text-green-400 outline-none focus:border-green-500 rounded-lg text-center"
                autoFocus
              />
              <p className="text-[10px] text-zinc-500 mt-2 italic text-center">* Giá trị đơn: ${selectedOrder?.amount}</p>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={handleFinalApprove} 
                className="flex-1 bg-green-600 text-white font-black py-3 rounded-lg hover:bg-green-500 transition-all uppercase text-[10px]"
              >
                Xác Nhận Duyệt
              </button>
              <button 
                onClick={() => setShowMoneyModal(false)} 
                className="flex-1 bg-zinc-700 text-white font-black py-3 rounded-lg hover:bg-zinc-600 transition-all uppercase text-[10px]"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}