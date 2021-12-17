//import dependencies
// import express from 'express';
const express = require('express');
// import mongoose from 'mongoose';
const mongoose = require('mongoose');
// import Pusher from 'pusher';
const Pusher = require('pusher');
const cors = require('cors');

// import Message from './Models/Message.js';
const Message = require('./Models/Message.js');

//app configure
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1318607",
    key: "f1f6baffe52aad782eda",
    secret: "ece5e1842c20f17c52ca",
    cluster: "eu",
    useTLS: true
  });
//middleware
app.use(cors());
app.use(express.json()); //--> allows 'req.body' in routes

//db config
const mongoURI = 'mongodb+srv://admin-messenger:0id8QF1qTztcl8fQ@cluster0.crh7h.mongodb.net/imessengerDB?retryWrites=true&w=majority';

mongoose.connect(mongoURI, ()=>{
    console.log("connected to DB");
});

mongoose.connection.once('open', ()=>{
    
    //see any change is collection in DB
    const changeStream = mongoose.connection.collection('messages').watch();

    //whenever something changes in DB this thing will know about it

    changeStream.on('change', (change)=>{
        pusher.trigger('messages', 'newMessage', {
            'change': change
        })
    });

    //Pusher --> kind of tunnel between the frontEnd & backEnd (live changes in DB can be accessed)
})


//api routes
app.get("/", (req, res)=>{
    res.status(200).send('Hello World!');
})

app.use('/save', require('./Routes/save'));
app.use('/retrieve', require('./Routes/retrieve'))

//listener
app.listen(port, ()=>{
    console.log(`Listening on localhost-port: ${port}`);
});