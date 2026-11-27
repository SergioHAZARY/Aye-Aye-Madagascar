// Pied de page, selon la structure fournie par la marque :
// logo (sans devise, a la demande de la marque) · Modeles · Collections (3
// dessins et « Voir plus ») · A propos · Contact, puis le copyright avec, a
// cote, les logos Facebook et WhatsApp. Pas de credit TemplateMo / ThemeWagon : la marque a achete la
// licence du template chez ThemeWagon.
//
// Panier et favoris ne sont plus ici : on y accede par l'icone « compte » de
// l'en-tete (page /compte/, qui porte le compteur du panier).

import { chemin } from '@/app/lib/chemin';
import { COLLECTIONS, MODELES } from '../data/catalogue';

// Collections citees dans le pied de page (choix de la marque) ; les autres
// sont sur /collections/, via le bouton « Voir plus ».
const COLLECTIONS_PIED = ['antsatsaka', 'aye-aye-madagascar', 'lemurs-of-madagascar']
  .map((slug) => COLLECTIONS.find((c) => c.slug === slug))
  .filter(Boolean);

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
  // espace insecable avant « ! » : le point d'exclamation ne passe jamais
  // seul a la ligne
  slogan: 'Portez votre culture avec fierté !',
};

export default function Footer() {
  return (
    <footer>
      <div className="container">
        {/* aye-pied-ligne : logo a gauche, colonnes alignees a droite (aye-aye.css) */}
        <div className="row aye-pied-ligne">
          <div className="col-lg-3 col-md-6">
            <div className="first-item">
              <div className="logo aye-logo aye-logo-pied">
                <img
                  src={chemin('/assets/images/logo-aye-aye-blanc.png')}
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
                  <a href={chemin('/modeles/#' + modele.slug)}>{modele.nom}</a>
                </li>
              ))}
              {' '}
            </ul>
          </div>

          <div className="col-lg-2 col-md-6">
            <h4>Collections</h4>
            <ul>
              {' '}
              {COLLECTIONS_PIED.map((collection) => (
                <li key={collection.slug}>
                  <a href={chemin('/collections/#' + collection.slug)}>{collection.nom}</a>
                </li>
              ))}
              {' '}
            </ul>
            <div className="main-border-button aye-pied-voir-plus">
              <a href={chemin('/collections/')}>Voir plus</a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h4>À propos</h4>
            <ul>
              {' '}
              <li><a href={chemin('/about/#histoire')}>Notre histoire</a></li>
              {' '}
              <li><a href={chemin('/about/#engagement')}>Nos engagements</a></li>
              {' '}
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h4><a href={chemin('/contact/')}>Contact</a></h4>
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
            {/* copyright et, a cote, Facebook et WhatsApp (la colonne
                « Suivez-nous » a ete retiree a la demande de la marque) */}
            <div className="under-footer aye-pied-bas">
              <p>© 2026 Aye Aye Madagascar. {MARQUE.slogan}</p>
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
          </div>
        </div>
      </div>

      {/* retour en haut de page : apparait apres un ecran et demi (aye-aye.js).
          Dans le pied : rien ne doit s'intercaler entre la derniere section et
          lui (regle :has(+ footer) d'aye-aye.css). */}
      <button type="button" className="aye-haut" aria-label="Haut de la page" title="Haut de la page">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 14.5 12 8.5l6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </footer>
  );
}
