import Favoris from '../components/Favoris';
import Header from '../components/Header';

export const metadata = {
  title: 'Mes favoris — Aye-Aye Madagascar',
  description: 'Les produits Aye-Aye Madagascar que vous avez mis de côté.',
};

export default function PageFavoris() {
  return (
    <>
      <Header />
      <div className="page-heading" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-content">
                <h2>Mes favoris</h2>
                <span>Les pièces que vous avez mises de côté.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="section" id="favoris">
        <div className="container">
          <Favoris />
        </div>
      </section>
    </>
  );
}
