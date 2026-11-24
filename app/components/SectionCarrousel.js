// Section de produits en carrousel, a l'identique du template
// (sections « Men's / Women's / Kid's Latest ») : largeur du .container,
// titre dans une colonne de 6, carrousel sur 12.
//
// `modele` reprend les noms du template — 'men', 'women' ou 'kid' — pour que
// la section porte ses ids et classes d'origine : le CSS du template
// (#men, #women, #kids) et custom.js (.owl-men-item, ...) s'appliquent tels
// quels, avec leurs reglages.

import FicheProduit from './FicheProduit';
import { vignettes } from '../data/catalogue';

const ID_TEMPLATE = { men: 'men', women: 'women', kid: 'kids' };

export default function SectionCarrousel({ categorie, titre, sousTitre, modele }) {
  const articles = vignettes(categorie);
  const id = ID_TEMPLATE[modele];
  const enveloppe = modele + '-item-carousel';
  const carrousel = 'owl-' + modele + '-item owl-carousel';

  return (
    <section className="section" id={id}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="section-heading">
              <h2>{titre}</h2>
              <span>{sousTitre}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className={enveloppe}>
              <div className={carrousel}>
                {' '}
                {articles.map((article, index) => (
                  <FicheProduit
                    key={article.produit.slug + '-' + index}
                    produit={article.produit}
                    image={article.image}
                  />
                ))}
                {' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
