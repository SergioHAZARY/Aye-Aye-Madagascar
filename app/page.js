import { chemin } from '@/app/lib/chemin';
import { Fragment } from 'react';
import CarrouselBanniere from './components/CarrouselBanniere';
import Header from './components/Header';
import SectionCarrousel from './components/SectionCarrousel';
import SectionHistoire from './components/SectionHistoire';
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

// Mots du bandeau defilant, sous « Nouveautes Homme ».
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
      <Header actif="accueil" />

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

      {/* ***** Catégories : sections du template, produits en carrousel ***** */}
      <SectionCarrousel
        categorie="homme"
        modele="men"
        surtitre="Collection Homme"
        titre="Nouveautés Homme"
        sousTitre="Manches longues en coton 100 %, imprimées à Madagascar."
      />

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
      <SectionVedette categorie="femme" surtitre="Arrivées récentes" titre="Collection Femme" />
      <SectionHistoire
        categorie="enfant"
        titre="Collection Enfant"
        sousTitre="La culture malagasy dès le plus jeune âge."
      />

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

      {/* ***** Suivez-nous : la grille de six vignettes du template + bouton ***** */}
      <section className="section" id="social">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading">
                <h2>
                  Rejoignez la communauté <span className="aye-insecable">Aye Aye</span>
                </h2>
                <span>
                  Plus de 11 000 personnes nous suivent déjà sur Facebook. Découvrez nos
                  nouveautés, nos vidéos et les photos de nos clients qui portent fièrement
                  leur Aye Aye.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row images">
            {[1, 2, 3, 4, 5, 6].map((numero) => (
              <div className="col-2" key={numero}>
                <div className="thumb">
                  <div className="icon">
                    <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer">
                      {' '}
                      <h6>Aye-Aye</h6>{' '}
                      <i className="fa fa-facebook"></i>{' '}
                    </a>
                  </div>
                  <img
                    src={chemin('/assets/images/social/0' + numero + '.jpg')}
                    alt="Aye-Aye Madagascar"
                    width={320}
                    height={320}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            ))}
          </div>
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

      {/* ***** Newsletter ***** */}
      <div className="subscribe">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="section-heading">
                <h2>
                  Inscrivez-vous à notre newsletter et recevez nos nouveautés en{' '}
                  <span className="aye-insecable">avant-première</span>
                </h2>
                <span>Une à deux fois par mois, pas plus. Désinscription en un clic.</span>
              </div>
              <form id="subscribe" action="" method="get">
                <div className="row">
                  <div className="col-lg-5">
                    <fieldset>
                      <input name="name" type="text" id="abonne-nom" placeholder="Votre nom" required={true} />
                    </fieldset>
                  </div>
                  <div className="col-lg-5">
                    <fieldset>
                      <input
                        name="email"
                        type="email"
                        id="abonne-email"
                        placeholder="Votre adresse e-mail"
                        required={true}
                      />
                    </fieldset>
                  </div>
                  <div className="col-lg-2">
                    <fieldset>
                      <button type="submit" className="main-dark-button" aria-label="S’inscrire">
                        <i className="fa fa-paper-plane"></i>
                      </button>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-4">
              {/* Une seule grille : les lignes restent alignees, et l'e-mail
                  occupe toute la largeur pour ne jamais etre coupe en plein mot. */}
              <ul className="aye-coordonnees">
                <li>
                  WhatsApp :<br />
                  <span>
                    <a href={CONTACT.whatsappLien} target="_blank" rel="noopener noreferrer">
                      {CONTACT.whatsapp}
                    </a>
                  </span>
                </li>
                <li>
                  Téléphone :<br />
                  <span>
                    <a href={CONTACT.telephoneLien}>{CONTACT.telephone}</a>
                  </span>
                </li>
                <li className="aye-coordonnee-large">
                  E-mail :<br />
                  <span>
                    <a href={'mailto:' + CONTACT.email}>{CONTACT.email}</a>
                  </span>
                </li>
                <li className="aye-coordonnee-large">
                  Boutique :<br />
                  <span>{CONTACT.qualification}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
