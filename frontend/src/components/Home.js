import React, { useState } from "react";

function Home() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState("");

  const tasks = [
    {
      id: 1,
      name: "Recycle Waste",
      points: 5,
      description: "Snap a photo of your recycling efforts and earn points!",
      iconBg: "bg-green-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>

      ),
    },
    {
      id: 2,
      name: "Carpool",
      points: 20,
      description: "Share a ride to reduce emissions and earn points!",
      iconBg: "bg-blue-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>

      ),
    },
    {
      id: 3,
      name: "Use Reusable Bags",
      points: 20,
      description: "Ditch single-use plastics and show off your reusable bag in a photo.",
      iconBg: "bg-yellow-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>

      ),
    },
    {
      id: 4,
      name: "Bike Instead of Driving",
      points: 50,
      description: "Pedal your way to fewer emissions! Snap a photo of your bike commute.",
      iconBg: "bg-purple-500",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
        id: 5,
        name: "Recycle Waste",
        points: 5,
        description: "Snap a photo of your recycling efforts and earn points!",
        iconBg: "bg-green-500",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
  
        ),
      },
      {
        id: 6,
        name: "Recycle Waste",
        points: 5,
        description: "Snap a photo of your recycling efforts and earn points!",
        iconBg: "bg-green-500",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
  
        ),
      },
  ];

  const handleSubmit = () => {
    // Process the submitted data (e.g., send to a server or update state)
    console.log("Submitted:", { task: selectedTask, photo, comment });
    // Reset modal state
    setSelectedTask(null);
    setPhoto(null);
    setComment("");
  };

  return (
    <div
      className="text-gray-800 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/hero.jpg)`,
        minHeight: "100vh",
      }}
    >

      {/* Hero Section */}
      <header
        id="hero"
        className="relative h-full bg-cover bg-center bg-fixed text-white py-32 flex items-center justify-center"
      >
        <div className="max-w-4xl mx-auto text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Make an Impact with Eco-Elise
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Complete eco-friendly tasks to earn points, compete with friends, and nurture your digital plant as you care for the real world.
          </p>
          <a
            href="#tasks"
            className="bg-white text-green-600 font-semibold py-4 px-8 rounded-full shadow-lg hover:bg-gray-100 transition transform hover:scale-105"
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
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => setSelectedTask(task)}
              >
                <div className="flex items-center mb-4">
                  <div className={`${task.iconBg} text-white p-3 rounded-full`}>
                    {task.icon}
                  </div>
                  <h3 className="ml-4 text-xl font-semibold">{task.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{task.description}</p>
                <p className="text-gray-700 font-bold">{task.points} pts</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for Uploading Image and Adding Comment */}
      {selectedTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-1/2 relative">
            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedTask(null);
                setPhoto(null);
                setComment("");
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedTask.name}</h2>
            <p className="text-gray-600 mb-4">
              Upload an image and add a comment on how you completed this task.
            </p>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Upload a photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-semibold">Add a comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border p-2 w-full rounded"
                placeholder="Optional details..."
              ></textarea>
            </div>
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
