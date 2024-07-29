import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardData from "@/components/Dashboard/DashboardData/DashboardData";

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    return redirect("/login");
  } else {
    return (
      <>
        <DashboardData />
      </>
    );
  }
}
