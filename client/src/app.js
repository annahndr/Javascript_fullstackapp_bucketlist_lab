const Item = require('./models/item.js')

document.addEventListener('DOMContentLoaded', () => {
  console.log('Javascript loaded');



const listUrl = 'http://localhost:3000/api/bucket-list';
const item = new Item(listUrl);
item.getData();


// ///
});
