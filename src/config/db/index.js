const mongoose = require('mongoose');
const scores = require('../../app/models/scores');
const Student = require('../../app/models/Student');
const myclass = require('../../app/models/Class');
const Summary = require('../../app/models/Summary');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/StudentManagement');
        console.log('Connect DataBase!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };
