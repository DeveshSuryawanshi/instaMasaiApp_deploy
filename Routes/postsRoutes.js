const express = require("express");
const {PostModel} = require('../Models/postModel');
const {auth} = require("../Middleware/auth.Middleware");
const postRouter = express.Router();

postRouter.post("/add",auth, async(req, res) =>{
    const postdata = req.body;
    try{
        const post = new PostModel(postdata);
        await post.save();
        res.send({"msg" : "New Post has been Added"});
    }catch(error){
        res.send({"error" : error})
    }
})

postRouter.get("/", auth, async(req, res) =>{
    const q = req.query;
    try {
        const posts = await PostModel.find(q);
        res.send(posts);
    } catch (error) {
        res.status.apply(404).send({'msg' : error})
    }
})

postRouter.patch("/update/:postID", auth, async(req, res) =>{
    const {postID} = req.params;
    try {
        await PostModel.findByIdAndUpdate({_id : postID});
        res.status(200).send({"msg" : `Post with id : ${postID} updated Successfully`});
    } catch (error) {
        res.status(404).send({"error" : error});
    }
})

postRouter.delete("/delete/:postId", auth, async(req, res)=>{
    const {postID} = req.params;
    try {
        await PostModel.findByIdAndDelete({_id:postID}, req.body);
        res.status(200).send({"msg" : `Post with id:${postID} has been deleted`})
    } catch (error) {
        res.status(404).send({"error" : error});
    }
})

module.exports = {
    postRouter
}