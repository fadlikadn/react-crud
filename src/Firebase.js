import * as firebase from 'firebase/app';
import firestore from 'firebase/firestore';

const settings = {timestampsInSnapshots: true};

// const config = {
//     apiKey: "YOUR_API_KEY",
//     authDomain: "YOUR_AUTH_DOMAIN",
//     databaseURL: "YOUR_DATABASE_URL",
//     projectId: "YOUR_PROJECT_ID",
//     storageBucket: "YOUR_STORAGE_BUCKET",
//     messagingSenderId: "YOUR_MESSAGING_ID"
// };

const config = {
    apiKey: "AIzaSyBNChqhGgrCig5CE3cmIDD9lcSzxvxu4zk",
    authDomain: "react-firestore-beeb5.firebaseapp.com",
    databaseURL: "https://react-firestore-beeb5.firebaseio.com",
    projectId: "react-firestore-beeb5",
    storageBucket: "react-firestore-beeb5.appspot.com",
    messagingSenderId: "507097163162"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;