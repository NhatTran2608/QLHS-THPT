const mongoose = require('mongoose');

const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const Timetable = new Schema(
    {
        lesson: { type: String },
        day: { type: String },
        TeacherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher'
        },
        ClassId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class'
        },
    },
    {
        timestamps: true,
    },
);

// Add plugins
mongoose.set('strictQuery', false)

Timetable.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Timetable', Timetable);
