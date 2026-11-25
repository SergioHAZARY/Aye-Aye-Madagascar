'use client';

// Formulaire « Ecrivez-nous » : le message part directement par e-mail vers
// CONTACT.email, par FormSubmit (formsubmit.co, gratuit, sans serveur a nous).
// La toute premiere fois, FormSubmit envoie a cette adresse un e-mail
// d'activation : il suffit de cliquer sur son lien une fois, ensuite tous les
// messages arrivent. Si l'envoi echoue (pas encore active, pas de reseau),
// la messagerie du visiteur s'ouvre avec le message deja rempli.
//
// Avant, le formulaire etait envoye a une adresse mailto: : le navigateur
// affichait « les informations ne sont pas securisees » et rien ne partait.

import { useState } from 'react';

import { CONTACT } from './Footer';

// TEMPORAIRE (test d'envoi, demande du proprietaire) : les messages partent
// vers harold.josoa@gmail.com. Remettre CONTACT.email une fois le test fait.
const DESTINATAIRE = 'harold.josoa@gmail.com';
const ADRESSE_ENVOI = 'https://formsubmit.co/ajax/' + DESTINATAIRE;

function ouvrirMessagerie({ nom, email, message }) {
  const corps = message + '\n\n' + nom + ' — ' + email;
  window.location.href = 'mailto:' + DESTINATAIRE
    + '?subject=' + encodeURIComponent('Message de ' + nom + ' (site Aye-Aye Madagascar)')
    + '&body=' + encodeURIComponent(corps);
}

export default function FormulaireContact() {
  const [etat, setEtat] = useState('pret'); // pret | envoi | envoye | secours

  async function envoyer(e) {
    e.preventDefault();
    const donnees = new FormData(e.currentTarget);
    const champs = {
      nom: String(donnees.get('nom')).trim(),
      email: String(donnees.get('email')).trim(),
      message: String(donnees.get('message')).trim(),
    };
    setEtat('envoi');
    try {
      const reponse = await fetch(ADRESSE_ENVOI, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          nom: champs.nom,
          email: champs.email,
          message: champs.message,
          _replyto: champs.email,
          _subject: 'Nouveau message de ' + champs.nom + ' (site Aye-Aye Madagascar)',
          _template: 'table',
          _captcha: 'false',
        }),
      });
      const resultat = await reponse.json().catch(() => ({}));
      if (reponse.ok && String(resultat.success) === 'true') {
        setEtat('envoye');
        e.target.reset();
        return;
      }
      throw new Error(resultat.message || 'envoi refuse');
    } catch {
      setEtat('secours');
      ouvrirMessagerie(champs);
    }
  }

  if (etat === 'envoye') {
    return (
      <div className="aye-contact-merci" role="status">
        <h4>Merci, votre message est envoyé.</h4>
        <p>Nous vous répondons au plus vite à l’adresse indiquée.</p>
        <button type="button" className="main-dark-button" onClick={() => setEtat('pret')}>
          Écrire un autre message
        </button>
      </div>
    );
  }

  return (
    <form id="contact" onSubmit={envoyer}>
      <div className="row">
        <div className="col-lg-6">
          <fieldset>
            <input name="nom" type="text" id="contact-nom" placeholder="Votre nom" autoComplete="name" required />
          </fieldset>
        </div>
        <div className="col-lg-6">
          <fieldset>
            <input name="email" type="email" id="contact-email" placeholder="Votre adresse e-mail" autoComplete="email" required />
          </fieldset>
        </div>
        <div className="col-lg-12">
          <fieldset>
            <textarea name="message" rows="6" id="contact-message" placeholder="Votre message" required></textarea>
          </fieldset>
        </div>
        <div className="col-lg-12">
          <fieldset>
            <button type="submit" className="main-dark-button" disabled={etat === 'envoi'}>
              <i className="fa fa-paper-plane"></i> {etat === 'envoi' ? 'Envoi…' : 'Envoyer'}
            </button>
          </fieldset>
          {etat === 'secours' && (
            <p className="aye-contact-secours" role="status">
              L’envoi direct n’a pas abouti : votre messagerie s’est ouverte avec le message déjà rempli.
              Vous pouvez aussi nous écrire sur{' '}
              <a href={CONTACT.whatsappLien} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
