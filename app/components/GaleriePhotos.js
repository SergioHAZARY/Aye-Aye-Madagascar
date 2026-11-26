// Photos d'une page modele ou collection, entieres, en « briques » (demande
// du proprietaire) : rangees de deux photos, une large et une etroite,
// alternees d'une rangee a l'autre. Les deux photos d'une rangee arrivent
// chacune de son cote a chaque passage a l'ecran (aye-aye.js, aye-aye.css).
// Chaque photo mene a la fiche du produit qu'elle montre (`lien`) ; une photo
// sans produit (dessin du dos non visible) n'est pas cliquable.
//
// Une photo de studio (dsc-…) remplit sa case avec sa version au fond
// prolonge (galerie/brique/, scripts/photos-cadrees.mjs) ; les autres sont
// entieres sur le fond clair des cartes. On place de preference les photos de
// studio et celles en largeur dans les cases larges, les photos en hauteur
// dans les etroites, en gardant a peu pres l'ordre de la page.

import { chemin } from '@/app/lib/chemin';

const dossier = chemin('/assets/images/galerie/');
const studio = (p) => p.id.startsWith('dsc-');
const enLargeur = (p) => p.width > p.height;

// case large aux positions 0 et 3 de chaque groupe de 4 (large-etroite, etroite-large)
const estLarge = (i) => i % 4 === 0 || i % 4 === 3;
const cout = (p, large) => (large ? (studio(p) || enLargeur(p) ? 0 : 2) : enLargeur(p) ? 3 : 0);

function enBriques(photos) {
  const reste = [...photos];
  const cases = [];
  for (let i = 0; reste.length; i += 1) {
    const large = estLarge(i);
    // la mieux adaptee parmi les 4 suivantes (a cout egal, la premiere)
    let k = 0;
    for (let j = 1; j < Math.min(4, reste.length); j += 1) if (cout(reste[j], large) < cout(reste[k], large)) k = j;
    cases.push({ p: reste.splice(k, 1)[0], large });
  }
  return cases;
}

function Image({ p, large, i }) {
  const forme = large ? 'large' : 'etroite';
  const [petite, grande] = large ? [600, 1200] : [300, 600];
  const attributs = studio(p)
    ? {
      src: dossier + 'brique/' + forme + '/' + petite + '/' + p.id + '.jpg',
      srcSet: [petite, grande].map((l) => dossier + 'brique/' + forme + '/' + l + '/' + p.id + '.jpg ' + l + 'w').join(', '),
      width: grande,
      height: Math.round(large ? (grande * 8) / 9 : (grande * 16) / 9),
      className: 'aye-etendue',
    }
    : {
      src: dossier + '480/' + p.id + '.jpg',
      srcSet: dossier + '480/' + p.id + '.jpg 480w, ' + dossier + '1600/' + p.id + '.jpg ' + p.width + 'w',
      width: p.width,
      height: p.height,
    };
  const sizes = large ? '(max-width: 767px) 64vw, 54vw' : '(max-width: 767px) 32vw, 27vw';
  return <img {...attributs} sizes={sizes} alt={p.alt} loading={i < 4 ? 'eager' : 'lazy'} decoding="async" />;
}

export default function GaleriePhotos({ photos }) {
  const cases = enBriques(photos);
  return (
    <div className="aye-brique aye-brique-anime">
      {cases.map(({ p, large }, i) => {
        const classe = 'aye-galerie-photo' + (large ? ' aye-brique-large' : '');
        const image = <Image p={p} large={large} i={i} />;
        return p.lien ? (
          <a key={p.id} href={p.lien} className={classe}>{image}</a>
        ) : (
          <div key={p.id} className={classe}>{image}</div>
        );
      })}
    </div>
  );
}
