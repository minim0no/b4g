import React, { useEffect, useState } from "react";

// Simple SVG icons as components to replace Lucide dependencies
const DropletIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-green-500"
    >
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
    </svg>
);

const AwardIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-green-600 mr-2"
        style={{ width: "24px", height: "24px" }}
    >
        <circle cx="12" cy="8" r="7"></circle>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
    </svg>
);

const ChevronRightIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: "16px", height: "16px" }}
    >
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);

const WaterFillCard = ({
    totalPoints = 0,
    maxPoints = 100,
    rankImage,
    rankName = "Seedling",
}) => {
    // Add default values to prevent undefined errors
    const safeTotal = totalPoints || 0;
    const safeMax = maxPoints || 100;

    // Calculate the percentage of fill (capped at 100%)
    const percentage = Math.min(100, (safeTotal / safeMax) * 100);
    // Calculate points remaining until next tier
    const pointsTillNext = Math.max(0, safeMax - safeTotal);
    // Animation for counting up points
    const [animatedPoints, setAnimatedPoints] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedPoints(safeTotal);
        }, 300);

        return () => clearTimeout(timer);
    }, [safeTotal]);

    // Wave animation effect
    const [wavePosition, setWavePosition] = useState(0);

    useEffect(() => {
        const waveAnimation = setInterval(() => {
            setWavePosition((prev) => (prev + 1) % 40);
        }, 100);

        return () => clearInterval(waveAnimation);
    }, []);

    // Choose appropriate water color based on fill percentage
    const getWaterColor = () => {
        if (percentage < 30) return "from-green-300 to-green-400";
        if (percentage < 70) return "from-green-400 to-green-500";
        return "from-green-500 to-green-600";
    };

    // Safe number formatting function to prevent errors
    const formatNumber = (num) => {
        if (num === undefined || num === null) return "0";
        return num.toLocaleString();
    };

    return (
        <div className="bg-white rounded-lg shadow p-8 h-full flex flex-col">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Your Progress
            </h2>

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <AwardIcon />
                    <h3 className="text-xl font-bold text-gray-800">
                        {rankName}
                    </h3>
                </div>
                <div className="bg-green-100 px-3 py-1 rounded-full">
                    <span className="text-green-600 font-medium">
                        {formatNumber(animatedPoints)} pts
                    </span>
                </div>
            </div>

            {/* Rank Image */}
            <div className="flex justify-center mb-6">
                <div className="w-32 h-32 bg-white-100 rounded-full border-2 border-green-300 flex items-center justify-center p-1 shadow-inner">
                    {rankImage ? (
                        <img
                            src={rankImage}
                            alt={rankName || "Rank"}
                            className="w-26 h-26 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-9 h-9">
                            <DropletIcon />
                        </div>
                    )}
                </div>
            </div>

            {/* Water Tank - Increased height to match profile card */}
            <div className="relative h-80 bg-gradient-to-br from-gray-100 to-white rounded-lg shadow-inner border border-gray-200 overflow-hidden mb-4 flex-grow">
                {/* Fixed water fill to ensure it appears from the bottom */}
                <div
                    className={`absolute bottom-0 left-0 right-0 bg-gradient-to-b ${getWaterColor()} transition-all duration-1000 ease-out`}
                    style={{
                        height: `${percentage}%`,
                        // clipPath: `polygon(
                        //   0% 100%,
                        //   ${wavePosition}% 97%,
                        //   ${wavePosition + 10}% 99%,
                        //   ${wavePosition + 20}% 97%,
                        //   ${wavePosition + 30}% 99%,
                        //   100% 97%,
                        //   100% 100%,
                        //   0% 100%
                        // )`
                    }}
                >
                    {/* Subtle wave overlay */}
                    <div className="absolute top-0 left-0 w-full h-6 bg-white opacity-30 transform translate-y-1"></div>
                </div>

                {/* Level indicators */}
                {[25, 50, 75].map((level) => (
                    <div
                        key={level}
                        className="absolute w-full border-t border-dashed border-gray-300 flex items-center justify-end px-2"
                        style={{
                            bottom: `${level}%`,
                            opacity: percentage >= level ? 0.3 : 0.7,
                        }}
                    >
                        <span className="text-xs text-gray-500">{level}%</span>
                    </div>
                ))}

                {/* Progress information */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <div
                        className={`text-3xl font-bold ${
                            percentage > 50 ? "text-green-800" : "text-gray-800"
                        } transition-colors duration-500`}
                    >
                        {Math.round(percentage)}%
                    </div>
                    <div
                        className={`text-sm mt-2 ${
                            percentage > 50 ? "text-green-800" : "text-gray-600"
                        } transition-colors duration-500`}
                    >
                        <span>
                            {formatNumber(pointsTillNext)} points to next level
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WaterFillCard;
