const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {db, passport} = require('./config');
const session = require('express-session');
const pgSession = require('connect-pg-simple');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(session({
    store: new pgSession({
        pool: db,
        tableName: 'express-sessions'
    }),
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 60000
    }
}));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));