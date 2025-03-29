import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
    collection,
    addDoc,
    updateDoc,
    arrayUnion,
    doc,
} from "firebase/firestore";
import { db, storage } from "../firebase";

function Home() {
    const [selectedTask, setSelectedTask] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [caption, setCaption] = useState("");
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const { currentUser } = useAuth();

    const tasks = [
        {
            id: 1,
            name: "Recycle Waste",
            points: 5,
            description:
                "Snap a photo of your recycling efforts and earn points!",
            iconBg: "bg-green-500",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                    />
                </svg>
            ),
        },
        {
            id: 3,
            name: "Use Reusable Bags",
            points: 20,
            description:
                "Ditch single-use plastics and show off your reusable bag in a photo.",
            iconBg: "bg-yellow-500",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                </svg>
            ),
        },
        {
            id: 4,
            name: "Bike Instead of Driving",
            points: 50,
            description:
                "Pedal your way to fewer emissions! Snap a photo of your bike commute.",
            iconBg: "bg-purple-500",
            icon: (
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M5 13l4 4L19 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
        {
            id: 5,
            name: "Plant a Tree",
            points: 50,
            description:
                "Plant a tree or garden plant and document your contribution!",
            iconBg: "bg-green-600",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                    />
                </svg>
            ),
        },
        {
            id: 6,
            name: "Skip Single-Use Plastics",
            points: 10,
            description:
                "Avoid single-use plastics for a day and document your alternatives!",
            iconBg: "bg-red-500",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                    />
                </svg>
            ),
        },
    ];

    const handleSubmit = async () => {
        // Validation
        if (!currentUser) {
            setError("You must be logged in to submit tasks");
            return;
        }

        if (!photo) {
            setError("Please upload a photo");
            return;
        }

        setError("");
        setUploading(true);
        setUploadProgress(0);

        try {
            // 1. Upload image to Firebase Storage
            const storageRef = ref(
                storage,
                `task-images/${currentUser.uid}/${Date.now()}_${photo.name}`
            );
            const uploadTask = uploadBytesResumable(storageRef, photo);

            // 2. Track upload progress
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error("Upload error:", error);
                    setError("Failed to upload image. Please try again.");
                    setUploading(false);
                },
                async () => {
                    // 3. Get download URL
                    const downloadURL = await getDownloadURL(
                        uploadTask.snapshot.ref
                    );

                    // 4. Save task completion to Firestore
                    const taskData = {
                        userId: currentUser.uid,
                        userName:
                            currentUser.userData?.firstName +
                                " " +
                                currentUser.userData?.lastName ||
                            currentUser.displayName,
                        taskId: selectedTask.id,
                        taskName: selectedTask.name,
                        points: selectedTask.points,
                        imageUrl: downloadURL,
                        caption: caption,
                        completedAt: new Date(),
                    };

                    // 5. Add task to completed tasks collection
                    const taskDocRef = await addDoc(
                        collection(db, "completedTasks"),
                        taskData
                    );

                    // 6. Update user's eco points and task history
                    const userDocRef = doc(db, "users", currentUser.uid);
                    await updateDoc(userDocRef, {
                        ecoPoints:
                            (currentUser.userData?.ecoPoints || 0) +
                            selectedTask.points,
                        taskHistory: arrayUnion({
                            id: taskDocRef.id,
                            name: selectedTask.name,
                            points: selectedTask.points,
                            date: new Date(),
                            imageUrl: downloadURL,
                        }),
                    });

                    // 7. Show success message
                    setSuccess(true);
                    setUploading(false);

                    // 8. Reset form after delay
                    setTimeout(() => {
                        setSelectedTask(null);
                        setPhoto(null);
                        setCaption("");
                        setSuccess(false);
                    }, 3000);
                }
            );
        } catch (err) {
            console.error("Error submitting task:", err);
            setError("Failed to submit task. Please try again.");
            setUploading(false);
        }
    };

    const resetModal = () => {
        setSelectedTask(null);
        setPhoto(null);
        setCaption("");
        setError("");
        setSuccess(false);
        setUploadProgress(0);
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
                        Complete eco-friendly tasks to earn points, compete with
                        friends, and nurture your digital plant as you care for
                        the real world.
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
                    <h2 className="text-3xl font-bold text-center mb-10">
                        Eco-Friendly Tasks
                    </h2>

                    {!currentUser && (
                        <div className="mb-8 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                            <p className="text-center text-yellow-700">
                                <a
                                    href="/login"
                                    className="font-semibold underline"
                                >
                                    Sign in
                                </a>{" "}
                                or{" "}
                                <a
                                    href="/profile"
                                    className="font-semibold underline"
                                >
                                    create an account
                                </a>{" "}
                                to start completing tasks and earning points!
                            </p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                                onClick={() =>
                                    currentUser && setSelectedTask(task)
                                }
                            >
                                <div className="flex items-center mb-4">
                                    <div
                                        className={`${task.iconBg} text-white p-3 rounded-full`}
                                    >
                                        {task.icon}
                                    </div>
                                    <h3 className="ml-4 text-xl font-semibold">
                                        {task.name}
                                    </h3>
                                </div>
                                <p className="text-gray-600 mb-4">
                                    {task.description}
                                </p>
                                <p className="text-gray-700 font-bold">
                                    {task.points} pts
                                </p>
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
                            onClick={resetModal}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        <h2 className="text-2xl font-bold mb-4">
                            {selectedTask.name}
                        </h2>

                        {success ? (
                            <div className="text-center py-8">
                                <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
                                    <svg
                                        className="w-12 h-12 mx-auto mb-2 text-green-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        ></path>
                                    </svg>
                                    <h3 className="text-xl font-bold mb-2">
                                        Task Completed!
                                    </h3>
                                    <p>
                                        You earned {selectedTask.points} eco
                                        points!
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <p className="text-gray-600 mb-4">
                                    Upload an image and add a caption to show
                                    how you completed this task.
                                </p>

                                {error && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                        {error}
                                    </div>
                                )}

                                <div className="mb-4">
                                    <label className="block mb-2 font-semibold">
                                        Upload a photo
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setPhoto(e.target.files[0])
                                        }
                                        className="border p-2 w-full"
                                        disabled={uploading}
                                    />
                                    {photo && (
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Selected: {photo.name}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="mb-6">
                                    <label className="block mb-2 font-semibold">
                                        Add a caption
                                    </label>
                                    <textarea
                                        value={caption}
                                        onChange={(e) =>
                                            setCaption(e.target.value)
                                        }
                                        className="border p-2 w-full rounded"
                                        placeholder="Share details about how you completed this task..."
                                        disabled={uploading}
                                    ></textarea>
                                </div>

                                {uploading && (
                                    <div className="mb-6">
                                        <div className="bg-gray-200 rounded-full h-2.5 mb-2">
                                            <div
                                                className="bg-green-600 h-2.5 rounded-full"
                                                style={{
                                                    width: `${uploadProgress}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <p className="text-sm text-gray-500 text-center">
                                            Uploading: {uploadProgress}%
                                        </p>
                                    </div>
                                )}

                                <button
                                    onClick={handleSubmit}
                                    disabled={uploading}
                                    className={`${
                                        uploading
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-green-500 hover:bg-green-600"
                                    } text-white py-2 px-4 rounded transition w-full`}
                                >
                                    {uploading
                                        ? "Uploading..."
                                        : "Complete Task"}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
