import React from 'react';

function App() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <span className="font-bold text-xl text-green-600">EcoElise</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-green-600">Home</a>
              <a href="#" className="text-gray-600 hover:text-green-600">Tasks</a>
              <a href="#" className="text-gray-600 hover:text-green-600">Leaderboard</a>
              <a href="#" className="text-gray-600 hover:text-green-600">Profile</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Make an Impact with EcoElise</h1>
          <p className="text-lg md:text-xl mb-8">
            Complete eco-friendly tasks, snap a picture, earn points, and nurture your digital plant as you improve the real world.
          </p>
          <a 
            href="#tasks" 
            className="bg-white text-green-600 font-semibold py-3 px-6 rounded-full shadow hover:bg-gray-100 transition"
          >
            Get Started
          </a>
        </div>
      </header>

      {/* Tasks Section */}
      <section id="tasks" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Eco-Friendly Tasks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Task Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="flex items-center mb-4">
                <div className="bg-green-500 text-white p-3 rounded-full">
                  <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="ml-4 text-xl font-semibold">Recycle Challenge</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Snap a photo of your recycling efforts and earn points!
              </p>
              <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">
                Complete Task
              </button>
            </div>

            {/* Task Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500 text-white p-3 rounded-full">
                  <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 10h4l3-7 4 18 3-7h4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="ml-4 text-xl font-semibold">Bike to Work</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Show off your eco-friendly commute by uploading a snapshot of your ride.
              </p>
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                Complete Task
              </button>
            </div>

            {/* Task Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-500 text-white p-3 rounded-full">
                  <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2a10 10 0 110 20 10 10 0 010-20z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="ml-4 text-xl font-semibold">Plant a Tree</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Document your tree-planting journey and help the planet grow greener.
              </p>
              <button className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition">
                Complete Task
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section id="leaderboard" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Leaderboard</h2>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3 px-6 text-left">Rank</th>
                  <th className="py-3 px-6 text-left">User</th>
                  <th className="py-3 px-6 text-left">Points</th>
                </tr>
              </thead>
              <tbody>
                {/* Sample leaderboard rows */}
                <tr className="border-b hover:bg-gray-100">
                  <td className="py-4 px-6">1</td>
                  <td className="py-4 px-6">Alice</td>
                  <td className="py-4 px-6">1500</td>
                </tr>
                <tr className="border-b hover:bg-gray-100">
                  <td className="py-4 px-6">2</td>
                  <td className="py-4 px-6">Bob</td>
                  <td className="py-4 px-6">1400</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="py-4 px-6">3</td>
                  <td className="py-4 px-6">Charlie</td>
                  <td className="py-4 px-6">1300</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2025 EcoElise. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
