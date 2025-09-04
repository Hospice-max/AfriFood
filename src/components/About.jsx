import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const features = [
    {
      icon: '🌍',
      title: 'Authenticité',
      description: 'Recettes traditionnelles transmises de génération en génération'
    },
    {
      icon: '👨‍🍳',
      title: 'Expertise',
      description: 'Chefs expérimentés originaires de différentes régions d\'Afrique'
    },
    {
      icon: '🌿',
      title: 'Ingrédients Frais',
      description: 'Produits de qualité sélectionnés avec soin pour chaque plat'
    },
    {
      icon: '❤️',
      title: 'Passion',
      description: 'Chaque plat est préparé avec amour et dédication'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1577303935007-0d306ee638cf?w=600&q=80"
                alt="Chef préparant un plat africain traditionnel"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">25+</div>
                <div className="text-sm text-gray-600">Années d'expérience</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              >
                Notre Histoire
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-gray-600 text-lg leading-relaxed mb-6"
              >
                Depuis plus de 25 ans, AfriFood vous fait découvrir les saveurs authentiques 
                de l'Afrique. Notre passion pour la cuisine traditionnelle nous pousse à 
                préserver et partager les recettes ancestrales dans un cadre moderne et chaleureux.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-gray-600 text-lg leading-relaxed"
              >
                Chaque plat raconte une histoire, chaque épice évoque un souvenir. 
                Venez vivre une expérience culinaire unique qui vous transportera 
                au cœur de l'Afrique.
              </motion.p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <button
                onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                Découvrir nos Plats
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;