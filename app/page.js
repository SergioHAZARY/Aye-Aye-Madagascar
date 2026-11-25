import { chemin } from '@/app/lib/chemin';
import { Fragment } from 'react';
import CarrouselBanniere from './components/CarrouselBanniere';
import Header from './components/Header';
import SectionHistoire from './components/SectionHistoire';
import SectionUnivers from './components/SectionUnivers';
import SectionVedette from './components/SectionVedette';
import { CONTACT } from './components/Footer';

export const metadata = {
  title: 'Aye-Aye Madagascar',
};

// Diapositives de la banniere (scripts/photos-cadrees.mjs) : chacune en trois
// formats. `position` : centre du personnage dans l'image panoramique, repris
// par object-position (aye-aye.css).
const IMG = (nom) => chemin('/assets/images/banniere/' + nom);
const DIAPOS = [
  {
    mobile: IMG('principale-mobile.jpg'), tablette: IMG('principale-tablette.jpg'), large: IMG('principale-large.jpg'),
    alt: 'Manches longues Antsatsaka écru, coton 100 %', position: '65%',
  },
  {
    mobile: IMG('diapo-2-mobile.jpg'), tablette: IMG('diapo-2-tablette.jpg'), large: IMG('diapo-2-large.jpg'),
    alt: 'Tee-shirt Dauphins rouge, vue de face', position: '68%',
  },
  {
    mobile: IMG('diapo-3-mobile.jpg'), tablette: IMG('diapo-3-tablette.jpg'), large: IMG('diapo-3-large.jpg'),
    alt: 'Tee-shirt Djembe noir, vue de face', position: '68%',
  },
];

// Points forts, sous « Decouvrez » (icones au trait, noires).
const TRAIT = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
const ATOUTS = [
  {
    titre: 'Qualité premium',
    texte: 'Des produits de qualité supérieure.',
    icone: (
      <>
        <circle cx="12" cy="9" r="6" {...TRAIT} />
        <path d="M8.6 13.8 7.5 21l4.5-2.5 4.5 2.5-1.1-7.2" {...TRAIT} />
      </>
    ),
  },
  {
    titre: 'Tissu 100 % coton',
    texte: 'Le confort avant tout.',
    icone: (
      <>
        <path d="M5 19C5 10.5 10.5 5 19.5 4.5 19 13.5 13.5 19 5 19Z" {...TRAIT} />
        <path d="M5 19 13 11" {...TRAIT} />
      </>
    ),
  },
  {
    titre: 'Imprimé à Madagascar',
    texte: 'Chaque pièce est imprimée localement.',
    icone: (
      <>
        <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" {...TRAIT} />
        <circle cx="12" cy="10" r="2.3" {...TRAIT} />
      </>
    ),
  },
  {
    titre: 'Identité malagasy',
    texte: 'Notre culture dans chaque création.',
    icone: <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" {...TRAIT} />,
  },
];

// Mots du bandeau defilant, sous « Nos univers ».
const BANDEAU = ['Authentique', 'Nature', 'Qualité', '100\u00a0% coton', 'Imprimé à Madagascar'];

// Onglets sous le hero, sur mobile.
const ONGLETS = [
  { href: chemin('/produits/'), libelle: 'Tout' },
  { href: chemin('/homme/'), libelle: 'Homme' },
  { href: chemin('/femme/'), libelle: 'Femme' },
  { href: chemin('/enfant/'), libelle: 'Enfant' },
  { href: chemin('/modeles/'), libelle: 'Modèles' },
  { href: chemin('/collections/'), libelle: 'Collections' },
];

export default function PageAccueil() {
  return (
    <>
      <Header actif="accueil" surBanniere />

      {/* ***** Bannière ***** : une seule, pleine largeur (les tuiles
          Homme / Femme / Enfant ont ete retirees a la demande de
          la marque) */}
      <div className="main-banner" id="top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="left-content">
                <div className="thumb">
                  {/* carrousel : mobile portrait plein ecran ; tablette 3:2 ;
                      ordinateur panoramique pleine largeur */}
                  <CarrouselBanniere diapos={DIAPOS}>
                    <div className="inner-content">
                      {/* texte de la banniere fourni par la marque (le slogan du pied
                          de page, MARQUE.slogan, reste « Porter … ») ; espaces
                          insecables avant « ! » et « : » */}
                      <h4>Portez votre culture avec fierté{' '}!</h4>
                      <span>
                        Des vêtements 100{' '}% coton qui racontent Madagascar{' '}: sa
                        nature, ses symboles, son âme.
                      </span>
                      <div className="main-border-button">
                        <a href={chemin('/collections/')}>Découvrir nos collections</a>
                      </div>
                    </div>
                  </CarrouselBanniere>
                </div>
              </div>
            </div>
            {/* Mobile uniquement (masque des 768 px) : titre centre et onglets
                defilants sous le hero, a la maniere de BazarChic. */}
            <div className="col-12 aye-onglets-mobile">
              <h2>Découvrez nos produits</h2>
              <nav aria-label="Univers">
                <ul>
                  {ONGLETS.map((onglet) => (
                    <li key={onglet.href}>
                      <a href={onglet.href}>{onglet.libelle}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* ***** Nos univers, bandeau, Nouveautés, Nos collections ***** */}
      <SectionUnivers />

      {/* Bandeau defilant (CSS seul) : deux moities identiques, la piste glisse
          de la moitie de sa largeur puis recommence, sans raccord visible */}
      <div className="aye-bandeau">
        <div className="aye-bandeau-piste">
          {[0, 1].map((moitie) => (
            <span key={moitie} aria-hidden={moitie === 1 ? 'true' : undefined}>
              {[0, 1, 2].map((tour) => (
                <Fragment key={tour}>
                  {BANDEAU.map((mot) => (
                    <Fragment key={mot}>
                      <b>{mot}</b>
                      <i aria-hidden="true">✦</i>
                    </Fragment>
                  ))}
                </Fragment>
              ))}
            </span>
          ))}
        </div>
      </div>
      <SectionVedette
        surtitre="Arrivées récentes"
        titre="Nouveautés"
        produits={[
          'manches-longues-aye-aye-rouge',
          'tee-shirt-dauphins-rouge',
          'tee-shirt-tortue-moutarde',
          'tee-shirt-djembe-noir',
          'manches-longues-antsatsaka-ecru',
        ]}
      />
      <SectionHistoire />

      {/* ***** Notre histoire et notre engagement ***** */}
      {/* Forme demandee par la marque : grande photo a gauche, textes du
          template a droite (titre, accroche, citation, paragraphes, bouton) */}
      <section className="section aye-decouvrez" id="explore">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="aye-decouvrez-photo">
                <img
                  src={chemin('/assets/images/apropos/decouvrez.jpg')}
                  alt="Manches longues Aye-Aye rouge"
                  width={1100}
                  height={900}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="left-content">
                <h2>
                  Découvrez <span className="aye-insecable">Aye-Aye</span> Madagascar
                </h2>
                <span>
                  Aye-Aye Madagascar est une marque qui porte une vision : valoriser la
                  culture malagasy, célébrer notre identité et permettre à chaque Malgache
                  de porter fièrement ses origines, où qu’il se trouve.
                </span>
                <div className="quote">
                  <i className="fa fa-quote-left"></i>
                  <p>« Authentique – Nature – Qualité »</p>
                </div>
                <p>
                  Plus qu’une simple marque de vêtements, Aye-Aye Madagascar est une
                  expression de notre identité. À travers ses créations, la marque met à
                  l’honneur la richesse de la nature, les symboles et les valeurs qui
                  représentent Madagascar.
                </p>
                <p>
                  Notre ambition est de rassembler les Malgaches autour d’une même fierté :
                  celle d’être Malagasy.
                </p>
                <div className="main-border-button">
                  <a href={chemin('/about/')}>Notre histoire</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ***** Nos points forts ***** */}
      <section className="aye-atouts">
        <div className="container">
          <ul>
            {ATOUTS.map((atout) => (
              <li key={atout.titre}>
                <span className="aye-atout-icone" aria-hidden="true">
                  <svg viewBox="0 0 24 24">{atout.icone}</svg>
                </span>
                <h4>{atout.titre}</h4>
                <p>{atout.texte}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ***** Communaute : titre centre, 4 photos, bouton Facebook ***** */}
      <section className="section aye-communaute-section" id="social">
        <div className="container">
          <div className="section-heading">
            <h2>
              Ils portent fièrement leur <span className="aye-insecable">Aye-Aye</span>
            </h2>
            <span>Plus de 11{' '}000 personnes nous suivent déjà sur Facebook.</span>
          </div>
          <ul className="aye-communaute-photos">
            {[1, 2, 3, 4].map((numero) => (
              <li key={numero}>
                <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Aye-Aye Madagascar sur Facebook">
                  <img
                    src={chemin('/assets/images/social/0' + numero + '.jpg')}
                    alt=""
                    width={320}
                    height={320}
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              </li>
            ))}
          </ul>
          <div className="aye-communaute">
            <div className="main-border-button aye-plein">
              <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer">
                <span className="aye-icone-facebook" aria-hidden="true">
                  <i className="fa fa-facebook"></i>
                </span>
                Nous suivre sur Facebook
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
