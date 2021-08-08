const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const User = require("../models/user")

const bcrypt = require('bcrypt')

router.get('/login', (req, res)=>{
    res.send('login');
})


router.get('/register', (req, res)=>{
    res.send('register');
})

router.post('/register', (req, res)=>{
    const {name,email, password, password2} = req.body;
    let errors = [];
    console.log(' Email:' + email + ' Name:' + name + 'Password' + password);
    if (!name || !email || !password || !password2){
        errors.push({msg : "Fields cannot be empty."});
    }

    if (password.length < 8|| password2.length < 8){
        errors.push({msg : "Password must be at least 8 characters."});
    }

    if (password != password2){
        errors.push({msg: "Passwords do not match."});
    }

    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        errors.push({msg: "Please enter a valid email."}); }

    if (errors.length > 0){
        return res.json({
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
                res.json({msg: "success!"});
            }).catch((error) => {
                if (error.name == "MongoError" && error.code == "11000"){
                    errors.push({msg: "Email already exist."})
                    return res.json({
                        errors: errors,
                    })
                } else{
                    return res.status(500).send("Oh no.")
                }
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
