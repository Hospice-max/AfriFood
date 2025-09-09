import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const galleryImages = [
    {
      id: 1,
      src: '/images/pate-rouge-plat-traditionnel-du-benin-e1686128990385.webp',
      alt: 'Pâte Rouge - Plat traditionnel du Bénin',
      category: 'plats'
    },
    {
      id: 2,
      src: '/images/Brochettes-de-mouton-marine-a-la-cacahuete.webp',
      alt: 'Brochettes de mouton marinées à la cacahuète',
      category: 'desserts'
    },
    {
      id: 3,
      src: '/images/Bénin-Martine.webp',
      alt: 'Spécialité Martine - Plat signature',
      category: 'desserts'
    },
    {
      id: 4,
      src: '/images/Beignets+râpés+vegan+i.webp',
      alt: 'Beignets râpés vegan - Dessert végétalien',
      category: 'desserts'
    },
    {
      id: 5,
      src: '/images/jus_de_bissap_78f6b13b83.webp',
      alt: 'Bissap traditionnel - Boisson à l\'hibiscus',
      category: 'boissons'
    },
    {
      id: 6,
      src: '/images/le-tchoukoutou-boisson-ancestrale-du-benin-768x1024.webp',
      alt: 'Tchoukoutou - Boisson ancestrale du Bénin',
      category: 'boissons'
    },
    {
      id: 7,
      src: '/images/boissons-jus-de-baobab-non-sucre-pack-de-12-bouteilles-34915926245537_400x.webp',
      alt: 'Jus de baobab naturel non sucré',
      category: 'boissons'
    },
    {
      id: 8,
      src: '/images/image-24.webp',
      alt: 'Dessert signature aux saveurs tropicales',
      category: 'desserts'
    },
    {
      id: 9,
      src: '/images/Aloko.webp',
      alt: 'Aloko - Bananes plantains frites',
      category: 'entrees'
    },
    {
      id: 10,
      src: '/images/plat-vegetarien-beninois.webp',
      alt: 'Plat végétarien béninois aux légumes locaux',
      category: 'entrees'
    },
    {
      id: 11,
      src: '/images/vandzou-repas-du-benin-984x1024.webp',
      alt: 'Vandzou - Plat de resistance traditionnel béninois',
      category: 'desserts'
    },
    {
      id: 12,
      src: '/images/Trente_recettes_preparer_avance_entree_plat_dessert.jpg',
      alt: 'Crème à la fraise - Dessert spécialité saveur béninois',
      category: 'desserts'
    },
  ];

  return (
    <section id="galerie" className="py-20 bg-gray-50">
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
            Galerie Photos
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Découvrez l'ambiance chaleureuse de notre restaurant et la beauté 
            de nos plats traditionnels africains
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg"
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium">{image.alt}</p>
                </div>
              </div>
              
              {/* Zoom Icon */}
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-3 rounded-full">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
            </div>
            <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-4">
              Suivez-nous sur Instagram
            </h3>
            <p className="text-gray-600 mb-6">
              Découvrez nos dernières créations culinaires et l'ambiance de notre restaurant
            </p>
            <button className="btn-primary" onClick={() => window.open('https://www.instagram.com/', '_blank')}>
              @afrifood_restaurant
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modal pour l'image agrandie */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-full object-contain rounded-lg"
              />
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <p className="text-white font-medium">{selectedImage.alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;