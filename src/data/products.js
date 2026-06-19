export const allProducts = [
  {
    id: 'b1',
    title: 'Il Codice del Crepuscolo',
    type: 'Libro Cartaceo',
    category: 'biblioteca',
    description: 'Un\'edizione limitata che esplora le origini dell\'universo sommerso. Rilegatura artigianale e dettagli in foglia d\'oro. Questo tomo rilegato in pelle racconta le verità nascoste dietro i veli della realtà, attraverso illustrazioni e racconti perduti.',
    price: 35.00,
    imageUrl: '/src/assets/shop_book.png',
    lulu_pod_id: '0600X0900BWSTDPB060UW444MXX', // Esempio formato 6x9 B&W Paperback
    cover_url: 'http://www.lulu.com/content/static/tutorial/en/API_cover_example.pdf',
    interior_url: 'http://www.lulu.com/content/static/tutorial/en/API_interior_example.pdf',
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
    lulu_pod_id: '0583X0827BWSTDPB060UW444MXX', // Esempio formato A5
    cover_url: 'http://www.lulu.com/content/static/tutorial/en/API_cover_example.pdf',
    interior_url: 'http://www.lulu.com/content/static/tutorial/en/API_interior_example.pdf',
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
  },
  {
    id: 'p1',
    title: 'Il Volto Cancellato',
    type: 'Stampa Artistica',
    category: 'stampe',
    description: 'Stampa Fine Art in formato A4 (21 x 29,7 cm). Quest\'opera esplora l\'assenza di identità attraverso un\'estetica dark fantasy minimale. I dettagli del tratto a inchiostro si fondono con lo sfondo, creando un\'atmosfera sospesa, onirica e misteriosa.',
    price: 25.00,
    imageUrl: '/src/assets/opera-1.png',
    details: [
      'Formato: A4 (21 x 29,7 cm)',
      'Carta: Fine Art Matte 250g',
      'Cornice non inclusa'
    ]
  },
  {
    id: 'p2',
    title: "Radici dell'Inconscio",
    type: 'Stampa Artistica',
    category: 'stampe',
    description: 'Stampa Fine Art in formato A4 (21 x 29,7 cm). Un intreccio oscuro e profondo che scava nelle paure ataviche dell\'uomo. Le linee incisive esaltano il contrasto netto tra bianco e nero, evocando l\'universo sommerso di INverso.',
    price: 25.00,
    imageUrl: '/src/assets/opera-2.png',
    details: [
      'Formato: A4 (21 x 29,7 cm)',
      'Carta: Fine Art Matte 250g',
      'Cornice non inclusa'
    ]
  },
  {
    id: 'p3',
    title: 'Sguardo nel Vuoto',
    type: 'Stampa Artistica',
    category: 'stampe',
    description: 'Stampa Fine Art in formato A4 (21 x 29,7 cm). Una composizione surrealista dal tratto ruvido e inquieto che cattura l\'essenza dell\'ignoto. Un pezzo d\'arte pensato per collezionisti dell\'occulto e del macabro elegante.',
    price: 25.00,
    imageUrl: '/src/assets/opera-3.png',
    details: [
      'Formato: A4 (21 x 29,7 cm)',
      'Carta: Fine Art Matte 250g',
      'Cornice non inclusa'
    ]
  },
  {
    id: 'p4',
    title: 'Figure nella Nebbia',
    type: 'Stampa Artistica',
    category: 'stampe',
    description: 'Stampa Fine Art in formato A4 (21 x 29,7 cm). Silhouettes inquietanti emergono da un denso e meticoloso tratteggio a china. Un\'aggiunta raffinata per chi ama l\'arte dark e fantastica, dove le ombre raccontano storie dimenticate.',
    price: 25.00,
    imageUrl: '/src/assets/opera-4.png',
    details: [
      'Formato: A4 (21 x 29,7 cm)',
      'Carta: Fine Art Matte 250g',
      'Cornice non inclusa'
    ]
  },
  {
    id: 'p5',
    title: "Architettura dell'Anima",
    type: 'Stampa Artistica',
    category: 'stampe',
    description: 'Stampa Fine Art in formato A4 (21 x 29,7 cm). Strutture impossibili, organiche e geometriche si fondono in un paesaggio mentale oscuro e affascinante. Questa stampa A4 cattura il senso di vertigine e solitudine tipico del mondo di INverso.',
    price: 25.00,
    imageUrl: '/src/assets/opera-5.png',
    details: [
      'Formato: A4 (21 x 29,7 cm)',
      'Carta: Fine Art Matte 250g',
      'Cornice non inclusa'
    ]
  },
  {
    id: 'p6',
    title: "L'Uomo Senza Nome",
    type: 'Stampa Artistica',
    category: 'stampe',
    description: 'Stampa Fine Art in formato A4 (21 x 29,7 cm). L\'enigma della forma umana trasfigurata dall\'inchiostro. Un\'opera dal forte impatto visivo e simbolico, dove l\'oscurità sembra inghiottire la luce lasciando emergere solo i contorni del dubbio.',
    price: 25.00,
    imageUrl: '/src/assets/opera-6.png',
    details: [
      'Formato: A4 (21 x 29,7 cm)',
      'Carta: Fine Art Matte 250g',
      'Cornice non inclusa'
    ]
  },
  {
    id: 'p7',
    title: 'Echi di Inchiostro',
    type: 'Stampa Artistica',
    category: 'stampe',
    description: 'Stampa Fine Art in formato A4 (21 x 29,7 cm). Riverberi oscuri e vibrazioni tratteggiate a mano prendono vita su carta di pregio. Più che una semplice stampa, un portale visivo e tangibile verso le profondità dell\'universo narrativo.',
    price: 25.00,
    imageUrl: '/src/assets/opera-7.png',
    details: [
      'Formato: A4 (21 x 29,7 cm)',
      'Carta: Fine Art Matte 250g',
      'Cornice non inclusa'
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
