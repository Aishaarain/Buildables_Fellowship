import express from 'express';
import { Router } from 'express';
import Person from '../Models/person.model.js'
const router = Router();
import { AuthMiddleware,generateToken } from '../Middlewares/jwt.Middleware.js' 
import cookieParser from 'cookie-parser';

router.use(cookieParser());

router.get('/', AuthMiddleware,async (req,res)=>{
try{
  const data = await Person.find();
  console.log('data fetched');
  res.status(200).json(data);
}catch(err){ 
  console.log(err);
  res.status(500).json({error:'internal server error'})
}
})


// profile route
// router.get('/profile',AuthMiddleware,async(req,res)=>{
//   try{
//     const userData=req.user;

//     const userId=userData.id;
//     const user=await Person.findById(userId);
//     res.status(200).json(user);
//   }
//   catch(err){
//     console.error(err);
//     res.status(500).json({error:'Internal Server Error'});
//   }
// })



// router.get('/:workType',async(req,res)=>
// {
//   try{
// const workType=req.params.workType.trim().toLowerCase();

// if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){

//   const data =await Person.find({work:workType})
// res.status(200).json(data);
//   }

//   console.log('invalid work type');
//   res.status(404).json({error:'invalid work type'});
// }
//   catch(err){
//     console.log(err);
//     res.status(500).json({error:'internal server error'});
//   }
// });


router.post('/signup', async (req,res)=>{
  try{
    const data=req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();

const payload={
  id:response.id,
  username:response.username
}
console.log(payload);

    const token =generateToken(payload)
    res
    .writeHead(200, {
      "Set-Cookie": `token=${token}; HttpOnly`,
       "path":"/",
      "Access-Control-Allow-Credentials": "true"
    })
   
  //  res.send(response);
    // res.status(201).json(`saved data ${response},token:${token}`);
  


  } catch(err){ 
  console.log(err);
  res.status(500).json({error:'internal server error'});
}
})

// router.post('/success',(req,res)={
// let {email,password,username,}
// })

// login route
router.post('/login',async(req,res)=>{
try{
  console.log("request:",req.body.username);
// const {username,password}=req.body;
const user=await Person.findOne(req.body.username);

if(!user || !(await user.comparePassword(password))){
  res.status(401).json({error:'Invalid username and password'})
  // res.send("username or password is incorrect")
}
else{
// generate token
const payload={
  id:user.id,
  username:user.username
}

const token=generateToken(payload);
// return token as response
// res.json({token})

 res.cookie("token", token, {
  httpOnly: true,
  secure: false, // Set to true in production
  sameSite: "Lax",
  path: "/"       // So it’s accessible in other routes
});
    // res.send("login successfully");
}
}catch(err){
  console.error(err)
  res.status(500).json({error:"Internal server Error"});
}
})

router.get('/logout',(req,res)=>{
  res.cookie("token","")
  res.redirect("/signup");
})
// router.put('/:id',async(req,res)=>{
//   try{
// const personId = req.params.id;
// const updatedData = req.body;

// const response = await Person.findByIdAndUpdate(personId,updatedData,{
//   new:true,   //retirn the updated document
//   runValidators:true //run database validator to true
// })
// if(!response){
//   return res.status(404).json({error:"person not found"})
// }

// console.log('data updated');
// res.status(200).json(response);

//   }catch(err){
//     console.log(err);
//     res.status(500).json({error:'internal server error'});
//   }
// })

// router.delete('/:id',async(req,res)=>{
//   try{
//     const personId = req.params.id;
//     const response=await Person.findByIdAndDelete(personId);

//     if(!response){
//       res.status(404).json({error:'person not found'});
//     }
//     console.log('data deleted');
//     res.status(200).json({message:'person deleted successfully', deletedData:response})
//   }catch(err){
//     console.log(err);
//     res.status(500).json({error:'internal server error'});
//   }
// })

export default router;