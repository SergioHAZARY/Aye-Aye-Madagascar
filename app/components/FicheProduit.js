// Carte produit, reprise de la structure du template (.item / .thumb /
// .down-content) pour heriter de tous ses styles.
//
// Pas d'icones voir / favori / panier au survol (retirees a la demande de la
// marque) : la carte mene a la fiche, ou se trouvent la taille, le panier et
// le coeur.

import { chemin } from '@/app/lib/chemin';
import { imageCarte } from '../data/catalogue';

export default function FicheProduit({ produit, image, differer = true }) {
  const lien = chemin('/produit/' + produit.slug + '/');
  const visuel = image || produit.image;
  const carte = imageCarte(visuel);

  return (
    <div className="item">
      <div className="thumb">
        <a href={lien}>
          {/* cadre 3:4 commun a toutes les cartes (aye-aye.css) : ~370 px
              sur ordinateur, demi-ecran ou plein ecran en dessous */}
          <img
            src={carte.src}
            srcSet={carte.srcSet}
            sizes="(max-width: 599px) 100vw, (max-width: 999px) 50vw, 370px"
            alt={produit.nom + ' – ' + produit.couleur}
            width={carte.width}
            height={carte.height}
            {...(differer ? { loading: 'lazy', decoding: 'async' } : {})}
          />
        </a>
      </div>
      <div className="down-content">
        <h4><a href={lien}>{produit.nom}</a></h4>
        <ul className="stars">
          {' '}
          {Array.from({ length: produit.note }, (_, i) => (
            <li key={i}><i className="fa fa-star"></i></li>
          ))}
          {' '}
        </ul>
      </div>
    </div>
  );
}
