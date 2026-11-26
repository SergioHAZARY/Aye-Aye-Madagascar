// Grille de photos (entieres, en colonnes) d'une page modele ou collection.
// Chaque photo mene a la fiche du produit qu'elle montre (`lien`) ; une photo
// sans produit (dessin du dos non visible) n'est pas cliquable.

import { chemin } from '@/app/lib/chemin';

const dossier = chemin('/assets/images/galerie/');

export default function GaleriePhotos({ photos }) {
  return (
    <div className="aye-mur">
      {photos.map((p, i) => {
        const image = (
          <img
            src={dossier + '480/' + p.id + '.jpg'}
            srcSet={dossier + '480/' + p.id + '.jpg 480w, ' + dossier + '1600/' + p.id + '.jpg ' + p.width + 'w'}
            sizes="(max-width: 767px) 50vw, (max-width: 1199px) 33vw, 25vw"
            alt={p.alt}
            width={p.width}
            height={p.height}
            loading={i < 4 ? 'eager' : 'lazy'}
            decoding="async"
          />
        );
        return p.lien ? (
          <a key={p.id} href={p.lien} className="aye-galerie-photo">{image}</a>
        ) : (
          <div key={p.id} className="aye-galerie-photo">{image}</div>
        );
      })}
    </div>
  );
}
