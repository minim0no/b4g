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
            className="min-h-screen w-full bg-white text-white pt-14"
        >
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-extrabold mb-14 text-black ">
                    Leaderboard
                </h2>
                <div className="bg-white shadow-xl rounded-lg overflow-hidden text-gray-900">
                    <table className="min-w-full border-collapse text-center">
                        <thead>
                            <tr className=" text-black">
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
                            {users.map((player, index) => (
                                <tr
                                    key={player.id}
                                    className={`border-b hover:bg-indigo-100 ${
                                        index % 2 === 0
                                            ? "bg-gray-100"
                                            : "bg-white"
                                    }`}
                                >
                                    <td className="py-4 px-6 font-semibold text-left">
                                        {index + 1}
                                    </td>
                                    <td className="py-4 px-6 font-semibold text-left">
                                        {player.firstName}
                                    </td>
                                    <td className="py-4 px-6 font-semibold text-left">
                                        {player.ecoPoints}
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
