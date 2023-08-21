const express = require("express");
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();

const {UserModel} = require("../Models/userModel");

userRouter.post("/register", async(req, res) =>{
    const {name, email, password, gender, age, city, is_married} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(user){
            res.send({"msg" : "User already exist, please login"})
        }else{
            bcrypt.hash(password, 5, async(err, hash)=>{
                if(err){
                    res.send({"error" : err});
                }else{
                    const newuser = UserModel({name, email, password : hash, gender, age, city, is_married});
                    newuser.save();
                    res.send({"msg" : "New user has been registered", "user" : newuser})
                }
            })
        }
        
    } catch (error) {
        res.send({"error" : error});
    }
})

userRouter.post("/login", async(req, res) =>{
    const {name, email, password} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password, user.password, async(err, result)=>{
                if(result){
                    const token = jwt.sign({userID:user._id, user : user.name}, "MasaiSchool");
                    res.send({"msg":"Logged in!!!", "token" : token});
                }else{
                    res.send({"error" : err});
                }
            })
        }else{
            res.send({"msg" : "user dose not exist!"});
        }
    } catch (error) {
        res.send({"error" : error});
    }
})

module.exports = {
    userRouter
}

