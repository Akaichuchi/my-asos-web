import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Import Header từ thư mục components theo cấu trúc file của bạn
import Header from "./components/Header"; 

const inter = Inter({ subsets: ["latin"] });

/**
 * Tối ưu hóa SEO cho trang web (Journalist Style)
 * Giúp Google nhận diện thương hiệu ASOS 2026 của bạn tốt hơn
 */
export const metadata: Metadata = {
  title: "ASOS Online Shopping | Trang Sức, Quần Áo & Xu Hướng Thời Trang 2026",
  description: "Khám phá những xu hướng thời trang mới nhất tại ASOS. Miễn phí vận chuyển toàn thế giới cho đơn hàng từ $50. Cập nhật phong cách Cool Girl Staples ngay hôm nay.",
  keywords: "thời trang nữ, thời trang nam, ASOS 2026, mua sắm trực tuyến, cool girl staples",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Đặt Header ở đây để nó luôn hiển thị ở đầu trang 
            trước khi nội dung của {children} được nạp vào.
        */}
        <Header />
        
        {/* Phần nội dung chính của các trang sẽ nằm ở đây */}
        <main>
          {children}
        </main>

        {/* Bạn có thể thêm Footer ở đây sau này để đồng bộ toàn trang */}
      </body>
    </html>
  );
}