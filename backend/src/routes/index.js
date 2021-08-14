const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth")
const User = require('../models/user')


router.get('/', auth, async (req, res)=>{
    res.render('welcome!')
})

router.post("/welcome", auth, async (req, res)=>{
    const user_id = res.locals.user_id
    const user = await User.findOne({_id:user_id}) 
    return res.status(200).json("Welcome "+user.name);
})

module.exports = router;
