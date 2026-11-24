// Panier et favoris, cote navigateur.
//
// Volontairement sans bibliotheque : les donnees vivent dans localStorage et
// chaque modification emet un evenement que les composants React ecoutent.
// Ce choix permet aussi aux boutons « Ajouter au panier » clones par le
// carrousel jQuery de fonctionner : ils ne dependent d'aucun gestionnaire
// React, seulement d'un attribut data-* et d'un ecouteur delegue.

const CLES = { panier: 'aye-aye-panier', favoris: 'aye-aye-favoris' };

export const EVENEMENT = 'aye-aye:maj';

function lireBrut(cle) {
  if (typeof window === 'undefined') return [];
  try {
    const brut = window.localStorage.getItem(cle);
    const valeur = brut ? JSON.parse(brut) : [];
    return Array.isArray(valeur) ? valeur : [];
  } catch {
    return []; // navigation privee, stockage bloque : on degrade sans casser
  }
}

function ecrireBrut(cle, valeur) {
  try {
    window.localStorage.setItem(cle, JSON.stringify(valeur));
  } catch {
    /* stockage indisponible : le panier reste valable pour la page courante */
  }
  window.dispatchEvent(new CustomEvent(EVENEMENT));
}

// --- Panier -----------------------------------------------------------------
// Une ligne = un produit dans une taille : { slug, taille, quantite }.
// `taille` vaut null quand elle n'est pas encore choisie (ajout depuis une
// carte de carrousel) ou sans objet (accessoires) ; le panier la demande.

const memeLigne = (l, slug, taille) => l.slug === slug && (l.taille || null) === (taille || null);

export function lirePanier() {
  return lireBrut(CLES.panier).map((l) => ({ taille: null, ...l }));
}

export function ajouterAuPanier(slug, quantite = 1, taille = null) {
  const lignes = lirePanier();
  const existante = lignes.find((l) => memeLigne(l, slug, taille));
  if (existante) existante.quantite += quantite;
  else lignes.push({ slug, taille: taille || null, quantite });
  ecrireBrut(CLES.panier, lignes);
}

export function definirQuantite(slug, taille, quantite) {
  const lignes = lirePanier()
    .map((l) => (memeLigne(l, slug, taille) ? { ...l, quantite } : l))
    .filter((l) => l.quantite > 0);
  ecrireBrut(CLES.panier, lignes);
}

// Change la taille d'une ligne ; si la nouvelle taille est deja au panier,
// les deux lignes fusionnent.
export function definirTaille(slug, ancienne, nouvelle) {
  const lignes = lirePanier();
  const ligne = lignes.find((l) => memeLigne(l, slug, ancienne));
  if (!ligne) return;
  const cible = lignes.find((l) => l !== ligne && memeLigne(l, slug, nouvelle));
  if (cible) {
    cible.quantite += ligne.quantite;
    lignes.splice(lignes.indexOf(ligne), 1);
  } else {
    ligne.taille = nouvelle || null;
  }
  ecrireBrut(CLES.panier, lignes);
}

export function retirerDuPanier(slug, taille) {
  ecrireBrut(CLES.panier, lirePanier().filter((l) => !memeLigne(l, slug, taille)));
}

export function viderPanier() {
  ecrireBrut(CLES.panier, []);
}

export function nombreArticles() {
  return lirePanier().reduce((total, l) => total + l.quantite, 0);
}

// --- Favoris ----------------------------------------------------------------

export function lireFavoris() {
  return lireBrut(CLES.favoris);
}

export function basculerFavori(slug) {
  const favoris = lireFavoris();
  const suivant = favoris.includes(slug)
    ? favoris.filter((s) => s !== slug)
    : [...favoris, slug];
  ecrireBrut(CLES.favoris, suivant);
  return suivant.includes(slug);
}

export function estFavori(slug) {
  return lireFavoris().includes(slug);
}
