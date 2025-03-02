import { useState, useEffect } from "react";
import { Link } from "react-scroll";

const Navbar = () => {
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        // Detect which section is in view
        const handleScroll = () => {
            const sections = ["about", "experience", "projects", "contact"];
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
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <a href="/" className="text-2xl font-bold tracking-wide text-blue-400">
                    Toya Okey-Nwamara
                </a>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex space-x-8 text-lg">
                    {["about", "experience", "projects", "contact"].map((section) => (
                        <li key={section}>
                            <Link
                                to={section}
                                smooth={true}
                                duration={800}
                                spy={true}
                                offset={-70} // Adjust for better highlighting
                                className={`cursor-pointer px-4 py-2 rounded-lg transition ${
                                    activeSection === section
                                        ? "md:bg-opacity-0 bg-blue-300 text-white font-semibold shadow-md"
                                        : "text-white hover:bg-white hover:text-white"
                                }`}
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