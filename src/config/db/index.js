const scores = require('../../app/models/scores');
const Student = require('../../app/models/Student');
const myclass = require('../../app/models/Class');
const Summary = require('../../app/models/Summary');
const TimeTable = require('../../app/models/TimeTable')
const Document = require('../../app/models/Documents')
const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/StudentManagement');
        //mongodb://127.0.0.1/StudentManagement  
      //  mongodb+srv://trancongnhat2608:Bm93vVOmIKDEbqnY@cluster0.lnymnx6.mongodb.net/StudentManagement?retryWrites=true&w=majority
        console.log('Connect DataBase!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };
