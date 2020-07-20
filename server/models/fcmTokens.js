var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fcmTokenSchema = new Schema({
    token: String,
})

var FcmToken = mongoose.model('fcmToken', fcmTokenSchema);
module.exports = FcmToken;