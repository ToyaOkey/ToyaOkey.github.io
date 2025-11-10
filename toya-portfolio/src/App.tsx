import './App.css'
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import Projects from "./components/Projects.tsx";
import About from "./components/About.tsx";
import Contact from "./components/Contact.tsx";
import Experience from "./components/Experience.tsx";
import Education from "./components/Education.tsx";
import Research from "./components/Research.tsx";
import CountryGuessingGame from "./components/CountryGuessingGame.tsx";
import HigherLowerGame from "./components/HigherLowerGame.tsx";
import NotFound from "./components/NotFound.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import ScrollProgress from "./components/ScrollProgress.tsx";
import SectionDivider from "./components/SectionDivider.tsx";
import Footer from "./components/Footer.tsx";

function AppContent() {
  const location = useLocation();
  const isGamePage = location.pathname.startsWith('/games/');

  return (
    <>
      {!isGamePage && <Navbar />}
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <SectionDivider color="blue" variant="gravity" />
            <About />
            <SectionDivider color="purple" variant="gravity" />
            <Education />
            <SectionDivider color="pink" variant="gravity" />
            <Experience />
            <SectionDivider color="blue" variant="gravity" />
            <Projects />
            <SectionDivider color="purple" variant="gravity" />
            <Contact />
          </>
        } />
        <Route path="/research" element={<Research />} />
        <Route path="/games/country-guessing" element={<CountryGuessingGame />} />
        <Route path="/games/higher-lower" element={<HigherLowerGame />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isGamePage && <Footer />}
      {!isGamePage && <ScrollToTop />}
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollProgress />
      <div>
        <AppContent />
      </div>
    </Router>
  )
}

export default App
