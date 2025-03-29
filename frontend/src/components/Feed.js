import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

function Feed() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openCommentBox, setOpenCommentBox] = useState(null);
    const [commentText, setCommentText] = useState({});
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                // Create a query to get tasks ordered by completion time (newest first)
                const tasksQuery = query(
                    collection(db, "completedTasks"),
                    orderBy("completedAt", "desc")
                );

                const querySnapshot = await getDocs(tasksQuery);
                const tasksData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    // Add empty comments array if it doesn't exist
                    comments: doc.data().comments || [],
                }));

                setPosts(tasksData);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleToggleCommentBox = (postId) => {
        setOpenCommentBox((prev) => (prev === postId ? null : postId));
    };

    const handleCommentChange = (postId, value) => {
        setCommentText((prev) => ({ ...prev, [postId]: value }));
    };

    const handleSubmitComment = async (postId) => {
        if (!currentUser || !commentText[postId]?.trim()) return;

        // Here you would implement the Firestore update to add the comment
        // This would depend on your data structure, but might look like:
        /*
        try {
            const taskRef = doc(db, "tasks", postId);
            await updateDoc(taskRef, {
                comments: arrayUnion({
                    id: Date.now().toString(),
                    name: currentUser.userData?.firstName || currentUser.displayName,
                    text: commentText[postId],
                    createdAt: new Date()
                })
            });
            
            // Update local state to reflect the new comment
            setPosts(prevPosts => 
                prevPosts.map(post => {
                    if (post.id === postId) {
                        return {
                            ...post,
                            comments: [
                                ...post.comments, 
                                {
                                    id: Date.now().toString(),
                                    name: currentUser.userData?.firstName || currentUser.displayName,
                                    text: commentText[postId],
                                    createdAt: new Date()
                                }
                            ]
                        };
                    }
                    return post;
                })
            );
        } catch (error) {
            console.error("Error adding comment:", error);
        }
        */

        // For now, just console log the comment
        console.log(`Comment on post ${postId}:`, commentText[postId]);

        // Clear comment field and close comment box
        setCommentText((prev) => ({ ...prev, [postId]: "" }));
        setOpenCommentBox(null);
    };

    // Format the date in a readable way
    const formatDate = (timestamp) => {
        if (!timestamp) return "";

        const date = timestamp.toDate
            ? timestamp.toDate()
            : new Date(timestamp);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8 text-center text-green-700">
                    Community Feed
                </h1>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <p className="text-gray-600 text-lg">
                            No eco-tasks completed yet. Be the first!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden"
                            >
                                {/* Post header with user info and task details */}
                                <div className="px-6 py-4 border-b border-gray-100">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-bold text-gray-800">
                                            {post.userName}
                                        </h2>
                                        <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                                            {post.taskName} ({post.points} pts)
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-sm mt-1">
                                        {formatDate(post.completedAt)}
                                    </p>
                                </div>

                                {/* Post image */}
                                <div className="relative pb-2/3">
                                    <img
                                        src={post.imageUrl}
                                        alt={`${post.userName}'s eco task`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                "/placeholder-image.jpg"; // Fallback image
                                        }}
                                    />
                                </div>

                                {/* Caption */}
                                <div className="px-6 py-4">
                                    <p className="text-gray-800">
                                        <span className="font-semibold">
                                            {post.userName}:{" "}
                                        </span>
                                        {post.caption}
                                    </p>
                                </div>

                                {/* Comments section */}
                                {post.comments && post.comments.length > 0 && (
                                    <div className="px-6 py-2 bg-gray-50">
                                        <h3 className="text-sm font-semibold text-gray-600 mb-2">
                                            Comments:
                                        </h3>
                                        {post.comments.map((comment) => (
                                            <div
                                                key={comment.id}
                                                className="mb-2 last:mb-0"
                                            >
                                                <p className="text-gray-800">
                                                    <span className="font-semibold">
                                                        {comment.name}:{" "}
                                                    </span>
                                                    {comment.text}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Add comment section */}
                                <div className="px-6 py-4 border-t border-gray-100">
                                    {openCommentBox === post.id ? (
                                        <div>
                                            <textarea
                                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                                                rows="2"
                                                placeholder="Add a comment..."
                                                value={
                                                    commentText[post.id] || ""
                                                }
                                                onChange={(e) =>
                                                    handleCommentChange(
                                                        post.id,
                                                        e.target.value
                                                    )
                                                }
                                            ></textarea>
                                            <div className="flex justify-end mt-2 space-x-2">
                                                <button
                                                    onClick={() =>
                                                        setOpenCommentBox(null)
                                                    }
                                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleSubmitComment(
                                                            post.id
                                                        )
                                                    }
                                                    className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-full hover:bg-green-600 transition"
                                                    disabled={
                                                        !commentText[
                                                            post.id
                                                        ]?.trim()
                                                    }
                                                >
                                                    Post
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                handleToggleCommentBox(post.id)
                                            }
                                            className="w-full px-4 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-full hover:bg-green-100 transition flex items-center justify-center"
                                        >
                                            <svg
                                                className="w-4 h-4 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                                ></path>
                                            </svg>
                                            Add Comment
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Feed;
