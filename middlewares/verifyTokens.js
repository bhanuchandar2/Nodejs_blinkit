const Vendor=require("../models/Vendor")
const jwt=require("jsonwebtoken");
const dotENV=require("dotenv")
dotENV.config()
const SecretKey=process.env.hello
const VerifyToken=async(req,res,next)=>{
    const token=req.headers.token
    if(!token){
        return res.status(404).json({error:"token is required"})
    }
    try{
        const decoded=jwt.verify(token,SecretKey)
        const vendor= await Vendor.findById(decoded.vendorId)
        if(!vendor){
            return res.status(404).json({error:"Vendor not found"})
        }
        req.vendorId=vendor.id
        next()
    }catch(error){
        return res.status(500).json({meassage:"invalid token"})
    }
}
module.exports=VerifyToken;