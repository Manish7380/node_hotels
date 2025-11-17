const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

// -------------------- PERSON ROUTES --------------------
//post request to add new peron
router.post('/', async (req, res) => {
  try{
    const data = req.body //assume the request body contains the person data

    //Create a new person document using the mongoose model
    const newPerson = new Person(data);

    //Save the new person to the database
    const response = await newPerson.save();
    console.log('data saved');
    res.status(201).json(response);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

//GET method to get the person
router.get('/', async (req, res) =>{
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
