const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/users')
router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: 'Get'
    });
});
    

router.post('/', (req, res, next)=>{
    console.log("enter");
    
    const user = new User({
        // uid: new mongoose.Types.ObjectId(),
        username: req.body.username
    });
    console.log(user);
    user.save().then((result) => {
        console.log(result);
    })
    .catch(err =>console.log(err) );
    res.status(201).json({
        message: 'Post',
        createUser: user
    });
    res.status(200).json({
        message: 'Get'
    });

});

module.exports = router;