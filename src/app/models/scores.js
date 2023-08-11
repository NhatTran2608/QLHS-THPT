const mongoose = require('mongoose');

const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const Result = new Schema(
    {   
        nameSubject: {type: String},
        diemhk1tl: { type: Number },
        diemhk115p: { type: Number },
        diemhk11t: {type: Number },
        diemhk1ck: {type: Number },
        diemhk2tl: { type: Number },
        diemhk215p: { type: Number },
        diemhk21t: {type: Number },
        diemhk2ck: {type: Number },
        TBHKI:{type: Number},
        TBHKII:{type: Number},
        TBCN:{type: Number},
        // conduct: {type: String},
        // rank: {type: String},
        studentID:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        },
        TeacherScoresID:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher'
        }
    },
    {
        timestamps: true,
    },
);
// Add plugins
mongoose.set('strictQuery', false)

Result.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});
module.exports = mongoose.model('Result', Result);
