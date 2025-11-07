import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaGraduationCap, FaUniversity, FaAward } from "react-icons/fa";
import educationData from "../data/educationData.json";

interface EducationItem {
    degree: string;
    university: string;
    date: string;
    details: string[];
    gpa?: string;
}

const Education = () => {
    const experiences: EducationItem[] = educationData;
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

    return (
        <motion.section 
            ref={ref}
            id="education" 
            style={{ y }}
            className="py-16 bg-white relative"
        >
            {/* Section Divider Effect */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            
            <div className="max-w-4xl mx-auto px-6">
                <motion.h2
                    className="text-4xl font-bold text-center mb-20"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Education <FaGraduationCap className="inline text-blue-500" />
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

                    {/* Timeline Items */}
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
                        {experiences.map((edu, index) => (
                            <motion.div
                                key={index}
                                className="relative flex flex-col items-center text-center"
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                            >
                                {/* Timeline Bullet */}
                                <motion.div 
                                    className="-translate-y-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center rounded-full font-semibold text-lg shadow-lg z-10 border-4 border-white"
                                    whileHover={{ scale: 1.2, rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="text-2xl flex items-center justify-center">
                                        {index === 0 ? <FaGraduationCap /> : <FaUniversity />}
                                    </div>
                                </motion.div>

                                {/* Education Content */}
                                <motion.div 
                                    className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-xl p-8 w-full max-w-xl border-l-4 border-blue-500 hover:border-purple-500 transition-all duration-300 group"
                                    whileHover={{ scale: 1.02, y: -5 }}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                                                {edu.degree}
                                                {edu.gpa && <FaAward className="text-yellow-500 text-sm" />}
                                            </h3>
                                            <p className="text-gray-700 text-base font-medium flex items-center gap-2">
                                                <FaUniversity className="text-blue-500" /> {edu.university}
                                            </p>
                                        </div>
                                        <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700 rounded-full text-xs font-semibold whitespace-nowrap ml-4">
                                            {edu.date}
                                        </span>
                                    </div>
                                    {edu.gpa && (
                                        <div className="mb-3">
                                            <span className="text-sm text-gray-600 font-medium">GPA: {edu.gpa}</span>
                                        </div>
                                    )}
                                    <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-800">
                                        {edu.details.map((detail, i) => (
                                            <motion.li 
                                                key={i} 
                                                className="leading-relaxed text-left py-2 text-base"
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                viewport={{ once: true }}
                                            >
                                                {detail}
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

export default Education;

