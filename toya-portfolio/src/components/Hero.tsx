import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Hero = () => {
    return (
        <section id="home" className="relative flex flex-col justify-center items-center text-center h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white px-6">

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
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text animate-pulse">
          Toya Okey-Nwamara
        </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
                className="mt-4 text-lg md:text-xl text-gray-300 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true, amount: 0.5 }}
            >
                Developer & Cybersecurity Enthusiast
            </motion.p>

            {/* Down Arrow to Scroll */}
            <motion.div
                className="mt-10 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
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