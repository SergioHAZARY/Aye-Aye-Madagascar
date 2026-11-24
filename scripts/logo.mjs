// Prepare le logo officiel pour le site, sans le modifier : on retire
// seulement les marges vides autour du dessin (le fichier d'origine fait
// 1024x1112 dont un quart de vide), pour que la tete ET le nom
// « AYE-AYE Madagascar » occupent toute la hauteur disponible.
//
//   logo-aye-aye.png        encre noire, pour l'en-tete
//   logo-aye-aye-blanc.png  negatif, pour le pied de page sombre
//
// Relancer avec : node scripts/logo.mjs
import sharp from 'sharp';
import fs from 'node:fs';

const SOURCE = 'public/assets/images/LOGO AYE AYE MADAGASCAR.png';
const HAUTEUR = 330; // 3x la plus grande taille d'affichage (~110 px)

const source = fs.readFileSync(SOURCE); // lu en memoire : evite le verrou Windows

// deux passes : sharp n'accepte pas trim puis resize dans la meme chaine
const rogne = await sharp(source).trim({ threshold: 10 }).png().toBuffer();
const noir = await sharp(rogne)
  .resize({ height: HAUTEUR })
  .png({ compressionLevel: 9, palette: true })
  .toBuffer();
fs.writeFileSync('public/assets/images/logo-aye-aye.png', noir);

// negatif : on inverse l'encre, pas la transparence
const blanc = await sharp(noir)
  .negate({ alpha: false })
  .png({ compressionLevel: 9, palette: true })
  .toBuffer();
fs.writeFileSync('public/assets/images/logo-aye-aye-blanc.png', blanc);

const m = await sharp(noir).metadata();
console.log('logo', m.width + 'x' + m.height, '-', (noir.length / 1024).toFixed(0) + ' Ko (noir),',
  (blanc.length / 1024).toFixed(0) + ' Ko (blanc)');
