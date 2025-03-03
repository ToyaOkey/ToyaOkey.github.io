import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FiMenu, FiX } from "react-icons/fi"; // Mobile Menu Icons

const Navbar = () => {
    const [activeSection, setActiveSection] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ["home", "about", "experience", "projects", "contact"];
            let currentSection = "";

            sections.forEach((section) => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        currentSection = section;
                    }
                }
            });

            setActiveSection(currentSection);

            // Sticky Navbar Logic
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Toggle Mobile Menu
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
            isSticky ? "bg-gray-900 shadow-lg py-3" : "bg-transparent py-6"
        }`}>
            <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <a href="/" className="text-2xl font-bold tracking-wide text-blue-400">
                    Toya Okey-Nwamara
                </a>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex space-x-8 text-lg">
                    {["home", "about", "experience", "projects", "contact"].map((section) => (
                        <li key={section}>
                            <Link
                                to={section}
                                smooth={true}
                                duration={800}
                                spy={true}
                                offset={-70}
                                className={`cursor-pointer px-4 py-2 rounded-lg transition ${
                                    activeSection === section
                                        ? "bg-blue-300 text-white font-semibold shadow-md"
                                        : "text-white hover:bg-white hover:text-gray-900"
                                }`}
                            >
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Icon */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <div
                className={`absolute top-full left-0 w-full bg-gray-900 transition-all duration-300 ${
                    isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
            >
                <ul className="flex flex-col space-y-4 py-4 px-6">
                    {["home", "about", "experience", "projects", "contact"].map((section) => (
                        <li key={section}>
                            <Link
                                to={section}
                                smooth={true}
                                duration={800}
                                spy={true}
                                offset={-70}
                                className={`block px-4 py-2 text-white text-lg rounded-lg transition ${
                                    activeSection === section
                                        ? "bg-blue-300 text-white font-semibold"
                                        : "hover:bg-white hover:text-gray-900"
                                }`}
                                onClick={() => setIsMenuOpen(false)} // Close menu on link click
                            >
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;