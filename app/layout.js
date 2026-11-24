import { chemin, cheminVersionne } from '@/app/lib/chemin';
import { SCRIPTS_TEMPLATE } from '@/app/lib/scripts-template';
import ActionsGlobales from './components/ActionsGlobales';
import Footer from './components/Footer';
import TemplateScripts from './components/TemplateScripts';

export const metadata = {
  title: 'Aye-Aye Madagascar',
  description:
    'Aye-Aye Madagascar : vêtements en coton 100 % qui célèbrent l’identité '
    + 'malagasy. Qualité premium, authenticité, fierté.',
};

// Equivalent de <meta name="viewport" content="width=device-width, initial-scale=1">.
// Next.js injecte toujours cette balise : elle doit passer par cette API, sinon
// la page se retrouve avec deux balises viewport.
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        {/* Poppins vient de Google Fonts (ici et par l'@import du template) :
            ouvrir la connexion tot evite d'attendre la feuille du template. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900&display=swap"
          rel="stylesheet"
        />

        {/* Feuilles de style du template, servies telles quelles depuis
            /public (aucune transformation par le bundler). */}
        <link rel="stylesheet" type="text/css" href={chemin('/assets/css/bootstrap.min.css')} />
        <link rel="stylesheet" type="text/css" href={chemin('/assets/css/font-awesome.css')} />
        <link rel="stylesheet" href={chemin('/assets/css/templatemo-hexashop.css')} />

        {/* Feuille du projet, chargee en dernier : les ajouts vont ici,
            les feuilles du template restent inchangees. */}
        <link rel="stylesheet" href={cheminVersionne('/assets/css/aye-aye.css')} />

        {/* Scripts du template telecharges des maintenant, en parallele du
            JavaScript de Next : TemplateScripts les execute apres
            l'hydratation, depuis le cache, sans nouvelle attente reseau. */}
        {SCRIPTS_TEMPLATE.map((src) => (
          <link key={src} rel="preload" as="script" href={src} />
        ))}
      </head>
      <body>
        {/* Pas de preloader : celui du template cachait la page jusqu'au
            dernier fichier telecharge (plusieurs secondes sur mobile), alors
            que le contenu s'affiche bien avant. */}
        {children}

        <Footer />

        <ActionsGlobales />
        <TemplateScripts />
      </body>
    </html>
  );
}
