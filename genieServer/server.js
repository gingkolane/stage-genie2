
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from './keys/serviceAccountKey.json' assert { type: 'json' };
// import dotenv from 'dotenv';

// Initialize an instance of firebase with a Firestore db server

async function initializeAppSA() {

    // calls dotenv's config method to load the environment variables from .env file
    // dotenv.config();

    const app = initializeApp({
        credential: cert(serviceAccount)
    });

    const db = getFirestore();

    // testAddData(db);
    // getCollections(db);  
    console.log('Firestore initialized');
    return db;
}

async function testAddData(db) {
    const docRef = db.collection('users').doc('alovelace');
    await docRef.set({
        first: 'Ada',
        last: 'Lovelace',
        born: 1815
    });

    const aTuringRef = db.collection('users').doc('aturing');
    
    await aTuringRef.set({
        'first': 'Alan',
        'middle': 'Mathison',
        'last': 'Turing',
        'born': 1912
    });
    console.log('Added data to Firestore');

}

async function getCollections(db) {
    const dbcollection = await db.collection('users').get();
    if (!dbcollection.exists) {
      console.log('No such collection!');
    } else {
      console.log('collections data:', dbcollection.data());
    }
  }
  
// start the server
initializeAppSA()