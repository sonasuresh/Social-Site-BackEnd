const express=require('express')
const app=express()
const cors=require('cors')
const bodyparser=require('body-parser')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors({orgin:'http://localhost:4200'}));
app.use(cors({orgin:'http://localhost:3000'}));
const PORT=3000;
const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/post',{useNewUrlParser:true},(err)=>{
    if(err)
    {
        console.log("error")
    }
    else{
        console.log("connected to mongodb")
    }
})
//const postRoute=require('./Routes/post')
const commentRoute=require('./Routes/comment')
const postRoute=require('./Routes/post')

//app.use('/post',postRoute)
app.use('/comment',commentRoute)
app.use('/post',postRoute)
app.listen(PORT,()=>{
    console.log('Server started on port'+PORT)
})