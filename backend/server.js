// server.js 

// import dependencies
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

// create our instances
const app = express();
const router = express.Router();

// set up port to predetermined port number if set up, or 3001
const API_PORT = process.env.API_PORT || 3001;

// configure API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// set the route path and initialize the API
router.get('/',  (req, res) => {
  res.json({ message: 'Hello, World!' })
});

// use our router configuration when we call /api
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));