use bucket_list_db;
db.dropDatabase();

db.bucket_list.insertMany([
  {
    item: "Write a book",
  },
  {
    item: "Learn to play the ukelele"
  },
  {
    item: "Visit Tokyo"
  }
]);
