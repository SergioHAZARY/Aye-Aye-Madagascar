import { chemin } from '@/app/lib/chemin';
import BandeauDiapos from '../components/BandeauDiapos';
import Header from '../components/Header';
import { COLLECTIONS, imageCarte } from '../data/catalogue';
import { photosDeLaCollection } from '../data/galerie.mjs';

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

      {/* bandeau : carrousel des collections, vues de dos (le dessin) */}
      <div className="page-heading aye-entete-diapos" id="top">
        <BandeauDiapos
          images={COLLECTIONS.filter((c) => c.image).map((c) => [
            'diapos/collections/' + c.slug + '.jpg',
            'Collection ' + c.nom + ', dessin au dos',
          ])}
        />
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
            {COLLECTIONS.map((collection, index) => {
              // chaque carte mene a la page de la collection (toutes ses photos)
              const lien = chemin('/collections/' + collection.slug + '/');
              const photos = photosDeLaCollection(collection.slug);
              // sans photo dans le catalogue : la premiere de la galerie (le dos)
              const premiere = photos[0];
              return (
                <div className="col-lg-4 col-md-6" key={collection.slug}>
                  <article className="aye-carte aye-collection" id={collection.slug}>
                    <a className="aye-carte-visuel" href={lien}>
                      {collection.image || premiere ? (
                        <img
                          {...(collection.image
                            ? imageCarte(collection.image)
                            : { src: chemin('/assets/images/galerie/480/' + premiere.id + '.jpg'), width: 480, height: Math.round((480 * premiere.height) / premiere.width) })}
                          sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 350px"
                          alt={'Collection ' + collection.nom + ', dessin au dos'}
                          {...(index > 2 ? { loading: 'lazy', decoding: 'async' } : {})}
                        />
                      ) : (
                        <span className="aye-carte-numero" aria-hidden="true">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      )}
                    </a>
                    <h4><a href={lien}>{collection.nom}</a></h4>
                    <p>{collection.texte}</p>
                    {photos.length > 0 && (
                      <a className="aye-carte-photos" href={lien}>Voir les {photos.length} photos →</a>
                    )}
                  </article>
                </div>
              );
            })}
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
