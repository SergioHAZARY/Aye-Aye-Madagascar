'use client';

// Connexion et creation de compte : Google, Facebook ou e-mail et mot de
// passe, par Firebase Authentication (voir app/lib/firebase-config.js).
// Le SDK Firebase n'est charge qu'a la premiere action, depuis le CDN de
// Google : aucune page du site ne s'alourdit.

import { chemin } from '@/app/lib/chemin';
import { enregistrerCompte } from '@/app/lib/compte';
import { FIREBASE, FIREBASE_ACTIF } from '@/app/lib/firebase-config';
import { useState } from 'react';

import { CONTACT } from './Footer';

const VERSION_FIREBASE = '10.12.2';
const cdn = (module) => 'https://www.gstatic.com/firebasejs/' + VERSION_FIREBASE + '/firebase-' + module + '.js';

let firebase = null; // { auth, instance }, charge une seule fois
async function chargerFirebase() {
  if (!firebase) {
    const app = await import(/* webpackIgnore: true */ /* turbopackIgnore: true */ cdn('app'));
    const auth = await import(/* webpackIgnore: true */ /* turbopackIgnore: true */ cdn('auth'));
    firebase = { auth, instance: auth.getAuth(app.initializeApp(FIREBASE)) };
  }
  return firebase;
}

function retenir(user, fournisseur) {
  enregistrerCompte({ nom: user.displayName, email: user.email, photo: user.photoURL, fournisseur });
}

// messages Firebase (codes auth/...) en francais
const ERREURS = {
  'auth/invalid-credential': 'Adresse e-mail ou mot de passe incorrect.',
  'auth/wrong-password': 'Adresse e-mail ou mot de passe incorrect.',
  'auth/user-not-found': 'Aucun compte avec cette adresse : créez-en un.',
  'auth/email-already-in-use': 'Un compte existe déjà avec cette adresse : connectez-vous.',
  'auth/weak-password': 'Le mot de passe doit faire au moins 6 caractères.',
  'auth/invalid-email': 'Cette adresse e-mail n’est pas valide.',
  'auth/too-many-requests': 'Trop d’essais. Réessayez dans quelques minutes.',
  'auth/account-exists-with-different-credential': 'Cette adresse est déjà liée à une autre méthode de connexion.',
  'auth/network-request-failed': 'Connexion internet interrompue. Réessayez.',
};

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
  const [mode, setMode] = useState('connexion'); // 'connexion' | 'creation'
  const [message, setMessage] = useState(null);
  const [attente, setAttente] = useState(null);

  function pasEncore() {
    setMessage('La connexion aux comptes clients arrive très bientôt.');
  }

  async function agir(nom, action) {
    if (!FIREBASE_ACTIF) return pasEncore();
    setAttente(nom);
    setMessage(null);
    try {
      const { auth, instance } = await chargerFirebase();
      const fini = await action(auth, instance);
      if (fini !== false) window.location.href = chemin('/compte/');
      else setAttente(null);
    } catch (erreur) {
      setAttente(null);
      const code = (erreur && erreur.code) || '';
      if (/popup-closed|cancelled-popup/.test(code)) return undefined;
      setMessage(ERREURS[code] || 'La connexion n’a pas abouti. Réessayez dans un instant.');
    }
    return undefined;
  }

  const social = (fournisseur) => agir(fournisseur, async (auth, instance) => {
    const source = fournisseur === 'google' ? new auth.GoogleAuthProvider() : new auth.FacebookAuthProvider();
    const { user } = await auth.signInWithPopup(instance, source);
    retenir(user, fournisseur);
  });

  function envoyer(e) {
    e.preventDefault();
    const donnees = new FormData(e.currentTarget);
    const email = String(donnees.get('email')).trim();
    const motdepasse = String(donnees.get('motdepasse'));
    agir('email', async (auth, instance) => {
      if (mode === 'creation') {
        const { user } = await auth.createUserWithEmailAndPassword(instance, email, motdepasse);
        const nom = String(donnees.get('nom') || '').trim();
        if (nom) await auth.updateProfile(user, { displayName: nom });
        retenir({ ...user, displayName: nom || user.displayName, email: user.email, photoURL: user.photoURL }, 'email');
      } else {
        const { user } = await auth.signInWithEmailAndPassword(instance, email, motdepasse);
        retenir(user, 'email');
      }
    });
  }

  function oubli(e) {
    const formulaire = e.currentTarget.closest('.aye-connexion-formulaire').querySelector('form');
    const email = formulaire.email.value.trim();
    if (!email) {
      setMessage('Saisissez d’abord votre adresse e-mail, puis cliquez à nouveau sur « Mot de passe oublié ».');
      return;
    }
    agir('oubli', async (auth, instance) => {
      await auth.sendPasswordResetEmail(instance, email);
      setMessage('Un e-mail pour choisir un nouveau mot de passe vient d’être envoyé à ' + email + '.');
      return false;
    });
  }

  const creation = mode === 'creation';

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

      <form onSubmit={envoyer}>
        {creation && (
          <label>
            Prénom et nom
            <input name="nom" type="text" autoComplete="name" />
          </label>
        )}
        <label>
          Adresse e-mail
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          Mot de passe
          <input
            name="motdepasse"
            type="password"
            autoComplete={creation ? 'new-password' : 'current-password'}
            minLength={6}
            required
          />
        </label>
        <button type="submit" className="aye-bouton-noir" disabled={attente !== null}>
          {attente === 'email' ? 'Un instant…' : creation ? 'Créer mon compte' : 'Se connecter'}
        </button>
      </form>

      <p className="aye-connexion-bascule">
        {creation ? 'Déjà un compte ? ' : 'Pas encore de compte ? '}
        <button type="button" onClick={() => { setMode(creation ? 'connexion' : 'creation'); setMessage(null); }}>
          {creation ? 'Se connecter' : 'Créer un compte'}
        </button>
        {!creation && (
          <>
            {' · '}
            <button type="button" onClick={oubli} disabled={attente !== null}>Mot de passe oublié</button>
          </>
        )}
      </p>

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
