# Aye-Aye Madagascar — site e-commerce

Boutique en ligne construite avec **Next.js 16**, à partir du template HexaShop
dont la mise en page, les polices et les styles sont conservés tels quels.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
```

## Site en ligne

**https://sergiohazary.github.io/Aye-Aye-Madagascar/**

Le site se met à jour tout seul : chaque `git push` sur la branche `main`
déclenche la GitHub Action `.github/workflows/deploiement-pages.yml`, qui
construit le site et le publie sur GitHub Pages en deux à trois minutes.
Suivi et relance manuelle : onglet **Actions** du dépôt.

```bash
git add -A
git commit -m "Description du changement"
git push                       # le site en ligne suit automatiquement
```

## Construire le site à la main

```bash
npm run build      # genere le site statique dans out/
npx serve out      # pour verifier le resultat
```

`out/` est un site 100 % statique, déposable tel quel sur n'importe quel
hébergement. Il doit être servi par un serveur HTTP (les chemins sont absolus)
et non ouvert en `file://`.

Pour un hébergement dans un sous-dossier (comme GitHub Pages), on construit
avec le préfixe : `NEXT_PUBLIC_BASE_PATH=/Aye-Aye-Madagascar npm run build`.
Dans le code, toute adresse interne passe par `chemin('/...')`
(`app/lib/chemin.js`), sinon elle casse en ligne.

## Modifier la boutique

Tout le catalogue tient dans **`app/data/catalogue.js`** : catégories, produits,
prix, photos, descriptions. Ajouter un produit = ajouter un objet dans ce
fichier ; l'accueil, la page catégorie, la fiche produit, la recherche et le
panier se mettent à jour tout seuls.

Les coordonnées (téléphone, WhatsApp, e-mail, adresse, horaires, Facebook) sont
regroupées dans `app/components/Footer.js`, variable `CONTACT` ; le slogan dans
`MARQUE`. Modèles et collections se modifient dans
`app/data/catalogue.js` (`MODELES`, `COLLECTIONS`).

## Ajouter des photos

Les photos de l'appareil pèsent ~1 Mo. Déposez-les dans
`public/assets/images/`, puis :

```bash
npm run images                 # apercu, n'ecrit rien
npm run images -- --appliquer  # compresse ; originaux gardes dans photos-originales/
```

## Organisation

| Chemin | Rôle |
| --- | --- |
| `app/data/catalogue.js` | **le catalogue — le fichier à éditer** |
| `app/page.js` | accueil |
| `app/modeles/`, `app/collections/` | nos 3 coupes, nos 9 collections |
| `app/homme/`, `femme/`, `enfant/`, `accessoires/` | pages catégorie |
| `app/produit/[slug]/` | fiche produit |
| `app/checkout/` | panier et commande |
| `app/recherche/`, `compte/` | icônes de la barre de navigation |
| `app/favoris/` | accessible depuis Mon compte, comme le panier |
| `app/about/`, `app/contact/` | notre histoire / notre engagement, contact |
| `app/components/` | en-tête, pied de page, carte produit, carrousel, panier |
| `scripts/logo.mjs` | prépare le logo officiel (en-tête et pied de page) |
| `scripts/photos-cadrees.mjs` | fabrique toutes les images tirées des photos (bannière, bandeaux, vignettes, À propos), sans jamais les rogner |
| `app/lib/panier.js` | panier et favoris (stockés dans le navigateur) |
| `public/assets/css/aye-aye.css` | **la seule feuille de style du projet** |
| `public/assets/js/aye-aye.js` | le seul script du projet |
| `public/assets/` (le reste) | template d'origine, inchangé |
| `photos-originales/` | copies intactes des photos avant compression |

Les cinq fichiers `.html` d'origine et le dossier `assets/` de la racine sont
conservés comme référence ; ils ne sont pas utilisés par Next.js.

Les règles à respecter pour modifier le site sans casser le rendu sont
détaillées dans [CLAUDE.md](CLAUDE.md).
