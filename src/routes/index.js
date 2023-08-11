const authrouter = require('./auth');
const myclassrouter = require('./class');
const studentrouter = require('./student');
const binrouter = require('./bin');
const scores = require('./scores');
const teacher = require('./teacher');

function route(app) {
    app.use('/auth', authrouter);
    app.use('/class', myclassrouter);
    app.use('/student', studentrouter);
    app.use('/bin', binrouter );
    app.use('/scores', scores);
    app.use('/teacher', teacher);
}
module.exports = route;
