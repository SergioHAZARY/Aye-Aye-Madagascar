'use client';

import { useEffect, useMemo, useState } from 'react';

import FicheProduit from './FicheProduit';
import { rechercherProduits } from '../data/catalogue';

export default function Recherche() {
  const [requete, setRequete] = useState('');

  // Permet d'arriver depuis un lien /recherche/?q=...
  useEffect(() => {
    const parametres = new URLSearchParams(window.location.search);
    const q = parametres.get('q');
    if (q) setRequete(q);
  }, []);

  const resultats = useMemo(() => rechercherProduits(requete), [requete]);

  return (
    <>
      <form className="aye-recherche" onSubmit={(e) => e.preventDefault()} role="search">
        <fieldset>
          <input
            type="search"
            value={requete}
            onChange={(e) => setRequete(e.target.value)}
            placeholder="Que cherchez-vous ? (t-shirt, rouge, enfant…)"
            aria-label="Rechercher un produit"
            autoFocus
          />
        </fieldset>
      </form>

      {requete.trim().length < 2 && (
        <p className="aye-recherche-aide">Saisissez au moins deux lettres pour lancer la recherche.</p>
      )}

      {requete.trim().length >= 2 && resultats.length === 0 && (
        <p className="aye-recherche-aide">
          Aucun produit ne correspond à « {requete} ». Essayez « manches longues », « rouge » ou
          « accessoires ».
        </p>
      )}

      {resultats.length > 0 && (
        <>
          <div className="section-heading">
            <h2>
              {resultats.length} résultat{resultats.length > 1 ? 's' : ''}
            </h2>
          </div>
          <div className="row">
            {resultats.map((produit) => (
              <div className="col-lg-4 col-md-6" key={produit.slug}>
                <FicheProduit produit={produit} differer={false} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
