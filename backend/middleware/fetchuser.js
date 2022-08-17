const jwt = require("jsonwebtoken");
const JWT_SECRET = "kdjfkjdfkdjfkjd"; //recommended to keep in environment variable
const fetchuser = (req, res, next) => {
  // Get the user from the jwt token and add id to req object

  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET); // jwt.verify() function throws an error if the token is not verified
    req.user = data.user;
    next(); // will call the next function which is async (req,res) in router.post() in ../router/auth.js
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
