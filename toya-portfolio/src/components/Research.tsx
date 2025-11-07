import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaFlask, FaRocket } from "react-icons/fa";

const Research = () => {
    const navigate = useNavigate();

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleViewProjects = () => {
        // Store flag in sessionStorage for reliable cross-route communication
        sessionStorage.setItem('scrollToProjects', 'true');
        
        // Smooth fade out before navigation
        document.body.style.transition = 'opacity 0.3s ease-out';
        document.body.style.opacity = '0.8';
        
        // Navigate to home page
        setTimeout(() => {
            navigate('/');
            // Reset opacity after navigation
            setTimeout(() => {
                document.body.style.opacity = '1';
                document.body.style.transition = '';
            }, 100);
        }, 200);
    };

    return (
        <motion.section
            id="research"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white px-6 relative"
        >
            {/* Animated Background Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 30 }, (_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
                        initial={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                        }}
                        animate={{
                            y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
                            x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="mb-8"
                >
                    <FaFlask className="text-8xl text-blue-400 mx-auto mb-6" />
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    Research Section
                </motion.h1>

                <motion.p
                    className="text-2xl md:text-3xl text-gray-300 mb-8 font-medium"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    Coming Soon
                </motion.p>

                <motion.p
                    className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    I'm currently working on compiling my research projects, publications, and findings. 
                    This section will showcase my contributions to cybersecurity research, data mining, and related fields.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                >
                    <motion.div
                        onClick={handleViewProjects}
                        className="inline-flex items-center px-8 py-4 text-lg font-bold rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white transition transform hover:scale-105 hover:shadow-xl cursor-pointer"
                        style={{ color: '#ffffff' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaRocket className="mr-2 text-white" /> View My Projects
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Research;

