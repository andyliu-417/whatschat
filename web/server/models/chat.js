const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    chatid: {type: String, require: true},
    from: {type: String, require: true},
    to: {type: String, require: true},
    content: {type: String, require: true, default:''},
    create_time: {type: Number, default: new Date().getTime()},
    read: {type: Boolean, default: false}
});

module.exports = mongoose.model('Chat', ChatSchema);
