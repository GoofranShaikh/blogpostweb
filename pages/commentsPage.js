const express=require('express');
const router =express.Router();
const commentSchema=require('../model/comments')
const auth = require("../middleware/auth");

router.post('/create',auth,async(req,res)=>{
    try{
    const comments = new commentSchema({
        userid:req.body.userid,
        blogid:req.body.blogid,
        comment:req.body.comment,
        likes:req.body.likes,
        username:req.body.username
    })

    await comments.save()
    res.status(200).json(comments)
}
catch(err){
console.log(err)
res.status(400).send(err.errors)
}
})

module.exports=router