// Photos d'une page modele ou collection, en « briques » (demande du
// proprietaire) : rangees de deux photos, une large et une etroite, la large
// a gauche puis a droite d'une rangee a l'autre. Les deux photos d'une rangee
// ont la meme hauteur et chacune prend la largeur de son format (aye-aye.css,
// --aye-format) : aucune bande vide autour, aucune photo rognee.
//
// Case large : une photo de studio (dsc-…), dans sa version 9:8 au fond gris
// prolonge (galerie/brique/large/, scripts/photos-cadrees.mjs), ou une photo
// en largeur. Case etroite : une photo en hauteur, a son format. On cherche
// la photo qui convient parmi les 4 suivantes, pour garder a peu pres l'ordre
// de la page ; a defaut, la suivante, a son format.
//
// Chaque photo mene a la fiche du produit qu'elle montre (`lien`) ; une photo
// sans produit (dessin du dos non visible) n'est pas cliquable. Les deux
// photos d'une rangee arrivent chacune de son cote a chaque passage a l'ecran.

import { chemin } from '@/app/lib/chemin';

const dossier = chemin('/assets/images/galerie/');
const studio = (p) => p.id.startsWith('dsc-');
const enLargeur = (p) => p.width > p.height;
const pourLarge = (p) => studio(p) || enLargeur(p);

function prendre(reste, convient) {
  const k = reste.slice(0, 4).findIndex(convient);
  return reste.splice(k < 0 ? 0 : k, 1)[0];
}

function enRangees(photos) {
  const reste = [...photos];
  const rangees = [];
  while (reste.length) {
    const large = prendre(reste, pourLarge);
    const etroite = reste.length ? prendre(reste, (p) => !enLargeur(p)) : null;
    rangees.push({ large, etroite });
  }
  return rangees;
}

function Photo({ p, large, i }) {
  const etendue = large && studio(p);
  const format = etendue ? 9 / 8 : p.width / p.height;
  const image = etendue
    ? {
      src: dossier + 'brique/large/600/' + p.id + '.jpg',
      srcSet: dossier + 'brique/large/600/' + p.id + '.jpg 600w, ' + dossier + 'brique/large/1200/' + p.id + '.jpg 1200w',
      width: 1200,
      height: 1067,
    }
    : {
      src: dossier + '480/' + p.id + '.jpg',
      srcSet: dossier + '480/' + p.id + '.jpg 480w, ' + dossier + '1600/' + p.id + '.jpg ' + p.width + 'w',
      width: p.width,
      height: p.height,
    };
  const contenu = (
    <img
      {...image}
      sizes={large ? '(max-width: 767px) 64vw, 54vw' : '(max-width: 767px) 36vw, 30vw'}
      alt={p.alt}
      loading={i < 2 ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
  const props = { className: 'aye-galerie-photo', style: { '--aye-format': format } };
  return p.lien ? <a href={p.lien} {...props}>{contenu}</a> : <div {...props}>{contenu}</div>;
}

export default function GaleriePhotos({ photos }) {
  return (
    <div className="aye-brique aye-brique-anime">
      {enRangees(photos).map(({ large, etroite }, r) => {
        const cases = [<Photo key={large.id} p={large} large i={r} />];
        if (etroite) cases.push(<Photo key={etroite.id} p={etroite} large={false} i={r} />);
        if (r % 2) cases.reverse(); // une rangee sur deux : la large a droite
        return (
          <div className={'aye-brique-rangee' + (etroite ? '' : ' aye-brique-seule')} key={large.id}>
            {cases}
          </div>
        );
      })}
    </div>
  );
}
