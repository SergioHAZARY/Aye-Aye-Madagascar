// « Nos collections » (accueil) : titre centre sous un surtitre, puis une
// ligne par collection (dessin au dos), grande photo 4:3 (une demi-ligne) et
// texte alternant de cote,
// grand numero, nom, histoire du motif et lien. Les trois premieres
// collections, puis un bouton vers la page Collections. Sans JavaScript.

import { chemin } from '@/app/lib/chemin';
import { COLLECTIONS, imageCarte } from '../data/catalogue';

// Versions paysage 4:3 (scripts/photos-cadrees.mjs, histoire/) des photos de
// studio ; une autre photo est montree entiere (carte 3:4, contain).
const PAYSAGE = /^(DSC_1795\.jpg|DSC_1807\.jpg|Homme_1\.jpeg)$/;

function imageLigne(source) {
  const nom = source.split('/').pop();
  if (!PAYSAGE.test(nom)) return imageCarte(source);
  const dossier = source.slice(0, source.indexOf('/assets/images/')) + '/assets/images/histoire/';
  return { src: dossier + nom.replace(/\.jpe?g$/i, '.jpg'), width: 1200, height: 900 };
}

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
          const photo = imageLigne(collection.image);
          const lien = chemin('/collections/#' + collection.slug);
          return (
            <article className="aye-histoire-ligne" key={collection.slug}>
              <a href={lien} className="aye-histoire-photo">
                <img
                  src={photo.src}
                  srcSet={photo.srcSet}
                  sizes="(max-width: 767px) 100vw, 50vw"
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
