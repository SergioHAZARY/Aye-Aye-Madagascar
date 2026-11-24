/** @type {import('next').NextConfig} */
const nextConfig = {
  // Le site d'origine est 100 % statique : on garde le meme modele de
  // deploiement. `npm run build` genere le dossier `out/` deposable tel quel
  // sur n'importe quel hebergement (comme les .html d'origine).
  output: 'export',

  // Les URLs se terminent par `/` -> genere `about/index.html`, etc.
  trailingSlash: true,

  // Les <img> du template restent des <img> natifs (aucun changement de rendu).
  images: { unoptimized: true },

  // Sous-dossier de publication : vide en local, /Aye-Aye-Madagascar sur
  // GitHub Pages (defini par la GitHub Action). Next.js prefixe ainsi ses
  // propres fichiers (/_next/...) ; nos liens passent par app/lib/chemin.js.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
};

export default nextConfig;
