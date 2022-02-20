"use strict";

//const res = require("express/lib/response");
const firebase = require("../connection/db");
const firestore = firebase.firestore();


const BroadcastMessage = require("../models/BroadcastMessage");

const AddBroadcast = async (req, res, next) => {

    try{
        
        const data = req.body;
        
            
        await firestore.collection("Broadcast-Messages").doc().set(data);
        res.status(200).send({message:'data added successfully'});
        
       
    } catch(error){
        res.send(error.message);
    }
};



// const AddB = async (req, res, next) => {

//   try{
      
//       const data = req.body;
//       async function add(x){
//         await firestore.collection("Broadcast-Messages").doc().set(x);
//       }
//       data.forEach((x)=>{
//         add(x);
        
//         // console.log(x);
//       }); 
//       res.status(200).send({message:"Messag Added successfully"});
          
//       //  await firestore.collection("Broadcast-Messages").doc().set(data);
//       // res.status(200).send({message:"Message Added successfully"});
      
     
//   } catch(error){
//       res.send(error.message);
//   }
// };

const xlsx = require("node-xlsx");
const fs = require('fs');
const req = require("express/lib/request");









const AddB = async (req, res, next) => {

  try{
    let data = xlsx.parse(fs.readFileSync("grade.xlsx"));
let arrayOfData = data[0].data;
let bigArray = [];
for (let i = 1; i < arrayOfData.length; i++) {
  let obj = {};
  for (let j = 0; j < arrayOfData[i].length; j++) {
    let key = arrayOfData[0][j];
    let value = arrayOfData[i][j];
    obj[key] = value;
    // obj = {
    //   arrayOfData[0][j]:" "
    // }
  }
  bigArray.push(obj)
}

fs.writeFileSync("junk.json", JSON.stringify(bigArray))
     
      // const data = req.body;
      async function add(x){
        // console.log(x);
        try {
          
          await firestore.collection("Grade").doc("first-term").collection("grade-9").doc("section A").collection("maths").doc().set(x);
        } catch (error) {
          console.log(error)
        }
      }
      bigArray.forEach(async (x)=>{
       await add(x);
        // console.log(x);
        
        // console.log(x);
      }); 
      res.status(200).send({message:bigArray});
          
      //  await firestore.collection("Broadcast-Messages").doc().set(data);
      // res.status(200).send({message:"Message Added successfully"});
      
     
  } catch(error){
      res.send(error.message);
  }
};







const getB = async (req, res, next) => {
  try{
      
      const id = req.params.id;

      const student = await firestore.collection("Grade").doc("first-term").collection("grade-9").doc("section A").collection("maths").where("student-id", "==", id);
      const data = await student.get();
      // async function add(x){
      //   await firestore.collection("Grade").doc("first-term").collection("grade-9").doc("maths").collection("student-grades").doc().set(x);
      // }
      // data.forEach((x)=>{
      //   add(x);
      //   console.log(x);
        
      //   // console.log(x);
      data.forEach((doc) => {
        console.log(doc.data())
     
          
      })
      // }); 
      res.status(200).send(doc.data());
          
      //  await firestore.collection("Broadcast-Messages").doc().set(data);
      // res.status(200).send({message:"Message Added successfully"});
      
     
  } catch(error){
      res.send({message: error.message});
  }
};

const getGrades = async (req, res, next) => {

  try{
      
      // const id = req.params.id;

      const student = await firestore.collection("Grade").doc("first-term").collection("grade-9").doc("section A").collection("maths");
      const data = await student.get();
      // async function add(x){
      //   await firestore.collection("Grade").doc("first-term").collection("grade-9").doc("maths").collection("student-grades").doc().set(x);
      // }
      // data.forEach((x)=>{
      //   add(x);
      //   console.log(x);
        
      //   // console.log(x);
      data.forEach((doc) => {
        console.log(doc.data())
     
          
      })
      // }); 
      res.status(200).send(doc.data());
          
      //  await firestore.collection("Broadcast-Messages").doc().set(data);
      // res.status(200).send({message:"Message Added successfully"});
      
     
  } catch(error){
      res.send({message: error.message});
  }
};





const getBroadcastMessages = async (req, res, next) => {
    try {
     


      const message = await firestore.collection("Broadcast-Messages").orderBy("datePosted","desc");
      console.log(message)
      const data = await message.get();
      const messageArray = [];
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
    updateBroadcastMessage,
    AddB,
    getB,
    getGrades,



    
};