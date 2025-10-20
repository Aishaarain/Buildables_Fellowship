const asyncHandler = require("express-async-handler");
const Goal = require("../Models/goalModel");
const User = require("../Models/userModel");

const getGoals = asyncHandler(async (req, res) => {
  // find goals for the authenticated user (use id)
  const goals = await Goal.find({ user: req.user.id });

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
    user: req.user.id
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

  
  // verify req.user exists and has an id
  if (!req.user || !req.user.id) {
    res.status(401);
    throw new Error('User not found');
  }

  // make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
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

  

  if (!req.user || !req.user.id) {
    // check for user
    res.status(401);
    throw new Error('User not found');
  }
  // make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized to delete this goal');
  }
  await goal.deleteOne();
  // delete explicitly by id
  await Goal.findByIdAndDelete(req.params.id);
  res.status(200).json({ deletedGoalId: req.params.id });
});

module.exports = { 
  getGoals,
  setGoals,
  updateGoals,
    deleteGoals
}