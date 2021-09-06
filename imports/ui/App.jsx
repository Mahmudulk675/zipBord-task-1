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

const deleteComment = ({ _id }) => Meteor.call("comments.remove", _id);

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };
  const userFilter = user ? {} : {};
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };
  const logout = () => Meteor.logout();

  /////  func

  const { comments, pendingCommentsCount, isLoading } = useTracker(() => {
    const noDataAvailable = { comments: [], pendingCommentsCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe("comments");

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const comments = CommentsCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
    const pendingCommentsCount =
      CommentsCollection.find(pendingOnlyFilter).count();

    return { comments, pendingCommentsCount };
  });

  const pendingCommentsTitle = `${
    pendingCommentsCount ? ` (${pendingCommentsCount})` : ""
  }`;

  // ///////////

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

            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? "See all comments" : "Hide comments"}
              </button>
            </div>

            {isLoading && <div className="loading">loading...</div>}

            <ul className="comments">
              {comments.map((c) => (
                <Comment
                  key={c._id}
                  c={c}
                  onCheckboxClick={toggleChecked}
                  onDeleteClick={deleteComment}
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
