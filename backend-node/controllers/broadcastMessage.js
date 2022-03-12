"use strict";

//const res = require("express/lib/response");
const firebase = require("../connection/db");
const firestore = firebase.firestore();

const jwt = require('jsonwebtoken')

const BroadcastMessage = require("../models/BroadcastMessage");
const Message = require("../models/Message")

const BroadcastAnnouncements = async (req, res, next) => {

    try{
        
        const data = req.body;
        
        jwt.verify(req.token, 'secretkey', async (err,d) => {
          if(err) {
            res.sendStatus(403);
          } else { 
        await firestore.collection("Broadcast-Messages").doc().set(data);
        res.status(200).send({message:'Announcement Added Successfully!'});
          }
        })
    } catch(error){
        res.send(error.message);
    }
};


const SendMessage = async (req, res, next) => {

  try{
      
      const data = req.body;
      console.log(data);
      jwt.verify(req.token, 'secretkey',  (err,d) => {
        if(err) {
          res.sendStatus(403);
        } else { 
          data.forEach( async x=>{
            await firestore.collection("Parent-Messages").doc().set(x);
          })
      
      res.status(200).send({message:'Message Sent!'});
        }
      })
     
  } catch(error){
      res.send(error.message);
  }
};



const xlsx = require("node-xlsx");
const fs = require('fs');
const req = require("express/lib/request");




const ViewMessages = async (req, res, next) => {
  try {
   


    const message = await firestore.collection("Parent-Messages").orderBy("date","desc");
    console.log(message)
    const data = await message.get();
    const messageArray = [];
    if (data.empty) {
      res.status(404).send({message: "No Message record found"});
    } else {
      data.forEach((doc) => {
        const message = new Message(
          doc.id,
          doc.data().date,
          doc.data().subject,
          doc.data().parentPhones,
          
          doc.data().message,
          
         
        );
        messageArray.push(message);
      });
      console.log(messageArray)
      res.send(messageArray);
    }
  } catch (err) {
    res.status(400).send({message:err.message});
    // res.status(400).send(error.message);
  }
};



const EditMessage = async (req, res, next) => {
  try {
      const id = req.params.id;
      const data = req.body;
      jwt.verify(req.token, 'secretkey', async (err,d) => {
        if(err) {
          res.sendStatus(403);
        } else { 
      const message =  await firestore.collection('Parent-Messages').doc(id);
      await message.update(data);
      
        res.status(200).send({message:'Message Updated successfuly'});
        }
      })
  } catch (err) {
    res.status(400).send({message:err.message});
     
  }
}



const ViewAnnouncements = async (req, res, next) => {
    try {
     


      const message = await firestore.collection("Broadcast-Messages").orderBy("datePosted","desc");
      console.log(message)
      const data = await message.get();
      const messageArray = [];
      jwt.verify(req.token, 'secretkey', (err,d) => {
        if(err) {
          res.sendStatus(403);
        } else {
      if (data.empty) {
        res.status(404).send({message: "No Message record found"});
      } else {
        data.forEach((doc) => {
          const message = new BroadcastMessage(
            doc.id,
            doc.data().title,
            doc.data().datePosted,
            doc.data().message,
           
          );
          messageArray.push(message);
        });
        console.log(messageArray)
        res.send(messageArray);
      }
        }
      })
    
    } catch (err) {
      res.status(400).send({message:err.message});
      // res.status(400).send(error.message);
    }
  };




  const UpdateAnnouncements = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const message =  await firestore.collection('Broadcast-Messages').doc(id);
        await message.update(data);
      
          res.status(200).send({message:'Message Updated successfuly'});
          
    } catch (err) {
      res.status(400).send({message:err.message});
      
    }
  }



module.exports = {
    BroadcastAnnouncements,
    ViewAnnouncements,
    UpdateAnnouncements,
    SendMessage,
    ViewMessages,
    EditMessage,

  
   




    
};