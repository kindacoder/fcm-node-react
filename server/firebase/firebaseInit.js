const admin = require('firebase-admin');


const serviceAccount = require('../firebase/firebase-admin-creds.json');
require('dotenv').config()

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB_URL
});

module.exports = {
    messaging: admin.messaging()
} 