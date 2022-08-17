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
      const data = {
        user: {
          id: user.id,
        },
      };
      // Authorization token created with data and JWT SECRET CODE
      const authToken = jwt.sign(data, JWT_SECRET);
      // Authorization token sent back to the user
      res.json(authToken); // same as res.json({authToken:authToken})
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server errro");
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

// Authenticate a user using POST "/api/auth/login". No login required
router.post(
  "/login",
  body("email").isEmail(),
  body("password", "Password cannot be blank").exists(),
  async (req, res) => {
    // If there are errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({email:email});
      //If user does not exist
      if (!user) {
        return res
          .status(400)
          .json({ error: "Login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      // When wrong password is entered
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Login with correct credentials" });
      }
      // Payload is the data to be returned
      const payload = {
        user: { user: user.id },
      };
      // Creating and sending authorization token
      const authToken = jwt.sign(payload, JWT_SECRET);
      res.json(authToken);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
module.exports = router;
