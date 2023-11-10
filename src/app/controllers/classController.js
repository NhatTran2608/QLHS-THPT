const Class = require('../models/Class')
const MyClass = require('../models/Class')
const Teacher = require('../models/Teacher')
const TimeTable = require('../models/TimeTable');
const classController = {
    async createClass(req, res) {
        try {

            const classz = await MyClass.findOne({ nameclass: req.body.nameclass })
            //const classzz = await MyClass.findOne({ schoolyear: req.body.schoolyear })
            if (classz) {
                return res.status(400).json({
                    mes: 'Đã tồn tại lớp học cùng học kì'
                })
            }
            const myclass = await MyClass.create(req.body);

            res.status(200).json(myclass);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async infoclass(req, res) {
        try {
            const myclass = await MyClass.findById({ _id: req.params.id }).populate('teacher').populate('students')
            res.status(200).json(myclass);
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    async updateClass(req, res) {
        try {
            const myclass = await MyClass.updateOne({ _id: req.params.id }, req.body);
            // console.log(req.body);
            // console.log(myclass);

            // const teacher = await Teacher.findOne({ _id: req.body.teacher});
            // teacher.classID.push(myclass._id);
            // teacher.save()
            res.status(200).json(myclass);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async index(req, res) {
        try {
            const myclass = await MyClass.find().populate('teacher').populate('students');
            res.status(200).json(myclass);
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    async showClass10(req, res) {
        try {
            const myclass = await MyClass.find({ grade: '10' }).populate('teacher')
            res.status(200).json(myclass);

        } catch (err) {
            res.status(500).json(err)
        }
    },

    async showClass11(req, res) {
        try {
            const myclass = await MyClass.find({ grade: '11' })
            res.status(200).json(myclass);

        } catch (err) {
            res.status(500).json(err)
        }
    },

    async showClass12(req, res) {
        try {
            const myclass = await MyClass.find({ grade: '12' })
            res.status(200).json(myclass);

        } catch (err) {
            res.status(500).json(err)
        }
    },

    async TimeTable(req, res) {
        try {

            const { classId, thu, tiet, fullname, subject, id } = req.body
            let timetable = await TimeTable.findOne({
                lesson: tiet,
                day: thu,
                ClassId: classId
            })
            if (timetable) {
                //update
                timetable.TeacherId = id
                await timetable.save()
                return res.status(200).json({
                    err: 0,
                    mes: 'cập nhật thành công'
                })
            } else {
                await TimeTable.create({
                    lesson: tiet,
                    day: thu,
                    TeacherId: id,
                    ClassId: classId
                })
                return res.status(200).json({
                    err: 0,
                    mes: 'thêm mới thành công'
                })
            }
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    async showTableTime(req, res) {
        try {
            let { classId } = req.body
            const timeTable = await TimeTable.find({
                ClassId: classId
            }).populate('TeacherId', 'subject fullname')

            return res.status(200).json(timeTable)
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    async deleteTimetableElments(req, res) {
        try {
            const tkb = await TimeTable.deleteOne({ _id: req.params.id })
            res.status(200).send('delete!!!');
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async showAllTimetable(req, res) {
        try {
            const tkb = await TimeTable.find()
            res.status(200).json(tkb);

        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async showOneTimetable(req, res) {
        try {
            const tkb = await TimeTable.find({ TeacherId: req.params.id })
            res.status(200).json(tkb);
        }
        catch (err) {
            res.status(500).json(err)
        }
    }

}

module.exports = classController;