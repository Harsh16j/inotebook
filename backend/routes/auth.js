const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const router = express.Router();

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
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ error: "Sorry a user with this email already exists" });
    }
    try {
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.json(user);
    } catch (error) {
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
