import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaHome, FaArrowUp, FaArrowDown, FaTrophy, FaRedo } from "react-icons/fa";

interface Country {
    name: {
        common: string;
    };
    population: number;
    flags: {
        png: string;
    };
}

const HigherLowerGame = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
    const [nextCountry, setNextCountry] = useState<Country | null>(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [streak, setStreak] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCountries();
    }, []);

    useEffect(() => {
        if (countries.length > 0 && !currentCountry) {
            loadNewPair();
        }
    }, [countries]);

    const fetchCountries = async () => {
        try {
            const response = await fetch("https://restcountries.com/v3.1/all?fields=name,population,flags");
            const data = await response.json();
            // Filter out countries with 0 population (some data issues)
            const validCountries = data.filter((c: Country) => c.population > 0);
            setCountries(validCountries);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching countries:", error);
            setIsLoading(false);
        }
    };

    const loadNewPair = () => {
        if (countries.length < 2) return;

        const randomIndex1 = Math.floor(Math.random() * countries.length);
        let randomIndex2 = Math.floor(Math.random() * countries.length);
        
        // Ensure different countries
        while (randomIndex2 === randomIndex1) {
            randomIndex2 = Math.floor(Math.random() * countries.length);
        }

        setCurrentCountry(countries[randomIndex1]);
        setNextCountry(countries[randomIndex2]);
        setGameOver(false);
    };

    const handleGuess = (isHigher: boolean) => {
        if (!currentCountry || !nextCountry || gameOver) return;

        const isCorrect = isHigher 
            ? nextCountry.population > currentCountry.population
            : nextCountry.population < currentCountry.population;

        if (isCorrect) {
            setScore(score + 1);
            setStreak(streak + 1);
            // Move to next round
            setCurrentCountry(nextCountry);
            // Get a new next country
            let newNextIndex = Math.floor(Math.random() * countries.length);
            while (countries[newNextIndex].name.common === nextCountry.name.common) {
                newNextIndex = Math.floor(Math.random() * countries.length);
            }
            setNextCountry(countries[newNextIndex]);
        } else {
            setGameOver(true);
            setStreak(0);
        }
    };

    const resetGame = () => {
        setScore(0);
        setStreak(0);
        setCurrentCountry(null);
        setNextCountry(null);
        loadNewPair();
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

    const formatPopulation = (pop: number) => {
        if (pop >= 1000000000) return `${(pop / 1000000000).toFixed(2)}B`;
        if (pop >= 1000000) return `${(pop / 1000000).toFixed(2)}M`;
        if (pop >= 1000) return `${(pop / 1000).toFixed(2)}K`;
        return pop.toString();
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
            {/* Game Header */}
            <div className="bg-gray-900/95 backdrop-blur-md border-b border-gray-800 sticky top-0 z-40">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text text-center sm:text-left">
                            Higher or Lower
                        </h1>
                        <div className="text-sm sm:text-base text-center sm:text-right">
                            Score: <span className="font-bold text-blue-400">{score}</span>
                            {streak > 0 && (
                                <span className="ml-2">🔥 <span className="text-orange-400">{streak}</span></span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Game Over Screen */}
                <AnimatePresence>
                    {gameOver && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
                        >
                            <motion.div
                                initial={{ y: 50 }}
                                animate={{ y: 0 }}
                                className="bg-gray-800 rounded-xl p-8 text-center max-w-md mx-4 border border-gray-700"
                            >
                                <FaTrophy className="text-6xl text-yellow-400 mx-auto mb-4" />
                                <h2 className="text-3xl font-bold mb-2">Game Over!</h2>
                                <p className="text-xl mb-4">Final Score: <span className="text-blue-400 font-bold">{score}</span></p>
                                <div className="flex gap-4 justify-center">
                                    <motion.button
                                        onClick={resetGame}
                                        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FaRedo /> Play Again
                                    </motion.button>
                                    <motion.button
                                        onClick={() => navigate('/')}
                                        className="bg-gray-700 text-white px-6 py-3 rounded-lg font-bold"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FaHome /> Home
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Game Card */}
                {currentCountry && nextCountry && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4 sm:space-y-6"
                    >
                        {/* Current Country */}
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 shadow-2xl border border-gray-700 text-center"
                        >
                            <img
                                src={currentCountry.flags.png}
                                alt={`Flag of ${currentCountry.name.common}`}
                                className="w-32 h-20 sm:w-40 sm:h-28 object-cover rounded-lg shadow-lg border-2 border-gray-600 mx-auto mb-3"
                            />
                            <h2 className="text-lg sm:text-xl font-bold mb-2">{currentCountry.name.common}</h2>
                            <p className="text-2xl sm:text-3xl font-bold text-blue-400">
                                {formatPopulation(currentCountry.population)}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">people</p>
                        </motion.div>

                        {/* VS Divider */}
                        <div className="text-center">
                            <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="text-2xl sm:text-3xl mb-3"
                            >
                                VS
                            </motion.div>
                        </div>

                        {/* Next Country (Population Hidden) */}
                        <motion.div
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: 1 }}
                            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 shadow-2xl border border-gray-700 text-center"
                        >
                            <img
                                src={nextCountry.flags.png}
                                alt={`Flag of ${nextCountry.name.common}`}
                                className="w-32 h-20 sm:w-40 sm:h-28 object-cover rounded-lg shadow-lg border-2 border-gray-600 mx-auto mb-3"
                            />
                            <h2 className="text-lg sm:text-xl font-bold mb-2">{nextCountry.name.common}</h2>
                            <p className="text-2xl sm:text-3xl font-bold text-purple-400">
                                ???
                            </p>
                            <p className="text-xs text-gray-400 mt-1">population hidden</p>
                        </motion.div>

                        {/* Guess Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <motion.button
                                onClick={() => handleGuess(false)}
                                disabled={gameOver}
                                className="bg-red-600 hover:bg-red-700 text-white p-6 rounded-lg font-bold text-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={!gameOver ? { scale: 1.05 } : {}}
                                whileTap={!gameOver ? { scale: 0.95 } : {}}
                            >
                                <FaArrowDown /> Lower
                            </motion.button>
                            <motion.button
                                onClick={() => handleGuess(true)}
                                disabled={gameOver}
                                className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-lg font-bold text-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={!gameOver ? { scale: 1.05 } : {}}
                                whileTap={!gameOver ? { scale: 0.95 } : {}}
                            >
                                <FaArrowUp /> Higher
                            </motion.button>
                        </div>

                        {/* Instructions */}
                        <p className="text-center text-gray-400 text-sm">
                            Does {nextCountry.name.common} have a higher or lower population than {currentCountry.name.common}?
                        </p>
                    </motion.div>
                )}
            </div>

            {/* Back to Home Button */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <motion.button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-gray-300 hover:text-white transition px-6 py-3 rounded-lg hover:bg-gray-800 border border-gray-700 hover:border-gray-600"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaHome className="text-lg" /> Back to Home
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default HigherLowerGame;

