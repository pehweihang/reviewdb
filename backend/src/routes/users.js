const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const User = require("../models/user")
const BlacklistJWT = require("../models/userjwtblacklist")

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.get('/login', (req, res)=>{
    res.send('login');
})


router.get('/register', (req, res)=>{
    res.send('register');
})

router.post('/register', async (req, res)=>{
    const {name, email, password, password2} = req.body;
    let errors = [];
    console.log(' Email:' + email + ' Name:' + name + 'Password' + password);
    if (!(name && email && password && password2)){
        errors.push("Fields cannot be empty.");
        return res.json({success: "failed", errors: errors})
    }

    if (password.length < 8|| password2.length < 8){
        errors.push("Password must be at least 8 characters.");
    }

    if (password != password2){
        errors.push("Passwords do not match.");
    }

    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        errors.push("Please enter a valid email."); 
    }

    const oldUser = await User.findOne({email: email}) 
    if (oldUser){
        errors.push("Email already used.")
    }

    if (errors.length > 0){
        return res.status(400).json({errors : errors});
    }else{
        passwordHash = bcrypt.genSalt(11, (err, salt)=>{
        bcrypt.hash(password, salt, (err,hash)=>{
            if (err) throw err;
            const newUser = new User({
                name: name,
                email: email,
                password : hash,
            })
            newUser.save().then((out)=>{
                console.log(out);
                const token = jwt.sign(
                    {user_id: newUser._id, email},
                    process.env.JWT_TOKEN,
                )
                res.json({name: name, token: token});
            }).catch((error) => {
                console.log(error);
                return res.status(500).json({errors: "Something went wrong."});
                })
            })
        })

        }
})

router.post('/login', async (req, res)=>{
    const {email, password} = req.body;

    if (!(email && password)){
        return res.status(400).json({errors: "Missing input."})
    }

    const user = await User.findOne({email : email});

    if (user && (await bcrypt.compare(password, user.password))){
        const token = jwt.sign(
            {user_id: user._id, email},
            process.env.JWT_TOKEN,
            {
                expiresIn: '7d'
            }
        )
        return res.status(200).json({user: user.name, token: token})

    } else return res.status(400).send("Incorrect email/password.")


})

router.get('/logout', (req, res)=>{
    const token = req.cookies.auth
    if (token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_TOKEN);
            blacklist = new BlacklistJWT({
                token: token,
            })
        }catch{
            return res.status(400).json(["Invalid token"])
        }
    }else return res.status(400).json(["No auth token found"])
    

})

module.exports = router;
