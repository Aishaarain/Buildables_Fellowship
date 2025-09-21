import passport from 'passport';
import * as passportLocal from 'passport-local' //local strategy is part of passport and its a package specially for authenticate name and password
import Person from '../Models/person.model.js';

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy (async (username,password,done)=>{
  // authenticate logic here
  
  try{
console.log("Received credentials:" ,username,password);
const users= await Person.findOne({username});
if(!users)
  return done(null,false,{message:'incorrect user name'});

 const isPasswordMatch = await users.comparePassword(password) ; 

  if(isPasswordMatch){
    return done(null,users) 
}else{
  return done(null,false ,{message:'incorrect password'})
  console.log("incorrect pwd")
}

  }
  catch(err){
    console.log("catch error",err)
return done (err);
  }
}))

export default passport;