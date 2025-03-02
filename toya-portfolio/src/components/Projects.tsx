import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { FaRocket } from "react-icons/fa";

const projects = [
    {
        title: "S&P 500 Stock Price Analysis",
        description: "First data mining project to analyze the S&P 500 stock prices.",
        imageUrl: "/images/stock_market.png",
        projectUrl: "/s&p500view.html",
    },
    {
        title: "Credit Card Prediction",
        description: "Credit Card Analysis and Prediction using Machine Learning.",
        imageUrl: "/images/credit_info.png",
        projectUrl: "/credit-card.html",
    },
];

const Projects = () => {
    return (
        <motion.section
            id="projects"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex flex-col justify-center items-center text-center bg-gray-100 text-gray-900 px-6"
        >
            <div className="max-w-6xl">
                {/* Header */}
                <motion.h2
                    className="text-4xl font-bold mb-4 flex items-center justify-center gap-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    Projects <FaRocket className="text-blue-500" />
                </motion.h2>

                <motion.p
                    className="mb-10 text-lg text-gray-700"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    Here are some of my recent works.
                </motion.p>

                {/* Project Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105 hover:shadow-2xl"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                                <p className="text-gray-600 mt-2">{project.description}</p>
                                <a
                                    href={project.projectUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-3 inline-block text-blue-500 hover:text-blue-700 transition font-medium"
                                >
                                    View Project →
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Next Section Button (Scroll to Footer) */}
                <motion.div
                    className="mt-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                >
                    <Link
                        to="contact"
                        smooth={true}
                        duration={800}
                        className="inline-flex items-center px-6 py-3 text-lg font-semibold rounded-lg shadow-lg bg-black text-white transition transform hover:scale-105 hover:shadow-xl"
                    >
                        Let's Connect 🚀
                    </Link>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Projects;