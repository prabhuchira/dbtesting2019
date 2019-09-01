const http = require('http');
const hbs = require('hbs');
const express = require('express');
const path = require('path')
const app = express();
const port = 3000;
const fetch = require('fetch')
app.listen(port,()=>{
    console.log('Server has connected successfully at ' + port)
})

// app.get('',(req,res)=>{
//    res.send('<h1>Hi world</h1>')
// })

console.log(path.join(__dirname,'/public'));
console.log(__filename);

const publicPath = path.join(__dirname,'/views')

const template = path.join(__dirname,'/templates');

hbs.registerPartials(template);

app.set('view engine','hbs');





app.get('',(req,res)=>{
    res.render('index',{
        title:'lonely'
    })
})


app.get('/product',(req,res)=>{
    console.log(req.query.key)

    if(!req.query.key){
        return res.send('No key has provided')
    }
    res.send('products has come')
})

var request = require('request');

// request(,(err,res)=>{
//     console.log(res.body)
// })

// var options = {
//     url:'https://jsonplaceholder.typicode.com/photos/',
//     headers:{
//         'status':500
//     }
// }

// function callback(err,res,body){
//     console.log(body);
// }

// request(options,callback);


// const [a,b,...waste]=[10,20,30,40,50,60,70,80,90,100];
// console.log(waste);
// console.log(a);
// console.log(b)

// const https = require('https');

// const request2 = https.request('https://jsonplaceholder.typicode.com/photos/',(response)=>{
//     let data = '';

//     response.on('data',(res)=>{
//         data = res + data;
//     })

//     response.on('end',(res)=>{
//         console.log(data)
//     })
// })

// request2.end()

function get(name="fucking"){
    console.log(name)
}

get('lom')

fetch('https://jsonplaceholder.typicode.com/photos/').then(res=>{
    console.log(res.json());
})