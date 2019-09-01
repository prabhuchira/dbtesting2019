const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
   
    body:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    }
},  {
    timestamps:true    
},

{ toJSON: { virtuals: true }})

const task = mongoose.model('Tasks',taskSchema)

module.exports = task;