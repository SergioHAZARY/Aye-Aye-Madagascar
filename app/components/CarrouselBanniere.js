'use client';

// Carrousel de la banniere d'accueil : les images glissent vers la gauche
// sous le texte, qui reste fixe. Le texte est passe en `children` : il est
// dans la zone du carrousel, si bien que le glissement du doigt y fonctionne
// aussi.
//
// Composant React plutot qu'owl-carousel : la banniere n'est pas clonee par
// owl, les gestionnaires React y fonctionnent, et chaque diapositive garde
// ses trois formats (<picture> : mobile, tablette, ordinateur) et le
// cadrage plein ecran d'aye-aye.css.
//
// - defilement infini toutes les 6 s vers la gauche (apres la derniere image,
//   la premiere revient par la droite), sans pause au survol, a la demande de
//   la marque ; seulement suspendu quand l'onglet est masque, et absent si le
//   visiteur a demande moins d'animations ;
// - glissement du doigt (tactile) ; vers la droite, l'image precedente revient
//   par la gauche.
// Ni fleches ni points, a la demande de la marque.

import { useEffect, useRef, useState } from 'react';

const DUREE = 6000;
const TRANSITION = 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)';

export default function CarrouselBanniere({ diapos, children }) {
  const [actif, setActif] = useState(0);
  const [precedent, setPrecedent] = useState(null);
  const [attente, setAttente] = useState(null); // diapositive placee, prete a entrer
  const [sens, setSens] = useState(1); // 1 : vers la gauche ; -1 : vers la droite
  const [cache, setCache] = useState(false);
  const depart = useRef(null);
  const nombre = diapos.length;

  // 1er temps : la diapositive cible se place, sans animation, du cote d'ou
  // elle va entrer ; 2e temps (deux images plus tard) : elle glisse.
  const aller = (index, direction) => {
    const cible = ((index % nombre) + nombre) % nombre;
    if (cible === actif || attente !== null) return;
    setSens(direction ?? (cible > actif ? 1 : -1));
    setAttente(cible);
  };

  useEffect(() => {
    if (attente === null) return undefined;
    let second;
    const premier = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => {
        setPrecedent(actif);
        setActif(attente);
        setAttente(null);
      });
    });
    return () => {
      cancelAnimationFrame(premier);
      cancelAnimationFrame(second);
    };
  }, [attente, actif]);

  // defilement automatique, toujours vers la gauche
  useEffect(() => {
    if (cache || nombre < 2 || attente !== null) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const minuteur = setTimeout(() => aller(actif + 1, 1), DUREE);
    return () => clearTimeout(minuteur);
  });

  // pas de defilement dans un onglet masque
  useEffect(() => {
    const surVisibilite = () => setCache(document.hidden);
    document.addEventListener('visibilitychange', surVisibilite);
    return () => document.removeEventListener('visibilitychange', surVisibilite);
  }, []);

  function placement(index) {
    if (index === actif) return { transform: 'translateX(0)', transition: TRANSITION };
    if (index === attente) return { transform: 'translateX(' + (sens > 0 ? 100 : -100) + '%)', transition: 'none' };
    if (index === precedent) return { transform: 'translateX(' + (sens > 0 ? -100 : 100) + '%)', transition: TRANSITION };
    return { transform: 'translateX(100%)', transition: 'none' };
  }

  return (
    <div
      className="aye-diapos"
      role="region"
      aria-roledescription="carrousel"
      aria-label="Bannière"
      onTouchStart={(e) => {
        depart.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (depart.current === null) return;
        const ecart = e.changedTouches[0].clientX - depart.current;
        depart.current = null;
        if (Math.abs(ecart) > 40) aller(actif + (ecart < 0 ? 1 : -1), ecart < 0 ? 1 : -1);
      }}
    >
      {diapos.map((diapo, index) => (
        <picture
          key={diapo.large}
          className={'aye-diapo' + (index === actif ? ' actif' : '')}
          aria-hidden={index === actif ? undefined : 'true'}
          style={{ '--aye-position': diapo.position, ...placement(index) }}
        >
          {/* portrait plein ecran : telephone, et tablette tenue verticalement */}
          <source
            media="(max-width: 767px), (max-width: 991px) and (orientation: portrait)"
            srcSet={diapo.mobile}
            width={800}
            height={1500}
          />
          <source media="(min-width: 992px)" srcSet={diapo.large} width={1760} height={800} />
          <img
            src={diapo.tablette}
            alt={diapo.alt}
            width={1050}
            height={700}
            {...(index === 0 ? { fetchPriority: 'high' } : { loading: 'lazy', decoding: 'async' })}
          />
        </picture>
      ))}

      {children}

    </div>
  );
}
