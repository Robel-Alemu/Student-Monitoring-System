"use strict";

const req = require("express/lib/request");
const res = require("express/lib/response");

const firebase = require("../connection/db");
const ParentInformation = require("../models/ParentInformation");
const StudentAttendance = require("../models/StudentAttendance");
const StudentGrade = require("../models/StudentGrade");
const firestore = firebase.firestore();
const StudentInformation = require("../models/StudentInformation");
const jwt = require('jsonwebtoken')
const AddStudentAndParent = async (req, res, next) => {
  try {
    const data = req.body;
    const student = data[0];
    const parent = data[1];
    console.log(student, parent, "/////////////");
    // data.studentId = (data.studentId).toString()
    jwt.verify(req.token, 'secretkey', async (err,d) => {
      if(err) {
        res.sendStatus(403);
      } else { 
    const s = await firestore
    .collection("Student-Information")
    .where("studentId", "==", student.studentId)
    const sData = await s.get()
    if(sData.empty){
      await firestore.collection("Student-Information").doc().set(student);
      for(let x=0; x<parent.length;x++){
        const P = await firestore
            .collection("Parent-Information")
            .where("parentPhone", "==", parent[x].parentPhone);
            const data = await P.get();
            if(data.empty){
              await firestore.collection("Parent-Information").doc().set(parent[x]);
            }
            else continue;
      }
      // parent.forEach(async (g) => {
       
       
      //   await firestore.collection("Parent-Information").doc().set(g);
        
      //   // await addGrade(g);
  
      //   // return true;
      // })
     
      
  
      res.status(200).send({ message: "Student Added successfully" });
    }
    
    else{
      res.status(200).send({ message: "Student Already Exist with the given ID" });
    }
  

  }
})
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const SearchStudent = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;

    const student = await firestore
      .collection("Student-Information")
      .where("studentId", "==", studentId);
    const data = await student.get();
    const studentArray = [];
    const returnedData =[]
    const parentNames =[]
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
          doc.data().field,
          doc.data().parentPhones
        );
        studentArray.push(student);
      });
      returnedData.push(studentArray);
      const parent =studentArray[0].parentPhones;
      console.log(parent)
    
      
      if(parent.length > 1){
        for (let x=0;x<parent.length;x++){
          const P = await firestore
          .collection("Parent-Information")
          .where("parentPhone", "==", parent[x]);
          const data = await P.get();
          data.forEach((doc)=>{
            const parentInfo = new ParentInformation(
              doc.id,
              doc.data().parentPhone,
              doc.data().parentName
            )
            parentNames.push(parentInfo)
            returnedData[0].push(parentInfo)
          })
         
            
        console.log(parentNames,"*****")
      }
      }
      else if(parent.length == 1){
        const P = await firestore
          .collection("Parent-Information")
          .where("parentPhone", "==", parent[0]);
          const data = await P.get();
          data.forEach((doc)=>{
            const parentInfo = new ParentInformation(
              doc.id,
              doc.data().parentPhone,
              doc.data().parentName
            )
            parentNames.push(parentInfo)
            returnedData[0].push(parentInfo)
          })
          returnedData[0].push({
            parentName:"",
            parentPhone:""
          });
      }
      
   
        
        
       
        
        
        
       
      // }
      res.send(returnedData);
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const ViewStudents = async (req, res, next) => {
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
          doc.data().field,
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

const UpdateStudentAndParent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const student_ = data[0];
    const parent = data[1];
    console.log(student_, parent, "/////////////");

    jwt.verify(req.token, 'secretkey', async (err,d) => {
      if(err) {
        res.sendStatus(403);
      } else { 
    const student = await firestore
      .collection("Student-Information")
      .where("studentId", "==", id)
      .get();


    student.forEach((doc) => {
      doc.ref.update(student_);
    });

    for(let x=0;x<parent.length;x++){
      const p =  await firestore
      .collection("Parent-Information")
      .where("parentPhone", "==", parent[x].parentPhone)
      .get();
      if(p.empty){
        await firestore
      .collection("Parent-Information").doc().set(parent[x])
      }
      else{
        p.forEach((doc) => {
          doc.ref.update(parent[x]);
        });
      }
      
    }
    res.status(200).send({ message: "Student Updated successfuly" });
      }
    })
  
  } catch (err) {
    res.status(400).send({ message: err.message });
    res.status(400).send(error.message);
  }
};

const DeleteStudent = async (req, res, next) => {
  try {
    const id = req.params.id;
    jwt.verify(req.token, 'secretkey', async (err,d) => {
      if(err) {
        res.sendStatus(403);
      } else { 
    const student = await firestore
      .collection("Student-Information")
      .where("studentId", "==", id)
      .get();

    student.forEach((doc) => {
      doc.ref.delete();
    });
    res.status(200).send({ message: "Student deleted successfuly" });
  }
})
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

const EditGrade = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const term = data.term;
    const grade = data.grade;
    const section = data.section;
    const subject = data.subject; 

    // const student = await firestore
    //   .collection("Student-Information")
    //   .where("studentId", "==", id)
    //   .get();

    
    jwt.verify(req.token, 'secretkey', async (err,d) => {
      if(err) {
        res.sendStatus(403);
      } else { 
    await updateGrade(term, grade, section, subject, data);

    res.status(200).send({ message: "Student Grade Updated successfuly" });
      }
    })
  } catch (err) {
    res.status(400).send({ message: err.message });
    res.status(400).send(error.message);
  }
};

const UpdateGrades = async (req, res) => {
  try {
    const data = req.body;

    const lastItem = data.length - 1;

    const term = data[lastItem].term;
    const grade = data[lastItem].grade;
    const section = data[lastItem].section;
    const subject = data[lastItem].subject;
    const defaultValue = null;
    data.pop();
    jwt.verify(req.token, 'secretkey', async (err,d) => {
      if(err) {
        res.sendStatus(403);
      } else { 
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
        g.studentId = g.studentId.toString();
        if (g.firstTest == undefined) g.firstTest = defaultValue;
        if (g.secondTest == undefined) g.secondTest = defaultValue;
        if (g.final == undefined) g.final = defaultValue;

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
  }
})
  } catch (error) {
    console.log(error.message);
    res.status(200).send({ message: error.message });
  }
};

const AddGrades = async (req, res) => {
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
    jwt.verify(req.token, 'secretkey', async (err,d) => {
      if(err) {
        res.sendStatus(403);
      } else { 
    const defaultValue = null;
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
          g.studentId = g.studentId.toString();
          if (g.firstTest == undefined) g.firstTest = defaultValue;
          if (g.secondTest == undefined) g.secondTest = defaultValue;

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
  }
})
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: error.message });
  }
};

async function fetchStudent(studentId) {
  const studentData = await firestore
    .collection("Student-Information")
    .where("studentId", "==", studentId);

  const data = await studentData.get();

  let studentGradeArray = [];
  if (data.empty) {
    return false;
  } else {
    return true;
    // data.forEach((doc) => {
    //   const studentGrade = new StudentGrade(
    //     doc.id,
    //     doc.data().studentId,
    //     doc.data().studentName,
    //     doc.data().grade,
    //     doc.data().section,
    //     doc.data().subject,
    //     doc.data().firstTest,
    //     doc.data().secondTest,
    //     doc.data().final,
    //     doc.data().assessements,
    //     doc.data().term
    //   );
    //   studentGradeArray.push(studentGrade);
    // });
    // return studentGradeArray;
  }
}

const AddMultipleStudentAndParent = async (req, res) => {
  try {
    const data = req.body;

    const lastItem = data.length - 1;

    const validStudentData = [];
    const parentData = [];
    jwt.verify(req.token, 'secretkey', async (err,d) => {
      if(err) {
        res.sendStatus(403);
      } else { 
    data.forEach((x) => {
      if (x.parent1Name && x.parent1Phone && x.parent2Name && x.parent2Phone) {
        parentData.push(
          {
            parentName: x.parent1Name,
            parentPhone: x.parent1Phone,
          },
          {
            parentName: x.parent2Name,
            parentPhone: x.parent2Phone,
          }
        );
        let newStudentData = {};
        let parentPhone = [];
        parentPhone.push(x.parent1Phone, x.parent2Phone);

        newStudentData = { ...x };
        delete newStudentData.parent1Name;
        delete newStudentData.parent1Phone;
        delete newStudentData.parent2Name;
        delete newStudentData.parent2Phone;

        newStudentData.parentPhones = parentPhone;
        validStudentData.push(newStudentData);
      } else if (x.parent1Name && x.parent1Phone) {
        parentData.push({
          parentName: x.parent1Name,
          parentPhone: x.parent1Phone,
        });
        let newStudentData = {};
        let parentPhone = [];
        parentPhone.push(x.parent1Phone);

        newStudentData = { ...x };
        delete newStudentData.parent1Name;
        delete newStudentData.parent1Phone;

        newStudentData.parentPhones = parentPhone;
        validStudentData.push(newStudentData);
      } else if (x.parent2Name && x.parent2Phone) {
        parentData.push({
          parentName: x.parent2Name,
          parentPhone: x.parent2Phone,
        });
        let newStudentData = {};
        let parentPhone = [];
        parentPhone.push(x.parent2Phone);

        newStudentData = { ...x };
        delete newStudentData.parent2Name;
        delete newStudentData.parent2Phone;
        newStudentData.parentPhones = parentPhone;
        validStudentData.push(newStudentData);
      }
    });
    console.log(validStudentData, "*****valid student data******");
    console.log(parentData, "****valid student data*******");

    // const term = data[lastItem].term;
    // const grade = data[lastItem].grade;
    // const section = data[lastItem].section;
    // const subject = data[lastItem].subject;
    // data.pop();
    console.log(data, "after Pop");

    let excelResult = data;
    let hasError = false;

    let canAdd = false;

    const defaultValue = "";
    let isGradeFormat = true;
    // if (firebaseResult == true) canAdd = true;
    // console.log(firebaseResult);
    for (let i = 0; i < excelResult.length && isGradeFormat; i++) {
      //       let id = excelResult[i].studentId;
      // console.log(id);
      //        hasError = await fetchStudent(id.toString());
      //       console.log(hasError,"lets see")
      if (
        !(
          excelResult[i].hasOwnProperty("studentId") &&
          excelResult[i].hasOwnProperty("firstName") &&
          excelResult[i].hasOwnProperty("lastName") &&
          excelResult[i].hasOwnProperty("grade") &&
          excelResult[i].hasOwnProperty("section") &&
          ((excelResult[i].hasOwnProperty("parent1Phone") &&
            excelResult[i].hasOwnProperty("parent1Name")) ||
            (excelResult[i].hasOwnProperty("parent2Phone") &&
              excelResult[i].hasOwnProperty("parent2Name")))
        )
      ) {
        isGradeFormat = false;
        console.log(isGradeFormat, "grade format");
      }
    }
    console.log(isGradeFormat, "grade format");

    if (!isGradeFormat) {
      res.status(200).send({ message: "file is not correct format" });
    } else {
      for (let i = 0; i < excelResult.length && !hasError; i++) {
        let id = excelResult[i].studentId;
        console.log(id);
        hasError = await fetchStudent(id.toString());
        console.log(hasError, "lets see");
      }

      function checkUniqueStudentId(array) {
        let isUnique = true;
        let idExist = true;
        let hasName = true;

        let hasGrade = true;
        let hasSection = true;
        let hasParentPhone = true;

        let hasParentName = true;
        let items = array.length;

        console.log(array, "from excel");
        for (let i = 0; i < items; i++) {
          if (!array[i].hasOwnProperty("studentId")) {
            idExist = false;
            break;
          }
          if (
            !(
              array[i].hasOwnProperty("firstName") &&
              array[i].hasOwnProperty("lastName")
            )
          ) {
            hasName = false;
            break;
          }
          if (
            !(
              array[i].hasOwnProperty("parent1Phone") ||
              array[i].hasOwnProperty("parent2Phone")
            )
          ) {
            hasParentPhone = false;
            break;
          }
          if (!array[i].hasOwnProperty("grade")) {
            hasGrade = false;
            break;
          }
          if (!array[i].hasOwnProperty("section")) {
            hasSection = false;
            break;
          }
          if (
            !(
              array[i].hasOwnProperty("parent1Name") ||
              array[i].hasOwnProperty("parent2Name")
            )
          ) {
            hasParentName = false;
            break;
          }
          if (!array[i].hasOwnProperty("field")) {
            hasParentName = false;
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
          hasName,

          hasGrade,
          hasSection,
          hasParentName,
          hasParentPhone,
          hasError
        );
        const result = {
          studentIdExist: idExist,
          studentIsUnique: isUnique,
          hasName: hasName,
          hasParentPhone: hasParentPhone,
          hasGrade: hasGrade,
          hasSection: hasSection,
          hasParentName: hasParentName,
        };
        return result;
      }

      let validate = checkUniqueStudentId(data);

      if (!validate.hasName) {
        res.status(400).send({
          message: "File may not be a correct grade format , please try again",
        });
      } else if (!hasError) {
        if (
          validate.studentIdExist &&
          validate.studentIsUnique &&
          validate.hasName &&
          validate.hasParentPhone &&
          validate.hasGrade &&
          validate.hasSection &&
          validate.hasParentName
        ) {
          validStudentData.forEach(async (g) => {
            g.studentId = g.studentId.toString();
            // if (g.firstTest == undefined) g.firstTest = defaultValue;
            // if (g.secondTest == undefined) g.secondtTest = defaultValue;

            // if (g.final == undefined) g.final = defaultValue;
            // if (g.assessements == undefined) g.assessements = defaultValue;
            await firestore.collection("Student-Information").doc().set(g);

            // await addGrade(g);

            // return true;
          });

          for(let x=0; x<parentData.length;x++){
            const P = await firestore
                .collection("Parent-Information")
                .where("parentPhone", "==", parentData[x].parentPhone);
                const data = await P.get();
                if(data.empty){
                  await firestore.collection("Parent-Information").doc().set(parentData[x]);
                }
                else continue;
          }
          // parentData.forEach(async (g) => {
          //   await firestore.collection("Parent-Information").doc().set(g);
          // });

          res.status(200).send({ message: "Students added successfully!" });
        } else if (!validate.studentIdExist) {
          res.status(400).send({
            message:
              "Student id must not be empty among the data, please try again",
          });
        } else if (!validate.studentIsUnique) {
          res.status(400).send({
            message:
              "Student id is not unique among the data, please try again",
          });
        } else if (!validate.hasParentPhone) {
          res.status(400).send({
            message:
              "Atleast one parent phone should exist, please check your file again!",
          });
        } else if (!validate.hasGrade) {
          res.status(400).send({
            message:
              "Student grade can not be empty, please check your file again!",
          });
        } else if (!validate.hasSection) {
          res.status(400).send({
            message:
              "Student section can not be empty, please check your file again!",
          });
        } else if (!validate.hasParentName) {
          res.status(400).send({
            message:
              "Atleast one parent phone should exist, please check your file again!",
          });
        }
      } else if (hasError) {
        res.status(400).send({
          message:
            "file contains student data  that already exist, please use update option if necessary, please check your file again!",
        });
      }
    }
  }
})
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: error.message });
  }
};

async function fetch_firebaseAttendance(grade, section) {
  const studentGrade = await firestore
    .collection("Attendance")
    // .doc(year)
    // .collection(term)
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
        // doc.data().year,
        // doc.data().term,
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

async function addAttendance(grade, section, attendance) {
  await firestore
    .collection("Attendance")
    // .doc(year)
    // .collection(term)
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

    // const term = data[lastItem].term;

    const section = data[lastItem].section;

    const datePosted = data[lastItem].datePosted;
    // const year = data[lastItem].year;

    const defaultDate = datePosted;
    data.pop();

    let excelResult = data;
    let hasError = false;

    let canAdd = false;
    jwt.verify(req.token, 'secretkey', async (err,d) => {
      if(err) {
        res.sendStatus(403);
      } else { 
    const defaultValue = "";
    let firebaseResult = await fetch_firebaseAttendance(
      // year,
      // term,
      grade,
      section
    );
    if (firebaseResult == true) canAdd = true;
    console.log(
      firebaseResult,
      "firebase result ****************************************"
    );

    for (let i = 0; i < excelResult.length && !hasError; i++) {
      if (excelResult[i].date == undefined) excelResult[i].date = datePosted;
      let id = excelResult[i].studentId.toString();
      let date = excelResult[i].date;
      console.log(date);
      for (let j = 0; j < firebaseResult.length && !hasError; j++) {
        console.log(firebaseResult[j].studentId, "from database");
        console.log(id, "from excel");
        console.log(firebaseResult[j].date, "from firebase date");
        console.log(date, "from excel date");
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
        // if (array[i].term != term) {
        //   termMatch = false;
        //   break;
        // }
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
        // termMatch,
        gradeMatch,
        sectionMatch
      );
      const result = {
        studentIdExist: idExist,
        studentIsUnique: isUnique,
        attendanceStatusExist: statusExist,
        statusIsValid: statusIsValid,
        // termMatched: termMatch,
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
        // validate.termMatched &&
        validate.gradeMatched &&
        validate.sectionMatched
      ) {
        data.forEach(async (g) => {
          g.studentId = g.studentId.toString();
          // if (g.term == undefined) g.term = term;
          if (g.grade == undefined) g.grade = grade;
          if (g.section == undefined) g.section = section;
          if (g.date == undefined) g.date = defaultDate;

          await addAttendance(grade, section, g);

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
      // } else if (!validate.termMatched) {
      //   res.status(400).send({
      //     message:
      //       "Term selected and Term value in file did not match, please check your file again!",
      //   });
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
  }
})
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
    // const date = req.params.date;
    const getDate = new Date();
    // const year = `${getDate.getFullYear()}`;
    // const term = data.term;
    const grade = data.grade;
    const section = data.section;
    console.log(data.date);
    jwt.verify(req.token, 'secretkey', async (err,d) => {
      if(err) {
        res.sendStatus(403);
      } else { 
    const g = await firestore
      .collection("Attendance")
      // .doc(year)
      // .collection(term)
      .doc("grade-" + grade)
      .collection("section " + section)
      .where("studentId", "==", id)
      .where("date", "==", data.date);
    let x = await g.get();

    console.log(x);

    x.forEach((doc) => {
      doc.ref.update(data);
    });
    console.log("updated");

    res.status(200).send({ message: "Attendance Updated successfuly" });
      }
    })
  } catch (err) {
    res.status(400).send({ message: err.message });
    // res.status(400).send(error.message);
  }
};

const SearchStudentGrade = async (req, res) => {
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
          doc.data().assessements,
          doc.data().final,
          doc.data().term
        );
        studentGradeArray.push(studentGrade);
      });

      studentGradeArray = studentGradeArray.filter((student) => {
        return student.studentId == studentId;
      });

      res.send(studentGradeArray);
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const ViewGrades = async (req, res) => {
  const term = req.params.term;
  const grade = req.params.grade;
  const section = req.params.section;
  const subject = req.params.subject;

  try {
    jwt.verify(req.token, 'secretkey', async (err,d) => {
      if(err) {
        res.sendStatus(403);
      } else { 
    const studentGrade = await firestore
      .collection("Grade")
      .doc(term)
      .collection("grade-" + grade)
      .doc("section " + section)
      .collection(subject).orderBy("studentId","asc");

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
          doc.data().assessements,
          doc.data().final,

          doc.data().term
        );
        studentGradeArray.push(studentGrade);
      });

      res.send(studentGradeArray);
    }

  }
})
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const SearchStudentAttendance = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    // const year = req.params.year;
    const date = req.params.date;

    let date_ = new Date(date).toLocaleDateString("zh-Hans-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    // console.log(y);
    // y.split('T')[0]
    //    console.log(y);
    // const term = req.params.term;
    const grade = req.params.grade;
    const section = req.params.section;

    let ch = [];
    let x = date_.length;
    for (let i = 0; i < x; i++) {
      if (date_[i] == "/") ch.push("-");
      else ch.push(date_[i]);
    }
    // let z = ch.reverse().toString().replace(/,/, '');
    console.log(ch, "last mukera");
    let z = ch.toString();
    console.log(z);
    let check = "";
    for (let i = 0; i < z.length; i++) {
      if (z[i] == ",") console.log("j");
      else check += z[i];
    }
    let dateAdded = check.toString();
    console.log(dateAdded, "===");

    const attendance = await firestore
      .collection("Attendance")
      // .doc(year)
      // .collection(term)
      .doc("grade-" + grade)
      .collection("section " + section)
      .where("studentId", "==", studentId);
    // let x = await attendance.get();
    const data = await attendance.get();
    console.log(data, "fetched atendancce********************************");
    const attendanceArray = [];
    if (data.empty) {
      res.status(404).send({ message: "No student record found" });
    } else {
      data.forEach((doc) => {
        const attendance = new StudentAttendance(
          doc.id,
          doc.data().studentId,
          doc.data().studentName,
          // doc.data().year,
          // doc.data().term,
          doc.data().grade,
          doc.data().section,
          doc.data().status,
          doc.data().date
        );
        attendanceArray.push(attendance);
      });
      let filteredArray = [];
      attendanceArray.forEach((x) => {
        if (x.date == dateAdded) filteredArray.push(x);
      });
      if (filteredArray.length == 0) {
        res.status(404).send({ message: "No student record found" });
      } else {
        console.log(filteredArray, "**************/////////////");
        res.send(filteredArray);
      }
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const ViewAttendance = async (req, res) => {
  // const year = req.params.year;
  // const term = req.params.term;
  const grade = req.params.grade;
  const section = req.params.section;
  const date = req.params.date;

  let date_ = new Date(date).toLocaleDateString("zh-Hans-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  // console.log(
  //   `ID:- ${studentId}\nTerm:- ${term} \nGrade:- ${grade} \nSection:- ${section} \nSubject:- ${subject}`
  // );
  console.log(date_);
  // let check =  date_.replace("/", "-")
  let ch = [];
  let x = date_.length;
  for (let i = 0; i < x; i++) {
    if (date_[i] == "/") ch.push("-");
    else ch.push(date_[i]);
  }
  // let z = ch.reverse().toString().replace(/,/, '');
  console.log(ch, "last mukera");
  let z = ch.toString();
  console.log(z);
  let check = "";
  for (let i = 0; i < z.length; i++) {
    if (z[i] == ",") console.log("j");
    else check += z[i];
  }
  let dateAdded = check.toString();
  console.log(check.toString());

  console.log(z, "=========================");
  // console.log(check,"------------------")
  try {
    jwt.verify(req.token, 'secretkey', async (err,d) => {
      if(err) {
        res.sendStatus(403);
      } else { 
    const attendance = await firestore
      .collection("Attendance")
      // .doc(year)
      // .collection(term)
      .doc("grade-" + grade)
      .collection("section " + section)
      .where("date", "==", dateAdded);

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
          // doc.data().year,
          // doc.data().term,
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

  }
})
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  AddStudentAndParent,
  AddMultipleStudentAndParent,
  UpdateStudentAndParent,
  SearchStudent,
  ViewStudents,

  DeleteStudent,

  AddGrades,
  SearchStudentGrade,
  ViewGrades,
  UpdateGrades,
  EditGrade,

  AddAttendance,
  UpdateAttendance,
  SearchStudentAttendance,
  ViewAttendance,
};
