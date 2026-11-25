import { chemin } from '@/app/lib/chemin';
import Header from '../components/Header';
import SilhouetteModele from '../components/SilhouetteModele';
import { CATEGORIES, MODELES, TAILLES_PAR_CATEGORIE, imageCarte } from '../data/catalogue';

export const metadata = {
  title: 'Nos modèles — Aye-Aye Madagascar',
  description: 'Tee-shirt, manches longues, débardeur : trois coupes, disponibles pour hommes, femmes et enfants.',
};

// Les publics proposes pour chaque coupe : les pages categorie.
const PUBLICS = CATEGORIES;

// Tailles affichees sous chaque coupe (TAILLES_PAR_CATEGORIE, valeurs de
// depart a confirmer par la marque) : adulte (homme et femme) et enfant.
const TAILLES = [
  ['Adulte', TAILLES_PAR_CATEGORIE.homme.join(' · ')],
  ['Enfant', TAILLES_PAR_CATEGORIE.enfant.map((t) => t.replace(' ans', '')).join(' · ') + ' ans'],
];

export default function PageModeles() {
  return (
    <>
      <Header actif="modeles" surBanniere />

      <div className="page-heading aye-entete-face" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-content">
                <h2>Nos modèles</h2>
                <span>Trois coupes, disponibles pour hommes, femmes et enfants.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section aye-grille-section" id="modeles">
        <div className="container">
          <div className="row">
            {MODELES.map((modele) => (
              <div className="col-lg-4 col-md-6" key={modele.slug}>
                <article className="aye-carte aye-modele" id={modele.slug}>
                  <div className="aye-carte-visuel">
                    {/* photo si la marque en a une (pas encore pour le
                        debardeur), sinon la silhouette de la coupe */}
                    {modele.image ? (
                      <img
                        {...imageCarte(modele.image)}
                        sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 350px"
                        alt={modele.nom + ' Aye-Aye Madagascar'}
                      />
                    ) : (
                      <SilhouetteModele slug={modele.slug} titre={modele.nom} />
                    )}
                  </div>
                  <h4>{modele.nom}</h4>
                  <p>{modele.texte}</p>
                  {/* infos alignees en bas de la carte, quelle que soit la
                      longueur du texte au-dessus */}
                  <dl className="aye-modele-infos">
                    <div className="aye-modele-ligne">
                      <dt>Disponible pour</dt>
                      <dd>
                        {PUBLICS.map((c, i) => (
                          <span key={c.slug}>
                            {i > 0 && ' · '}
                            <a href={chemin('/' + c.slug + '/')}>{c.nom}</a>
                          </span>
                        ))}
                      </dd>
                    </div>
                    {TAILLES.map(([public_, liste]) => (
                      <div key={public_} className="aye-modele-ligne">
                        <dt>Tailles {public_.toLowerCase()}</dt>
                        <dd>{liste}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              </div>
            ))}
          </div>

          <div className="aye-voir-tout">
            <div className="main-border-button">
              <a href={chemin('/collections/')}>Choisir une collection</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
