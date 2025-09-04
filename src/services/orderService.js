import { collection, addDoc, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';
import { createNotification } from './notificationService';

export const createOrder = async (orderData) => {
  const orderId = uuidv4().slice(0, 8).toUpperCase();
  const order = {
    id: orderId,
    ...orderData,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  await addDoc(collection(db, 'orders'), order);
  
  // Créer notification
  await createNotification(
    'order',
    `Nouvelle commande #${orderId} de ${orderData.name}`,
    { orderId, customerName: orderData.name, item: orderData.item }
  );
  
  return orderId;
};

export const createReservation = async (reservationData) => {
  const reservationId = uuidv4().slice(0, 8).toUpperCase();
  const reservation = {
    id: reservationId,
    ...reservationData,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  await addDoc(collection(db, 'reservations'), reservation);
  
  // Créer notification
  await createNotification(
    'reservation',
    `Nouvelle réservation #${reservationId} de ${reservationData.name}`,
    { reservationId, customerName: reservationData.name, date: reservationData.date, guests: reservationData.guests }
  );
  
  return reservationId;
};

export const subscribeToOrders = (callback) => {
  return onSnapshot(collection(db, 'orders'), callback);
};

export const subscribeToReservations = (callback) => {
  return onSnapshot(collection(db, 'reservations'), callback);
};

export const updateOrderStatus = async (orderId, status) => {
  const orderRef = doc(db, 'orders', orderId);
  await updateDoc(orderRef, { status, updatedAt: new Date() });
};

export const generateWhatsAppLink = (orderId, phone = '+22997123456') => {
  const message = `Bonjour AfriFood! Je souhaite suivre ma commande ID: ${orderId}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

export const generateMessengerLink = (orderId, pageId = 'afrifood.benin') => {
  const message = `Commande ID: ${orderId}`;
  return `https://m.me/${pageId}?text=${encodeURIComponent(message)}`;
};