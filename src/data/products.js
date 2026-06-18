export const allProducts = [
  {
    id: 'b1',
    title: 'Il Codice del Crepuscolo',
    type: 'Libro Cartaceo',
    category: 'biblioteca',
    description: 'Un\'edizione limitata che esplora le origini dell\'universo sommerso. Rilegatura artigianale e dettagli in foglia d\'oro. Questo tomo rilegato in pelle racconta le verità nascoste dietro i veli della realtà, attraverso illustrazioni e racconti perduti.',
    price: 35.00,
    imageUrl: '/src/assets/shop_book.png',
    details: [
      'Pagine: 320',
      'Carta: Avorio 120g',
      'Copertina rigida con impressioni a caldo'
    ]
  },
  {
    id: 'b2',
    title: 'Sussurri dalla Cenere',
    type: 'Libro Cartaceo',
    category: 'biblioteca',
    description: 'Una raccolta di frammenti narrativi, pensieri e cronache di un mondo in rovina. La carta profuma ancora di fuoco antico.',
    price: 28.00,
    imageUrl: '/src/assets/shop_book.png',
    details: [
      'Pagine: 150',
      'Carta: Riciclata 100g',
      'Brossura cucita a filo refe'
    ]
  },
  {
    id: 'p1',
    title: 'Soglia dell\'Abisso',
    type: 'Stampa Artistica',
    category: 'galleria',
    description: 'Il portale che divide i mondi. Stampa su carta fine-art da 300g, per catturare i neri più profondi e l\'oro più brillante.',
    price: 45.00,
    imageUrl: '/src/assets/shop_print.png',
    details: [
      'Formato: 50x70 cm',
      'Carta: Hahnemühle Photo Rag 308g',
      'Edizione limitata: 100 copie, numerate e firmate'
    ]
  },
  {
    id: 'p2',
    title: 'Guardiani del Velo',
    type: 'Stampa Artistica',
    category: 'galleria',
    description: 'Coloro che sorvegliano il passaggio. Un frammento visivo dell\'universo INverso. Dettagli incisi con inchiostro denso.',
    price: 40.00,
    imageUrl: '/src/assets/shop_print.png',
    details: [
      'Formato: 40x50 cm',
      'Carta: Cotone Fine Art',
      'Fornita senza cornice'
    ]
  },
  {
    id: 'p3',
    title: 'Eclissi di Cenere',
    type: 'Stampa Artistica',
    category: 'galleria',
    description: 'Il momento in cui la luce svanisce. Opera che rappresenta l\'evento catastrofico del mondo sommerso, dominato da toni grigi e neri.',
    price: 50.00,
    imageUrl: '/src/assets/shop_print.png',
    details: [
      'Formato: 60x80 cm',
      'Finitura opaca anti-riflesso'
    ]
  },
  {
    id: 'o1',
    title: 'Il Cuore dell\'Orologio',
    type: 'Opera Originale',
    category: 'originali',
    description: 'Pezzo unico irripetibile. Disegno a inchiostro e foglia d\'oro su carta cotone 100%. Viene spedito con certificato di autenticità firmato a mano e sigillo in ceralacca.',
    price: 350.00,
    imageUrl: '/src/assets/shop_original.png',
    isUnique: true,
    details: [
      'Tecnica: Inchiostro di china e foglia d\'oro 24k',
      'Supporto: Carta cotone Fabriano 600g',
      'Cornice museale in rovere inclusa'
    ]
  }
];

export const getProductsByCategory = (category) => {
  return allProducts.filter(p => p.category === category);
};

export const getFeaturedProducts = () => {
  return allProducts.filter(p => ['b1', 'p1', 'o1', 'b2'].includes(p.id));
};

export const getProductById = (id) => {
  return allProducts.find(p => p.id === id);
};
