import React, { useState } from "react";
import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);

            // Redirect to profile page after successful login
            navigate("/profile");
        } catch (err) {
            console.error("Error during login:", err);

            // Provide user-friendly error messages
            if (
                err.code === "auth/user-not-found" ||
                err.code === "auth/wrong-password"
            ) {
                setError("Invalid email or password. Please try again.");
            } else if (err.code === "auth/too-many-requests") {
                setError(
                    "Too many failed login attempts. Please try again later."
                );
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError(null);

        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);

            // Redirect to profile page after successful login
            navigate("/");
        } catch (err) {
            console.error("Error during Google login:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen pt-12 pb-20">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Welcome Back
                </h2>
                <p className="text-gray-600 text-center mb-8">
                    Log in to continue your eco-friendly journey and see how
                    your plant is growing.
                </p>

                <form onSubmit={handleEmailLogin} className="space-y-6">
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
                            required
                        />
                        <div className="flex justify-end">
                            <a
                                href="/forgot-password"
                                className="text-sm text-green-600 hover:underline mt-1"
                            >
                                Forgot Password?
                            </a>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            <p>{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 px-4 rounded-full font-medium text-white ${
                            loading
                                ? "bg-green-400"
                                : "bg-green-600 hover:bg-green-700"
                        } transition duration-300`}
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>

                <div className="relative py-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">
                            Or continue with
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full py-3 px-4 border border-gray-300 rounded-full flex justify-center items-center space-x-2 hover:bg-gray-50 transition duration-300"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    <span>Google</span>
                </button>

                <p className="text-center text-gray-600 mt-6">
                    Don't have an account?{" "}
                    <a
                        href="/signup"
                        className="text-green-600 hover:underline"
                    >
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
