// Une page par collection (dessin au dos) : toutes ses photos, sur tous les
// modeles (app/data/galerie.mjs), la vue de dos en premier. On y arrive en
// cliquant sur la photo d'une collection, page /collections/.
import { chemin } from '@/app/lib/chemin';
import { notFound } from 'next/navigation';
import PageGalerie from '../../components/PageGalerie';
import { COLLECTIONS } from '../../data/catalogue';
import { photosDeLaCollection } from '../../data/galerie.mjs';

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const collection = COLLECTIONS.find((c) => c.slug === slug);
  return collection ? { title: 'Collection ' + collection.nom + ' — Aye-Aye Madagascar', description: collection.texte } : {};
}

export default async function PageCollection({ params }) {
  const { slug } = await params;
  const collection = COLLECTIONS.find((c) => c.slug === slug);
  if (!collection) notFound();
  return (
    <PageGalerie
      actif="collections"
      classeEntete=""
      titre={collection.nom}
      texte={collection.texte}
      page={{ champ: 'collection', slug }}
      photos={photosDeLaCollection(slug)}
      retour={{ lien: chemin('/collections/'), texte: 'Toutes nos collections' }}
      autres={COLLECTIONS.map((c) => ({ slug: c.slug, nom: c.nom, lien: '/collections/' + c.slug + '/', actif: c.slug === slug }))}
    />
  );
}
