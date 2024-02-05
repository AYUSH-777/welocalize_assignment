const express = require('express');
const itemRoutes = require('./routes/items');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/items', itemRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
