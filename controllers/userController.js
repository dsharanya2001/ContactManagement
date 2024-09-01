
const User=require("../models/userModel")
const express = require("express");

const userLogin = async (req, res) => {

  res.send("User logged in successfully");
};

const userRegister = async (req, res) => {
   const  {name,email,password}=req.body;
   if(!name || !email||!password){
    res.status(400);
    throw new Error("feilds should not be empty")
   }
   const userAvailable=User.findOne({email});
   if(!userAvailable){
    res.status(400);
    throw new Error("user already exists");
   }
   const hashedPassword=await bcrypt.hash(password,10);
   console.log(hashedPassword)
   //const user =Contact.create({name,email,password})

  res.send("User registered successfully");
};

const userCurrent = async (req, res) => {
  res.send("Fetched current user successfully");
};

// Correct `module.exports` spelling here
module.exports = { userLogin, userRegister, userCurrent };
