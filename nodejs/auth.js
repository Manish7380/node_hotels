//sets up passport with a local authentication , using a person model 
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const person = require('./models/person'); //Adjust the path as needed

passport.use(new LocalStrategy(async(username, password, done) =>{
  //authentication logic here

  try{
      console.log('Received credentials:', username, password);
      const user = await person.findOne({username: username});
      if(!user) 
        return done(null, false, { message: 'Incorrect username.'});
      const isPasswordMatch = await user.comparePassword(password);
      if(isPasswordMatch) {
        return done(null, user);
      }else{
        return done(null, false, { message: 'Incorrect password.'});
      }

  }catch (err){
      return done(err);
  }
}));

module.exports = passport; //Export configered passport