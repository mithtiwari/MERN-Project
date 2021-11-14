import Mongoose from "mongoose";

const postSchema=Mongoose.Schema({
    title:String,
    message:String,
    creator:String,
    tags:[String],
    selectedFile:String,
    likecount:{
        type:Number,
        default: 0,
    },
    createdAt:{
        type:Date,
        default:new Date(),
    },
})

var postMessage=Mongoose.model('postMessage',postSchema);

export default postMessage;