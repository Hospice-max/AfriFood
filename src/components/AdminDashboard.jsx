import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { subscribeToOrders, subscribeToReservations, updateOrderStatus } from '../services/orderService';
import { subscribeToNotifications, setupAutoNotifications, markAsRead } from '../services/notificationService';
import { auth } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import AdminLogin from './AdminLogin';
import Logo from './Logo';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, pendingOrders: 0, todayOrders: 0 });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    // Setup auto notifications
    setupAutoNotifications();

    // Subscribe to notifications
    const unsubscribeNotifications = subscribeToNotifications((notificationsData) => {
      setNotifications(notificationsData.slice(0, 5));
    });

    // Firebase real-time listeners
    const unsubscribeOrders = subscribeToOrders((snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
      setOrders(ordersData);
      
      // Calculate stats
      const totalRevenue = ordersData.reduce((sum, order) => sum + (order.total || 0), 0);
      const pendingOrders = ordersData.filter(order => order.status === 'pending').length;
      const today = new Date().toDateString();
      const todayOrders = ordersData.filter(order => 
        new Date(order.createdAt?.toDate()).toDateString() === today
      ).length;
      
      setStats({
        totalOrders: ordersData.length,
        totalRevenue,
        pendingOrders,
        todayOrders
      });
    });

    const unsubscribeReservations = subscribeToReservations((snapshot) => {
      const reservationsData = snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
      setReservations(reservationsData);
    });

    return () => {
      unsubscribeOrders();
      unsubscribeReservations();
      unsubscribeNotifications();
    };
  }, [user]);

  const handleStatusUpdate = async (orderId, newStatus) => {
    await updateOrderStatus(orderId, newStatus);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-orange-100 text-orange-800',
      ready: 'bg-green-100 text-green-800',
      delivered: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <Logo size="xl" className="mx-auto mb-4" />
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onLogin={() => setUser(auth.currentUser)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-40">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <Logo size="md" />
            <div>
              <h1 className="font-bold text-xl text-gray-900">AfriFood</h1>
              <p className="text-sm text-gray-500">Admin Dashboard</p>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'dashboard', name: 'Tableau de bord', icon: '📊' },
              { id: 'orders', name: 'Commandes', icon: '🛍️', badge: orders.length },
              { id: 'reservations', name: 'Réservations', icon: '📅', badge: reservations.length }
            ].map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    activeTab === item.id ? 'bg-white/20' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </motion.button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200"
          >
            <span className="text-xl">🚪</span>
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Bonjour, Admin 👋</h2>
            <p className="text-gray-600">Voici un aperçu de votre restaurant aujourd'hui</p>
          </div>
          
          {/* Notifications */}
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <motion.div 
                className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-200 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-orange-600">🔔</span>
              </motion.div>
              {notifications.filter(n => !n.read).length > 0 && (
                <motion.div 
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {notifications.filter(n => !n.read).length}
                </motion.div>
              )}
              
              {/* Dropdown notifications */}
              <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-2xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-3">Notifications récentes</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {notifications.length > 0 ? notifications.map((notif) => (
                      <motion.div
                        key={notif.id}
                        className={`p-3 rounded-lg border transition-all duration-200 ${
                          notif.read ? 'bg-gray-50 border-gray-200' : 'bg-orange-50 border-orange-200'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => !notif.read && markAsRead(notif.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{notif.message}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notif.createdAt?.toLocaleString('fr-FR')}
                            </p>
                          </div>
                          <span className={`text-xl ${
                            notif.type === 'order' ? '🛍️' : '📅'
                          }`}>
                            {notif.type === 'order' ? '🛍️' : '📅'}
                          </span>
                        </div>
                      </motion.div>
                    )) : (
                      <p className="text-gray-500 text-center py-4 text-sm">Aucune notification</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Commandes totales', value: stats.totalOrders, icon: '📦', color: 'blue' },
                  { title: 'Revenus totaux', value: `${stats.totalRevenue.toLocaleString()} FCFA`, icon: '💰', color: 'green' },
                  { title: 'En attente', value: stats.pendingOrders, icon: '⏳', color: 'orange' },
                  { title: 'Aujourd\'hui', value: stats.todayOrders, icon: '📅', color: 'purple' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        stat.color === 'blue' ? 'bg-blue-100' :
                        stat.color === 'green' ? 'bg-green-100' :
                        stat.color === 'orange' ? 'bg-orange-100' : 'bg-purple-100'
                      }`}>
                        <span className="text-2xl">{stat.icon}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-4">Commandes récentes</h3>
                  <div className="space-y-3">
                    {orders.slice(0, 5).map((order) => (
                      <div key={order.docId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-gray-600">{order.name}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-4">Notifications</h3>
                  <div className="space-y-3">
                    {notifications.length > 0 ? notifications.map((notif, index) => (
                      <div key={index} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <p className="text-sm font-medium text-orange-800">{notif.message}</p>
                      </div>
                    )) : (
                      <p className="text-gray-500 text-center py-4">Aucune notification</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Gestion des commandes</h3>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <motion.div
                      key={order.docId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-bold text-lg text-gray-900">#{order.id}</h4>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600"><strong>Client:</strong> {order.name}</p>
                              <p className="text-gray-600"><strong>Téléphone:</strong> {order.phone}</p>
                              <p className="text-gray-600"><strong>Adresse:</strong> {order.address}</p>
                            </div>
                            <div>
                              <p className="text-gray-600"><strong>Plat:</strong> {order.item} x{order.quantity}</p>
                              <p className="text-orange-600 font-bold text-lg">{order.total} FCFA</p>
                              {order.notes && <p className="text-gray-600"><strong>Notes:</strong> {order.notes}</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {['pending', 'confirmed', 'preparing', 'ready', 'delivered'].map((status) => (
                          <motion.button
                            key={status}
                            onClick={() => handleStatusUpdate(order.docId, status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                              order.status === status
                                ? 'bg-orange-600 text-white shadow-lg'
                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {status}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'reservations' && (
            <motion.div
              key="reservations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Gestion des réservations</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {reservations.map((reservation) => (
                    <motion.div
                      key={reservation.docId}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-bold text-lg text-gray-900">#{reservation.id}</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(reservation.status)}`}>
                          {reservation.status}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-700"><strong>Client:</strong> {reservation.name}</p>
                        <p className="text-gray-700"><strong>Email:</strong> {reservation.email}</p>
                        <p className="text-gray-700"><strong>Téléphone:</strong> {reservation.phone}</p>
                        <p className="text-gray-700"><strong>Date:</strong> {reservation.date} à {reservation.time}</p>
                        <p className="text-gray-700"><strong>Personnes:</strong> {reservation.guests}</p>
                        {reservation.notes && (
                          <p className="text-gray-700"><strong>Message:</strong> {reservation.notes}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;