import { check } from "meteor/check";
import { CommentsCollection } from "./CommentsCollection";
import { useTracker } from "meteor/react-meteor-data";

// if (Meteor.isServer) {
//   describe("Tasks", () => {
//     describe("methods", () => {
//       const userId = Random.id();
//       let taskId;

//       beforeEach(() => {
//         TasksCollection.remove({});
//         taskId = TasksCollection.insert({
//           text: "Test Task",
//           createdAt: new Date(),
//           userId,
//         });
//       });
//     });
//   });
// }

Meteor.methods({
  "comments.insert"(comment) {
    check(comment, String);
    const user = useTracker(() => Meteor.user());
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    CommentsCollection.insert({
      comment,
      createdAt: new Date(),
      userId: this.userId,
      username: user.username,
    });
  },

  "comments.remove"(commentId) {
    check(commentId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    CommentsCollection.remove(commentId);
  },

  "comments.setIsChecked"(commentId, isChecked) {
    check(commentId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    CommentsCollection.update(commentId, {
      $set: {
        isChecked,
      },
    });
  },
});
