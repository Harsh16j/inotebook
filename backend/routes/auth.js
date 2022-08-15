const express=require("express");
const User=require("../models/User")
const { body, validationResult } = require('express-validator');

const router=express.Router();

// Create a user using POST "/api/auth". Doesn't require Auth
router.post('/',
body('name').isLength({min:1}),
body('email').isEmail(),
body('password','Password should be of atleast 6 characters').isLength({ min: 6 })
,(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }).then(user => res.json(user))
    .catch(err=>
        {console.log(err);
            res.json({error:"Error in updating documents in mongoDB database",
        message:err.message});
    });
    
    // const user=User(req.body)
    // user.save()
    // res.send(req.body);
});

module.exports=router