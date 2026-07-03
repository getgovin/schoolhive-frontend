import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@flaticon/flaticon-uicons/css/all/all.css';
import 'antd/dist/reset.css';
import { ThemeProvider } from "@/components/ThemeProvider";
import QueryProviders from '@/store/query'
import { ToastContainer } from "react-toastify";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "School Fee Management",
  description:
    "Admin dashboard for managing student fees, fee collection, classes, students, and reports.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
           <QueryProviders>
        <ThemeProvider>
          {children}
                  <ToastContainer />

        </ThemeProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
