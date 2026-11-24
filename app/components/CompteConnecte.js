'use client';

// Bandeau « Bonjour … » de Mon compte, quand le visiteur s'est connecte avec
// Google ou Facebook. Rien cote serveur : le compte n'existe que dans le
// navigateur (meme principe que le panier).

import { chemin } from '@/app/lib/chemin';
import { lireCompte, oublierCompte } from '@/app/lib/compte';
import { useEffect, useState } from 'react';

export default function CompteConnecte() {
  const [compte, setCompte] = useState(null);
  useEffect(() => setCompte(lireCompte()), []);

  if (!compte) {
    return (
      <p className="aye-compte-statut">
        <a href={chemin('/connexion/')}>Se connecter ou créer un compte</a>
      </p>
    );
  }
  return (
    <p className="aye-compte-statut">
      Bonjour <strong>{compte.nom || compte.email}</strong>
      {compte.email && compte.nom ? ' (' + compte.email + ')' : ''} ·{' '}
      <button
        type="button"
        onClick={() => {
          oublierCompte();
          setCompte(null);
        }}
      >
        Se déconnecter
      </button>
    </p>
  );
}
