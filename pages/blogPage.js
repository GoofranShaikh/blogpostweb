const express =require('express');
const router = express.Router();
const blogSchema= require('../model/blog')

//logic goes here
router.post('/blog',async(req,res)=>{
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

module.exports =  router