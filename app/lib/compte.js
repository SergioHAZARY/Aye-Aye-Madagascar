// Compte client connecte (Google ou Facebook), garde dans le navigateur.
// Firebase garde le vrai compte ; ici on ne retient que ce qu'on affiche.

const CLE = 'aye-aye-compte';

export function lireCompte() {
  try {
    return JSON.parse(window.localStorage.getItem(CLE) || 'null');
  } catch {
    return null;
  }
}

export function enregistrerCompte(compte) {
  try {
    window.localStorage.setItem(CLE, JSON.stringify(compte));
  } catch { /* stockage indisponible */ }
}

export function oublierCompte() {
  try {
    window.localStorage.removeItem(CLE);
  } catch { /* stockage indisponible */ }
}
