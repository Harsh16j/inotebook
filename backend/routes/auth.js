const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

//Secret code for creating jwt token
const JWT_SECRET = "kdjfkjdfkdjfkjd";

// Create a user using POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  body("name").isLength({ min: 1 }),
  body("email").isEmail(),
  body("password", "Password should be of atleast 6 characters").isLength({
    min: 6,
  }),
  async (req, res) => {
    // If there are errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check wether a user with this email already exists in the database
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }

      // Generating salt for the password
      const salt = await bcrypt.genSalt(10);
      // Generating hashed password with salt
      const secPass = await bcrypt.hash(req.body.password, salt);
      
      //Storing the new user data in the database
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      // data with document id created to be used to create authorization token
      const data={
        user:{
            id:user.id
        }
      }
      // Authorization token created with data and JWT SECRET CODE
      const authToken=jwt.sign(data,JWT_SECRET)
      // Authorization token sent back to the user
      res.json(authToken); // same as res.json({authToken:authToken})
    }catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }

    //old method 2
    // User.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // }).then(user => res.json(user))
    // .catch(err=>
    //     {console.log(err);
    //         res.json({error:"Error in updating documents in mongoDB database",
    //     message:err.message});
    // });

    //old method 1
    // const user=User(req.body)
    // user.save()
    // res.send(req.body);
  }
);
module.exports = router;
