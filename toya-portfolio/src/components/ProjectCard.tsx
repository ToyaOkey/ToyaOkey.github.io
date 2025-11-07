import { motion } from 'framer-motion';
import * as React from "react";
import { LuMousePointerClick } from "react-icons/lu";


interface ProjectCardProps {
    title: string;
    description: string;
    imageUrl: string;
    projectUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, imageUrl, projectUrl }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transform transition">

            <img src={imageUrl} alt={title} className="w-full h-56 object-cover rounded-t-lg" />
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-600">{description}</p>
                {projectUrl && (
                    <a href={projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                       className="mt-3 inline-block text-blue-500 hover:text-blue-700 transition"
                    >
                        View Project <LuMousePointerClick></LuMousePointerClick>
                    </a>
                )}
            </div>
        </motion.div>
    );
};

export default ProjectCard;