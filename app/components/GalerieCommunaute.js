'use client';

// « Ils portent fierement leur Aye-Aye » (accueil) : toutes les photos de
// clients, pleine largeur, en carrousel qui glisse vers la gauche d'une photo
// toutes les 3 s, en boucle (demande du proprietaire : plus de fleches). Au
// doigt, on avance ou on recule. Chaque photo est entiere, a la meme hauteur
// (largeur selon son format) : aucune n'est rognee.
//
// La liste est rendue deux fois : arrive au debut de la seconde copie (meme
// vue que le depart), le carrousel revient sans animation au debut de la
// premiere. Les images ne sont chargees qu'a l'approche de la section, puis
// quelques photos en avance sur celle affichee.
//
// AJOUTER UNE PHOTO : la deposer dans public/assets/images/Clients/
// (Client_14.jpeg, ...), augmenter NOMBRE ci-dessous, ajouter sa ligne dans
// DIMENSIONS_PHOTOS (catalogue.js), puis node scripts/photos-reduites.mjs.
// Les photos de clients ne vont que dans cette section (ni pages modele, ni
// pages collection, ni fiches produit : demande du proprietaire).

import { useEffect, useRef, useState } from 'react';
import { chemin } from '@/app/lib/chemin';
import { dimensionsImage, photoReduite, srcsetPhoto } from '../data/catalogue';

const NOMBRE = 13;
const PHOTOS = Array.from({ length: NOMBRE }, (_, i) => chemin('/assets/images/Clients/Client_' + (i + 1) + '.jpeg'));
const DUREE = 3000;
const AVANCE = 5; // photos chargees au-dela de celle affichee
const TRANSITION = 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)';

export default function GalerieCommunaute({ facebook }) {
  const piste = useRef(null);
  const depart = useRef(null);
  const [index, setIndex] = useState(0);
  const [anime, setAnime] = useState(true);
  const [decalage, setDecalage] = useState(0);
  const [limite, setLimite] = useState(-1); // derniere photo chargee (-1 : aucune)
  const [cache, setCache] = useState(false);

  // position de la photo `index` dans la piste (largeurs variables)
  useEffect(() => {
    const maj = () => {
      const li = piste.current && piste.current.children[index];
      if (li) setDecalage(li.offsetLeft);
    };
    maj();
    window.addEventListener('resize', maj);
    return () => window.removeEventListener('resize', maj);
  }, [index, limite]);

  // chargement : a l'approche de la section, puis en avance sur le defilement
  useEffect(() => {
    const ul = piste.current;
    if (!('IntersectionObserver' in window)) {
      setLimite(NOMBRE - 1);
      return undefined;
    }
    const obs = new IntersectionObserver(([entree]) => {
      if (entree.isIntersecting) {
        setLimite((l) => Math.max(l, AVANCE));
        obs.disconnect();
      }
    }, { rootMargin: '400px 0px' });
    obs.observe(ul);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (limite >= 0) setLimite((l) => Math.max(l, (index % NOMBRE) + AVANCE));
  }, [index]); // eslint-disable-line react-hooks/exhaustive-deps

  // defilement automatique (pas dans un onglet masque, ni si le visiteur a
  // demande moins d'animations ; pas de pause au survol, comme la banniere)
  useEffect(() => {
    const surVisibilite = () => setCache(document.hidden);
    document.addEventListener('visibilitychange', surVisibilite);
    return () => document.removeEventListener('visibilitychange', surVisibilite);
  }, []);
  useEffect(() => {
    if (cache || limite < 0 || !anime) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const minuteur = setTimeout(() => setIndex((i) => i + 1), DUREE);
    return () => clearTimeout(minuteur);
  }, [index, cache, limite, anime]);

  // fin de la premiere copie atteinte : retour sans animation au debut
  const finTransition = () => {
    if (index >= NOMBRE) {
      setAnime(false);
      setIndex(index - NOMBRE);
    }
  };
  // reactive l'animation deux images apres le saut
  useEffect(() => {
    if (anime) return undefined;
    let second;
    const premier = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setAnime(true));
    });
    return () => {
      cancelAnimationFrame(premier);
      cancelAnimationFrame(second);
    };
  }, [anime]);

  // recul au doigt depuis la premiere photo : saut sans animation a la meme
  // vue dans la seconde copie, puis glissement vers la precedente
  const reculer = () => {
    if (index > 0) {
      setIndex(index - 1);
      return;
    }
    setAnime(false);
    setIndex(NOMBRE);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setAnime(true);
      setIndex(NOMBRE - 1);
    }));
  };

  return (
    <div
      className="aye-communaute-defile"
      onTouchStart={(e) => {
        depart.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (depart.current === null) return;
        const ecart = e.changedTouches[0].clientX - depart.current;
        depart.current = null;
        if (Math.abs(ecart) > 40) {
          if (ecart < 0) setIndex((i) => i + 1);
          else reculer();
        }
      }}
    >
      <ul
        className="aye-communaute-photos"
        ref={piste}
        style={{ transform: 'translateX(' + -decalage + 'px)', transition: anime ? TRANSITION : 'none' }}
        onTransitionEnd={(e) => {
          if (e.target === e.currentTarget) finTransition();
        }}
      >
        {[...PHOTOS, ...PHOTOS].map((source, k) => {
          const numero = k % NOMBRE;
          const [largeur, hauteur] = dimensionsImage(source);
          const charge = numero <= limite;
          return (
            <li key={k} aria-hidden={k >= NOMBRE ? 'true' : undefined}>
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Aye-Aye Madagascar sur Facebook"
                tabIndex={k >= NOMBRE ? -1 : undefined}
              >
                <img
                  {...(charge ? { src: photoReduite(source, 480), srcSet: srcsetPhoto(source) } : {})}
                  sizes={'(max-width: 767px) ' + Math.round(62 * largeur / hauteur) + 'vw, ' + Math.round(32 * largeur / hauteur) + 'vw'}
                  alt={k >= NOMBRE ? '' : 'Un client porte son Aye Aye'}
                  width={largeur}
                  height={hauteur}
                  decoding="async"
                  draggable="false"
                  style={{ aspectRatio: largeur + ' / ' + hauteur }}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
