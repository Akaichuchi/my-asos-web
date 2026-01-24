"use client";
import { useState, useEffect } from "react";

export default function MyAccount() {
  const [userName, setUserName] = useState("");
  // Tạo state cho các trường thông tin có thể chỉnh sửa
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("Việt Nam");
  const [balance, setBalance] = useState("253,498.00");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // 1. Lấy Username để hiển thị tiêu đề
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);

    // 2. Lấy Họ tên đã lưu trước đó (nếu có)
    const savedFullName = localStorage.getItem("userFullName");
    const savedCountry = localStorage.getItem("userCountry");
    if (savedFullName) setFullName(savedFullName);
    if (savedCountry) setCountry(savedCountry);
  }, []);

  // Hàm xử lý khi khách nhấn nút Cập nhật
  const handleUpdate = () => {
    localStorage.setItem("userFullName", fullName);
    localStorage.setItem("userCountry", country);
    
    // Hiển thị thông báo thành công tạm thời
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    alert("Cập nhật thông tin thành công!");
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] py-10 px-4 font-sans text-gray-800">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Cài đặt Người dùng</h1>

        {/* SECTION 1: PROFILE */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
          <div className="flex flex-col items-start gap-4">
            <div className="w-24 h-24 bg-gray-200 rounded-2xl flex items-center justify-center overflow-hidden">
              <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black uppercase">{userName || "User"}</h2>
              <span className="bg-gray-50 text-gray-500 text-xs px-2 py-1 border border-gray-200 rounded">New Member</span>
            </div>
            <p className="text-sm text-gray-400">Định dạng JPG, GIF hoặc PNG. Dung lượng tối đa 800K</p>
            <div className="flex gap-3 mt-2">
              <button className="bg-[#1a56db] text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">
                Tải lên hình ảnh
              </button>
              <button className="bg-white text-gray-700 px-6 py-2.5 rounded-lg text-sm font-bold border border-gray-200 hover:bg-gray-50">
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
              <label className="block text-sm font-bold mb-2">Số dư (Balance)</label>
              <input 
                type="text" 
                value={balance} 
                disabled 
                className="w-full bg-gray-100 border border-gray-200 rounded-lg py-3 px-4 cursor-not-allowed text-gray-500"
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
                <option value="Việt Nam">Việt Nam</option>
                <option value="USA">USA</option>
                <option value="Japan">Japan</option>
              </select>
            </div>

            {/* NÚT CẬP NHẬT */}
            <div className="pt-4 border-t">
              <button 
                onClick={handleUpdate}
                className="w-full md:w-auto bg-black text-white px-10 py-3 rounded-lg font-bold uppercase tracking-widest hover:bg-gray-800 transition-all"
              >
                Lưu thay đổi
              </button>
              {isSaved && <p className="text-green-600 text-sm mt-2 font-medium">Đã lưu thông tin!</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}