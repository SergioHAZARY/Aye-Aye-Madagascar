// Gabarit des pages /modeles/<slug>/ et /collections/<slug>/ : bandeau du
// template (titre, texte de la marque), toutes les photos du modele ou de la
// collection, puis les liens vers les autres pages de la meme liste.

import { chemin } from '@/app/lib/chemin';
import { PRODUITS } from '../data/catalogue';
import { memePhoto } from '../data/galerie.mjs';
import GaleriePhotos from './GaleriePhotos';
import Header from './Header';

// Produit montre par une photo, vu depuis la page `page` ({champ: 'modele' |
// 'collection', slug}) : un produit de ce modele (ou de cette collection)
// porte sur la photo ; d'abord celui dont la galerie contient la photo, puis
// le vetement et le dessin cites en premier.
function produitDeLaPhoto(photo, page) {
  const rang = (p) => (p.galerie.some((s) => memePhoto(s, photo.id))
    ? -1 : photo.modeles.indexOf(p.modele) + photo.collections.indexOf(p.collection));
  return PRODUITS
    .filter((p) => p[page.champ] === page.slug && photo.modeles.includes(p.modele) && photo.collections.includes(p.collection))
    .sort((a, b) => rang(a) - rang(b))[0];
}

export default function PageGalerie({ actif, classeEntete, fond, titre, texte, page, photos: liste, autres, retour }) {
  const photos = liste.map((photo) => {
    const produit = produitDeLaPhoto(photo, page);
    return { ...photo, lien: produit && chemin('/produit/' + produit.slug + '/') };
  });
  return (
    <>
      <Header actif={actif} surBanniere />

      <div className={'page-heading ' + classeEntete} id="top" style={fond && { backgroundImage: 'url(' + fond + ')' }}>
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
