"use strict";

const res = require("express/lib/response");
//const res = require("express/lib/response");
const firebase = require("../connection/db");
const StudentGrade = require("../models/StudentGrade");
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


    async function updateGrade(grades){
      const grade = await firestore
      .collection("Grade")
      .doc(term)
      .collection("grade-" + grade)
      .doc("section " + section)
      .collection(subject)
      .where("studentId", "==", id)
      .get();

    grade.forEach((doc) => {
      doc.ref.update(grades);
    });
    console.log("updated");
    }
    data.pop();

    function checkUniqueStudentId(array) {
      let isUnique = true;
      let idExist = true;
      let isGradeFile = true;

      let gradeMatch = true;
      let termMatch = true;
      let sectionMatch = true;
      let subjectMatch = true;
      let items = array.length;
      let studentDataExist = true;

      console.log(array);
      for (let i = 0; i < items; i++) {
        let checkExistance = getStudent(array[i].studentId);
        if ((checkExistance.empty))
          studentDataExist = false;
          console.log(studentDataExist);
        console.log(array[i].studentId);
        if (array[i].studentId == undefined) {
          idExist = false;
          break;
        }
        if (array[i].subject == undefined) {
          isGradeFile = false;
          break;
        }
        if (array[i].term != term) {
          termMatch = false;
          break;
        }
        if (array[i].grade != grade) {
          gradeMatch = false;
          break;
        }
        if (array[i].section != section) {
          sectionMatch = false;
          break;
        }
        if (array[i].subject != subject) {
          subjectMatch = false;
          break;
        }
        // idExist = true;
        for (let j = i + 1; j < items; j++) {
          console.log(array[j].studentId);
          if (array[i].studentId == array[j].studentId) isUnique = false;
          console.log(isUnique);
          break;
        }
        if (isUnique == false) break;
      }
      console.log(
        isUnique,
        idExist,
        isGradeFile,
        termMatch,
        gradeMatch,
        sectionMatch,
        subjectMatch
      );
      const result = {
        studentIdExist: idExist,
        studentIsUnique: isUnique,
        isGradeFile: isGradeFile,
        termMatched: termMatch,
        gradeMatched: gradeMatch,
        sectionMatched: sectionMatch,
        subjectMatched: subjectMatch,
        studentDataExist : studentDataExist
      };
      return result;
    }

    let validate = checkUniqueStudentId(data);


    if (
      validate.studentIdExist &&
      validate.studentIsUnique &&
      validate.isGradeFile &&
      validate.termMatched &&
      validate.gradeMatched &&
      validate.sectionMatched &&
      validate.subjectMatched
    )   {
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
          if(!(validate.studentDataExist)){
            await addGrade(g);
          }
          else if(validate.studentDataExist)
          updateGrade(g);
            
        // flag = 1;
        return true;
      });

      res.status(200).send({ message: "Grades added successfully!" });
    } else if (!validate.studentIdExist) {
      res.status(400).send({
        message:
          "Student id must not be empty among the data, please try again",
      });
    } else if (!validate.studentIsUnique) {
      res.status(400).send({
        message: "Student id is not unique among the data, please try again",
      });
    } else if (!validate.isGradeFile) {
      res.status(400).send({
        message: "File may not be a correct grade format , please try again",
      });
    } else if (!validate.termMatched) {
      res.status(400).send({
        message:
          "Term selected and Term value in file did not match, please check your file again!",
      });
    } else if (!validate.gradeMatched) {
      res.status(400).send({
        message:
          "Grade selected and Grade value in file did not match, please check your file again!",
      });
    } else if (!validate.sectionMatched) {
      res.status(400).send({
        message:
          "Section selected and Section value in file did not match, please check your file again!",
      });
    } else if (!validate.subjectMatched) {
      res.status(400).send({
        message:
          "Subject selected and Subject value in file did not match, please check your file again!",
      });
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

    const defaultDate = datePosted;

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

    function checkAttendanceValidity(array) {
      let isUnique = true;
      let idExist = true;
      let statusExist = true;
      let statusIsValid = true;
      let items = array.length;

      let gradeMatch = true;
      let termMatch = true;
      let sectionMatch = true;

      console.log(array);
      for (let i = 0; i < items; i++) {
        console.log(array[i].studentId);
        if (array[i].studentId == undefined) {
          idExist = false;
          break;
        }
        if (array[i].status == undefined) {
          statusExist = false;
          break;
        }
        if (
          (
            array[i].status !== "P" &&
            array[i].status == "A" &&
            array[i].status == "permission"
          )
        ) {
          statusIsValid = false;
          break;
        }
        if (array[i].term != term) {
          termMatch = false;
          break;
        }
        if (array[i].grade != grade) {
          gradeMatch = false;
          break;
        }
        if (array[i].section != section) {
          sectionMatch = false;
          break;
        }

        // idExist = true;
        for (let j = i + 1; j < items; j++) {
          console.log(array[j].studentId);
          if (array[i].studentId == array[j].studentId) isUnique = false;
          console.log(isUnique);
          break;
        }
        if (isUnique == false) break;
      }
      console.log(
        isUnique,
        idExist,
        statusExist,
        statusIsValid,
        termMatch,
        gradeMatch,
        sectionMatch
      );
      const result = {
        studentIdExist: idExist,
        studentIsUnique: isUnique,
        attendanceStatusExist: statusExist,
        statusIsValid: statusIsValid,
        termMatched: termMatch,
        gradeMatched: gradeMatch,
        sectionMatched: sectionMatch,
      };
      return result;
    }

    let validate = checkAttendanceValidity(data);
    if (
      validate.studentIdExist &&
      validate.studentIsUnique &&
      validate.attendanceStatusExist &&
      validate.statusIsValid &&
      validate.termMatched &&
      validate.gradeMatched &&
      validate.sectionMatched
    ) {
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
    } else if (!validate.studentIdExist) {
      res.status(400).send({
        message:
          "Student id must not be empty among the data,  please check your file again!",
      });
    } else if (!validate.studentIsUnique) {
      res.status(400).send({
        message:
          "Student id is not unique among the data,  please check your file again!",
      });
    } else if (!validate.attendanceStatusExist) {
      res.status(400).send({
        message:
          "Student attendance status should not be empty, please check your file again!",
      });
    } else if (!validate.statusIsValid) {
      res.status(400).send({
        message:
          "Student attendance status must only be (P, A, and Permission) values, please check your file again!",
      });
    }
    else if (!validate.termMatched) {
      res.status(400).send({
        message:
          "Term selected and Term value in file did not match, please check your file again!",
      });
    } else if (!validate.gradeMatched) {
      res.status(400).send({
        message:
          "Grade selected and Grade value in file did not match, please check your file again!",
      });
    } else if (!validate.sectionMatched) {
      res.status(400).send({
        message:
          "Section selected and Section value in file did not match, please check your file again!",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: error.message });
  }
};


const GetStudentGrade = async (req, res) =>{

  
const studentId = req.params.studentId;
const term = req.params.term;
const grade = req.params.grade;
const section = req.params.section;
const subject = req.params.subject;

console.log(`ID:- ${studentId}\nTerm:- ${term} \nGrade:- ${grade} \nSection:- ${section} \nSubject:- ${subject}`)
try {
  const studentGrade = await firestore
  .collection("Grade")
  .doc(term)
  .collection("grade-" + grade)
  .doc("section " + section)
  .collection(subject);
  
  const data = await studentGrade.get()
  
  // data = data.filter(studentInfo => {
  //   return studentInfo.studentId == studentId
  // })
    
    let studentGradeArray = [];
    if (data.empty) {
      res.status(404).send({ message: "No student record found" });
    } else {
      data.forEach((doc) => {
        const studentGrade = new StudentGrade(
          doc.id,
          doc.data().studentId,
          doc.data().studentName,
          doc.data().grade,
          doc.data().section,
          doc.data().subject,
          doc.data().firstTest,
          doc.data().secondTest,
          doc.data().final,
          doc.data().assessements,
          doc.data().term
        );
        studentGradeArray.push(studentGrade);
      });

      studentGradeArray = studentGradeArray.filter(student => {
        return student.studentId == parseInt(studentId)
      })
      // console.log(typeof studentId)
      // console.log(studentGradeArray)
      res.send(studentGradeArray);
     
    }
  
} catch (error) {
  res.status(400).send({ message: error.message });
}






};
const filterGrades = async (req, res) =>{

  

const term = req.params.term;
const grade = req.params.grade;
const section = req.params.section;
const subject = req.params.subject;

// console.log(`Term:- ${term} \nGrade:- ${grade} \nSection:- ${section} \nSubject:- ${subject}`)
try {
  const studentGrade = await firestore
  .collection("Grade")
  .doc(term)
  .collection("grade-" + grade)
  .doc("section " + section)
  .collection(subject);
  
  const data = await studentGrade.get()
  
  // data = data.filter(studentInfo => {
  //   return studentInfo.studentId == studentId
  // })
    
    let studentGradeArray = [];
    if (data.empty) {
      res.status(404).send({ message: "No student record found" });
    } else {
      data.forEach((doc) => {
        const studentGrade = new StudentGrade(
          doc.id,
          doc.data().studentId,
          doc.data().studentName,
          doc.data().grade,
          doc.data().section,
          doc.data().subject,
          doc.data().firstTest,
          doc.data().secondTest,
          doc.data().final,
          doc.data().assessements,
          doc.data().term
        );
        studentGradeArray.push(studentGrade);
      });

      // studentGradeArray = studentGradeArray.filter(student => {
      //   return student.studentId == parseInt(studentId)
      // })
      // console.log(typeof studentId)
      // console.log(studentGradeArray)
      res.send(studentGradeArray);
     
    }
  
} catch (error) {
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
  GetStudentGrade,
  filterGrades,

  AddAttendance,

};
