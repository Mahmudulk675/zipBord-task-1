import { Meteor } from "meteor/meteor";
import React from "react";
import { useState } from "react";

const CommentForm = ({ user }) => {
  const [commentText, setCommentText] = useState("");

  const username = user.username;
  console.log("username", username);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!commentText) return;

    Meteor.call("comments.insert", commentText);
    setCommentText("");
  };
  console.log(commentText);
  return (
    <div>
      <form className="comment-form mt-5" onSubmit={handleSubmit}>
        <input
          className="comment-input"
          type="text"
          placeholder="Add a new comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />

        <button type="submit" class="bg-primary" style={{ color: "white" }}>
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
