import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyALNZukVd--qyPVIP7DRhsp6_JLMpfmbRA',
  authDomain: 'vue3-learning-32855.firebaseapp.com',
  projectId: 'vue3-learning-32855',
  databaseURL: 'https://vue3-learning-32855-default-rtdb.europe-west1.firebasedatabase.app/',
  storageBucket: 'vue3-learning-32855.appspot.com',
  messagingSenderId: '348114653603',
  appId: '1:348114653603:web:50361069b479b9ed7a8a16',
  measurementId: 'G-7ZQ5ZN7C4W',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

export default getDatabase(app);
