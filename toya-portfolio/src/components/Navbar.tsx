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
    const isGamePage = location.pathname.startsWith('/games/');
    
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

            // Sticky Navbar Logic - Disabled for game pages
            if (!isGamePage) {
                if (window.scrollY > 100) {
                    setIsSticky(true);
                } else {
                    setIsSticky(false);
                }
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isGamePage]);

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
        <>
            {/* Mobile Menu Backdrop */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                        onClick={() => setIsMenuOpen(false)}
                    />
                )}
            </AnimatePresence>

            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
                isGamePage
                    ? "bg-gray-900/95 backdrop-blur-md shadow-xl py-3 border-b border-gray-800/50"
                    : isSticky 
                        ? "bg-gray-900/95 backdrop-blur-md shadow-xl py-3 border-b border-gray-800/50" 
                        : "bg-transparent py-6"
            }`}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center">
                      {/* Logo with enhanced hover effect */}
                      <RouterLink 
                          to="/"
                          className="text-xl sm:text-2xl font-bold tracking-wide bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text transition-all relative group"
                      >
                          <motion.span
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="relative inline-block"
                          >
                              <span className="relative z-10">Toya Okey-Nwamara</span>
                              <motion.span
                                  className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                                  animate={{ opacity: [0, 0.3, 0] }}
                                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                              />
                          </motion.span>
                      </RouterLink>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-2">
                    <ul className="flex space-x-1 text-base">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                {isResearchPage ? (
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <RouterLink
                                            to={item.route}
                                            className="relative cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 text-gray-300 hover:text-white group"
                                        >
                                            <motion.span 
                                                className="inline-block text-base"
                                                whileHover={{ rotate: [0, -10, 10, 0] }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                {item.icon}
                                            </motion.span>
                                            <span className="font-medium">{item.label}</span>
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                                            />
                                        </RouterLink>
                                    </motion.div>
                                ) : (
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Link
                                            to={item.name}
                                            smooth={true}
                                            duration={800}
                                            spy={true}
                                            offset={-50}
                                            className={`relative cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 group ${
                                                activeSection === item.name
                                                    ? "text-white"
                                                    : "text-gray-300 hover:text-white"
                                            }`}
                                        >
                                        {/* Active indicator with glow */}
                                        {activeSection === item.name && (
                                            <>
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-blue-500/90 via-purple-500/90 to-pink-500/90 rounded-lg -z-10 shadow-lg shadow-blue-500/50"
                                                    layoutId="activeSection"
                                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                                />
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-blue-400/40 to-purple-400/40 rounded-lg -z-10 blur-xl"
                                                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                />
                                            </>
                                        )}
                                        
                                        {/* Icon with enhanced gradient effect */}
                                        <motion.span 
                                            className={`inline-block text-base transition-all ${
                                                activeSection === item.name 
                                                    ? "text-white drop-shadow-lg" 
                                                    : ""
                                            }`}
                                            whileHover={activeSection !== item.name ? { 
                                                rotate: [0, -10, 10, 0],
                                                scale: 1.1
                                            } : {}}
                                            transition={{ duration: 0.4 }}
                                        >
                                            {activeSection === item.name ? (
                                                item.icon
                                            ) : (
                                                <span 
                                                    className="inline-block group-hover:scale-110 transition-transform duration-300"
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
                                                            filter: 'brightness(1.2) drop-shadow(0 0 2px rgba(255,255,255,0.4))',
                                                        }}
                                                    >
                                                        {item.icon}
                                                    </span>
                                                </span>
                                            )}
                                        </motion.span>
                                        
                                        {/* Label */}
                                        <span className={`relative z-10 transition-all font-medium ${
                                            activeSection === item.name 
                                                ? "text-white" 
                                                : ""
                                        }`}>{item.label}</span>
                                        
                                        {/* Enhanced underline for active */}
                                        {activeSection === item.name && (
                                            <motion.div
                                                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full shadow-lg shadow-blue-400/50"
                                                layoutId="underline"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                        
                                        {/* Hover glow effect */}
                                        {activeSection !== item.name && (
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                                            />
                                        )}
                                        </Link>
                                    </motion.div>
                                )}
                            </li>
                        ))}
                        {/* Research Link */}
                        <li>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <RouterLink
                                    to="/research"
                                    onClick={() => {
                                        setTimeout(() => {
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }, 100);
                                    }}
                                    className={`relative cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 group ${
                                        isResearchPage
                                            ? "text-white"
                                            : "text-gray-300 hover:text-white"
                                    }`}
                                >
                                    {isResearchPage && (
                                        <>
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-blue-500/90 via-purple-500/90 to-pink-500/90 rounded-lg -z-10 shadow-lg shadow-blue-500/50"
                                                layoutId="activeSection"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-blue-400/40 to-purple-400/40 rounded-lg -z-10 blur-xl"
                                                animate={{ opacity: [0.5, 0.8, 0.5] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            />
                                        </>
                                    )}
                                    <motion.span 
                                        className={`inline-block text-base transition-all ${isResearchPage ? "text-white drop-shadow-lg" : ""}`}
                                        whileHover={!isResearchPage ? { 
                                            rotate: [0, -10, 10, 0],
                                            scale: 1.1
                                        } : {}}
                                        transition={{ duration: 0.4 }}
                                    >
                                        {isResearchPage ? (
                                            researchItem.icon
                                        ) : (
                                            <span 
                                                className="inline-block group-hover:scale-110 transition-transform duration-300"
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
                                                        filter: 'brightness(1.2) drop-shadow(0 0 2px rgba(255,255,255,0.4))',
                                                    }}
                                                >
                                                    {researchItem.icon}
                                                </span>
                                            </span>
                                        )}
                                    </motion.span>
                                    <span className={`relative z-10 transition-all font-medium ${
                                        isResearchPage 
                                            ? "text-white" 
                                            : ""
                                    }`}>{researchItem.label}</span>
                                    {isResearchPage && (
                                        <motion.div
                                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full shadow-lg shadow-blue-400/50"
                                            layoutId="underline"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    {!isResearchPage && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                                        />
                                    )}
                                </RouterLink>
                            </motion.div>
                        </li>
                    </ul>
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden">
                    <motion.button 
                        onClick={toggleMenu} 
                        className="text-white focus:outline-none p-3 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation rounded-lg hover:bg-gray-800/50 transition-colors"
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.1 }}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMenuOpen}
                    >
                        <motion.div
                            animate={isMenuOpen ? { rotate: 180 } : { rotate: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                        </motion.div>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="md:hidden absolute top-full left-0 w-full bg-gray-900/98 backdrop-blur-xl border-t border-gray-800/50 overflow-hidden z-50 max-h-[calc(100vh-80px)] overflow-y-auto shadow-2xl"
                    >
                        <ul className="flex flex-col space-y-1 py-4 px-4">
                            {navItems.map((item, index) => (
                                <motion.li
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05, type: "spring", stiffness: 300 }}
                                >
                                    {isResearchPage ? (
                                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                            <RouterLink
                                                to={item.route}
                                                className="flex items-center gap-3 px-4 py-3 text-white text-lg rounded-lg transition-all hover:bg-gray-800/80 text-gray-200 active:bg-gray-700"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <motion.span 
                                                    className="text-xl"
                                                    whileHover={{ rotate: [0, -10, 10, 0] }}
                                                    transition={{ duration: 0.4 }}
                                                >
                                                    {item.icon}
                                                </motion.span>
                                                {item.label}
                                            </RouterLink>
                                        </motion.div>
                                    ) : (
                                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                            <Link
                                                to={item.name}
                                                smooth={true}
                                                duration={800}
                                                spy={true}
                                                offset={-70}
                                                className={`flex items-center gap-3 px-4 py-3 text-white text-lg rounded-lg transition-all relative overflow-hidden ${
                                                    activeSection === item.name
                                                        ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg"
                                                        : "hover:bg-gray-800/80 text-gray-200 active:bg-gray-700"
                                                }`}
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {activeSection === item.name && (
                                                    <motion.div
                                                        className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30"
                                                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                    />
                                                )}
                                                <motion.span 
                                                    className={`text-xl relative z-10 ${activeSection === item.name ? "drop-shadow-lg" : ""}`}
                                                    whileHover={activeSection !== item.name ? { 
                                                        rotate: [0, -10, 10, 0],
                                                        scale: 1.1
                                                    } : {}}
                                                    transition={{ duration: 0.4 }}
                                                >
                                                    {item.icon}
                                                </motion.span>
                                                <span className={`relative z-10 transition-all ${
                                                    activeSection === item.name 
                                                        ? "text-white font-semibold" 
                                                        : ""
                                                }`}>{item.label}</span>
                                            </Link>
                                        </motion.div>
                                    )}
                                </motion.li>
                            ))}
                            {/* Research Link Mobile */}
                            <motion.li
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: navItems.length * 0.05, type: "spring", stiffness: 300 }}
                            >
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <RouterLink
                                        to="/research"
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            setTimeout(() => {
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }, 100);
                                        }}
                                        className={`flex items-center gap-3 px-4 py-3 text-white text-lg rounded-lg transition-all relative overflow-hidden ${
                                            isResearchPage
                                                ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg"
                                                : "hover:bg-gray-800/80 text-gray-200 active:bg-gray-700"
                                        }`}
                                    >
                                        {isResearchPage && (
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30"
                                                animate={{ opacity: [0.5, 0.8, 0.5] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            />
                                        )}
                                        <motion.span 
                                            className={`text-xl relative z-10 ${isResearchPage ? "drop-shadow-lg" : ""}`}
                                            whileHover={!isResearchPage ? { 
                                                rotate: [0, -10, 10, 0],
                                                scale: 1.1
                                            } : {}}
                                            transition={{ duration: 0.4 }}
                                        >
                                            {researchItem.icon}
                                        </motion.span>
                                        <span className={`relative z-10 transition-all ${
                                            isResearchPage 
                                                ? "text-white font-semibold" 
                                                : ""
                                        }`}>{researchItem.label}</span>
                                    </RouterLink>
                                </motion.div>
                            </motion.li>
                            <motion.li
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: (navItems.length + 1) * 0.05, type: "spring", stiffness: 300 }}
                            >
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <a
                                        href="/Resume - Toya Okey-Nwamara.pdf"
                                        download
                                        className="flex items-center gap-3 px-4 py-3 text-white text-lg rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 shadow-lg active:scale-95 relative overflow-hidden group"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30"
                                            animate={{ opacity: [0.5, 0.8, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                        <motion.span
                                            className="text-xl relative z-10"
                                            whileHover={{ rotate: [0, -10, 10, 0] }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <FaDownload />
                                        </motion.span>
                                        <span className="relative z-10 font-semibold">Download Resume</span>
                                    </a>
                                </motion.div>
                            </motion.li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
        </>
    );
};

export default Navbar;