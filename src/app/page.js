"use client";
import Navbar from "./components/Navbar";
import HeroPage from "./components/HeroPage/HeroPage.jsx";
import Featured from "./components/Featured/Featured.jsx";
import ServicesOffered from "./components/ServicesOffered/ServicesOffered.jsx";

export default function Home() {
  return (
    <main>
      <Navbar
        link1="Home"
        link2="About"
        link3="Contact"
        link4="Profile"
      />
      <HeroPage titleName="Scripet" />
      <ServicesOffered />
      <Featured />
    </main>
  );
}
