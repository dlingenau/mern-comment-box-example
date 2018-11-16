// server.js 

// import dependencies
import { getSecret } from './secrets.js';
import Comment from './models/comment';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

// create our instances
const app = express();
const router = express.Router();

// set up port to predetermined port number if set up, or 3001
const API_PORT = process.env.API_PORT || 3001;

// db config 
mongoose.connect(getSecret('dbUri'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

// configure API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// set the route path and initialize the API
router.get('/',  (req, res) => {
  res.json({ message: 'Hello, World!' })
});

router.get('/comments', (req, res) => {
  Comment.find((err, comments) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: comments});
  });
});

router.post('/comments', (req, res) => {
  const comment = new Comment();
  // bosy parser lets us use the req.body
  const { author, text } = req.body;
  if (!author || !text) {
    // we should throw an error. we can do this check on the front end
    return res.json({
      success: false,
      error: 'You must provide both an author and a comment'
    });
  }
  comment.author = author;
  comment.text = text;
  comment.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// use our router configuration when we call /api
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));