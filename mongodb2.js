const mongodb = require('mongodb');

mongodb.connect('mongodb://127.0.0.1:27017',{useNewUrlParser:true},(error,client)=>{
    if(error){
        throw new Error('Failure in connecting to db');
    }
    
    let db = client.db('testing');

    // db.collection('Users').insertMany([{
    //     name:'chinnu'
    // },{
    //     name:'waste fellow'
    // }])

// db.collection('Users').find({name:'waste fellow'}).toArray((error,res)=>{
//     console.log(res)
// })

db.collection('Users').updateOne({name:'waste fellow'},{
    $set:{
        name:'hero'
    }
})



    // db.collection('Users').deleteOne({name:'chinnu'})
    
})