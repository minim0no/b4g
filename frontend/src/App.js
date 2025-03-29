import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Leaderboard from "./components/Leaderboard";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";
import Feed from "./components/Feed";
import EliseChatbot from "./components/EliseChatbot";

function App() {
    return (
        <AuthProvider>
            <div className="font-mont">
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/feed" element={<Feed />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                    <EliseChatbot />
                </Router>
            </div>
        </AuthProvider>
    );
}

export default App;
