import { motion } from "framer-motion";
import { Link } from "react-scroll";
import {
    FaUserAstronaut,
    FaLaptopCode,
    FaLock,
    FaDatabase,
    FaPython,
    FaReact,
    FaNodeJs,
    FaGitAlt,
    FaArrowCircleDown,
    FaJava,
} from "react-icons/fa";

import {RiFileExcel2Line} from "react-icons/ri";
import { SiTypescript, SiTailwindcss, SiMongodb, SiGnubash, SiLua, SiCplusplus } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io";
// import { IoLogoJavascript } from "react-icons/io5";



const skills = [
    { name: "Python", icon: <FaPython className="text-yellow-500" /> },
    { name: "JavaScript", icon: <IoLogoJavascript className="text-yellow-400" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
    { name: "React", icon: <FaReact className="text-blue-400" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-400" /> },
    { name: "Git", icon: <FaGitAlt className="text-red-500" /> },
    { name: "Cybersecurity", icon: <FaLock className="text-gray-500" /> },
    { name: "SQL", icon: <FaDatabase className="text-purple-500" /> },
    { name: "Java", icon: <FaJava className="text-red-500" /> },
    { name: "Bash", icon: <SiGnubash className="text-gray-800" /> },
    { name: "Excel", icon: <RiFileExcel2Line className="text-green-600" /> },
    { name: "Lua", icon: <SiLua className="text-blue-600" /> },
    { name: "C++", icon: <SiCplusplus className="text-blue-900" /> },
];

const About = () => {
    return (
        <motion.section
            id="about"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex flex-col justify-center items-center text-center bg-white text-gray-900 px-6"
        >
            <div className="max-w-4xl">
                <br/>
                <br/>

                {/* Header */}
                <motion.h2
                    className="text-4xl font-bold mb-6 flex items-center justify-center gap-3"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <FaUserAstronaut className="text-blue-500" /> About Me 👋
                </motion.h2>

                {/* Description */}
                <motion.p
                    className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    I am a Computer Science and Cybersecurity student at the University of North Carolina at Charlotte, with a passion for problem-solving, security, and innovation. I love building applications, researching cybersecurity threats, and mentoring others in technology.
                    With experience as a Lead Instructional Assistant, Undergraduate Researcher, and Developer, I’ve worked on projects ranging from marketplaces for gamers to cybersecurity learning platforms. I’m passionate about bridging the gap between security and usability, helping underrepresented communities in tech, and continuously learning to stay ahead in the field.
                    In my free time, I enjoy working on game development, catching up on the news, and learning about the world. Feel free to explore my work and reach out if you’d like to collaborate! </motion.p>

                {/* Skills */}
                <motion.h3 className="text-2xl font-semibold mt-10 mb-6">Skills & Technologies</motion.h3>

                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-center items-center text-lg font-medium"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                >
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md transform transition hover:scale-105 hover:shadow-lg"
                            whileHover={{ scale: 1.1 }}
                        >
                            <div className="text-4xl mb-2">{skill.icon}</div>
                            <span className="text-gray-800">{skill.name}</span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Call to Action Button */}
                <motion.div
                    className="mt-10 relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                >
                    <Link
                        to="projects"
                        smooth={true}
                        duration={800}
                        className="inline-flex items-center px-6 py-3 text-lg font-semibold rounded-lg shadow-lg bg-black text-white transition transform hover:scale-105 hover:shadow-xl"
                    >
                        <FaLaptopCode className="mr-2" /> Explore My Work  <FaArrowCircleDown></FaArrowCircleDown>
                    </Link>

                </motion.div>
                <br/>
                <br/>

            </div>
        </motion.section>
    );
};

export default About;