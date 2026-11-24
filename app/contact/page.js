import Header from '../components/Header';
import { CONTACT } from '../components/Footer';

export const metadata = {
  title: 'Contact — Aye-Aye Madagascar',
  description:
    'Contactez Aye-Aye Madagascar : téléphone 034 40 061 26, WhatsApp +261 32 53 486 85, '
    + 'e-mail. Commandes 7j/7, Antananarivo.',
};

// Coordonnees, dans l'ordre fourni par la marque. Sans `lien` : texte simple.
const MOYENS = [
  { icone: 'fa-phone', titre: 'Téléphone', valeur: CONTACT.telephone, lien: CONTACT.telephoneLien },
  { icone: 'fa-whatsapp', titre: 'WhatsApp', valeur: CONTACT.whatsapp, lien: CONTACT.whatsappLien, externe: true },
  { icone: 'fa-envelope-o', titre: 'E-mail', valeur: CONTACT.email, lien: 'mailto:' + CONTACT.email },
  { icone: 'fa-map-marker', titre: 'Adresse', valeur: CONTACT.adresse },
  { icone: 'fa-clock-o', titre: 'Horaires', valeur: CONTACT.horaires },
];

export default function PageContact() {
  return (
    <>
      <Header actif="contact" surBanniere />

      <div className="page-heading aye-entete-femme" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-content">
                <h2>Contact</h2>
                <span>Nous vous répondons avec plaisir.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-us">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="section-heading">
                <h2>Contactez-nous</h2>
                <span>
                  Une question, une taille, une collection qui vous plaît ? Écrivez-nous, nous
                  vous répondons avec plaisir.
                </span>
              </div>
              {/* Chaque coordonnee : icone dans un rond, libelle au-dessus de la
                  valeur. Quand elle a un lien, toute la ligne est cliquable. */}
              <ul className="aye-moyens-contact">
                {MOYENS.map((moyen) => {
                  const contenu = (
                    <>
                      <i className={'fa ' + moyen.icone} aria-hidden="true"></i>
                      <span className="aye-moyen-texte">
                        <span className="aye-moyen-libelle">{moyen.titre}</span>
                        <span className="aye-moyen-valeur">{moyen.valeur}</span>
                      </span>
                    </>
                  );
                  return (
                    <li key={moyen.titre}>
                      {moyen.lien ? (
                        <a
                          className="aye-moyen"
                          href={moyen.lien}
                          {...(moyen.externe ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >
                          {contenu}
                        </a>
                      ) : (
                        <div className="aye-moyen">{contenu}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className="aye-boutons-contact">
                <div className="main-border-button aye-plein">
                  <a href={CONTACT.whatsappLien} target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-whatsapp"></i> Écrire sur WhatsApp
                  </a>
                </div>
                <div className="main-border-button">
                  <a href={CONTACT.telephoneLien}>
                    <i className="fa fa-phone"></i> Nous appeler
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="section-heading">
                <h2>Écrivez-nous</h2>
                <span>Votre message s’ouvre dans votre messagerie, prêt à nous être envoyé.</span>
              </div>
              <form id="contact" action={'mailto:' + CONTACT.email} method="post" encType="text/plain">
                <div className="row">
                  <div className="col-lg-6">
                    <fieldset>
                      <input name="nom" type="text" id="contact-nom" placeholder="Votre nom" required={true} />
                    </fieldset>
                  </div>
                  <div className="col-lg-6">
                    <fieldset>
                      <input
                        name="email"
                        type="email"
                        id="contact-email"
                        placeholder="Votre adresse e-mail"
                        required={true}
                      />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <textarea
                        name="message"
                        rows="6"
                        id="contact-message"
                        placeholder="Votre message"
                        required={true}
                      ></textarea>
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <button type="submit" className="main-dark-button">
                        <i className="fa fa-paper-plane"></i> Envoyer
                      </button>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
