import { chemin } from '@/app/lib/chemin';
import { Fragment } from 'react';

import AchatProduit from '../../components/AchatProduit';
import FicheProduit from '../../components/FicheProduit';
import GalerieProduit from '../../components/GalerieProduit';
import Header from '../../components/Header';
import {
  PRODUITS,
  categorieParSlug,
  dimensionsImage,
  photoReduite,
  produitParSlug,
  produitsParCategorie,
  taillesDuProduit,
} from '../../data/catalogue';
import { autresPhotosDuProduit, idPhoto } from '../../data/galerie.mjs';

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

// Photos de la fiche : celles du produit (versions reduites du catalogue),
// puis toutes les photos de la galerie du meme modele et de la meme
// collection (app/data/galerie.mjs), quelle que soit leur couleur.
const GALERIE = chemin('/assets/images/galerie/');
// versions au fond prolonge de la grande photo (scripts/photos-cadrees.mjs)
const FICHE = chemin('/assets/images/fiche/');

function photosDeLaFiche(produit) {
  const propres = produit.galerie.map((source, i) => {
    const [width, height] = dimensionsImage(source);
    return {
      cle: idPhoto(source), vignette: photoReduite(source, 160), fiche: FICHE,
      zoom: source, width, height, alt: produit.nom + ' – vue ' + (i + 1),
    };
  });
  const autres = autresPhotosDuProduit(produit.galerie, produit.modele, produit.collection).map((p) => ({
    cle: p.id, vignette: GALERIE + '160/' + p.id + '.jpg', fiche: FICHE,
    zoom: GALERIE + '1600/' + p.id + '.jpg', width: p.width, height: p.height, alt: p.alt,
  }));
  return propres.concat(autres);
}

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
              <GalerieProduit images={photosDeLaFiche(produit)} />
            </div>

            <div className="col-lg-5">
              <div className="aye-fiche-infos">
                <p className="aye-fiche-marque">Aye-Aye Madagascar</p>

                <div className="aye-fiche-titre">
                  <h1>
                    {sansCoupure(produit.nom)}
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

                <AchatProduit tailles={tailles} />

                <p className="aye-livraison">
                  <i className="fa fa-truck"></i> <strong>Livraison</strong> à convenir après votre
                  commande
                </p>
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
