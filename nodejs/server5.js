

const express = require('express');

const app = express();
const db = require('./db');
require('dotenv').config(); // Load environment variables from .env file

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = precess.env.PORT || 3000;
// Import models

const MenuItem = require('./models/MenuItem');
const Person = require('./models/person');


app.get('/', function (req, res) {
  res.send('Hello World, we doned it!');
})





//import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuRoutes');

//use the routers
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

app.listen(PORT, () => {
  console.log('✅ Server is running at http://localhost:3000/');
})
