const express = require("express");
const process = require("process");
const app = express();
const db = require("./db");
const { errorMiddlewareAsync } = require("./utils");
const errors = require("./utils/errors");
const session = require('express-session');


console.log(process.env.JWT_SECRET);

app.use(
    session({
        secret: 'secret_key',
        resave: true,
        saveUninitialized: true
    })
)

app.get(
    "/login",
    errorMiddlewareAsync((req, res) => {
        db.auth.loginUser('johnsnow', 'star', req.session.id)
        res.send(req.session.id);
    }, errors.failedCheckLoginOrPassword())
);


app.listen(3000);

//johnsnow - qwerty
//marry - 1234
//darth - star