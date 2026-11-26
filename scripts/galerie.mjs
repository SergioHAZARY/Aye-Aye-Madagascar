// Versions servies des photos de la galerie (pages /modeles/<slug>/ et
// /collections/<slug>/), d'apres la liste PHOTOS_GALERIE de app/data/galerie.mjs :
//
//   public/assets/images/galerie/160/<id>.jpg    160 px de large (vignettes de la fiche produit)
//   public/assets/images/galerie/480/<id>.jpg    480 px de large (grille)
//   public/assets/images/galerie/1600/<id>.jpg   1600 px au plus grand cote
//                                                (grille sur ecran 2x, agrandissement)
//
// Photos entieres, jamais rognees (seule la taille change). Les sources
// « n:… » sont dans photos-originales/nouvelles/ (local, non versionne) ; une
// sortie deja faite n'est pas refaite, donc le script tourne aussi sans elles.
// Ecrit les dimensions de chaque version 1600 dans app/data/galerie-tailles.mjs.
//   node scripts/galerie.mjs
import sharp from 'sharp';
import fs from 'node:fs';
import { CLIENTS, PHOTOS_GALERIE, idPhoto } from '../app/data/galerie.mjs';

const SORTIE = 'public/assets/images/galerie/';
const tailles = {};
for (const d of ['160', '480', '1600']) fs.mkdirSync(SORTIE + d, { recursive: true });

for (const [source] of PHOTOS_GALERIE) {
  const id = idPhoto(source);
  if (CLIENTS.has(id)) continue; // photos de clients : affichees nulle part
  const chemin = source.startsWith('n:') ? 'photos-originales/nouvelles/' + source.slice(2) : 'public/assets/images/' + source;
  const grande = SORTIE + '1600/' + id + '.jpg';
  const petite = SORTIE + '480/' + id + '.jpg';
  if (!fs.existsSync(grande) || !fs.existsSync(petite)) {
    // fond blanc pour les PNG transparents, orientation EXIF appliquee
    const base = () => sharp(chemin).rotate().flatten({ background: '#ffffff' });
    await base().resize(1600, 1600, { fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 78, mozjpeg: true }).toFile(grande);
    await base().resize(480).jpeg({ quality: 75, mozjpeg: true }).toFile(petite);
  }
  const vignette = SORTIE + '160/' + id + '.jpg';
  if (!fs.existsSync(vignette)) await sharp(petite).resize(160).jpeg({ quality: 70, mozjpeg: true }).toFile(vignette);
  const { width, height } = await sharp(grande).metadata();
  tailles[id] = [width, height];
}

fs.writeFileSync('app/data/galerie-tailles.mjs',
  '// Dimensions des photos de public/assets/images/galerie/1600/ (largeur, hauteur).\n'
  + '// Fichier ecrit par scripts/galerie.mjs : ne pas modifier a la main.\n'
  + 'export default ' + JSON.stringify(tailles, null, 1).replace(/\n\s*(\d)/g, ' $1').replace(/\n\s*\]/g, ']') + ';\n');
console.log(Object.keys(tailles).length, 'photos');
