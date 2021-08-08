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
    const {username, email, name, password, password2} = req.body;
    let errors = [];
    console.log('Username ' + username + ' Email:' + email + ' Name:' + name + 'Password' + password);
    if (!username || !email || !name || !password || !password2){
        errors.push({msg : "Fields cannot be empty."})
    }

    if (password.length < 6|| password2.length < 6){
        errors.push({msg : "Password must be at least 8 characters."})
    }

    if (password != password2){
        errors.push({msg: "Passwords do not match."})
    }

    User.findOne({email : email}).exec((err, user)=>{
        if (user) errors.push({msg: "Email already registered."})
    })

    User.findOne({username : username}).exec((err, user)=>{
        if (user) errors.push({msg: "Username taken."})
    })

    if (errors.length > 0){
        res.json({
            errors : errors,
        });
    }else{
        passwordHash = bcrypt.genSalt(11, (err, salt)=>
        bcrypt.hash(password, salt, (err,hash)=>{
            if (err) throw err;
            const newUser = new User({
                username: username,
                email: email,
                name: name,
                password : hash,
            })
            newUser.save().then((out)=>{
                console.log(out);
                res.json({msg: "success!"});
            }).catch(out=> console.log(out));
        }))
    }
})

router.post('/login', (req, res)=>{

})

router.get('/logout', (req, res)=>{

})

module.exports = router;
