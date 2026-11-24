// « Nos univers » (accueil) : une carte par categorie (Homme, Femme, Enfant),
// photo 3:4, nom et « Decouvrir » poses en bas sur un degrade sombre.
// Sans JavaScript : chaque carte est un lien vers sa page categorie.

import { chemin } from '@/app/lib/chemin';
import { CATEGORIES, imageCarte } from '../data/catalogue';

export default function SectionUnivers() {
  return (
    <section className="section aye-univers" id="univers">
      <div className="container">
        <div className="section-heading">
          <p className="aye-surtitre">Pour toute la famille</p>
          <h2>Nos univers</h2>
          <span>Des pièces pour toute la famille, imprimées à Madagascar.</span>
        </div>
        <ul className="aye-univers-cartes">
          {CATEGORIES.map((categorie) => {
            const photo = imageCarte(categorie.image);
            return (
              <li key={categorie.slug}>
                <a href={chemin('/' + categorie.slug + '/')}>
                  <img
                    src={photo.src}
                    srcSet={photo.srcSet}
                    sizes="(max-width: 767px) 100vw, 33vw"
                    alt={'Univers ' + categorie.nom}
                    width={photo.width}
                    height={photo.height}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="aye-univers-titre">
                    <strong>{categorie.nom}</strong>
                    <span>Découvrir →</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
