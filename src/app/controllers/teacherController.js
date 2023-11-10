
const Class = require('../models/Class');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const TimeTable = require('../models/TimeTable');
const Document = require('../models/Documents');
const cloudinary = require('../../util/cloudinary')
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
            const teacher = await Teacher.findById({ _id: req.params.id }).populate("classID").populate("form_teacherID").populate('lesson')
            res.status(200).json(teacher);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async updateInfo(req, res) {
        try {
            const teacher = await Teacher.findByIdAndUpdate({ _id: req.params.id }, req.body)
            return res.status(200).json(teacher);
        }
        catch (err) {
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
            await TimeTable.deleteMany({ TeacherId: teacherId })
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
    },
    async showTimeTable(req, res) {
        try {
            const TKB = await TimeTable.find({ TeacherId: req.body.Id }).populate('ClassId', 'nameclass');
            res.status(200).json(TKB);
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    async uploadFiles(req, res) {
        try {
            const file = req.files.map((file) => file.path)
            const uploadFile = []
            for (let index of file) {
                const result = await cloudinary.uploader.upload(index, { resource_type: 'auto' })
                uploadFile.push({
                    url: result.secure_url,
                    publicId: result.public_id,
                });
            }
            const document = await Document.create(req.body);

            document.TeacherID = req.params.id
            document.linkDoc.push(uploadFile[0].url)
            document.nameDocument = req.body.valueName
            const teacher = await Teacher.findById(req.params.id)
            teacher.lesson.push(document._id)
            teacher.save()
            document.save()

            res.status(200).json(document)
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    async showOneDocument(req, res) {
        try {
            const document = await Document.findById(req.params.id)
            return res.status(200).json(document)
        }
        catch (err) {
            return res.status(500).json(err)
        }
    },

    async removeFile(req, res) {
        try {
            const document = await Document.findById(req.params.id)
            const teacher = await Teacher.findById(document.TeacherID)
            for (let index = 0; index < teacher.lesson.length; index++) {
                if (teacher.lesson[index] == req.params.id) {
                    teacher.lesson.splice(index, 1);
                }
            }
            teacher.save()
            await Document.findByIdAndDelete(req.params.id)
            return res.status(200).send('Delete!!!')
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
}

module.exports = teacherControlller;