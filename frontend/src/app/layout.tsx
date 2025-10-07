// src/app/layout.tsx
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Nunito_Sans } from 'next/font/google';

const nunito = Nunito_Sans({ subsets: ['latin'], weight: ['400','600','700'] });

export const metadata = {
  title: "Admin Dashboard",
  description: "Next.js + TailwindCSS + NestJS API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {  
  return (
 <html lang="en" className="bg-white"> 
    <body className="h-screen w-screen flex bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-4 overflow-y-auto">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
