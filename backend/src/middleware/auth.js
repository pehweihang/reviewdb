const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next)=>{
    const token = req.cookies.auth;
    if (token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_TOKEN);
            console.log(decoded);
            res.locals.user_id = decoded.user_id;
            return next();
        }catch{
            return res.status(401).json(["Invalid token"])
        }
    }else return res.status(403).json(["No auth token found"])


}

module.exports = verifyToken;
