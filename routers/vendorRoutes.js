const VendorController=require("../controllers/vendorController");
const express=require("express");
const router=express.Router();
router.post("/register",VendorController.vendorRegister);
router.post("/login",VendorController.vendorLogin)
router.get("/get-vendorsfirm",VendorController.getAllVendors)
router.get("/getsinglevendor/:id",VendorController.getSingleVendor)
module.exports=router;