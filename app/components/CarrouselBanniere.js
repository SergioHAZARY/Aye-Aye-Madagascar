'use client';

// Carrousel de la banniere d'accueil : les images glissent vers la gauche
// sous le texte, qui reste fixe. Le texte est passe en `children` : il est
// dans la zone du carrousel, si bien que le glissement du doigt et le survol
// y fonctionnent aussi.
//
// Composant React plutot qu'owl-carousel : la banniere n'est pas clonee par
// owl, les gestionnaires React y fonctionnent, et chaque diapositive garde
// ses trois formats (<picture> : mobile, tablette, ordinateur) et le
// cadrage plein ecran d'aye-aye.css.
//
// - defilement toutes les 6 s vers la gauche, en pause au survol, au focus
//   clavier et quand l'onglet est masque ; aucun defilement automatique si le
//   visiteur a demande moins d'animations ;
// - points (partout) et glissement du doigt ; revenir en arriere (doigt vers
//   la droite, point precedent) fait glisser dans l'autre sens.
// Pas de fleches, a la demande de la marque.

import { useEffect, useRef, useState } from 'react';

const DUREE = 6000;
const TRANSITION = 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)';

export default function CarrouselBanniere({ diapos, children }) {
  const [actif, setActif] = useState(0);
  const [precedent, setPrecedent] = useState(null);
  const [attente, setAttente] = useState(null); // diapositive placee, prete a entrer
  const [sens, setSens] = useState(1); // 1 : vers la gauche ; -1 : vers la droite
  const [survol, setSurvol] = useState(false);
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
    if (survol || cache || nombre < 2 || attente !== null) return undefined;
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
      )}
    </div>
  );
}
