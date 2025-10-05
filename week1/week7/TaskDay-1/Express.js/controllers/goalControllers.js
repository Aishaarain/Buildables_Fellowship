const asyncHandler = require("express-async-handler");
const Goal = require("../Models/goalModel");
const User = require("../Models/userModel");

const getGoals = asyncHandler(async (req, res) => {
  const goals= await Goal.find({user:req.user});

  res.status(200).json(goals);
});
 
const setGoals = asyncHandler(async (req, res) => {
  console.log("Request body:", req.body);

  if (!req.body || !req.body.text || req.body.text.trim() === "") {
    res.status(400);
    throw new Error("Please add a text field in the request body");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user._id 
     // Assuming req.user contains the authenticated user's info
  })

  res.status(200).json(goal); 
});


const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);
  if(!user){
    //check for user
    res.status(401);
    throw new Error('User not found');
  }

  //make sure the logged in user matches the goal user
  if(goal.user.toString() !== user.id){
    res.status(401);
    throw new Error('User not authorized');
  }

  const updateGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{
    new:true,});
    
  res.status(200).json(updateGoal);
});

const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user= await User.findById(req.user.id);

  if(!user){
    //check for user
    res.status(401);
    throw new Error('User not found');
  }
  //make sure the logged in user matches the goal user
  if(goal.user.toString() !== user.id){
    res.status(401);
    throw new Error('another user wants to delete goal, User not authorized');
  }
  await goal.remove;
  res.status(200).json({ deletedGoalId: req.params.id });
});

module.exports = { 
  getGoals,
  setGoals,
  updateGoals,
    deleteGoals
}