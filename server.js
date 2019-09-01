const express = require('express');
const path = require('path')
const app = express();

app.listen(3000,()=>{
    console.log('Server listening at 3000');
})

// app.use(express.static(path.join(__dirname,'/newPublic')));


app.set('view engine','hbs');

app.get('',(req,res)=>{
    res.render('index',{

    })
})

const hbs = require('hbs');

hbs.registerPartials(path.join(__dirname,'/templates'))

