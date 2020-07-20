var express = require('express');
const FcmMessage = require('../models/fcmMessage');
const FcmToken = require('../models/fcmTokens');

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
    let fcmTokens = [];
    FcmToken.find().then(resp => {
      if (resp && resp.length !== 0) {
        const temp = resp.map(r => r.token);
        fcmTokens = temp.slice()
        const notificationData = newFcmMessage;
        sendNotificationToClient(fcmTokens, notificationData);
        res.status(200).send({ ...newFcmMessage });
      }

      else {
        //do nothing
      }
    });


  });


})





module.exports = router;
