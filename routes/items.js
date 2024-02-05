const express = require('express');
const router = express.Router();

let items = []; // This will store our items in-memory

// returns all the items present inside the in-memory items
router.get('/', (req, res) => {
  res.json(items);
});

// creates a new item and adds it at the end of the list
router.post('/', (req, res) => {
  const newItem = {
    id: generateUniqueId(),  // generates unique id and assign it to the id field
    name: req.body.name  // assigns the name sent in request body to the name field
  };
  items.push(newItem);   // adding the newly created item at the end of the list
  res.status(201).json(newItem); // returning the status code and the newly created item
});

// fetches the item by id inside the items list if present else returns item not found
router.get('/:id', (req, res) => {
  const itemId = req.params.id;
  const item = items.find(item => item.id === itemId);  // searches the entire list of items and returns the item if any match of id is found
  if (item) {
    res.json(item);  // fetched item is sent in form of response
  } else {
    res.status(404).json({ error: 'Item not found for fetching item by id' }); // if id match is not found in the entire list items then item not found is returned
  }
});

// updates the item by id inside the items list if present else returns item not found
router.put('/:id', (req, res) => {
  const itemId = req.params.id;
  const itemIndex = items.findIndex(item => item.id === itemId); // returns the index of the item if any match of id is found
  if (itemIndex !== -1) { 
    items[itemIndex].name = req.body.name; // if match is found then the item's name is being updated by the new name sent in form of response body
    res.json(items[itemIndex]); // updated item is sent in form of response
  } else {
    res.status(404).json({ error: 'Item not found for updating item by id' }); // if id match is not found (i.e. index == -1) in the entire list items then item not found is returned
  }
});

// deletes the item by id inside the items list if present else returns item not found
router.delete('/:id', (req, res) => {
  const itemId = req.params.id;
  const itemIndex = items.findIndex(item => item.id === itemId); // returns the index of the item if any match of id is found
  if (itemIndex !== -1) {
    const deletedItem = items.splice(itemIndex, 1)[0]; // if match is found then the item is being deleted and the delted item is sent in form of response body
    res.json(deletedItem); // deleted item is sent in form of response
  } else {
    res.status(404).json({ error: 'Item not found for deleting item by id' }); // if id match is not found (i.e. index == -1) in the entire list items then item not found is returned
  }
});

// Helper function to generate unique IDs
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

module.exports = router;
