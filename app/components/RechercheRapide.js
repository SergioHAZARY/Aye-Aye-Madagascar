'use client';

// Barre de recherche qui descend en haut de l'ecran, a la place de l'en-tete,
// quand on touche la loupe (mobile et ordinateur). Les liens loupe gardent
// href="/recherche/" (sans JavaScript, on arrive sur la page) et portent
// data-ouvrir-recherche : un ecouteur delegue sur document ouvre la barre.
//
// Resultats pendant la frappe (6 au plus), « Voir tous les resultats » et
// Entree menent a /recherche/?q=… Fermeture : croix, Echap ou voile.
//
// Le champ reste dans le DOM, transparent, quand la barre est fermee : on peut
// ainsi lui donner le focus pendant le clic lui-meme, seule facon d'ouvrir le
// clavier sur iPhone.

import { chemin } from '@/app/lib/chemin';
import { useEffect, useRef, useState } from 'react';

import { rechercherProduits } from '../data/catalogue';

const TRAIT = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' };
const MAX_SUGGESTIONS = 6;

export default function RechercheRapide() {
  const [ouvert, setOuvert] = useState(false);
  const [requete, setRequete] = useState('');
  const champ = useRef(null);

  useEffect(() => {
    function auClic(evenement) {
      const lien = evenement.target.closest('[data-ouvrir-recherche]');
      if (!lien) return;
      evenement.preventDefault();
      if (champ.current) champ.current.focus({ preventScroll: true });
      setOuvert(true);
    }
    function auClavier(evenement) {
      if (evenement.key === 'Escape') setOuvert(false);
    }
    document.addEventListener('click', auClic);
    document.addEventListener('keydown', auClavier);
    return () => {
      document.removeEventListener('click', auClic);
      document.removeEventListener('keydown', auClavier);
    };
  }, []);

  // page figee derriere la barre ouverte
  useEffect(() => {
    document.documentElement.classList.toggle('aye-sans-defilement', ouvert);
    if (!ouvert && champ.current) champ.current.blur();
  }, [ouvert]);

  const terme = requete.trim();
  const resultats = rechercherProduits(requete);
  const lienTout = chemin('/recherche/?q=' + encodeURIComponent(terme));

  function valider(evenement) {
    evenement.preventDefault();
    if (terme.length >= 2) window.location.href = lienTout;
  }

  return (
    <div className={'aye-recherche-rapide' + (ouvert ? ' ouverte' : '')} aria-hidden={!ouvert}>
      <div className="aye-recherche-voile" onClick={() => setOuvert(false)}></div>

      <div className="aye-recherche-panneau" role="dialog" aria-modal="true" aria-label="Rechercher">
        <form className="aye-recherche-barre" role="search" onSubmit={valider}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" {...TRAIT} />
            <line x1="15.5" y1="15.5" x2="20.5" y2="20.5" {...TRAIT} />
          </svg>
          <input
            ref={champ}
            type="search"
            value={requete}
            onChange={(e) => setRequete(e.target.value)}
            placeholder="Que cherchez-vous ? (t-shirt, rouge, enfant…)"
            aria-label="Rechercher un produit"
            enterKeyHint="search"
            tabIndex={ouvert ? 0 : -1}
          />
          <button
            type="button"
            className="aye-recherche-fermer"
            aria-label="Fermer la recherche"
            tabIndex={ouvert ? 0 : -1}
            onClick={() => setOuvert(false)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <line x1="6" y1="6" x2="18" y2="18" {...TRAIT} />
              <line x1="18" y1="6" x2="6" y2="18" {...TRAIT} />
            </svg>
          </button>
        </form>

        {terme.length >= 2 && (
          <div className="aye-recherche-suggestions">
            {resultats.length === 0 ? (
              <p className="aye-recherche-vide">
                Aucun produit ne correspond à « {terme} ». Essayez « manches longues », « rouge » ou
                « accessoires ».
              </p>
            ) : (
              <>
                <ul>
                  {resultats.slice(0, MAX_SUGGESTIONS).map((produit) => (
                    <li key={produit.slug}>
                      <a href={chemin('/produit/' + produit.slug + '/')}>
                        <img src={produit.image} alt="" width={899} height={1600} loading="lazy" decoding="async" />
                        <span>
                          <strong>{produit.nom}</strong>
                          <small>{produit.couleur}</small>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <a className="aye-recherche-tout" href={lienTout}>
                  Voir tous les résultats ({resultats.length})
                </a>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
