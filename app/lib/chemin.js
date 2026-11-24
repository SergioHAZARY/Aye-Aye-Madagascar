// Prefixe des adresses du site.
//
// En local (npm run dev / npm run build), le site est servi a la racine :
// BASE vaut ''. Sur GitHub Pages, il est servi dans un sous-dossier,
// https://sergiohazary.github.io/Aye-Aye-Madagascar/ : la GitHub Action
// definit NEXT_PUBLIC_BASE_PATH=/Aye-Aye-Madagascar au moment du build, et
// next.config.mjs passe la meme valeur a basePath pour les fichiers de Next.js.
//
// REGLE : toute adresse interne ecrite en dur (lien, image, script, feuille de
// style, redirection) passe par chemin('/...'). Un '/assets/...' ou un
// href="/..." sans chemin() fonctionne en local mais casse sur GitHub Pages.
// Les url(...) des feuilles CSS sont relatives et n'en ont pas besoin.

export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

// version du build (next.config.mjs), pour les fichiers du projet qui gardent
// le meme nom d'une publication a l'autre
export const VERSION = process.env.NEXT_PUBLIC_VERSION || 'dev';

export function cheminVersionne(adresse) {
  return chemin(adresse) + '?v=' + VERSION;
}

export function chemin(adresse) {
  return BASE + adresse;
}
