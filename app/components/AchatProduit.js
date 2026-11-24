'use client';

// Choix de la taille et ajout au panier, sur la fiche produit.
//
// Le bouton reste gris tant qu'aucune taille n'est choisie ; un clic dans cet
// etat le signale au lieu d'ajouter. Sans tailles (accessoires), il est actif
// d'emblee. `children` s'insere entre les tailles et le bouton (guide des
// tailles).
//
// Gestionnaires React autorises ici : la fiche n'est pas dans un carrousel.

import { useState } from 'react';

import { ajouterAuPanier } from '../lib/panier';

export default function AchatProduit({ slug, tailles, children }) {
  const [taille, setTaille] = useState(null);
  const [erreur, setErreur] = useState(false);
  const pret = tailles.length === 0 || Boolean(taille);

  function ajouter() {
    if (!pret) {
      setErreur(true);
      return;
    }
    ajouterAuPanier(slug, 1, taille);
    window.location.href = '/checkout/';
  }

  return (
    <>
      {tailles.length > 0 && (
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
                onClick={() => {
                  setTaille(t);
                  setErreur(false);
                }}
              >
                {t}
              </button>
            ))}
          </div>
          {erreur && (
            <p className="aye-erreur" role="alert">
              Choisissez votre taille.
            </p>
          )}
        </div>
      )}

      {children}

      <button
        type="button"
        className={'aye-fiche-ajout' + (pret ? ' pret' : '')}
        onClick={ajouter}
      >
        Ajouter au panier
      </button>
    </>
  );
}
