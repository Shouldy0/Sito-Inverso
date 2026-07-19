export const allProducts = [
  // --- ORIGINALI (Pezzi Unici, Opere Originali, Studio Works) ---
  {
    id: 'o1',
    title: "Il Cuore dell'Orologio",
    type: 'Pezzo Unico',
    category: 'originali',
    tier: 'pezzi_unici',
    price: 450.00,
    imageUrl: '/assets/shop_original.webp',
    isUnique: true,
    year: '2025',
    dimensions: '30 x 40 cm',
    technique: 'Inchiostro di china e foglia d\'oro 24k su carta cotone 600g',
    certificate: 'Certificato di autenticità firmato a mano con sigillo in ceralacca',
    microStory: 'Il tempo non scivola via: si accumula come inchiostro sulle pieghe della coscienza. Un ingranaggio d\'oro al centro del petto, a battere il ritmo di ciò che resta taciuto.',
    description: 'Opera originale flagship realizzata a mano. Inchiostro di china ad altissimo contrasto con dettagli stesi in foglia d\'oro zecchino. Spedita in custodia d\'archivio personalizzata con cornice museale in legno scuro.',
    details: [
      'Tecnica: Inchiostro di china e foglia d\'oro 24k',
      'Supporto: Carta cotone Fabriano 600g',
      'Anno: 2025',
      'Certificato: Autenticità firmata + Sigillo Ceralacca',
      'Cornice museale in legno scuro inclusa'
    ]
  },
  {
    id: 'o2',
    title: 'Frammenti di Coscienza',
    type: 'Pezzo Unico',
    category: 'originali',
    tier: 'pezzi_unici',
    price: 380.00,
    imageUrl: '/assets/opera-2.webp',
    isUnique: true,
    year: '2025',
    dimensions: '29,7 x 42 cm (A3)',
    technique: 'Inchiostro di china e grafite pura',
    certificate: 'Certificato di autenticità firmato a mano',
    microStory: 'Cosa rimane quando l\'immagine che diamo al mondo si sgretola? Linee sottili e tratteggi incisivi tracciano il confine tra il volto che mostriamo e l\'abisso che custodiamo all\'interno.',
    description: 'Pezzo unico irripetibile. Un intreccio figurativo e psicologico eseguito con penna di china e punte di grafite. Opera di grande impatto visivo ed emotivo.',
    details: [
      'Tecnica: Inchiostro di china e grafite pura',
      'Supporto: Carta cotone Fabriano 400g',
      'Anno: 2025',
      'Cornice artigianale in legno scuro inclusa'
    ]
  },
  {
    id: 'o3',
    title: 'Il Volto del Baratro',
    type: 'Pezzo Unico',
    category: 'originali',
    tier: 'pezzi_unici',
    price: 420.00,
    imageUrl: '/assets/volto-del-baratro.png',
    isUnique: true,
    year: '2025',
    dimensions: '30 x 40 cm',
    technique: 'Inchiostro di china puro',
    certificate: 'Certificato di autenticità firmato a mano',
    microStory: 'Guardare l\'oscurità finché l\'oscurità non riconosce i tuoi stessi tratti. Nessuna maschera resiste al peso dell\'autenticità.',
    description: 'Opera flagship della collezione inchiostri scuri. Tratteggio fitto e profondo su carta pesante.',
    details: [
      'Tecnica: Inchiostro di china',
      'Supporto: Carta cotone 600g',
      'Anno: 2025',
      'Cornice inclusa'
    ]
  },
  {
    id: 'o4',
    title: "L'Anima Sospesa",
    type: 'Opera Originale',
    category: 'originali',
    tier: 'opere_originali',
    price: 290.00,
    imageUrl: '/assets/opera-4.webp',
    isUnique: true,
    year: '2024',
    dimensions: '24 x 32 cm',
    technique: 'China e toni di pastello secco',
    certificate: 'Certificato di autenticità incluso',
    microStory: 'Un respiro trattenuto tra due sponde. L\'ombra non soffoca la luce, la protegge e ne definisce il perimetro prima che sfumi nel silenzio.',
    description: 'Opera originale ritrattistica con sfumature scure e tocchi di matita morbida.',
    details: [
      'Tecnica: China e pastelli secchi',
      'Supporto: Carta artistica 300g',
      'Anno: 2024',
      'Certificato firmato'
    ]
  },
  {
    id: 'o5',
    title: 'Guardiano degli Anni',
    type: 'Opera Originale',
    category: 'originali',
    tier: 'opere_originali',
    price: 310.00,
    imageUrl: '/assets/guardiano-degli-anni.png',
    isUnique: true,
    year: '2024',
    dimensions: '29,7 x 42 cm',
    technique: 'Matita morbida e china',
    certificate: 'Certificato di autenticità incluso',
    microStory: 'Le rughe del tempo disegnate con tratto paziente. Chi custodisce la memoria sa che ogni cicatrice è una mappa che riconduce a casa.',
    description: 'Ritratto simbolico intenso su supporto cotone grezzo.',
    details: [
      'Tecnica: Matita e china',
      'Supporto: Carta cotone',
      'Anno: 2024'
    ]
  },
  {
    id: 'o6',
    title: 'Studio di Volto e Ombra',
    type: 'Studio Works',
    category: 'originali',
    tier: 'studio_works',
    price: 140.00,
    imageUrl: '/assets/opera-1.webp',
    isUnique: true,
    year: '2025',
    dimensions: '21 x 29,7 cm (A4)',
    technique: 'Bozzetto originale a china e carboncino',
    certificate: 'Firma dell\'artista sul fronte',
    microStory: 'L\'inizio di una visione, la prima impronta del pensiero sulla pagina bianca prima che prenda la sua forma definitiva.',
    description: 'Opera originale della serie Studio Works: bozzetti preparatori e studi dal tratto istintivo e diretto.',
    details: [
      'Tecnica: China e carboncino',
      'Supporto: Carta schizzi 200g',
      'Anno: 2025'
    ]
  },
  {
    id: 'o7',
    title: 'Terre di Confine',
    type: 'Studio Works',
    category: 'originali',
    tier: 'studio_works',
    price: 160.00,
    imageUrl: '/assets/orco-terre-confine.png',
    isUnique: true,
    year: '2025',
    dimensions: '21 x 29,7 cm (A4)',
    technique: 'China e matita grafite',
    certificate: 'Firma dell\'artista sul fronte',
    microStory: 'Paesaggi interiori e creatura di soglia dove la linea non separa, ma unisce due mondi apparentemente distanti.',
    description: 'Studio preparatorio figurativo dark fantasy.',
    details: [
      'Tecnica: China e grafite',
      'Supporto: Carta 220g',
      'Anno: 2025'
    ]
  },

  // --- UNIVERSO (Stampe Fine Art, Fan Art per Fandom, Albi & Volumi) ---
  {
    id: 'u1',
    title: 'Gaara — La Solitudine della Sabbia',
    type: 'Stampa Fan Art',
    category: 'universo',
    fandom: 'naruto',
    price: 22.00,
    imageUrl: '/assets/gaara-fanart.png',
    dimensions: 'A4 (21 x 29,7 cm)',
    technique: 'Pastello e tecnica mista digitale',
    microStory: 'Il peso di un amore che ferisce e protegge. Nel tratto a colore emerge il contrasto tra l\'isolamento coatto e il bisogno primordiale di appartenenza.',
    description: 'Stampa Fine Art alta definizione su carta pastello pregio. Interpretazione d\'autore del personaggio di Naruto.',
    details: [
      'Fandom: Naruto',
      'Formato: A4 (21 x 29,7 cm)',
      'Carta: Fine Art Velvet 270g',
      'Tiratura aperta timbrata sul retro'
    ]
  },
  {
    id: 'u2',
    title: 'Goku — La Scintilla del Combattente',
    type: 'Stampa Fan Art',
    category: 'universo',
    fandom: 'dragon_ball',
    price: 22.00,
    imageUrl: '/assets/goku-sketch.png',
    dimensions: 'A4 (21 x 29,7 cm)',
    technique: 'Matita e sfumature a pastello',
    microStory: 'L\'energia concentrata nello sguardo prima dello scontro. Un omaggio all\'istinto puro e alla forza incrollabile della determinazione.',
    description: 'Stampa d\'arte tratta dal disegno originale a pastello dedicato all\'universo Dragon Ball.',
    details: [
      'Fandom: Dragon Ball',
      'Formato: A4 (21 x 29,7 cm)',
      'Carta: Fine Art Smooth 250g'
    ]
  },
  {
    id: 'u3',
    title: 'Naruto — Lo Spirito della Volpe',
    type: 'Stampa Fan Art',
    category: 'universo',
    fandom: 'naruto',
    price: 22.00,
    imageUrl: '/assets/naruto-sketch.png',
    dimensions: 'A4 (21 x 29,7 cm)',
    technique: 'Pastelli e inchiostro',
    microStory: 'La dualità tra il demone interiore e la volontà di riscatto. Quando la propria ferita diventa la sorgente del proprio potere.',
    description: 'Stampa d\'arte a colori vibranti su carta d\'archivio.',
    details: [
      'Fandom: Naruto',
      'Formato: A4 (21 x 29,7 cm)',
      'Carta: Fine Art Matte 250g'
    ]
  },
  {
    id: 'u4',
    title: 'Il Pettirosso dell\'Inverno',
    type: 'Stampa Artistica',
    category: 'universo',
    fandom: 'original_art',
    price: 20.00,
    imageUrl: '/assets/pettirosso-inverno.png',
    dimensions: 'A4 (21 x 29,7 cm)',
    technique: 'Pastelli morbidi su carta colorata',
    microStory: 'Una piuma rossa nel gelo. Anche nei periodi più freddi dell\'anima esiste un segno che ricorda che la vita continua a palpitare.',
    description: 'Stampa Fine Art a toni caldi dell\'opera originale a pastello.',
    details: [
      'Categoria: Arte Originale',
      'Formato: A4 (21 x 29,7 cm)',
      'Carta: Fine Art Textured 270g'
    ]
  },
  {
    id: 'u5',
    title: 'Grifone Ribelle',
    type: 'Stampa Artistica',
    category: 'universo',
    fandom: 'original_art',
    price: 25.00,
    imageUrl: '/assets/grifone-ribelle.png',
    dimensions: 'A3 (29,7 x 42 cm)',
    technique: 'Tecnica mista e inchiostro',
    microStory: 'Maestosità e fierezza. La creatura mitologica diventa allegoria di chi non accetta di essere addomesticato dal mondo.',
    description: 'Stampa di grande formato A3 su carta ad alto spessore.',
    details: [
      'Formato: A3 (29,7 x 42 cm)',
      'Carta: Fine Art Cotton 300g'
    ]
  },
  {
    id: 'u6',
    title: 'Elfo delle Silenziosità',
    type: 'Stampa Fan Art',
    category: 'universo',
    fandom: 'original_art',
    price: 20.00,
    imageUrl: '/assets/fantasy-elfo-druido.png',
    dimensions: 'A4 (21 x 29,7 cm)',
    technique: 'Pastelli e matita',
    microStory: 'Ascoltare la voce delle radici. La figura elfica immersa nella natura silente come simbolo di connessione primordiale.',
    description: 'Stampa fine art da opera fantasy a pastelli.',
    details: [
      'Formato: A4 (21 x 29,7 cm)',
      'Carta: Fine Art Matte 250g'
    ]
  },

  // --- BIBLIOTECA / VOLUMI & ALBI ---
  {
    id: 'b1',
    title: "Nei tuoi occhi dietro l'ombra oltre il buio",
    type: 'Fumetto Cartaceo',
    category: 'biblioteca',
    price: 15.00,
    imageUrl: '/assets/nei_tuoi_occhi.webp',
    lulu_printable_id: '65kr4dw',
    microStory: 'Vi porto un progettino nato dalla voglia di tirar fuori ciò che risiede nel profondo. Non racconta una storia lineare, ma raccoglie pensieri e frammenti di coscienza connessi tra loro.',
    description: 'Libretto intimo illustrato con pensieri, riflessioni e tavole a inchiostro di china.',
    details: [
      'Pagine: 21',
      'Formato: Comic Book (168 x 260 mm)',
      'Rilegatura: Spillato (Saddle Stitch)',
      'Carta: 70# Bianca Patinata',
      'Copertina: Opaca (Matte)'
    ]
  },
  {
    id: 'b2',
    title: "Sfiorare il Buio",
    type: 'Fumetto Cartaceo',
    category: 'biblioteca',
    price: 18.00,
    imageUrl: '/assets/sfiorare_il_buio.webp',
    lulu_printable_id: 'gjz885k',
    microStory: 'Un viaggio sussurrato e notturno attraverso 31 pagine di disegni a china e riflessioni intime. Scava nell\'inconscio e accarezza le sfumature della solitudine.',
    description: 'Albo illustrato autoprodotto ad alto impatto narrativo ed estetico.',
    details: [
      'Pagine: 31',
      'Formato: Comic Book (168 x 260 mm)',
      'Rilegatura: Spillato',
      'Carta: 70# Bianca Patinata',
      'Copertina: Opaca (Matte)'
    ]
  },
  {
    id: 'b3',
    title: "Noi siamo persona — I Fili dell'Io",
    type: 'Fumetto Cartaceo (Preordine)',
    category: 'biblioteca',
    price: 18.00,
    imageUrl: '/assets/noi_siamo_persona.jpg',
    isPreorder: true,
    releaseDate: '15 Settembre 2026',
    lulu_printable_id: '2mnjnrd',
    microStory: '“Cosa succede alla tua mente quando vive un trauma troppo grande? Si frammenta. Per sopravvivere ci dividiamo.” Una mappa visiva e poetica all\'interno della dissociazione.',
    description: 'Opera a fumetti intensa sul coraggio di ricucire le proprie crepe interiori.',
    details: [
      'Pagine: 36',
      'Formato: Comic Book (168 x 260 mm)',
      'Rilegatura: Spillato',
      'Carta: 70# Bianca Patinata',
      'Copertina: Opaca (Matte)'
    ]
  }
];

export const getProductsByCategory = (category) => {
  return allProducts.filter(p => p.category === category);
};

export const getOriginaliByTier = (tier) => {
  if (!tier || tier === 'all') return allProducts.filter(p => p.category === 'originali');
  return allProducts.filter(p => p.category === 'originali' && p.tier === tier);
};

export const getUniversoByFandom = (fandom) => {
  if (!fandom || fandom === 'all') return allProducts.filter(p => p.category === 'universo');
  return allProducts.filter(p => p.category === 'universo' && p.fandom === fandom);
};

export const getFeaturedProducts = () => {
  return allProducts.filter(p => ['o1', 'o2', 'u1', 'u4'].includes(p.id));
};

export const getProductById = (id) => {
  return allProducts.find(p => p.id === id);
};
