import { Meteor } from "meteor/meteor";
import React from "react";
import { useState } from "react";
import { CommentsCollection } from "../api/CommentsCollection";

const CommentForm = ({ user }) => {
  const [commentText, setCommentText] = useState("");
  // const [commentInfo, setCommentInfo] = useState({
  //   comment: "",
  //   username: user.username,
  // });

  const username = user.username;
  console.log("username", username);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setCommentInfo({...commentInfo, comment:commentText});

    if (!commentText) return;

    Meteor.call("comments.insert", commentText);
    setCommentText("");
    // setCommentInfo({});
  };
  console.log(commentText);
  return (
    <div>
      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          className="comment-input"
          type="text"
          placeholder="Type to add new tasks"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />

        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default CommentForm;
