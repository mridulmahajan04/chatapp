import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    profilePic: {
        type: String,
        default: ""
    }
    // Created At and Updated At
}, { Timestamps: true });
const User = mongoose.model("User", userschema);

export default User;