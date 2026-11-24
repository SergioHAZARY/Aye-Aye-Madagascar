'use client';

import { SCRIPTS_TEMPLATE } from '@/app/lib/scripts-template';
import { useEffect } from 'react';

// Execute les scripts du template (liste et raisons : lib/scripts-template.js).
// Ils sont injectes apres l'hydratation, car owl-carousel deplace et clone les
// cartes : fait avant, React trouverait un DOM different du sien. layout.js
// les precharge des le <head>, ils s'executent donc sans attente reseau.

// Les scripts ne sont injectes qu'une fois par chargement de page
// (React StrictMode monte les effets deux fois en developpement).
let injecte = false;

export default function TemplateScripts() {
  useEffect(() => {
    if (injecte) return;
    injecte = true;

    const sources = SCRIPTS_TEMPLATE;

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
      // custom.js pose des handlers `$(window).on('load')`. Les scripts etant
      // injectes apres l'hydratation, l'evenement `load` peut deja etre passe :
      // on le rejoue pour conserver le comportement d'origine.
      if (document.readyState === 'complete' && window.jQuery) {
        window.jQuery(window).trigger('load');
      }
    });
  }, []);

  return null;
}
