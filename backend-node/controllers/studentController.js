"use strict";

//const res = require("express/lib/response");
const firebase = require("../connection/db");
const firestore = firebase.firestore();
const StudentInformation = require("../models/StudentInformation");

const AddStudent = async (req, res, next) => {
  try {
    const data = req.body;

    await firestore.collection("Student-Information").doc().set(data);

    res.status(200).send({ message: "Student Added successfully" });
  } catch (err) {
    res.status(400).send({ message: err.message });
    // res.send(error.message);
  }
};

const getStudent = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;

    const student = await firestore
      .collection("Student-Information")
      .where("studentId", "==", studentId);
    const data = await student.get();
    const studentArray = [];
    if (data.empty) {
      res.status(404).send({ message: "No student record found" });
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
    res.status(400).send({ message: err.message });
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
    res.status(400).send({ message: err.message });
    // res.status(400).send(error.message);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const student = await firestore
      .collection("Student-Information")
      .where("studentId", "==", id)
      .get();

    student.forEach((doc) => {
      doc.ref.update(data);
    });
    res.status(200).send({ message: "Student Updated successfuly" });
    // await student.update(data);
    // res.send('Account updated successfuly');
  } catch (err) {
    res.status(400).send({ message: err.message });
    res.status(400).send(error.message);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const id = req.params.id;

    const student = await firestore
      .collection("Student-Information")
      .where("studentId", "==", id)
      .get();

    student.forEach((doc) => {
      doc.ref.delete();
    });
    res.status(200).send({ message: "Student deleted successfuly" });
    // await student.update(data);
    // res.send('Account updated successfuly');
  } catch (err) {
    res.status(400).send({ message: err.message });
    // res.status(400).send(error.message);
  }
};

const AddGrade = async (req, res) => {
  try {
    const data = req.body;
    const lastItem = data.length - 1;
    // console.log(data.length);
    const grade = data[lastItem].grade;

    const term = data[lastItem].term;

    const section = data[lastItem].section;

    const subject = data[lastItem].subject;
    const defaultValue = "";
    let flag = 0;
    async function addGrade(grades) {
      // console.log(x);

      await firestore
        .collection("Grade")
        .doc(term)
        .collection("grade-" + grade)
        .doc("section " + section)
        .collection(subject)
        .doc()
        .set(grades);
    }
    data.pop();


    function checkUniqueStudentId(array){
      let isUnique = true;
      let idExist = true;
let items = array.length;
console.log(array);
      for(let i=0; i< items; i++){
        console.log(array[i].studentId)
        if (array[i].studentId==undefined){
idExist = false;
break;

        }
        // idExist = true;
        for(let j=i+1; j<items; j++ ){
          
          console.log(array[j].studentId);
          if (array[i].studentId == array[j].studentId)
            isUnique = false;
            console.log(isUnique);
            break;
        }
        if (isUnique == false)
        break;
      }
      console.log(isUnique,idExist);
      const result = {
        studentIdExist : idExist,
        studentIsUnique: isUnique
      }
      return (result);
    }

    let validate = checkUniqueStudentId(data)
    if (validate.studentIdExist && validate.studentIsUnique){
      data.forEach(async (g) => {
        if (g.firstTest == undefined) g.firstTest = defaultValue;
        if (g.secondtTest == undefined) g.secondTest = defaultValue;
        if (g.final == undefined) g.final = defaultValue;
        if (g.assessements == undefined) g.assessements = defaultValue;
        // if (g.studentId == undefined) {
        //   res
        //     .status(400)
        //     .send({ message: "Student Id must not be empty! Please check file" });
        //   return false;
        // }
        
        // else {
          await addGrade(g);
          // flag = 1;
          return true;
        
      });
      
        res.status(200).send({ message: "Grades added successfully!" });
    }

    else if(!validate.studentIdExist) {
      res.status(400).send({ message: "Student id must not be empty among the data, please try again" });
    }
    else if(!validate.studentIsUnique) {
      res.status(400).send({ message: "Student id is not unique among the data, please try again" });
    }
   
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: error.message });
  }
};


const AddAttendance = async (req, res) => {
  try {
    const data = req.body;
    const lastItem = data.length - 1;
    // console.log(data.length);
    const grade = data[lastItem].grade;

    const term = data[lastItem].term;

    const section = data[lastItem].section;

    const datePosted = data[lastItem].datePosted;
    const year = data[lastItem].year;
    const type = data[lastItem].type;
    const defaultDate = datePosted;
  if (type === "attendance"){
    async function addAttendance(attendance) {
      // console.log(x);

      await firestore
        .collection("Attendance")
        .doc(year)
        .collection(term)
        .doc("grade-" + grade)
        .collection("section " + section)
        .doc()
        .set(attendance);
    }
    data.pop();


    function checkAttendanceValidity(array){
      let isUnique = true;
      let idExist = true;
      let statusExist = true;
      
let items = array.length;
console.log(array);
      for(let i=0; i< items; i++){
        console.log(array[i].studentId)
        if (array[i].studentId==undefined){
idExist = false;
break;

        }
        if (array[i].status==undefined){
statusExist = false;
break;

        }
        // idExist = true;
        for(let j=i+1; j<items; j++ ){
          
          console.log(array[j].studentId);
          if (array[i].studentId == array[j].studentId)
            isUnique = false;
            console.log(isUnique);
            break;
        }
        if (isUnique == false)
        break;
      }
      console.log(isUnique,idExist,statusExist);
      const result = {
        studentIdExist : idExist,
        studentIsUnique: isUnique,
        attendanceStatusExist : statusExist
      }
      return (result);
    }

    let validate = checkAttendanceValidity(data)
    if ((validate.studentIdExist) && (validate.studentIsUnique) && (validate.attendanceStatusExist)){
      data.forEach(async (g) => {

        if (g.term == undefined) g.term = term;
        if (g.grade == undefined) g.grade = grade;
        if (g.section == undefined) g.section = section;
        if (g.date == undefined) g.date = defaultDate;
        // if (g.studentId == undefined) {
        //   res
        //     .status(400)
        //     .send({ message: "Student Id must not be empty! Please check file" });
        //   return false;
        // }
        
        // else {
          // g.datePosted = datePosted
          await addAttendance(g);
          // flag = 1;
          return true;
        
      });
      
        res.status(200).send({ message: "Attendance added successfully!" });
    }

    else if(!validate.studentIdExist) {
      res.status(400).send({ message: "Student id must not be empty among the data, please try again" });
    }
    else if(!validate.studentIsUnique) {
      res.status(400).send({ message: "Student id is not unique among the data, please try again" });
    }
    else if(!validate.attendanceStatusExist) {
      res.status(400).send({ message: "Student attendance status should not be empty, please try again" });
    }
  }
  else 
  res.status(400).send({ message: "data is not correct format for attendance" });
   
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: error.message });
  }

};


module.exports = {
  AddStudent,
  getStudent,
  getAllStudent,
  updateStudent,
  deleteStudent,

  AddGrade,
  AddAttendance
};
