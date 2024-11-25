import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';


const firebaseConfig = {
  apiKey: 'AIzaSyDyaQn5azX0AHUeRjoE9bvJAm8tUGTPPP0',
  authDomain: 'mad-app-firebase-auth.firebaseapp.com',
  projectId: 'mad-app-firebase-auth',
  storageBucket: 'mad-app-firebase-auth.appspot.com',
  messagingSenderId: '808548940372',
  appId: '1:808548940372:web:8b9987b621668aadbacbc1',
  measurementId: 'G-4E1RQ3J6VK',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut };

