import React from "react";

const Leaderboard = () => {
    const leaderboardData = [
        { rank: 1, name: "Alice", points: 1500 },
        { rank: 2, name: "Bob", points: 1400 },
        { rank: 3, name: "Charlie", points: 1300 },
        { rank: 4, name: "David", points: 1200 },
        { rank: 5, name: "Eve", points: 1100 },
    ];

    return (
        <section
            id="leaderboard"
            className="py-16 bg-gradient-to-b from-blue-500 to-indigo-600 text-white"
        >
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-extrabold mb-6">Leaderboard</h2>
                <div className="bg-white shadow-xl rounded-lg overflow-hidden text-gray-900">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-indigo-500 text-white">
                                <th className="py-4 px-6 text-left text-lg">
                                    Rank
                                </th>
                                <th className="py-4 px-6 text-left text-lg">
                                    User
                                </th>
                                <th className="py-4 px-6 text-left text-lg">
                                    Points
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboardData.map((player, index) => (
                                <tr
                                    key={index}
                                    className={`border-b hover:bg-indigo-100 ${
                                        index % 2 === 0
                                            ? "bg-gray-100"
                                            : "bg-white"
                                    }`}
                                >
                                    <td className="py-4 px-6 font-semibold">
                                        {player.rank}
                                    </td>
                                    <td className="py-4 px-6">{player.name}</td>
                                    <td className="py-4 px-6 font-bold text-indigo-600">
                                        {player.points}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Leaderboard;
