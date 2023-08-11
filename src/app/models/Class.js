const mongoose = require('mongoose');

const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const Class = new Schema(
    {
        nameclass: {type: String},
        grade: {type: String},
        classroom:{type: String},
        schoolyear: { type: String },
        organizer:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher'
        },
        teacher:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher'
        }],
        students:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Student'
        }],
    },
    {
        timestamps: true,
    },
);


// Add plugins
mongoose.set('strictQuery', false)

Class.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});


module.exports = mongoose.model('Class', Class);
