import { cookies } from "next/headers";
import { AdminDashboard } from "@/components/admin-dashboard";
import { AdminLogin } from "@/components/admin-login";
import type { TeeRequest } from "@/lib/types";

// Mock data - in a real app, this would come from a database
const mockRequests: TeeRequest[] = [
  {
    id: "1",
    artistName: "Frank Ocean",
    customerName: "John Doe",
    phone: "+250 796 702 186",
    type: "tee",
    notes: "Want it in a vintage wash",
    createdAt: new Date("2026-08-20"),
  },
  {
    id: "2",
    artistName: "The Weeknd",
    customerName: "Jane Smith",
    phone: "+250 123 456 789",
    type: "long-sleeve",
    notes: "Size L preferably",
    createdAt: new Date("2026-08-21"),
  },
];

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuthenticated =
    cookieStore.get("sonderspace_admin")?.value === "authenticated";

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <AdminDashboard requests={mockRequests} />;
}