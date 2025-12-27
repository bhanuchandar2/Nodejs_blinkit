const Vendor=require("../models/Vendor")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const dotENV=require("dotenv")
dotENV.config()
const secretKey=process.env.hello
const vendorRegister=async(req,res)=>{
 const{username,email,password}=req.body
 try{
    const vendoremail=await Vendor.findOne({email});
    if(vendoremail){
        return res.status(400).json("email already exists")
    }
    const hashpassword=await bcrypt.hash(password,10)
    const newVendor=new Vendor({
        username,
        email,
        password:hashpassword
    })
    await newVendor.save()
    return res.status(201).json({message:"vendor succesfully registred"})
 }
 catch(error){
    console.log(error)
    return res.status(500).json({message:"error ocuured"})
 }
 
}
const vendorLogin=async(req,res)=>{
    const{email,password}=req.body;
    try{
        const vendor=await Vendor.findOne({email});
        if(!vendor){
            return res.status(401).json("invalid email or password")
        }
        const isMatch=await bcrypt.compare(password,vendor.password)
        if(!isMatch){
              return res.status(401).json("invalid email or password")
        }
        const token=jwt.sign({vendorId:vendor._id},secretKey,{expiresIn:"1h"})
        console.log(email,token)
        return res.status(200).json({sucess:"sucesfull login",token})
    }catch(error){
        return res.status(500).json("error ocuured")
    }
}
const getAllVendors=async(req,res)=>{
    try{
        const vendors= await Vendor.find().populate('firm')
        res.json({vendors})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:"internal server error"})
    }
}
const getSingleVendor=async(req,res)=>{
const vendorId=req.params.id;
try{
    const vendor=await Vendor.findById(vendorId);
    if(!vendor){
        return res.status(404).json({message:"vendor not found"})
    }
    res.json({vendor})
}
catch(error){
    console.log(error)
    return res.status(500).json({message:"internal server error"})
}
}
module.exports={vendorRegister,vendorLogin,getAllVendors,getSingleVendor}