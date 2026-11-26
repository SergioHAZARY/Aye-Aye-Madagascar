'use client';

// « Ils portent fierement leur Aye-Aye » (accueil) : rangee de photos de
// clients, pleine largeur, qui defile de cote. Fleches ‹ › en haut a droite
// (comme demande par le proprietaire, pour pouvoir ajouter beaucoup de
// photos), glisser au doigt sur mobile. Pas dans un carrousel owl : simple
// defilement horizontal avec accroche (scroll-snap) dans aye-aye.css.
//
// AJOUTER UNE PHOTO : la deposer dans public/assets/images/Clients/
// (Client_5.jpeg, ...), ajouter son numero ci-dessous et sa ligne dans
// DIMENSIONS_PHOTOS (catalogue.js), puis node scripts/photos-reduites.mjs.

import { useEffect, useRef, useState } from 'react';
import { chemin } from '@/app/lib/chemin';
import { dimensionsImage, photoReduite, srcsetPhoto } from '../data/catalogue';

const PHOTOS = [1, 2, 3, 4];

function Chevron({ vers }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path
        d={vers === 'gauche' ? 'M15 5 8 12l7 7' : 'M9 5l7 7-7 7'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function GalerieCommunaute({ facebook }) {
  const liste = useRef(null);
  const [debut, setDebut] = useState(true);
  const [fin, setFin] = useState(false);

  // grise la fleche quand on est deja au bout
  useEffect(() => {
    const ul = liste.current;
    const maj = () => {
      setDebut(ul.scrollLeft <= 2);
      setFin(ul.scrollLeft + ul.clientWidth >= ul.scrollWidth - 2);
    };
    maj();
    ul.addEventListener('scroll', maj, { passive: true });
    window.addEventListener('resize', maj);
    return () => {
      ul.removeEventListener('scroll', maj);
      window.removeEventListener('resize', maj);
    };
  }, []);

  // une photo de plus a chaque clic
  const defiler = (sens) => {
    const ul = liste.current;
    const pas = ul.firstElementChild ? ul.firstElementChild.offsetWidth + 16 : ul.clientWidth;
    ul.scrollBy({ left: sens * pas, behavior: 'smooth' });
  };

  return (
    <>
      <div className="container aye-communaute-fleches">
        <button type="button" onClick={() => defiler(-1)} disabled={debut} aria-label="Photos précédentes">
          <Chevron vers="gauche" />
        </button>
        <button type="button" onClick={() => defiler(1)} disabled={fin} aria-label="Photos suivantes">
          <Chevron vers="droite" />
        </button>
      </div>
      <ul className="aye-communaute-photos" ref={liste}>
        {PHOTOS.map((numero) => {
          const source = chemin('/assets/images/Clients/Client_' + numero + '.jpeg');
          const [largeur, hauteur] = dimensionsImage(source);
          return (
            <li key={numero}>
              <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Aye-Aye Madagascar sur Facebook">
                <img
                  src={photoReduite(source, 480)}
                  srcSet={srcsetPhoto(source)}
                  sizes="(max-width: 767px) 50vw, 26vw"
                  alt="Un client porte son Aye Aye"
                  width={largeur}
                  height={hauteur}
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                />
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
