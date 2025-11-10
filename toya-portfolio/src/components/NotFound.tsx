import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import { FaHome, FaRocket, FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center text-white px-6 relative overflow-hidden">
            {/* Animated Background Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 30 }, (_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20"
                        initial={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                        }}
                        animate={{
                            y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
                            x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            {/* Glowing Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-purple-500/20 blur-3xl opacity-50"></div>

            <div className="relative z-10 text-center max-w-2xl">
                {/* 404 Number */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                        404
                    </h1>
                </motion.div>

                {/* Error Icon */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mb-6"
                >
                    <FaExclamationTriangle className="text-6xl text-yellow-400 mx-auto animate-pulse" />
                </motion.div>

                {/* Error Message */}
                <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    Page Not Found
                </motion.h2>

                <motion.p
                    className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    Oops! The page you're looking for doesn't exist or has been moved.
                    <br />
                    Let's get you back on track!
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                    className="flex flex-wrap gap-4 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <RouterLink
                        to="/"
                        className="inline-flex items-center px-6 py-3 text-base font-bold rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white transition transform hover:scale-105 hover:shadow-xl"
                        style={{ color: '#ffffff' }}
                    >
                        <FaHome className="mr-2 text-white" /> Go Home
                    </RouterLink>
                    <RouterLink
                        to="/"
                        className="inline-flex items-center px-6 py-3 text-base font-bold rounded-lg shadow-lg border-2 border-white text-white transition transform hover:scale-105 hover:shadow-xl hover:bg-white hover:text-gray-900"
                    >
                        <FaRocket className="mr-2" /> View Projects
                    </RouterLink>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                    className="mt-12 flex justify-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                >
                    {[1, 2, 3].map((dot) => (
                        <motion.div
                            key={dot}
                            className="w-2 h-2 bg-blue-400 rounded-full"
                            animate={{
                                y: [0, -10, 0],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: dot * 0.2,
                            }}
                        />
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound;

