const path = require('path');
const express = require('express');

const methodOverride = require('method-override');
const cors = require('cors');

const route = require('./routes');
const db = require('./config/db');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// Connect to DB
db.connect();
dotenv.config();
const app = express();
const port = 3000;

// Use static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ limit: "10000kb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10000kb", extended: true }));

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(cors());
app.use(cookieParser());
app.use(methodOverride('_method'));


// Routes init
route(app);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);

// app.use((req, res, next) => {
//     return next(new ApiError(404, "Resource not found"));
// });
