const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {db, passport} = require('./config');
const authRoutes = require('./routes/authRoutes');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const path = require('path');
const {Pool} = require('pg');
const { log } = require('console');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(session({
    // store: new pgSession({
    //     pool: db,
    //     tableName: 'express_sessions',
    //     errorLog: console.error
    // }),
    store: new pgSession({
        pool: pool,
        tableName: 'express_sessions',
        errorLog: console.error
    }),
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 60000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    // res.send('Server is running.');
    // console.log("req.user: ",req.user);
    if(req.isAuthenticated && req.user){
        res.send(`Welcome ${req.user.username}!`);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));