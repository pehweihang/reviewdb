const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const User = require("../models/user")

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
        return res.json({
            success: "failed",
            errors : errors,
        });
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
                    {
                        expiresIn: "1d"
                    })
                    this.token = token;
                res.json({success: "success", token: token});
            }).catch((error) => {
                console.log(error);
                return res.status(500).json({success: "failed", errors: "Something went wrong."});
                })
            })
        })

        }
})

router.post('/login', (req, res)=>{

})

router.get('/logout', (req, res)=>{

})

module.exports = router;
