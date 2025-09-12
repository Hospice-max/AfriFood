import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

export const subscribeToNewsletter = async (email) => {
  try {
    // Obtenir la localisation
    const location = await getCurrentLocation();
    
    // Ajouter à la base de données
    const docRef = await addDoc(collection(db, 'newsletter'), {
      email,
      location,
      timestamp: serverTimestamp(),
      status: 'active'
    });
    
    // Créer une notification pour l'admin
    await addDoc(collection(db, 'notifications'), {
      type: 'newsletter',
      message: `Nouvelle inscription newsletter: ${email}`,
      email,
      location,
      read: false,
      createdAt: serverTimestamp()
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Erreur inscription newsletter:', error);
    return { success: false, error: error.message };
  }
};

const getCurrentLocation = () => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ error: 'Géolocalisation non supportée' });
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        resolve({ error: error.message });
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  });
};

export const subscribeToNewsletterUpdates = (callback) => {
  const q = query(collection(db, 'newsletter'), orderBy('timestamp', 'desc'));
  return onSnapshot(q, callback);
};