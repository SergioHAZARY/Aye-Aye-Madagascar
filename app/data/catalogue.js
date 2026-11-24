import { chemin } from '@/app/lib/chemin';

// ---------------------------------------------------------------------------
// Catalogue Aye Aye Madagascar
//
// C'EST LE SEUL FICHIER A MODIFIER pour faire vivre la boutique : ajouter un
// produit, changer une photo ou une categorie se fait ici, et tout le
// site suit (accueil, pages categories, fiches produit, recherche, panier).
//
// Les noms des produits Femme / Enfant / Accessoires sont des
// exemples a remplacer par vos vraies references.
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
    image: chemin('/assets/images/women-01.jpg'),
  },
  {
    slug: 'enfant',
    nom: 'Enfant',
    accroche: 'La culture malagasy dès le plus jeune âge.',
    image: chemin('/assets/images/kid-01.jpg'),
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

  // --- Femme : exemples a remplacer ----------------------------------------
  {
    slug: 'blazer-kaki',
    nom: 'Blazer kaki',
    couleur: 'Kaki',
    categorie: 'femme',
    note: 5,
    image: chemin('/assets/images/women-01.jpg'),
    galerie: [chemin('/assets/images/women-01.jpg')],
    description: 'Blazer en coton kaki, coupe droite, à porter ouvert sur un t-shirt.',
    details: ['Coton 100 %', 'Coupe droite'],
  },
  {
    slug: 'robe-fleurie',
    nom: 'Robe fleurie',
    couleur: 'Imprimé',
    categorie: 'femme',
    note: 5,
    image: chemin('/assets/images/women-02.jpg'),
    galerie: [chemin('/assets/images/women-02.jpg')],
    description: 'Robe courte à imprimé floral, ceinture à la taille, manches évasées.',
    details: ['Coton 100 %', 'Ceinture fournie'],
  },
  {
    slug: 'pull-oversize',
    nom: 'Pull oversize',
    couleur: 'Gris',
    categorie: 'femme',
    note: 5,
    image: chemin('/assets/images/women-03.jpg'),
    galerie: [chemin('/assets/images/women-03.jpg')],
    description: 'Pull maille douce, coupe oversize, col montant.',
    details: ['Maille douce', 'Coupe oversize'],
  },

  // --- Enfant : exemples a remplacer ---------------------------------------
  {
    slug: 'ensemble-marin',
    nom: 'Ensemble marin',
    couleur: 'Bleu',
    categorie: 'enfant',
    note: 5,
    image: chemin('/assets/images/kid-01.jpg'),
    galerie: [chemin('/assets/images/kid-01.jpg')],
    description: 'Ensemble deux pièces pour enfant, motif marin.',
    details: ['Coton 100 %', 'Du 4 au 12 ans'],
  },
  {
    slug: 'robe-a-pois',
    nom: 'Robe à pois',
    couleur: 'Bleu nuit',
    categorie: 'enfant',
    note: 5,
    image: chemin('/assets/images/kid-02.jpg'),
    galerie: [chemin('/assets/images/kid-02.jpg')],
    description: 'Robe à pois, coupe confortable pour tous les jours.',
    details: ['Coton 100 %', 'Du 4 au 12 ans'],
  },
  {
    slug: 't-shirt-raye-enfant',
    nom: 'T-shirt rayé',
    couleur: 'Blanc / bleu',
    categorie: 'enfant',
    note: 5,
    image: chemin('/assets/images/kid-03.jpg'),
    galerie: [chemin('/assets/images/kid-03.jpg')],
    description: 'T-shirt rayé en coton, facile à assortir.',
    details: ['Coton 100 %', 'Du 4 au 12 ans'],
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
    texte: "Un hommage aux lémuriens, trésors vivants que l'on ne trouve nulle part ailleurs.",
  },
  {
    slug: 'madagascar-roots-djembe',
    nom: 'Madagascar Roots Djembe',
    texte: 'Le rythme de nos racines. La musique et le tambour comme lien entre les générations.',
  },
  {
    slug: 'dauphins',
    nom: 'Dauphins',
    texte: 'La beauté de nos océans et la liberté des eaux qui entourent la Grande Île.',
  },
  {
    slug: 'tortue',
    nom: 'Tortue',
    texte: 'La sagesse et la patience. Un symbole de la richesse marine malagasy à protéger.',
  },
  {
    slug: 'tarondro',
    nom: 'Tarondro',
    texte: 'Le caméléon de Madagascar, maître des couleurs et symbole de patience. '
      + 'Un animal respecté et parfois sacré dans nos traditions.',
  },
  {
    slug: 'lakana',
    nom: 'Lakana',
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

// Photos de la marque en taille reduite (scripts/photos-reduites.mjs) :
// Homme/reduites/160|480|720/. Les autres images (exemples du template)
// n'ont qu'une taille et sont renvoyees telles quelles.
const DOSSIER_PHOTOS = '/assets/images/Homme/';

export function photoReduite(source, largeur) {
  return source.includes(DOSSIER_PHOTOS)
    ? source.replace(DOSSIER_PHOTOS, DOSSIER_PHOTOS + 'reduites/' + largeur + '/')
    : source;
}

// Dimensions reelles d'une image du catalogue, pour ses attributs width et
// height : le navigateur reserve ainsi la bonne hauteur avant l'arrivee de la
// photo, et la page ne saute pas. Photos de la marque : 899x1600 ; images du
// template : 370x390, sauf les quelques exceptions ci-dessous.
const DIMENSIONS_TEMPLATE = {
  'single-product-01.jpg': [770, 400],
  'single-product-02.jpg': [770, 400],
  'baner-right-image-04.jpg': [385, 330],
  'explore-image-01.jpg': [263, 263],
};

export function dimensionsImage(source) {
  if (source.includes(DOSSIER_PHOTOS)) return [899, 1600];
  return DIMENSIONS_TEMPLATE[source.split('/').pop()] || [370, 390];
}

// srcset d'une photo de la marque (undefined pour les autres images)
export function srcsetPhoto(source) {
  if (!source.includes(DOSSIER_PHOTOS)) return undefined;
  return photoReduite(source, 480) + ' 480w, ' + photoReduite(source, 720) + ' 720w, ' + source + ' 899w';
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
