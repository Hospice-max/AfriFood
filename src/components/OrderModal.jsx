import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createOrder, generateWhatsAppLink, generateMessengerLink } from '../services/orderService';

const OrderModal = ({ isOpen, onClose, item }) => {
  const [orderData, setOrderData] = useState({
    name: '',
    phone: '',
    address: 'Cotonou, Akpakpa',
    quantity: 1,
    notes: ''
  });
  const [orderId, setOrderId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const id = await createOrder({
        ...orderData,
        item: item.name,
        price: item.price,
        total: parseInt(item.price.replace(/\D/g, '')) * orderData.quantity
      });
      setOrderId(id);
    } catch (error) {
      console.error('Erreur commande:', error);
    }
    setIsSubmitting(false);
  };

  const resetModal = () => {
    setOrderData({ name: '', phone: '', address: 'Cotonou, Akpakpa', quantity: 1, notes: '' });
    setOrderId(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={resetModal}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {!orderId ? (
            <>
              <h3 className="text-2xl font-bold mb-4">Commander {item?.name}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Votre nom"
                  value={orderData.name}
                  onChange={(e) => setOrderData({...orderData, name: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                  required
                />
                <input
                  type="tel"
                  placeholder="Téléphone"
                  value={orderData.phone}
                  onChange={(e) => setOrderData({...orderData, phone: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="Adresse"
                  value={orderData.address}
                  onChange={(e) => setOrderData({...orderData, address: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                />
                <input
                  type="number"
                  min="1"
                  placeholder="Quantité"
                  value={orderData.quantity}
                  onChange={(e) => setOrderData({...orderData, quantity: parseInt(e.target.value)})}
                  className="w-full p-3 border rounded-lg"
                />
                <textarea
                  placeholder="Notes spéciales"
                  value={orderData.notes}
                  onChange={(e) => setOrderData({...orderData, notes: e.target.value})}
                  className="w-full p-3 border rounded-lg h-20"
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={resetModal}
                    className="flex-1 py-3 border border-gray-300 rounded-lg"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 bg-orange-600 text-white rounded-lg disabled:opacity-50"
                  >
                    {isSubmitting ? 'En cours...' : 'Commander'}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold mb-2">Commande confirmée!</h3>
              <p className="text-gray-600 mb-4">Votre ID de commande:</p>
              <div className="text-3xl font-bold text-orange-600 mb-6">{orderId}</div>
              <p className="text-sm text-gray-500 mb-6">
                Contactez-nous pour suivre votre commande:
              </p>
              <div className="space-y-3">
                <a
                  href={generateWhatsAppLink(orderId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-green-500 text-white rounded-lg font-medium"
                >
                  📱 WhatsApp
                </a>
                <a
                  href={generateMessengerLink(orderId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-blue-500 text-white rounded-lg font-medium"
                >
                  💬 Messenger
                </a>
                <button
                  onClick={resetModal}
                  className="w-full py-3 border border-gray-300 rounded-lg"
                >
                  Fermer
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderModal;