const mongodb = require('mongodb');


const database = 'task-manager';

const objectId = mongodb.ObjectID;

const id = new objectId();

console.log(id.id.length)
mongodb.connect('mongodb://127.0.0.1:27017',{useNewUrlParser:true},(error,client)=>{

    if(error){
        console.log('Error occured when connecting to the server');
    }
    console.log('Mongodb is successfully connected')

    const db = client.db(database);

    // db.collection('tasks').updateOne({
    //     task:'clear backlogs'
    // },{$set:{
    //     task:'all clear'
    // }}).then(()=>{
    //     console.log('Wow');
    // })

    // db.collection('users').insertOne({
    //     name:'vijay',
    //     rollno:2
    // })

    // db.collection('users').deleteOne({name:'pk'})
    db.collection('tasks').find({task:'waste fellow'}).toArray((err,res)=>console.log(res))
})





