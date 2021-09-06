import { Meteor } from "meteor/meteor";
import React from "react";
import { useState, Fragment } from "react";
import { useTracker } from "meteor/react-meteor-data";
import Comment from "./Comment.jsx";
import CommentForm from "./CommentForm.jsx";
import { CommentsCollection } from "../api/CommentsCollection.js";
import Auth from "./Auth.jsx";

const toggleChecked = ({ _id, isChecked }) => {
  Meteor.call("comments.setIsChecked", _id, !isChecked);
};

const deleteTask = ({ _id }) => Meteor.call("comments.remove", _id);

export const App = () => {
  const user = useTracker(() => Meteor.user());
  // const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };
  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };
  const logout = () => Meteor.logout();

  const comments = useTracker(() => {
    if (!user) {
      return [];
    }

    return CommentsCollection.find(
      pendingOnlyFilter ? hideCompletedFilter : {},
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
  });

  const pendingCommentsCount = useTracker(() => {
    if (!user) {
      return 0;
    }

    return CommentsCollection.find(hideCompletedFilter).count();
  });

  const pendingCommentsTitle = `${
    pendingCommentsCount ? ` (${pendingCommentsCount})` : ""
  }`;

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1 className="app-title">Welcome discussion board!</h1>
            {pendingCommentsTitle}
          </div>
          {user ? (
            <div className="user" onClick={logout}>
              {user.username} 🚪 Logout
            </div>
          ) : null}
        </div>
      </header>

      <div className="main">
        {user ? (
          <Fragment>
            <CommentForm user={user} />

            {/* <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? "Show All" : "Hide Completed"}
              </button>
            </div> */}

            <ul className="comments">
              {comments.map((c) => (
                <Comment
                  key={c._id}
                  c={c}
                  onCheckboxClick={toggleChecked}
                  onDeleteClick={deleteTask}
                />
              ))}
            </ul>
          </Fragment>
        ) : (
          <Auth />
        )}
      </div>
    </div>
  );
};
