// « Nos collections » (accueil) : titre centre sous un surtitre, puis une
// ligne par collection (dessin au dos), photo 3:4 et texte alternant de cote,
// grand numero, nom, histoire du motif et lien. Les trois premieres
// collections, puis un bouton vers la page Collections. Sans JavaScript.

import { chemin } from '@/app/lib/chemin';
import { COLLECTIONS, imageCarte } from '../data/catalogue';

export default function SectionHistoire({ nombre = 3 }) {
  const collections = COLLECTIONS.filter((c) => c.image).slice(0, nombre);

  return (
    <section className="section aye-histoire" id="nos-collections">
      <div className="container">
        <div className="section-heading">
          <p className="aye-surtitre">Chaque motif a une histoire</p>
          <h2>Nos collections</h2>
        </div>

        {collections.map((collection, index) => {
          const photo = imageCarte(collection.image);
          const lien = chemin('/collections/#' + collection.slug);
          return (
            <article className="aye-histoire-ligne" key={collection.slug}>
              <a href={lien} className="aye-histoire-photo">
                <img
                  src={photo.src}
                  srcSet={photo.srcSet}
                  sizes="(max-width: 767px) 100vw, 420px"
                  alt={'Collection ' + collection.nom + ', dessin au dos'}
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
                <h4>{collection.nom}</h4>
                <p>{collection.texte}</p>
                <a href={lien} className="aye-histoire-lien">Découvrir la collection →</a>
              </div>
            </article>
          );
        })}

        <div className="aye-voir-tout">
          <div className="main-border-button">
            <a href={chemin('/collections/')}>Voir toutes les collections</a>
          </div>
        </div>
      </div>
    </section>
  );
}
