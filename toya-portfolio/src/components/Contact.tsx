import {useState, useRef, useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import * as React from "react";

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formRef.current) {
            // basically submitting the form without redirecting
            formRef.current.submit();
            setSubmitted(true);
            formRef.current.reset();
            
            // Confetti animation
            triggerConfetti();
        }
    };

    const triggerConfetti = () => {
        const colors = ['#3b82f6', '#a855f7', '#ec4899', '#60a5fa', '#f472b6'];
        const confettiCount = 100;
        const duration = 3000;
        
        const createConfetti = () => {
            for (let i = 0; i < confettiCount; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.style.position = 'fixed';
                    const startX = Math.random() * window.innerWidth;
                    confetti.style.left = startX + 'px';
                    confetti.style.top = '-10px';
                    confetti.style.width = '10px';
                    confetti.style.height = '10px';
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.borderRadius = '50%';
                    confetti.style.pointerEvents = 'none';
                    confetti.style.zIndex = '9999';
                    confetti.style.opacity = '0.8';
                    
                    document.body.appendChild(confetti);
                    
                    const angle = Math.random() * 360;
                    const velocity = 5 + Math.random() * 5;
                    const xVelocity = Math.cos(angle * Math.PI / 180) * velocity;
                    const yVelocity = Math.sin(angle * Math.PI / 180) * velocity;
                    
                    let x = startX;
                    let y = -10;
                    const rotation = Math.random() * 360;
                    let rotationSpeed = (Math.random() - 0.5) * 10;
                    
                    const animate = () => {
                        x += xVelocity;
                        y += yVelocity + 2; // gravity
                        rotationSpeed += 0.5;
                        
                        confetti.style.left = x + 'px';
                        confetti.style.top = y + 'px';
                        confetti.style.transform = `rotate(${rotation + rotationSpeed}deg)`;
                        
                        if (y < window.innerHeight + 100) {
                            requestAnimationFrame(animate);
                        } else {
                            confetti.remove();
                        }
                    };
                    
                    requestAnimationFrame(animate);
                    
                    setTimeout(() => confetti.remove(), duration);
                }, i * 10);
            }
        };
        
        createConfetti();
    };

    useEffect(() => {
        if (submitted) {
            const timer = setTimeout(() => {
                setSubmitted(false);
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [submitted]);

    return (
        <motion.section
            id="contact"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex flex-col justify-center items-center text-center bg-gray-900 text-white px-6 relative"
        >
            {/* Section Divider Effect */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            
            <div className="max-w-4xl w-full px-4">
                <motion.h2
                    className="text-3xl sm:text-4xl font-bold mb-4 md:mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    Let's Connect! <FaEnvelope className="inline text-blue-400 text-2xl sm:text-3xl md:text-4xl" />
                </motion.h2>

                <motion.p
                    className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 md:mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    Have a question, collaboration idea, or just want to say hi? Feel free to reach out!
                </motion.p>

                <motion.div
                    className="flex justify-center space-x-4 md:space-x-6 text-2xl sm:text-3xl mb-6 md:mb-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                >
                    <a href="https://github.com/ToyaOkey" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110 active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation" aria-label="GitHub">
                        <FaGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/toyaokey/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110 active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation" aria-label="LinkedIn">
                        <FaLinkedin />
                    </a>
                    <a href="mailto:toyaokey6@gmail.com" className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110 active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation" aria-label="Email">
                        <FaEnvelope />
                    </a>
                </motion.div>

                {/* Hidden iframe to catch redirect */}
                <iframe name="hidden_iframe" style={{ display: "none" }}></iframe>

                <motion.form
                    ref={formRef}
                    action="https://formspree.io/f/mkgrwovk"
                    method="POST"
                    target="hidden_iframe"
                    onSubmit={handleSubmit}
                    className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md mx-auto"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                >
                    <label className="block text-left text-gray-200 text-base font-semibold mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your Name"
                        autoComplete="name"
                        inputMode="text"
                        className="w-full p-3.5 mt-2 mb-4 rounded-lg bg-gray-700 text-white text-base border-2 border-gray-600 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 min-h-[44px]"
                    />

                    <label className="block text-left text-gray-200 text-base font-semibold mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="Your Email"
                        autoComplete="email"
                        inputMode="email"
                        className="w-full p-3.5 mt-2 mb-4 rounded-lg bg-gray-700 text-white text-base border-2 border-gray-600 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 min-h-[44px]"
                    />

                    <label className="block text-left text-gray-200 text-base font-semibold mb-1">Message</label>
                    <textarea
                        name="message"
                        required
                        rows={4}
                        placeholder="Your Message"
                        autoComplete="off"
                        inputMode="text"
                        className="w-full p-3.5 mt-2 mb-4 rounded-lg bg-gray-700 text-white text-base border-2 border-gray-600 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 resize-none min-h-[120px]"
                    ></textarea>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-3 md:py-2 rounded-lg hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition transform hover:scale-105 active:scale-95 shadow-lg text-base min-h-[44px] touch-manipulation"
                        style={{ color: '#ffffff' }}
                    >
                        Send Message <FaPaperPlane className="inline w-4 h-4 ml-2 text-white" />   
                    </button>


                        <AnimatePresence>
                            {submitted && (
                                <motion.div
                                    key="thank-you"
                                    className="bg-green-600 p-6 rounded-lg shadow-lg w-full mt-4 text-white"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">Thank you! <FaCheckCircle className="text-green-300" /></h3>
                                    <p className="text-base">Your message has been sent. I'll get back to you soon!</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                </motion.form>

            </div>
        </motion.section>
    );
};

export default Contact;