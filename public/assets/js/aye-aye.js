/* Script du projet Aye Aye Madagascar : le seul script hors de Next.

   Il remplace toute la pile du template (jQuery, owl-carousel, scrollReveal,
   custom.js : 182 Ko), dont le site n'utilisait plus que deux comportements,
   repris ici a l'identique :
   - l'en-tete collant (classe background-header une fois le bloc #top passe) ;
   - le menu deroulant du telephone (bouton .menu-trigger).
   Injecte apres l'hydratation par TemplateScripts : il ne fait que poser des
   classes, le style est dans aye-aye.css. */
(function () {
  'use strict';

  var entete = document.querySelector('header.header-area');
  if (!entete) return;
  var calme = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var observable = 'IntersectionObserver' in window;
  var tous = function (selecteur) {
    return Array.prototype.slice.call(document.querySelectorAll(selecteur));
  };

  /* --- En-tete au defilement --------------------------------------------------
     background-header : regle du template (custom.js), blanc et 80 px de haut
     une fois le bloc #top depasse ; sans bloc #top, des le premier defilement.
     aye-entete-opaque : sur les pages a banniere, l'en-tete transparent
     redevient blanc des la fin de la banniere (sur mobile, #top contient aussi
     les onglets sous le hero : le logo blanc se retrouverait sur fond blanc).
     aye-visible : le bouton « haut de page » apres un ecran et demi. */
  var haut = document.getElementById('top');
  var hero = entete.classList.contains('aye-entete-sur-hero')
    && document.querySelector('.main-banner .left-content, .page-heading');
  var retour = document.querySelector('.aye-haut');
  var hauteurInterieure = function (el) {
    var style = getComputedStyle(el);
    return el.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
  };
  var majEntete = function (defile) {
    var y = window.pageYOffset;
    if (defile) {
      entete.classList.toggle('background-header', y >= (haut ? hauteurInterieure(haut) : 0) - entete.offsetHeight);
    }
    if (hero) {
      var cadre = hero.getBoundingClientRect();
      entete.classList.toggle('aye-entete-opaque', cadre.bottom - entete.offsetHeight < 0);
    }
    if (retour) retour.classList.toggle('aye-visible', y > window.innerHeight * 1.5);
  };
  var enAttente = false;
  window.addEventListener('scroll', function () {
    if (enAttente) return;
    enAttente = true;
    requestAnimationFrame(function () {
      enAttente = false;
      majEntete(true);
    });
  }, { passive: true });
  window.addEventListener('resize', function () { majEntete(false); });
  majEntete(false);

  if (retour) {
    retour.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: calme ? 'auto' : 'smooth' });
    });
  }

  /* --- Menu deroulant (telephone) -------------------------------------------- */
  var bouton = document.querySelector('.header-area .menu-trigger');
  var menu = document.querySelector('.header-area .main-nav .nav');
  if (bouton && menu) {
    var basculer = function () {
      var ouvert = bouton.classList.toggle('active');
      menu.classList.toggle('aye-menu-ouvert', ouvert);
      bouton.setAttribute('aria-expanded', ouvert ? 'true' : 'false');
    };
    bouton.addEventListener('click', basculer);
    bouton.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        basculer();
      }
    });
  }

  if (!observable || calme) return; // pas d'animation : tout reste visible

  var dansEcran = function (el) {
    var cadre = el.getBoundingClientRect();
    return cadre.top < window.innerHeight && cadre.bottom > 0;
  };

  /* --- Apparition des blocs ---------------------------------------------------
     Titres de section, cartes, photos : ils montent en place la premiere fois
     qu'ils entrent a l'ecran, l'un apres l'autre quand ils arrivent ensemble
     (une rangee de cartes). Ce qui est deja a l'ecran au chargement ne bouge
     pas : rien ne clignote, la premiere vue s'affiche aussi vite qu'avant. */
  var blocs = tous('.section-heading, .item, .aye-carte, .service-item, .aye-univers-cartes > li, '
    + '.aye-atouts li, .aye-decouvrez-photo, .aye-decouvrez .left-content, .aye-communaute-photos, '
    + '.about-us .left-image, .about-us .right-content, .aye-signature, .aye-moyens-contact > li, '
    + '.aye-galerie-autres, .aye-espace-liens > li, .aye-recapitulatif')
    .filter(function (bloc) { return !dansEcran(bloc) && bloc.getBoundingClientRect().top > 0; });
  if (blocs.length) {
    var apparition = new IntersectionObserver(function (entrees) {
      var rang = 0;
      entrees.forEach(function (entree) {
        if (!entree.isIntersecting) return;
        entree.target.style.setProperty('--aye-delai', Math.min(rang, 5) * 90 + 'ms');
        entree.target.classList.add('aye-vu');
        apparition.unobserve(entree.target);
        rang += 1;
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    blocs.forEach(function (bloc) {
      bloc.classList.add('aye-apparait');
      apparition.observe(bloc);
    });
  }

  /* --- « Nos collections » (accueil) et photos des pages modele / collection ---
     Chaque ligne glisse en place chaque fois qu'elle entre a l'ecran (demande
     du proprietaire), en alternant le sens. Elle apparait quand 30 % sont a
     l'ecran et se rearme sous 10 % : sur un grand ecran la ligne du milieu ne
     sort presque jamais entierement, elle doit pourtant rejouer. */
  var lignes = tous('.aye-histoire-ligne, .aye-mur-anime > *');
  // photos des pages modele et collection : celles de la moitie droite arrivent
  // de la droite (position a l'ecran, moins le decalage en cours de
  // l'animation ; offsetLeft ne donne pas la colonne dans des colonnes CSS)
  var cotes = function () {
    tous('.aye-mur-anime > *').forEach(function (photo) {
      var cadre = photo.getBoundingClientRect();
      var mur = photo.parentNode.getBoundingClientRect();
      var decalage = new DOMMatrix(getComputedStyle(photo).transform).m41;
      // colonne du milieu (3 colonnes) : de la gauche
      photo.classList.toggle('aye-droite', cadre.left - decalage + cadre.width / 2 > mur.left + mur.width * 0.55);
    });
  };
  cotes();
  // la mise en page peut encore bouger jusqu'a la fin du chargement
  window.addEventListener('load', cotes);
  window.addEventListener('resize', cotes);
  if (lignes.length) {
    var glissement = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (entree) {
        if (entree.intersectionRatio >= 0.3) entree.target.classList.add('aye-visible');
        else if (entree.intersectionRatio < 0.1) entree.target.classList.remove('aye-visible');
      });
    }, { threshold: [0, 0.1, 0.3] });
    lignes.forEach(function (ligne) {
      // deja a l'ecran au chargement : visible tout de suite, sans glisser
      if (dansEcran(ligne)) ligne.classList.add('aye-visible');
      ligne.classList.add('aye-anim');
      glissement.observe(ligne);
    });
  }
})();
