import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Background from "./components/Background";
import CustomCursor from "./components/CustomCursor";
import Competences from "./sections/Competences";
import Services from "./sections/Services";
import LanguagesInterests from "./sections/LanguagesInterests";

export default function App() {
  return (
    <div className="bg-[#0B0B0F] text-[#EDEDED] transition-colors duration-500">
       <CustomCursor />
         <Background />
      <Navbar />
      <Hero />
      <About />
      <Competences />
      <Services />
      <Projects />
      <LanguagesInterests />
      <Contact />
    </div>
  );
}