import React from "react";

const Comment = ({ c, onCheckboxClick, onDeleteClick }) => {
  console.log(c);
  return (
    <div>
      hiiii
      <li className="comments-list">
        <input
          type="checkbox"
          checked={!!c.isChecked}
          onClick={() => onCheckboxClick(c)}
          readOnly
        />
        <div className="comment-text-div">
          <span className="comment-text">{c.comment}</span>
        </div>

        <span
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
        <button className="comment-btn" onClick={() => onDeleteClick(c)}>
          &times;
        </button>
      </li>
    </div>
  );
};

export default Comment;
