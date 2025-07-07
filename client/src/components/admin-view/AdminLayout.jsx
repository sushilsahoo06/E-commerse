import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./header";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen w-screen">
      <aside className="w-64 bg-white shadow-md fixed h-screen z-10">
        <Sidebar />
      </aside>

      <div className="flex flex-1 flex-col ml-64">
        <Header />
        <main className="flex-1 flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
