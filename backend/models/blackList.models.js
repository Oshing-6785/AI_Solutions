const mongoose = require('mongoose');
const blackListSchema = new mongoose.Schema({
    token:{
        type: String,
        required: true,
        unique: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
        expires: '1d' 
    }
})
module.exports = mongoose.model('BlackList', blackListSchema);