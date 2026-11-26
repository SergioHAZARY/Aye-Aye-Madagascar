// Galerie : toutes les photos de la marque, classees par modele (coupe) et par
// collection (dessin au dos). Elles remplissent les pages /modeles/<slug>/ et
// /collections/<slug>/ (une photo peut aller sur plusieurs pages : photo de
// groupe, deux modeles cote a cote).
//
// Une ligne : [source, modeles, collections, description].
// - source : 'n:<fichier>' = photo du dossier local photos-originales/nouvelles/
//   (non versionne, 606 Mo), sinon chemin sous public/assets/images/ ;
// - les versions servies (galerie/480/ et galerie/1600/) sont faites par
//   `node scripts/galerie.mjs`, qui ecrit aussi leurs dimensions
//   (galerie-tailles.mjs) : relancer le script apres tout ajout ;
// - modeles : slugs de MODELES ; collections : slugs de COLLECTIONS
//   (catalogue.js).
// - dans chaque collection, la vue de dos (le dessin) vient en premier ; sur
//   une page, les photos a plusieurs modeles ou collections passent apres.
// Photos de face sans dessin visible : rangees avec le dos photographie dans
// la meme serie (meme personne, meme vetement).

import TAILLES from './galerie-tailles.mjs';

const T = 'tee-shirt';
const ML = 'manches-longues';
const D = 'debardeur';

export const PHOTOS_GALERIE = [
  // --- Antsatsaka -----------------------------------------------------------
  ['n:DSC_1795.jpg', [ML], ['antsatsaka'], 'Manches longues écru Antsatsaka, de dos'],
  ['n:IMG_0984.JPG', [ML], ['antsatsaka'], 'Manches longues écru Antsatsaka, de trois quarts dos'],
  ['n:IMG_0987.JPG', [ML], ['antsatsaka'], 'Manches longues écru Antsatsaka, de profil'],
  ['n:IMG_0982.JPG', [ML], ['antsatsaka'], 'Manches longues écru Antsatsaka, de face'],
  ['n:DSC_1798.jpg', [D], ['antsatsaka'], 'Débardeur rouge Antsatsaka, de dos'],
  ['n:DSC_1796.jpg', [D], ['antsatsaka'], 'Débardeur rouge Antsatsaka, de face'],
  ['n:DSC_1799.jpg', [D], ['antsatsaka'], 'Débardeur rouge Antsatsaka, de face'],
  ['n:IMG_0798.JPG', [ML, T], ['antsatsaka', 'lemurs-of-madagascar'], 'Manches longues Antsatsaka et tee-shirt Lemurs of Madagascar, de dos'],
  ['n:IMG_0799.JPG', [ML, T], ['antsatsaka', 'lemurs-of-madagascar'], 'Manches longues Antsatsaka et tee-shirt Lemurs of Madagascar, de face'],
  ['n:DSC_1870 copy.jpg', [D, T], ['antsatsaka', 'madagascar'], 'Débardeur rouge Antsatsaka, de dos, et tee-shirt noir Madagascar'],
  ['n:DSC_1868 copy.jpg', [D, T], ['antsatsaka', 'madagascar'], 'Débardeur rouge Antsatsaka et tee-shirt noir Madagascar, de face'],
  ['n:DSC_1869 copy.jpg', [D, T], ['antsatsaka', 'madagascar'], 'Débardeur rouge Antsatsaka et tee-shirt noir Madagascar'],
  ['Clients/Client_2.jpeg', [T], ['antsatsaka', 'dauphins'], 'Tee-shirt rouge Antsatsaka et tee-shirt enfant Dauphins, de dos'],

  // --- Aye Aye Madagascar ---------------------------------------------------
  ['Homme/DSC_1807.jpg', [ML], ['aye-aye-madagascar'], 'Manches longues rouge Aye Aye Madagascar, de dos'],
  ['Homme/DSC_1806.jpg', [ML], ['aye-aye-madagascar'], 'Manches longues rouge Aye Aye Madagascar, de dos'],
  ['Homme/DSC_1808.jpg', [ML], ['aye-aye-madagascar'], 'Manches longues rouge Aye Aye Madagascar, de face'],
  ['Homme/DSC_1804.jpg', [ML], ['aye-aye-madagascar'], 'Manches longues rouge Aye Aye Madagascar, de face'],
  ['Homme/DSC_1809.jpg', [ML], ['aye-aye-madagascar'], 'Manches longues rouge Aye Aye Madagascar, de trois quarts'],
  ['n:IMG_0832.JPG', [ML], ['aye-aye-madagascar'], 'Manches longues rouge Aye Aye Madagascar, de profil'],
  ['n:DSC_1842 copy.jpg', [T], ['aye-aye-madagascar'], 'Tee-shirt beige Aye Aye Madagascar, de dos'],
  ['n:DSC_1838 copy.jpg', [T], ['aye-aye-madagascar'], 'Tee-shirt beige Aye Aye Madagascar, de face'],
  ['n:DSC_1839 copy.jpg', [T], ['aye-aye-madagascar'], 'Tee-shirt beige Aye Aye Madagascar, de face'],
  ['n:IMG_1018.PNG', [T], ['aye-aye-madagascar'], 'Tee-shirt beige, grand logo Aye-Aye Madagascar'],
  ['n:IMG_1622.JPG', [T], ['aye-aye-madagascar'], 'Tee-shirt bleu Aye Aye Madagascar, de face'],
  ['n:IMG_0747.PNG', [T], ['lakana', 'aye-aye-madagascar'], 'Tee-shirt noir Lakana, de dos, et tee-shirt rouge Aye-Aye Madagascar'],

  // --- Madagascar -----------------------------------------------------------
  ['n:DSC_1836 copy 2.jpg', [T], ['madagascar'], 'Tee-shirt noir Madagascar, de dos'],
  ['n:IMG_1657.JPG', [T], ['madagascar'], 'Tee-shirt blanc Madagascar, de dos'],
  ['n:DSC_1832 copy.jpg', [T], ['madagascar'], 'Tee-shirt noir Madagascar, de face'],
  ['n:DSC_1833 copy.jpg', [T], ['madagascar'], 'Tee-shirt noir Madagascar, de face'],
  ['n:DSC_1834 copy.jpg', [T], ['madagascar'], 'Tee-shirt noir Madagascar, de face'],
  ['n:IMG_1658.PNG', [T], ['madagascar'], 'Tee-shirt blanc Madagascar, de face'],
  ['n:IMG_0853.JPG', [T], ['madagascar', 'tortue'], 'Tee-shirt noir Madagascar et tee-shirt bordeaux Tortue, de dos'],

  // --- Lemurs of Madagascar -------------------------------------------------
  ['Homme/Homme_1.jpeg', [T], ['lemurs-of-madagascar'], 'Tee-shirt beige Lemurs of Madagascar, de dos'],
  ['n:IMG_0844.JPG', [T], ['lemurs-of-madagascar'], 'Tee-shirt beige Lemurs of Madagascar, de dos'],
  ['n:IMG_1013.PNG', [T], ['lemurs-of-madagascar'], 'Tee-shirt beige Lemurs of Madagascar, de dos'],
  ['n:IMG_1565.PNG', [D], ['lemurs-of-madagascar'], 'Débardeur rouge Lemurs of Madagascar, de dos'],
  ['n:IMG_0522.PNG', [T], ['baobab', 'lemurs-of-madagascar'], 'Tee-shirt rose Baobab et tee-shirt rouge Lemurs of Madagascar, de dos'],

  // --- Madagascar Roots Djembe ----------------------------------------------
  ['n:DSC_1802.jpg', [D], ['madagascar-roots-djembe'], 'Débardeur blanc Madagascar Roots Djembe, de dos'],
  ['n:DSC_1803.jpg', [D], ['madagascar-roots-djembe'], 'Débardeur blanc Madagascar Roots Djembe, de dos'],
  ['n:DSC_1800.jpg', [D], ['madagascar-roots-djembe'], 'Débardeur blanc Madagascar Roots Djembe, de face'],
  ['n:DSC_1801.jpg', [D], ['madagascar-roots-djembe'], 'Débardeur blanc Madagascar Roots Djembe, de face'],
  ['n:IMG_1625.JPG', [T], ['madagascar-roots-djembe'], 'Tee-shirt noir Madagascar Roots Djembe, de dos'],
  ['Femme/Femme_5.jpeg', [T], ['madagascar-roots-djembe'], 'Tee-shirt noir Madagascar Roots Djembe, de face'],
  ['Enfant/Enfant_4.jpeg', [T], ['madagascar-roots-djembe'], 'Tee-shirt enfant blanc Madagascar Roots Djembe, de dos'],
  ['n:IMG_1624.JPG', [T], ['madagascar-roots-djembe', 'baobab'], 'Tee-shirt noir Madagascar Roots Djembe, de dos, et tee-shirt vert Baobab'],

  // --- Dauphins -------------------------------------------------------------
  ['n:IMG_1630.JPG', [T], ['dauphins'], 'Tee-shirt rouge Dauphins, de dos'],
  ['n:IMG_0841.JPG', [T], ['dauphins'], 'Tee-shirt orange Dauphins, de dos'],
  ['n:IMG_1616.JPG', [T], ['dauphins'], 'Tee-shirt rouge Dauphins, de face'],
  ['n:IMG_1618.JPG', [T], ['dauphins'], 'Tee-shirt rouge Dauphins, de face'],
  ['n:IMG_1634.JPG', [T], ['dauphins'], 'Tee-shirt rouge Dauphins, de face'],
  ['n:IMG_1623.JPG', [T], ['dauphins', 'aye-aye-madagascar', 'baobab', 'madagascar-roots-djembe'], 'Tee-shirts Dauphins, Aye Aye Madagascar, Baobab et Madagascar Roots Djembe, de dos'],
  ['n:IMG_1631.JPG', [T], ['dauphins', 'aye-aye-madagascar', 'baobab', 'madagascar-roots-djembe'], 'Tee-shirts Dauphins, Aye Aye Madagascar, Baobab et Madagascar Roots Djembe, de face'],
  ['n:IMG_1608.JPG', [T], ['dauphins', 'madagascar-roots-djembe', 'aye-aye-madagascar'], 'Tee-shirts Dauphins, Madagascar Roots Djembe et Aye Aye Madagascar, de face'],

  // --- Tortue ---------------------------------------------------------------
  ['Enfant/Enfant_3.jpeg', [T], ['tortue'], 'Tee-shirt enfant moutarde Tortue, de dos'],
  ['n:IMG_0851.JPG', [T], ['lakana', 'tortue'], 'Tee-shirt rouge Lakana et tee-shirt bordeaux Tortue, de dos'],
  ['n:IMG_1075.JPG', [T], ['tortue'], 'Tee-shirt violet et tee-shirt bordeaux Tortue, de face'],

  // --- Tarondro -------------------------------------------------------------
  ['n:DSC_1848 copy (2).jpg', [T], ['tarondro'], 'Tee-shirt beige Tarondro, de dos'],
  ['n:DSC_1845 copy.jpg', [T], ['tarondro'], 'Tee-shirt beige Tarondro, de face'],
  ['n:DSC_1846 copy.jpg', [T], ['tarondro'], 'Tee-shirt beige Tarondro, de face'],
  ['Enfant/Enfant_2.jpeg', [T], ['tarondro'], 'Tee-shirt enfant beige Tarondro, de dos'],
  ['n:IMG_0235.PNG', [T], ['tarondro', 'lakana'], 'Tee-shirts Tarondro et Lakana, de dos, à l’aéroport'],
  ['n:IMG_0237.PNG', [T], ['tarondro', 'lakana'], 'Famille en tee-shirts Tarondro et Lakana, de dos, aéroport de La Réunion'],
  ['n:IMG_0233.JPG', [T], ['tarondro', 'lakana'], 'Famille en tee-shirts Aye-Aye, aéroport de La Réunion'],
  ['n:IMG_0236.PNG', [T], ['tarondro', 'lakana'], 'Famille en tee-shirts Aye-Aye, aéroport de La Réunion'],
  ['n:IMG_0020.PNG', [T], ['lemurs-of-madagascar', 'tarondro', 'lakana', 'baobab'], 'Tee-shirts Lemurs of Madagascar, Tarondro, Lakana et Baobab, de dos'],

  // --- Lakana ---------------------------------------------------------------
  ['n:IMG_0850.JPG', [T], ['lakana'], 'Tee-shirt rouge Lakana, de dos'],
  ['n:IMG_1015.PNG', [T], ['lakana'], 'Tee-shirt noir Lakana, de dos'],
  ['n:IMG_0849.JPG', [T], ['lakana'], 'Tee-shirt rouge Lakana, de face'],
  ['Enfant/Enfant_1.jpeg', [T], ['lakana'], 'Tee-shirt enfant bordeaux Lakana, de dos'],
  ['n:IMG_0211.PNG', [T], ['lakana', 'baobab'], 'Tee-shirt rouge Lakana et tee-shirt enfant Baobab, de dos'],

  // --- Baobab ---------------------------------------------------------------
  ['n:IMG_0640.PNG', [T], ['baobab'], 'Tee-shirt rose Baobab'],

  // --- Modele seulement (dessin du dos non visible) --------------------------
  ['n:IMG_1564.PNG', [D], [], 'Débardeur rouge, de face'],
  ['n:IMG_1568.JPG', [D], [], 'Débardeur rouge, de face'],
  ['n:IMG_1017.PNG', [T], [], 'Tee-shirt rouge, de face'],
  ['Clients/Client_3.jpeg', [ML], [], 'Manches longues blanc, en boutique'],
];

// identifiant d'une photo = nom de son fichier, en minuscules et sans espaces
export function idPhoto(source) {
  return source.replace(/^n:/, '').split('/').pop().replace(/\.[a-z]+$/i, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Photos de clients (pas de mannequins) : ni sur les pages modele, ni sur
// les pages collection, ni sur les fiches produit (demande du proprietaire).
// Elles restent classees ci-dessus, mais leurs fichiers ne sont plus generes
// (scripts/galerie.mjs) : retirer une photo de cette liste la remet en ligne.
export const CLIENTS = new Set([
  'client-2', 'img-0747', 'img-0522', 'img-1657', 'img-1658', 'img-0233',
  'img-0235', 'img-0236', 'img-0237', 'img-0640', 'img-0211', 'client-3',
]);

function photo([source, modeles, collections, alt]) {
  const id = idPhoto(source);
  const [width, height] = TAILLES[id] || [480, 853];
  return { id, modeles, collections, alt, width, height, client: CLIENTS.has(id) };
}

// Ordre d'une page : d'abord les photos de ce seul modele (ou de cette seule
// collection), puis celles ou il est le principal, puis les photos de groupe ;
// l'ordre de la liste est garde a l'interieur de chaque rang.
function trier(lignes, slug, champ) {
  const seule = (l) => l[1].length === 1 && l[2].length <= 1; // un vetement, un dessin
  const rang = (l) => (seule(l) ? 0 : l[champ].length === 1 ? 1 : l[champ][0] === slug ? 2 : 3);
  return lignes.filter((l) => l[champ].includes(slug)).sort((a, b) => rang(a) - rang(b)).map(photo);
}

// Photos retirees d'une page modele seulement, a la demande du proprietaire
// (elles restent sur les pages collection et les fiches produit).
const RETIREES_DU_MODELE = {
  'tee-shirt': ['img-1616', 'dsc-1838-copy', 'homme-1', 'dsc-1845-copy', 'dsc-1846-copy', 'dsc-1833-copy'],
};

// page d'un modele : seulement les photos de mannequins ou l'on ne voit que ce modele
export const photosDuModele = (slug) => trier(PHOTOS_GALERIE.filter((l) => l[1].length === 1), slug, 1)
  .filter((p) => !p.client && !(RETIREES_DU_MODELE[slug] || []).includes(p.id));
export const photosDeLaCollection = (slug) => trier(PHOTOS_GALERIE, slug, 2).filter((p) => !p.client);

// Photos des dossiers du site (Homme, Femme, Clients…) qui sont aussi dans
// cette liste sous un autre nom (meme photo, autre fichier).
const DOUBLES = {
  'img-0984': 'dsc-1794', 'img-0987': 'dsc-1793', 'img-0982': 'homme-2', 'img-0832': 'dsc-1805',
  'img-1630': 'femme-4', 'img-1616': 'femme-2', 'img-1634': 'femme-3', 'img-1625': 'femme-6',
  'dsc-1848-copy-2': 'femme-1', 'dsc-1845-copy': 'femme-7', 'dsc-1836-copy-2': 'dsc-1836',
  'dsc-1842-copy': 'dsc-1842', 'img-1565': 'homme-3', 'img-1623': 'homme-5',
  'img-1658': 'client-1', 'img-1568': 'client-4',
};

// `source` (chemin d'une photo du site) est-elle la photo `id` de la galerie ?
export function memePhoto(source, id) {
  const autre = idPhoto(source);
  return autre === id || DOUBLES[id] === autre;
}

// Fiche produit : les photos du meme modele et de la meme collection, sauf
// celles que le produit montre deja (`images` : sa galerie).
export function autresPhotosDuProduit(images, modele, collection) {
  return trier(PHOTOS_GALERIE, collection, 2)
    .filter((p) => !p.client && p.modeles.length === 1 && p.modeles[0] === modele && !images.some((s) => memePhoto(s, p.id)));
}
