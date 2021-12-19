require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const userRoutes = require('./routes/users');
const meetingRoutes = require('./routes/meetings');

mongoose.connect(
    process.env.MONGO_ATLAS_PW
    // {
    //     useMongoClient: true
    // }
);
console.log("connected mongo");
const res = require("express/lib/response");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//To prevent CORS errors

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-TypeError, Accept, Authorization'
        );
        if(req.method === 'OPTIONS'){
            res.header('Access-Control-Allow-Methods', 'POST, GET');
            return res.status(200).json({});
        }
});
//

app.use('/users', userRoutes);
app.use('/meetings', meetingRoutes);

app.use((req, res, next)=>{
    const error = new Error('not found');
    error.status=404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;