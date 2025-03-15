require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers; 
  console.log(authorization)
  const userToken = authorization && authorization.split(" ")[1];

  if (!userToken) {
    return res
      .status(401)
      .json({
        success: false,
        message: "Acces Denied.No Token Provided.Please Login To Continue",
      });
  }

  try {
    const decoded = jwt.verify(userToken, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(500).json({ success:false,message: "Verification failed." ,error:error });
  }
};

module.exports = authMiddleware;