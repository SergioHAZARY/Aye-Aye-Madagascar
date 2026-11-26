'use client';

import { SCRIPT_PROJET } from '@/app/lib/scripts-template';
import { useEffect } from 'react';

// Execute le script du projet (public/assets/js/aye-aye.js) apres
// l'hydratation : il pose des classes sur des elements que React vient de
// reprendre. layout.js le precharge des le <head>, il s'execute donc sans
// attente reseau.

// Injecte une seule fois par chargement de page (React StrictMode monte les
// effets deux fois en developpement).
let injecte = false;

export default function TemplateScripts() {
  useEffect(() => {
    if (injecte) return;
    injecte = true;
    const el = document.createElement('script');
    el.src = SCRIPT_PROJET;
    document.body.appendChild(el);
  }, []);

  return null;
}
