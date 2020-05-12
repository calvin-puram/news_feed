import firebase from 'firebase/app';
import 'firebase/firestore';

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: 'AIzaSyBOJB-BcnfOcXg95yvviSBHwvrc9qmlayA',
    authDomain: 'nuxt-feed.firebaseapp.com',
    databaseURL: 'https://nuxt-feed.firebaseio.com',
    projectId: 'nuxt-feed',
    storageBucket: 'nuxt-feed.appspot.com',
    messagingSenderId: '1095347598881',
    appId: '1:1095347598881:web:58c1320b6c54bdc547d560',
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({
    timestampsInSnapshots: true,
  });
}

const db = firebase.firestore();
export default db;
