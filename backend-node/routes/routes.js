const express = require("express");

const {
  createAccount,
  updateAccount,
  deleteAccount,
  getAllAccount,
  getAccount,
  registerWithEmailAndPassword,
  login,
  listAllUsers,
  getAllAccounts,
  getUser,
} = require("../controllers/accountController");

const {
  AddStudentAndParent,
  AddMultipleStudentAndParent,
  SearchStudent,
  ViewAllStudents,
  UpdateStudentAndParent,
  DeleteStudent,
  UpdateGrades,
  getAttendanceDetail,
  getAttendanceBySection,
  AddGrade,
  GetStudentGrade,
  filterGrades,
  AddAttendance,
  UpdateAttendance,
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

router.post("/Users", registerWithEmailAndPassword);
router.post("/User-Accounts", createAccount);
router.put("/User-Accounts/:id", updateAccount);
router.delete("/User-Accounts/:id", deleteAccount);
router.get("/User-Accounts/:x", getAllAccount);
router.get("/", login);
router.get("/User-Accounts/:id", getAccount);
router.get("/account", listAllUsers);

router.get("/users", getAllAccounts);
router.get("/users/:email", getUser);

router.delete("/delete-student/:id", DeleteStudent);
router.get("/Student-Information", ViewAllStudents);
router.get("/Student-Information/:studentId", SearchStudent);
router.post("/Student-Information", AddStudentAndParent);

router.put("/update-grade", UpdateGrades);

router.post("/add-multiple-students", AddMultipleStudentAndParent);

router.post("/add-grade", AddGrade);
router.get("/filter-grades/:term/:grade/:section/:subject", filterGrades);
router.get(
  "/get-grade/:term/:grade/:section/:subject/:studentId",
  GetStudentGrade
);
router.get(
  "/get-attendance/:year/:term/:grade/:section/:studentId/:date",
  getAttendanceDetail
);
router.post("/add-attendance", AddAttendance);
router.put("/update-attendance/:id", UpdateAttendance);
router.get(
  "/filter-attendance/:year/:term/:grade/:section/:date",
  getAttendanceBySection
);

router.get("/broadcast-messages", getBroadcastMessages);
router.post("/broadcast-message", AddBroadcast);
router.post("/Broadcast", AddB);
router.get("/getB/:id", getB);
router.get("/getG", getGrades);
router.put("/update-message/:id", updateBroadcastMessage);

router.put("/update-student/:id", UpdateStudentAndParent);

router.delete("/delete/:id", deleteAccount);

router.post("/add-class", AddClass);
router.get("/get-class/:classId", GetClass);
router.get("/get-all-class/", GetAllClass);
router.put("/update-class/:classId", UpdateClassAndSection);

module.exports = {
  routes: router,
};
