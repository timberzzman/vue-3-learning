import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
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
