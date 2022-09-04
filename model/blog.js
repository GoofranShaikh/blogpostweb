const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
        },
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    }

})

module.exports = mongoose.model('userBlogs', blogSchema)