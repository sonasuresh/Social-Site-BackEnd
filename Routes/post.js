const express=require('express');
const router=express.Router();
const post=require('../Models/post')
const comment = require('../Models/comment')
var moment=require('moment');

// include google id Token verifier - verifier

router.post('/newPost',(req,res)=>{
    // verifier ( req.body.idToken, (verifiedToken)=>{
    //  if(verifiedToken){ token verified } else { send error message }
    //})
    let newPost=new post({
    postTitle:req.body.postTitle,
    postDate:moment().format('YYY-MM-DD HH:mm:ss Z'),
    postText:req.body.postText,
    postLink:req.body.postLink,
    postImage:req.body.postImage,
    email:req.body.email
    })
    newPost.save((saveError,saveData)=>{
        if(saveError)
        {
            res.json({
                success:false,
                message:'DB Error'
        
            })
        }
        else{
            res.json({
                success:true,
                message:'Posted'
            })
        }
    })
})
router.post('/deletePost',(req,res)=>{
    post.findByIdAndDelete(req.body.id,(removeError,removeDocs)=>{
        if(removeError){
            res.json({
                success:false,
                message:'Error'
            })
        }
        else{
            comment.remove({postId: req.body.id}, (commentRemoveError, commentRemoveDocs)=>{
                if(commentRemoveError){
                    res.json({
                        success:false,
                        message:'Error'
                    })
                } else {
                    res.json({
                        success:true,
                        message:'Post Deleted'
                    })
                }
            })
        }
    })
})
router.post('/update',(req,res)=>{
    post.findByIdAndUpdate(req.body.id,{$set:{
        postImage:req.body.postImage,postText:req.body.postText,postLink:req.body.postLink,postImage:req.body.postImage,email:req.body.email
    }},(updateError,updateDocuments)=>{
        if(updateError){
            res.json({
                success:false,
                message:'Error'
            })
        }else{
            res.json({
                success:true,
                postDate:moment().format('YYYY-MM-DD HH:mm:ss Z'),
                message:'Post Updated'
            })
        }
    })
})
router.get('/getallPost',(req,res)=>{
    post.find({}).sort({postDate:-1}).exec((findError,findDocuments)=>{
        if(findError){
          res.json({
            success:false,
            message:'DB Error'
          })  
        }else{
            res.json({
                success:true,
                message:findDocuments
            })
        }
    })
})
router.get('/getmyPosts/:email', (req, res) => {
    post.find({ email: req.params.email}).sort({postDate:-1}).exec((findError, findDocuments) => {
        if (findError) {
            res.json({
                success: false,
                message: 'DB Error'
            })
        } else {
            res.json({
                success: true,
                message: findDocuments
            })
        }
    })
})
module.exports=router