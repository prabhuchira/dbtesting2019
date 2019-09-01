const express = require('express');
const router = new express.Router();

router.get('/windows',async(req,res)=>{
    res.send('Its working');
})


module.exports = router;