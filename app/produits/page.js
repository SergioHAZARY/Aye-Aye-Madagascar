import { chemin } from '@/app/lib/chemin';
import FicheProduit from '../components/FicheProduit';
import Header from '../components/Header';
import { CATEGORIES, produitsParCategorie } from '../data/catalogue';

export const metadata = {
  title: 'Tous nos produits — Aye-Aye Madagascar',
  description: 'L’ensemble des produits Aye-Aye Madagascar, par catégorie.',
};

export default function PageProduits() {
  return (
    <>
      <Header actif="modeles" surBanniere />

      <div className="page-heading" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-content">
                <h2>Tous nos produits</h2>
                <span>Coton 100 %, imprimés à Madagascar.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {CATEGORIES.map((categorie) => {
        const produits = produitsParCategorie(categorie.slug);
        if (produits.length === 0) return null;
        return (
          <section className="section" id={categorie.slug} key={categorie.slug}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-heading">
                    <h2>{categorie.nom}</h2>
                    <span>{categorie.accroche}</span>
                  </div>
                </div>
              </div>
              <div className="row">
                {produits.map((produit, index) => (
                  <div className="col-lg-4 col-md-6" key={produit.slug}>
                    <FicheProduit produit={produit} differer={index >= 3} />
                  </div>
                ))}
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="aye-voir-tout">
                    <div className="main-border-button">
                      <a href={chemin('/' + categorie.slug + '/')}>Voir la catégorie {categorie.nom}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
