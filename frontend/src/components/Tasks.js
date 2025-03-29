import React, { useState } from "react";

function Feed() {
  // Sample post data with local .jpg image references from your public folder
  const dummyPosts = [
    {
      id: 1,
      userName: "Megan",
      task: "Recycled Waste (5 pts)",
      imageUrl: "/meganrecycles.jpg", // Ensure this file is in your public folder
      mainComment: {
        name: "Megan",
        text: "Bye bye bottles!",
      },
      comments: [
        { id: 1, name: "Nick", text: "Nice work, Megan!" },
        { id: 2, name: "Alex", text: "Way to go!" },
      ],
    },
    {
      id: 2,
      userName: "Alex",
      task: "Carpooled (20 pts)",
      imageUrl: "/alexcarpooling.jpg", // Ensure this file is in your public folder
      mainComment: {
        name: "Alex",
        text: "Off to work!",
      },
      comments: [{ id: 1, name: "Megan", text: "Carpooling is awesome!" }],
    },
    {
      id: 3,
      userName: "Anna",
      task: "Used Reusable Bags (20 pts)",
      imageUrl: "/meganbags.jpg", // Ensure this file is in your public folder
      mainComment: {
        name: "Anna",
        text: "Plastic-free shopping trip!",
      },
      comments: [
        { id: 1, name: "Alex", text: "Way to reduce waste!" }
      ],
    },
  ];

  // Track which post’s comment box is open (store the post ID)
  const [openCommentBox, setOpenCommentBox] = useState(null);
  // Track comment input for each post (keyed by post.id)
  const [commentText, setCommentText] = useState({});

  const handleToggleCommentBox = (postId) => {
    // Toggle the comment box visibility for the given post
    setOpenCommentBox((prev) => (prev === postId ? null : postId));
  };

  const handleCommentChange = (postId, value) => {
    setCommentText((prev) => ({ ...prev, [postId]: value }));
  };

  const handleSubmitComment = (postId) => {
    console.log(`Submitted comment for post ${postId}:`, commentText[postId]);
    // Clear the comment input for the post
    setCommentText((prev) => ({ ...prev, [postId]: "" }));
    // Optionally close the comment box after submission
    setOpenCommentBox(null);
  };

  return (
    <div className="bg-white-100 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Community Feed</h1>

        {/* Two-column layout on medium screens and up */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {dummyPosts.map((post) => (
            <div key={post.id} className="bg-white rounded shadow p-4">
              {/* Post header: user name & task */}
              <h2 className="text-xl font-bold">
                {post.userName} {post.task}
              </h2>

              {/* Post image - using h-auto to let the card adjust dynamically */}
              <img
                src={post.imageUrl}
                alt="User post"
                className="mt-4 w-full h-auto object-cover rounded"
              />

              {/* Main user comment */}
              <div className="mt-4">
                <p className="font-semibold">{post.mainComment.name}</p>
                <p>{post.mainComment.text}</p>
              </div>

              {/* Additional comments */}
              <div className="mt-4">
                {post.comments.length > 0 && (
                  <p className="font-semibold mb-2">Comments:</p>
                )}
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start mb-2">
                    <span className="font-semibold mr-2">{comment.name}:</span>
                    <span>{comment.text}</span>
                  </div>
                ))}
              </div>

              {/* Comment Section */}
              <div className="mt-4">
                {openCommentBox === post.id ? (
                  // When comment box is open: show text area and an oval "Comment" button
                  <div>
                    <textarea
                      className="border p-2 w-full rounded"
                      placeholder="Write a comment..."
                      value={commentText[post.id] || ""}
                      onChange={(e) =>
                        handleCommentChange(post.id, e.target.value)
                      }
                    />
                    <button
                      onClick={() => handleSubmitComment(post.id)}
                      className="mt-2 bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition"
                    >
                      Comment
                    </button>
                  </div>
                ) : (
                  // When comment box is closed: show only the oval "Comment" button
                  <button
                    onClick={() => handleToggleCommentBox(post.id)}
                    className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 transition"
                  >
                    Comment
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feed;
