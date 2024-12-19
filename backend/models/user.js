//const { uniq } = require('lodash');
const mongoose = require('mongoose');
const bcrypt =require('bcrypt');


//definr person schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        require: true,
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    address: {
        type: String,
        require: true
    },
    pincode:{
        type:String
    },
    VoterID:{
        type: String
    },
    aadharCardNumber: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['voter', 'admin'],
        default: 'voter'
    },
    isVoted: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    toshowResult: {
        type: Boolean,
        default: false
    }
})
userSchema.pre('save', async function(next){
    const person=this;
    
   //hash the password only if it is modified (or is new)
   if(!person.isModified('password')) return next();
    try {
        //hash passord generate
        const salt=await bcrypt.genSalt(10);
        //hash password
        const hashedPassword= await bcrypt.hash(person.password,salt);
        //override the plain password with the hashed password 
        person.password=hashedPassword;
        next();
        
    } catch (error) {
        return next(error);
       
    }
})


userSchema.methods.comparePassword=async function(candidatePassword){
    try {
       const isMatch=  await bcrypt.compare(candidatePassword,this.password);
         return isMatch
    } catch (error){
        throw error; 
    }
        
    }


//create user model
const User = mongoose.model('User', userSchema);
module.exports = User;