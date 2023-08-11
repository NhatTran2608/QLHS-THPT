const teacherControlller = require("../app/controllers/teacherController")
const express = require('express');
const router = express.Router();

router.get('/show/:id', teacherControlller.oneTeacher);
router.get('list/subject', teacherControlller.listTeachersubject);
router.get('/all', teacherControlller.listTeacherAll);
router.patch('/update/:id', teacherControlller.updateInfoTeacher);
router.put('/remove/class-teacher/:id', teacherControlller.removeClass);
router.patch('/add/class-teacher/:id', teacherControlller.AddTeacher);
router.patch('/remove/teacher/:id', teacherControlller.removeTeacher);
router.get('/class-student/:id', teacherControlller.assessStudent);
router.put('/updateInfo/:id', teacherControlller.updateInfo);

module.exports = router;