// import express from 'express';
const express = require('express');

const router = express.Router();
const Message = require("../Models/Message.js");

router.post("/message",(req, res)=> {
    const newMessage = req.body;
    Message.create(newMessage, (err, data)=>{
        if(err) { res.status(500).send(err); }
        else { res.status(201).send(data)};
    })
});

module.exports = router;