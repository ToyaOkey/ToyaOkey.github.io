import { motion, useScroll, useTransform } from "framer-motion";
import experienceData from "../data/experienceData.json";
import { useRef } from "react";
import React from "react";
import { FaBriefcase, FaCode, FaGraduationCap, FaLaptopCode, FaRocket } from "react-icons/fa";

interface ExperienceItem {
    role: string;
    company: string;
    date: string;
    points: string[];
}

const Experience = () => {
    const experiences: ExperienceItem[] = experienceData;
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

    // Icon mapping for different role types with gradient
    const getRoleIcon = (role: string) => {
        const roleLower = role.toLowerCase();
        
        // Gradient wrapper component - creates a white to light blue-purple gradient effect
        const GradientIcon = ({ children }: { children: React.ReactElement }) => (
            <span className="relative inline-flex items-center justify-center">
                {/* Gradient background layer */}
                <span 
                    className="absolute inset-0 bg-gradient-to-br from-white via-blue-100 to-purple-200 rounded-full opacity-70"
                    style={{ 
                        mixBlendMode: 'overlay',
                        filter: 'blur(2px)',
                    }}
                />
                {/* Icon with enhanced styling */}
                <span 
                    className="relative text-white flex items-center justify-center"
                    style={{
                        filter: 'brightness(1.3) drop-shadow(0 0 4px rgba(255,255,255,0.8)) drop-shadow(0 0 8px rgba(147, 197, 253, 0.5))',
                    }}
                >
                    {children}
                </span>
            </span>
        );
        
        if (roleLower.includes("lead") || roleLower.includes("senior")) {
            return <GradientIcon><FaRocket /></GradientIcon>;
        }
        if (roleLower.includes("researcher") || roleLower.includes("research")) {
            return <GradientIcon><FaGraduationCap /></GradientIcon>;
        }
        if (roleLower.includes("developer") || roleLower.includes("developer")) {
            return <GradientIcon><FaCode /></GradientIcon>;
        }
        return <GradientIcon><FaLaptopCode /></GradientIcon>;
    };

    return (
        <motion.section 
            ref={ref}
            id="experience" 
            style={{ y }}
            className="py-16 bg-gray-100 relative"
        >
            {/* Section Divider Effect */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
            
            <div className="max-w-4xl mx-auto px-6">
                <motion.h2
                    className="text-4xl font-bold text-center mb-20"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Experience <FaBriefcase className="inline text-purple-500" />
                </motion.h2>

                <div className="relative">
                    {/* Centered Timeline Line with Gradient */}
                    <motion.div 
                        className="md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 h-full"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        viewport={{ once: true }}
                        style={{ transformOrigin: "top" }}
                    />

                    {/* Timeline Items (Fully Centered) */}
                    <motion.div
                        className="flex flex-col space-y-12 md:space-y-16 md:grid md:grid-cols-1 md:gap-16 relative items-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
                        }}
                    >
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                className="relative flex flex-col items-center text-center"
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                            >
                                {/* Timeline Bullet - Always Centered */}
                                <motion.div 
                                    className="-translate-y-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center rounded-full font-semibold text-lg shadow-lg z-10 border-4 border-white"
                                    whileHover={{ scale: 1.2, rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="text-2xl flex items-center justify-center">
                                        {getRoleIcon(exp.role)}
                                    </div>
                                </motion.div>

                                {/* Experience Content - Centered */}
                                <motion.div 
                                    className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-xl p-8 w-full max-w-xl border-l-4 border-blue-500 hover:border-purple-500 transition-all duration-300 group"
                                    whileHover={{ scale: 1.02, y: -5 }}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{exp.role}</h3>
                                            <p className="text-gray-700 text-base font-medium">{exp.company}</p>
                                        </div>
                                        <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700 rounded-full text-xs font-semibold whitespace-nowrap">
                                            {exp.date}
                                        </span>
                                    </div>
                                    <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-800">
                                        {exp.points.map((point, i) => (
                                            <motion.li 
                                                key={i} 
                                                className="leading-relaxed text-left py-2 text-base"
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                viewport={{ once: true }}
                                            >
                                                {point}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default Experience;