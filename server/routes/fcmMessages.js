var express = require('express');
const FcmMessage = require('../models/fcmMessage');
const { connection } = require('mongoose');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  const messages = FcmMessage.find().then(resp => {

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
    const tokens = [
      'dmAcWg2Bfd2p1bBmyKNTmV:APA91bEzOoeeNTzyZFF_69TQy3ehzs6HpA7bzRElNHcM7nW_hcHCkxYGIa4nY8wDMo5bbugceagMPjhPY06S9XXu72qrBeIhE2IVkITQ-tooVES4mg7aD9mJNW5MDQVSyH3Qp3bSAI7D'
    ];
    const notificationData = newFcmMessage;
    sendNotificationToClient(tokens, notificationData);
    res.status(200).send({ ...newFcmMessage });
  });


})





module.exports = router;
