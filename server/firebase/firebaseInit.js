const admin = require('firebase-admin');


const serviceAccount = require('../firebase/firebase-admin-creds.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://tconsulta-7abcc.firebaseio.com'
});

module.exports = {
    messaging: admin.messaging()
} 