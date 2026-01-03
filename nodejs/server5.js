
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

console.log('MONGODB_URL:', process.env.MONGODB_URL);

const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const app = express();
const passport = require('./auth');


// connect to MongoDB
connectDB();


app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
//Middleware function
const logrequest = (req, res, next) =>{
  console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
  next(); //move on to the next phase 
}

// Import models

const MenuItem = require('./models/MenuItem');
const Person = require('./models/person');

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session: false})
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
