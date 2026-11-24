// Carte produit, reprise de la structure du template (.item / .thumb /
// .down-content) pour heriter de tous ses styles.
//
// Les boutons coeur et panier n'ont pas de gestionnaire React : ils portent un
// attribut data-* lu par ActionsGlobales. C'est ce qui les rend fonctionnels
// y compris sur les cartes dupliquees par le carrousel.

import { chemin } from '@/app/lib/chemin';
import { formaterPrix } from '../data/catalogue';

export default function FicheProduit({ produit, image, differer = true }) {
  const lien = chemin('/produit/' + produit.slug + '/');
  const visuel = image || produit.image;

  return (
    <div className="item">
      <div className="thumb">
        <div className="hover-content">
          <ul>
            {' '}
            <li>
              <a href={lien} title="Voir le produit" aria-label={'Voir ' + produit.nom}>
                <i className="fa fa-eye"></i>
              </a>
            </li>
            {' '}
            <li>
              <a href={lien} data-favori={produit.slug} title="Ajouter aux favoris" aria-label="Ajouter aux favoris">
                <i className="fa fa-heart-o"></i>
              </a>
            </li>
            {' '}
            <li>
              <a
                href={chemin('/checkout/')}
                data-ajout-panier={produit.slug}
                title="Ajouter au panier"
                aria-label={'Ajouter ' + produit.nom + ' au panier'}
              >
                <i className="fa fa-shopping-cart"></i>
              </a>
            </li>
            {' '}
          </ul>
        </div>
        <a href={lien}>
          <img
            src={visuel}
            alt={produit.nom + ' – ' + produit.couleur}
            width={370}
            height={390}
            {...(differer ? { loading: 'lazy', decoding: 'async' } : {})}
          />
        </a>
      </div>
      <div className="down-content">
        <h4><a href={lien}>{produit.nom}</a></h4>
        <span>{formaterPrix(produit.prix)}</span>
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
