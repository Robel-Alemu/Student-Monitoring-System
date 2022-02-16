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
  module.exports = {
      AddClass,GetClass
  };