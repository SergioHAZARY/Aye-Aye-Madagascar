/* Service worker Aye-Aye Madagascar : garde les fichiers du site sur
   l'appareil du visiteur.

   Pourquoi : GitHub Pages ne laisse le navigateur garder un fichier que
   10 minutes (Cache-Control: max-age=600). Passe ce delai, chaque page
   redemande au serveur ses ~25 fichiers (CSS, JS, images, polices), et chaque
   demande coute un aller-retour (~0,7 s depuis Madagascar). Ici :

   - pages HTML : le reseau d'abord (une mise a jour du site se voit tout de
     suite) ; si le reseau ne repond pas en 2,5 s ou est coupe, la derniere
     version gardee s'affiche ;
   - fichiers de Next (_next/static, noms uniques a chaque build) : gardes une
     fois pour toutes ;
   - autres fichiers du site et polices Google : la copie gardee s'affiche
     tout de suite, et une copie fraiche est demandee en arriere-plan pour la
     visite suivante.

   Seules les requetes GET passent ici ; en cas d'erreur, le navigateur
   retombe sur le reseau. Pour retirer le service worker en urgence : publier
   un sw.js qui appelle self.registration.unregister(). */

// sw.js?v=<version du build> : une nouvelle publication installe un nouveau
// service worker, qui vide les copies de la precedente (voir 'activate').
const VERSION = new URL(self.location).searchParams.get('v') || 'v1';
const CACHE_PAGES = 'aye-pages-' + VERSION;
const CACHE_FICHIERS = 'aye-fichiers-' + VERSION;
const BASE = new URL('./', self.location).pathname; // '/Aye-Aye-Madagascar/' en ligne, '/' en local
const DELAI_RESEAU = 2500;
const MAX_FICHIERS = 300;
const POLICES = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'];

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (evenement) => {
  evenement.waitUntil((async () => {
    const noms = await caches.keys();
    await Promise.all(noms
      .filter((nom) => nom.startsWith('aye-') && nom !== CACHE_PAGES && nom !== CACHE_FICHIERS)
      .map((nom) => caches.delete(nom)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (evenement) => {
  const requete = evenement.request;
  if (requete.method !== 'GET') return;
  const url = new URL(requete.url);

  if (url.origin === self.location.origin) {
    if (!url.pathname.startsWith(BASE) || url.pathname === BASE + 'sw.js') return;
    // les pages du site finissent toutes par « / » (trailingSlash)
    if (requete.mode === 'navigate' || url.pathname.endsWith('/')) {
      evenement.respondWith(page(requete, url));
    } else {
      const immuable = url.pathname.startsWith(BASE + '_next/static/');
      evenement.respondWith(fichier(evenement, requete, immuable));
    }
  } else if (POLICES.includes(url.origin)) {
    evenement.respondWith(fichier(evenement, requete, url.origin === 'https://fonts.gstatic.com'));
  }
});

async function page(requete, url) {
  const cache = await caches.open(CACHE_PAGES);
  const cle = url.origin + url.pathname; // /recherche/?q=… : meme page statique
  const reseau = fetch(requete).then((reponse) => {
    if (reponse.ok && reponse.type === 'basic') cache.put(cle, reponse.clone());
    return reponse;
  });
  const gardee = await cache.match(cle);
  if (!gardee) return reseau;
  return Promise.race([
    reseau.catch(() => gardee),
    new Promise((resoudre) => setTimeout(() => resoudre(gardee), DELAI_RESEAU)),
  ]);
}

async function fichier(evenement, requete, immuable) {
  const cache = await caches.open(CACHE_FICHIERS);
  const gardee = await cache.match(requete);
  if (gardee && immuable) return gardee;
  const reseau = fetch(requete).then(async (reponse) => {
    if (reponse.ok || reponse.type === 'opaque') {
      await cache.put(requete, reponse.clone());
      const cles = await cache.keys();
      if (cles.length > MAX_FICHIERS) await Promise.all(cles.slice(0, cles.length - MAX_FICHIERS).map((c) => cache.delete(c)));
    }
    return reponse;
  });
  if (gardee) {
    evenement.waitUntil(reseau.catch(() => {}));
    return gardee;
  }
  return reseau;
}
