'use client';

// Connexion et creation de compte avec Google ou Facebook (Firebase
// Authentication, voir app/lib/firebase-config.js), ou par e-mail.
// Le SDK Firebase n'est charge qu'au clic, depuis le CDN de Google : aucune
// page du site ne s'alourdit.

import { chemin } from '@/app/lib/chemin';
import { enregistrerCompte } from '@/app/lib/compte';
import { FIREBASE, FIREBASE_ACTIF } from '@/app/lib/firebase-config';
import { useState } from 'react';

import { CONTACT } from './Footer';

const VERSION_FIREBASE = '10.12.2';
const cdn = (module) => 'https://www.gstatic.com/firebasejs/' + VERSION_FIREBASE + '/firebase-' + module + '.js';

async function connecterAvec(fournisseur) {
  const app = await import(/* webpackIgnore: true */ /* turbopackIgnore: true */ cdn('app'));
  const auth = await import(/* webpackIgnore: true */ /* turbopackIgnore: true */ cdn('auth'));
  const instance = auth.getAuth(app.initializeApp(FIREBASE));
  const source = fournisseur === 'google' ? new auth.GoogleAuthProvider() : new auth.FacebookAuthProvider();
  const { user } = await auth.signInWithPopup(instance, source);
  enregistrerCompte({ nom: user.displayName, email: user.email, photo: user.photoURL, fournisseur });
}

function LogoGoogle() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8Z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8l4-3.1Z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9Z" />
    </svg>
  );
}

export default function FormulaireConnexion() {
  const [message, setMessage] = useState(null);
  const [attente, setAttente] = useState(null);

  async function social(fournisseur) {
    if (!FIREBASE_ACTIF) {
      setMessage('La connexion avec ' + (fournisseur === 'google' ? 'Google' : 'Facebook') + ' arrive très bientôt.');
      return;
    }
    setAttente(fournisseur);
    setMessage(null);
    try {
      await connecterAvec(fournisseur);
      window.location.href = chemin('/compte/');
    } catch (erreur) {
      setAttente(null);
      if (erreur && /popup-closed|cancelled-popup/.test(erreur.code || '')) return;
      setMessage('La connexion n’a pas abouti. Réessayez dans un instant.');
    }
  }

  return (
    <div className="aye-connexion-formulaire">
      <button type="button" className="aye-bouton-social" onClick={() => social('google')} disabled={attente !== null}>
        <LogoGoogle />
        {attente === 'google' ? 'Connexion…' : 'Continuer avec Google'}
      </button>
      <button type="button" className="aye-bouton-social" onClick={() => social('facebook')} disabled={attente !== null}>
        <span className="aye-icone-facebook" aria-hidden="true"><i className="fa fa-facebook"></i></span>
        {attente === 'facebook' ? 'Connexion…' : 'Continuer avec Facebook'}
      </button>
      <p className="aye-connexion-note">Pas encore de compte ? Il est créé à la première connexion.</p>

      <div className="aye-connexion-ou"><span>ou</span></div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setMessage('La connexion par e-mail arrive bientôt. En attendant, utilisez Google ou Facebook, ou continuez sans compte.');
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
      </form>

      {message && (
        <p className="aye-connexion-message" role="status">
          {message} Une question ?{' '}
          <a href={CONTACT.whatsappLien} target="_blank" rel="noopener noreferrer">Écrivez-nous sur WhatsApp</a>.
        </p>
      )}
      <a className="aye-connexion-lien" href={chemin('/compte/')}>Continuer sans compte</a>
    </div>
  );
}
