// En-tete du site.
//
// A gauche, le logo officiel tel quel — la tete d'aye-aye avec le nom
// « AYE-AYE Madagascar » en dessous, tous deux dans l'image. Ni texte a
// cote, ni devise dessous (demande de la marque) : le logo seul, en grand.
//
// Menu : Accueil · Modeles · Collections · A propos · Contact, les liens texte
// du template (ul.nav). Sur mobile, c'est le menu deroulant du template : le
// bouton menu (a.menu-trigger, tout a droite de la barre) l'ouvre et le ferme,
// via custom.js.
//
// Icones recherche et compte : deux exemplaires, un seul visible (aye-aye.css) :
//   - .aye-actions-bord, au bord droit de l'ecran : grands ecrans (>= 1400 px)
//     et mobile ;
//   - li.aye-action dans le menu, apres « Contact » : de 768 a 1399 px, ou la
//     marge du .container est trop etroite pour le bord de l'ecran.
//
// Les icones sont des SVG en ligne : la police Font Awesome livree avec
// le template n'a pas les versions contour (fa-user-o s'affiche en carre vide).
// Panier et favoris : page Mon compte (icone compte).
// La loupe ouvre une barre de recherche en haut de l'ecran (RechercheRapide).
//
// Sur l'accueil mobile (classe aye-entete-sur-hero), l'en-tete est transparent
// sur le hero et passe en blanc des qu'on le quitte (aye-aye.js ajoute
// aye-entete-opaque).
//
// Les {' '} reproduisent les espaces entre elements du template : les <li> sont
// en inline-block, ces espaces sont visibles.

import { chemin } from '@/app/lib/chemin';
import { Fragment } from 'react';

import RechercheRapide from './RechercheRapide';

const TRAIT = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const LIENS = [
  { cle: 'accueil', libelle: 'Accueil', href: chemin('/') },
  { cle: 'modeles', libelle: 'Modèles', href: chemin('/modeles/') },
  { cle: 'collections', libelle: 'Collections', href: chemin('/collections/') },
  { cle: 'apropos', libelle: 'À propos', href: chemin('/about/') },
  { cle: 'contact', libelle: 'Contact', href: chemin('/contact/') },
];

const ACTIONS = [
  {
    href: chemin('/recherche/'),
    titre: 'Rechercher',
    ouvreRecherche: true, // ouvre la barre de recherche en haut (RechercheRapide)
    icone: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="6.5" {...TRAIT} />
        <line x1="15.5" y1="15.5" x2="20.5" y2="20.5" {...TRAIT} />
      </svg>
    ),
  },
  {
    href: chemin('/compte/'),
    titre: 'Mon compte',
    icone: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="8" r="4" {...TRAIT} />
        <path d="M4.5 20.5c0-4.1 3.4-6.5 7.5-6.5s7.5 2.4 7.5 6.5" {...TRAIT} />
      </svg>
    ),
  },
];

export default function Header({ actif = '' }) {
  return (
    <header className={'header-area header-sticky' + (actif === 'accueil' ? ' aye-entete-sur-hero' : '')}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              {/* ***** Logo ***** */}
              <a href={chemin('/')} className="logo aye-logo">
                <img
                  className="aye-logo-sombre"
                  src={chemin('/assets/images/logo-aye-aye.png')}
                  alt="Aye-Aye Madagascar"
                  width={275}
                  height={330}
                />
                {/* version blanche : en-tete transparent sur le hero (accueil, mobile) */}
                <img
                  className="aye-logo-clair"
                  src={chemin('/assets/images/logo-aye-aye-blanc.png')}
                  alt=""
                  width={275}
                  height={330}
                  loading="lazy"
                  decoding="async"
                />
              </a>

              {/* ***** Menu (deroulant sur mobile) ***** */}
              <ul className="nav">
                {' '}
                {LIENS.map((lien) => (
                  <Fragment key={lien.cle}>
                    <li>
                      <a href={lien.href} className={actif === lien.cle ? 'active' : undefined}>
                        {lien.libelle}
                      </a>
                    </li>
                    {' '}
                  </Fragment>
                ))}
                {ACTIONS.map((action) => (
                  <Fragment key={action.href}>
                    <li className="aye-action">
                      <a
                        href={action.href}
                        title={action.titre}
                        aria-label={action.titre}
                        {...(action.ouvreRecherche ? { 'data-ouvrir-recherche': '' } : {})}
                      >
                        {action.icone}
                        <span className="aye-action-texte">{action.titre}</span>
                      </a>
                    </li>
                    {' '}
                  </Fragment>
                ))}
              </ul>

              {/* bouton du menu deroulant (mobile), gere par custom.js */}
              <a className="menu-trigger">
                <span>Menu</span>
              </a>
            </nav>
          </div>
        </div>
      </div>


      {/* ***** Icones recherche et compte, au bord de l'ecran ***** */}
      <div className="aye-actions-bord">
        {ACTIONS.map((action) => (
          <a
            key={action.href}
            href={action.href}
            title={action.titre}
            aria-label={action.titre}
            {...(action.ouvreRecherche ? { 'data-ouvrir-recherche': '' } : {})}
          >
            {action.icone}
          </a>
        ))}
      </div>

      {/* ***** Barre de recherche (s'ouvre depuis la loupe) ***** */}
      <RechercheRapide />
    </header>
  );
}
