const binController = require("../app/controllers/binController")
const express = require('express');
const router = express.Router();

router.put('/restore/student/:id', binController.restoresStudent);
router.put('/restore/teacher/:id', binController.restoresTeacher);
router.delete('/delete/student/:id', binController.deleteStudent);
router.delete('/delete/teacher/:id', binController.deleteTeacher);
router.get('/student/show', binController.showBinStudent);
module.exports = router;