import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import NavSideBar from "@/components/AdminPanel/NavSideBar/NavSideBar";
import { TabProvider } from "@/Context/AdminPanelTabSelectContext/TabSelectContext";
import Container from "@/components/AdminPanel/ContentContainer/Container";

export default async function Admin() {
  const session = await auth();

  if (session?.user?.role !== "admin" && !session) {
    return redirect("/dashboard");
  }
  
  else { 
    return (
    <TabProvider>
      <NavSideBar />
      <Container />
    </TabProvider>
  );
  }
}