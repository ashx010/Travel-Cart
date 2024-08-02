import React from "react";
import { SessionWrapper } from "../../components/SessionWrapper";
import Navbar from "@/components/Navbar/Navbar.jsx";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <section>
        <SessionWrapper>{children}</SessionWrapper>
      </section>
    </>
  );
}
