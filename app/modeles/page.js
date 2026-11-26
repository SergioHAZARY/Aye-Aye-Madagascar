import { chemin } from '@/app/lib/chemin';
import BandeauDiapos from '../components/BandeauDiapos';
import Header from '../components/Header';
import SilhouetteModele from '../components/SilhouetteModele';
import { CATEGORIES, MODELES, TAILLES_PAR_CATEGORIE, imageCarte } from '../data/catalogue';
import { memePhoto, photosDuModele } from '../data/galerie.mjs';

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

      {/* bandeau : chaque modele vu de face, sur une autre photo que sa carte */}
      <div className="page-heading aye-entete-diapos" id="top">
        <BandeauDiapos
          images={MODELES.flatMap((m) => {
            const photo = photosDuModele(m.slug).find((p) => p.alt.includes('de face') && !memePhoto(m.image, p.id));
            return photo ? [['diapos/photos/' + photo.id + '.jpg', photo.alt]] : [];
          })}
        />
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
                  {/* la photo et le nom menent a la page du modele (toutes ses photos) */}
                  <a className="aye-carte-visuel" href={chemin('/modeles/' + modele.slug + '/')}>
                    {/* photo si la marque en a une, sinon la silhouette de la coupe */}
                    {modele.image ? (
                      <img
                        {...imageCarte(modele.image)}
                        sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 350px"
                        alt={modele.nom + ' Aye-Aye Madagascar'}
                      />
                    ) : (
                      <SilhouetteModele slug={modele.slug} titre={modele.nom} />
                    )}
                  </a>
                  <h4><a href={chemin('/modeles/' + modele.slug + '/')}>{modele.nom}</a></h4>
                  <p>{modele.texte}</p>
                  <a className="aye-carte-photos" href={chemin('/modeles/' + modele.slug + '/')}>
                    Voir les {photosDuModele(modele.slug).length} photos →
                  </a>
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
