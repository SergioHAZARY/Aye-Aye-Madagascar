// Pied de page, selon la structure fournie par la marque :
// logo (sans devise, a la demande de la marque) · Modeles · La marque · Suivez-nous · Contact, puis le
// copyright. Pas de credit TemplateMo / ThemeWagon : la marque a achete la
// licence du template chez ThemeWagon.
//
// Panier et favoris ne sont plus ici : on y accede par l'icone « compte » de
// l'en-tete (page /compte/, qui porte le compteur du panier).

import { MODELES } from '../data/catalogue';

export const CONTACT = {
  whatsapp: '+261 32 53 486 85',
  whatsappLien: 'https://wa.me/261325348685',
  telephone: '034 40 061 26',
  telephoneLien: 'tel:+261344006126',
  email: 'jeferdiflorido@gmail.com',
  adresse: '67 Ha, Antananarivo 101, Madagascar',
  horaires: 'Commandes 7j/7',
  facebook: 'https://www.facebook.com/people/Aye-Aye-Madagascar/61575432462160/',
  qualification: 'Magasin de vêtements',
};

// Slogan de la marque, repris dans le pied de page, l'accueil et A propos.
export const MARQUE = {
  slogan: 'Porter votre culture avec fierté !',
};

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="first-item">
              <div className="logo aye-logo aye-logo-pied">
                <img
                  src="/assets/images/logo-aye-aye-blanc.png"
                  alt="Aye-Aye Madagascar"
                  width={275}
                  height={330}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h4>Modèles</h4>
            <ul>
              {' '}
              {MODELES.map((modele) => (
                <li key={modele.slug}>
                  <a href={'/modeles/#' + modele.slug}>{modele.nom}</a>
                </li>
              ))}
              {' '}
            </ul>
          </div>

          <div className="col-lg-2 col-md-6">
            <h4>La marque</h4>
            <ul>
              {' '}
              <li><a href="/collections/">Collections</a></li>
              {' '}
              <li><a href="/about/">À propos</a></li>
              {' '}
              <li><a href="/contact/">Contact</a></li>
              {' '}
            </ul>
          </div>

          <div className="col-lg-2 col-md-6">
            <h4>Suivez-nous</h4>
            <ul className="aye-pied-reseaux">
              {' '}
              <li>
                <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook">
                  <i className="fa fa-facebook"></i>
                </a>
              </li>
              {' '}
              <li>
                <a href={CONTACT.whatsappLien} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" title="WhatsApp">
                  <i className="fa fa-whatsapp"></i>
                </a>
              </li>
              {' '}
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h4>Contact</h4>
            <ul>
              {' '}
              <li><a href={CONTACT.telephoneLien}>{CONTACT.telephone}</a></li>
              {' '}
              <li>
                <a href={CONTACT.whatsappLien} target="_blank" rel="noopener noreferrer">
                  {CONTACT.whatsapp}
                </a>
              </li>
              {' '}
            </ul>
          </div>

          <div className="col-lg-12">
            <div className="under-footer">
              <p>© 2026 Aye Aye Madagascar. {MARQUE.slogan}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
