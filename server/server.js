const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');
const bodyParser = require('body-parser');

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

app.use(bodyParser.json())

// create connection to the databse, identify the collection, specify the api address
MongoClient.connect('mongodb://localhost:27017')
  .then((client) => {
    const db = client.db('bucket_list_db');
    const bucketListCollection = db.collection('bucket_list');
    const bucketListRouter = createRouter(bucketListCollection);
    app.use('/api/bucket-list', bucketListRouter);
  })
  .catch(console.err);

app.listen(3000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
