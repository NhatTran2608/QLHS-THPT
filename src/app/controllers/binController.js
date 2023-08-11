const Class = require('../models/Class')
const Student = require('../models/Student')
const Teacher = require('../models/Teacher');

const binController = {

    async restoresStudent(req, res){
        try{
            const studentz = await Student.restore({_id: req.params.id});
            const student = await Student.findById({_id: req.params.id})
            const myclass = await Class.findById(student.myclassID) 
            myclass.students.push(student._id);
            myclass.save();
            res.status(200).json(studentz);
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    async restoresTeacher(req, res){
        try{
            const teacher = await Teacher.restore({_id: req.params.id});
            res.status(200).json(teacher);
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    async deleteStudent(req, res){
        try{
            await Student.deleteOne({_id: req.params.id});
            res.status(200).send('Delete!!!');

        }catch(err){
            res.status(500).json(err);
        }
    },

    async deleteTeacher(req, res){
        try{
            await Teacher.deleteOne({_id: req.params.id});
            res.status(200).send('Delete!!!');

        }catch(err){
            res.status(500).json(err);
        }
    },

    async showBinStudent(req, res){
        try{
            const student = await Student.findDeleted();
            res.status(200).json(student);

        }catch(err){
            res.status(500).json(err);
        }
    },

    async showBinTeacher(req, res){
        try{
            const teacher = await Teacher.findDeleted();
            res.status(200).json(teacher);
        }catch(err){
            res.status(500).json(err);
        }
    },


    
}

module.exports = binController;