import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import Projects from "./components/Projects.tsx";
import About from "./components/About.tsx";
import Contact from "./components/Contact.tsx";
import Experience from "./components/Experience.tsx";
import Education from "./components/Education.tsx";
import Research from "./components/Research.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import ScrollProgress from "./components/ScrollProgress.tsx";
import SectionDivider from "./components/SectionDivider.tsx";
import Footer from "./components/Footer.tsx";

function App() {
  return (
    <Router>
      <ScrollProgress />
      <div>
        <Navbar />
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
        </Routes>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  )
}

export default App
