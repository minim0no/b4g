import React, { useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import WaterFillCard from "./WaterFillCard"; // adjust the path as needed

const Profile = () => {
    // User authentication state
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Registration form states (for sign up)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // User profile data
    const [profileData, setProfileData] = useState(null);

    // Check if user is logged in and fetch profile data
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);

            if (currentUser) {
                try {
                    const userDoc = await getDoc(
                        doc(db, "users", currentUser.uid)
                    );
                    if (userDoc.exists()) {
                        setProfileData(userDoc.data());
                    }
                    setUser(currentUser);
                } catch (err) {
                    console.error("Error fetching user data:", err);
                    setError("Failed to load profile data.");
                }
            } else {
                setUser(null);
                setProfileData(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleSignup = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        setError(null);

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const newUser = userCredential.user;

            await updateProfile(newUser, {
                displayName: `${firstName} ${lastName}`,
            });

            await setDoc(doc(db, "users", newUser.uid), {
                firstName,
                lastName,
                email,
                createdAt: new Date(),
                ecoPoints: 0,
                taskHistory: [],
            });

            setSuccess(true);

            // Reset form
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
        } catch (err) {
            console.error("Error during signup:", err);
            setError(err.message);
        } finally {
            setFormLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div
                        className="spinner-border text-green-600"
                        role="status"
                    >
                        <span className="sr-only">Loading...</span>
                    </div>
                    <p className="mt-2 text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    // When user is logged in and profile data exists, display profile and water fill cards side by side
    if (user && profileData) {
        // Determine rank details and threshold for water fill card based on ecoPoints
        // Adjust thresholds and rank images as needed
        let rankName = "Seedling";
        let rankImage = "./seed.png"; // Replace with your image URL
        let maxPoints = 100;

        if (profileData.ecoPoints >= 100 && profileData.ecoPoints < 250) {
            rankName = "Blooming";
            rankImage = "./flower2.png"; // Replace with your image URL
            maxPoints = 250;
        } else if (
            profileData.ecoPoints >= 250 &&
            profileData.ecoPoints < 500
        ) {
            rankName = "Flourishing";
            rankImage = "./flower3.png"; // Replace with your image URL
            maxPoints = 500;
        } else if (profileData.ecoPoints >= 500) {
            rankName = "Thriving";
            rankImage = "./flower4.png"; // Replace with your image URL
            maxPoints = 1000;
        }

        return (
            <div className="bg-gray-100 min-h-screen pt-12 pb-20">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Flex container for side-by-side layout */}
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Profile Card */}
                        <div className="flex-1 bg-white rounded-lg shadow p-8">
                            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                                Your Profile
                            </h2>

                            <div className="text-center mb-8">
                                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-green-600 text-2xl font-bold">
                                        {profileData.firstName?.charAt(0)}
                                        {profileData.lastName?.charAt(0)}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">
                                    {profileData.firstName}{" "}
                                    {profileData.lastName}
                                </h3>
                                <p className="text-gray-600">{user.email}</p>
                            </div>

                            <div className="border-t border-gray-200 pt-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-700 font-medium">
                                        Eco Points
                                    </span>
                                    <span className="text-green-600 font-bold text-xl">
                                        {profileData.ecoPoints || 0}
                                    </span>
                                </div>

                                <h4 className="text-lg font-bold text-gray-800 mb-4">
                                    Recent Activities
                                </h4>

                                {profileData.taskHistory &&
                                profileData.taskHistory.length > 0 ? (
                                    <div className="space-y-3">
                                        {profileData.taskHistory.map(
                                            (task, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-gray-50 p-3 rounded flex justify-between items-center"
                                                >
                                                    <div>
                                                        <p className="font-medium">
                                                            {task.name}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {task.date
                                                                ?.toDate()
                                                                .toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <span className="text-green-600">
                                                        +{task.points} pts
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-500 py-4">
                                        No activities recorded yet. Start
                                        completing eco-tasks to see them here!
                                    </p>
                                )}
                            </div>

                            <div className="mt-8 flex justify-center">
                                <button
                                    onClick={() => auth.signOut()}
                                    className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>

                        {/* Water Fill Card */}
                        <div className="flex-1">
                            <WaterFillCard
                                totalPoints={profileData.ecoPoints || 0}
                                maxPoints={maxPoints}
                                rankImage={rankImage}
                                rankName={rankName}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // If user is not logged in, show registration form
    return (
        <div className="bg-gray-100 min-h-screen pt-12 pb-20">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Join Eco-Elise
                </h2>
                <p className="text-gray-600 text-center mb-8">
                    Create an account to start tracking your eco-friendly
                    activities and grow your digital plant.
                </p>

                {success ? (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                        <p className="font-bold">Success!</p>
                        <p>
                            Your account has been created. Start making an
                            impact today!
                        </p>
                        <a
                            href="/login"
                            className="text-green-600 hover:underline"
                        >
                            Log In
                        </a>
                    </div>
                ) : (
                    <form onSubmit={handleSignup} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="firstName"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="lastName"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                minLength="6"
                                required
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Must be at least 6 characters
                            </p>
                        </div>

                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                <p>{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={formLoading}
                            className={`w-full py-3 px-4 rounded-full font-medium text-white ${
                                formLoading
                                    ? "bg-green-400"
                                    : "bg-green-600 hover:bg-green-700"
                            } transition duration-300`}
                        >
                            {formLoading ? "Creating Account..." : "Sign Up"}
                        </button>

                        <p className="text-center text-gray-600 mt-4">
                            Already have an account?{" "}
                            <a
                                href="/login"
                                className="text-green-600 hover:underline"
                            >
                                Log In
                            </a>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Profile;
