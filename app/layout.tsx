import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Import Header & Footer từ thư mục components
import Header from "./components/Header"; 
import Footer from "./components/Footer"; 

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
        {/* Header luôn hiển thị ở đầu tất cả các trang */}
        <Header />
        
        {/* Phần nội dung chính của các trang (Home, Register, Products...) */}
        <main>
          {children}
        </main>

        {/* Footer đã được đồng bộ ở đây - Nó sẽ xuất hiện ở cuối tất cả các trang con */}
        <Footer />
      </body>
    </html>
  );
}