// Require mongoose
var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;

// Create the Note schema
var CommentsSchema = new Schema({
  // Just a string
  body: {
    type: String
  },
  author: {
  	type: String
  },
  userCreated: {
    type: Date,
    default: Date.now
  },
});

// Remember, Mongoose will automatically save the ObjectIds of the notes
// These ids are referred to in the Article model

// Create the Note model with the NoteSchema
var Note = mongoose.model("Comments", NoteSchema);

// Export the Note model
module.exports = Note;
 