const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unqiue: true,
        trim: true,
        minlength: 3
    },
    img_pic: {
        data: Buffer,
        contentType: String
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;