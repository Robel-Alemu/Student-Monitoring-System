const express = require("express");

const {
  createAccount,
  updateAccount,
  
  getAllAccount,
  getAccount,
  
  
  
  AddUser,
  DeleteUser,
  ViewUsers,
  GetUser,




  login,
  listAllUsers,
  




  
} = require("../controllers/accountController");

const {
  AddStudentAndParent,
  AddMultipleStudentAndParent,
  UpdateStudentAndParent,
  SearchStudent,
  ViewStudents,
  DeleteStudent,
  AddGrades,
  UpdateGrades,
  SearchStudentGrade,
  ViewGrades,
  AddAttendance,
  UpdateAttendance,
  ViewAttendance,
  SearchStudentAttendance,
  
  
  
 
  
} = require("../controllers/studentController");

const {
  AddBroadcast,
  AddB,
  getB,
  getGrades,
  getBroadcastMessages,
  updateBroadcastMessage,
} = require("../controllers/broadcastMessage");
const {
  AddClass,
  GetClass,
  GetAllClass,
  UpdateClassAndSection,
} = require("../controllers/AdminController");
const router = express.Router();

router.post("/Users", AddUser);
router.post("/User-Accounts", createAccount);
router.put("/User-Accounts/:id", updateAccount);
router.delete("/User-Accounts/:id", DeleteUser);
router.get("/User-Accounts/:x", getAllAccount);
router.get("/login", login);
router.get("/User-Accounts/:id", getAccount);
router.get("/account", listAllUsers);

router.get("/users", ViewUsers);
router.get("/users/:email", GetUser);

router.delete("/delete-student/:id", DeleteStudent);
router.get("/Student-Information", ViewStudents);
router.get("/Student-Information/:studentId", SearchStudent);
router.post("/Student-Information", AddStudentAndParent);

router.put("/update-grade", UpdateGrades);

router.post("/add-multiple-students", AddMultipleStudentAndParent);

router.post("/add-grade", AddGrades);
router.get("/filter-grades/:term/:grade/:section/:subject", ViewGrades);
router.get(
  "/get-grade/:term/:grade/:section/:subject/:studentId",
  SearchStudentGrade
);
router.get(
  "/get-attendance/:year/:term/:grade/:section/:studentId/:date",
  SearchStudentAttendance
);
router.post("/add-attendance", AddAttendance);
router.put("/update-attendance/:id", UpdateAttendance);
router.get(
  "/filter-attendance/:year/:term/:grade/:section/:date",
  ViewAttendance
);

router.get("/broadcast-messages", getBroadcastMessages);
router.post("/broadcast-message", AddBroadcast);
router.post("/Broadcast", AddB);
router.get("/getB/:id", getB);
router.get("/getG", getGrades);
router.put("/update-message/:id", updateBroadcastMessage);

router.put("/update-student/:id", UpdateStudentAndParent);

router.delete("/delete/:id", DeleteUser);

router.post("/add-class", AddClass);
router.get("/get-class/:classId", GetClass);
router.get("/get-all-class/", GetAllClass);
router.put("/update-class/:classId", UpdateClassAndSection);

module.exports = {
  routes: router,
};
