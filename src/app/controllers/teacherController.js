const Class = require('../models/Class');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

const teacherControlller = {

    async listTeachersubject(req, res) {
        try {
            const teacher = await Teacher.findOne({ subject: req.body.subject })
            res.status(200).json(teacher);
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    async listTeacherAll(req, res) {
        try {
            const teacher = await Teacher.find().populate('classID')
            res.status(200).json(teacher);
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    async oneTeacher(req, res) {
        try {
            const teacher = await Teacher.findById({ _id: req.params.id }).populate("classID").populate("form_teacherID")
            res.status(200).json(teacher);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async updateInfo(req, res){
        try{
            const teacher = await Teacher.findByIdAndUpdate({_id: req.params.id}, req.body)
            return res.status(200).json(teacher);
        }
        catch(err){
            return res.status(500).json(err)
        }
    },

    //Thêm GVBM
    async updateInfoTeacher(req, res) {
        try {
            const teacherz = await Teacher.updateOne({ _id: req.params.id }, req.body)
            this.temp = await req.body
            const tc = await Teacher.findById({ _id: req.params.id });
            for (let index = 0; index < this.temp.classID.length; index++) {
                this.classid = await Class.findById(this.temp.classID[index]);
                if (!this.classid.teacher.includes(tc._id)) {
                    this.classid.teacher.push(tc._id);
                    this.classid.save();
                }
            }

            res.status(200).json(teacherz);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    // Xóa GVBM
    async removeClass(req, res) {
        try {
            const teacher = await Teacher.findById(req.body._id)
            const { id } = req.params
            let index = teacher.classID.indexOf(id)
            teacher.classID.splice(index, 1)
            const teacherId = teacher._id
            const myClass = await Class.findById(id)
            let indexClass = myClass.teacher.indexOf(teacherId)
            myClass.teacher.splice(indexClass, 1)
            await teacher.save()
            await myClass.save()
            res.status(200).json(teacher)
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    //Thêm GVCN
    async AddTeacher(req, res) {
        try {
            const teacher = await Teacher.findById(req.body._id)
            const { id } = req.params
            const classid = await Class.findById(id)
            classid.organizer = teacher._id;
            classid.save();
            res.status(200).json(teacher)
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    //Xóa GVCN 

    async removeTeacher(req, res) {
        try {
            const teacher = await Teacher.findById(req.body._id)
            const { id } = req.params
            teacher.form_teacherID = undefined
            const classid = await Class.findById(id)
            classid.organizer = undefined
            teacher.save();
            classid.save();
            console.log(teacher);
            res.status(200).json(teacher);
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    //Đánh giá học sinh
    async assessStudent(req, res) {
        try {
            const teacher = await Teacher.findById({ _id: req.params.id }).populate("form_teacherID")
            res.status(200).json(teacher)

        }
        catch (err) {
            res.status(500).json(err);
        }
    }


}

module.exports = teacherControlller;