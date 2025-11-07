import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-scroll";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { FaDownload, FaRocket } from "react-icons/fa";

// Animated Counter Component
const StatCounter = ({ end, label, suffix = "" }: { end: number; label: string; suffix?: string }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = end / steps;
        const stepDuration = duration / steps;
        
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, [isInView, end]);

    return (
        <div ref={ref} className="text-center px-2">
            <motion.div
                className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
                {count}{suffix}
            </motion.div>
            <p className="text-xs sm:text-sm md:text-base text-gray-300 mt-1 sm:mt-2">{label}</p>
        </div>
    );
};

// Typewriter Component
const Typewriter = ({ text, speed = 100 }: { text: string; speed?: number }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, speed);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text, speed]);

    return (
        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text inline-block">
            {displayedText}
            {currentIndex < text.length && (
                <span className="animate-pulse text-blue-400">|</span>
            )}
        </span>
    );
};

// Animated Particles Component
const Particles = () => {
    // Reduce particles on mobile for better performance
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const particleCount = isMobile ? 20 : 50;
    const particles = Array.from({ length: particleCount }, (_, i) => i);
    
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle}
                    className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
                    initial={{
                        x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1000,
                        y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 1000,
                    }}
                    animate={{
                        y: [null, typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 1000],
                        x: [null, typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1000],
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
    );
};

const Hero = () => {
    const [showTypewriter, setShowTypewriter] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowTypewriter(true), 600);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="home" className="relative flex flex-col justify-center items-center text-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white px-4 sm:px-6 overflow-hidden py-20 sm:py-24">

            {/* Animated Particles */}
            <Particles />

            {/* Glowing Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-purple-500/20 blur-3xl opacity-50"></div>

            {/* Animated Title */}
            <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold relative z-10 px-4 max-w-5xl mx-auto leading-tight"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.6 }}
            >
                <span className="block mb-2 sm:mb-3">Hello, I'm</span>
                <span className="block">
                    {showTypewriter ? (
                        <Typewriter text="Toya Okey-Nwamara" speed={80} />
                    ) : (
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-pulse">
                            Toya Okey-Nwamara
                        </span>
                    )}
                </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
                className="mt-4 sm:mt-6 md:mt-8 text-lg sm:text-xl md:text-2xl text-gray-200 relative z-10 font-medium px-4 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true, amount: 0.5 }}
            >
                Developer & Cybersecurity Enthusiast
            </motion.p>

            {/* Animated Statistics Counters */}
            <motion.div
                className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 relative z-10 px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
            >
                <StatCounter end={50} label="Projects" suffix="+" />
                <StatCounter end={3} label="Years Experience" />
                <StatCounter end={100} label="GitHub Contributions" suffix="+" />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
                className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center relative z-10 px-4 w-full max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true, amount: 0.5 }}
            >
                <Link
                    to="projects"
                    smooth={true}
                    duration={800}
                    offset={-50}
                    className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 min-h-[44px] w-full sm:w-auto text-sm sm:text-base font-bold rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white transition transform hover:scale-105 hover:shadow-xl active:scale-95 touch-manipulation"
                    style={{ color: '#ffffff' }}
                >
                    <FaRocket className="mr-2 text-white" /> View Projects
                </Link>
                <a
                    href="/Resume - Toya Okey-Nwamara.pdf"
                    download
                    className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 min-h-[44px] w-full sm:w-auto text-sm sm:text-base font-bold rounded-lg shadow-lg bg-white text-gray-900 transition transform hover:scale-105 hover:shadow-xl hover:bg-gray-100 active:scale-95 touch-manipulation"
                >
                    <FaDownload className="mr-2" /> Download Resume
                </a>
                <Link
                    to="contact"
                    smooth={true}
                    duration={800}
                    offset={-50}
                    className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 min-h-[44px] w-full sm:w-auto text-sm sm:text-base font-bold rounded-lg shadow-lg border-2 border-white text-white transition transform hover:scale-105 hover:shadow-xl hover:bg-white hover:text-gray-900 active:scale-95 touch-manipulation"
                >
                    Get in Touch
                </Link>
            </motion.div>

            {/* Down Arrow to Scroll */}
            <motion.div
                className="mt-6 sm:mt-8 md:mt-10 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                viewport={{ once: true, amount: 0.6 }}
            >
                <Link to="about" smooth={true} duration={800} offset={-50} className="inline-block min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation">
                    <ChevronDownIcon className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400 animate-bounce cursor-pointer transition hover:text-blue-300 hover:scale-110" />
                </Link>
            </motion.div>
        </section>
    );
};

export default Hero;
