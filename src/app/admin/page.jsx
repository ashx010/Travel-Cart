import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import NavSideBar from "@/components/AdminPanel/NavSideBar/NavSideBar";
import { TabProvider } from "@/Context/AdminPanelTabSelectContext/TabSelectContext";
import Container from "@/components/AdminPanel/ContentContainer/Container";

export default async function Admin() {
  const session = await auth();

  if (session?.user?.role !== "admin" && !session) {
    return redirect("/dashboard");
  } else {
    const table_name = ["user", "vendor", "travelPackage", "order", "review", "complaint", "query", "feedback", "suggestion"];
    const tablesList = ["User", "Vendors", "Packages", "Orders", "Reviews", "Complaints", "Queries", "Feedback", "Suggestions"];
    return (
      <TabProvider
        table_name={{
          overview: true,
          user: false,
          vendor: false,
          travelPackage: false,
          order: false,
          review: false,
          complaint: false,
          query: false,
          feedback: false,
          suggestion: false,
        }}
      >
        <NavSideBar tablesList={tablesList} table_name={table_name} />
        <Container table_name={table_name} />
      </TabProvider>
    );
  }
}
