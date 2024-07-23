import Navbar from "./components/Navbar";
import HeroPage from "./components/HeroPage/HeroPage.jsx";
import Featured from "./components/Featured/Featured.jsx";
import ServicesOffered from "./components/ServicesOffered/ServicesOffered.jsx";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroPage />
      <ServicesOffered />
      <Featured />
    </main>
  );
}

//className={style["$1"]}
// className="([^"]+)"
