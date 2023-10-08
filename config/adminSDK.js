require('dotenv').config()
const admin = require('firebase-admin')

const privateKeyBase64 = process.env.FIREBASE_PRIVATE_KEY
const privateKey = Buffer.from(privateKeyBase64, 'base64').toString('utf-8')

const adminConfig = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: privateKey,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
}
console.log('adminConfig', adminConfig)
admin.initializeApp({
  credential: admin.credential.cert({
    type: adminConfig.type,
    project_id: adminConfig.project_id,
    private_key_id: adminConfig.private_key_id,
    private_key: adminConfig.private_key,
    client_email: adminConfig.client_email,
    client_id: adminConfig.client_id,
    auth_uri: adminConfig.auth_uri,
    token_uri: adminConfig.token_uri,
    auth_provider_x509_cert_url: adminConfig.auth_provider_x509_cert_url,
    client_x509_cert_url: adminConfig.client_x509_cert_url,
    universe_domain: adminConfig.universe_domain,
  }),

  databaseURL: process.env.FIREBASE_DATABASE_URL,
})

const db = admin.database()

async function getSnapshot(reference) {
  const snapshot = await db.ref(reference).get()
  return snapshot
}

module.exports = { db, getSnapshot }
