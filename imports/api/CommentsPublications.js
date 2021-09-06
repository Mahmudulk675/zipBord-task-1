import { Meteor } from "meteor/meteor";
import { CommentsCollection } from "./CommentsCollection";

Meteor.publish("comments", function publishComments() {
  return CommentsCollection.find({});
});
