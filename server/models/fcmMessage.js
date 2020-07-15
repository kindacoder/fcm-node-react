var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fcmMessageSchema = new Schema({
    name: String,
    message: String
})

var FcmMessage = mongoose.model('fcmMessage', fcmMessageSchema);
module.exports = FcmMessage;