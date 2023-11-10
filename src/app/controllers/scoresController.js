const Scores = require('../models/scores');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Summary = require('../models/Summary');

const scoresController = {
    async createScores(req, res) {
        try {
            req.body.forEach(async element => {
                let Score = await Scores.findOne({
                    studentID: element.studentID,
                    nameSubject: element.nameSubject,
                })
                //console.log(Score, 'score ......')
                if (Score) {
                    //console.log('update')
                    Score.diemhk1tl = element.diemhk1tl,
                        Score.diemhk115p = element.diemhk115p,
                        Score.diemhk115pl2 = element.diemhk115pl2,
                        Score.diemhk11t = element.diemhk11t,
                        Score.diemhk1ck = element.diemhk1ck,
                        Score.diemhk2tl = element.diemhk2tl,
                        Score.diemhk215p = element.diemhk215p,
                        Score.diemhk215pl2 = element.diemhk215pl2,
                        Score.diemhk21t = element.diemhk21t,
                        Score.TBHKI = element.TBHKI,
                        Score.TBHKII = element.TBHKII,
                        Score.TBCN = element.TBCN,
                        Score.diemhk2ck = element.diemhk2ck,
                        Score.nameSubject = element.nameSubject
                    await Score.save()
                } else {
                    //console.log('creat')
                    let score = await Scores.create({
                        studentID: element.studentID,
                        diemhk1tl: element.diemhk1tl,
                        diemhk115p: element.diemhk115p,
                        diemhk115pl2: element.diemhk115pl2,
                        diemhk11t: element.diemhk11t,
                        diemhk1ck: element.diemhk1ck,
                        diemhk2tl: element.diemhk2tl,
                        diemhk215p: element.diemhk215p,
                        diemhk215pl2: element.diemhk215pl2,
                        diemhk21t: element.diemhk21t,
                        diemhk2ck: element.diemhk2ck,
                        TBHKI: element.TBHKI,
                        TBHKII: element.TBHKII,
                        TBCN: element.TBCN,
                        nameSubject: element.nameSubject
                    })
                    //console.log(element.studentID, 'kkkkkkk')
                    const student = await Student.findById(element.studentID);
                    //console.log(element, '/////////////');
                    student.scoresID.push(score._id.toString());
                    //console.log(student);
                    await student.save();
                }
            });
            // console.log(req.body)
            return res.status(200).send('ok');
        } catch (err) {
            console.log(err)
            return res.status(500).json(err);
        }

    },

    async showScores(req, res) {
        try {
            const scores = await Scores.find().populate('studentID')
            res.status(200).json(scores);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async showOnescores(req, res) {
        try {
            const scores = await Scores.findById({ _id: req.params.id })
            res.status(200).json(scores)
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async updateSummayry(req, res) {
        try {
            const summary = await Summary.updateOne({ _id: req.params.id }, req.body)
            res.status(200).json(summary)
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    async updateSummayryStudent(req, res) {
        try {
            const summary = await Summary.updateOne({ _id: req.params.id }, req.body)
            res.status(200).json(summary)
        }
        catch (err) {
            res.status(500).json(err)
        }
    },


    async showOneSummayry(req, res) {
        try {
            const summary = await Summary.findById({ _id: req.params.id })
            res.status(200).json(summary)
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    async showAllSummayry(req, res) {
        try {
            const summary = await Summary.find()
            res.status(200).json(summary)

        } catch (err) {
            res.status(500).json(err)
        }
    }


}

module.exports = scoresController;