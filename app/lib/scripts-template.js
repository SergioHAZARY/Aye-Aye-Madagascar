import { chemin, cheminVersionne } from './chemin';

// Scripts du template, dans l'ordre d'execution. Partages par layout.js (qui
// les precharge des le <head>) et TemplateScripts (qui les execute apres
// l'hydratation).
//
// custom.js n'utilise que trois scripts du template : jQuery, owl-carousel
// (les carrousels) et scrollReveal (les animations a l'apparition). Les
// autres ont ete supprimes du projet.
export const SCRIPTS_TEMPLATE = [
  chemin('/assets/js/jquery-2.1.0.min.js'),
  chemin('/assets/js/owl-carousel.js'),
  chemin('/assets/js/scrollreveal.min.js'),
  // initialisations : celles du template, puis celles du projet
  chemin('/assets/js/custom.js'),
  cheminVersionne('/assets/js/aye-aye.js'), // fichier du projet : versionne
];
