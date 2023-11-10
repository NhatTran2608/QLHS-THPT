const mongoose = require('mongoose');

const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const summary = new Schema(
    {
        conduct: {type: String},
        rank: { type: Number },
        rank_conduct: { type: String },
        Academic_ability:{type: String}
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
