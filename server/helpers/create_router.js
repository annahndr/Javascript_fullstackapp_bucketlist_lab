const express = require('express');
const ObjectID = require('mongodb').ObjectID;
// ^^ pulls the object using its key (every object will have an ID assigned by Mongo)

const createRouter = function(collection) {
  const router = express.Router();

// INDEX ROUTE
router.get("/", (req, res) => {
  collection.find().toArray().then((docs) => {
    res.json(docs);
  })
});

// SHOW (a single object)
  router.get("/:id", (req, res) => {
    const id = req.params.id; // grabs ID from the URL
    collection.findOne({_id: ObjectID(id)}).then((doc) => {
      res.json(doc);
    })
  });

//  CREATE (Post)
  router.post('/', (req, res) => {
    collection.insertOne(req.body)
    .then(() => collection.find().toArray())
    .then((docs) => res.json(docs))
  });

// DESTROY
  router.delete("/:id", (req, res) => {
    const id = req.params.id;
    collection.deleteOne({_id: ObjectID(id)})
    .then(() => collection.find().toArray())
    .then((docs) => res.json(docs));
  });

// UPDATE (post)
  router.put("/:id", (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    collection.updateOne(
      {_id: ObjectID(id)}, //the object we want to update
      {$set: updatedData} // what we want to 'set' as the new object
    )
    .then(() => collection.find().toArray())
    .then((docs) => res.json(docs))
  });


return router;
  // /////////
}

module.exports = createRouter;
