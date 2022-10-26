const express =require('express');
const router = express.Router();
const blogSchema= require('../model/blog')
const userSchema= require('../model/user')
const auth = require("../middleware/auth");
const mongoose  =require("mongoose")

//logic for creating blog goes here
router.post('/blog',auth,async(req,res)=>{
    try{
    const blog = new blogSchema({
        userid:req.body.userid,
        title:req.body.title,
        description:req.body.description,
        username:req.body.username
    })

    await blog.save()
    res.status(200).json(blog);
}
catch (error){
console.log(err)
res.status(400).send(err.errors)
}
})

router.post('/renderBlog',auth,async(req,res)=>{
try{
  if(req.body.userid){
 const getmyBlogs=await userSchema.aggregate([
        {
          $match:{
           _id:mongoose.Types.ObjectId(req.body.userid)
          }
        },
        {
        $lookup:{
          "from":"userblogs",
          "localField":"_id",
          "foreignField":"userid",
          "as":"userblogsmapping"
        }}
        ])
        res.status(200).json(getmyBlogs)
      }else{
        res.status(400).send("userid field is missing")
      }
}
catch(error){
console.log(error)
res.status(400).send(error)
}
})

router.post('/renderComments',auth,async(req,res)=>{
  try{
    if(req.body.blogid){
   const getComments=await blogSchema.aggregate([
          {
            $match:{
             _id:mongoose.Types.ObjectId(req.body.blogid)
            }
          },
          {
          $lookup:{
            "from":"comments",
            "localField":"_id",
            "foreignField":"blogid",
            "as":"blogCommentsMapping"
          }}
          ])
          res.status(200).json(getComments)
        }else{
          res.status(400).send("blogid field is missing")
        }
  }
  catch(error){
  console.log(error)
  res.status(400).send(error)
  }
  })

  router.post('/getblog',auth,async(req,res)=>{
    try{
      if(req.body.blogid){
      const blogDetails= await blogSchema.findOne({_id:mongoose.Types.ObjectId(req.body.blogid)})
            res.status(200).json(blogDetails)
          }else{
            res.status(400).send("blogid field is missing")
          }
    }
    catch(error){
    console.log(error)
    res.status(400).send(error)
    }
    })

module.exports =  router