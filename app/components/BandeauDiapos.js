// Carrousel en fond d'un bandeau de page (Modeles, Collections, A propos) :
// le meme carrousel que la banniere d'accueil (glissement vers la gauche
// toutes les 6 s, en boucle, glissement du doigt), une image par diapositive,
// en cover derriere le titre (aye-aye.css, .aye-entete-diapos).

import { chemin } from '@/app/lib/chemin';
import CarrouselBanniere from './CarrouselBanniere';

export default function BandeauDiapos({ images }) {
  const diapos = images.map(([fichier, alt]) => {
    const src = chemin('/assets/images/banniere/' + fichier);
    return { mobile: src, tablette: src, large: src, alt, position: '50%' };
  });
  return <CarrouselBanniere diapos={diapos} />;
}
