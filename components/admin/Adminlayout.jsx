// components/admin/AdminLayout.jsx
'use client' ;
import React , {useState} from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function AdminLayout({ children }) {
   const [opensidebar, setOpensidebar] = useState(false)

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      <Sidebar setOpensidebar={setOpensidebar}  opensidebar={opensidebar} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header setOpensidebar={setOpensidebar} opensidebar={opensidebar} />

        <main className="flex-1 overflow-y-auto p-3 lg:p-6">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}