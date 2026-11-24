// Section « vedette » (Collection Femme sur l'accueil), forme demandee par la
// marque : surtitre et titre a gauche, pastilles de categories a droite, une
// grande carte vedette (premier produit) et une grille de quatre cartes.
// Police du template et photos 3:4 inchangees. Pas d'etat ni de JavaScript :
// les pastilles et les boutons sont de simples liens.

import { chemin } from '@/app/lib/chemin';
import { CATEGORIES, categorieParSlug, imageCarte, produitsParCategorie, taillesDuProduit } from '../data/catalogue';
import { CONTACT } from './Footer';

function lienWhatsApp(produit) {
  return CONTACT.whatsappLien + '?text=' + encodeURIComponent(
    'Bonjour, je voudrais le prix du ' + produit.nom + ' (' + produit.couleur.toLowerCase() + ').',
  );
}

function tailles(produit) {
  const liste = taillesDuProduit(produit);
  return liste.length ? liste : null;
}

export default function SectionVedette({ categorie, surtitre, titre }) {
  const [vedette, ...autres] = produitsParCategorie(categorie);
  const nomCategorie = categorieParSlug(categorie).nom;

  // quatre cartes : chaque autre produit, vue par vue, a tour de role
  // (dos du 1er, dos du 2e, face du 1er…), pour varier les produits
  const cartes = [];
  for (let vue = 0; cartes.length < 4 && autres.some((p) => p.galerie[vue]); vue++) {
    autres.forEach((p) => p.galerie[vue] && cartes.length < 4 && cartes.push({ produit: p, image: p.galerie[vue] }));
  }

  const tv = tailles(vedette);
  const photoVedette = imageCarte(vedette.image);

  return (
    <section className="section aye-vedettes" id={categorie}>
      <div className="container">
        <div className="aye-vedettes-tete">
          <div className="section-heading">
            <p className="aye-surtitre">{surtitre}</p>
            <h2>{titre}</h2>
          </div>
          <ul className="aye-pastilles">
            <li><a href={chemin('/produits/')}>Tout</a></li>
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <a href={chemin('/' + c.slug + '/')} className={c.slug === categorie ? 'actif' : undefined}>{c.nom}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="aye-vedettes-grille">
          <article className="aye-vedette">
            <a href={chemin('/produit/' + vedette.slug + '/')} className="aye-vedette-photo">
              <img
                src={photoVedette.src}
                srcSet={photoVedette.srcSet}
                sizes="(max-width: 991px) 100vw, 55vw"
                alt={vedette.nom + ' – ' + vedette.couleur}
                width={photoVedette.width}
                height={photoVedette.height}
                loading="lazy"
                decoding="async"
              />
            </a>
            <div className="aye-vedette-texte">
              <span className="aye-badge">Nouveauté du moment</span>
              <h3>{vedette.nom}</h3>
              <p>
                {nomCategorie} · 100 % coton{tv && ' · Tailles ' + tv[0] + ' à ' + tv[tv.length - 1]}
              </p>
              <a className="aye-bouton-blanc" href={lienWhatsApp(vedette)} target="_blank" rel="noopener noreferrer">
                Prix et commande sur WhatsApp
              </a>
            </div>
          </article>

          <div className="aye-vedettes-cartes">
            {cartes.map(({ produit, image }) => {
              const photo = imageCarte(image);
              const t = tailles(produit);
              return (
                <article className="aye-mini" key={image}>
                  <a href={chemin('/produit/' + produit.slug + '/')} className="aye-mini-photo">
                    <span className="aye-badge">Nouveau</span>
                    <img
                      src={photo.src}
                      srcSet={photo.srcSet}
                      sizes="(max-width: 575px) 100vw, (max-width: 991px) 50vw, 22vw"
                      alt={produit.nom + ' – ' + produit.couleur}
                      width={photo.width}
                      height={photo.height}
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                  <h4><a href={chemin('/produit/' + produit.slug + '/')}>{produit.nom}</a></h4>
                  <p>{nomCategorie} · 100 % coton</p>
                  {t && <p className="aye-mini-tailles">Tailles : {t.join(' · ')}</p>}
                  <a className="aye-bouton-noir" href={lienWhatsApp(produit)} target="_blank" rel="noopener noreferrer">
                    Prix sur WhatsApp
                  </a>
                </article>
              );
            })}
          </div>
        </div>

        <div className="aye-voir-tout">
          <div className="main-border-button">
            <a href={chemin('/' + categorie + '/')}>Voir toute la collection</a>
          </div>
        </div>
      </div>
    </section>
  );
}
