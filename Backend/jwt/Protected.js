import jwt from "jsonwebtoken";

export const ProtectedRoute=(req,res,next)=>{


    const authHeader=req.headers.authorization;

try{    if(!authHeader){
         return res
        .status(401)
        .json({ success: false, message: "Not Authorized. Login Again" });
    }

const token = authHeader.split(" ")[1];

const decodedToken=jwt.verify(token,process.env.JWT_SECRET)
req.userId=decodedToken.id
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
}