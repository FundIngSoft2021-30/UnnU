const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,

    idCart: String,
    name: String,
    university: String,

})

mongoose.model('user',userSchema )