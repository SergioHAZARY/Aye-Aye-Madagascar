'use client';

// Carrousel de la banniere d'accueil : les images defilent en fondu sous le
// texte, qui reste fixe. Le texte est passe en `children` : il est dans la
// zone du carrousel, si bien que le glissement du doigt et le survol y
// fonctionnent aussi.
//
// Composant React plutot qu'owl-carousel : la banniere n'est pas clonee par
// owl, les gestionnaires React y fonctionnent, et chaque diapositive garde
// ses trois formats (<picture> : mobile, tablette, ordinateur) et le
// cadrage plein ecran d'aye-aye.css.
//
// - defilement toutes les 6 s, en pause au survol, au focus clavier et quand
//   l'onglet est masque ; aucun defilement automatique si le visiteur a
//   demande moins d'animations ;
// - fleches (ordinateur), points (partout), glissement du doigt (tactile).

import { useEffect, useRef, useState } from 'react';

const DUREE = 6000;

function Chevron({ sens }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <polyline points={sens === 'gauche' ? '15 5 8 12 15 19' : '9 5 16 12 9 19'} />
    </svg>
  );
}

export default function CarrouselBanniere({ diapos, children }) {
  const [actif, setActif] = useState(0);
  const [survol, setSurvol] = useState(false);
  const [cache, setCache] = useState(false);
  const depart = useRef(null);
  const nombre = diapos.length;

  const aller = (index) => setActif(((index % nombre) + nombre) % nombre);

  // defilement automatique
  useEffect(() => {
    if (survol || cache || nombre < 2) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const minuteur = setTimeout(() => setActif((a) => (a + 1) % nombre), DUREE);
    return () => clearTimeout(minuteur);
  }, [actif, survol, cache, nombre]);

  // pas de defilement dans un onglet masque
  useEffect(() => {
    const surVisibilite = () => setCache(document.hidden);
    document.addEventListener('visibilitychange', surVisibilite);
    return () => document.removeEventListener('visibilitychange', surVisibilite);
  }, []);

  return (
    <div
      className="aye-diapos"
      role="region"
      aria-roledescription="carrousel"
      aria-label="Bannière"
      onMouseEnter={() => setSurvol(true)}
      onMouseLeave={() => setSurvol(false)}
      onFocus={() => setSurvol(true)}
      onBlur={() => setSurvol(false)}
      onTouchStart={(e) => {
        depart.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (depart.current === null) return;
        const ecart = e.changedTouches[0].clientX - depart.current;
        depart.current = null;
        if (Math.abs(ecart) > 40) aller(actif + (ecart < 0 ? 1 : -1));
      }}
    >
      {diapos.map((diapo, index) => (
        <picture
          key={diapo.large}
          className={'aye-diapo' + (index === actif ? ' actif' : '')}
          aria-hidden={index === actif ? undefined : 'true'}
          style={{ '--aye-position': diapo.position }}
        >
          <source media="(max-width: 767px)" srcSet={diapo.mobile} width={800} height={1500} />
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

      {nombre > 1 && (
        <>
          <button type="button" className="aye-diapos-fleche aye-diapos-precedente" onClick={() => aller(actif - 1)} aria-label="Image précédente">
            <Chevron sens="gauche" />
          </button>
          <button type="button" className="aye-diapos-fleche aye-diapos-suivante" onClick={() => aller(actif + 1)} aria-label="Image suivante">
            <Chevron sens="droite" />
          </button>
          <div className="aye-diapos-points">
            {diapos.map((diapo, index) => (
              <button
                type="button"
                key={diapo.large}
                className={index === actif ? 'actif' : undefined}
                aria-label={'Image ' + (index + 1) + ' sur ' + nombre}
                aria-current={index === actif ? 'true' : undefined}
                onClick={() => aller(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
