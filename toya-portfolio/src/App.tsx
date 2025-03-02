import './App.css'
import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import Projects from "./components/Projects.tsx";
import About from "./components/About.tsx";
import Contact from "./components/Contact.tsx";
import Experience from "./components/Experience.tsx";

function App() {

  return (
    <>
        <div>
       <Navbar></Navbar>
        <Hero></Hero>
        <About></About>
        <Experience></Experience>
        <Projects />
        {/*<Contact/>*/}
        <Contact></Contact>
        </div>



    </>
  )
}

export default App
