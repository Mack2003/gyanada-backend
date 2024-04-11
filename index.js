const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const UserRoute = require('./Routes/UserRoute');
const bodyParser = require('body-parser');
const coockieParser = require('cookie-parser');
const ExamRoute = require('./Routes/ExamRoute');

require('dotenv').config()

//Middlewears
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(coockieParser());
app.use(express.json());
app.use('/user', UserRoute);
app.use('/exam', ExamRoute)


mongoose.connect(process.env.MONGO_DB_URL).then(() => {
    app.listen(process.env.SERVER_PORT, (err) => {
        if (err) {
            return console.log(`Error while starting server: ${err}`);
        };
        console.log(`Server Started on port number ${process.env.SERVER_PORT}`);
    });
}).catch((err) => {
    console.log(`Error when connecting to the server: ${err}`);
});