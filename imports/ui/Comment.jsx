import React from "react";
import { useTracker } from "meteor/react-meteor-data";

const Comment = ({ c, onCheckboxClick, onDeleteClick }) => {
  const user = useTracker(() => Meteor.user());

  const deleteComment = () => {
    if (user._id === c.userId) {
      onDeleteClick(c);
    } else {
      alert("You are only allowed to delete your comment...");
    }
  };

  return (
    <>
      {c.comment ? (
        <li className="comments-list">
          <input
            type="checkbox"
            checked={!!c.isChecked}
            onClick={() => onCheckboxClick(c)}
            readOnly
          />
          <div className="comment-text">
            <span className="comment-text">{c.comment}</span>
          </div>

          <span
            className=""
            style={{
              backgroundColor: "goldenrod",
              color: "white",
              padding: "5px",
              borderRadius: "4px",
              marginRight: "10px",
            }}
          >
            {c.username}
          </span>
          <button
            className="comment-btn btn-danger"
            onClick={() => deleteComment(c)}
          >
            &times;
          </button>
        </li>
      ) : (
        <h2 className="text-center ">Please add a comment...</h2>
      )}
    </>
  );
};

export default Comment;
