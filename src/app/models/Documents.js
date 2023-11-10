const mongoose = require('mongoose');

const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const Document = new Schema(
    {
        nameDocument: { type: String },
        linkDoc: [
            { type: String }
        ],
        TeacherID: {
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

Document.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});
module.exports = mongoose.model('Document', Document);
