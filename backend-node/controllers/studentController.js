"use strict";

const req = require("express/lib/request");
const res = require("express/lib/response");

const firebase = require("../connection/db");
const StudentAttendance = require("../models/StudentAttendance");
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
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

async function fetch_firebase(term, grade, section, subject) {
  const studentGrade = await firestore
    .collection("Grade")
    .doc(term)
    .collection("grade-" + grade)
    .doc("section " + section)
    .collection(subject);

  const data = await studentGrade.get();

  let studentGradeArray = [];
  if (data.empty) {
    return true;
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
    return studentGradeArray;
  }
}

async function addGrade(term, grade, section, subject, grades) {
  await firestore
    .collection("Grade")
    .doc(term)
    .collection("grade-" + grade)
    .doc("section " + section)
    .collection(subject)
    .doc()
    .set(grades);
}

async function updateGrade(term, grade, section, subject, grades) {
  const g = await firestore
    .collection("Grade")
    .doc(term)
    .collection("grade-" + grade)
    .doc("section " + section)
    .collection(subject)
    .where("studentId", "==", grades.studentId)
    .get();

  g.forEach((doc) => {
    doc.ref.update(grades);
  });
  console.log("updated");
}

const UpdateGradeBulk = async (req, res) => {
  try {
    const data = req.body;

    const lastItem = data.length - 1;

    const term = data[lastItem].term;
    const grade = data[lastItem].grade;
    const section = data[lastItem].section;
    const subject = data[lastItem].subject;
    const defaultValue = "";
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

      console.log(array);
      for (let i = 0; i < items; i++) {
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
    ) {
      data.forEach(async (g) => {
        if (g.firstTest == undefined) g.firstTest = defaultValue;

        if (g.final == undefined) g.final = defaultValue;
        if (g.secondtTest == undefined) g.secondTest = defaultValue;
        if (g.assessements == undefined) g.assessements = defaultValue;

        await updateGrade(term, grade, section, subject, g);

        return true;
      });

      res.status(200).send({ message: "Grades Updated successfully!" });
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
    res.status(200).send({ message: error.message });
  }
};

const AddGrade = async (req, res) => {
  try {
    const data = req.body;

    const lastItem = data.length - 1;

    const term = data[lastItem].term;
    const grade = data[lastItem].grade;
    const section = data[lastItem].section;
    const subject = data[lastItem].subject;
    data.pop();

    let excelResult = data;
    let hasError = false;

    let canAdd = false;

    const defaultValue = "";
    let firebaseResult = await fetch_firebase(term, grade, section, subject);
    if (firebaseResult == true) canAdd = true;
    console.log(firebaseResult);
    for (let i = 0; i < excelResult.length && !hasError; i++) {
      let id = excelResult[i].studentId;
      for (let j = 0; j < firebaseResult.length && !hasError; j++) {
        if (firebaseResult[j].studentId == id) hasError = true;
      }
    }

    function checkUniqueStudentId(array) {
      let isUnique = true;
      let idExist = true;
      let isGradeFile = true;

      let gradeMatch = true;
      let termMatch = true;
      let sectionMatch = true;
      let subjectMatch = true;
      let items = array.length;

      console.log(array);
      for (let i = 0; i < items; i++) {
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
      };
      return result;
    }

    let validate = checkUniqueStudentId(data);

    if (!validate.isGradeFile) {
      res.status(400).send({
        message: "File may not be a correct grade format , please try again",
      });
    } else if (!hasError) {
      if (
        validate.studentIdExist &&
        validate.studentIsUnique &&
        validate.isGradeFile &&
        validate.termMatched &&
        validate.gradeMatched &&
        validate.sectionMatched &&
        validate.subjectMatched
      ) {
        data.forEach(async (g) => {
          if (g.firstTest == undefined) g.firstTest = defaultValue;
          if (g.secondTest == undefined) g.secondtTest = defaultValue;

          if (g.final == undefined) g.final = defaultValue;
          if (g.assessements == undefined) g.assessements = defaultValue;

          await addGrade(term, grade, section, subject, g);

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
    } else if (hasError) {
      res.status(400).send({
        message:
          "file contains student grade  that already exist, please use update option if necessary, please check your file again!",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: error.message });
  }
};

async function fetch_firebaseAttendance(year, term, grade, section) {
  const studentGrade = await firestore
    .collection("Attendance")
    .doc(year)
    .collection(term)
    .doc("grade-" + grade)
    .collection("section " + section);

  const data = await studentGrade.get();

  let studentAttendanceArray = [];
  if (data.empty) {
    return true;
  } else {
    data.forEach((doc) => {
      const studentAttendance = new StudentAttendance(
        doc.id,
        doc.data().studentId,
        doc.data().studentName,
        doc.data().term,
        doc.data().grade,
        doc.data().section,
        doc.data().status,
        doc.data().date
      );
      studentAttendanceArray.push(studentAttendance);
    });
    return studentAttendanceArray;
  }
}

async function addAttendance(year, term, grade, section, attendance) {
  await firestore
    .collection("Attendance")
    .doc(year)
    .collection(term)
    .doc("grade-" + grade)
    .collection("section " + section)
    .doc()
    .set(attendance);
}

const AddAttendance = async (req, res) => {
  try {
    const data = req.body;
    const lastItem = data.length - 1;

    const grade = data[lastItem].grade;

    const term = data[lastItem].term;

    const section = data[lastItem].section;

    const datePosted = data[lastItem].datePosted;
    const year = data[lastItem].year;

    const defaultDate = datePosted;
    data.pop();

    let excelResult = data;
    let hasError = false;

    let canAdd = false;

    const defaultValue = "";
    let firebaseResult = await fetch_firebaseAttendance(
      year,
      term,
      grade,
      section
    );
    if (firebaseResult == true) canAdd = true;

    for (let i = 0; i < excelResult.length && !hasError; i++) {
      if (excelResult[i].date == undefined) excelResult[i].date = datePosted;
      let id = excelResult[i].studentId;
      let date = excelResult[i].date;
      console.log(date);
      for (let j = 0; j < firebaseResult.length && !hasError; j++) {
        if (firebaseResult[j].studentId == id && firebaseResult[j].date == date)
          hasError = true;
      }
    }

    function checkAttendanceValidity(array) {
      let isUnique = true;
      let idExist = true;
      let statusExist = true;
      let statusIsValid = true;
      let items = array.length;

      let gradeMatch = true;
      let termMatch = true;
      let sectionMatch = true;

      for (let i = 0; i < items; i++) {
        if (array[i].studentId == undefined) {
          idExist = false;
          break;
        }
        if (array[i].status == undefined) {
          statusExist = false;
          break;
        }
        if (
          array[i].status !== "P" &&
          array[i].status == "A" &&
          array[i].status == "permission"
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

        for (let j = i + 1; j < items; j++) {
          if (array[i].studentId == array[j].studentId) isUnique = false;

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

    if (!validate.attendanceStatusExist) {
      res.status(400).send({
        message:
          "Student attendance status should not be empty, please check your file again!",
      });
    } else if (!hasError) {
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

          await addAttendance(year, term, grade, section, g);

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
      } else if (!validate.statusIsValid) {
        res.status(400).send({
          message:
            "Student attendance status must only be (P, A, and Permission) values, please check your file again!",
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
      }
    } else if (hasError) {
      res.status(400).send({
        message:
          "file contains student attendance entry that already exist, please use update option if necessary, please check your file again!",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: error.message });
  }
};







const UpdateAttendance = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    console.log(data.date);
    const date = req.params.date;
    const year = data.year;
    const term = data.term;
    const grade = data.grade;
    const section = data.section;
    console.log(data.date)
    const g = await firestore
  .collection("Attendance")
  .doc(year)
  .collection(term)
  .doc("grade-" + grade)
  .collection("section " + section).where("studentId", "==", id).where("date", "==",data.date );
  let x = await g.get();

    console.log(x);

    x.forEach((doc) => {
    doc.ref.update(data);
  });
  console.log("updated");
 

    res.status(200).send({ message: "Attendance Updated successfuly" });
  } catch (err) {
    res.status(400).send({ message: err.message });
    // res.status(400).send(error.message);
  }
};





const GetStudentGrade = async (req, res) => {
  const studentId = req.params.studentId;
  const term = req.params.term;
  const grade = req.params.grade;
  const section = req.params.section;
  const subject = req.params.subject;

  console.log(
    `ID:- ${studentId}\nTerm:- ${term} \nGrade:- ${grade} \nSection:- ${section} \nSubject:- ${subject}`
  );
  try {
    const studentGrade = await firestore
      .collection("Grade")
      .doc(term)
      .collection("grade-" + grade)
      .doc("section " + section)
      .collection(subject);

    const data = await studentGrade.get();

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

      studentGradeArray = studentGradeArray.filter((student) => {
        return student.studentId == parseInt(studentId);
      });

      res.send(studentGradeArray);
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const filterGrades = async (req, res) => {
  const term = req.params.term;
  const grade = req.params.grade;
  const section = req.params.section;
  const subject = req.params.subject;

  try {
    const studentGrade = await firestore
      .collection("Grade")
      .doc(term)
      .collection("grade-" + grade)
      .doc("section " + section)
      .collection(subject);

    const data = await studentGrade.get();

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

      res.send(studentGradeArray);
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};


const getAttendanceDetail = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const year = req.params.year;
    const date = req.params.date;
    
    let date_ = new Date(date).toLocaleDateString('zh-Hans-CN', {
      year: 'numeric',month: '2-digit',day: '2-digit',});
// console.log(y);
// y.split('T')[0]
//    console.log(y);
    const term = req.params.term;
    const grade = req.params.grade;
    const section = req.params.section;
  
    let ch = [];
    let x = date_.length;
    for(let i=0; i<x; i++){
      if(date_[i] == "/")
      ch.push("-")
      else
      ch.push(date_[i]);
      
    }
    // let z = ch.reverse().toString().replace(/,/, ''); 
    console.log(ch,"last mukera")
    let z = ch.toString()
    console.log(z)
    let check = ""
    for(let i=0; i<z.length; i++){
      if(z[i] == ",")
      console.log("j")
      else
      check+=z[i];
      
    }
    let dateAdded = check.toString()
    console.log(check.toString(),"===")

    const attendance = await firestore
    .collection("Attendance")
    .doc(year)
    .collection(term)
    .doc("grade-" + grade)
    .collection("section " + section).where("studentId", "==", studentId);
    // let x = await attendance.get();
    const data = await attendance.get();
    const attendanceArray = [];
    if (data.empty) {
      res.status(404).send({ message: "No student record found" });
    } else {
      data.forEach((doc) => {
        const attendance = new StudentAttendance(
          doc.id,
          doc.data().studentId,
          doc.data().studentName,
          doc.data().year,
          doc.data().term,
          doc.data().grade,
          doc.data().section,
          doc.data().status,
          doc.data().date
          
        );
        attendanceArray.push(attendance);
      });
      let filteredArray = [];
      attendanceArray.forEach(x=>{
        if(x.date == dateAdded)
          filteredArray.push(x);
      })
      if (filteredArray.length == 0) {
        res.status(404).send({ message: "No student record found" });
      }
      else {console.log(filteredArray);
        res.send(filteredArray);}
      
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};




const getAttendanceBySection = async (req, res) => {
  
  const year = req.params.year;
  const term = req.params.term;
  const grade = req.params.grade;
  const section = req.params.section;
  const date = req.params.date;
 
  let date_ = new Date(date).toLocaleDateString('zh-Hans-CN', {
    year: 'numeric',month: '2-digit',day: '2-digit',});
  // console.log(
  //   `ID:- ${studentId}\nTerm:- ${term} \nGrade:- ${grade} \nSection:- ${section} \nSubject:- ${subject}`
  // );
  console.log(date_)
  // let check =  date_.replace("/", "-")
  let ch = [];
let x = date_.length;
for(let i=0; i<x; i++){
  if(date_[i] == "/")
  ch.push("-")
  else
  ch.push(date_[i]);
  
}
// let z = ch.reverse().toString().replace(/,/, ''); 
console.log(ch,"last mukera")
let z = ch.toString()
console.log(z)
let check = ""
for(let i=0; i<z.length; i++){
  if(z[i] == ",")
  console.log("j")
  else
  check+=z[i];
  
}
let dateAdded = check.toString()
console.log(check.toString())

console.log(z,"=========================")
// console.log(check,"------------------")
  try {
    const attendance = await firestore
  .collection("Attendance")
  .doc(year)
  .collection(term)
  .doc("grade-" + grade)
  .collection("section " + section).where("date", "==", dateAdded);

    const data = await attendance.get();

    let studentAttendanceArray = [];
    if (data.empty) {
      res.status(404).send({ message: "No attendance record found" });
    } else {
      data.forEach((doc) => {
        const attendance = new StudentAttendance(
          doc.id,
          doc.data().studentId,
          doc.data().studentName,
          doc.data().year,
          doc.data().term,
          doc.data().grade,
          doc.data().section,
          doc.data().status,
          doc.data().date
        );
        studentAttendanceArray.push(attendance);
      });

      // studentAttendanceArray = studentAttendanceArray.filter((student) => {
      //   return student.studentId == parseInt(studentId);
      // });

      res.send(studentAttendanceArray);
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
  UpdateGradeBulk,

  AddAttendance,
  UpdateAttendance,
  getAttendanceDetail,
  getAttendanceBySection
};
