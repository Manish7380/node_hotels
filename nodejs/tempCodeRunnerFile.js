

const express = require('express');

const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
// Import models
const Person = require('./models/person');
const MenuItem = require('./models/MenuItem');

app.get('/', function (req, res) {
  res.send('Hello World, we doned it!');
})
// -------------------- PERSON ROUTES --------------------
//post request to add new peron
app.post('/person', async (req, res) => {
  try{
    const data = req.body //assume the request body contains the person data

    //Create a new person document using the mongoose model
    const newPerson = new Person(data);

    //Save the new person to the database
    const respose = await newPerson.save();
    console.log('data saved');
    res.status(201).json(respose);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

//GET method to get the person
app.get('/person', async (req, res) =>{
  try{
    const persons = await Person.find();
    console.log('data fetched');
    res.status(200).json(persons);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Inernal Server Error'});
  }
})

// -------------------- MENU ITEM ROUTES --------------------

// POST request to add new menu item
app.post('/menu', async (req, res) => {
  try {
    const data = req.body; // assume request body contains menu item data
    const newMenuItem = new MenuItem(data); // create new menu item
    const response = await newMenuItem.save(); // save to DB
    console.log('Menu item saved');
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET request to fetch all menu items
app.get('/menu', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    console.log('Menu data fetched');
    res.status(200).json(menuItems);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(3000, () => {
  console.log('✅ Server is running at http://localhost:3000/');
})
