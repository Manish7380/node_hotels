const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');



// -------------------- MENU ITEM ROUTES --------------------

// POST request to add new menu item
router.post('/', async (req, res) => {
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
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    console.log('Menu data fetched');
    res.status(200).json(menuItems);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/:tasteType', async (req, res) => {
  try {
    const tasteType = req.params.tasteType; // get taste from URL parameter

    // Allow only specific tastes to avoid invalid inputs
    if (tasteType === 'sweet' || tasteType === 'spicy' || tasteType === 'sour') {
      const menuItems = await MenuItem.find({ taste: tasteType });
      console.log('Menu data fetched by taste:', tasteType);
      res.status(200).json(menuItems);
    } else {
      res.status(404).json({ error: 'Invalid taste type' });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  router.delete('/:id', async (req, res) =>{
        try{
            const menuItemId = req.params.id; // extract the MenuItem ID from the URL parameter
            const response = await MenuItem.findByIdAndDelete(menuItemId);
            if(!response){
                return res.status(404).json({error: 'MenuItem not found'});
        }
        console.log('data deleted');
        res.status(200).json({message: 'MenuItem deleted successfully'});
    }catch(err){
        console.log('Error deleting MenuItem:', err);
        res.status(500).json({error: 'Internal Server Error'});
    }
  });

// comment added for testing purposes

module.exports = router;