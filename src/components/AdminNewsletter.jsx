import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'newsletter'));
      const subs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSubscribers(subs);
    } catch (error) {
      console.error('Erreur:', error);
    }
    setLoading(false);
  };

  const deleteSubscriber = async (id) => {
    try {
      await deleteDoc(doc(db, 'newsletter', id));
      setSubscribers(subscribers.filter(sub => sub.id !== id));
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  if (loading) return <div className="p-4">Chargement...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Gestion Newsletter</h2>
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Abonnés ({subscribers.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map(sub => (
                <tr key={sub.id} className="border-b">
                  <td className="px-4 py-2">{sub.email}</td>
                  <td className="px-4 py-2">
                    {sub.subscribedAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => deleteSubscriber(sub.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}