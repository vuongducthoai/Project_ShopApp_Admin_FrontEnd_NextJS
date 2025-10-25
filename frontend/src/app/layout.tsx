'use client';

import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Nunito_Sans } from 'next/font/google';
import { usePathname } from 'next/navigation';

const nunito = Nunito_Sans({ subsets: ['latin'], weight: ['400','600','700'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {  
  const pathname = usePathname();
  
  // Danh sách các trang không cần layout admin
  const authPages = ['/login', '/register', '/forgot-password'];
  const isAuthPage = authPages.includes(pathname);

  return (
    <html lang="en" className="bg-white">
      <body className={`${nunito.className} h-screen w-screen flex bg-gray-100`}>
        {isAuthPage ? (
          // Trang login - không có sidebar, header, footer
          children
        ) : (
          // Trang admin - có đầy đủ layout
          <>
            <Sidebar />
            <div className="flex flex-col flex-1">
              <Header />
              <main className="flex-1 p-4 overflow-y-auto bg-[#F5F6FA]">
                {children}
              </main>
              <Footer />
            </div>
          </>
        )}
      </body>
    </html>
  );
}