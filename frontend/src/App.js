import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Feed from "./components/Feed";
import PostActivity from "./components/PostActivity";
import Leaderboard from "./components/Leaderboard";
import Profile from "./components/Profile";

export default function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <div className="p-4">
                    <Routes>
                        <Route path="/" element={<Feed />} />
                        <Route path="/post" element={<PostActivity />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}
