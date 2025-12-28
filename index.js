const express=require("express")
const dotENV=require("dotenv")
const mongoose=require("mongoose")
const vendorRoutes=require("./routers/vendorRoutes")
const firmRoutes=require("./routers/firmRoutes")
const productRoutes=require("./routers/productRoutes")
const bodyparser=require("body-parser")
dotENV.config();
const app=express()
const port=process.env.PORT||4000;
mongoose.connect(process.env.MONGO_URL).then(()=>
    console.log("sucessfully connected")
).catch((error)=>
    console.log("failed to connect")
)
app.use(bodyparser.json())
app.use("/vendor",vendorRoutes)
app.use("/firm",firmRoutes)
app.use("/product",productRoutes)
app.use('/',(req,res)=>{
    res.send("<h1>welcome")
})
app.listen(port,()=>{
console.log(`server is running on ${port}`);
})