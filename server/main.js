import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { CommentsCollection } from "../imports/api/CommentsCollection";
import "/imports/api/CommentsMethods";

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
    ["1 Task", "2 Task", "3 Task"].forEach((comment) =>
      insertComment(comment, user)
    );
  }
});
