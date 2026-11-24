import { chemin } from '@/app/lib/chemin';
import FormulaireConnexion from '../components/FormulaireConnexion';
import Header from '../components/Header';

export const metadata = {
  title: 'Connexion — Aye-Aye Madagascar',
  description: 'Connectez-vous à votre espace Aye-Aye Madagascar.',
};

// Page ouverte par l'icone « compte » de l'en-tete : logo, titre et formulaire,
// sur le modele des formulaires du template.
export default function PageConnexion() {
  return (
    <>
      <Header />
      <section className="section aye-connexion">
        <div className="container">
          <div className="aye-connexion-carte">
            <img
              className="aye-connexion-logo"
              src={chemin('/assets/images/logo-aye-aye.png')}
              alt="Aye-Aye Madagascar"
              width={275}
              height={330}
            />
            <div className="section-heading">
              <h2>Connexion</h2>
              <span>Accédez à votre espace Aye-Aye Madagascar.</span>
            </div>
            <FormulaireConnexion />
          </div>
        </div>
      </section>
    </>
  );
}
