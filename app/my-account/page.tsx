"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase"; 
import Swal from 'sweetalert2'; // Thêm thư viện thông báo chuyên nghiệp

export default function MyAccount() {
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("Việt Nam");
  const [balance, setBalance] = useState("0.00");
  const [isSaved, setIsSaved] = useState(false);
  
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const countries = [
    "Việt Nam", "USA", "Japan", "Korea", "China", "France", "Germany", "UK", 
    "Canada", "Australia", "Singapore", "Thailand", "Russia", "India", 
    "Lào", "Campuchia", "Malaysia", "Indonesia", "Philippines", "Brazil", 
    "Italy", "Spain", "Mexico", "Turkey", "Switzerland"
  ];

  // Cấu hình Toast thông báo nhanh đồng nhất với trang Cart
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: '#fff',
    color: '#000',
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const storedName = localStorage.getItem("userName");
      if (!storedName) return;

      const { data, error } = await supabase
        .from('User') 
        .select('*')
        .eq('username', storedName)
        .single();

      if (data) {
        setUserName(data.username || "");
        setFullName(data.fullName || ""); 
        setCountry(data.country || "Việt Nam");
        setBalance(Number(data.balance || 0).toFixed(2));
      }
    };

    fetchUserData();

    const userChannel = supabase
      .channel('public:User')
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'User' }, 
        (payload) => {
          if (payload.new.username === localStorage.getItem("userName")) {
            setBalance(Number(payload.new.balance || 0).toFixed(2));
            setFullName(payload.new.fullName || "");
            setCountry(payload.new.country || "Việt Nam");
            
            // Thông báo cập nhật số dư thời gian thực
            Toast.fire({
              icon: 'info',
              title: 'Số dư tài khoản đã được cập nhật!',
              background: '#f0f9ff'
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(userChannel);
    };
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 800 * 1024) {
        Swal.fire({
          icon: 'warning',
          title: 'Dung lượng quá lớn',
          text: 'Vui lòng chọn ảnh dưới 800KB để đảm bảo tốc độ tải trang.',
          confirmButtonColor: '#1a56db',
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatar(base64String);
        Toast.fire({ icon: 'success', title: 'Đã nhận diện hình ảnh mới' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    const storedName = localStorage.getItem("userName");
    if (!storedName) return;

    const { error } = await supabase
      .from('User')
      .update({ 
        fullName: fullName,
        country: country 
      })
      .eq('username', storedName);

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi cập nhật',
        text: error.message,
        confirmButtonColor: '#000'
      });
    } else {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
      Toast.fire({
        icon: 'success',
        title: 'Cập nhật thông tin thành công!'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] py-10 px-4 font-sans text-gray-800 relative">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Cài đặt Người dùng</h1>

        {/* SECTION 1: PROFILE */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
          <div className="flex flex-col items-start gap-4">
            <div className="w-24 h-24 bg-gray-200 rounded-2xl flex items-center justify-center overflow-hidden border">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
            </div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black uppercase">{userName || "User"}</h2>
              <span className="bg-gray-50 text-gray-500 text-xs px-2 py-1 border border-gray-200 rounded">New Member</span>
            </div>
            <p className="text-sm text-gray-400">Định dạng JPG, GIF hoặc PNG. Dung lượng tối đa 800K</p>
            <div className="flex gap-3 mt-2">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                className="hidden" 
                accept="image/*"
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#1a56db] text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors"
              >
                Tải lên hình ảnh
              </button>
              <button 
                onClick={() => setAvatar(null)}
                className="bg-white text-gray-700 px-6 py-2.5 rounded-lg text-sm font-bold border border-gray-200 hover:bg-gray-50"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 2: EDITABLE INFORMATION */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-bold mb-6">Thông tin chung</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2 text-black">Số dư (Balance)</label>
              <input 
                type="text" 
                value={balance} 
                disabled 
                className="w-full bg-gray-100 border border-gray-200 rounded-lg py-3 px-4 cursor-not-allowed text-blue-600 font-bold text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Họ và tên</label>
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nhập họ và tên của bạn"
                className="w-full bg-[#f9fafb] border border-gray-200 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Quốc Gia</label>
              <select 
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-[#f9fafb] border border-gray-200 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="pt-4 border-t">
              <button 
                onClick={handleUpdate}
                className="w-full md:w-auto bg-black text-white px-10 py-3 rounded-lg font-bold uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95"
              >
                Lưu thay đổi
              </button>
              {isSaved && <p className="text-green-600 text-sm mt-2 font-medium">Đã Cập Nhật Thành Công!</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}