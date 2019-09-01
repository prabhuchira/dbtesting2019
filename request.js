const request = require('request');

request.get({url:'https://dog.ceo/api/breeds/image/random',json:true},(error,res)=>{
    console.log(res.body);
})