"use client";
import Navbar from "./components/Navbar";
import HeroPage from "./components/HeroPage/HeroPage.jsx";
import Featured from "./components/Featured/Featured.jsx";
import dynamic from "next/dynamic";


export default function Home() {

  const ServicesOfferedClient = dynamic(() => import("./components/ServicesOffered/ServicesOffered.jsx"), {
    ssr: false, // This will disable server-side rendering for this component
  });

  return (
    <main>
      <Navbar
        titleName="Scripet"
        link1="Home"
        link2="About"
        link3="Contact"
        link4="Profile"
      />
      <HeroPage />
      <ServicesOfferedClient />
      <Featured />
    </main>
  );
}
