'use client';

// Grille de photos (entieres, en colonnes) d'une page modele ou collection.
// Un clic agrandit la photo dans une fenetre (<dialog>) : fleches, clavier
// (← → Echap) et glissement du doigt pour passer d'une photo a l'autre. Sans
// JavaScript, le lien ouvre simplement la grande photo.

import { chemin } from '@/app/lib/chemin';
import { useEffect, useRef, useState } from 'react';

const dossier = chemin('/assets/images/galerie/');
const grande = (p) => dossier + '1600/' + p.id + '.jpg';

export default function GaleriePhotos({ photos }) {
  const [index, setIndex] = useState(null);
  const boite = useRef(null);
  const toucher = useRef(null);
  const aller = (pas) => setIndex((i) => (i + pas + photos.length) % photos.length);

  useEffect(() => {
    const d = boite.current;
    if (index === null) {
      if (d.open) d.close();
      return undefined;
    }
    if (!d.open) d.showModal();
    const touche = (e) => {
      if (e.key === 'ArrowRight') aller(1);
      if (e.key === 'ArrowLeft') aller(-1);
    };
    document.addEventListener('keydown', touche);
    return () => document.removeEventListener('keydown', touche);
  }, [index]); // eslint-disable-line react-hooks/exhaustive-deps

  const photo = index === null ? null : photos[index];

  return (
    <>
      <div className="aye-mur">
        {photos.map((p, i) => (
          <a
            key={p.id}
            href={grande(p)}
            className="aye-galerie-photo"
            onClick={(e) => { e.preventDefault(); setIndex(i); }}
          >
            <img
              src={dossier + '480/' + p.id + '.jpg'}
              srcSet={dossier + '480/' + p.id + '.jpg 480w, ' + grande(p) + ' ' + p.width + 'w'}
              sizes="(max-width: 767px) 50vw, (max-width: 1199px) 33vw, 25vw"
              alt={p.alt}
              width={p.width}
              height={p.height}
              loading={i < 4 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </a>
        ))}
      </div>

      <dialog
        ref={boite}
        className="aye-visionneuse"
        onClose={() => setIndex(null)}
        onClick={(e) => { if (e.target === e.currentTarget) setIndex(null); }}
        onTouchStart={(e) => { toucher.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - toucher.current;
          if (Math.abs(dx) > 50) aller(dx < 0 ? 1 : -1);
        }}
      >
        {photo && (
          <>
            <img src={grande(photo)} alt={photo.alt} width={photo.width} height={photo.height} />
            <p className="aye-visionneuse-legende">
              {photo.alt} <span>{index + 1} / {photos.length}</span>
            </p>
            <button type="button" className="aye-visionneuse-fermer" aria-label="Fermer" onClick={() => setIndex(null)}>×</button>
            {photos.length > 1 && (
              <>
                <button type="button" className="aye-visionneuse-prec" aria-label="Photo précédente" onClick={() => aller(-1)}>‹</button>
                <button type="button" className="aye-visionneuse-suiv" aria-label="Photo suivante" onClick={() => aller(1)}>›</button>
              </>
            )}
          </>
        )}
      </dialog>
    </>
  );
}
