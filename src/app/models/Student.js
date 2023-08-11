const mongoose = require('mongoose');

const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const Student = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        fullname: { type: String, required: true },
        avatar: {type: String},
        email: { type: String },
        namsinh: { type: String },
        gioitinh: { type: String },
        tp: { type: String },
        huyen: { type: String },
        xa: { type: String },
        cccd: { type: String },
        phone: { type: String },
        father: { type: String },
        phoneFather: { type: String },
        mother: { type: String },
        phoneMother: { type: String },
        role: {type: String, default: 'HS'}, 
        grade:{type: String},
        scoresID:[{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Result'
        }],
        myclassID:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Class',
        },
        resultID:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'summary',
        }
    },
    {
        timestamps: true,
    },
);


// Add plugins
mongoose.set('strictQuery', false)

Student.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Student', Student);
