'use client';

// Galerie de la fiche produit : grande photo, colonne de vignettes a droite,
// loupe pour ouvrir la photo en grand. Les photos ne sont jamais rognees :
// elles tiennent entieres dans leur cadre.
//
// Gestionnaires React autorises ici : la fiche n'est pas dans un carrousel
// owl, donc rien n'est clone hors de l'arbre React.

import { useState } from 'react';

export default function GalerieProduit({ images, nom }) {
  const [actif, setActif] = useState(0);
  const source = images[actif];

  return (
    <div className="aye-galerie">
      <div className="aye-galerie-principale">
        <img src={source} alt={nom + ' – vue ' + (actif + 1)} width={899} height={1600} />
        <a
          className="aye-galerie-zoom"
          href={source}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Agrandir la photo"
          title="Agrandir la photo"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <line x1="15.5" y1="15.5" x2="20.5" y2="20.5" />
            <line x1="10.5" y1="7.5" x2="10.5" y2="13.5" />
            <line x1="7.5" y1="10.5" x2="13.5" y2="10.5" />
          </svg>
        </a>
      </div>

      {images.length > 1 && (
        <ul className="aye-galerie-vignettes">
          {images.map((image, index) => (
            <li key={image}>
              <button
                type="button"
                className={index === actif ? 'actif' : undefined}
                aria-label={'Voir la vue ' + (index + 1)}
                aria-current={index === actif ? 'true' : undefined}
                onClick={() => setActif(index)}
              >
                <img src={image} alt="" width={899} height={1600} loading="lazy" decoding="async" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
