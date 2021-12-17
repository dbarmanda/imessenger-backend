const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    username: {
        type: String
        // required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: String
});

const Message = mongoose.model('message', messageSchema);


module.exports =  Message;