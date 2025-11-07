import { useState, useMemo, useRef, useEffect } from "react";
import React from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { FaRocket, FaUtensils, FaLeaf, FaGamepad, FaShieldAlt, FaBook, FaStore, FaSearch, FaTimes } from "react-icons/fa";
import { LuMousePointerClick } from "react-icons/lu";
import projectData from "../data/projectData.json";
import softwareProjects from "../data/softwareProjects.json";

const Projects = () => {
    const [activeTab, setActiveTab] = useState<"research" | "software">("research");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTech, setSelectedTech] = useState<string | null>(null);
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

    // Handle smooth scroll to top when navigating from Research page
    useEffect(() => {
        const shouldScrollToProjects = sessionStorage.getItem('scrollToProjects');
        
        if (shouldScrollToProjects === 'true') {
            // Clear the flag immediately
            sessionStorage.removeItem('scrollToProjects');
            
            // Small delay to ensure DOM is ready and page has rendered
            const timer = setTimeout(() => {
                const navbar = document.querySelector('nav');
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                
                // Scroll to top of projects section with navbar offset
                const scrollToTop = () => {
                    if (ref.current) {
                        const elementTop = ref.current.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = elementTop - navbarHeight - 20;
                        
                        window.scrollTo({
                            top: Math.max(0, offsetPosition),
                            behavior: 'smooth'
                        });
                    } else {
                        // Retry if element not ready yet
                        setTimeout(scrollToTop, 50);
                    }
                };
                
                // Use requestAnimationFrame for smoother transition
                requestAnimationFrame(() => {
                    scrollToTop();
                });
            }, 150);
            
            return () => clearTimeout(timer);
        }
    }, []);

    // Icon mapping for software projects
    const iconMap: Record<string, React.ReactElement> = {
        FaUtensils: <FaUtensils className="text-4xl text-orange-500" />,
        FaLeaf: <FaLeaf className="text-4xl text-green-500" />,
        FaGamepad: <FaGamepad className="text-4xl text-purple-500" />,
        FaShieldAlt: <FaShieldAlt className="text-4xl text-blue-500" />,
        FaBook: <FaBook className="text-4xl text-indigo-500" />,
        FaStore: <FaStore className="text-4xl text-pink-500" />,
    };

    // Get all unique tech stacks
    const allTechStacks = useMemo(() => {
        const techs = new Set<string>();
        [...projectData, ...softwareProjects].forEach((project) => {
            if (project.techStack) {
                project.techStack.forEach((tech: string) => techs.add(tech));
            }
        });
        return Array.from(techs).sort();
    }, []);

    // Filter research projects
    const filteredResearchProjects = useMemo(() => {
        let filtered = projectData;
        
        // Filter by tech stack
        if (selectedTech) {
            filtered = filtered.filter((project) => 
                project.techStack && project.techStack.includes(selectedTech)
            );
        }
        
        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter((project) => 
                project.title.toLowerCase().includes(query) ||
                project.description.toLowerCase().includes(query) ||
                (project.techStack && project.techStack.some((tech: string) => tech.toLowerCase().includes(query)))
            );
        }
        
        return filtered;
    }, [searchQuery, selectedTech]);

    // Filter software projects
    const filteredSoftwareProjects = useMemo(() => {
        let filtered = softwareProjects;
        
        // Filter by tech stack
        if (selectedTech) {
            filtered = filtered.filter((project) => 
                project.techStack && project.techStack.includes(selectedTech)
            );
        }
        
        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter((project) => {
                const titleMatch = project.title.toLowerCase().includes(query);
                const descriptionMatch = project.description.some((desc: string) => 
                    desc.toLowerCase().includes(query)
                );
                const techStackMatch = project.techStack && project.techStack.some((tech: string) => 
                    tech.toLowerCase().includes(query)
                );
                return titleMatch || descriptionMatch || techStackMatch;
            });
        }
        
        return filtered;
    }, [searchQuery, selectedTech]);

    return (
        <motion.section
            ref={ref}
            id="projects"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ y }}
            className="min-h-screen flex flex-col justify-center items-center text-center bg-gray-100 text-gray-900 px-6 relative"
            viewport={{ once: true, amount: 0.2 }}
        >
            {/* Section Divider Effect */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"></div>
            
            <div className="max-w-6xl mt-4.5 w-full">
                {/* Header */}
                <motion.h2
                    className="text-4xl font-bold mb-4 flex items-center justify-center gap-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    Projects <FaRocket className="text-blue-500" />
                </motion.h2>

                <motion.p
                    className="mb-6 text-lg md:text-xl text-gray-800 font-medium"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    Here are some of my recent works.
                </motion.p>

                {/* Tab Buttons */}
                <motion.div
                    className="flex justify-center gap-4 mb-6 flex-wrap"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <button
                        onClick={() => {
                            setActiveTab("research");
                            setSearchQuery("");
                            setSelectedTech(null);
                        }}
                        className={`px-6 py-2 text-base font-bold rounded-lg transition-all transform hover:scale-105 border-2 ${
                            activeTab === "research"
                                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg border-blue-600"
                                : "bg-white text-gray-900 hover:bg-gray-50 shadow-md border-gray-300 hover:border-blue-400"
                        }`}
                    >
                        Research Projects
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab("software");
                            setSearchQuery("");
                            setSelectedTech(null);
                        }}
                        className={`px-6 py-2 text-base font-bold rounded-lg transition-all transform hover:scale-105 border-2 ${
                            activeTab === "software"
                                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg border-purple-600"
                                : "bg-white text-gray-900 hover:bg-gray-50 shadow-md border-gray-300 hover:border-purple-400"
                        }`}
                    >
                        Software Projects
                    </button>
                </motion.div>

                {/* Tech Stack Filter */}
                {allTechStacks.length > 0 && (
                    <motion.div
                        className="mb-4 md:mb-6 px-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                    >
                        <p className="text-xs md:text-sm text-gray-600 mb-2 font-medium text-center md:text-left">Filter by Technology:</p>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {allTechStacks.map((tech) => (
                                <button
                                    key={tech}
                                    onClick={() => setSelectedTech(selectedTech === tech ? null : tech)}
                                    className={`px-2.5 md:px-3 py-1.5 md:py-1 text-xs font-semibold rounded-full transition-all transform hover:scale-105 active:scale-95 min-h-[36px] md:min-h-[32px] touch-manipulation ${
                                        selectedTech === tech
                                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                >
                                    {tech}
                                </button>
                            ))}
                            {selectedTech && (
                                <button
                                    onClick={() => setSelectedTech(null)}
                                    className="px-2.5 md:px-3 py-1.5 md:py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition-all transform hover:scale-105 active:scale-95 min-h-[36px] md:min-h-[32px] touch-manipulation"
                                >
                                    Clear Filter
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Search Bar */}
                <motion.div
                    className="mb-6 md:mb-8 max-w-md mx-auto px-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                >
                    <div className="relative">
                        <FaSearch className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm md:text-base" />
                        <input
                            type="text"
                            placeholder={`Search ${activeTab === "research" ? "research" : "software"} projects...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 md:pl-12 pr-10 md:pr-4 py-2.5 md:py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 bg-white shadow-md text-sm md:text-base min-h-[44px]"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
                                aria-label="Clear search"
                            >
                                <FaTimes className="text-sm md:text-base" />
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Research Projects */}
                {activeTab === "research" && (
                    <>
                        {filteredResearchProjects.length === 0 ? (
                            <motion.div
                                className="text-center py-12"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <p className="text-xl text-gray-600 mb-2">No projects found</p>
                                <p className="text-gray-500">Try adjusting your search terms</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 justify-center px-4 md:px-0"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {filteredResearchProjects.map((project, index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col group border border-gray-200 hover:border-blue-400"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        whileHover={{ y: -5 }}
                                    >
                                          <div className="relative overflow-hidden">
                                              <img 
                                                  src={project.imageUrl} 
                                                  alt={project.title} 
                                                  onClick={() => setLightboxImage(project.imageUrl)}
                                                  loading="lazy"
                                                  className="w-full h-56 object-contain rounded-t-lg transition-transform duration-500 group-hover:scale-110 cursor-pointer" 
                                              />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4 cursor-pointer" onClick={() => setLightboxImage(project.imageUrl)}>
                                                <span className="text-white font-semibold text-lg">Click to View Full Size</span>
                                            </div>
                                        </div>
                                        <div className="p-6 text-left flex flex-col flex-grow">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                                            <p className="text-base text-gray-700 mt-2 leading-relaxed flex-grow">{project.description}</p>
                                            
                                            {/* Tech Stack Badges */}
                                            {project.techStack && project.techStack.length > 0 && (
                                                <div className="mt-4 mb-4 flex flex-wrap gap-2">
                                                    {project.techStack.map((tech: string, techIndex: number) => (
                                                        <button
                                                            key={techIndex}
                                                            onClick={() => setSelectedTech(tech)}
                                                            className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 border border-blue-200 hover:from-blue-200 hover:to-purple-200 transition-colors cursor-pointer"
                                                        >
                                                            {tech}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                            
                                            <a
                                                href={project.projectUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-4 inline-flex items-center px-4 py-2 text-sm font-bold rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white transition transform hover:scale-105 hover:shadow-lg"
                                                style={{ color: '#ffffff' }}
                                            >
                                                View Project <LuMousePointerClick className="inline w-4 h-4 ml-2 text-white" />
                                            </a>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                        {searchQuery && (
                            <p className="text-center text-gray-600 mt-4 text-sm">
                                Showing {filteredResearchProjects.length} of {projectData.length} research projects
                            </p>
                        )}
                    </>
                )}

                {/* Software Projects */}
                {activeTab === "software" && (
                    <>
                        {filteredSoftwareProjects.length === 0 ? (
                            <motion.div
                                className="text-center py-12"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <p className="text-xl text-gray-600 mb-2">No projects found</p>
                                <p className="text-gray-500">Try adjusting your search terms</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 justify-center px-4 md:px-0"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {filteredSoftwareProjects.map((project, index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col group border border-gray-200 hover:border-purple-400"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        whileHover={{ y: -5 }}
                                    >
                                        <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-8 flex items-center justify-center relative overflow-hidden">
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                            />
                                            <motion.div
                                                whileHover={{ scale: 1.2, rotate: 5 }}
                                                transition={{ duration: 0.3 }}
                                                className="relative z-10"
                                            >
                                                {iconMap[project.icon] || <FaRocket className="text-4xl text-purple-500" />}
                                            </motion.div>
                                        </div>
                                        <div className="p-6 text-left flex flex-col flex-grow">
                                            <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                                            <ul className="text-gray-700 space-y-2 mb-4 pl-6 text-left flex-grow">
                                                {project.description.map((desc: string, i: number) => (
                                                    <li key={i} className="text-base list-disc text-left leading-relaxed">{desc}</li>
                                                ))}
                                            </ul>
                                            
                                            {/* Tech Stack Badges */}
                                            {project.techStack && project.techStack.length > 0 && (
                                                <div className="mt-4 mb-4 flex flex-wrap gap-2">
                                                    {project.techStack.map((tech: string, techIndex: number) => (
                                                        <button
                                                            key={techIndex}
                                                            onClick={() => setSelectedTech(tech)}
                                                            className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-gray-800 border border-purple-200 hover:from-purple-200 hover:to-pink-200 transition-colors cursor-pointer"
                                                        >
                                                            {tech}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                            
                                            <a
                                                href={project.projectUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-4 inline-flex items-center px-4 py-2 text-sm font-bold rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white transition transform hover:scale-105 hover:shadow-lg"
                                                style={{ color: '#ffffff' }}
                                            >
                                                View Project <LuMousePointerClick className="inline w-4 h-4 ml-2 text-white" />
                                            </a>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                        {searchQuery && (
                            <p className="text-center text-gray-600 mt-4 text-sm">
                                Showing {filteredSoftwareProjects.length} of {softwareProjects.length} software projects
                            </p>
                        )}
                    </>
                )}

                {/* Next Section Button (Scroll to Footer) */}
                <motion.div
                    className="mt-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <Link
                        to="contact"
                        smooth={true}
                        duration={800}
                        className="inline-flex items-center px-4 py-2 mb-5 text-base font-bold rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white transition transform hover:scale-105 hover:shadow-xl"
                        style={{ color: '#ffffff' }}
                        offset={-50}
                    >
                        Let's Connect! <FaRocket className="ml-2 text-white"/>
                    </Link>
                </motion.div>
            </div>

            {/* Image Lightbox */}
            <AnimatePresence>
                {lightboxImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                        onClick={() => setLightboxImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative max-w-5xl max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={lightboxImage}
                                alt="Project preview"
                                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                            />
                            <button
                                onClick={() => setLightboxImage(null)}
                                className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
                                aria-label="Close lightbox"
                            >
                                <FaTimes className="text-2xl" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    );
};

export default Projects;
