// Une page par modele (coupe) : toutes ses photos, toutes collections
// confondues (app/data/galerie.mjs). On y arrive en cliquant sur la photo
// d'un modele, page /modeles/.
import { chemin } from '@/app/lib/chemin';
import { notFound } from 'next/navigation';
import PageGalerie from '../../components/PageGalerie';
import { MODELES } from '../../data/catalogue';
import { photosDuModele } from '../../data/galerie.mjs';

export function generateStaticParams() {
  return MODELES.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const modele = MODELES.find((m) => m.slug === slug);
  return modele ? { title: modele.nom + ' — Aye-Aye Madagascar', description: modele.texte } : {};
}

export default async function PageModele({ params }) {
  const { slug } = await params;
  const modele = MODELES.find((m) => m.slug === slug);
  if (!modele) notFound();
  return (
    <PageGalerie
      actif="modeles"
      classeEntete="aye-entete-face"
      titre={modele.nom}
      texte={modele.texte}
      photos={photosDuModele(slug)}
      retour={{ lien: chemin('/modeles/'), texte: 'Tous nos modèles' }}
      autres={MODELES.map((m) => ({ slug: m.slug, nom: m.nom, lien: '/modeles/' + m.slug + '/', actif: m.slug === slug }))}
    />
  );
}
