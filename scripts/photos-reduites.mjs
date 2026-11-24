// Versions reduites des photos de la marque (public/assets/images/Homme).
//
// Les photos font 899x1600 (~100 Ko). Une carte produit les affiche en
// ~370 px de large, une vignette en 80 px : charger l'original y est du poids
// perdu, surtout sur les connexions mobiles lentes. Ce script ecrit, pour
// chaque photo, des copies redimensionnees (jamais rognees : seul le format
// change) dans Homme/reduites/<largeur>/ :
//
//   160  vignettes (galerie de la fiche, recherche, panier)
//   480  cartes produit sur ordinateur
//   720  cartes produit sur telephone (ecran 2x)
//
// Le site les choisit via photoReduite() / srcsetPhoto() de
// app/data/catalogue.js. A relancer apres avoir ajoute ou remplace une photo :
//   node scripts/photos-reduites.mjs
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const SOURCES = 'public/assets/images/Homme';
const LARGEURS = [160, 480, 720];

const photos = fs.readdirSync(SOURCES).filter((f) => /\.jpe?g$/i.test(f));
let avant = 0;
let apres = 0;

for (const largeur of LARGEURS) {
  const dossier = path.join(SOURCES, 'reduites', String(largeur));
  fs.mkdirSync(dossier, { recursive: true });
  for (const photo of photos) {
    const source = path.join(SOURCES, photo);
    const cible = path.join(dossier, photo);
    await sharp(source)
      .resize({ width: largeur, withoutEnlargement: true })
      .jpeg({ quality: largeur <= 160 ? 70 : 74, mozjpeg: true, progressive: true })
      .toFile(cible);
    avant += fs.statSync(source).size;
    apres += fs.statSync(cible).size;
  }
  console.log(`${largeur} px : ${photos.length} photos`);
}
console.log(`originaux ${Math.round(avant / 1024)} Ko -> reduites ${Math.round(apres / 1024)} Ko (toutes largeurs confondues)`);
