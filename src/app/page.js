import HeroPage from "./components/HeroPage/HeroPage.jsx";
import Featured from "./components/Featured/Featured.jsx";
import ServicesOffered from "./components/ServicesOffered/ServicesOffered.jsx";
import TopAgencyList from "./components/TopAgency/TopAgencyList";

export default function Home() {
  return (
    <main>
      <HeroPage />
      <ServicesOffered />
      <Featured />
      {/* <TopAgencyList /> */}
    </main>
  );
}

//className={style["$1"]}
// className="([^"]+)"
