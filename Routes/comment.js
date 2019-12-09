const express=require('express');
const router=express.Router();
const comment=require('../Models/comment');
var moment=require('moment');

router.post('/newComment',(req,res)=>{
    let newComment=new comment({
      //req.body.name this name should be available in front end body
      commentText:req.body.commentText,
      postId:req.body.postId, 
      email:req.body.email,    
      commentDate:moment().format('YYY-MM-DD HH:mm:ss Z')
    })

    newComment.save((saveError,saveData)=>{
        if(saveError){
            res.json({
                success:false,
                message:'DB Error'
            })
        }
        else{
            res.json({
                success:true,
                message:'Commented'
            })
        }
    })
})
router.get('/getmyComments/:email', (req, res) => {
    comment.find({ email: req.params.email }).populate('postId').exec((findError, findDocuments) => {
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
router.get('/getComments/:id',(req,res)=>{
    comment.find({postId:req.params.id}).exec((findError,findDocuments)=>{
        if(findError){
            res.json({
                success:false,
                message:'Error'
            })
        }else{
            res.json({
                success:true,
                message:findDocuments
            })
        }
    })
})
router.post('/delete',(req,res)=>{
    comment.findByIdAndDelete(req.body.id,(removeError,removeDocs)=>{
        if(removeError){
            res.json({
                success:false,
                message:'Error'
            })
        }else{
            res.json({
                success:true,
                message:'Comment deleted'
            })
        }
    })
})
router.post('/update',(req,res)=>{
    comment.findByIdAndUpdate(req.body.id,{$set:{
        commentText:req.body.commentText
    }},(updateError,updateDocuments)=>{
        if(updateError){
            res.json({
                success:false,
                message:'Error'
            })
        }else{
            res.json({
                success:true,
                commentDate:moment().format('YYYY-MM-DD HH:mm:ss Z'),
                message:'Updated'
            })
        }
    })
})

module.exports=router