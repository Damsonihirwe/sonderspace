import { cookies } from "next/headers";
import { AdminDashboard } from "@/components/admin-dashboard";
import { AdminLogin } from "@/components/admin-login";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const cookieStore = await cookies();

  const isAuthenticated =
    cookieStore.get("sonderspace_admin")?.value === "authenticated";

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const requests = await prisma.teeRequest.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return <AdminDashboard requests={requests} />;
}