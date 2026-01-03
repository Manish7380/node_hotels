const express = require('express');
const router = express.Router();
const Person = require('./../models/person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

// -------------------- PERSON ROUTES --------------------
//post request to add new peron
router.post('/signup', async (req, res) => {
  try{
     console.log(req.body); 
    const data = req.body //assume the request body contains the person data

    //Create a new person document using the mongoose model
    const newPerson = new Person(data);

    //Save the new person to the database
    const response = await newPerson.save();
    console.log('data saved');

    const payload = {
      id : response.id,
      username: response.username
    }
    
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is : ", token);

    res.status(201).json({response: response, token: token});
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

//Login Route
router.post('/login', async(req, res) => {
  try{
    //Extract username ans password from request body
    const {username, password} = req.body;

    //Find the user by username
    const user = await Person.findOne({username: username});

    //If user does not exist or password doen not match, return error
    if( !user || !(await user.comparePassword(password))){
      return res.status(401).json({error: 'Invalid username or password'});
    }

    //generate token
    const payload = {
      id : user.id, 
      username: user.username
    }
    const token = generateToken(payload);

    //return token as response
    res.json({token});
  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error'});
  }
});

//Profile route 
route.het('/profile', jwtAuthMiddleware, async (req, res) => {
  try{
    const userData = req.user;
    console.log("User Data:", userData);

    const userId = userData.id;
    const user = await Person.findById(userId);

    res.status(200).json({user});
  }catch(err){
      console.error(err);
      res.status(500).json({ error: ' Internal Server Error'});
  }
})

//GET method to get the person
router.get('/', jwtAuthMiddleware, async (req, res) =>{
  try{
    const persons = await Person.find();
    console.log('data fetched');
    res.status(200).json(persons);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Inernal Server Error'});
  }
});

router.get('/:workType', async (req, res)=>{
  try{
    const workType = req.params.workType; //extract the work type from the url parameter
    if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
      const response = await Person.find({work: workType});
      console.log('response fetched');
      res.status(200).json(response);
    }else{
      res.status(404).json({error: 'Invalid work type'});
    }
  } catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});


router.put('/:id', async (req, res) =>{
    try{
        const personId = req.params.id; // extract the person ID from the URL parameter
        const updatedPersonData = req.body; // updated data or the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
            new: true, // return thee updated document
            runValidators: true, // run Mongoose validation
        })
        if(!response) {
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('data updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
    });


    router.delete('/:id', async (req, res) =>{
        try{
            const personId = req.params.id; // extract the person ID from the URL parameter
            const response = await Person.findByIdAndDelete(personId);
            if(!response){
                return res.status(404).json({error: 'Person not found'});
        }
        console.log('data deleted');
        res.status(200).json({message: 'Person deleted successfully'});
    }catch(err){
        console.log('data deleted');
        res.status(500).json({error: 'Internal Server Error'});
    }
    });

module.exports = router;
//comment added