const scoresController = require('../app/controllers/scoresController');
const express = require('express');
const router = express.Router();

router.get('/show', scoresController.showScores);
router.get('/showOne/:id', scoresController.showOnescores);
router.post('/create', scoresController.createScores);
router.put('/update/summary/:id', scoresController.updateSummayry);
router.get('/show/summary/:id', scoresController.showOneSummayry);
module.exports = router;
