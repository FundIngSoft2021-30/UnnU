const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,

    idCard: String,
    name: String,
    university: String,

})

mongoose.model('user',userSchema )