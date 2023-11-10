const teacherControlller = require("../app/controllers/teacherController")
const express = require('express');
const router = express.Router();
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('../util/cloudinary')
const multer =  require('multer')
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'files-teacher',
        
    }
})

const upload = multer({storage: storage})  

router.get('/show/:id', teacherControlller.oneTeacher);
router.get('list/subject', teacherControlller.listTeachersubject);
router.get('/all', teacherControlller.listTeacherAll);
router.patch('/update/:id', teacherControlller.updateInfoTeacher);
router.put('/remove/class-teacher/:id', teacherControlller.removeClass);
router.patch('/add/class-teacher/:id', teacherControlller.AddTeacher);
router.patch('/remove/teacher/:id', teacherControlller.removeTeacher);
router.get('/class-student/:id', teacherControlller.assessStudent);
router.put('/updateInfo/:id', teacherControlller.updateInfo);
router.post('/show/timetable', teacherControlller.showTimeTable);
router.post('/uploadFile/:id', upload.array('file', 5), teacherControlller.uploadFiles)
router.delete('/delete-Doc/:id', teacherControlller.removeFile)
router.get('/show-Document/:id', teacherControlller.showOneDocument)
//router.put('/updateName-File/:id', teacherControlller.updatenameFile)
module.exports = router; 