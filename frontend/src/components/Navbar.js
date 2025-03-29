import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    // Dynamic background styling based on current page
    const backgroundStyle = isHomePage
        ? {
              backgroundImage: `url(${process.env.PUBLIC_URL}/hero.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
          }
        : {
              backgroundColor: "white", // bg-gray-600 or any color you prefer
          };

    return (
        <div style={backgroundStyle}>
            <nav className="bg-transparent">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center">
                            <img alt="logo" src="./logo.svg" className="w-10" />
                        </div>
                        <div className="hidden md:flex space-x-6 text-xl text-white font-bold">
                            <Link
                                to="/"
                                className="text-green-600 hover:text-white"
                            >
                                Home
                            </Link>
                            <Link
                                to="/tasks"
                                className="text-green-600 hover:text-white"
                            >
                                Feed
                            </Link>
                            <Link
                                to="/leaderboard"
                                className="text-green-600  hover:text-white"
                            >
                                Leaderboard
                            </Link>
                            <Link
                                to="/profile"
                                className="text-green-600 hover:text-white"
                            >
                                Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
