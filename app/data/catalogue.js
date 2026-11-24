import { chemin } from '@/app/lib/chemin';

// ---------------------------------------------------------------------------
// Catalogue Aye Aye Madagascar
//
// C'EST LE SEUL FICHIER A MODIFIER pour faire vivre la boutique : ajouter un
// produit, changer une photo ou une categorie se fait ici, et tout le
// site suit (accueil, pages categories, fiches produit, recherche, panier).
//
// Les produits Accessoires sont encore des exemples du template, a remplacer
// par vos vraies references.
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
    image: chemin('/assets/images/Femme/Femme_1.jpeg'),
  },
  {
    slug: 'enfant',
    nom: 'Enfant',
    accroche: 'La culture malagasy dès le plus jeune âge.',
    image: chemin('/assets/images/Enfant/Enfant_3.jpeg'),
  },
  {
    slug: 'accessoires',
    nom: 'Accessoires',
    accroche: 'Les détails qui complètent votre style.',
    image: chemin('/assets/images/baner-right-image-04.jpg'),
  },
];

export const PRODUITS = [
  // --- Homme : les deux modeles photographies -------------------------------
  {
    slug: 'manches-longues-aye-aye-rouge',
    nom: 'Manches longues Aye-Aye',
    couleur: 'Rouge',
    categorie: 'homme',
    note: 5,
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
    details: ['Coton 100 %', 'Impression dos et manche', 'Coupe droite', 'Lavage à 30 °C'],
  },
  {
    slug: 'manches-longues-antsatsaka-ecru',
    nom: 'Manches longues Antsatsaka',
    couleur: 'Écru',
    categorie: 'homme',
    note: 5,
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
    details: ['Coton 100 %', 'Impression dos et manche', 'Coupe droite', 'Lavage à 30 °C'],
  },

  // --- Femme : les modeles photographies -----------------------------------
  {
    slug: 'tee-shirt-tarondro-beige',
    nom: 'Tee-shirt Tarondro',
    couleur: 'Beige',
    categorie: 'femme',
    note: 5,
    image: chemin('/assets/images/Femme/Femme_1.jpeg'),
    galerie: [chemin('/assets/images/Femme/Femme_1.jpeg')],
    description:
      'Tee-shirt en coton 100 %, beige. Tarondro, le caméléon de Madagascar, '
      + 'est imprimé dans le dos avec « Madagascar » ; étiquette Aye-Aye au col.',
    details: ['Coton 100 %', 'Impression dos', 'Étiquette Aye-Aye au col'],
  },

  {
    slug: 'tee-shirt-dauphins-rouge',
    nom: 'Tee-shirt Dauphins',
    couleur: 'Rouge',
    categorie: 'femme',
    note: 5,
    image: chemin('/assets/images/Femme/Femme_4.jpeg'),
    galerie: [
      chemin('/assets/images/Femme/Femme_4.jpeg'),
      chemin('/assets/images/Femme/Femme_2.jpeg'),
      chemin('/assets/images/Femme/Femme_3.jpeg'),
    ],
    description:
      'Tee-shirt en coton 100 %, rouge. Des dauphins jaillissant des vagues sont '
      + 'imprimés dans le dos ; petit logo Aye-Aye sur la poitrine.',
    details: ['Coton 100 %', 'Impression dos', 'Logo Aye-Aye sur la poitrine'],
  },
  {
    slug: 'tee-shirt-djembe-noir',
    nom: 'Tee-shirt Djembe',
    couleur: 'Noir',
    categorie: 'femme',
    note: 5,
    image: chemin('/assets/images/Femme/Femme_6.jpeg'),
    galerie: [
      chemin('/assets/images/Femme/Femme_6.jpeg'),
      chemin('/assets/images/Femme/Femme_5.jpeg'),
    ],
    description:
      'Tee-shirt en coton 100 %, noir. Trois danseuses et l’inscription '
      + '« Madagascar Roots Djembe » sont imprimées dans le dos ; petit logo '
      + 'Aye-Aye sur la poitrine.',
    details: ['Coton 100 %', 'Impression dos', 'Logo Aye-Aye sur la poitrine'],
  },

  // --- Enfant : les modeles photographies ----------------------------------
  {
    slug: 'tee-shirt-tortue-moutarde',
    nom: 'Tee-shirt Tortue',
    couleur: 'Moutarde',
    categorie: 'enfant',
    note: 5,
    image: chemin('/assets/images/Enfant/Enfant_3.jpeg'),
    galerie: [chemin('/assets/images/Enfant/Enfant_3.jpeg')],
    description:
      'Tee-shirt enfant en coton 100 %, moutarde. La tortue de mer est imprimée '
      + 'dans le dos avec « Tortue Madagascar » ; étiquette Aye-Aye sur la manche.',
    details: ['Coton 100 %', 'Impression dos', 'Étiquette Aye-Aye sur la manche'],
  },

  {
    slug: 'tee-shirt-lakana-enfant-bordeaux',
    nom: 'Tee-shirt Lakana',
    couleur: 'Bordeaux',
    categorie: 'enfant',
    note: 5,
    image: chemin('/assets/images/Enfant/Enfant_1.jpeg'),
    galerie: [chemin('/assets/images/Enfant/Enfant_1.jpeg')],
    description:
      'Tee-shirt enfant en coton 100 %, bordeaux. Une pirogue à voile sous le '
      + 'soleil couchant et « Lakana » sont imprimés dans le dos ; étiquette '
      + 'Aye-Aye au col.',
    details: ['Coton 100 %', 'Impression dos', 'Étiquette Aye-Aye au col'],
  },
  {
    slug: 'tee-shirt-tarondro-enfant-beige',
    nom: 'Tee-shirt Tarondro',
    couleur: 'Beige',
    categorie: 'enfant',
    note: 5,
    image: chemin('/assets/images/Enfant/Enfant_2.jpeg'),
    galerie: [chemin('/assets/images/Enfant/Enfant_2.jpeg')],
    description:
      'Tee-shirt enfant en coton 100 %, beige. Tarondro, le caméléon de '
      + 'Madagascar, est imprimé dans le dos ; étiquette Aye-Aye au col.',
    details: ['Coton 100 %', 'Impression dos', 'Étiquette Aye-Aye au col'],
  },
  {
    slug: 'tee-shirt-djembe-enfant-blanc',
    nom: 'Tee-shirt Djembe',
    couleur: 'Blanc',
    categorie: 'enfant',
    note: 5,
    image: chemin('/assets/images/Enfant/Enfant_4.jpeg'),
    galerie: [chemin('/assets/images/Enfant/Enfant_4.jpeg')],
    description:
      'Tee-shirt enfant en coton 100 %, blanc. Trois danseuses et l’inscription '
      + '« Madagascar Roots Djembe » sont imprimées dans le dos ; étiquette '
      + 'Aye-Aye au col.',
    details: ['Coton 100 %', 'Impression dos', 'Étiquette Aye-Aye au col'],
  },

  // --- Accessoires : exemples a remplacer ----------------------------------
  {
    slug: 'sac-en-cuir',
    nom: 'Sac en cuir',
    couleur: 'Camel',
    categorie: 'accessoires',
    note: 5,
    image: chemin('/assets/images/single-product-01.jpg'),
    galerie: [chemin('/assets/images/single-product-01.jpg'), chemin('/assets/images/single-product-02.jpg')],
    description: 'Sac en cuir souple, bandoulière réglable.',
    details: ['Cuir véritable', 'Bandoulière réglable'],
  },
  {
    slug: 'casquette-aye-aye',
    nom: 'Casquette Aye-Aye',
    couleur: 'Noir',
    categorie: 'accessoires',
    note: 5,
    image: chemin('/assets/images/baner-right-image-04.jpg'),
    galerie: [chemin('/assets/images/baner-right-image-04.jpg')],
    description: 'Casquette brodée à la signature Aye Aye Madagascar.',
    details: ['Coton 100 %', 'Taille unique réglable'],
  },
  {
    slug: 'tote-bag-malagasy',
    nom: 'Tote bag Malagasy',
    couleur: 'Écru',
    categorie: 'accessoires',
    note: 5,
    image: chemin('/assets/images/explore-image-01.jpg'),
    galerie: [chemin('/assets/images/explore-image-01.jpg')],
    description: 'Sac en toile épaisse, imprimé aux couleurs de Madagascar.',
    details: ['Toile de coton', 'Anses renforcées'],
  },
];

// --- Modeles et collections -------------------------------------------------
// Textes fournis par la marque (structure du site).
//
// Un MODELE est une coupe, proposee pour hommes, femmes et enfants.
// Une COLLECTION est un dessin au dos, disponible sur tous les modeles.
// `image` (facultatif) : photo de la collection ; sans photo, la carte
// affiche son numero. Ajouter une photo = renseigner ce champ.

export const MODELES = [
  {
    slug: 'tee-shirt',
    nom: 'Tee-shirt',
    texte: 'Le classique indispensable. Coton doux et respirant, idéal au quotidien.',
  },
  {
    slug: 'manches-longues',
    nom: 'Manches longues',
    texte: "Pour les soirées fraîches et les hauts plateaux. Confort et style toute l'année.",
  },
  {
    slug: 'debardeur',
    nom: 'Débardeur',
    texte: 'Léger et pratique, parfait pour la chaleur de la côte et les journées actives.',
  },
];

export const COLLECTIONS = [
  {
    slug: 'antsatsaka',
    nom: 'Antsatsaka',
    texte: 'Un hommage au nord de la Grande Île, terre de cacao, de vanille et de traditions. '
      + 'Une collection pour ceux qui portent leurs racines avec fierté.',
    image: chemin('/assets/images/collections/antsatsaka.jpg'),
  },
  {
    slug: 'aye-aye-madagascar',
    nom: 'Aye Aye Madagascar',
    texte: "Notre collection emblème. L'aye-aye, animal unique au monde, est le symbole de notre marque.",
    image: chemin('/assets/images/collections/aye-aye-madagascar.jpg'),
  },
  {
    slug: 'madagascar',
    nom: 'Madagascar',
    texte: 'Simple et fort. Le nom de notre île, à porter fièrement partout dans le monde.',
  },
  {
    slug: 'lemurs-of-madagascar',
    nom: 'Lemurs of Madagascar',
    image: chemin('/assets/images/collections/lemurs-of-madagascar.jpg'),
    texte: "Un hommage aux lémuriens, trésors vivants que l'on ne trouve nulle part ailleurs.",
  },
  {
    slug: 'madagascar-roots-djembe',
    nom: 'Madagascar Roots Djembe',
    image: chemin('/assets/images/collections/madagascar-roots-djembe.jpg'),
    texte: 'Le rythme de nos racines. La musique et le tambour comme lien entre les générations.',
  },
  {
    slug: 'dauphins',
    nom: 'Dauphins',
    image: chemin('/assets/images/collections/dauphins.jpg'),
    texte: 'La beauté de nos océans et la liberté des eaux qui entourent la Grande Île.',
  },
  {
    slug: 'tortue',
    nom: 'Tortue',
    image: chemin('/assets/images/collections/tortue.jpg'),
    texte: 'La sagesse et la patience. Un symbole de la richesse marine malagasy à protéger.',
  },
  {
    slug: 'tarondro',
    nom: 'Tarondro',
    image: chemin('/assets/images/collections/tarondro.jpg'),
    texte: 'Le caméléon de Madagascar, maître des couleurs et symbole de patience. '
      + 'Un animal respecté et parfois sacré dans nos traditions.',
  },
  {
    slug: 'lakana',
    nom: 'Lakana',
    image: chemin('/assets/images/collections/lakana.jpg'),
    texte: "La pirogue traditionnelle, symbole du savoir-faire des pêcheurs et du lien entre l'homme et la mer.",
  },
];

// --- Tailles ----------------------------------------------------------------
// Proposees par categorie ; un produit peut definir sa propre liste avec un
// champ `tailles`. Liste vide = pas de choix de taille (accessoires).
// A CONFIRMER avec la marque : ce sont des valeurs de depart.
export const TAILLES_PAR_CATEGORIE = {
  homme: ['S', 'M', 'L', 'XL', 'XXL'],
  femme: ['S', 'M', 'L', 'XL', 'XXL'],
  enfant: ['4 ans', '6 ans', '8 ans', '10 ans', '12 ans'],
  accessoires: [],
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

// Photos de la marque (dossiers Homme, Femme, Enfant) et dimensions de leurs
// originaux. Les DSC_xxxx.jpg font toutes 899x1600 ; les autres sont listees
// ici. AJOUTER une ligne pour toute nouvelle photo utilisee dans le site.
const DIMENSIONS_PHOTOS = {
  'Femme_1.jpeg': [720, 1280],
  'Femme_2.jpeg': [851, 1280],
  'Femme_3.jpeg': [851, 1280],
  'Femme_4.jpeg': [851, 1280],
  'Femme_5.jpeg': [1064, 1600],
  'Femme_6.jpeg': [1064, 1600],
  'Enfant_1.jpeg': [960, 1280],
  'Enfant_2.jpeg': [960, 1280],
  'Enfant_3.jpeg': [1049, 1280],
  'Enfant_4.jpeg': [960, 1280],
  'Homme_1.jpeg': [720, 1280],
};

function photoMarque(source) {
  const morceaux = source.match(/(\/assets\/images\/(?:Homme|Femme|Enfant)\/)([^/]+)$/);
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
const DIMENSIONS_TEMPLATE = {
  'single-product-01.jpg': [770, 400],
  'single-product-02.jpg': [770, 400],
  'baner-right-image-04.jpg': [385, 330],
  'explore-image-01.jpg': [263, 263],
};

export function dimensionsImage(source) {
  const photo = photoMarque(source);
  if (photo) return photo.dimensions;
  return DIMENSIONS_TEMPLATE[source.split('/').pop()] || [370, 390];
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
