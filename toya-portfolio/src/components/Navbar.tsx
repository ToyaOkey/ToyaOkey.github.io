import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaDownload, FaHome, FaUser, FaBriefcase, FaProjectDiagram, FaAddressCard, FaFlask } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [activeSection, setActiveSection] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    const location = useLocation();
    const isResearchPage = location.pathname === '/research';
    
    const navItems = [
        { name: "home", label: "Home", icon: <FaHome />, route: "/" },
        { name: "about", label: "About", icon: <FaUser />, route: "/" },
        { name: "experience", label: "Experience", icon: <FaBriefcase />, route: "/" },
        { name: "projects", label: "Projects", icon: <FaProjectDiagram />, route: "/" },
        { name: "contact", label: "Contact", icon: <FaAddressCard />, route: "/" },
    ];

    const researchItem = { name: "research", label: "Research", icon: <FaFlask />, route: "/research" };

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

    // Close mobile menu when clicking outside
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMenuOpen]);

    // Toggle Mobile Menu
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
            isSticky 
                ? "bg-gray-900/95 backdrop-blur-md shadow-lg py-3 border-b border-gray-800" 
                : "bg-transparent py-6"
        }`}>
            <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
                  {/* Logo with hover effect */}
                  <RouterLink 
                      to="/"
                      className="text-2xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text hover:from-blue-300 hover:to-purple-300 transition-all"
                  >
                      <motion.span
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                      >
                          Toya Okey-Nwamara
                      </motion.span>
                  </RouterLink>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-4">
                    <ul className="flex space-x-2 text-lg">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                {isResearchPage ? (
                                    <RouterLink
                                        to={item.route}
                                        className={`relative cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 text-gray-300 hover:text-white`}
                                    >
                                        <span className="inline-block text-base">{item.icon}</span>
                                        <span className="font-medium">{item.label}</span>
                                    </RouterLink>
                                ) : (
                                    <Link
                                        to={item.name}
                                        smooth={true}
                                        duration={800}
                                        spy={true}
                                        offset={-50}
                                        className={`relative cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                                            activeSection === item.name
                                                ? "text-white"
                                                : "text-gray-300 hover:text-white"
                                        }`}
                                    >
                                    {/* Active indicator */}
                                    {activeSection === item.name && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-blue-500/80 to-purple-500/80 rounded-lg -z-10"
                                            layoutId="activeSection"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    
                                    {/* Icon with gradient effect */}
                                    <span 
                                        className={`inline-block text-base transition-all ${
                                            activeSection === item.name 
                                                ? "text-white" 
                                                : ""
                                        }`}
                                    >
                                        {activeSection === item.name ? (
                                            item.icon
                                        ) : (
                                            <span 
                                                className="inline-block"
                                                style={{
                                                    background: 'linear-gradient(135deg, #ffffff 0%, #e5e7eb 30%, #d1d5db 60%, #9ca3af 100%)',
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                    backgroundClip: 'text',
                                                    display: 'inline-block',
                                                }}
                                            >
                                                <span 
                                                    style={{
                                                        display: 'inline-block',
                                                        color: '#d1d5db',
                                                        filter: 'brightness(1.2) drop-shadow(0 0 1px rgba(255,255,255,0.3))',
                                                    }}
                                                >
                                                    {item.icon}
                                                </span>
                                            </span>
                                        )}
                                    </span>
                                    
                                    {/* Label */}
                                    <span className="font-medium">{item.label}</span>
                                    
                                    {/* Underline for active */}
                                    {activeSection === item.name && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                                            layoutId="underline"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    </Link>
                                )}
                            </li>
                        ))}
                        {/* Research Link */}
                        <li>
                            <RouterLink
                                to="/research"
                                onClick={() => {
                                    // Scroll to top when navigating to research page
                                    setTimeout(() => {
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }, 100);
                                }}
                                className={`relative cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                                    isResearchPage
                                        ? "text-white"
                                        : "text-gray-300 hover:text-white"
                                }`}
                            >
                                {isResearchPage && (
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-blue-500/80 to-purple-500/80 rounded-lg -z-10"
                                        layoutId="activeSection"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <span className={`inline-block text-base ${isResearchPage ? "text-white" : ""}`}>
                                    {researchItem.icon}
                                </span>
                                <span className="font-medium">{researchItem.label}</span>
                            </RouterLink>
                        </li>
                    </ul>
                    

                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden">
                    <motion.button 
                        onClick={toggleMenu} 
                        className="text-white focus:outline-none p-2"
                        whileTap={{ scale: 0.9 }}
                    >
                        {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-md border-t border-gray-800 overflow-hidden"
                    >
                        <ul className="flex flex-col space-y-2 py-4 px-6">
                            {navItems.map((item, index) => (
                                <motion.li
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {isResearchPage ? (
                                        <RouterLink
                                            to={item.route}
                                            className="flex items-center gap-3 px-4 py-3 text-white text-lg rounded-lg transition-all hover:bg-gray-800 text-gray-200"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <span className="text-xl">{item.icon}</span>
                                            {item.label}
                                        </RouterLink>
                                    ) : (
                                        <Link
                                            to={item.name}
                                            smooth={true}
                                            duration={800}
                                            spy={true}
                                            offset={-70}
                                            className={`flex items-center gap-3 px-4 py-3 text-white text-lg rounded-lg transition-all ${
                                                activeSection === item.name
                                                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-md"
                                                    : "hover:bg-gray-800 text-gray-200"
                                            }`}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <span className="text-xl">{item.icon}</span>
                                            {item.label}
                                        </Link>
                                    )}
                                </motion.li>
                            ))}
                            {/* Research Link Mobile */}
                            <motion.li
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: navItems.length * 0.1 }}
                            >
                                <RouterLink
                                    to="/research"
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        // Scroll to top when navigating to research page
                                        setTimeout(() => {
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }, 100);
                                    }}
                                    className={`flex items-center gap-3 px-4 py-3 text-white text-lg rounded-lg transition-all ${
                                        isResearchPage
                                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-md"
                                            : "hover:bg-gray-800 text-gray-200"
                                    }`}
                                >
                                    <span className="text-xl">{researchItem.icon}</span>
                                    {researchItem.label}
                                </RouterLink>
                            </motion.li>
                            <motion.li
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: navItems.length * 0.1 }}
                            >
                                <a
                                    href="/Resume - Toya Okey-Nwamara.pdf"
                                    download
                                    className="flex items-center gap-3 px-4 py-3 text-white text-lg rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 transition hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600"
                                    onClick={() => setIsMenuOpen(false)}
                                    style={{ color: '#ffffff' }}
                                >
                                    <FaDownload className="text-xl" /> Download Resume
                                </a>
                            </motion.li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;