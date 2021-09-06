import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { CommentsCollection } from "../imports/api/CommentsCollection";
import "/imports/api/CommentsMethods";
import "/imports/api/CommentsPublications";

const insertComment = (comment, user) =>
  CommentsCollection.insert({
    comment: comment,
    userID: user._id,
    username: user.username,
    createdAt: new Date(),
  });

const username = "superhero@gmail.com";
const userpass = "superpass";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(username)) {
    Accounts.createUser({
      username: username,
      password: userpass,
    });
  }
  const user = Accounts.findUserByUsername(username);
  if (CommentsCollection.find().count() === 0) {
    ["1st Comment", "2nd Comment", "3rd Comment"].forEach((comment) =>
      insertComment(comment, user)
    );
  }
});
