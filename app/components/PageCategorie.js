// Page d'une categorie : banniere de titre puis grille de produits.
// Les quatre pages categorie (homme, femme, enfant, accessoires) partagent ce
// composant ; seul le slug change.

import { chemin } from '@/app/lib/chemin';
import FicheProduit from './FicheProduit';
import Header from './Header';
import { CATEGORIES, categorieParSlug, vignettes } from '../data/catalogue';

export default function PageCategorie({ slug }) {
  const categorie = categorieParSlug(slug);
  const articles = vignettes(slug);

  return (
    <>
      <Header />

      <div className="page-heading" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-content">
                <h2>{categorie.nom}</h2>
                <span>{categorie.accroche}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section" id="products">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading">
                <h2>{articles.length} article{articles.length > 1 ? 's' : ''}</h2>
                <span>Coton 100 %, livraison partout à Madagascar.</span>
              </div>
            </div>
          </div>
          <div className="row">
            {articles.map((article, index) => (
              <div className="col-lg-4 col-md-6" key={article.produit.slug + '-' + index}>
                <FicheProduit
                  produit={article.produit}
                  image={article.image}
                  differer={index >= 3}
                />
              </div>
            ))}
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="aye-autres-categories">
                <h4>Autres catégories</h4>
                <ul>
                  {' '}
                  {CATEGORIES.filter((c) => c.slug !== slug).map((c) => (
                    <li key={c.slug}>
                      <a href={chemin('/' + c.slug + '/')}>{c.nom}</a>
                    </li>
                  ))}
                  {' '}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
