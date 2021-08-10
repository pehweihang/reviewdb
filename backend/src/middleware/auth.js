const jwt = require("jsonwebtoken");
const BlacklistJWT = require("../models/userjwtblacklist")

const verifyToken = async (req, res, next)=>{
    const token = req.cookies.auth;
    const blacklist = await BlacklistJWT.findOne({token:token});
    console.log(blacklist)
    if (token){
        try{
            if (blacklist) throw {name : "BlacklistedTokenError", message : "Token no longer valid"};
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
