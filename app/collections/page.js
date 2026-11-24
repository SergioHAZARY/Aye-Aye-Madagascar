import { chemin } from '@/app/lib/chemin';
import Header from '../components/Header';
import { COLLECTIONS, imageCarte } from '../data/catalogue';

export const metadata = {
  title: 'Nos collections — Aye-Aye Madagascar',
  description:
    'Antsatsaka, Aye Aye Madagascar, Lemurs of Madagascar, Tarondro, Lakana… '
    + 'Chaque collection se distingue par son dessin au dos.',
};

export default function PageCollections() {
  return (
    <>
      <Header actif="collections" surBanniere />

      <div className="page-heading" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-content">
                <h2>Nos collections</h2>
                <span>
                  Chaque collection se distingue par son dessin au dos, disponible sur tous nos
                  modèles.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section aye-grille-section" id="collections">
        <div className="container">
          <div className="row">
            {COLLECTIONS.map((collection, index) => (
              <div className="col-lg-4 col-md-6" key={collection.slug}>
                <article className="aye-carte aye-collection" id={collection.slug}>
                  <div className="aye-carte-visuel">
                    {collection.image ? (
                      <img
                        {...imageCarte(collection.image)}
                        sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 350px"
                        alt={'Collection ' + collection.nom + ', dessin au dos'}
                        {...(index > 2 ? { loading: 'lazy', decoding: 'async' } : {})}
                      />
                    ) : (
                      <span className="aye-carte-numero" aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    )}
                  </div>
                  <h4>{collection.nom}</h4>
                  <p>{collection.texte}</p>
                </article>
              </div>
            ))}
          </div>

          <div className="aye-voir-tout">
            <div className="main-border-button">
              <a href={chemin('/modeles/')}>Voir nos modèles</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
