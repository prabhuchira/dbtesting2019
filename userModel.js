const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
let userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        default:'User'
    },
    password:{
        type:String
       

    },
    avatar:{
        type:Buffer
    },

    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
}, { toJSON: { virtuals: true } })

userSchema.virtual('tasks',{
    ref:'Tasks',
    localField:'_id',
    foreignField:'owner',

})

userSchema.pre('save', async function (next) {
    const user = this
    console.log(user.password)
    if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
    }
    next()
   })

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id:user._id.toString()},'redhat');

    user.tokens = user.tokens.concat({token})
    return token
}

userSchema.statics.findByCredentials = async function(name,password){
    const member = this;
    let user = await member.findOne({name:name});

    if(!user){
        throw new Error('User not found');
    }
   
    const isMatch = await bcrypt.compare(password,user.password);
    console.log(isMatch)
    if(!isMatch){
        throw new Error('Password is incorrect')
    }
    return user
}



// userSchema.methods.findSimilar = function(cb){
//     return this.model('Users').find({name:this.name},cb)
// }

// userSchema.statics.findByCredentials=async function(name){
//     const member = await user.findOne({name:name})
//     if(!member){
//         throw new Error('User not found')
//     }

// }

let user = mongoose.model('Users',userSchema);

module.exports = user