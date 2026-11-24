import { chemin } from '@/app/lib/chemin';
import CompteConnecte from '../components/CompteConnecte';
import CompteurPanier from '../components/CompteurPanier';
import Header from '../components/Header';
import { CONTACT } from '../components/Footer';

export const metadata = {
  title: 'Mon compte — Aye-Aye Madagascar',
  description: 'Votre panier, vos favoris et le suivi de vos commandes Aye-Aye Madagascar.',
};

// Page ouverte par l'icone « compte » de l'en-tete. C'est aussi l'acces au
// panier et aux favoris : le pied de page n'a plus de colonne « Mon espace ».

export default function PageCompte() {
  return (
    <>
      <Header />

      <div className="page-heading" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-content">
                <h2>Mon compte</h2>
                <span>Votre panier, vos favoris, le suivi de vos commandes.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section" id="compte">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="left-content">
                <h2>Mon espace</h2>
                <CompteConnecte />
                <ul className="aye-espace-liens">
                  <li>
                    <a href={chemin('/checkout/')}>
                      <i className="fa fa-shopping-cart" aria-hidden="true"></i> Mon panier
                      <CompteurPanier />
                    </a>
                  </li>
                  <li>
                    <a href={chemin('/favoris/')}>
                      <i className="fa fa-heart-o" aria-hidden="true"></i> Mes favoris
                    </a>
                  </li>
                </ul>
                <div className="aye-compte-info">
                  <h4>Pas encore de compte client</h4>
                  <p>
                    La création de compte arrive bientôt. En attendant, vos commandes se
                    passent directement avec nous : c’est plus rapide, et vous avez quelqu’un
                    au bout du fil.
                  </p>
                  <p>
                    Pour commander, ajoutez vos articles au panier puis validez. Nous vous
                    recontactons pour la taille, le paiement et la livraison.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="aye-recapitulatif">
                <h4>Suivre une commande</h4>
                <p>
                  <span>WhatsApp</span>
                  <strong>
                    <a href={CONTACT.whatsappLien} target="_blank" rel="noopener noreferrer">
                      {CONTACT.whatsapp}
                    </a>
                  </strong>
                </p>
                <p>
                  <span>Téléphone</span>
                  <strong>
                    <a href={CONTACT.telephoneLien}>{CONTACT.telephone}</a>
                  </strong>
                </p>
                <p>
                  <span>E-mail</span>
                  <strong>
                    <a href={'mailto:' + CONTACT.email}>{CONTACT.email}</a>
                  </strong>
                </p>
                <p className="aye-total">
                  <span>Facebook</span>
                  <strong>
                    <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer">
                      Aye-Aye Madagascar
                    </a>
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
