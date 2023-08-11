const mongoose = require('mongoose');

const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const summary = new Schema(
    {

        conduct: {type: String},
        rank: {type: Number},
        Toan:{type: Number},
        Ly: { type: Number },
        Hoa: { type: Number },
        Van: { type: Number },
        Su: { type: Number },
        Dia: { type: Number },
        GDCD: { type: Number },
        Sinh: { type: Number },

    },
    {
        timestamps: true,
    },
);


// Add plugins
mongoose.set('strictQuery', false)

summary.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});




module.exports = mongoose.model('summary', summary);
