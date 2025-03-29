import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Leaderboard from "./components/Leaderboard";
import Tasks from "./components/Tasks";
import Profile from "./components/Profile";
import Home from "./components/Home";
import EliseChatbot from './components/EliseChatbot';


function App() {
    return (
        <div className="font-mont">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            <EliseChatbot />
            </Router>
        </div>
    );
}

export default App;
