'use client';

// Galerie de la fiche produit : grande photo, colonne de vignettes a droite,
// loupe pour ouvrir la photo en grand. Les photos ne sont jamais rognees :
// elles tiennent entieres dans leur cadre. `images` : liste preparee par la
// page produit ({cle, vignette, src, srcSet, zoom, width, height, alt}).
//
// Gestionnaires React autorises ici : la fiche n'est pas dans un carrousel
// owl, donc rien n'est clone hors de l'arbre React.

import { useState } from 'react';

export default function GalerieProduit({ images }) {
  const [actif, setActif] = useState(0);
  const photo = images[actif];

  return (
    <div className="aye-galerie">
      <div className="aye-galerie-principale">
        {/* 640 px de haut (520 px sous 992 px) : ~360 / ~292 px de large */}
        <img
          src={photo.src}
          srcSet={photo.srcSet}
          sizes="(max-width: 991px) 292px, 360px"
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
        />
        <a
          className="aye-galerie-zoom"
          href={photo.zoom}
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
            <li key={image.cle}>
              <button
                type="button"
                className={index === actif ? 'actif' : undefined}
                aria-label={'Voir la vue ' + (index + 1)}
                aria-current={index === actif ? 'true' : undefined}
                onClick={() => setActif(index)}
              >
                <img src={image.vignette} alt="" width={image.width} height={image.height} loading="lazy" decoding="async" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
