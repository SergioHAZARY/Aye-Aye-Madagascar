'use client';

// Tailles proposees, sur la fiche produit : on peut en selectionner une pour
// la voir mise en avant. Pas de bouton d'ajout au panier (retire a la demande
// de la marque) : la commande se fait en contactant la marque.
//
// Gestionnaires React autorises ici : la fiche n'est pas dans un carrousel.

import { useState } from 'react';

export default function AchatProduit({ tailles }) {
  const [taille, setTaille] = useState(null);
  if (tailles.length === 0) return null;

  return (
    <div className="aye-tailles">
      <p className="aye-fiche-libelle">
        Taille{taille && <span> : {taille}</span>}
      </p>
      <div className="aye-tailles-choix" role="radiogroup" aria-label="Taille">
        {tailles.map((t) => (
          <button
            key={t}
            type="button"
            role="radio"
            aria-checked={taille === t}
            className={taille === t ? 'actif' : undefined}
            onClick={() => setTaille(t)}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
