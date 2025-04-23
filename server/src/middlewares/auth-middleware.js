require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  /*
  const { authorization } = req.headers; 
  console.log(authorization)
  const userToken = authorization && authorization.split(" ")[1];
*/
  //when we use http only cookies,cookie is sent within the req header when any request is made to server,then cookieParser will parse cookies and make it avaliable in req.cookies
  const userToken = req.cookies.jwtToken
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