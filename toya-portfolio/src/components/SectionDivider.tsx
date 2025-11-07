import { motion } from "framer-motion";

interface DividerProps {
    color?: "blue" | "purple" | "pink";
    variant?: "simple" | "decorative" | "wave" | "gravity";
}

const SectionDivider = ({ color = "blue", variant = "gravity" }: DividerProps) => {
    const colorConfig = {
        blue: {
            gradient: "from-blue-500/60 via-blue-400/80 to-blue-500/60",
            dot: "bg-blue-400",
            wave: "#3b82f6",
            gravity: "#3b82f6",
        },
        purple: {
            gradient: "from-purple-500/60 via-purple-400/80 to-purple-500/60",
            dot: "bg-purple-400",
            wave: "#a855f7",
            gravity: "#a855f7",
        },
        pink: {
            gradient: "from-pink-500/60 via-pink-400/80 to-pink-500/60",
            dot: "bg-pink-400",
            wave: "#ec4899",
            gravity: "#ec4899",
        },
    };

    const config = colorConfig[color];

    if (variant === "simple") {
        return (
            <div className={`h-px bg-gradient-to-r ${config.gradient}`}></div>
        );
    }

    if (variant === "wave") {
        return (
            <div className="relative h-12 overflow-hidden">
                <svg
                    className="absolute bottom-0 w-full h-full"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z"
                        fill={`url(#gradient-${color})`}
                        opacity="0.3"
                    />
                    <defs>
                        <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="50%" stopColor={config.wave} />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        );
    }

    if (variant === "gravity") {
        return (
            <div className="relative h-20 overflow-hidden bg-gradient-to-b from-transparent via-gray-50/30 to-transparent">
                <svg
                    className="absolute top-0 w-full h-full"
                    viewBox="0 0 1200 80"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Enhanced gradient glow effect */}
                    <defs>
                        <linearGradient id={`gravity-gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="25%" stopColor={config.gravity} stopOpacity="0.4" />
                            <stop offset="50%" stopColor={config.gravity} stopOpacity="1" />
                            <stop offset="75%" stopColor={config.gravity} stopOpacity="0.4" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                        <linearGradient id={`gravity-gradient-secondary-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="25%" stopColor={config.gravity} stopOpacity="0.2" />
                            <stop offset="50%" stopColor={config.gravity} stopOpacity="0.6" />
                            <stop offset="75%" stopColor={config.gravity} stopOpacity="0.2" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                        <filter id={`glow-${color}`}>
                            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                        <filter id={`glow-strong-${color}`}>
                            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    
                    {/* Background glow layer */}
                    <motion.path
                        d="M 0,40 Q 300,40 600,60 T 1200,40"
                        stroke={`url(#gravity-gradient-secondary-${color})`}
                        strokeWidth="8"
                        fill="none"
                        filter={`url(#glow-strong-${color})`}
                        opacity="0.4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.4 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        viewport={{ once: true }}
                    />
                    
                    {/* Main glowing path - gravity well curve */}
                    <motion.path
                        d="M 0,40 Q 300,40 600,60 T 1200,40"
                        stroke={`url(#gravity-gradient-${color})`}
                        strokeWidth="5"
                        fill="none"
                        filter={`url(#glow-${color})`}
                        opacity="0.7"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 1.8, ease: "easeInOut" }}
                        viewport={{ once: true }}
                    />
                    
                    {/* Animated path drawing - main line */}
                    <motion.path
                        d="M 0,40 Q 300,40 600,60 T 1200,40"
                        stroke={config.gravity}
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        opacity="0.9"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                        viewport={{ once: true }}
                    />
                    
                    {/* Enhanced particles being pulled toward center (gravity effect) */}
                    {[0, 1, 2, 3, 4, 5, 6].map((particle, index) => {
                        const positions = [
                            { x: 150, y: 40 },
                            { x: 300, y: 42 },
                            { x: 450, y: 48 },
                            { x: 600, y: 60 },
                            { x: 750, y: 48 },
                            { x: 900, y: 42 },
                            { x: 1050, y: 40 },
                        ];
                        const pos = positions[index];
                        return (
                            <motion.g key={particle}>
                                {/* Outer glow */}
                                <motion.circle
                                    cx={pos.x}
                                    cy={pos.y}
                                    r="4"
                                    fill={config.gravity}
                                    opacity="0.3"
                                    initial={{ 
                                        opacity: 0,
                                        scale: 0,
                                        y: pos.y - 25
                                    }}
                                    whileInView={{ 
                                        opacity: [0.3, 0.6, 0.3],
                                        scale: [0, 1.2, 0.9],
                                        y: pos.y
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        delay: index * 0.15,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "easeInOut"
                                    }}
                                    viewport={{ once: false }}
                                />
                                {/* Main particle */}
                                <motion.circle
                                    cx={pos.x}
                                    cy={pos.y}
                                    r="2.5"
                                    fill={config.gravity}
                                    opacity="0.9"
                                    initial={{ 
                                        opacity: 0,
                                        scale: 0,
                                        y: pos.y - 20
                                    }}
                                    whileInView={{ 
                                        opacity: [0.7, 1, 0.7],
                                        scale: [0, 1, 0.8],
                                        y: pos.y
                                    }}
                                    transition={{
                                        duration: 2,
                                        delay: index * 0.2,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "easeInOut"
                                    }}
                                    viewport={{ once: false }}
                                />
                            </motion.g>
                        );
                    })}
                    
                    {/* Animated shimmer effect */}
                    <motion.rect
                        x="0"
                        y="35"
                        width="1200"
                        height="10"
                        fill={`url(#gravity-gradient-${color})`}
                        opacity="0.2"
                        initial={{ x: -1200 }}
                        animate={{ x: 1200 }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 1,
                            ease: "easeInOut"
                        }}
                    />
                </svg>
            </div>
        );
    }

    // Decorative variant (default fallback)
    return (
        <div className="relative h-1 overflow-hidden">
            {/* Main gradient line */}
            <div className={`h-full bg-gradient-to-r ${config.gradient}`}></div>
            
            {/* Decorative dots */}
            <div className="absolute inset-0 flex items-center justify-center gap-2">
                {[0, 1, 2].map((dot) => (
                    <motion.div
                        key={dot}
                        className={`w-1.5 h-1.5 rounded-full ${config.dot}`}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: dot * 0.1, duration: 0.3 }}
                        viewport={{ once: true }}
                    />
                ))}
            </div>
            
            {/* Animated shimmer effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                    x: ["-100%", "100%"],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
        </div>
    );
};

export default SectionDivider;
