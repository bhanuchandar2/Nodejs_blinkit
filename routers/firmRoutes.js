const express=require("express");
const VerifyToken=require("../middlewares/verifyTokens")
const addFirm=require("../controllers/firmController")
const router=express.Router();
router.post('/addFirm',VerifyToken,addFirm)
module.exports=router;