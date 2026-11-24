/* Scripts propres au projet Aye Aye Madagascar.
   Charge apres custom.js ; les fichiers du template restent inchanges.

   custom.js initialise les trois carrousels du template (.owl-men-item,
   .owl-women-item, .owl-kid-item) : les sections Homme, Femme et Enfant les
   utilisent tels quels. */
(function ($) {
  'use strict';

  if (!$) return;

  /* custom.js installe un « scroll-spy » qui parcourt $('.nav a') et fait
     $(lien.attr('href')).position() sur chaque lien. Il etait deja casse dans
     le template (il levait une erreur des le premier lien non-ancre) et notre
     menu ne contient plus d'ancres du tout : il ne sert plus a rien et pollue
     la console a chaque defilement. On le retire proprement.
     Seul ce handler est pose sur `document` ; l'en-tete collant, lui, ecoute
     `window` et n'est pas concerne. */
  /* jQuery differe les callbacks `ready` : celui de custom.js s'execute APRES
     ce fichier. On passe donc par la meme file d'attente pour retirer le
     handler une fois qu'il a ete pose. */
  $(function () {
    $(document).off('scroll');
  });

  /* En-tete transparent sur le hero (accueil, mobile).
     custom.js ne rend l'en-tete opaque qu'apres tout le bloc #top ; sur
     mobile ce bloc contient aussi les onglets sous le hero, et le logo blanc
     se retrouverait sur fond blanc. On le rend opaque des la fin du hero. */
  var $entete = $('.header-area.aye-entete-sur-hero');
  var $hero = $('.main-banner .left-content, .page-heading').first();
  if ($entete.length && $hero.length) {
    var majEntete = function () {
      var limite = $hero.offset().top + $hero.outerHeight() - $entete.outerHeight();
      $entete.toggleClass('aye-entete-opaque', $(window).scrollTop() > limite);
    };
    $(window).on('scroll resize', majEntete);
    majEntete();
  }
})(window.jQuery);
