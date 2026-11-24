'use client';

import { chemin } from '@/app/lib/chemin';
import { useEffect } from 'react';

import { ajouterAuPanier, basculerFavori } from '../lib/panier';

// Un seul ecouteur, pose sur le document, traite tous les boutons du site :
//   data-ajout-panier="slug"  -> ajoute au panier puis va au recapitulatif
//   data-favori="slug"        -> ajoute ou retire des favoris
//
// Passer par la delegation plutot que par des gestionnaires React est
// indispensable ici : le carrousel owl duplique les cartes pour la boucle, et
// ces copies ne font pas partie de l'arbre React. Un onClick ne s'y
// declencherait pas ; un ecouteur delegue, si.
export default function ActionsGlobales() {
  useEffect(() => {
    function auClic(evenement) {
      const boutonPanier = evenement.target.closest('[data-ajout-panier]');
      if (boutonPanier) {
        evenement.preventDefault();
        // Depuis une carte, la taille n'est pas encore choisie : le panier la
        // demandera (la fiche produit, elle, passe par AchatProduit).
        ajouterAuPanier(boutonPanier.dataset.ajoutPanier, 1);
        window.location.href = chemin('/checkout/');
        return;
      }

      const boutonFavori = evenement.target.closest('[data-favori]');
      if (boutonFavori) {
        evenement.preventDefault();
        const ajoute = basculerFavori(boutonFavori.dataset.favori);
        // Les copies du carrousel portent le meme slug : on les met toutes a jour.
        document
          .querySelectorAll('[data-favori="' + boutonFavori.dataset.favori + '"]')
          .forEach((el) => el.classList.toggle('est-favori', ajoute));
      }
    }

    document.addEventListener('click', auClic);
    return () => document.removeEventListener('click', auClic);
  }, []);

  // Prechargement des pages : le site navigue par chargements complets (voir
  // CLAUDE.md). Des qu'un lien interne est survole (souris) ou touche (doigt),
  // la page visee est demandee en arriere-plan ; au clic, elle s'affiche
  // presque aussitot. Une page n'est prechargee qu'une fois, et jamais en
  // mode « economie de donnees ».
  useEffect(() => {
    if (navigator.connection && navigator.connection.saveData) return undefined;
    const dejaFaits = new Set([window.location.pathname]);

    function precharger(evenement) {
      const lien = evenement.target.closest && evenement.target.closest('a[href]');
      if (!lien || lien.target === '_blank' || lien.hasAttribute('download')) return;
      let adresse;
      try {
        adresse = new URL(lien.href, window.location.href);
      } catch {
        return;
      }
      if (adresse.origin !== window.location.origin || dejaFaits.has(adresse.pathname)) return;
      dejaFaits.add(adresse.pathname);
      const balise = document.createElement('link');
      balise.rel = 'prefetch';
      balise.href = adresse.pathname;
      document.head.appendChild(balise);
    }

    document.addEventListener('pointerover', precharger, { passive: true });
    document.addEventListener('touchstart', precharger, { passive: true });
    return () => {
      document.removeEventListener('pointerover', precharger);
      document.removeEventListener('touchstart', precharger);
    };
  }, []);

  // Au chargement, on recolore les coeurs des produits deja en favoris.
  useEffect(() => {
    const marquer = () => {
      let favoris = [];
      try {
        favoris = JSON.parse(window.localStorage.getItem('aye-aye-favoris') || '[]');
      } catch { /* stockage indisponible */ }
      document.querySelectorAll('[data-favori]').forEach((el) => {
        el.classList.toggle('est-favori', favoris.includes(el.dataset.favori));
      });
    };
    marquer();
    // Les cartes clonees par le carrousel arrivent apres l'hydratation.
    const minuteur = setTimeout(marquer, 1500);
    return () => clearTimeout(minuteur);
  }, []);

  return null;
}
