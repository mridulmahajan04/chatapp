// type: mongoose.Schema.Types.ObjectId → This tells Mongoose that this field will store an ID that points to another document in the database.
// ref: "User" → This tells Mongoose which collection this ID belongs to (in this case, the "User" collection). 
import mongoose  from "mongoose";
const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId, // Similar to a foreign key
        ref: "User", // Points to the "User" collection
        required: true
    },

    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },

    message:{
        type:String,
        required: true
    }
}, {timestamps: true});

const Message = mongoose.model("Message", messageSchema);

export default Message;