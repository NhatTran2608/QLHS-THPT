const Student = require('../models/Student');
const Class = require('../models/Class');
const scores = require('../models/scores');

const studentController = {
    async deletestudent(req, res) {
        try {
            const student = await Student.findById({ _id: req.params.id }).populate("myclassID").populate('scoresID');
            for (let index = 0; index < student.scoresID.length; index++) {
                const score = await scores.findByIdAndDelete(student.scoresID[index]._id)
            }
            const myclass = await Class.findById(student.myclassID._id)
            var temp = 0;
            for (let index = 0; index < myclass.students.length; index++) {
                const element = await myclass.students[index];

                if (element == student._id || element == req.params.id) {
                    temp = index
                    break;
                }
            }
            myclass.students.splice(temp, 1)
            myclass.save();
            const st = await Student.delete({ _id: req.params.id })
            
            res.status(200).json(st)
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async infostudent(req, res) {
        try {
            const student = await Student.findOne({ _id: req.params.id }).populate('scoresID').populate('myclassID').populate('resultID')
            res.status(200).json(student);
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    async infostudentAll(req, res) {
        try {
            const student = await Student.find().populate('scoresID').populate('myclassID')
            res.status(200).json(student);
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    //PUT
    async updateInfoStudent(req, res) {
        try {
            const student = await Student.updateOne({ _id: req.params.id }, req.body)
            res.status(200).json(student);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    

}

module.exports = studentController;