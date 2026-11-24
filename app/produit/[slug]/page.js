import { chemin } from '@/app/lib/chemin';
import { Fragment } from 'react';

import AchatProduit from '../../components/AchatProduit';
import FicheProduit from '../../components/FicheProduit';
import GalerieProduit from '../../components/GalerieProduit';
import Header from '../../components/Header';
import { CONTACT } from '../../components/Footer';
import {
  PRODUITS,
  categorieParSlug,
  formaterPrix,
  produitParSlug,
  produitsParCategorie,
  taillesDuProduit,
} from '../../data/catalogue';

// Export statique : une page HTML par produit.
export function generateStaticParams() {
  return PRODUITS.map((produit) => ({ slug: produit.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const produit = produitParSlug(slug);
  return {
    title: produit.nom + ' — Aye-Aye Madagascar',
    description: produit.description,
  };
}

// Encadre d'informations sous le bouton : uniquement des engagements vrais
// de la marque (textes « Notre engagement ») et le fonctionnement reel de la
// commande — pas de delai de livraison ni de moyen de paiement invente.
const ATOUTS = [
  { icone: 'fa-star-o', titre: 'Qualité premium', texte: 'des produits de qualité supérieure' },
  { icone: 'fa-heart-o', titre: 'Identité malagasy', texte: 'notre culture dans chaque création' },
  { icone: 'fa-check', titre: 'Commande simple', texte: 'nous vous recontactons pour la livraison' },
  { icone: 'fa-comments-o', titre: 'Service client', texte: 'WhatsApp ' + CONTACT.whatsapp },
];

// Les mots composes (« Aye-Aye ») ne doivent pas se couper au trait d'union.
function sansCoupure(texte) {
  return texte.split(' ').map((mot, i) => (
    <Fragment key={i}>
      {i > 0 && ' '}
      {mot.includes('-') ? <span className="aye-insecable">{mot}</span> : mot}
    </Fragment>
  ));
}

export default async function PageProduit({ params }) {
  const { slug } = await params;
  const produit = produitParSlug(slug);
  const categorie = categorieParSlug(produit.categorie);
  const tailles = taillesDuProduit(produit);
  const similaires = produitsParCategorie(produit.categorie).filter((p) => p.slug !== produit.slug);

  return (
    <>
      <Header actif="modeles" />

      <section className="aye-fiche" id="fiche">
        <div className="container">
          <p className="aye-fil">
            <a href={chemin('/')}>Accueil</a> / <a href={chemin('/' + categorie.slug + '/')}>{categorie.nom}</a> /{' '}
            <span>{produit.nom}</span>
          </p>

          <div className="row">
            <div className="col-lg-7">
              <GalerieProduit images={produit.galerie} nom={produit.nom} />
            </div>

            <div className="col-lg-5">
              <div className="aye-fiche-infos">
                <p className="aye-fiche-marque">Aye-Aye Madagascar</p>

                <div className="aye-fiche-titre">
                  <h1>
                    {sansCoupure(produit.nom)} <span>{produit.couleur.toLowerCase()}</span>
                  </h1>
                  <button
                    type="button"
                    className="aye-fiche-favori"
                    data-favori={produit.slug}
                    aria-label="Ajouter aux favoris"
                    title="Ajouter aux favoris"
                  >
                    <i className="fa fa-heart-o"></i>
                  </button>
                </div>

                <p className="aye-fiche-prix">{formaterPrix(produit.prix)}</p>

                <AchatProduit slug={produit.slug} tailles={tailles}>
                  {tailles.length > 0 && (
                    <details className="aye-guide">
                      <summary>
                        <i className="fa fa-arrows-h"></i> Guide des tailles
                      </summary>
                      <p>
                        Un doute sur votre taille ? Écrivez-nous sur{' '}
                        <a href={CONTACT.whatsappLien} target="_blank" rel="noopener noreferrer">
                          WhatsApp
                        </a>{' '}
                        en indiquant votre taille habituelle : nous vous conseillons.
                      </p>
                    </details>
                  )}
                </AchatProduit>

                <p className="aye-livraison">
                  <i className="fa fa-truck"></i> <strong>Livraison</strong> à convenir après votre
                  commande
                </p>

                <ul className="aye-fiche-atouts">
                  {ATOUTS.map((atout) => (
                    <li key={atout.titre}>
                      <i className={'fa ' + atout.icone}></i>
                      <span>
                        <strong>{atout.titre}</strong> {atout.texte}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="aye-accordeons">
                  <details>
                    <summary>Description</summary>
                    <p>{produit.description}</p>
                  </details>
                  <details>
                    <summary>Composition et entretien</summary>
                    <ul>
                      {produit.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </details>
                  <details>
                    <summary>Marque</summary>
                    <p>
                      Aye-Aye Madagascar valorise la culture malagasy et permet à chaque
                      Malgache de porter fièrement ses origines.{' '}
                      <a href={chemin('/about/')}>Notre histoire</a>
                    </p>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {similaires.length > 0 && (
        <section className="section" id="similaires">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-heading">
                  <h2>Dans la même catégorie</h2>
                  <span>{categorie.accroche}</span>
                </div>
              </div>
            </div>
            <div className="row">
              {similaires.map((autre) => (
                <div className="col-lg-4 col-md-6" key={autre.slug}>
                  <FicheProduit produit={autre} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
