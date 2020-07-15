var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var FcmMessage = require('./models/fcmMessage');

var logger = require('morgan');
var PORT = 5500;

var indexRouter = require('./routes/index');
var fcmMessage = require('./routes/fcmMessages');

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

app.use('/', indexRouter);
app.use('/fcm-messages', fcmMessage);

app.listen(PORT, (req, res) => {
    console.log('server started at port 5500');
})
