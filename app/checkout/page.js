import Header from '../components/Header';
import PanierDetail from '../components/PanierDetail';

export const metadata = {
  title: 'Mon panier — Aye-Aye Madagascar',
  description: 'Récapitulatif de votre commande Aye-Aye Madagascar.',
};

export default function PageCheckout() {
  return (
    <>
      <Header />

      <div className="page-heading" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-content">
                <h2>Mon panier</h2>
                <span>Vérifiez votre commande avant de la valider.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section" id="panier">
        <div className="container">
          <PanierDetail />
        </div>
      </section>
    </>
  );
}
