const express = require("express");

const jwt = require('jsonwebtoken')
const firebase = require("../connection/db");

const firestore = firebase.firestore();
const auth = firebase.auth();
const {
  
    AddUser,
    DeleteUser,
    ViewUsers,
    GetUser,
  
  
    createAccount,
  updateAccount,
   getAllAccount,
  getAccount,
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
  EditGrade,
  SearchStudentGrade,
  ViewGrades,
  AddAttendance,
  UpdateAttendance,
  ViewAttendance,
  SearchStudentAttendance,
  
  
  
 
  
} = require("../controllers/studentController");

const {
    BroadcastAnnouncements,
    ViewAnnouncements,
    UpdateAnnouncements,
    SendMessage,
    ViewMessages,
    EditMessage,




 
  
  
} = require("../controllers/broadcastMessage");
const {
  AddClass,
  GetClass,
  GetAllClass,
  UpdateClass,
} = require("../controllers/AdminController");
const router = express.Router();

router.post("/Users", AddUser);
router.post("/User-Accounts", createAccount);
router.put("/User-Accounts/:id", updateAccount);
router.delete("/User-Accounts/:id", DeleteUser);
router.get("/User-Accounts/:x", getAllAccount);
router.post("/login", login);
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
router.put(
  "/edit-grade/:term/:grade/:section/:subject/:studentId",
  EditGrade
);

router.get(
  "/get-attendance/:grade/:section/:studentId/:date",
  SearchStudentAttendance
);
router.post("/add-attendance", AddAttendance);
router.put("/update-attendance/:id", UpdateAttendance);
router.get(
  "/filter-attendance/:grade/:section/:date",
  ViewAttendance
);

// router.get("/broadcast-messages", ViewAnnouncements);
router.post("/broadcast-message", BroadcastAnnouncements);




router.put("/update-message/:id", UpdateAnnouncements);
router.post("/send-message/", SendMessage);
router.get("/view-messages/", ViewMessages);
router.put("/edit-message/:id", EditMessage);

router.put("/update-student/:id", UpdateStudentAndParent);

router.delete("/delete/:id", DeleteUser);

router.post("/add-class", AddClass);
router.get("/get-class/:classId", GetClass);
router.get("/get-all-class/", GetAllClass);
router.put("/update-class/:classId", UpdateClass);

router.get("/broadcast-messages",verifyToken,  ViewAnnouncements);


router.post('/loginn',async  (req, res) => {
  // Mock user
 
 try {
     
  const u = await auth.signInWithEmailAndPassword('jwt@gmail.com', '123456')
  console.log(u.user.email)
  

    const user = {
        id: 1, 
        uid: u.user.uid,
        email: u.user.email
      }
      
        jwt.sign({user}, 'secretkey', { expiresIn: '30000s' }, (err, token) => {
          res.json({
            token
          });
        });
     
 } catch (error) {
     res.sendStatus(403);
     
 }
 

});

function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}



module.exports = {
  routes: router,
};
