const productController=require('../controllers/productController')
const express=require('express')
const router=express.Router()
router.post('/addproduct/:id',productController.addProduct)
router.get('/:firmId/products',productController.getProductbyfirm)
router.delete('/deleteproduct/:id',productController.deleteproductByid)
module.exports=router;