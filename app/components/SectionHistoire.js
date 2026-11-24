// Section « histoire » (Collection Enfant sur l'accueil), forme demandee par
// la marque : titre centre, puis une ligne par produit, photo et texte
// alternant de cote, grand numero, nom, description et « Decouvrir ».
// Textes, police et couleurs de texte du template ; photos 3:4. Sans JS.

import { chemin } from '@/app/lib/chemin';
import { imageCarte, produitsParCategorie } from '../data/catalogue';

export default function SectionHistoire({ categorie, titre, sousTitre }) {
  const produits = produitsParCategorie(categorie);

  return (
    <section className="section aye-histoire" id={categorie}>
      <div className="container">
        <div className="section-heading">
          <h2>{titre}</h2>
          <span>{sousTitre}</span>
        </div>

        {produits.map((produit, index) => {
          const photo = imageCarte(produit.image);
          const lien = chemin('/produit/' + produit.slug + '/');
          return (
            <article className="aye-histoire-ligne" key={produit.slug}>
              <a href={lien} className="aye-histoire-photo">
                <img
                  src={photo.src}
                  srcSet={photo.srcSet}
                  sizes="(max-width: 767px) 100vw, 420px"
                  alt={produit.nom + ' – ' + produit.couleur}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <div className="aye-histoire-texte">
                <span className="aye-histoire-numero" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h4>{produit.nom}</h4>
                <p>{produit.description}</p>
                <a href={lien} className="aye-histoire-lien">Découvrir →</a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
