'use client';

// Formulaire de connexion. Le site est statique (pas de serveur) : les comptes
// clients ne sont pas encore ouverts. A l'envoi, on le dit franchement et on
// donne les acces qui marchent deja sans compte (panier, favoris, WhatsApp).

import { chemin } from '@/app/lib/chemin';
import { useState } from 'react';

import { CONTACT } from './Footer';

export default function FormulaireConnexion() {
  const [envoye, setEnvoye] = useState(false);

  if (envoye) {
    return (
      <div className="aye-connexion-message" role="status">
        <p>
          Les comptes clients arrivent bientôt. En attendant, votre panier et vos favoris
          fonctionnent sans compte, et nous suivons vos commandes sur WhatsApp.
        </p>
        <a className="aye-bouton-noir" href={chemin('/compte/')}>Mon panier et mes favoris</a>
        <a className="aye-connexion-lien" href={CONTACT.whatsappLien} target="_blank" rel="noopener noreferrer">
          Nous écrire sur WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      className="aye-connexion-formulaire"
      onSubmit={(e) => {
        e.preventDefault();
        setEnvoye(true);
      }}
    >
      <label>
        Adresse e-mail
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Mot de passe
        <input name="motdepasse" type="password" autoComplete="current-password" required />
      </label>
      <button type="submit" className="aye-bouton-noir">Se connecter</button>
      <a className="aye-connexion-lien" href={chemin('/compte/')}>Continuer sans compte</a>
    </form>
  );
}
