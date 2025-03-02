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
        // Simulating an API call (useful if fetching from a server)
        setTimeout(() => {
            setExperiences(experienceData);
        }, 500); // Simulate loading time
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
                    <motion.div
                        className="space-y-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
                        }}
                    >
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                className="bg-white shadow-md rounded-md p-5 border-l-4 border-blue-400"
                                variants={{
                                    hidden: { opacity: 0, x: -20 },
                                    visible: { opacity: 1, x: 0 },
                                }}
                            >
                                <h3 className="text-xl font-semibold">{exp.role}</h3>
                                <p className="text-gray-600">{exp.company} • {exp.date}</p>
                                <ul className="mt-3 list-disc list-inside space-y-2 text-gray-700">
                                    {exp.points.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Experience;