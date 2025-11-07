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
        <div ref={ref} className="text-center">
            <motion.div
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
                {count}{suffix}
            </motion.div>
            <p className="text-sm md:text-base text-gray-300 mt-2">{label}</p>
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
        <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            {displayedText}
            {currentIndex < text.length && (
                <span className="animate-pulse">|</span>
            )}
        </span>
    );
};

// Animated Particles Component
const Particles = () => {
    const particles = Array.from({ length: 50 }, (_, i) => i);
    
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
        <section id="home" className="relative flex flex-col justify-center items-center text-center h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white px-6 overflow-hidden">

            {/* Animated Particles */}
            <Particles />

            {/* Glowing Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-purple-500/20 blur-3xl opacity-50"></div>

            {/* Animated Title */}
            <motion.h1
                className="text-4xl md:text-6xl font-bold relative z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.6 }}
            >
                Hello, I'm{" "}
                {showTypewriter ? (
                    <Typewriter text="Toya Okey-Nwamara" speed={80} />
                ) : (
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text animate-pulse">
                        Toya Okey-Nwamara
                    </span>
                )}
            </motion.h1>

            {/* Subheading */}
            <motion.p
                className="mt-4 text-xl md:text-2xl text-gray-200 relative z-10 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true, amount: 0.5 }}
            >
                Developer & Cybersecurity Enthusiast
            </motion.p>

            {/* Animated Statistics Counters */}
            <motion.div
                className="mt-12 flex flex-wrap justify-center gap-8 md:gap-12 relative z-10"
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
                className="mt-8 flex flex-wrap gap-4 justify-center relative z-10"
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
                    className="inline-flex items-center px-6 py-3 text-base font-bold rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white transition transform hover:scale-105 hover:shadow-xl"
                    style={{ color: '#ffffff' }}
                >
                    <FaRocket className="mr-2 text-white" /> View Projects
                </Link>
                <a
                    href="/Resume - Toya Okey-Nwamara.pdf"
                    download
                    className="inline-flex items-center px-6 py-3 text-base font-bold rounded-lg shadow-lg bg-white text-gray-900 transition transform hover:scale-105 hover:shadow-xl hover:bg-gray-100"
                >
                    <FaDownload className="mr-2" /> Download Resume
                </a>
                <Link
                    to="contact"
                    smooth={true}
                    duration={800}
                    offset={-50}
                    className="inline-flex items-center px-6 py-3 text-base font-bold rounded-lg shadow-lg border-2 border-white text-white transition transform hover:scale-105 hover:shadow-xl hover:bg-white hover:text-gray-900"
                >
                    Get in Touch
                </Link>
            </motion.div>

            {/* Down Arrow to Scroll */}
            <motion.div
                className="mt-10 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                viewport={{ once: true, amount: 0.6 }}
            >
                <Link to="about" smooth={true} duration={800} offset={-50}>
                    <ChevronDownIcon className="w-10 h-10 text-blue-400 animate-bounce cursor-pointer transition hover:text-blue-300 hover:scale-110" />
                </Link>
            </motion.div>
        </section>
    );
};

export default Hero;
