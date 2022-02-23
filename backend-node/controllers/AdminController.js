"use strict";

const req = require("express/lib/request");
const res = require("express/lib/response");

const firebase = require("../connection/db");
const StudentAttendance = require("../models/StudentAttendance");
const StudentGrade = require("../models/StudentGrade");
const firestore = firebase.firestore();
const SchoolClass = require("../models/Admin");
const Section = require("../models/Admin");

async function checkClass(c){
const schoolClass = await firestore.collection("Class-Information").where("class", "==", c).get();
let classArray = []
if (schoolClass.empty) return true

else return false
}



const AddClass = async (req, res, next) => {
    try {
        
      const data = req.body;
      const schoolClass = data.class;
      let result = await checkClass(schoolClass)

      console.log(data);
  if (result == true){
    await firestore.collection("Class-Information").doc().set(data);
    res.status(200).send({ message: "Class Added successfully" });
  }
      
  else if (result == false)
  res.status(400).send({ message: "Class already exists!" });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  };


const GetClass = async (req,res)=>{


    try {

        const classId = (req.params.classId).toString();
        const classData = await firestore
      .collection("Class-Information").where("class", "==", classId).get();
     const classArray = [];
      classData.forEach((doc)=>{
          const x = new SchoolClass(
              doc.id,
doc.data().class,
doc.data().sections
          )
          classArray.push(x)
      })
      console.log(classArray);
      res.send(classArray);
      
        
    } catch (error) {
        res.status(400).send(error.message)
    }
}



const GetAllClass = async (req,res)=>{


  try {

      
      const classData = await firestore
    .collection("Class-Information").get();
   const classArray = [];
    classData.forEach((doc)=>{
        const x = new SchoolClass(
            doc.id,
doc.data().class,
doc.data().sections
        )
        classArray.push(x)
    })
    console.log(classArray);
    res.send(classArray);
    
      
  } catch (error) {
      res.status(400).send(error.message)
  }
}



// async function UpdateClass(classId,newClass) {
  
 
//   const g = await firestore
//     .collection("Class-Information")
//     .doc(classId)
//     ;
//     await g.update(newClass)

 
//   console.log("updated");
// }
const UpdateClass = async (req, res, next) => {
  try {
      


    
    const data = req.body;
    

    const classId = (req.params.classId).toString();
    const classData = await firestore
  .collection("Class-Information").where("class", "==", classId).get();
  if(classData.empty) res.status(400).send({message: "Class Does Not Exist!"})
  else{const classArray = [];
    classData.forEach((doc)=>{
        const x = new SchoolClass(
            doc.id,
  doc.data().class,
  doc.data().sections
        )
        classArray.push(x)
    })
    let section = classArray[0].section;
    let id = classArray[0].id;
    console.log(section);
    let newData = section.concat(data.sections)
    const uniqueSections = [...new Set(newData)];
    const g = await firestore
      .collection("Class-Information")
      .doc(id)
      ;
      
      const updatedData = {
        class : classId,
        sections : uniqueSections
      }
      console.log(newData, updatedData, uniqueSections)
      
    await g.update(updatedData)
    res.status(200).send({message:"class updated successfully"})
  }
}catch(error){res.status(400).send({message: error.message})
}

   
};
  module.exports = {
      AddClass,GetClass,GetAllClass,UpdateClass
  };


