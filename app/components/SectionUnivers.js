// « Nos univers » (accueil) : une carte par categorie (Homme, Femme, Enfant),
// photo 3:4 sans voile, puis sous la photo : nom en petites capitales grises,
// accroche en titre et « Decouvrir » souligne (a la maniere d'un magazine).
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
      </div>
      {/* cartes hors du .container : pleine largeur, d'un bord a l'autre */}
      <ul className="aye-univers-cartes">
        {CATEGORIES.map((categorie) => {
          const photo = imageCarte(categorie.image);
          return (
            <li key={categorie.slug}>
              <a href={chemin('/' + categorie.slug + '/')}>
                <img
                  src={photo.src}
                  srcSet={photo.srcSet}
                  sizes="(max-width: 767px) 100vw, 34vw"
                  alt={'Univers ' + categorie.nom}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  decoding="async"
                />
                <span className="aye-univers-texte">
                  <span className="aye-univers-nom">{categorie.nom}</span>
                  <strong>{categorie.accroche}</strong>
                  <span className="aye-univers-lien">Découvrir</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
