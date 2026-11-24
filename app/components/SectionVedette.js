// « Nouveautes » (accueil) : surtitre et titre a gauche, pastilles de
// categories a droite, une grande carte vedette et une grille de quatre
// cartes, tous univers confondus. Photos 3:4, police du template. Sans
// JavaScript : pastilles et boutons sont de simples liens.

import { chemin } from '@/app/lib/chemin';
import { CATEGORIES, categorieParSlug, imageCarte, produitParSlug, taillesDuProduit } from '../data/catalogue';
import { CONTACT } from './Footer';

function lienWhatsApp(produit) {
  return CONTACT.whatsappLien + '?text=' + encodeURIComponent(
    'Bonjour, je voudrais le prix du ' + produit.nom + ' (' + produit.couleur.toLowerCase() + ').',
  );
}

// `produits` : slugs, le premier en vedette, les quatre suivants en grille
export default function SectionVedette({ surtitre, titre, produits }) {
  const [vedette, ...autres] = produits.map(produitParSlug).filter(Boolean);
  const tv = taillesDuProduit(vedette);
  const photoVedette = imageCarte(vedette.image);

  return (
    <section className="section aye-vedettes" id="nouveautes">
      <div className="container">
        <div className="aye-vedettes-tete">
          <div className="section-heading">
            <p className="aye-surtitre">{surtitre}</p>
            <h2>{titre}</h2>
          </div>
          <ul className="aye-pastilles">
            <li><a href={chemin('/produits/')} className="actif">Tout</a></li>
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <a href={chemin('/' + c.slug + '/')}>{c.nom}</a>
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
                {categorieParSlug(vedette.categorie).nom} · 100 % coton
                {tv.length > 0 && ' · Tailles ' + tv[0] + ' à ' + tv[tv.length - 1]}
              </p>
              <a className="aye-bouton-blanc" href={lienWhatsApp(vedette)} target="_blank" rel="noopener noreferrer">
                Prix et commande sur WhatsApp
              </a>
            </div>
          </article>

          <div className="aye-vedettes-cartes">
            {autres.map((produit) => {
              const photo = imageCarte(produit.image);
              const t = taillesDuProduit(produit);
              return (
                <article className="aye-mini" key={produit.slug}>
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
                  <p>{categorieParSlug(produit.categorie).nom} · 100 % coton</p>
                  {t.length > 0 && <p className="aye-mini-tailles">Tailles : {t.join(' · ')}</p>}
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
            <a href={chemin('/produits/')}>Voir toute la boutique</a>
          </div>
        </div>
      </div>
    </section>
  );
}
