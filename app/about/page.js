import { chemin } from '@/app/lib/chemin';
import Header from '../components/Header';
import { CONTACT, MARQUE } from '../components/Footer';

export const metadata = {
  title: 'À propos — Aye-Aye Madagascar',
  description:
    'Aye-Aye Madagascar : notre identité, notre fierté. Qualité premium, '
    + 'tissu 100 % coton, identité malagasy.',
};

// Textes fournis par la marque (structure du site, rubrique « À propos »).
const PILIERS = [
  {
    titre: 'Qualité premium',
    texte: 'Des produits de qualité supérieure, pensés pour durer.',
    image: chemin('/assets/images/piliers/01.jpg'),
  },
  {
    titre: 'Tissu 100 % coton',
    texte: 'Le confort et la douceur avant tout.',
    image: chemin('/assets/images/piliers/02.jpg'),
  },
  {
    titre: 'Identité malagasy',
    texte: 'Notre culture et notre patrimoine mis en valeur dans chaque création.',
    image: chemin('/assets/images/piliers/03.jpg'),
  },
];

export default function PageAPropos() {
  return (
    <>
      <Header actif="apropos" />

      <div className="page-heading about-page-heading" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-content">
                <h2>À propos</h2>
                <span>Notre identité, notre fierté</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ***** Historique ***** */}
      <div className="about-us" id="histoire">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="left-image">
                <img
                  src={chemin('/assets/images/apropos/histoire.jpg')}
                  alt="Manches longues Aye-Aye, impression dos"
                  width={570}
                  height={422}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="right-content">
                <h4>Notre identité, notre fierté</h4>
                <span>
                  Aye Aye Madagascar est une marque qui porte une vision : valoriser la
                  culture malagasy, célébrer notre identité et permettre à chaque Malgache
                  de porter fièrement ses origines, où qu’il se trouve.
                </span>
                <p>
                  Plus qu’une simple marque de vêtements, Aye Aye Madagascar est
                  l’expression de notre identité. À travers ses créations, la marque met à
                  l’honneur la richesse de la nature, les symboles et les valeurs qui
                  représentent Madagascar.
                </p>
                <p>
                  Notre ambition est de rassembler les Malgaches autour d’une même fierté :
                  celle d’être Malagasy.
                </p>
                <ul>
                  {' '}
                  <li>
                    <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  {' '}
                  <li>
                    <a href={CONTACT.whatsappLien} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                      <i className="fa fa-whatsapp"></i>
                    </a>
                  </li>
                  {' '}
                  <li>
                    <a href={'mailto:' + CONTACT.email} aria-label="E-mail">
                      <i className="fa fa-envelope-o"></i>
                    </a>
                  </li>
                  {' '}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ***** Engagement ***** */}
      <section className="our-services" id="engagement">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading">
                <h2>Nos engagements</h2>
                <span>Trois engagements, dans chacune de nos créations.</span>
              </div>
            </div>
            {PILIERS.map((pilier) => (
              <div className="col-lg-4" key={pilier.titre}>
                <div className="service-item">
                  <h4>{pilier.titre}</h4>
                  <p>{pilier.texte}</p>
                  <img
                    src={pilier.image}
                    alt={pilier.titre}
                    width={310}
                    height={250}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            ))}
            <div className="col-lg-12">
              <div className="aye-signature">
                <h4>Aye Aye Madagascar – {MARQUE.slogan}</h4>
                <div className="main-border-button">
                  <a href={chemin('/collections/')}>Découvrir nos collections</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
