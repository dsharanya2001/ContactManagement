const asyncHandler=require("express-async-handler");
const jwt=require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;
  
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1]; // Extract the token
  
      jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          res.status(401);
          throw new Error("Token is not valid");
        }
        // Set the user information to req.user
        req.user = decoded.user; // Ensure the 'user' object is set correctly
        next(); // Proceed to the next middleware or route handler
      });
    } else {
      res.status(401);
      throw new Error("Authorization header not found or malformed");
    }
  });

module.exports=validateToken;