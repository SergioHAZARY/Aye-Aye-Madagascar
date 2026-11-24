import { chemin } from '@/app/lib/chemin';
import Header from './components/Header';
import SectionCarrousel from './components/SectionCarrousel';
import { CONTACT, MARQUE } from './components/Footer';

export const metadata = {
  title: 'Aye-Aye Madagascar',
};

// Tuiles de la banniere : chacune mene a sa page categorie.
const TUILES = [
  { slug: 'homme', nom: 'Homme', accroche: 'Nos manches longues signature', image: chemin('/assets/images/banniere/homme.jpg') },
  { slug: 'femme', nom: 'Femme', accroche: 'La fierté malagasy au féminin', image: chemin('/assets/images/banniere/femme.jpg') },
  { slug: 'enfant', nom: 'Enfant', accroche: 'Dès le plus jeune âge', image: chemin('/assets/images/baner-right-image-03.jpg') },
  { slug: 'accessoires', nom: 'Accessoires', accroche: 'Les détails qui comptent', image: chemin('/assets/images/baner-right-image-04.jpg') },
];

// Onglets sous le hero, sur mobile.
const ONGLETS = [
  { href: chemin('/produits/'), libelle: 'Tout' },
  { href: chemin('/homme/'), libelle: 'Homme' },
  { href: chemin('/femme/'), libelle: 'Femme' },
  { href: chemin('/enfant/'), libelle: 'Enfant' },
  { href: chemin('/accessoires/'), libelle: 'Accessoires' },
  { href: chemin('/modeles/'), libelle: 'Modèles' },
  { href: chemin('/collections/'), libelle: 'Collections' },
];

const PILIERS = [
  { titre: 'Qualité premium', texte: 'Des produits de qualité supérieure.' },
  { titre: 'Tissu 100 % coton', texte: 'Le confort avant tout.' },
  { titre: 'Identité malagasy', texte: 'Notre culture dans chaque création.' },
];

export default function PageAccueil() {
  return (
    <>
      <Header actif="accueil" />

      {/* ***** Bannière ***** */}
      <div className="main-banner" id="top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className="left-content">
                <div className="thumb">
                  <div className="inner-content">
                    <h4>{MARQUE.slogan}</h4>
                    <span>
                      Des vêtements 100 % coton qui célèbrent la nature, les symboles et les
                      valeurs de Madagascar. Pour chaque Malgache, où qu’il se trouve.
                    </span>
                    <div className="main-border-button">
                      <a href={chemin('/collections/')}>Découvrir nos collections</a>
                    </div>
                  </div>
                  {/* mobile : version portrait plein ecran ; ordinateur : celle du template */}
                  <picture>
                    <source
                      media="(max-width: 767px)"
                      srcSet={chemin('/assets/images/banniere/principale-mobile.jpg')}
                      width={800}
                      height={1500}
                    />
                    <img
                      src={chemin('/assets/images/banniere/principale.jpg')}
                      alt="Manches longues Antsatsaka écru, coton 100 %"
                      width={790}
                      height={680}
                    />
                  </picture>
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
            <div className="col-lg-6">
              <div className="right-content">
                <div className="row">
                  {TUILES.map((tuile) => (
                    <div className="col-lg-6" key={tuile.slug}>
                      <div className="right-first-image">
                        <div className="thumb">
                          <div className="inner-content">
                            <h4>{tuile.nom}</h4>
                            <span>{tuile.accroche}</span>
                          </div>
                          <img
                            src={tuile.image}
                            alt={'Catégorie ' + tuile.nom}
                            width={385}
                            height={330}
                          />
                          <a
                            href={chemin('/' + tuile.slug + '/')}
                            className="aye-lien-couvrant"
                            aria-label={'Voir la catégorie ' + tuile.nom}
                          ></a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ***** Catégories : sections du template, produits en carrousel ***** */}
      <SectionCarrousel
        categorie="homme"
        modele="men"
        titre="Nouveautés Homme"
        sousTitre="Manches longues en coton 100 %, imprimées à Madagascar."
      />
      <SectionCarrousel
        categorie="femme"
        modele="women"
        titre="Collection Femme"
        sousTitre="Des pièces qui portent la fierté malagasy."
      />
      <SectionCarrousel
        categorie="enfant"
        modele="kid"
        titre="Collection Enfant"
        sousTitre="La culture malagasy dès le plus jeune âge."
      />
      <SectionCarrousel
        categorie="accessoires"
        titre="Nos accessoires"
        sousTitre="Les détails qui complètent votre style."
      />

      {/* ***** Notre histoire et notre engagement ***** */}
      <section className="section" id="explore">
        <div className="container">
          <div className="row">
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
            <div className="col-lg-6">
              <div className="right-content">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="leather">
                      <h4>{PILIERS[0].titre}</h4>
                      <span>{PILIERS[0].texte}</span>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="first-image">
                      <img
                        src={chemin('/assets/images/social/01.jpg')}
                        alt="Manches longues Aye-Aye rouge"
                        width={320}
                        height={320}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="second-image">
                      <img
                        src={chemin('/assets/images/social/05.jpg')}
                        alt="Manches longues Antsatsaka écru"
                        width={320}
                        height={320}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="types">
                      <h4>{PILIERS[1].titre}</h4>
                      <span>{PILIERS[2].titre}</span>
                    </div>
                  </div>
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
