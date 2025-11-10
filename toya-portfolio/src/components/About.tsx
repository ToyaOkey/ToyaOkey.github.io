import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-scroll";
import { useRef } from "react";
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
    FaHandPaper,
    FaStar,
    FaCode,
    FaShieldAlt,
    FaGraduationCap,
    FaLightbulb,
    FaRocket,
    FaChalkboardTeacher,
    FaFlask,
    FaLayerGroup,
} from "react-icons/fa";

import {RiFileExcel2Line} from "react-icons/ri";
import { SiTypescript, SiTailwindcss, SiMongodb, SiGnubash, SiLua, SiCplusplus, SiHtml5, SiCss3 } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io";
// import { IoLogoJavascript } from "react-icons/io5";



// Convert percentage to stars (1-5 stars)
const getStars = (level: number): number => {
    if (level >= 90) return 5;
    if (level >= 75) return 4;
    if (level >= 60) return 3;
    if (level >= 40) return 2;
    return 1;
};

const skillCategories = [
    {
        name: "Programming Languages",
        skills: [
            { name: "Python", icon: <FaPython className="text-blue-500" />, level: 90 },
            { name: "JavaScript", icon: <IoLogoJavascript className="text-yellow-400" />, level: 85 },
            { name: "TypeScript", icon: <SiTypescript className="text-blue-500" />, level: 80 },
            { name: "Java", icon: <FaJava className="text-red-500" />, level: 75 },
            { name: "C++", icon: <SiCplusplus className="text-blue-900" />, level: 70 },
            { name: "Lua", icon: <SiLua className="text-blue-600" />, level: 65 },
        ]
    },
    {
        name: "Frontend & Frameworks",
        skills: [
            { name: "HTML", icon: <SiHtml5 className="text-orange-500" />, level: 95 },
            { name: "CSS", icon: <SiCss3 className="text-blue-500" />, level: 90 },
            { name: "React", icon: <FaReact className="text-blue-400" />, level: 85 },
            { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-400" />, level: 90 },
        ]
    },
    {
        name: "Backend & Databases",
        skills: [
            { name: "Node.js", icon: <FaNodeJs className="text-green-500" />, level: 80 },
            { name: "MongoDB", icon: <SiMongodb className="text-green-600" />, level: 75 },
            { name: "SQL", icon: <FaDatabase className="text-purple-500" />, level: 80 },
        ]
    },
    {
        name: "Tools & Others",
        skills: [
            { name: "Git", icon: <FaGitAlt className="text-red-500" />, level: 85 },
            { name: "Bash", icon: <SiGnubash className="text-gray-800" />, level: 75 },
            { name: "Excel", icon: <RiFileExcel2Line className="text-green-600" />, level: 80 },
            { name: "Cybersecurity", icon: <FaLock className="text-gray-500" />, level: 75 },
        ]
    }
];

const About = () => {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

    return (
        <motion.section
            ref={ref}
            id="about"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ y, opacity }}
            className="min-h-screen flex flex-col justify-center items-center text-center bg-white text-gray-900 px-6 relative"
        >
            {/* Section Divider Effect */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            
            <div className="max-w-6xl w-full">
                <br/>
                <br/>

                {/* Header */}
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 flex flex-wrap items-center justify-center gap-2 md:gap-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent px-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <FaUserAstronaut className="text-blue-500 text-2xl sm:text-3xl md:text-4xl" /> 
                    <span className="text-center">About Me</span>
                    <FaHandPaper className="text-blue-500 text-2xl sm:text-3xl md:text-4xl" />
                </motion.h2>

                {/* Description - Improved Formatting */}
                <motion.div
                    className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-8 md:mb-12 space-y-3 md:space-y-4 px-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <p className="font-medium">
                        I am a <span className="font-bold text-blue-600">Computer Science and Cybersecurity</span> student at the <span className="font-semibold text-purple-600">University of North Carolina at Charlotte</span>, with a passion for problem-solving, security, and innovation.
                    </p>
                    <p>
                        With experience as a <span className="font-semibold text-blue-600">Lead Instructional Assistant</span>, <span className="font-semibold text-purple-600">Undergraduate Researcher</span>, and <span className="font-semibold text-pink-600">Developer</span>, I've worked on projects ranging from marketplaces for gamers to cybersecurity learning platforms. I'm passionate about bridging the gap between security and usability, helping underrepresented communities in tech, and continuously learning to stay ahead in the field.
                    </p>
                    <p className="text-gray-600 italic">
                        In my free time, I enjoy working on game development, catching up on the news, and learning about the world. Feel free to explore my work and reach out if you'd like to collaborate!
                    </p>
                </motion.div>

                {/* What I Do Section */}
                <motion.div
                    className="mb-8 md:mb-12 px-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-gray-800 text-center">What I Do</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {[
                            {
                                icon: <FaCode className="text-3xl" />,
                                title: "Development",
                                description: "Building full-stack applications with modern technologies",
                                color: "from-blue-500 to-blue-600"
                            },
                            {
                                icon: <FaShieldAlt className="text-3xl" />,
                                title: "Cybersecurity",
                                description: "Researching threats and building secure systems",
                                color: "from-purple-500 to-purple-600"
                            },
                            {
                                icon: <FaGraduationCap className="text-3xl" />,
                                title: "Mentoring",
                                description: "Teaching and guiding others in technology",
                                color: "from-pink-500 to-pink-600"
                            },
                            {
                                icon: <FaLightbulb className="text-3xl" />,
                                title: "Innovation",
                                description: "Creating solutions that bridge security and usability",
                                color: "from-teal-500 to-teal-600"
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="group relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-blue-300"
                                whileHover={{ scale: 1.05, y: -5 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${item.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                                    {item.icon}
                                </div>
                                <h4 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h4>
                                <p className="text-gray-600 text-sm">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Key Highlights */}
                <motion.div
                    className="mb-8 md:mb-12 px-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-gray-800 flex items-center justify-center gap-3">
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        >
                            <FaRocket className="text-blue-500 text-2xl sm:text-3xl" />
                        </motion.div>
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Key Highlights</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {[
                            {
                                title: "Lead Instructional Assistant",
                                description: "Mentoring students and facilitating learning in computer science courses",
                                icon: <FaChalkboardTeacher className="text-3xl" />,
                                color: "from-blue-500 to-blue-600",
                                borderColor: "border-blue-500",
                                bgGradient: "from-blue-50 to-blue-100",
                                stat: "100+"
                            },
                            {
                                title: "Undergraduate Researcher",
                                description: "Conducting research in cybersecurity and contributing to academic publications",
                                icon: <FaFlask className="text-3xl" />,
                                color: "from-purple-500 to-purple-600",
                                borderColor: "border-purple-500",
                                bgGradient: "from-purple-50 to-purple-100",
                                stat: "Active"
                            },
                            {
                                title: "Full-Stack Developer",
                                description: "Building end-to-end applications with modern web technologies",
                                icon: <FaLayerGroup className="text-3xl" />,
                                color: "from-pink-500 to-pink-600",
                                borderColor: "border-pink-500",
                                bgGradient: "from-pink-50 to-pink-100",
                                stat: "5+"
                            }
                        ].map((highlight, index) => (
                            <motion.div
                                key={index}
                                className="group relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-blue-400 overflow-hidden flex flex-col h-full"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.03, y: -5 }}
                                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                {/* Animated background gradient on hover */}
                                <motion.div
                                    className={`absolute inset-0 bg-gradient-to-br ${highlight.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0`}
                                />
                                
                                {/* Decorative corner accent */}
                                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${highlight.color} opacity-10 rounded-bl-full -z-0`} />
                                
                                <div className="relative z-10">
                                    {/* Icon with gradient background */}
                                    <motion.div
                                        className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${highlight.color} text-white mb-4 shadow-md group-hover:shadow-lg`}
                                        whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {highlight.icon}
                                    </motion.div>
                                    
                                    {/* Title */}
                                    <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                                        {highlight.title}
                                    </h4>
                                    
                                    {/* Description */}
                                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                                        {highlight.description}
                                    </p>
                                    
                                    {/* Highlight Bar */}
                                    <div className="relative mt-auto pt-6 pb-2">
                                        {/* Background bar */}
                                        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${highlight.color} opacity-20 rounded-full`} />
                                        
                                        {/* Stat badge centered on bar */}
                                        <div className="relative flex justify-center mb-2">
                                            <motion.div
                                                className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${highlight.color} text-white text-xs font-bold shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <span className="flex items-center gap-1">
                                                    {highlight.stat} {highlight.stat === "Active" ? "Projects" : highlight.stat === "100+" ? "Students" : "Projects"}
                                                </span>
                                            </motion.div>
                                        </div>
                                        
                                        {/* Enhanced bottom border accent */}
                                        <motion.div
                                            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${highlight.color} opacity-30 group-hover:opacity-60 transition-opacity duration-300 rounded-full`}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Skills */}
                <motion.h3 
                    className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-gray-800 text-center px-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Skills & Technologies
                </motion.h3>

                <div className="space-y-8">
                    {skillCategories.map((category, catIndex) => (
                        <motion.div
                            key={catIndex}
                            className="mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 + catIndex * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="text-lg font-semibold text-gray-700 mb-4 text-left">
                                {category.name}
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 px-4">
                                {category.skills.map((skill, index) => (
                                    <motion.div
                                        key={index}
                                        className="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300"
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        viewport={{ once: true }}
                                    >
                                        {/* Icon */}
                                        <div className="text-4xl mb-3 flex justify-center">
                                            {skill.icon}
                                        </div>
                                        
                                        {/* Skill Name */}
                                        <div className="text-center mb-3">
                                            <span className="text-gray-800 font-semibold text-sm">{skill.name}</span>
                                        </div>
                                        
                                        {/* Star Rating */}
                                        <div className="flex justify-center gap-1 mb-2">
                                            {[1, 2, 3, 4, 5].map((star) => {
                                                const stars = getStars(skill.level);
                                                return (
                                                    <motion.div
                                                        key={star}
                                                        initial={{ opacity: 0, scale: 0 }}
                                                        whileInView={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: index * 0.05 + star * 0.05 }}
                                                        viewport={{ once: true }}
                                                    >
                                                        <FaStar
                                                            className={`text-lg ${
                                                                star <= stars
                                                                    ? "text-yellow-400 fill-yellow-400"
                                                                    : "text-gray-300"
                                                            }`}
                                                        />
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                        
                                        {/* Hover Tooltip */}
                                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                            {skill.level >= 80 ? "Advanced" : skill.level >= 60 ? "Intermediate" : "Beginner"}
                                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

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
                        className="inline-flex items-center justify-center px-6 py-3 min-h-[44px] text-base font-bold rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white transition transform hover:scale-105 hover:shadow-xl active:scale-95 touch-manipulation"
                        style={{ color: '#ffffff' }}
                        offset={-50}
                    >
                        <FaLaptopCode className="mr-2 text-white" /> Explore My Work  <FaArrowCircleDown className="text-white ml-2"></FaArrowCircleDown>
                    </Link>

                </motion.div>
                <br/>
                <br/>

            </div>
        </motion.section>
    );
};

export default About;