var express = require('express');
var Product = require('../models/productModel');
var bodyParser=require('body-parser');
const router = express.Router();
const mongoose = require('mongoose');

var {isAdmin,isAuth,getToken}=require('../util');

mongoose.set('useCreateIndex', true);

router.get("/",async(req,res)=>{
    const products=await Product.find({});
    res.send(products);

})

router.get("/:id",async(req,res)=>{
    const productId = req.params.id;
    const product=await Product.findById(productId);
    if(product){
        res.send(product);
    }else{
        res.status(404).send({message:"product not found"})
    }
   

})

router.post("/",isAuth,isAdmin,async(req,res)=>{
    const product=new Product({
        name:req.body.name,
        price:req.body.price,
        image:req.body.image,
        brand:req.body.brand,
        category:req.body.category,
        countInStock:req.body.countInStock,
        description:req.body.description,
        rating:req.body.rating,
        numReviews:req.body.numReviews
    });
    const newProduct = await product.save();
    if(newProduct){
        return res.status(201).send({message:'New Product created',data:newProduct});
    }
    return res.status(500).send({message:'error in creating product'})
})
router.put("/:id",isAuth,isAdmin,async(req,res)=>{
    console.log("its here");
    const productId = req.params.id;
    const product=await Product.findById(productId);
    if(product){
        product.name=req.body.name;
        product.price=req.body.price;
        product.image=req.body.image;
        product.brand=req.body.brand;
        product.category=req.body.category;
        product.countInStock=req.body.countInStock;
        product.description=req.body.description;
    const updateProduct = await product.save();
    if(updateProduct){
        return res.status(200).send({message:'Product updated',data:updateProduct});
    }
}
    return res.status(500).send({message:'error in updating product'})
    })


router.delete("/:id",isAuth,isAdmin,async(req,res)=>{
    const deleteProduct=await Product.findById(req.params.id);
    if(deleteProduct){
        await deleteProduct.remove();
        res.send("product deleted")
    }else{
        res.send("error while deleting")
    }
   
})
module.exports=router;