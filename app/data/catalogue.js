import { chemin } from '@/app/lib/chemin';

// ---------------------------------------------------------------------------
// Catalogue Aye Aye Madagascar
//
// C'EST LE SEUL FICHIER A MODIFIER pour faire vivre la boutique : ajouter un
// produit, changer une photo ou une categorie se fait ici, et tout le
// site suit (accueil, pages categories, fiches produit, recherche, panier).
//
// ---------------------------------------------------------------------------

export const CATEGORIES = [
  {
    slug: 'homme',
    nom: 'Homme',
    accroche: 'Manches longues et pièces signature pour homme.',
    image: chemin('/assets/images/Homme/DSC_1808.jpg'),
  },
  {
    slug: 'femme',
    nom: 'Femme',
    accroche: 'Des pièces qui portent la fierté malagasy.',
    image: chemin('/assets/images/Femme/Femme_7.jpeg'), // Tarondro, de face
  },
  {
    slug: 'enfant',
    nom: 'Enfant',
    accroche: 'La culture malagasy dès le plus jeune âge.',
    image: chemin('/assets/images/Enfant/Enfant_3.jpeg'),
  },

];

export const PRODUITS = [
  // --- Homme : les deux modeles photographies -------------------------------
  {
    slug: 'manches-longues-aye-aye-rouge',
    nom: 'Manches longues Aye-Aye',
    couleur: 'Rouge',
    categorie: 'homme',
    modele: 'manches-longues',
    collection: 'aye-aye-madagascar',
    image: chemin('/assets/images/Homme/DSC_1808.jpg'),
    galerie: [
      chemin('/assets/images/Homme/DSC_1808.jpg'),
      chemin('/assets/images/Homme/DSC_1804.jpg'),
      chemin('/assets/images/Homme/DSC_1805.jpg'),
      chemin('/assets/images/Homme/DSC_1807.jpg'),
      chemin('/assets/images/Homme/DSC_1806.jpg'),
      chemin('/assets/images/Homme/DSC_1809.jpg'),
    ],
    description:
      "T-shirt manches longues en coton 100 %, rouge profond. L'aye-aye, "
      + 'notre lémurien emblème, est imprimé dans le dos ; « Madagascar » '
      + 'descend le long de la manche. Coupe droite, col rond.',
  },
  {
    slug: 'manches-longues-antsatsaka-ecru',
    nom: 'Manches longues Antsatsaka',
    couleur: 'Écru',
    categorie: 'homme',
    modele: 'manches-longues',
    collection: 'antsatsaka',
    image: chemin('/assets/images/Homme/DSC_1795.jpg'),
    galerie: [
      chemin('/assets/images/Homme/DSC_1795.jpg'),
      chemin('/assets/images/Homme/DSC_1794.jpg'),
      chemin('/assets/images/Homme/DSC_1793.jpg'),
    ],
    description:
      'T-shirt manches longues en coton 100 %, écru. Le gecko Antsatsaka '
      + 'est imprimé dans le dos sur les couleurs du drapeau malagasy, '
      + 'avec la signature Aye Aye sur la manche.',
  },
  {
    slug: 'tee-shirt-lemurs-of-madagascar',
    nom: 'Tee-shirt Lemurs of Madagascar',
    couleur: 'Beige',
    categorie: 'homme',
    modele: 'tee-shirt',
    collection: 'lemurs-of-madagascar',
    image: chemin('/assets/images/Homme/Homme_1.jpeg'),
    galerie: [chemin('/assets/images/Homme/Homme_1.jpeg')],
    description: 'Tee-shirt en coton 100 %, beige. Les lémuriens de Madagascar et '
      + '« Lemurs of Madagascar » sont imprimés dans le dos.',
  },
  {
    slug: 'tee-shirt-baobab',
    nom: 'Tee-shirt Baobab',
    couleur: 'Rose',
    categorie: 'homme',
    modele: 'tee-shirt',
    collection: 'baobab',
    image: chemin('/assets/images/Homme/Homme_4.jpeg'),
    galerie: [chemin('/assets/images/Homme/Homme_4.jpeg')],
    description: 'Tee-shirt en coton 100 %, rose. Le baobab et « Baobab » sont imprimés dans le dos ; '
      + 'petit logo Aye-Aye sur la poitrine.',
  },
  {
    slug: 'debardeur-antsatsaka',
    nom: 'Débardeur Antsatsaka',
    couleur: 'Rouge',
    categorie: 'homme',
    modele: 'debardeur',
    collection: 'antsatsaka',
    image: chemin('/assets/images/Homme/DSC_1798.jpg'),
    galerie: [chemin('/assets/images/Homme/DSC_1798.jpg')],
    description: 'Débardeur en coton 100 %, rouge. Le gecko Antsatsaka est imprimé dans le dos '
      + 'sur les couleurs du drapeau malagasy.',
  },
  {
    slug: 'debardeur-djembe',
    nom: 'Débardeur Djembe',
    couleur: 'Blanc',
    categorie: 'homme',
    modele: 'debardeur',
    collection: 'madagascar-roots-djembe',
    image: chemin('/assets/images/Homme/DSC_1802.jpg'),
    galerie: [chemin('/assets/images/Homme/DSC_1802.jpg')],
    description: 'Débardeur en coton 100 %, blanc. Trois danseuses et l’inscription '
      + '« Madagascar Roots Djembe » sont imprimées dans le dos.',
  },
  {
    slug: 'debardeur-lemurs-of-madagascar',
    nom: 'Débardeur Lemurs of Madagascar',
    couleur: 'Rouge',
    categorie: 'homme',
    modele: 'debardeur',
    collection: 'lemurs-of-madagascar',
    image: chemin('/assets/images/Homme/Homme_3.jpeg'),
    galerie: [chemin('/assets/images/Homme/Homme_3.jpeg')],
    description: 'Débardeur en coton 100 %, rouge. Les lémuriens de Madagascar et '
      + '« Lemurs of Madagascar » sont imprimés dans le dos.',
  },

  // --- Femme : les modeles photographies -----------------------------------
  {
    slug: 'tee-shirt-tarondro-beige',
    nom: 'Tee-shirt Tarondro',
    couleur: 'Beige',
    categorie: 'femme',
    modele: 'tee-shirt',
    collection: 'tarondro',
    image: chemin('/assets/images/Femme/Femme_1.jpeg'),
    galerie: [chemin('/assets/images/Femme/Femme_1.jpeg')],
    description:
      'Tee-shirt en coton 100 %, beige. Tarondro, le caméléon de Madagascar, '
      + 'est imprimé dans le dos avec « Madagascar » ; étiquette Aye-Aye au col.',
  },

  {
    slug: 'tee-shirt-dauphins-rouge',
    nom: 'Tee-shirt Dauphins',
    couleur: 'Rouge',
    categorie: 'femme',
    modele: 'tee-shirt',
    collection: 'dauphins',
    image: chemin('/assets/images/Femme/Femme_4.jpeg'),
    galerie: [
      chemin('/assets/images/Femme/Femme_4.jpeg'),
      chemin('/assets/images/Femme/Femme_2.jpeg'),
      chemin('/assets/images/Femme/Femme_3.jpeg'),
    ],
    description:
      'Tee-shirt en coton 100 %, rouge. Des dauphins jaillissant des vagues sont '
      + 'imprimés dans le dos ; petit logo Aye-Aye sur la poitrine.',
  },
  {
    slug: 'tee-shirt-djembe-noir',
    nom: 'Tee-shirt Djembe',
    couleur: 'Noir',
    categorie: 'femme',
    modele: 'tee-shirt',
    collection: 'madagascar-roots-djembe',
    image: chemin('/assets/images/Femme/Femme_6.jpeg'),
    galerie: [
      chemin('/assets/images/Femme/Femme_6.jpeg'),
      chemin('/assets/images/Femme/Femme_5.jpeg'),
    ],
    description:
      'Tee-shirt en coton 100 %, noir. Trois danseuses et l’inscription '
      + '« Madagascar Roots Djembe » sont imprimées dans le dos ; petit logo '
      + 'Aye-Aye sur la poitrine.',
  },
  {
    slug: 'tee-shirt-aye-aye-madagascar',
    nom: 'Tee-shirt Aye-Aye Madagascar',
    couleur: 'Beige',
    categorie: 'femme',
    modele: 'tee-shirt',
    collection: 'aye-aye-madagascar',
    image: chemin('/assets/images/Femme/DSC_1842.jpg'),
    galerie: [chemin('/assets/images/Femme/DSC_1842.jpg')],
    description: "Tee-shirt en coton 100 %, beige. L'aye-aye, notre lémurien emblème, est "
      + 'imprimé dans le dos ; étiquette Aye-Aye au col.',
  },
  {
    slug: 'tee-shirt-madagascar',
    nom: 'Tee-shirt Madagascar',
    couleur: 'Noir',
    categorie: 'femme',
    modele: 'tee-shirt',
    collection: 'madagascar',
    image: chemin('/assets/images/Femme/DSC_1836.jpg'),
    galerie: [chemin('/assets/images/Femme/DSC_1836.jpg')],
    description: 'Tee-shirt en coton 100 %, noir. « Madagascar » et des symboles de l’île '
      + 'descendent le long du dos ; étiquette Aye-Aye au col.',
  },

  // --- Enfant : les modeles photographies ----------------------------------
  {
    slug: 'tee-shirt-tortue-moutarde',
    nom: 'Tee-shirt Tortue',
    couleur: 'Moutarde',
    categorie: 'enfant',
    modele: 'tee-shirt',
    collection: 'tortue',
    image: chemin('/assets/images/Enfant/Enfant_3.jpeg'),
    galerie: [chemin('/assets/images/Enfant/Enfant_3.jpeg')],
    description:
      'Tee-shirt enfant en coton 100 %, moutarde. La tortue de mer est imprimée '
      + 'dans le dos avec « Tortue Madagascar » ; étiquette Aye-Aye sur la manche.',
  },

  {
    slug: 'tee-shirt-lakana-enfant-bordeaux',
    nom: 'Tee-shirt Lakana',
    couleur: 'Bordeaux',
    categorie: 'enfant',
    modele: 'tee-shirt',
    collection: 'lakana',
    image: chemin('/assets/images/Enfant/Enfant_1.jpeg'),
    galerie: [chemin('/assets/images/Enfant/Enfant_1.jpeg')],
    description:
      'Tee-shirt enfant en coton 100 %, bordeaux. Une pirogue à voile sous le '
      + 'soleil couchant et « Lakana » sont imprimés dans le dos ; étiquette '
      + 'Aye-Aye au col.',
  },
  {
    slug: 'tee-shirt-tarondro-enfant-beige',
    nom: 'Tee-shirt Tarondro',
    couleur: 'Beige',
    categorie: 'enfant',
    modele: 'tee-shirt',
    collection: 'tarondro',
    image: chemin('/assets/images/Enfant/Enfant_2.jpeg'),
    galerie: [chemin('/assets/images/Enfant/Enfant_2.jpeg')],
    description:
      'Tee-shirt enfant en coton 100 %, beige. Tarondro, le caméléon de '
      + 'Madagascar, est imprimé dans le dos ; étiquette Aye-Aye au col.',
  },
  {
    slug: 'tee-shirt-djembe-enfant-blanc',
    nom: 'Tee-shirt Djembe',
    couleur: 'Blanc',
    categorie: 'enfant',
    modele: 'tee-shirt',
    collection: 'madagascar-roots-djembe',
    image: chemin('/assets/images/Enfant/Enfant_4.jpeg'),
    galerie: [chemin('/assets/images/Enfant/Enfant_4.jpeg')],
    description:
      'Tee-shirt enfant en coton 100 %, blanc. Trois danseuses et l’inscription '
      + '« Madagascar Roots Djembe » sont imprimées dans le dos ; étiquette '
      + 'Aye-Aye au col.',
  },
];

// --- Modeles et collections -------------------------------------------------
// Textes fournis par la marque (structure du site).
//
// Un MODELE est une coupe, proposee pour hommes, femmes et enfants.
// Une COLLECTION est un dessin au dos, disponible sur tous les modeles.
// `image` (facultatif) : photo originale (dossiers Homme / Femme / Enfant),
// affichee via imageCarte() dans le cadre 3:4 des cartes. Sans photo, la carte
// d'une collection affiche son numero, celle d'un modele sa silhouette.

export const MODELES = [
  {
    slug: 'tee-shirt',
    nom: 'Tee-shirt',
    image: chemin('/assets/images/Femme/Femme_2.jpeg'),
    texte: 'Le classique indispensable. Coton doux et respirant, idéal au quotidien.',
  },
  {
    slug: 'manches-longues',
    nom: 'Manches longues',
    image: chemin('/assets/images/Homme/Homme_2.jpeg'), // ecru, vue de face
    texte: "Pour les soirées fraîches et les hauts plateaux. Confort et style toute l'année.",
  },
  {
    slug: 'debardeur',
    nom: 'Débardeur',
    image: chemin('/assets/images/Clients/Client_4.jpeg'), // debardeur rouge, de face (photo client)
    texte: 'Léger et pratique, parfait pour la chaleur de la côte et les journées actives.',
  },
];

export const COLLECTIONS = [
  {
    slug: 'antsatsaka',
    nom: 'Antsatsaka',
    texte: 'Un hommage au nord de la Grande Île, terre de cacao, de vanille et de traditions. '
      + 'Une collection pour ceux qui portent leurs racines avec fierté.',
    image: chemin('/assets/images/Homme/DSC_1795.jpg'),
  },
  {
    slug: 'aye-aye-madagascar',
    nom: 'Aye Aye Madagascar',
    texte: "Notre collection emblème. L'aye-aye, animal unique au monde, est le symbole de notre marque.",
    image: chemin('/assets/images/Homme/DSC_1807.jpg'),
  },
  {
    slug: 'madagascar',
    nom: 'Madagascar',
    texte: 'Simple et fort. Le nom de notre île, à porter fièrement partout dans le monde.',
  },
  {
    slug: 'lemurs-of-madagascar',
    nom: 'Lemurs of Madagascar',
    image: chemin('/assets/images/Homme/Homme_1.jpeg'),
    texte: "Un hommage aux lémuriens, trésors vivants que l'on ne trouve nulle part ailleurs.",
  },
  {
    slug: 'madagascar-roots-djembe',
    nom: 'Madagascar Roots Djembe',
    image: chemin('/assets/images/Enfant/Enfant_4.jpeg'),
    texte: 'Le rythme de nos racines. La musique et le tambour comme lien entre les générations.',
  },
  {
    slug: 'dauphins',
    nom: 'Dauphins',
    image: chemin('/assets/images/Femme/Femme_4.jpeg'),
    texte: 'La beauté de nos océans et la liberté des eaux qui entourent la Grande Île.',
  },
  {
    slug: 'tortue',
    nom: 'Tortue',
    image: chemin('/assets/images/Enfant/Enfant_3.jpeg'),
    texte: 'La sagesse et la patience. Un symbole de la richesse marine malagasy à protéger.',
  },
  {
    slug: 'tarondro',
    nom: 'Tarondro',
    image: chemin('/assets/images/Femme/Femme_1.jpeg'),
    texte: 'Le caméléon de Madagascar, maître des couleurs et symbole de patience. '
      + 'Un animal respecté et parfois sacré dans nos traditions.',
  },
  {
    slug: 'lakana',
    nom: 'Lakana',
    image: chemin('/assets/images/Enfant/Enfant_1.jpeg'),
    texte: "La pirogue traditionnelle, symbole du savoir-faire des pêcheurs et du lien entre l'homme et la mer.",
  },
  {
    // texte provisoire, a remplacer par celui de la marque
    slug: 'baobab',
    nom: 'Baobab',
    texte: "L'arbre majestueux de nos paysages, symbole de force et de longévité. "
      + 'Des racines profondes, comme notre fierté malagasy.',
  },
];

// --- Tailles ----------------------------------------------------------------
// Proposees par categorie ; un produit peut definir sa propre liste avec un
// champ `tailles`. Liste vide = pas de choix de taille.
// A CONFIRMER avec la marque : ce sont des valeurs de depart.
export const TAILLES_PAR_CATEGORIE = {
  homme: ['S', 'M', 'L', 'XL', 'XXL'],
  femme: ['S', 'M', 'L', 'XL', 'XXL'],
  enfant: ['2 ans', '4 ans', '6 ans', '8 ans', '10 ans', '12 ans'],
};

export function taillesDuProduit(produit) {
  return produit.tailles || TAILLES_PAR_CATEGORIE[produit.categorie] || [];
}

// --- Aides ------------------------------------------------------------------

export function categorieParSlug(slug) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function produitParSlug(slug) {
  return PRODUITS.find((p) => p.slug === slug);
}

export function produitsParCategorie(slug) {
  return PRODUITS.filter((p) => p.categorie === slug);
}

// Vignettes affichees dans un carrousel.
// Quand une categorie compte peu de references (c'est le cas de Homme, avec
// deux modeles photographies sous plusieurs angles), on deroule les galeries
// pour que le carrousel montre toutes les photos plutot que deux cartes.
export function vignettes(categorieSlug) {
  const produits = produitsParCategorie(categorieSlug);
  if (produits.length >= 4) {
    return produits.map((p) => ({ produit: p, image: p.image }));
  }
  return produits.flatMap((p) => p.galerie.map((image) => ({ produit: p, image })));
}

// Photos de la marque (dossiers Homme, Femme, Enfant, Clients, Groupe) et dimensions de leurs
// originaux. Les DSC_xxxx.jpg font toutes 899x1600 ; les autres sont listees
// ici. AJOUTER une ligne pour toute nouvelle photo utilisee dans le site.
const DIMENSIONS_PHOTOS = {
  'Femme_1.jpeg': [720, 1280],
  'Femme_2.jpeg': [851, 1280],
  'Femme_3.jpeg': [851, 1280],
  'Femme_4.jpeg': [851, 1280],
  'Femme_5.jpeg': [1064, 1600],
  'Femme_6.jpeg': [1064, 1600],
  'Femme_7.jpeg': [899, 1600],
  'Enfant_1.jpeg': [960, 1280],
  'Enfant_2.jpeg': [960, 1280],
  'Enfant_3.jpeg': [1049, 1280],
  'Enfant_4.jpeg': [960, 1280],
  'Homme_1.jpeg': [720, 1280],
  'Homme_2.jpeg': [899, 1600],
  'Homme_3.jpeg': [1067, 1600],
  'Homme_4.jpeg': [1086, 1448],
  // photos de clients (accueil, « Rejoignez la communaute »)
  'Client_1.jpeg': [1091, 1442],
  'Client_2.jpeg': [1086, 1448],
  'Client_3.jpeg': [1536, 2048],
  'Client_4.jpeg': [1366, 2048],
  // photo de groupe (accueil, « Decouvrez Aye-Aye Madagascar »)
  'Groupe_1.jpeg': [1600, 899],
};

function photoMarque(source) {
  const morceaux = source.match(/(\/assets\/images\/(?:Homme|Femme|Enfant|Clients|Groupe)\/)([^/]+)$/);
  if (!morceaux) return null;
  const [, dossier, nom] = morceaux;
  const dimensions = /^DSC_\d+\.jpg$/.test(nom) ? [899, 1600] : DIMENSIONS_PHOTOS[nom];
  return dimensions ? { dossier, nom, dimensions } : null;
}

// Versions reduites (scripts/photos-reduites.mjs) : <dossier>/reduites/
// 160|480|720/, pour les largeurs inferieures a celle de l'original. Les
// autres images (exemples du template) n'ont qu'une taille.
export function photoReduite(source, largeur) {
  const photo = photoMarque(source);
  if (!photo || largeur >= photo.dimensions[0]) return source;
  return source.replace(photo.dossier + photo.nom, photo.dossier + 'reduites/' + largeur + '/' + photo.nom);
}

// Dimensions reelles d'une image du catalogue, pour ses attributs width et
// height : le navigateur reserve ainsi la bonne hauteur avant l'arrivee de la
// photo, et la page ne saute pas. Photos de la marque : voir plus haut ;
// images du template : 370x390, sauf les quelques exceptions ci-dessous.

export function dimensionsImage(source) {
  const photo = photoMarque(source);
  if (photo) return photo.dimensions;
  return [370, 390];
}

// srcset d'une photo de la marque (undefined pour les autres images)
export function srcsetPhoto(source) {
  const photo = photoMarque(source);
  if (!photo) return undefined;
  const original = photo.dimensions[0];
  return [480, 720]
    .filter((largeur) => largeur < original)
    .map((largeur) => photoReduite(source, largeur) + ' ' + largeur + 'w')
    .concat(source + ' ' + original + 'w')
    .join(', ');
}

// Image d'une carte (produit, collection, modele), toujours dans un cadre 3:4.
// Photos de studio : version 3:4 dont le fond uni est prolonge
// (scripts/photos-cadrees.mjs, cartes/480|720/). Autres photos : la photo
// entiere, reduite, centree sur le fond clair de la carte (object-fit:
// contain dans aye-aye.css). Jamais de flou ni de rognage.
const CARTES_STUDIO = /^(DSC_\d+\.jpg|Femme_[17]\.jpeg|Homme_[12]\.jpeg)$/;

export function imageCarte(source) {
  const nom = source.split('/').pop();
  if (CARTES_STUDIO.test(nom)) {
    const dossier = source.slice(0, source.indexOf('/assets/images/')) + '/assets/images/cartes/';
    const fichier = nom.replace(/\.jpe?g$/i, '.jpg');
    return {
      src: dossier + '480/' + fichier,
      srcSet: dossier + '480/' + fichier + ' 480w, ' + dossier + '720/' + fichier + ' 720w',
      width: 480,
      height: 640,
    };
  }
  const [width, height] = dimensionsImage(source);
  return { src: photoReduite(source, 480), srcSet: srcsetPhoto(source), width, height };
}

// Version large 4:3 (cartes/large/) d'une photo de studio, pour une photo
// affichee en grand ; les autres photos gardent imageCarte (entieres, 3:4).
export function imageLarge(source) {
  const nom = source.split('/').pop();
  if (!CARTES_STUDIO.test(nom)) return { ...imageCarte(source), large: false };
  const dossier = source.slice(0, source.indexOf('/assets/images/')) + '/assets/images/cartes/large/';
  return { src: dossier + nom.replace(/\.jpe?g$/i, '.jpg'), srcSet: undefined, width: 1200, height: 900, large: true };
}

// Recherche dans le catalogue : nom, couleur, description et categorie, sans
// tenir compte des accents ni des majuscules. Deux lettres au minimum.
// Partagee par la page /recherche/ et la barre de recherche de l'en-tete.
export function normaliser(texte) {
  return texte.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

export function rechercherProduits(requete) {
  const terme = normaliser(requete.trim());
  if (terme.length < 2) return [];
  return PRODUITS.filter((produit) => {
    const categorie = categorieParSlug(produit.categorie);
    const champs = [produit.nom, produit.couleur, produit.description, categorie.nom].join(' ');
    return normaliser(champs).includes(terme);
  });
}
