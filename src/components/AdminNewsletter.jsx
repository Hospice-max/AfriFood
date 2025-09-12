import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, addDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { subscribeToNewsletterUpdates } from '../services/newsletterService';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editEmail, setEditEmail] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const unsubscribe = subscribeToNewsletterUpdates((snapshot) => {
      const subs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSubscribers(subs);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);



  const deleteSubscriber = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet abonné ?')) return;
    
    try {
      await deleteDoc(doc(db, 'newsletter', id));
      showNotification('✅ Abonné supprimé avec succès');
    } catch (error) {
      console.error('Erreur:', error);
      showNotification('❌ Erreur lors de la suppression');
    }
  };

  const addSubscriber = async (e) => {
    e.preventDefault();
    if (!newEmail) return;
    
    try {
      await addDoc(collection(db, 'newsletter'), {
        email: newEmail,
        location: { error: 'Ajouté manuellement' },
        timestamp: serverTimestamp(),
        status: 'active'
      });
      
      setNewEmail('');
      setShowAddForm(false);
      showNotification('✅ Abonné ajouté avec succès');
    } catch (error) {
      console.error('Erreur:', error);
      showNotification('❌ Erreur lors de l\'ajout');
    }
  };

  const updateSubscriber = async (id) => {
    if (!editEmail) return;
    
    try {
      await updateDoc(doc(db, 'newsletter', id), {
        email: editEmail
      });
      
      setEditingId(null);
      setEditEmail('');
      showNotification('✅ Email modifié avec succès');
    } catch (error) {
      console.error('Erreur:', error);
      showNotification('❌ Erreur lors de la modification');
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  if (loading) return <div className="p-4">Chargement...</div>;

  return (
    <div className="space-y-6">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
              notification.includes('✅') ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-2xl shadow-lg">
        <div className="p-6 border-b bg-gradient-to-r from-orange-50 to-orange-100">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Newsletter</h2>
              <p className="text-gray-600 mt-1">Gestion des abonnés en temps réel</p>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                + Ajouter
              </motion.button>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold">
                {subscribers.length} abonnés
              </span>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" title="Temps réel activé"></div>
            </div>
          </div>
        </div>

        {/* Formulaire d'ajout */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-b bg-gray-50"
            >
              <form onSubmit={addSubscriber} className="p-6">
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse email
                    </label>
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="exemple@email.com"
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Ajouter
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Annuler
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-900">Email</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-900">Localisation</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-900">Date d'inscription</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub, index) => (
                <motion.tr
                  key={sub.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b hover:bg-orange-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    {editingId === sub.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="email"
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
                        />
                        <motion.button
                          onClick={() => updateSubscriber(sub.id)}
                          className="text-green-600 hover:text-green-800 text-sm"
                          whileHover={{ scale: 1.1 }}
                        >
                          ✓
                        </motion.button>
                        <motion.button
                          onClick={() => { setEditingId(null); setEditEmail(''); }}
                          className="text-red-600 hover:text-red-800 text-sm"
                          whileHover={{ scale: 1.1 }}
                        >
                          ✗
                        </motion.button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{sub.email}</span>
                        <motion.button
                          onClick={() => { setEditingId(sub.id); setEditEmail(sub.email); }}
                          className="text-blue-600 hover:text-blue-800 text-sm opacity-0 group-hover:opacity-100"
                          whileHover={{ scale: 1.1 }}
                        >
                          ✏️
                        </motion.button>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {sub.location ? (
                      sub.location.error ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                          {sub.location.error}
                        </span>
                      ) : (
                        <div className="text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <span>📍</span>
                            <span>Lat: {sub.location.latitude?.toFixed(4)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span></span>
                            <span>Lng: {sub.location.longitude?.toFixed(4)}</span>
                          </div>
                        </div>
                      )
                    ) : (
                      <span className="text-gray-400 text-sm">Non disponible</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {sub.timestamp?.toDate?.()?.toLocaleString('fr-FR') || 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <motion.button
                      onClick={() => deleteSubscriber(sub.id)}
                      className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      🗑️ Supprimer
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
              {subscribers.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center space-y-2">
                      <span className="text-4xl">📧</span>
                      <p>Aucun abonné pour le moment</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}