// Gabarit des pages /modeles/<slug>/ et /collections/<slug>/ : bandeau du
// template (titre, texte de la marque), toutes les photos du modele ou de la
// collection, puis les liens vers les autres pages de la meme liste.

import { chemin } from '@/app/lib/chemin';
import GaleriePhotos from './GaleriePhotos';
import Header from './Header';

export default function PageGalerie({ actif, classeEntete, titre, texte, photos, autres, retour }) {
  return (
    <>
      <Header actif={actif} surBanniere />

      <div className={'page-heading ' + classeEntete} id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-content">
                <h2>{titre}</h2>
                <span>{texte}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section aye-galerie-section">
        <div className="container">
          <p className="aye-galerie-compte">
            <a href={retour.lien}>← {retour.texte}</a>
            <span>{photos.length} photo{photos.length > 1 ? 's' : ''}</span>
          </p>
          <GaleriePhotos photos={photos} />

          <nav className="aye-galerie-autres" aria-label={retour.texte}>
            {autres.map((a) => (
              <a key={a.slug} href={chemin(a.lien)} className={a.actif ? 'actif' : undefined}>
                {a.nom}
              </a>
            ))}
          </nav>
        </div>
      </section>
    </>
  );
}
