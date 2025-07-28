"use client";

import AdminSidebar from "@/components/admin-sidebar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-red-800 text-white">
        <AdminSidebar />
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-x-hidden">{children}</main>
    </div>
  );
}
