const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema=mongoose.Schema({
    commentText:{
        type:Schema.Types.String
    },
    postId:{
        type:Schema.Types.ObjectId,
        ref:'Post'
    },
    commentDate:{
        type:Schema.Types.Date
    },
    email:{
        type:Schema.Types.String
    }
    
})
module.exports=mongoose.model('comment',CommentSchema);