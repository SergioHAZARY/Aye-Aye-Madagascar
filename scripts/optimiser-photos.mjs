// Optimise les photos de marque trop lourdes pour le web.
//
// Les photos sortent de l'appareil en 3400x6048 et pesent ~1 Mo ; sur le site
// elles sont affichees a 350-600 px de large. Ce script les redimensionne et
// les recompresse, en gardant une copie intacte dans photos-originales/.
//
// Usage :  node scripts/optimiser-photos.mjs            (apercu, n'ecrit rien)
//          node scripts/optimiser-photos.mjs --appliquer
//
// Les images du template (toutes sous le seuil) ne sont jamais touchees.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOSSIER = path.join(RACINE, 'public', 'assets', 'images');
const SAUVEGARDE = path.join(RACINE, 'photos-originales');

const SEUIL_OCTETS = 500 * 1024; // au-dela de 500 Ko
const COTE_MAX = 1600;           // plus grand cote, en pixels
const QUALITE = 80;

const appliquer = process.argv.includes('--appliquer');
const ko = (n) => (n / 1024).toFixed(0).padStart(5) + ' Ko';

function lister(dossier) {
  const out = [];
  for (const entree of fs.readdirSync(dossier, { withFileTypes: true })) {
    const complet = path.join(dossier, entree.name);
    if (entree.isDirectory()) out.push(...lister(complet));
    else if (/\.(jpe?g|png)$/i.test(entree.name) && fs.statSync(complet).size > SEUIL_OCTETS) {
      out.push(complet);
    }
  }
  return out;
}

const fichiers = lister(DOSSIER);
if (fichiers.length === 0) {
  console.log('Aucune image au-dessus de ' + ko(SEUIL_OCTETS) + '. Rien a faire.');
  process.exit(0);
}

let avant = 0;
let apres = 0;

for (const fichier of fichiers) {
  const relatif = path.relative(DOSSIER, fichier);
  // On lit le fichier en memoire : sous Windows, sharp garde sinon la source
  // ouverte et la reecriture du meme chemin echoue.
  const source = fs.readFileSync(fichier);
  const tailleAvant = source.length;
  const meta = await sharp(source).metadata();

  const transforme = sharp(source)
    .rotate() // respecte l'orientation EXIF avant de retirer les metadonnees
    .resize({ width: COTE_MAX, height: COTE_MAX, fit: 'inside', withoutEnlargement: true });

  const mime = meta.format === 'png' ? 'png' : 'jpeg';
  const mémoire = await (mime === 'png'
    ? transforme.png({ compressionLevel: 9, palette: true }).toBuffer()
    : transforme.jpeg({ quality: QUALITE, mozjpeg: true }).toBuffer());

  avant += tailleAvant;
  apres += mémoire.length;

  const gain = (100 - (mémoire.length / tailleAvant) * 100).toFixed(0);
  console.log(
    relatif.padEnd(34)
    + meta.width + 'x' + meta.height
    + '  ' + ko(tailleAvant) + ' -> ' + ko(mémoire.length)
    + '  (-' + gain + ' %)'
  );

  if (appliquer) {
    const copie = path.join(SAUVEGARDE, relatif);
    if (!fs.existsSync(copie)) {
      fs.mkdirSync(path.dirname(copie), { recursive: true });
      fs.copyFileSync(fichier, copie);
    }
    fs.writeFileSync(fichier, mémoire);
  }
}

console.log('\n' + fichiers.length + ' photo(s) : ' + ko(avant) + ' -> ' + ko(apres)
  + '  (-' + (100 - (apres / avant) * 100).toFixed(0) + ' %)');
console.log(appliquer
  ? 'Applique. Originaux conserves dans photos-originales/.'
  : 'Apercu seulement. Relancez avec --appliquer pour ecrire les fichiers.');
