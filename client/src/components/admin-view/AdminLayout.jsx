import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./header";

export default function AdminLayout() {
  const [openSidebar ,setOpenSidebar]=useState(false)
  return (
    <div className="flex min-h-screen w-screen">
        <Sidebar open={openSidebar} setOpen={setOpenSidebar}/>
      <div className="flex flex-1 flex-col">
        <Header  setOpen={setOpenSidebar}/>
        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
