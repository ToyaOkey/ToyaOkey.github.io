import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Import JSON Data
import experienceData from "../data/experienceData.json";

// Define TypeScript Type (if using TS)
interface ExperienceItem {
    role: string;
    company: string;
    date: string;
    points: string[];
}

const Experience = () => {
    const [experiences, setExperiences] = useState<ExperienceItem[]>([]);

    useEffect(() => {
        setTimeout(() => {
            setExperiences(experienceData);
        }, 500); // Simulating API fetch delay
    }, []);

    return (
        <section id="experience" className="py-16 bg-gray-100">
            <div className="max-w-6xl mx-auto px-6">
                <motion.h2
                    className="text-4xl font-bold text-center mb-10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Experience 💼
                </motion.h2>

                {/* Loading State */}
                {experiences.length === 0 ? (
                    <div className="text-center text-gray-500">Loading experiences...</div>
                ) : (
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute top-0 left-1/2 w-1 bg-blue-500 h-full transform -translate-x-1/2"></div>

                        {/* Timeline Items */}
                        <motion.div
                            className="grid gap-10"
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
                                    className={`flex flex-col md:flex-row items-center md:items-start ${
                                        index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                                    variants={{
                                        hidden: { opacity: 0, y: 30 },
                                        visible: { opacity: 1, y: 0 },
                                    }}
                                >
                                    {/* Experience Content */}
                                    <div
                                        className={`bg-white shadow-lg rounded-lg p-6 w-full md:w-5/12 border-l-4 border-blue-500 ${
                                            index % 2 === 0 ? "md:text-right" : "md:text-left"
                                        }`}
                                    >
                                        <h3 className="text-xl font-semibold">{exp.role}</h3>
                                        <p className="text-gray-600">{exp.company} • {exp.date}</p>
                                        <ul className="mt-3 list-disc pl-5 space-y-2 text-gray-700 marker:text-gray-700">
                                            {exp.points.map((point, i) => (
                                                <li key={i} className="leading-relaxed pl-2 text-left">{point}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Timeline  */}
                                    <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full md:mx-5">
                                        {index + 1}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Experience;