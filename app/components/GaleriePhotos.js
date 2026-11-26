// Grille de photos (entieres, en colonnes) d'une page modele ou collection.
// Chaque photo mene a la fiche du produit qu'elle montre (`lien`) ; une photo
// sans produit (dessin du dos non visible) n'est pas cliquable.
// Les photos glissent en place a l'ecran (aye-mur-anime, voir aye-aye.js).
// `grille` : grille reguliere (rangees alignees) au lieu des colonnes, les
// photos y apparaissent rangee par rangee, l'une apres l'autre (aye-grille).

import { chemin } from '@/app/lib/chemin';

const dossier = chemin('/assets/images/galerie/');

export default function GaleriePhotos({ photos, grille = false }) {
  return (
    <div className={grille ? 'aye-grille aye-grille-anime' : 'aye-mur aye-mur-anime'}>
      {photos.map((p, i) => {
        const image = (
          <img
            src={dossier + '480/' + p.id + '.jpg'}
            srcSet={dossier + '480/' + p.id + '.jpg 480w, ' + dossier + '1600/' + p.id + '.jpg ' + p.width + 'w'}
            sizes={grille ? '(max-width: 767px) 50vw, 33vw' : '(max-width: 767px) 50vw, (max-width: 1199px) 33vw, 25vw'}
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
