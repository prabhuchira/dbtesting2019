const express = require('express');
const auth = require('./auth')

const router = express.Router();
const userModel = require('./userModel');
const Task = require('./taskModel');

const main = async function(){
    let user = await Task.findById('5d697c63ec8c151eb428d292')
    let drone = await user.populate('owner').execPopulate(
        
    ).then(res=>res);
    console.log(drone);
    
    
}

// main();
router.use(express.json());
router.get('/tasks/:id',auth,async function(req,res){
    const id = req.params.id;
    try{
        const task = await Task.findOne({_id:id,owner:req.user._id});
        res.send(task)
    }catch(e){
        console.log(e)
    }
    
})


router.get('/tasks',auth,async function(req,res){
    let user = req.user;
    console.log('Stop here')
    try{
        let userTasks = await user.populate({path:'tasks',match:{name:'movie'}}).execPopulate().then(res=>res.tasks);
        res.send(userTasks);
    }catch(e){
        console.log(e)
    }
    

})

router.patch('/updatetasks/:id',auth, async function(req,res){
    const id = req.params.id;
   
    console.log(id);
    try{
        console.log(req.body)
        const task = await Task.findOne({_id:id,owner:req.user._id});
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name','body'];

        let isValid = updates.every((update)=>
             allowedUpdates.includes(update)
        )

        if(!isValid){
            throw new Error('Error in updating');
        }

        updates.forEach(update=>{
            task[update] = req.body[update];
        })

        await task.save();



        res.send(task)
    }catch(e){
        console.log(e)
        res.send('Error')
    }
})



router.post('/tasks',auth,async function(req,res){
    console.log(req.body)
    const task = new Task({...req.body,owner:req.user._id
    
    });

    try{
        let win = await task.save();
        res.status(200).send(win);
    }catch(e){
        throw new Error(e);
    }

})


module.exports = router;