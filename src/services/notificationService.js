import { collection, addDoc, query, orderBy, limit, onSnapshot, where, Timestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

// Créer une notification
export const createNotification = async (type, message, data = null) => {
  try {
    await addDoc(collection(db, 'notifications'), {
      type,
      message,
      data,
      read: false,
      createdAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Erreur création notification:', error);
  }
};

// Écouter les notifications en temps réel
export const subscribeToNotifications = (callback) => {
  const q = query(
    collection(db, 'notifications'),
    orderBy('createdAt', 'desc'),
    limit(10)
  );
  
  return onSnapshot(q, (snapshot) => {
    const notifications = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate()
    }));
    callback(notifications);
  });
};

// Marquer comme lu
export const markAsRead = async (notificationId) => {
  try {
    const notificationRef = doc(db, 'notifications', notificationId);
    await updateDoc(notificationRef, { read: true });
  } catch (error) {
    console.error('Erreur marquage lu:', error);
  }
};

// Notifications automatiques pour nouvelles commandes/réservations
export const setupAutoNotifications = () => {
  // Écouter nouvelles commandes
  const ordersQuery = query(
    collection(db, 'orders'),
    orderBy('createdAt', 'desc'),
    limit(1)
  );
  
  let isFirstLoad = true;
  onSnapshot(ordersQuery, (snapshot) => {
    if (isFirstLoad) {
      isFirstLoad = false;
      return;
    }
    
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const order = change.doc.data();
        createNotification(
          'order',
          `Nouvelle commande #${order.id} de ${order.name}`,
          { orderId: order.id, customerName: order.name }
        );
      }
    });
  });

  // Écouter nouvelles réservations
  const reservationsQuery = query(
    collection(db, 'reservations'),
    orderBy('createdAt', 'desc'),
    limit(1)
  );
  
  let isFirstReservationLoad = true;
  onSnapshot(reservationsQuery, (snapshot) => {
    if (isFirstReservationLoad) {
      isFirstReservationLoad = false;
      return;
    }
    
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const reservation = change.doc.data();
        createNotification(
          'reservation',
          `Nouvelle réservation #${reservation.id} de ${reservation.name}`,
          { reservationId: reservation.id, customerName: reservation.name }
        );
      }
    });
  });
};