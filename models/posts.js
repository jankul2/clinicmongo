const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    post_title: {
        required: true,
        type: String
    },
    post_content: {
        required: true,
        type:String
    },
    post_image: {
        required: true,
        type: String
    },
    post_date: {
        required: true,
        type: Date
    }
  
})

module.exports = mongoose.model('posts', dataSchema);