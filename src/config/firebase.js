import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB8tnHahFzKgV5b7IEbqXihTye62Mn75mE",
  authDomain: "afrifood-3c03c.firebaseapp.com",
  projectId: "afrifood-3c03c",
  storageBucket: "afrifood-3c03c.firebasestorage.app",
  messagingSenderId: "1061139390745",
  appId: "1:1061139390745:web:c9f99280e95993704c2588",
  measurementId: "G-WFYE5KTX87"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;