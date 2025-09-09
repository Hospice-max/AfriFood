import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import OrderModal from './OrderModal';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('plats');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const handleOrder = (item) => {
    setSelectedItem(item);
    setIsOrderModalOpen(true);
  };

  const categories = [
    { id: 'plats', name: 'Plats Principaux', icon: '🍽️' },
    { id: 'entrees', name: 'Entrées', icon: '🥗' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' },
    { id: 'boissons', name: 'Boissons', icon: '🥤' }
  ];

  const menuItems = {
    plats: [
      {
        name: 'Pâte Rouge',
        description: 'Plat traditionnel béninois avec sauce tomate, poisson et légumes',
        price: '2500 FCFA',
        image: '/images/pate-rouge-plat-traditionnel-du-benin-e1686128990385.webp',
        spicy: true,
        popular: true
      },
        {
        name: 'Abobo(Plat de Haricots)',
        description: 'Haricots traditionnels mélangés avec farine et légumes frais',
        price: '1500 FCFA',
        image: '/images/Un_plat_de_haricot_(ou_Abobo_en_langue_locale_Fon_au_Bénin)_mélangé_avec_de_la_farine.webp'
      },      
      {
        name: 'Télibo',
        description: 'Spécialité béninoise de poisson grillé aux épices traditionnelles',
        price: '3500 FCFA',
        image: '/images/telibo-critikmag.webp',
        spicy: true
      },

    ],
    entrees: [
      {
        name: 'Brochettes de Mouton',
        description: 'Brochettes marinées à la cacahuète, grillées selon la tradition',
        price: '3200 FCFA',
        image: '/images/Brochettes-de-mouton-marine-a-la-cacahuete.webp',
        spicy: true
      },
      // {
      //   name: 'Aloko',
      //   description: 'Bananes plantains frites, accompagnées de sauce pimentée',
      //   price: '1000 FCFA',
      //   image: '/images/Aloko.webp',
      //   spicy: true
      // },    
      {
        name: 'Riz aux Haricots',
        description: 'Riz parfumé aux haricots blancs, spécialité béninoise savoureuse',
        price: '2000 FCFA',
        image: '/images/Riz-aux-haricots-blancs.webp',
        popular: true
      },
      {
        name: 'Plat Végétarien Béninois',
        description: 'Assortiment de légumes locaux préparés traditionnellement',
        price: '1800 FCFA',
        image: '/images/plat-vegetarien-beninois.webp'
      }
    ],
    desserts: [      
      {
        name: 'Crème à la fraise',
        description: 'Spécialité catégorie dessert savoureux',
        price: '2000 FCFA',
        image: '/images/Trente_recettes_preparer_avance_entree_plat_dessert.jpg',
        popular: true
      },
      {
        name: 'Spécialité Martine',
        description: 'Plat signature de notre chef, mélange unique de saveurs béninoises',
        price: '4000 FCFA',
        image: '/images/Bénin-Martine.webp',
        popular: true
      },
      {
        name: 'Beignets Râpés Vegan',
        description: 'Beignets croustillants à base de légumes râpés, version végétalienne',
        price: '1200 FCFA',
        image: '/images/Beignets+râpés+vegan+i.webp'
      }
    ],
    boissons: [
      {
        name: 'Bissap Traditionnel',
        description: 'Boisson rafraîchissante à l\'hibiscus, préparée selon la tradition',
        price: '500 FCFA',
        image: '/images/jus_de_bissap_78f6b13b83.webp'
      },
      {
        name: 'Jus de Baobab',
        description: 'Jus naturel de baobab non sucré, riche en vitamines et minéraux',
        price: '800 FCFA',
        image: '/images/boissons-jus-de-baobab-non-sucre-pack-de-12-bouteilles-34915926245537_400x.webp',
        popular: true
      },
      {
        name: 'Tchoukoutou',
        description: 'Boisson ancestrale du Bénin à base de mil fermenté, authentique',
        price: '1000 FCFA',
        image: '/images/le-tchoukoutou-boisson-ancestrale-du-benin-768x1024.webp'
      },
    ]
  };

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Notre Menu
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Découvrez notre sélection de plats authentiques, préparés avec des ingrédients 
            frais et des recettes traditionnelles
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="text-xl">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Menu Items */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {menuItems[activeCategory].map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex space-x-2">
                  {item.popular && (
                    <span className="bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Populaire
                    </span>
                  )}
                  {item.spicy && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      🌶️ Épicé
                    </span>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-xl text-gray-900">{item.name}</h3>
                  <span className="text-orange-600 font-bold text-lg">{item.price}</span>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                
                <motion.button
                  onClick={() => handleOrder(item)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Commander
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-warm rounded-2xl p-8 text-white">
            <h3 className="font-playfair text-2xl md:text-3xl font-bold mb-4">
              Envie de découvrir plus ?
            </h3>
            <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
              Consultez notre menu complet ou réservez une table pour vivre 
              une expérience culinaire inoubliable
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full transition-colors duration-200">
                Menu Complet (PDF)
              </button>
              <button
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold py-3 px-8 rounded-full transition-all duration-200"
              >
                Réserver une Table
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      
      <OrderModal 
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        item={selectedItem}
      />
    </section>
  );
};

export default Menu;