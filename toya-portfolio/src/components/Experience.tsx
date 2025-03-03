import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import experienceData from "../data/experienceData.json";

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
            <div className="max-w-4xl mx-auto px-6">
                <motion.h2
                    className="text-4xl font-bold text-center mb-20"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Experience 💼
                </motion.h2>

                {experiences.length === 0 ? (
                    <div className="text-center text-gray-500">Loading experiences...</div>
                ) : (
                    <div className="relative">
                        {/* Centered Timeline Line */}
                        <div className=" md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-500 h-full"></div>

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
                                    <div className="-translate-y-6 w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full font-semibold text-lg shadow-md z-10">
                                        {index + 1}
                                    </div>

                                    {/* Experience Content - Centered */}
                                    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl border-l-4 border-blue-500">
                                        <h3 className="text-xl font-semibold">{exp.role}</h3>
                                        <p className="text-gray-600 text-sm">{exp.company} • {exp.date}</p>
                                        <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                                            {exp.points.map((point, i) => (
                                                <li key={i} className="leading-relaxed  text-left py-2">{point}</li>
                                            ))}
                                        </ul>
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