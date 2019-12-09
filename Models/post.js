const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const PostSchema=mongoose.Schema({
    postTitle:{
        type:Schema.Types.String
    },
    postDate:{
        type:Schema.Types.Date
    },
    postText:{
        type:Schema.Types.String
    },
    postLink:{
        type:Schema.Types.String
    },
    postImage:{
        type:Schema.Types.String
    },
    email:{
        type:Schema.Types.String
    }
})
module.exports=mongoose.model('Post',PostSchema);