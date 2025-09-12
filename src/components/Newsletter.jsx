import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await addDoc(collection(db, 'newsletter'), {
        email,
        subscribedAt: new Date(),
        status: 'active'
      });
      
      // Envoyer email de confirmation
      await fetch('/api/send-welcome-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      setMessage('Inscription réussie ! Vérifiez votre email.');
      setEmail('');
    } catch (error) {
      setMessage('Erreur lors de l\'inscription.');
    }
    setLoading(false);
  };

  return (
    <div className="bg-orange-50 py-12">
      <div className="max-w-md mx-auto text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Newsletter</h3>
        <p className="text-gray-600 mb-6">Recevez nos dernières recettes</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
            required
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 disabled:opacity-50"
          >
            {loading ? 'Inscription...' : 'S\'inscrire'}
          </button>
        </form>
        
        {message && (
          <p className={`mt-4 ${message.includes('réussie') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}