import HeroPage from "@/components/HeroPage/HeroPage.jsx";
import Featured from "@/components/Featured/Featured.jsx";
import ServicesOffered from "@/components/ServicesOffered/ServicesOffered.jsx";
import TopAgencyList from "@/components/TopAgency/TopAgencyList.jsx";
import Navbar from "@/components/Navbar/Navbar.jsx";

export default function Home() {
  return (
    <main>
      <Navbar styleChange={false} />
      <HeroPage />
      <ServicesOffered />
      <Featured />
      {/* <TopAgencyList /> */}
    </main>
  );
}

//className={style["$1"]}
// className="([^"]+)"
