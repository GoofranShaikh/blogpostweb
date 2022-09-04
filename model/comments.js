const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    blogid: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    comment:{
        type:String,
        require:true
    },
    likes:{
        type:Number,
        default:0
    },
    username:{
        type:String,
        require:true
    }
})

module.exports= mongoose.model('comments',commentSchema)