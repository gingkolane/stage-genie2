const Firestore = require('@google-cloud/firestore');

// Initialize an instance of Firestore client
const db = new Firestore({
  projectId: 'YOUR_PROJECT_ID',
  keyFilename: '/path/to/keyfile.json',
});

// Function to get a document by id
async function getDocument(collectionName, docId) {
  const docRef = db.collection(collectionName).doc(docId);
  const doc = await docRef.get();
  if (!doc.exists) {
    console.log('No such document!');
    return null;
  } else {
    console.log('Document data:', doc.data());
    return doc.data();
  }
}

// Function to get all documents in a collection
async function getAllDocuments(collectionName) {
  const snapshot = await db.collection(collectionName).get();
  return snapshot.docs.map(doc => doc.data());
}

async function quickstartQuery(db) {
  // [START quickstart_query]
  // Realtime listens are not yet supported in the Node.js SDK
  const snapshot = await db.collection('users').where('born', '<', 1900).get();
  return snapshot.docs.map(doc => doc.data())
  };
  // [END quickstart_query]

module.exports = { getDocument, getAllDocuments, quickstartQuery};