'use client';

import { chemin } from '@/app/lib/chemin';
import { useEffect, useState } from 'react';

import {
  EVENEMENT,
  definirQuantite,
  definirTaille,
  lirePanier,
  retirerDuPanier,
  viderPanier,
} from '../lib/panier';
import { produitParSlug, taillesDuProduit } from '../data/catalogue';
import { CONTACT } from './Footer';

export default function PanierDetail() {
  const [lignes, setLignes] = useState(null); // null = pas encore lu
  const [commande, setCommande] = useState(null);
  const [tailleManquante, setTailleManquante] = useState(false);

  useEffect(() => {
    const rafraichir = () => setLignes(lirePanier());
    rafraichir();
    window.addEventListener(EVENEMENT, rafraichir);
    window.addEventListener('storage', rafraichir);
    return () => {
      window.removeEventListener(EVENEMENT, rafraichir);
      window.removeEventListener('storage', rafraichir);
    };
  }, []);

  // Premier rendu (serveur et hydratation) : le panier vit dans le navigateur.
  if (lignes === null) {
    return <p className="aye-panier-attente">Chargement de votre panier…</p>;
  }

  const articles = lignes
    .map((ligne) => ({ ...ligne, produit: produitParSlug(ligne.slug) }))
    .filter((ligne) => ligne.produit)
    .map((ligne) => ({ ...ligne, tailles: taillesDuProduit(ligne.produit) }));

  const nombreArticles = articles.reduce((n, l) => n + l.quantite, 0);

  if (commande) {
    return (
      <div className="aye-confirmation">
        <h4>Merci {commande.nom} !</h4>
        <p>
          Votre commande de <strong>{commande.articles} article{commande.articles > 1 ? 's' : ''}</strong>{' '}
          est enregistrée.
        </p>
        <p>
          Pour la confirmer et convenir de la livraison, contactez-nous :
        </p>
        <ul>
          <li>
            WhatsApp :{' '}
            <a href={CONTACT.whatsappLien} target="_blank" rel="noopener noreferrer">
              {CONTACT.whatsapp}
            </a>
          </li>
          <li>
            Téléphone : <a href={CONTACT.telephoneLien}>{CONTACT.telephone}</a>
          </li>
          <li>
            E-mail : <a href={'mailto:' + CONTACT.email}>{CONTACT.email}</a>
          </li>
        </ul>
        <div className="main-border-button">
          <a href={chemin('/produits/')}>Continuer mes achats</a>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="aye-panier-vide">
        <p>Votre panier est vide.</p>
        <div className="main-border-button">
          <a href={chemin('/produits/')}>Voir les produits</a>
        </div>
      </div>
    );
  }

  function validerCommande(evenement) {
    evenement.preventDefault();
    // une ligne d'un produit a tailles doit avoir sa taille
    if (articles.some((l) => l.tailles.length > 0 && !l.taille)) {
      setTailleManquante(true);
      return;
    }
    const donnees = new FormData(evenement.currentTarget);
    setCommande({
      nom: donnees.get('nom'),
      articles: nombreArticles,
    });
    viderPanier();
  }

  return (
    <div className="row">
      <div className="col-lg-8">
        <table className="aye-panier-table">
          <thead>
            <tr>
              <th colSpan="2">Produit</th>
              <th>Quantité</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {articles.map(({ produit, quantite, taille, tailles }) => (
              <tr key={produit.slug + '|' + (taille || '')}>
                <td className="aye-panier-image">
                  <a href={chemin('/produit/' + produit.slug + '/')}>
                    <img src={produit.image} alt={produit.nom} width={80} height={80} />
                  </a>
                </td>
                <td>
                  <a href={chemin('/produit/' + produit.slug + '/')}>{produit.nom}</a>
                  <small>{produit.couleur}</small>
                  {tailles.length > 0 && (
                    <label
                      className={'aye-panier-taille' + (tailleManquante && !taille ? ' aye-manquante' : '')}
                    >
                      Taille
                      <select
                        value={taille || ''}
                        onChange={(e) => {
                          definirTaille(produit.slug, taille, e.target.value);
                          setTailleManquante(false);
                        }}
                      >
                        <option value="" disabled>
                          Choisir
                        </option>
                        {tailles.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </label>
                  )}
                </td>
                <td>
                  <div className="aye-quantite">
                    <button
                      type="button"
                      onClick={() => definirQuantite(produit.slug, taille, quantite - 1)}
                      aria-label="Diminuer la quantité"
                    >
                      −
                    </button>
                    <span>{quantite}</span>
                    <button
                      type="button"
                      onClick={() => definirQuantite(produit.slug, taille, quantite + 1)}
                      aria-label="Augmenter la quantité"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>
                  <button
                    type="button"
                    className="aye-retirer"
                    onClick={() => retirerDuPanier(produit.slug, taille)}
                    aria-label={'Retirer ' + produit.nom}
                  >
                    <i className="fa fa-trash-o"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="col-lg-4">
        <div className="aye-recapitulatif">
          <h4>Récapitulatif</h4>
          <p>
            <span>Articles</span>
            <strong>{nombreArticles}</strong>
          </p>
          <p>
            <span>Livraison</span>
            <strong>À convenir</strong>
          </p>

          <form onSubmit={validerCommande}>
            <fieldset>
              <input name="nom" type="text" placeholder="Votre nom" required />
            </fieldset>
            <fieldset>
              <input name="telephone" type="tel" placeholder="Votre téléphone" required />
            </fieldset>
            <fieldset>
              <input name="adresse" type="text" placeholder="Adresse de livraison" required />
            </fieldset>
            <fieldset>
              <textarea name="note" rows="3" placeholder="Précisions pour la livraison…"></textarea>
            </fieldset>
            {tailleManquante && (
              <p className="aye-erreur" role="alert">
                Choisissez une taille pour chaque article avant de valider.
              </p>
            )}
            <button type="submit" className="main-dark-button aye-bouton-large">
              Valider ma commande
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
