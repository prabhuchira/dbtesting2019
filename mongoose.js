const mongoose = require('mongoose');


//const db = clice.
mongoose.connect('mongodb://127.0.0.1:27017/mongodb-api',{useCreateIndex:true,useNewUrlParser:true},()=>{
    console.log('Mongodb has successfully connected');
})

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        default:'amber'
    },
    age:{
        type:Number,
        validate(type){
            if(type>15){
                throw new Error('Fuck me')
            }
        }
    },
    
})


const User = mongoose.model('User',userSchema)

const pk = new User({
    name:'ckias',
    age:14
})

pk.save().then((error,res)=>{
    console.log('Successfuly saved')
})