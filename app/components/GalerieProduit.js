'use client';

// Galerie de la fiche produit : grande photo, colonne de vignettes a droite,
// loupe pour ouvrir la photo en grand. La grande photo remplit son cadre
// (5:6, 1:1 a partir de 1600 px) avec sa version au fond prolonge
// (fiche/, scripts/photos-cadrees.mjs) : entiere, jamais rognee. `images` :
// liste preparee par la page produit ({cle, vignette, fiche, zoom, alt}).
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
        {/* key : la photo est remontee a chaque changement, son fondu rejoue */}
        <picture key={photo.cle}>
          <source media="(min-width: 1600px)" srcSet={photo.fiche + '11/960/' + photo.cle + '.jpg'} width={960} height={960} />
          <img
            src={photo.fiche + '56/600/' + photo.cle + '.jpg'}
            srcSet={photo.fiche + '56/600/' + photo.cle + '.jpg 600w, ' + photo.fiche + '56/960/' + photo.cle + '.jpg 960w'}
            sizes="(max-width: 991px) 100vw, 50vw"
            alt={photo.alt}
            width={960}
            height={1152}
          />
        </picture>
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
