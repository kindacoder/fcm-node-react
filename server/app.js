var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var FcmMessage = require('./models/fcmMessage');


// const { messaging } = require('./firebase/firebaseInit');




var logger = require('morgan');
var PORT = 5500;

var indexRouter = require('./routes/index');
var fcmMessage = require('./routes/fcmMessages');
var fcmToken = require('./routes/fcmToken')

var app = express();

require('dotenv').config()
mongoose.connect(process.env.MLAB_DB_URL, function () {
    console.log('database connected');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/', indexRouter);
app.use('/fcm-messages', fcmMessage);
app.use('/fcm-tokens', fcmToken)



app.listen(PORT, (req, res) => {
    console.log('server started at port 5500');
})
