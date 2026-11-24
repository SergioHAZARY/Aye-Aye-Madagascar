import Header from '../components/Header';
import Recherche from '../components/Recherche';

export const metadata = {
  title: 'Recherche — Aye-Aye Madagascar',
  description: 'Rechercher un produit dans la boutique Aye-Aye Madagascar.',
};

export default function PageRecherche() {
  return (
    <>
      <Header />
      <div className="page-heading" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-content">
                <h2>Recherche</h2>
                <span>Trouvez un produit par son nom, sa couleur ou sa catégorie.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="section" id="recherche">
        <div className="container">
          <Recherche />
        </div>
      </section>
    </>
  );
}
