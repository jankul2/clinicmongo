const mongoose = require('mongoose');
require('mongoose-type-email');

const dataSchema = new mongoose.Schema({
    first_name: {
        required: true,
        type: String
    },
    last_name: {
        required: true,
        type: String
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true,
        unique: true
    },
    password: {
        required: true,
        type:String
    },
    phone_num: {
        required: true,
        type: Number
    },
    gender: {
        required: true,
        type: Number
    }
  
});
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

module.exports = mongoose.model('users', dataSchema);