import React from "react";

function Home() {
    return (
        <div
            className="text-gray-800 bg-cover bg-center bg-fixed"
            style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/hero.jpg)`,
                minHeight: "100vh", // Ensures the background covers the entire height
            }}
        >
            <div className="h-full">
                <header
                    id="hero"
                    className="relative h-full bg-cover bg-center bg-fixed text-white py-32 flex items-center justify-center"
                >
                    <div className="max-w-4xl mx-auto text-center px-6">
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
                            Make an Impact with Eco-Elise
                        </h1>
                        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                            Complete eco-friendly tasks, snap a picture, earn
                            points, and nurture your digital plant as you
                            improve the real world.
                        </p>
                        <a
                            href="#tasks"
                            className="bg-white text-green-600 font-semibold py-4 px-8 rounded-full shadow-lg hover:bg-gray-100 transition transform hover:scale-105"
                        >
                            Get Started
                        </a>
                    </div>
                </header>
            </div>

            {/* Tasks Section */}
            <section id="tasks" className="py-16 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-10">
                        Eco-Friendly Tasks
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Task Card 1 */}
                        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                            <div className="flex items-center mb-4">
                                <div className="bg-green-500 text-white p-3 rounded-full">
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M12 8v4l3 3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <h3 className="ml-4 text-xl font-semibold">
                                    Recycle Challenge
                                </h3>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Snap a photo of your recycling efforts and earn
                                points!
                            </p>
                            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">
                                Complete Task
                            </button>
                        </div>

                        {/* Task Card 2 */}
                        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                            <div className="flex items-center mb-4">
                                <div className="bg-blue-500 text-white p-3 rounded-full">
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M3 10h4l3-7 4 18 3-7h4"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <h3 className="ml-4 text-xl font-semibold">
                                    Bike to Work
                                </h3>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Show off your eco-friendly commute by uploading
                                a snapshot of your ride.
                            </p>
                            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                                Complete Task
                            </button>
                        </div>

                        {/* Task Card 3 */}
                        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                            <div className="flex items-center mb-4">
                                <div className="bg-yellow-500 text-white p-3 rounded-full">
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M12 2a10 10 0 110 20 10 10 0 010-20z"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M12 8v4l3 3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <h3 className="ml-4 text-xl font-semibold">
                                    Plant a Tree
                                </h3>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Document your tree-planting journey and help the
                                planet grow greener.
                            </p>
                            <button className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition">
                                Complete Task
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
