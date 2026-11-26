import { cheminVersionne } from './chemin';

// Le seul script hors de Next : celui du projet (en-tete collant, menu du
// telephone, animations a l'apparition). La pile du template (jQuery,
// owl-carousel, scrollReveal, custom.js : 182 Ko) a ete retiree : le site
// n'en utilisait plus que l'en-tete collant et le menu, repris dans ce
// fichier. Partage par layout.js (qui le precharge des le <head>) et
// TemplateScripts (qui l'execute apres l'hydratation).
export const SCRIPT_PROJET = cheminVersionne('/assets/js/aye-aye.js'); // versionne : jamais servi perime
