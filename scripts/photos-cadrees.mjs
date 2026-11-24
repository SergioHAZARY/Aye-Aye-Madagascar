// Fabrique toutes les images du site tirees des photos de la marque :
// banniere d'accueil, bandeaux de titre, vignettes « Suivez-nous » et
// « Decouvrez », piliers et image « Notre histoire » de la page A propos,
// photos des collections.
//
// REGLE UNIQUE : AUCUNE PHOTO N'EST ROGNEE.
// Les photos sont en portrait (899x1600) et les cadres en paysage ou carres.
// La photo entiere tient dans le cadre ; le manque est comble en etirant la
// bordure de la photo (colonne de gauche, colonne de droite, ligne du haut).
// Le fond d'atelier etant un gris uni, il se prolonge sans raccord visible.
// Condition : la bordure etiree doit etre du fond. DSC_1806 (bras leve qui
// touche le bord gauche) ne s'y prete pas et n'est pas utilisee.
//
// Images portant du texte blanc (banniere, bandeaux) : meme tonalite sombre
// que les images du template qu'elles remplacent, c'est ce qui rend le texte
// lisible sans voile CSS. Les autres gardent leurs couleurs naturelles.
//
// Relancer avec : node scripts/photos-cadrees.mjs
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const SOURCES = 'public/assets/images/Homme';
const IMAGES = 'public/assets/images';
const ASSOMBRIR_FOND = Number(process.env.ASSOMBRIR_FOND || 1);
const LUMIERE_DIAPOS = Number(process.env.LUMIERE_DIAPOS || 1.15);

// voile sombre degrade : depuis la gauche (titre de la banniere ordinateur)
// ou depuis le bas (texte en bas du hero mobile)
function voile(largeur, hauteur, debut, fin, arret, sens = 'gauche') {
  const axe = sens === 'bas' ? 'x1="0" y1="1" x2="0" y2="0"' : 'x1="0" y1="0" x2="1" y2="0"';
  return Buffer.from(
    `<svg width="${largeur}" height="${hauteur}">
       <defs>
         <linearGradient id="v" ${axe}>
           <stop offset="0%" stop-color="#000" stop-opacity="${debut}"/>
           <stop offset="${arret}%" stop-color="#000" stop-opacity="${fin}"/>
           <stop offset="100%" stop-color="#000" stop-opacity="${fin}"/>
         </linearGradient>
       </defs>
       <rect width="100%" height="100%" fill="url(#v)"/>
     </svg>`,
  );
}

// etire une bande de 1 px prise au bord de `image` pour couvrir largeur x hauteur.
// 1 px et pas plus : une fois la photo reduite, une bande plus large attrape
// le bout d une manche proche du bord et laisse une trainee de couleur.
async function etirer(image, zone, largeur, hauteur, nettoyer = false) {
  let bande = sharp(image).extract(zone);
  if (nettoyer) bande = sharp(await sansDebord(bande));
  // flou le long de la bande : efface le grain JPEG, qui sinon devient des
  // lignes fines une fois etire ; le degrade lent du fond est conserve
  const floue = await bande.blur(6).toBuffer();
  return sharp(floue).resize(largeur, hauteur, { fit: 'fill' }).toBuffer();
}

// Bande de bord ou le sujet deborde (Femme_1 : la manche droite touche le
// bord) : chaque pixel trop different du fond qui l'entoure (mediane glissante
// sur un quart de la bande) prend la couleur de ce fond. Sans cela, la manche
// s'etirerait en une trainee sur toute la largeur du comble.
async function sansDebord(bande) {
  const { data, info } = await bande.removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const n = info.width * info.height;
  const c = info.channels;
  const demi = Math.max(15, Math.round(n / 8));
  const propre = Buffer.from(data);
  for (let i = 0; i < n; i++) {
    const debut = Math.max(0, i - demi);
    const fin = Math.min(n, i + demi + 1);
    const mediane = [];
    for (let k = 0; k < c; k++) {
      const valeurs = [];
      for (let j = debut; j < fin; j++) valeurs.push(data[j * c + k]);
      valeurs.sort((a, b) => a - b);
      mediane.push(valeurs[valeurs.length >> 1]);
    }
    const ecart = Math.max(...mediane.map((m, k) => Math.abs(data[i * c + k] - m)));
    if (ecart > 24) for (let k = 0; k < c; k++) propre[i * c + k] = mediane[k];
  }
  return sharp(propre, { raw: { width: info.width, height: info.height, channels: c } }).png().toBuffer();
}

// Variante pour les photos en exterieur (decor charge) : la bande de bord est
// lissee sur toute sa longueur (degrade continu, sans les rayures qu'y
// laisseraient les details du decor). Rend une bande de 1 px, assombrie.
async function bandeLisse(image, zone, nettoyer, assombrir) {
  let bande = sharp(image).extract(zone);
  if (nettoyer) bande = sharp(await sansDebord(bande));
  const verticale = zone.width === 1;
  const longueur = verticale ? zone.height : zone.width;
  const n = Math.max(6, Math.round(longueur / 30));
  const resume = await bande.resize(verticale ? 1 : n, verticale ? n : 1, { fit: 'fill' }).toBuffer();
  const lisse = await sharp(resume).resize(verticale ? 1 : longueur, verticale ? longueur : 1, { fit: 'fill', kernel: 'cubic' }).toBuffer();
  return sharp(lisse).modulate({ brightness: assombrir }).removeAlpha().toBuffer();
}

// Masque de fondu : la photo passe en douceur dans le degrade sur `fondu`
// pixels, sur les bords demandes (gauche, droite, haut).
function masqueFondu(largeur, hauteur, fondu, aGauche, aDroite, enHaut, enBas = false) {
  const masque = Buffer.alloc(largeur * hauteur);
  const lisse = (a) => { const b = Math.max(0, Math.min(1, a)); return b * b * (3 - 2 * b); };
  for (let y = 0; y < hauteur; y++) {
    const ay = (enHaut ? lisse(y / fondu) : 1) * (enBas ? lisse((hauteur - 1 - y) / fondu) : 1);
    for (let x = 0; x < largeur; x++) {
      let ax = 1;
      if (aGauche) ax = Math.min(ax, x / fondu);
      if (aDroite) ax = Math.min(ax, (largeur - 1 - x) / fondu);
      masque[y * largeur + x] = Math.round(255 * lisse(ax) * ay);
    }
  }
  return masque;
}

// Composition « photo en exterieur » : fond fait de degrades lisses tires des
// bords de la photo (cotes, et haut s'il reste une marge), puis la photo
// entiere par-dessus, fondue sur ses bords.
// `marge` (au-dessus de la photo) et `margeBas` (en dessous) sont comblees par
// les couleurs du haut et du bas de la photo.
async function composerFondu({ sujet, ls, hs, largeur, hauteur, gauche, marge, margeBas = 0, fondu, bordsPropres, retrait }) {
  const droite = largeur - gauche - ls;
  const calques = [];
  // cotes : bande de 1 px sur la hauteur de la photo, prolongee vers le haut
  // (couleur du haut) sur la marge, puis etiree en largeur
  const cote = async (x, larg, gaucheCalque) => {
    const bande = await bandeLisse(sujet, { left: x, top: 0, width: 1, height: hs }, bordsPropres, ASSOMBRIR_FOND);
    // prolongement vers le haut a la main (extendWith: 'copy' laisse du noir
    // avec cette version de sharp) : le premier pixel, repete sur la marge
    let pleine = bande;
    if (marge > 0 || margeBas > 0) {
      const morceaux = [{ input: bande, left: 0, top: marge }];
      if (marge > 0) morceaux.push({ input: await sharp(bande).extract({ left: 0, top: 0, width: 1, height: 1 }).resize(1, marge, { fit: 'fill' }).toBuffer(), left: 0, top: 0 });
      if (margeBas > 0) morceaux.push({ input: await sharp(bande).extract({ left: 0, top: hs - 1, width: 1, height: 1 }).resize(1, margeBas, { fit: 'fill' }).toBuffer(), left: 0, top: marge + hs });
      pleine = await sharp({ create: { width: 1, height: hauteur, channels: 3, background: '#000' } }).composite(morceaux).png().toBuffer();
    }
    calques.push({ input: await sharp(pleine).resize(larg, hauteur, { fit: 'fill' }).toBuffer(), left: gaucheCalque, top: 0 });
  };
  if (gauche > 0) await cote(retrait, gauche + fondu, 0);
  if (droite > 0) await cote(ls - 1 - retrait, droite + fondu, gauche + ls - fondu);
  // haut : ligne superieure lissee, etiree sur la marge (et sous le fondu)
  if (marge > 0) {
    const ligne = await bandeLisse(sujet, { left: 0, top: 0, width: ls, height: 1 }, false, ASSOMBRIR_FOND);
    const haut = await sharp(ligne).resize(ls, marge + fondu, { fit: 'fill' }).removeAlpha().toBuffer();
    // fondu horizontal vers les cotes, sinon une marche apparait a la jonction
    const masqueHaut = masqueFondu(ls, marge + fondu, fondu, gauche > 0, droite > 0, false);
    calques.push({ input: await sharp(haut).joinChannel(masqueHaut, { raw: { width: ls, height: marge + fondu, channels: 1 } }).png().toBuffer(), left: gauche, top: 0 });
  }
  // bas : ligne inferieure lissee, etiree sur la marge du bas (et sous le fondu)
  if (margeBas > 0) {
    const ligne = await bandeLisse(sujet, { left: 0, top: hs - 1, width: ls, height: 1 }, false, ASSOMBRIR_FOND);
    const bas = await sharp(ligne).resize(ls, margeBas + fondu, { fit: 'fill' }).removeAlpha().toBuffer();
    const masqueBas = masqueFondu(ls, margeBas + fondu, fondu, gauche > 0, droite > 0, false);
    calques.push({ input: await sharp(bas).joinChannel(masqueBas, { raw: { width: ls, height: margeBas + fondu, channels: 1 } }).png().toBuffer(), left: gauche, top: marge + hs - fondu });
  }
  // photo : RGB d'abord (pipeline separe), puis le masque en canal alpha
  const rgb = await sharp(sujet).removeAlpha().toBuffer();
  const masque = masqueFondu(ls, hs, fondu, gauche > 0, droite > 0, marge > 0, margeBas > 0);
  calques.push({ input: await sharp(rgb).joinChannel(masque, { raw: { width: ls, height: hs, channels: 1 } }).png().toBuffer(), left: gauche, top: marge });
  return calques;
}

async function composer({
  source, sortie, largeur, hauteur,
  echelle = 1,            // part de la hauteur occupee par la photo (marge en haut)
  position = 'centre',    // 'centre', 'droite', ou un nombre : centre du sujet en part de la largeur (0,65)
  lumiere = 1, saturation = 1, gradient = null,
  bordsPropres = false,   // nettoyer les bandes de bord (sujet qui touche le bord)
  retrait = 0,            // bande prise a n px du bord (bord de photo plus sombre)
  fondu = 0,              // > 0 : photo en exterieur, degrade lisse + fondu de n px
  haut = 1,               // avec fondu : part de la marge placee au-dessus de la photo (le reste en dessous)
}) {
  // 'DSC_1793.jpg' : dossier Homme ; 'Femme/Femme_1.jpeg' : relatif a images/
  const photo = fs.readFileSync(source.includes('/') ? path.join(IMAGES, source) : path.join(SOURCES, source));


  // 1. la photo entiere, a la hauteur voulue
  const hs = Math.round(hauteur * echelle);
  const sujet = await sharp(photo)
    .resize({ height: hs, fit: 'inside' })
    .modulate({ brightness: lumiere, saturation })
    .toBuffer();
  const { width: ls } = await sharp(sujet).metadata();

  // 2. marge du haut : on etire la ligne superieure (le bas de la photo reste
  //    ancre en bas du cadre, les jambes sortent du cadre comme sur l'original)
  let colonne = sujet;
  const marge = hauteur - hs;
  if (marge > 0) {
    colonne = await sharp({ create: { width: ls, height: hauteur, channels: 3, background: '#808080' } })
      .composite([
        { input: await etirer(sujet, { left: 0, top: 0, width: ls, height: 1 }, ls, marge, bordsPropres), left: 0, top: 0 },
        { input: sujet, left: 0, top: marge },
      ])
      .png()
      .toBuffer();
  }

  // 3. cotes : on etire la colonne de gauche et celle de droite
  let gauche = Math.round((largeur - ls) / 2);
  if (position === 'droite') gauche = Math.max(0, largeur - ls - Math.round(largeur * 0.04));
  else if (typeof position === 'number') gauche = Math.min(largeur - ls, Math.max(0, Math.round(largeur * position - ls / 2)));
  const droite = largeur - gauche - ls;

  // avec `retrait`, le comble recouvre aussi les `retrait` derniers pixels de
  // la photo (sa bordure plus sombre, qui dessinerait une ligne) : du fond.
  let calques = [{ input: colonne, left: gauche, top: 0 }];
  if (fondu) {
    const margeHaut = Math.round(marge * haut);
    calques = await composerFondu({ sujet, ls, hs, largeur, hauteur, gauche, marge: margeHaut, margeBas: marge - margeHaut, fondu, bordsPropres, retrait });
    if (gradient) calques.push({ input: voile(largeur, hauteur, ...gradient), left: 0, top: 0 });
    const image = await sharp({ create: { width: largeur, height: hauteur, channels: 3, background: '#808080' } })
      .composite(calques).jpeg({ quality: 84, mozjpeg: true }).toBuffer();
    return ecrire(image, sortie, largeur, hauteur);
  }
  if (gauche > 0) {
    calques.push({ input: await etirer(colonne, { left: retrait, top: 0, width: 1, height: hauteur }, gauche + retrait, hauteur, bordsPropres), left: 0, top: 0 });
  }
  if (droite > 0) {
    calques.push({ input: await etirer(colonne, { left: ls - 1 - retrait, top: 0, width: 1, height: hauteur }, droite + retrait, hauteur, bordsPropres), left: gauche + ls - retrait, top: 0 });
  }
  if (gradient) calques.push({ input: voile(largeur, hauteur, ...gradient), left: 0, top: 0 });

  const image = await sharp({ create: { width: largeur, height: hauteur, channels: 3, background: '#808080' } })
    .composite(calques)
    .jpeg({ quality: 84, mozjpeg: true })
    .toBuffer();
  return ecrire(image, sortie, largeur, hauteur);
}

async function ecrire(image, sortie, largeur, hauteur) {
  fs.mkdirSync(path.dirname(path.join(IMAGES, sortie)), { recursive: true });
  fs.writeFileSync(path.join(IMAGES, sortie), image);

  const st = await sharp(image).stats();
  const moy = st.channels.slice(0, 3).map((c) => Math.round(c.mean));
  console.log(
    sortie.padEnd(28),
    (largeur + 'x' + hauteur).padEnd(10),
    (image.length / 1024).toFixed(0).padStart(4) + ' Ko',
    '  gris moyen ' + String(Math.round(moy.reduce((a, b) => a + b) / 3)).padStart(3),
  );
}

// --- Banniere d'accueil (texte blanc : tonalite du template, 77 et ~95) ------
// tablette (768 a 991 px) : format 3:2, personnage entier a droite, assez
// etroit pour laisser la moitie gauche, sombre, au texte
await composer({
  source: 'DSC_1793.jpg', sortie: 'banniere/principale-tablette.jpg', largeur: 1050, hauteur: 700,
  echelle: 0.85, position: 'droite', lumiere: 0.93, saturation: 0.30, gradient: [0.85, 0.30, 62],
});
// banniere pleine largeur des ordinateurs (992 px et plus) : meme photo et
// meme ton, format panoramique (~2,2:1), personnage entier centre a 65 % de la
// largeur (« au centre, un peu a droite », demande de la marque), texte a
// gauche sur le voile sombre. aye-aye.css s'appuie sur ces 65 %. Les tuiles Homme / Femme / Enfant / Accessoires
// ont ete retirees a la demande de la marque (une seule banniere).
await composer({
  source: 'DSC_1793.jpg', sortie: 'banniere/principale-large.jpg', largeur: 1760, hauteur: 800,
  echelle: 0.85, position: 0.65, lumiere: 0.93, saturation: 0.30, gradient: [0.85, 0.30, 70],
});

// Diapositives 2 et 3 du carrousel de la banniere (Femme_2, Femme_5) : memes
// formats que la banniere principale (panoramique, tablette, mobile), memes
// voiles sombres pour le texte blanc. Photos en exterieur : le cadre est
// complete par un degrade lisse tire de leurs bords, dans lequel la photo se
// fond sur 90 px (fondu) - ni rayures, ni flou (refuse par la marque), ni
// rognage ; bordsPropres retire la main de Femme_5 qui touche le bord droit. Elles ont les bras ecartes et
// occupent toute la largeur de la photo : centre a 68 % (aye-aye.css garde
// 30 px entre le texte et la photo). Tablette : sujet un peu reduit (0,85)
// pour rester hors du texte ; mobile : 0,7 pour que le cover des petits
// ecrans ne rogne que du fond.
// echelle : le haut de la tete tombe vers 22 % de la hauteur sur les trois
// diapositives (comme sur Femme_2, qui a beaucoup de ciel), donc nettement
// sous l'en-tete transparent ; Femme_5 et DSC_1793 sont reduites en
// consequence (0,88 et 0,85 ci-dessus).
// Mobile (et tablette en portrait) : photo aussi grande que la largeur le
// permet (0,8), placee pour que la tete tombe vers 19 % de la hauteur, comme
// sur l'image de l'homme ; le reste de la marge passe sous la photo (haut :
// part de la marge au-dessus).
const DIAPOS = [['Femme/Femme_2.jpeg', 2, 1, 0.07], ['Femme/Femme_5.jpeg', 3, 0.88, 0.5]];
for (const [source, n, echelleLarge, hautMobile] of DIAPOS) {
  const reglage = { source, lumiere: LUMIERE_DIAPOS, saturation: 0.6, bordsPropres: true, retrait: 2, fondu: 90 };
  await composer({ ...reglage, sortie: 'banniere/diapo-' + n + '-large.jpg', largeur: 1760, hauteur: 800, echelle: echelleLarge, position: 0.68, gradient: [0.85, 0.30, 70] });
  await composer({ ...reglage, sortie: 'banniere/diapo-' + n + '-tablette.jpg', largeur: 1050, hauteur: 700, echelle: 0.85, position: 'droite', gradient: [0.85, 0.30, 62] });
  await composer({ ...reglage, sortie: 'banniere/diapo-' + n + '-mobile.jpg', largeur: 800, hauteur: 1500, echelle: 0.8, haut: hautMobile, gradient: [0.85, 0.12, 58, 'bas'] });
}

// hero mobile (portrait, plein ecran) : meme photo et meme ton, personnage
// entier avec de la marge sur les cotes (le navigateur l'affiche en cover et
// peut rogner jusqu'a ~4 % de la largeur : seul du fond disparait), voile
// montant du bas sous le texte
await composer({
  source: 'DSC_1793.jpg', sortie: 'banniere/principale-mobile.jpg', largeur: 800, hauteur: 1500,
  echelle: 0.88, lumiere: 0.9, saturation: 0.30, gradient: [0.85, 0.12, 58, 'bas'],
});

// --- Bandeaux de titre (texte blanc : tonalite du template, 55 a 62) ---------
// Affiches en background-size: cover : le navigateur rogne un peu le haut et
// le bas sur grand ecran, les cotes sur mobile. Sujet centre, 8 % de marge en
// haut : seul du fond peut disparaitre.
await composer({
  source: 'DSC_1807.jpg', sortie: 'banniere/entete.jpg', largeur: 1600, hauteur: 520,
  echelle: 0.92, lumiere: 0.44, saturation: 0.45,
});
await composer({
  source: 'DSC_1795.jpg', sortie: 'banniere/entete-marque.jpg', largeur: 1600, hauteur: 520,
  echelle: 0.92, lumiere: 0.43, saturation: 0.45,
});

// --- Vignettes « Suivez-nous » (01 et 05 servent aussi a « Decouvrez ») ------
const SOCIAL = ['DSC_1804.jpg', 'DSC_1805.jpg', 'DSC_1807.jpg', 'DSC_1809.jpg', 'DSC_1793.jpg', 'DSC_1794.jpg'];
for (const [i, source] of SOCIAL.entries()) {
  await composer({ source, sortie: 'social/0' + (i + 1) + '.jpg', largeur: 320, hauteur: 320 });
}

// --- Page A propos -------------------------------------------------------------
const PILIERS = ['DSC_1795.jpg', 'DSC_1807.jpg', 'Basta Lion.jpeg'];
for (const [i, source] of PILIERS.entries()) {
  await composer({ source, sortie: 'piliers/0' + (i + 1) + '.jpg', largeur: 310, hauteur: 250 });
}
await composer({ source: 'DSC_1808.jpg', sortie: 'apropos/histoire.jpg', largeur: 570, hauteur: 422 });

// --- Cartes 3:4 : cartes produit, page Collections, page Modeles ------------
// Un seul format de carte pour tout le site, pour que les photos s'alignent.
// Photos de studio seulement (fond uni, prolonge sans raccord) ; les photos
// d'exterieur sont affichees telles quelles, entieres, sur le fond clair de
// la carte (object-fit: contain dans aye-aye.css) : jamais de flou (refuse
// par la marque) ni de rognage. Le site choisit via imageCarte() de
// app/data/catalogue.js ; ajouter ici toute nouvelle photo de studio.
const CARTES = [
  ...['DSC_1793.jpg', 'DSC_1794.jpg', 'DSC_1795.jpg', 'DSC_1804.jpg', 'DSC_1805.jpg', 'DSC_1807.jpg', 'DSC_1808.jpg', 'DSC_1809.jpg'].map((source) => ({ source })),
  { source: 'DSC_1806.jpg', bordsPropres: true, retrait: 2 }, // bras leve contre le bord gauche
  { source: 'Femme/Femme_1.jpeg', bordsPropres: true, retrait: 2 }, // manche contre le bord droit
  { source: 'Homme/Homme_1.jpeg', bordsPropres: true, retrait: 2 },
];
for (const carte of CARTES) {
  const nom = path.basename(carte.source).replace(/\.jpe?g$/i, '.jpg');
  for (const [largeur, hauteur] of [[480, 640], [720, 960]]) {
    await composer({ ...carte, sortie: 'cartes/' + largeur + '/' + nom, largeur, hauteur });
  }
}
