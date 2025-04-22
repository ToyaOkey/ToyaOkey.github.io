import {useState, useRef, useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
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
        }
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
            className="min-h-screen flex flex-col justify-center items-center text-center bg-gray-900 text-white px-6"
        >
            <div className="max-w-4xl w-full">
                <motion.h2
                    className="text-4xl font-bold mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    Let's Connect! 📩
                </motion.h2>

                <motion.p
                    className="text-lg text-gray-400 mb-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    Have a question, collaboration idea, or just want to say hi? Feel free to reach out!
                </motion.p>

                <motion.div
                    className="flex justify-center space-x-6 text-3xl mb-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                >
                    <a href="https://github.com/ToyaOkey" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110">
                        <FaGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/toyaokey/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110">
                        <FaLinkedin />
                    </a>
                    <a href="mailto:toyaokey6@gmail.com" className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110">
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
                    className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                >
                    <label className="block text-left text-gray-300 text-sm font-semibold">Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your Name"
                        className="w-full p-3 mt-2 mb-4 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-400"
                    />

                    <label className="block text-left text-gray-300 text-sm font-semibold">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="Your Email"
                        className="w-full p-3 mt-2 mb-4 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-400"
                    />

                    <label className="block text-left text-gray-300 text-sm font-semibold">Message</label>
                    <textarea
                        name="message"
                        required
                        rows={4}
                        placeholder="Your Message"
                        className="w-full p-3 mt-2 mb-4 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-400"
                    ></textarea>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition transform hover:scale-105"
                    >
                        Send Message 🚀
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
                                    <h3 className="text-xl font-bold mb-2">Thank you! 🎉</h3>
                                    <p className="text-sm">Your message has been sent. I'll get back to you soon!</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                </motion.form>

                <p className="text-gray-500 text-sm mt-6">
                    © {new Date().getFullYear()} Toya Okey-Nwamara. All Rights Reserved.
                </p>
            </div>
        </motion.section>
    );
};

export default Contact;