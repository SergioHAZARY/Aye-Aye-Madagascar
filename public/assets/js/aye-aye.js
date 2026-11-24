/* Scripts propres au projet Aye Aye Madagascar.
   Charge apres custom.js ; les fichiers du template restent inchanges.

   custom.js initialise les trois carrousels du template (.owl-men-item,
   .owl-women-item, .owl-kid-item) : les sections Homme, Femme et Enfant les
   utilisent tels quels. La section Accessoires, absente du template, porte
   .owl-aye-carousel et recoit ici exactement les memes reglages. */
(function ($) {
  'use strict';

  if (!$ || !$.fn || !$.fn.owlCarousel) return;

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
     mobile ce bloc contient aussi les quatre tuiles empilees, et le logo blanc
     se retrouverait sur fond blanc. On le rend opaque des la fin du hero. */
  var $entete = $('.header-area.aye-entete-sur-hero');
  var $hero = $('.main-banner .left-content');
  if ($entete.length && $hero.length) {
    var majEntete = function () {
      var limite = $hero.offset().top + $hero.outerHeight() - $entete.outerHeight();
      $entete.toggleClass('aye-entete-opaque', $(window).scrollTop() > limite);
    };
    $(window).on('scroll resize', majEntete);
    majEntete();
  }

  $('.owl-aye-carousel').each(function () {
    var $carrousel = $(this);
    if ($carrousel.hasClass('owl-loaded')) return;

    // reglages identiques a ceux de custom.js pour .owl-men-item
    $carrousel.owlCarousel({
      items: 5,
      loop: true,
      dots: true,
      nav: true,
      margin: 30,
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 3 }
      }
    });
  });
})(window.jQuery);
