import { chemin, cheminVersionne } from './chemin';

// Scripts du template, dans l'ordre d'execution. Partages par layout.js (qui
// les precharge des le <head>) et TemplateScripts (qui les execute apres
// l'hydratation).
//
// Le template chargeait 15 fichiers (984 Ko). custom.js n'en utilise que trois :
// jQuery, owl-carousel (les carrousels) et scrollReveal (les animations a
// l'apparition). Les dix autres (accordions, slick, popper, bootstrap.min.js,
// datepicker, isotope, imgfix, lightbox, waypoints, counterup) n'etaient
// appeles nulle part : 805 Ko telecharges pour rien.
// Retrait verifie : aucun ecart de mise en page ni de comportement.
export const SCRIPTS_TEMPLATE = [
  chemin('/assets/js/jquery-2.1.0.min.js'),
  chemin('/assets/js/owl-carousel.js'),
  chemin('/assets/js/scrollreveal.min.js'),
  // initialisations : celles du template, puis celles du projet
  chemin('/assets/js/custom.js'),
  cheminVersionne('/assets/js/aye-aye.js'), // fichier du projet : versionne
];
