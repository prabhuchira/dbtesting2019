// const as = require('./req')

// console.log(as.one());
// console.log(as.two());

// const fs = require('fs');

// fs.readFile('as.txt',(err,res)=>{
// console.log(res.toString())
// })


// let a = await fs.readFileSync('as.txt');

// let b =  a.toString;
// console.log(b);

const fs = require('fs')
fs.readFile('as.txt',(err,data)=>{
    console.log(data.toString())
})

const {getAss}   = require('./req')


getAss();