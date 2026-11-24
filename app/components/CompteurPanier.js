'use client';

import { useEffect, useState } from 'react';

import { EVENEMENT, nombreArticles } from '../lib/panier';

// Pastille indiquant le nombre d'articles dans le panier.
// Rien n'est affiche cote serveur : le panier vit dans le navigateur, le
// rendu initial doit donc rester vide pour que l'hydratation corresponde.
export default function CompteurPanier() {
  const [nombre, setNombre] = useState(0);

  useEffect(() => {
    const rafraichir = () => setNombre(nombreArticles());
    rafraichir();
    window.addEventListener(EVENEMENT, rafraichir);
    window.addEventListener('storage', rafraichir); // autre onglet
    return () => {
      window.removeEventListener(EVENEMENT, rafraichir);
      window.removeEventListener('storage', rafraichir);
    };
  }, []);

  if (nombre === 0) return null;
  return <span className="aye-pastille">{nombre}</span>;
}
