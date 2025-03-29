import React, { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Leaderboard = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                console.log("Attempting to fetch users...");
                const userQuery = query(
                    collection(db, "users"),
                    orderBy("ecoPoints", "desc")
                );

                const querySnapshot = await getDocs(userQuery);
                console.log("Query returned", querySnapshot.size, "documents");

                // Log each document to see what's coming back
                querySnapshot.forEach((doc) => console.log(doc.id, doc.data()));

                const userData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    comments: doc.data().comments || [],
                }));

                console.log("Processed user data:", userData);
                setUsers(userData);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Gradient colors based on the mint theme (#e5f6df)
    const getRowColor = (index) => {
        const colors = [
            "bg-gradient-to-r from-green-400 to-green-300", // First place
            "bg-gradient-to-r from-green-300 to-green-200", // Second place
            "bg-gradient-to-r from-green-200 to-green-100", // Third place
            "bg-gradient-to-r from-teal-200 to-teal-100", // Fourth place
            "bg-gradient-to-r from-blue-200 to-blue-100", // Fifth place
        ];

        // If we have more than 5 users, repeat the last color
        return index < 5
            ? colors[index]
            : "bg-gradient-to-r from-gray-200 to-gray-100";
    };

    return loading ? (
        <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
    ) : users.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600 text-lg">
                No eco-tasks completed yet. Be the first!
            </p>
        </div>
    ) : (
        <section
            id="leaderboard"
            className="min-h-screen w-full bg-white pt-14 px-4"
        >
            <div className="max-w-3xl mx-auto">
                {/* Leaderboard Title */}
                <h2 className="text-5xl font-bold text-gray-800 mb-10 text-center">
                    LEADERBOARD
                </h2>

                {/* Leaderboard Items */}
                <div className="space-y-4">
                    {users.map((player, index) => (
                        <div
                            key={player.id}
                            className={`flex items-center rounded-full ${getRowColor(
                                index
                            )} p-1 shadow-md`}
                        >
                            <div className="bg-yellow-300 rounded-full p-1 ml-1">
                                {player.photoURL ? (
                                    <img
                                        src={player.photoURL}
                                        alt={`${player.firstName} avatar`}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500 text-xl font-bold">
                                            {player.firstName?.charAt(0) || "?"}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 ml-4">
                                <div className="text-xl font-bold text-gray-800">
                                    {player.firstName || "User"}
                                </div>
                                <div className="text-sm text-gray-600">
                                    Eco Enthusiast
                                </div>
                            </div>
                            <div className="text-2xl font-bold mr-6 text-gray-800">
                                {player.ecoPoints || 0}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Leaderboard;
