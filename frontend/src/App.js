import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Leaderboard from "./components/Leaderboard";
import Tasks from "./components/Tasks";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <AuthProvider>
            <div className="font-mont">
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/tasks" element={<Tasks />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </Router>
            </div>
        </AuthProvider>
    );
}

export default App;
