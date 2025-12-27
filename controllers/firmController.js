const Firm=require("../models/Firm")
const Vendor=require("../models/Vendor")
const addFirm=async(req,res)=>{
    try{
        const{firmname,area,category,region,offer}=req.body;
        const vendor=await Vendor.findById(req.vendorId)
        if(!vendor){
            return res.status(404).json({message:"vendor not found"})
        }
        const firm=new Firm({
            firmname,
            area,
            category,
            region,
            offer,
            vendor:vendor._id


        })
        const savedFirm=await firm.save();
        vendor.firm.push(savedFirm)
        await vendor.save();
        return res.status(200).json({message:"succesfully added frim"})
    }
    catch(error){
        console.log(error)
        res.status(500).json({meassge:"firm not addded"})
    }
}
module.exports=addFirm;