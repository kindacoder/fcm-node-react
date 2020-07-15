var mongoose = require('mongoose');
mongoose.connect('mongodb://user123:user123@ds149146.mlab.com:49146/techindiacertificate');
var Schema = mongoose.Schema;
var fcmMessageSchema = new Schema({
    name: String,
    message: String
})

var FcmMessage = mongoose.model('fcmMessage', fcmMessageSchema);
module.exports = FcmMessage;