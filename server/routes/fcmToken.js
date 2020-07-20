var express = require('express');
const FcmToken = require('../models/fcmTokens');
var router = express.Router();

/* GET users listing. */
router.post('/', function (req, res, next) {


    var token = req.body.token;
    FcmToken.findOne({ token: token }, function (err, tokens) {
        console.log(tokens)

        if (err) {
            res.send(err);
            return;
        }

        // res.json(user);
        if (tokens == null || tokens.length == 0) {
            var newToken = new FcmToken({
                token: token
            }).save(function (err) {
                if (err) {
                    console.log(err);
                }
                res.status(200).send({ message: 'token saved siccessfully !' });

            });
        } else {
            res.status(422).send({ message: 'Already saved token !' });
        }

    });
});








module.exports = router;
