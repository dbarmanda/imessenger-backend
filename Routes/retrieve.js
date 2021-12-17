const express = require('express');
const router = express.Router();
const Message = require('../Models/Message');


router.get("/conversation", (req, res)=>{

    Message.find((err, data)=>{
        if(err){
            res.status(500).send(err);
        } else {
            data.sort((b,a)=>{
                return a.timestamp - b.timestamp;
            });
            res.status(200).send(data);
        }
    });
})


module.exports = router;