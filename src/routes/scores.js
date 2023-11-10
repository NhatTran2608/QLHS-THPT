const scoresController = require('../app/controllers/scoresController');
const express = require('express');
const router = express.Router();

router.get('/show', scoresController.showScores);
router.get('/showOne/:id', scoresController.showOnescores);
router.post('/create', scoresController.createScores);
router.put('/update/summary/:id', scoresController.updateSummayry);
router.get('/show/summary/:id', scoresController.showOneSummayry);
router.put('/update/summaryStudent/:id', scoresController.updateSummayryStudent);
router.get('/showAll-Summary', scoresController.showAllSummayry)
module.exports = router;
