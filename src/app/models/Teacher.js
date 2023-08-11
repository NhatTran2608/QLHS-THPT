const mongoose = require('mongoose');

const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const Teacher = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        fullname: { type: String, required: true },
        subject:{ type: String},
        avatar: {type: String},
        email: { type: String },
        birth: { type: String },
        sex: { type: String },
        tp: { type: String },
        huyen: { type: String },
        xa: { type: String },
        cccd: { type: String },
        phone: { type: String },
        role:{type: String, default: "GV"},
        form_teacherID: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Class',
        },
        classID:[{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Class',
        }],
        scoresID:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Result',
        },
    },
    {
        timestamps: true,
    },
);


// Add plugins
mongoose.set('strictQuery', false)

Teacher.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Teacher', Teacher);
