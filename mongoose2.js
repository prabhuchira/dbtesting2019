const mongoose = require('mongoose');
const userModel = require('./userModel');
const taskModel = require('./taskModel');
const express = require('express');
const app = express();
const brcypt = require('bcryptjs');
const router2 = require('./router');
const jwt = require('jsonwebtoken');
const taskRouter = require('./taskRouter')
const auth = require('./auth');
app.listen(process.env.PORT,()=>{
    console.log('Successfully connected')
})

app.use(auth);

app.use(taskRouter);

mongoose.connect(process.env.MONGODB_URL,{useCreateIndex:true,useNewUrlParser:true},()=>{
    console.log('Server is successfully connected');
})

// let pk = new userModel({
//     name:'chinnubro',
//     password:1234
// }).save().then(res=>console.log(res))

app.use(express.json());
app.use(router2);
app.get('/',async function(req,res){
    res.send('Hello guys! DB IS working')    
})
app.post('/users',async (req,res)=>{
        const user = new userModel(req.body);
    try{

         await user.save()
         const token = await user.generateAuthToken();
         
         res.status(201).send(user)

}
    catch(e){
        res.send('Error in saving user');
        console.log(e)
    }


})

let main = async function(){
    let user = await userModel.findById('5d6979e78e724129742c33bd');
    let u = await user.populate('tasks').execPopulate()
    console.log(u.tasks)
}

// main();


app.get('/users',async (req,res)=>{

    userModel.find(req.body).then(result=>{
        res.send(result);
    })

})



app.get('/users/:id',async(req,res)=>{
    const _id = req.params.id;
    
    userModel.findById(_id).then(user=>{
        res.send(user);
    })
} )

app.get('/me',auth,async(req,res)=>{
    res.send(req.user)
})

app.get('/login',async(req,res)=>{
    try{
     let member = await userModel.findByCredentials(req.body.name,req.body.password);
   let token = await member.generateAuthToken();
    await member.save()
    
     res.send({member,token});
    }
    catch(e){
     console.log(e)
    }
 })

app.patch('/users',auth,async(req,res)=>{
    // let id = req.params.id;
    const allowedupdates = ['name','password'];
    const updates = Object.keys(req.body);
   console.log(updates)
    let isValid = updates.every((win)=> allowedupdates.includes(win));
    console.log(isValid)

    if(!isValid){
        return res.send('Error').status(400)
    }

    // let user = await userModel.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})

    updates.forEach(update=>{
         req.user[update] = req.body[update]
    })

    req.user.save().then(()=>{
       res.send(req.user)
    })
   
})




app.get('/logout',auth,async function(req,res){
   try{
    req.user.tokens = req.user.tokens.filter((token)=>{
        return token.token !== req.token
     
    });

    await req.user.save();
    res.send(req.user);
   }catch(e){
    res.send('Error').status(500);
   }
})


app.get('/logoutall',auth,async function(req,res){
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send(req.user);
        
    }catch(e){
        res.send('Error').status(500)
    }
})

app.delete('/me',auth,async function(req,res){
    req.user.remove();
    res.send('Successfully deleted')
})

const multer = require('multer');
// const upload = multer({
//     // dest:'images'
    
// })

// app.post('/upload',auth,upload.single('upload'),async function(req,res){
//     console.log(req.file.buffer)
//     console.log(req.user) 
//     req.user.avatar = req.file.buffer;
//     await req.user.save();
//     res.send();
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })


app.get('/avatar/:id',async function(req,res){
        let id = req.params.id;
        console.log(id)

        let mem = await userModel.findById({_id:id});
        res.set('Content-Type','image/json');
        res.send(mem.avatar);
})

// const postmark = require('postmark');

// var client = new postmark.ServerClient('b9068f1b-ff5c-4521-b2c2-c2b12db033f1');

// client.sendEmail({
//     "From":"prabhu.chira@upscalesoft.in",
//     "To":"prabhu.chira@upscalesoft.in",
//     "Subject":"Test",
//     "TextBody":"Hello from ues"
// })

