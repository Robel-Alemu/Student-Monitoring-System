const express = require('express');


const {
    createAccount,
    updateAccount,
    deleteAccount,
    getAllAccount,
    getAccount,
    registerWithEmailAndPassword,
    login,
    listAllUsers,getAllAccounts,
    getUser
} = require('../controllers/accountController');

const { AddStudent, getStudent, getAllStudent, updateStudent, deleteStudent,  AddGrade, AddAttendance} = require("../controllers/studentController");

const {AddBroadcast,AddB,getB,getGrades, getBroadcastMessages,updateBroadcastMessage} = require("../controllers/broadcastMessage");

const router = express.Router();

router.post('/Users', registerWithEmailAndPassword);
router.post('/User-Accounts', createAccount);
router.put('/User-Accounts/:id', updateAccount);
router.delete('/User-Accounts/:id', deleteAccount);
router.get('/User-Accounts/:x', getAllAccount);
router.get('/',login);
router.get('/User-Accounts/:id', getAccount);
router.get('/account',listAllUsers);

router.get('/users',getAllAccounts);
router.get('/users/:email',getUser);

router.delete('/delete-student/:id',deleteStudent);
router.get('/Student-Information',getAllStudent);
router.get('/Student-Information/:studentId',getStudent);
router.post('/Student-Information',AddStudent);


router.post("/add-grade",AddGrade);
router.post("/add-attendance",AddAttendance);


router.get('/broadcast-messages', getBroadcastMessages);
router.post('/broadcast-message', AddBroadcast);
router.post('/Broadcast', AddB);
router.get('/getB/:id', getB);
router.get('/getG', getGrades);
router.put('/update-message/:id',updateBroadcastMessage);

router.put('/update-student/:id',updateStudent);

router.delete('/delete/:id',deleteAccount);
module.exports = {
    routes: router
}