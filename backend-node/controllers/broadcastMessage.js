"use strict";

//const res = require("express/lib/response");
const firebase = require("../connection/db");
const firestore = firebase.firestore();


const BroadcastMessage = require("../models/BroadcastMessage");

const AddBroadcast = async (req, res, next) => {

    try{
        
        const data = req.body;
        
            
         await firestore.collection("Broadcast-Messages").doc().set(data);
        res.status(200).send({message:"Message Added successfully"});
        
       
    } catch(error){
        res.send(error.message);
    }
};



const getBroadcastMessages = async (req, res, next) => {
    try {
     


      const message = await firestore.collection("Broadcast-Messages");
      
      const data = await message.get();
      const messageArray = [];
      if (data.empty) {
        res.status(404).send({message: "No Message record found"});
      } else {
        data.forEach((doc) => {
          const message = new BroadcastMessage(
            doc.id,
            doc.data().datePosted,
            doc.data().message,
           
          );
          messageArray.push(message);
        });
        res.send(messageArray);
      }
    } catch (err) {
      res.status(400).send({message:err.message});
      // res.status(400).send(error.message);
    }
  };




  const updateBroadcastMessage = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const message =  await firestore.collection('Broadcast-Messages').doc(id);
        await message.update(data);
        // const account =  await firestore.collection('User-Accounts').doc(id);
       
        // message.forEach((doc) => {
        //     doc.ref.update(data);
        //   });
          res.status(200).send({message:'Message Updated successfuly'});
        // await student.update(data);
        // res.send('Account updated successfuly');        
    } catch (err) {
      res.status(400).send({message:err.message});
        // res.status(400).send(error.message);
    }
  }



module.exports = {
    AddBroadcast,
    getBroadcastMessages,
    updateBroadcastMessage
    
};