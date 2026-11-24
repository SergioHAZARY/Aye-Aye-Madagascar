'use client';

import { chemin } from '@/app/lib/chemin';
import { useEffect, useState } from 'react';

import FicheProduit from './FicheProduit';
import { EVENEMENT, lireFavoris } from '../lib/panier';
import { produitParSlug } from '../data/catalogue';

export default function Favoris() {
  const [slugs, setSlugs] = useState(null);

  useEffect(() => {
    const rafraichir = () => setSlugs(lireFavoris());
    rafraichir();
    window.addEventListener(EVENEMENT, rafraichir);
    window.addEventListener('storage', rafraichir);
    return () => {
      window.removeEventListener(EVENEMENT, rafraichir);
      window.removeEventListener('storage', rafraichir);
    };
  }, []);

  if (slugs === null) return <p className="aye-panier-attente">Chargement…</p>;

  const produits = slugs.map(produitParSlug).filter(Boolean);

  if (produits.length === 0) {
    return (
      <div className="aye-panier-vide">
        <p>Vous n’avez pas encore de favoris.</p>
        <p>Cliquez sur le cœur d’un produit pour le retrouver ici.</p>
        <div className="main-border-button">
          <a href={chemin('/produits/')}>Voir les produits</a>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      {produits.map((produit) => (
        <div className="col-lg-4 col-md-6" key={produit.slug}>
          <FicheProduit produit={produit} differer={false} />
        </div>
      ))}
    </div>
  );
}
