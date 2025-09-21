import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// define person schema

const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true, //means name is required
    },
    // age:{
    //     type:Number,
    // },
    // work:{
    //     type:String,
    //     enum:["chef","manager","waiter"],
    //     required:true
    // },
    // mobile:{
    //     type:String,
    //     required:true
    // },
    email:{
        type:String,
        required:true,
        unique:true //email should be unique
    }
// ,address:{
//     type:String,
// },
// salary:{
// type:Number,
// required:true
// }
   ,username:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
}
})

personSchema.pre('save',async function(next){
    const person=this;
    // hash the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next();   
        try{
// hash password generate
const salt = await bcrypt.genSalt(10);
console.log(salt)
const hashpassword=await bcrypt.hash(person.password,salt);
// override the plain password with the hashed one
person.password= hashpassword;
        next();
    }catch(err){
return next(err);
    }
})
personSchema.methods.comparePassword = async function(candidatepwd) {
    try{
        const isMatch= await bcrypt.compare(candidatepwd,this.password);
        return isMatch
    }
    catch(err){
        throw err;
    }
    
}
//create person model
const Person=mongoose.model('person',personSchema);

export default Person;