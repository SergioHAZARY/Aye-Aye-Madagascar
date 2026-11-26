import { chemin } from '@/app/lib/chemin';
import CarrouselBanniere from './components/CarrouselBanniere';
import GalerieCommunaute from './components/GalerieCommunaute';
import Header from './components/Header';
import SectionHistoire from './components/SectionHistoire';
import SectionUnivers from './components/SectionUnivers';
import { CONTACT } from './components/Footer';
import { dimensionsImage, photoReduite, srcsetPhoto } from './data/catalogue';

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


// Photo de « Decouvrez Aye-Aye Madagascar »
const GROUPE = chemin('/assets/images/Groupe/Groupe_1.jpeg');

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
                      <h4>Porter votre culture avec fierté{' '}!</h4>
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

      {/* ***** Nos univers, Nos collections ***** */}
      <SectionUnivers />
      <SectionHistoire />

      {/* ***** Nos points forts (entre « Nos collections » et « Decouvrez ») ***** */}
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

      {/* ***** Decouvrez Aye-Aye Madagascar ***** */}
      {/* Photo de groupe en arriere-plan, pleine largeur, voile sombre degrade
          (plus fonce a gauche, sous le texte) et textes de la marque en blanc ;
          lien « Notre histoire » en bas a droite. Sous 992 px : photo entiere
          puis texte sur fond sombre. */}
      <section className="aye-decouvrez" id="decouvrez">
        <img
          className="aye-decouvrez-fond"
          src={GROUPE}
          srcSet={srcsetPhoto(GROUPE)}
          sizes="100vw"
          alt="Cinq personnes en tee-shirts, débardeur et manches longues Aye-Aye Madagascar"
          width={dimensionsImage(GROUPE)[0]}
          height={dimensionsImage(GROUPE)[1]}
          loading="lazy"
          decoding="async"
        />
        <div className="aye-decouvrez-contenu">
          <div className="container">
            <div className="aye-decouvrez-ligne">
              <div className="aye-decouvrez-texte">
                <p className="aye-decouvrez-devise">« Authentique – Nature – Qualité »</p>
                <h2>
                  Découvrez <span className="aye-insecable">Aye-Aye</span> Madagascar
                </h2>
                <p className="aye-decouvrez-accroche">
                  Aye-Aye Madagascar est une marque qui porte une vision : valoriser la
                  culture malagasy, célébrer notre identité et permettre à chaque Malgache
                  de porter fièrement ses origines, où qu’il se trouve.
                </p>
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
              </div>
              <a className="aye-decouvrez-lien" href={chemin('/about/')}>Notre histoire</a>
            </div>
          </div>
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
        </div>
        {/* toutes les photos de clients, pleine largeur, en carrousel */}
        <GalerieCommunaute facebook={CONTACT.facebook} />
        <div className="container">
          <div className="aye-communaute">
            <div className="main-border-button">
              <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer">
                Nous suivre sur Facebook
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
