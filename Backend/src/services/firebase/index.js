const fs = require('fs');
const admin = require('firebase-admin');

const { config } = require('../../middleware');

// TODO: Re-enable this when integration is done
// const serviceAccount = JSON.parse(fs.readFileSync(config.GOOGLE_APPLICATION_CREDENTIALS));
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

module.exports = admin;
