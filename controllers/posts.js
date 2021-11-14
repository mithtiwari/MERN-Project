import postMessage from '../models/postMessages.js';
import Mongoose  from 'mongoose';
import express from 'express';


export const getPost=async (req,res)=>{
    try{
            const postMessages= await postMessage.find();
            res.status(200).json(postMessages);
    }
    catch(error){
        res.status(404).json({message:error.message});

    }
    }

export const createPost=async(req,res)=>{
    const { title, message, selectedFile, creator, tags } = req.body;

    const newPostMessage = new postMessage({ title, message, selectedFile, creator, tags })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
   }
   catch(error){
    res.status(409).json({message:error.message});
   }
}

export const updatePost=async(req,res)=>{
    const {id}=req.params;
    const post=req.body;
    if(!Mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that Id');

    const updatedPost=await postMessage.findByIdAndUpdate(id,{...post,id},{new:true});
    res.json(updatedPost);
}

export const deletePost=async(req,res)=>{
    const {id}=req.params;
    if(!Mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that Id');
    await postMessage.findByIdAndRemove(id);
    res.json({message:"Post deleted Successfully"});

}

export const likePost=async(req,res)=>{
    const {id}=req.params;
    if(!Mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that Id');
    const post=await postMessage.findById(id);
    const updatedPost=await postMessage.findByIdAndUpdate(id,{likecount:post.likecount+1},{new:true});
    res.json(updatedPost);
}