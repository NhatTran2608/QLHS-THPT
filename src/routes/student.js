const studentController = require("../app/controllers/studentController")
const express = require('express');
const router = express.Router();


router.delete('/bin/deleted/:id', studentController.deletestudent);
router.get('/infostudent/:id', studentController.infostudent);
router.put('/edit/:id', studentController.updateInfoStudent);
router.get('/show-all', studentController.infostudentAll);
module.exports = router;