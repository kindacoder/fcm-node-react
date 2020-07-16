var express = require('express');
const FcmMessage = require('../models/fcmMessage');
const { connection } = require('mongoose');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  const messages = FcmMessage.find().then(resp => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.status(200).send(resp);
  }).catch(err => {
    throw err;
  })


});

const { sendNotificationToClient } = require('../fcm/notify')



///send messages 
router.post('/', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var name = req.body.name;
  var message = req.body.message;


  // res.json(user);
  const newFcmMessage = {
    name: name,
    message: message
  }
  new FcmMessage(newFcmMessage).save(function (err) {
    if (err) {
      console.log(err);
    }
    //send fcm notification
    // const tokens = [];
    // const notificationData = newFcmMessage;
    // sendNotificationToClient(tokens, notificationData);
    res.status(200).send({ message: 'message saved successfully !' });
  });


})





module.exports = router;
