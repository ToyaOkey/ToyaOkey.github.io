import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp, FaHome, FaUser, FaBriefcase, FaProjectDiagram, FaAddressCard, FaGamepad } from "react-icons/fa";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const quickLinks = [
        { name: "Home", to: "home", icon: <FaHome /> },
        { name: "About", to: "about", icon: <FaUser /> },
        { name: "Experience", to: "experience", icon: <FaBriefcase /> },
        { name: "Projects", to: "projects", icon: <FaProjectDiagram /> },
        { name: "Contact", to: "contact", icon: <FaAddressCard /> },
    ];

    return (
        <footer className="bg-gray-900 text-white relative">
            {/* Top border gradient */}
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                            Toya Okey-Nwamara
                        </h3>
                        <p className="text-gray-400 mb-4 leading-relaxed">
                            Developer & Cybersecurity Enthusiast. Building innovative solutions and exploring the intersection of technology and security.
                        </p>
                        <div className="flex space-x-4 text-2xl">
                            <a 
                                href="https://github.com/ToyaOkey" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110"
                                aria-label="GitHub"
                            >
                                <FaGithub />
                            </a>
                            <a 
                                href="https://www.linkedin.com/in/toyaokey/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin />
                            </a>
                            <a 
                                href="mailto:toyaokey6@gmail.com" 
                                className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110"
                                aria-label="Email"
                            >
                                <FaEnvelope />
                            </a>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.to}>
                                    {isHomePage ? (
                                        <Link
                                            to={link.to}
                                            smooth={true}
                                            duration={800}
                                            offset={-50}
                                            className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition cursor-pointer group"
                                        >
                                            <span className="group-hover:translate-x-1 transition-transform">
                                                {link.icon}
                                            </span>
                                            {link.name}
                                        </Link>
                                    ) : (
                                        <RouterLink
                                            to="/"
                                            className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition cursor-pointer group"
                                        >
                                            <span className="group-hover:translate-x-1 transition-transform">
                                                {link.icon}
                                            </span>
                                            {link.name}
                                        </RouterLink>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="text-xl font-semibold mb-4">Get In Touch</h4>
                        <div className="space-y-3 text-gray-400">
                            <a 
                                href="mailto:toyaokey6@gmail.com" 
                                className="flex items-center gap-2 hover:text-blue-400 transition"
                            >
                                <FaEnvelope className="text-blue-400" />
                                toyaokey6@gmail.com
                            </a>
                            <div className="flex items-center gap-2">
                                <FaLinkedin className="text-blue-400" />
                                <a 
                                    href="https://www.linkedin.com/in/toyaokey/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-400 transition"
                                >
                                    LinkedIn Profile
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaGithub className="text-blue-400" />
                                <a 
                                    href="https://github.com/ToyaOkey" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-400 transition"
                                >
                                    GitHub Profile
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Games Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <FaGamepad className="text-purple-400" />
                            Fun Games
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <RouterLink
                                    to="/games/country-guessing"
                                    className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition cursor-pointer group"
                                >
                                    <span className="group-hover:translate-x-1 transition-transform">🌍</span>
                                    Country Guessing
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink
                                    to="/games/higher-lower"
                                    className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition cursor-pointer group"
                                >
                                    <span className="group-hover:translate-x-1 transition-transform">📊</span>
                                    Higher or Lower
                                </RouterLink>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} Toya Okey-Nwamara. All Rights Reserved.
                        </p>
                        {isHomePage ? (
                            <Link
                                to="home"
                                smooth={true}
                                duration={800}
                                className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition cursor-pointer group"
                            >
                                <span className="text-sm">Back to Top</span>
                                <FaArrowUp className="group-hover:-translate-y-1 transition-transform" />
                            </Link>
                        ) : (
                            <RouterLink
                                to="/"
                                className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition cursor-pointer group"
                            >
                                <span className="text-sm">Back to Top</span>
                                <FaArrowUp className="group-hover:-translate-y-1 transition-transform" />
                            </RouterLink>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

