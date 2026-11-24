'use client';

import { useEffect } from 'react';

// Scripts du template, dans l'ordre d'origine.
//
// Le template chargeait 15 fichiers (984 Ko). custom.js n'en utilise que trois :
// jQuery, owl-carousel (les carrousels) et scrollReveal (les animations a
// l'apparition). Les dix autres (accordions, slick, popper, bootstrap.min.js,
// datepicker, isotope, imgfix, lightbox, waypoints, counterup) n'etaient
// appeles nulle part : 805 Ko telecharges pour rien.
// Retrait verifie : aucun ecart de mise en page ni de comportement.
const SCRIPTS = [
  // jQuery
  '/assets/js/jquery-2.1.0.min.js',
  // Plugins reellement utilises par custom.js
  '/assets/js/owl-carousel.js',
  '/assets/js/scrollreveal.min.js',
];

// Initialisations : celles du template, puis celles du projet.
const INITIALISATIONS = [
  '/assets/js/custom.js',
  '/assets/js/aye-aye.js',
];

// Les scripts ne sont injectes qu'une fois par chargement de page
// (React StrictMode monte les effets deux fois en developpement).
let injecte = false;

export default function TemplateScripts() {
  useEffect(() => {
    if (injecte) return;
    injecte = true;

    const sources = [...SCRIPTS, ...INITIALISATIONS];

    // `async = false` : telechargement en parallele, execution dans l'ordre
    // d'insertion -> comportement identique a des <script src> en fin de body.
    let dernier = null;
    for (const src of sources) {
      const el = document.createElement('script');
      el.src = src;
      el.async = false;
      document.body.appendChild(el);
      dernier = el;
    }

    dernier.addEventListener('load', () => {
      // custom.js masque le preloader dans un handler `$(window).on('load')`.
      // Les scripts etant injectes apres l'hydratation, l'evenement `load` peut
      // deja etre passe : on le rejoue pour conserver le comportement d'origine.
      if (document.readyState === 'complete' && window.jQuery) {
        window.jQuery(window).trigger('load');
      }
    });
  }, []);

  return null;
}
