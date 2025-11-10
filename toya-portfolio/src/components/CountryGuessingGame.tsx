import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaRedo } from "react-icons/fa";

interface Country {
    name: {
        common: string;
        official: string;
    };
    flags: {
        png: string;
        svg: string;
        alt?: string;
    };
    capital?: string[];
    region: string;
    subregion?: string;
}

const CountryGuessingGame = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
    const [options, setOptions] = useState<string[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(1);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCountries();
    }, []);

    useEffect(() => {
        if (countries.length > 0) {
            loadNewQuestion();
        }
    }, [countries, round]);

    const fetchCountries = async () => {
        try {
            const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,capital,region,subregion");
            const data = await response.json();
            setCountries(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching countries:", error);
            setIsLoading(false);
        }
    };

    const loadNewQuestion = () => {
        if (countries.length === 0) return;

        // Get a random country
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        setCurrentCountry(randomCountry);

        // Generate 4 options including the correct answer
        const wrongAnswers = countries
            .filter(c => c.name.common !== randomCountry.name.common)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(c => c.name.common);

        const allOptions = [randomCountry.name.common, ...wrongAnswers].sort(() => Math.random() - 0.5);
        setOptions(allOptions);
        setSelectedAnswer(null);
        setIsCorrect(null);
    };

    const handleAnswer = (answer: string) => {
        if (selectedAnswer !== null) return; // Prevent multiple clicks

        setSelectedAnswer(answer);
        const correct = answer === currentCountry?.name.common;
        setIsCorrect(correct);

        if (correct) {
            setScore(score + 1);
        }
    };

    const nextRound = () => {
        setRound(round + 1);
    };

    const resetGame = () => {
        setScore(0);
        setRound(1);
        loadNewQuestion();
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center text-white">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="text-6xl"
                >
                    🌍
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-20">
            {/* Game Header - Below Navbar */}
            <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text text-center sm:text-left">
                            Country Guessing Game
                        </h1>
                        <div className="text-sm sm:text-base text-center sm:text-right">
                            Score: <span className="font-bold text-blue-400">{score}</span> | Round: <span className="font-bold text-purple-400">{round}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Game Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-2xl border border-gray-700"
                >
                    {/* Flag Display */}
                    <div className="mb-8 text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="inline-block"
                        >
                            {currentCountry && (
                                <img
                                    src={currentCountry.flags.png}
                                    alt={currentCountry.flags.alt || `Flag of ${currentCountry.name.common}`}
                                    className="w-64 h-40 sm:w-80 sm:h-52 object-cover rounded-lg shadow-lg border-2 border-gray-600"
                                />
                            )}
                        </motion.div>
                        <p className="mt-4 text-gray-400 text-sm">Guess the country!</p>
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {options.map((option, index) => {
                            const isSelected = selectedAnswer === option;
                            const isRightAnswer = option === currentCountry?.name.common;
                            let buttonClass = "bg-gray-700 hover:bg-gray-600 text-white border-2 border-gray-600";

                            if (selectedAnswer !== null) {
                                if (isRightAnswer) {
                                    buttonClass = "bg-green-600 text-white border-2 border-green-500";
                                } else if (isSelected && !isRightAnswer) {
                                    buttonClass = "bg-red-600 text-white border-2 border-red-500";
                                } else {
                                    buttonClass = "bg-gray-700 text-gray-400 border-2 border-gray-600 cursor-not-allowed";
                                }
                            }

                            return (
                                <motion.button
                                    key={index}
                                    onClick={() => handleAnswer(option)}
                                    disabled={selectedAnswer !== null}
                                    className={`${buttonClass} p-4 rounded-lg font-semibold text-base sm:text-lg transition-all min-h-[60px] flex items-center justify-center gap-2`}
                                    whileHover={selectedAnswer === null ? { scale: 1.05 } : {}}
                                    whileTap={selectedAnswer === null ? { scale: 0.95 } : {}}
                                >
                                    {isSelected && isCorrect && <FaCheckCircle />}
                                    {isSelected && !isCorrect && isRightAnswer && <FaCheckCircle />}
                                    {isSelected && !isCorrect && !isRightAnswer && <FaTimesCircle />}
                                    {option}
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Result Message */}
                    <AnimatePresence>
                        {selectedAnswer !== null && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className={`text-center p-4 rounded-lg mb-6 ${
                                    isCorrect ? "bg-green-600/20 border border-green-500" : "bg-red-600/20 border border-red-500"
                                }`}
                            >
                                <p className="text-lg font-bold">
                                    {isCorrect ? (
                                        <span className="text-green-400">✓ Correct! It's {currentCountry?.name.common}</span>
                                    ) : (
                                        <span className="text-red-400">✗ Wrong! The correct answer is {currentCountry?.name.common}</span>
                                    )}
                                </p>
                                {currentCountry?.capital && (
                                    <p className="text-sm text-gray-300 mt-2">
                                        Capital: {currentCountry.capital[0]} | Region: {currentCountry.region}
                                    </p>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-center">
                        {selectedAnswer !== null ? (
                            <motion.button
                                onClick={nextRound}
                                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Next Round →
                            </motion.button>
                        ) : null}
                        <motion.button
                            onClick={resetGame}
                            className="bg-gray-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-600 transition flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaRedo /> Reset
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CountryGuessingGame;

