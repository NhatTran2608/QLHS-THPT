const classController = require("../app/controllers/classController")
const express = require('express');
const router = express.Router();

router.post('/add', classController.createClass);
router.get('/info/:id', classController.infoclass);
router.get('/show/class10', classController.showClass10);
router.get('/show/class11', classController.showClass11);
router.get('/show/class12', classController.showClass12);
router.get('/show', classController.index);

module.exports = router;