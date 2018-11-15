// model/comment.js
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create new instance of the mongoose.Schema. The schema takes
// an object that shows the shape of your database entries.
const CommentsSchema = new Schema({
  author: String,
  text: String,
}, { timestamps: true });


// export our module to use in server.js
export default mongoose.model('Comment', CommentsSchema);