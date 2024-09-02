
const User=require("../models/userModel")
const express = require("express");
const bcrypt = require('bcrypt'); 
const jwt=require('jsonwebtoken')

const userLogin = async (req, res) => {

  const{email,password}=req.body;
  if(!email || !password){
    throw new Error("Fields should not be empty");
  }

  const user=await User.findOne({email});

  if(user && bcrypt.compare(password,user.password)){
     const accessToken=jwt.sign(
      {
      user:{
      username: user.username,
      email:user.email,
      id:user._id
     },
    },
     process.env.ACESS_TOKEN_SECRET,
     {expiresIn:"10m"}
    );
    res.status(200).json({accessToken});
  }
  else{
res.status(401);
throw new Error("email or password is not valid");
  }


};

const userRegister = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !email || !password) {
      res.status(400);
      throw new Error("Fields should not be empty");
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      res.status(400);
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const user = await User.create({
      username: username, 
      password: hashedPassword,
      email
    });

    if(user){
      res.status(201).json({_id:user.id,email:user.email});
    }
    else{
      res.status(400);
      throw new Error("User data is not valid");
    }
  } catch (error) {
    next(error); 
  }
};


const userCurrent = async (req, res) => {
  res.send("Fetched current user successfully");
};

module.exports = { userLogin, userRegister, userCurrent };
