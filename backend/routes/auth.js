const express=require("express");

const router=express.Router();

router.get('/',(req,res)=>{
    obj={
        a:1,
        b:"23"
    }
    console.log(req.body)
    res.json(obj);
});

module.exports=router