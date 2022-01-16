"use strict";

//const res = require("express/lib/response");
const firebase = require("../connection/db");
const firestore = firebase.firestore();
const StudentInformation = require("../models/StudentInformation");



const AddStudent = async (req, res, next) => {

    try{
        
        const data = req.body;
        
            
         await firestore.collection("Student-Information").doc().set(data);
         
         res.status(200).send({message:"Student Added successfully"});
        
       
    } catch(err){
      res.status(400).send({message:err.message});
        // res.send(error.message);
    }
};

const getStudent = async (req, res, next) => {
    try {
      const studentId = req.params.studentId;


      const student = await firestore.collection("Student-Information").where("studentId", "==", studentId);
      const data = await student.get();
      const studentArray = [];
      if (data.empty) {
        res.status(404).send({message:"No student record found"});
      } else {
        data.forEach((doc) => {
          const student = new StudentInformation(
            doc.id,
            doc.data().studentId,
            doc.data().firstName,
            doc.data().lastName,
            doc.data().grade,
            doc.data().section,
            doc.data().parent1Name,
            doc.data().parent1Phone,
            doc.data().parent2Name,
            doc.data().parent2Phone
          );
          studentArray.push(student);
        });
        res.send(studentArray);
      }
    } catch (err) {
      res.status(400).send({message:err.message});
      // res.status(400).send(error.message);
    }
  };


  
const getAllStudent = async (req, res, next) => {
  try {
    


    const student = await firestore.collection("Student-Information");
    const data = await student.get();
    const studentArray = [];
    if (data.empty) {
      res.status(404).send("No student record found");
    } else {
      data.forEach((doc) => {
        const student = new StudentInformation(
          doc.id,
            doc.data().studentId,
            doc.data().firstName,
            doc.data().lastName,
            doc.data().grade,
            doc.data().section,
            doc.data().parent1Name,
            doc.data().parent1Phone,
            doc.data().parent2Name,
            doc.data().parent2Phone
        );
        studentArray.push(student);
      });
      res.send(studentArray);
    }
  } catch (err) {
    res.status(400).send({message:err.message});
    // res.status(400).send(error.message);
  }
};




const updateStudent = async (req, res, next) => {
  try {
      const id = req.params.id;
      const data = req.body;
      const student =  await firestore.collection('Student-Information').where("studentId", "==", id).get();
      

      student.forEach((doc) => {
          doc.ref.update(data);
        });
        res.status(200).send({message:'Student Updated successfuly'});
      // await student.update(data);
      // res.send('Account updated successfuly');        
  } catch (err) {
    res.status(400).send({message:err.message});
      res.status(400).send(error.message);
  }
}




const deleteStudent = async (req, res, next) => {
  try {
      const id = req.params.id;
      
      const student =  await firestore.collection('Student-Information').where("studentId", "==", id).get();
      

      student.forEach((doc) => {
        doc.ref.delete();
        });
        res.status(200).send({message:'Student deleted successfuly'});
      // await student.update(data);
      // res.send('Account updated successfuly');        
  } catch (err) {
    res.status(400).send({message:err.message});
      // res.status(400).send(error.message);
  }
}

module.exports = {
    AddStudent,
    getStudent,
    getAllStudent,
    updateStudent,
    deleteStudent
};