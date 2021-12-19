const { ObjectId } = require("mongoose");
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // uid: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        default: mongoose.Types.ObjectId,
      }
});
var Users= mongoose.model('User', userSchema)
module.exports = Users;