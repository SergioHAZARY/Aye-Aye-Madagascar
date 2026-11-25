// Versions reduites des photos de la marque (public/assets/images/Homme,
// Femme, Enfant) et des photos de clients (Clients, section « Rejoignez la
// communaute »).
//
// Les photos font 899x1600 ou 720x1280 (~100 Ko). Une carte produit les affiche en
// ~370 px de large, une vignette en 80 px : charger l'original y est du poids
// perdu, surtout sur les connexions mobiles lentes. Ce script ecrit, pour
// chaque photo, des copies redimensionnees (jamais rognees : seul le format
// change) dans <dossier>/reduites/<largeur>/, pour chaque largeur inferieure
// a celle de l'original :
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

const DOSSIERS = ['public/assets/images/Homme', 'public/assets/images/Femme', 'public/assets/images/Enfant', 'public/assets/images/Clients'];
const LARGEURS = [160, 480, 720];

let avant = 0;
let apres = 0;

for (const SOURCES of DOSSIERS) for (const largeur of LARGEURS) {
  // photos de la marque seulement (DSC_xxxx, Homme_n, Femme_n, Enfant_n) : ces dossiers rangent
  // aussi des images d'exemple du template, qui n'ont pas besoin de copies
  const photos = fs.readdirSync(SOURCES).filter((f) => /^(DSC_\d+|(Homme|Femme|Enfant|Client)_\d+)\.jpe?g$/i.test(f));
  const dossier = path.join(SOURCES, 'reduites', String(largeur));
  for (const photo of photos) {
    const source = path.join(SOURCES, photo);
    const { width } = await sharp(source).metadata();
    if (largeur >= width) continue; // l'original sert deja a cette largeur
    fs.mkdirSync(dossier, { recursive: true });
    const cible = path.join(dossier, photo);
    await sharp(source)
      .resize({ width: largeur, withoutEnlargement: true })
      .jpeg({ quality: largeur <= 160 ? 70 : 74, mozjpeg: true, progressive: true })
      .toFile(cible);
    avant += fs.statSync(source).size;
    apres += fs.statSync(cible).size;
  }
  console.log(`${SOURCES} ${largeur} px`);
}
console.log(`originaux ${Math.round(avant / 1024)} Ko -> reduites ${Math.round(apres / 1024)} Ko (toutes largeurs confondues)`);
