const authController = require("../app/controllers/authController")
const express = require('express');
const router = express.Router();

//REGISTER STUDENT
router.post("/register/student", authController.registerStudent);
//REGISTER TEACHER
router.post("/register/teacher", authController.registerTeacher);
//LOG IN
router.post("/login", authController.loginTeacher, authController.loginStudent);
// CHANGE PASSWORD
router.patch("/changePassword/:id", authController.changepassword);
//CHANGE PASSWORD TEACHER
router.patch("/changepassteacher/:id", authController.changepasswordTeacher);

module.exports = router;