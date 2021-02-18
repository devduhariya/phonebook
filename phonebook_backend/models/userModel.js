const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: String,
    mobile: Number
});
module.exports = mongoose.model('user', userSchema);