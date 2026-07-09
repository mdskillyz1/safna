import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Safna Products admin dashboard readiness page for products, orders, customers, blog, and reviews.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AdminPage() {
  return <AdminDashboard />;
}
