const Product=require("../models/Product")
const Firm=require("../models/Firm")
const Vendor=require("../models/Vendor")
const multer=require("multer")
const storage=multer.diskStorage({
    destination:function(req,file){
        cb(null,'uploads')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname));
    }
})
const upload=multer({storage:storage})
const addProduct=async(req,res)=>{
    try{
        const{productName,price,category,description,bestseller}=req.body;
        const image=req.file? req.file.filename:undefined;
        const firmId=req.params.id;
        const firm=await Firm.findById(firmId);
        if(!firm){
            return res.status(404).json({error:"firm not found"})
        }
        const product=new Product({
            productName,
            price,
            category,
            image,
            description,
            bestseller,
            firm:firm._id
        })
        const savedProducts=await product.save()
        firm.product.push(savedProducts)
        await firm.save();
        res.status(200).json(savedProducts)
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"internal server error"})
    }
}
const getProductbyfirm=async (req,res)=>{
try{
    const firmId=req.params.firmId;
    const firm=await Firm.findById(firmId);
    if(!firm){
        return res.status(404).json({error:"firm not found"})
    }
    const products=await Product.find({firm:firmId});
    const restarunt=firm.firmname
    return res.status(201).json({restarunt,products})
}catch(error){
    console.log(error)
    return res.status(404).json({error:"internal server error"})
}
}
const deleteproductByid=async(req,res)=>{
    try{
        const productId=req.params.id;
        const deletedproduct=await Product.findByIdAndDelete(productId);
        if(!deletedproduct){
            return res.status(404).json({error:"product not found"});
        }
        return res.status(201).json({message:"product is deleted"})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error:"internal server error at product delete"
        })
    }
}
module.exports={addProduct:[upload.single('image'),addProduct],getProductbyfirm,deleteproductByid};
