const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session);
const helmet=require('helmet')

const mongoURI = process.env.MONGO_URI;
const sessionSecret = process.env.SESSION_SECRET;

const store = new mongoDBStore({
    uri: mongoURI,
    collection: 'session',
});

app.use(helmet());
app.use(bodyParser.json());

// Use express-session middleware to manage user sessions
app.use(
    session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

// Middleware function to check if user is logged in
app.use((req, res, next) => {
    console.log("session : ", req.session);
    if (!req.session.user) {
        return next();
    }
    req.user = req.session.user;
    next();
});



//routes
const authRoute=require('./routes/authRoute')
const pageRoute=require('./routes/pageRoute')
app.use('/auth', authRoute);
app.use("/", pageRoute);    // this page to check if user is logged in




mongoose
    .connect(mongoURI)
    .then(
        app.listen(3000, () => {
            console.log("Server Running....");
        })
    )
    .catch((err) => console.log(err));