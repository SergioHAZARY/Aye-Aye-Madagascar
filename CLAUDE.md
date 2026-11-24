# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

E-commerce site for **Aye-Aye Madagascar**, a Malagasy clothing brand. Next.js 16 (App Router, JavaScript, static export), built on the TemplateMo "Hexashop" template: the template's CSS, fonts, JS and layout are reused **unchanged**; the content, structure and shop features are the project's own.

The site is in **French**. All copy, component names, comments and data fields are French — keep writing them that way.

The brand's own photos are in `public/assets/images/Homme/` (9 shots of 2 garments: a red "Aye-Aye" long sleeve and an écru "Antsatsaka" long sleeve). Femme, Enfant and Accessoires still use template placeholder images, by the owner's decision, until real photos exist.

## Commands

```bash
npm run dev                    # http://localhost:3000
npm run build                  # export statique dans out/
npm run images                 # aperçu de la compression des photos
npm run images -- --appliquer  # applique, originaux gardés dans photos-originales/
node scripts/logo.mjs          # logo de l'en-tête et du pied, depuis le logo officiel
node scripts/photos-cadrees.mjs  # toutes les images tirées des photos Homme (jamais rognées)
```

No tests, no linter. `next build` fails with `EBUSY ... rmdir out` if a server is still serving `out/` — stop it first.

## Architecture

```
app/
  data/catalogue.js      LE fichier à éditer : catégories, produits, prix, photos,
                         modèles (3 coupes) et collections (9 dessins)
  lib/panier.js          panier + favoris (localStorage, sans dépendance)
  layout.js              <html lang="fr">, <head>, Preloader, Footer, scripts
  page.js                accueil
  homme|femme|enfant|accessoires/page.js     → <PageCategorie slug="…" />
  produit/[slug]/page.js  fiche produit (generateStaticParams)
  modeles/               Nos modèles : tee-shirt, manches longues, débardeur
  collections/           Nos collections : les 9 dessins au dos
  produits/              toutes les catégories
  checkout/              panier et commande
  recherche/ favoris/ about/ contact/
  compte/                Mon compte : seul accès au panier et aux favoris
  components/
    Header.js            logo seul, menu (5 liens ; déroulant sur mobile), icônes recherche/compte
    Footer.js            + exports CONTACT (coordonnées) et MARQUE (slogan)
    SilhouetteModele.js  silhouettes SVG des 3 coupes
    FicheProduit.js      carte produit
    SectionCarrousel.js  section produits en carrousel, structure et ids du template
    GalerieProduit.js    'use client' — photo + vignettes de la fiche produit
    AchatProduit.js      'use client' — choix de taille + bouton d'ajout de la fiche
    PageCategorie.js     gabarit des 4 pages catégorie
    RechercheRapide.js   'use client' — barre de recherche ouverte par la loupe
    PanierDetail.js      'use client' — panier et formulaire de commande
    Recherche.js Favoris.js CompteurPanier.js   'use client'
    ActionsGlobales.js   'use client' — écouteur délégué (voir plus bas)
    TemplateScripts.js   'use client' — charge la pile jQuery
public/assets/           template intact + css/aye-aye.css + js/aye-aye.js
```

### Adding or changing a product

Everything comes from `app/data/catalogue.js` — never hard-code a product in a page. A product is `{slug, nom, couleur, prix, categorie, note, image, galerie[], description, details[], tailles?}`. Prices are plain numbers in Ariary; `formaterPrix()` renders them. Sizes come from `TAILLES_PAR_CATEGORIE` (S–XXL, 4–12 ans, none for accessoires) unless a product sets `tailles`; read them through `taillesDuProduit()`. Those size lists are starting values still to be confirmed by the brand.

Two other lists sit in the same file, with the brand's own texts: `MODELES` (the 3 cuts, available for men, women and children) and `COLLECTIONS` (the 9 back designs, available on every cut). A collection card shows its `image` when set (only Antsatsaka and Aye Aye Madagascar have photos so far) and its number otherwise. Adding a collection photo means setting that one field.

`vignettes(categorie)` is the one piece of logic worth knowing: when a category has fewer than 4 products it expands each product's `galerie` into separate carousel slides, so the Homme carousel shows all 9 photos instead of 2 cards. Add a 4th Homme product and it switches to one card per product automatically.

### Cart and favourites — why no React state

`app/lib/panier.js` keeps both in `localStorage` and fires an `aye-aye:maj` event; `ActionsGlobales` installs a **single delegated click listener** on `document` for `[data-ajout-panier]` and `[data-favori]`.

This is not an accident: **owl-carousel clones the cards** for its loop, and clones are not part of the React tree, so an `onClick` on a card inside a carousel would silently do nothing. Buttons therefore carry a `data-*` attribute and no React handler. Keep it that way for anything that can appear inside a carousel. The product page is *not* in a carousel, so `GalerieProduit` and `AchatProduit` use ordinary React state and handlers.

A cart line is `{slug, taille, quantite}` and a product can sit in the cart once per size. A card's cart icon adds with `taille: null`; `PanierDetail` then shows a size `<select>` on that line and refuses to validate the order until every sized product has one. The product page adds with the chosen size, and its button stays grey until a size is picked.

Read paths (`CompteurPanier`, `PanierDetail`, `Favoris`) are normal client components that subscribe to the event. They render nothing on the server (`useState(null)`) because the cart only exists in the browser — don't "fix" that, it prevents a hydration mismatch.

### The jQuery layer

`TemplateScripts` injects, in order and after hydration: jQuery, owl-carousel, scrollReveal, then `custom.js` and `aye-aye.js`. `quantity.js` is no longer loaded: the product page has no quantity field, quantities are changed in the cart. The template shipped 15 scripts (984 KB); the 10 never called by `custom.js` were removed (`accordions.js` alone was 458 KB) — verified: zero layout and behaviour difference. **Don't re-add a vendor script unless something calls it.**

`script.async = false` guarantees execution order, a module flag prevents a double injection under StrictMode, and `jQuery(window).trigger('load')` is replayed when `readyState === 'complete'` — otherwise `custom.js`'s preloader handler never fires and **the preloader covers the page forever**.

`public/assets/js/aye-aye.js` is the project's own script: it initialises `.owl-aye-carousel` with custom.js's exact settings (only the Accessoires section uses it — see below), and removes `custom.js`'s broken scroll-spy with `$(document).off('scroll')` inside a `$(function(){})` — the `ready` queue matters, custom.js's callback runs *after* this file loads.

### Home sections reuse the template's ids

The Homme, Femme and Enfant sections are rendered by `SectionCarrousel` with `modele="men" | "women" | "kid"`, which gives them the template's own markup: `<section id="men">`, a `.container` (not full width), `.men-item-carousel > .owl-men-item`. The template CSS (`#men …`) and `custom.js` therefore style and initialise them exactly as in the original. Accessoires has no template counterpart: it gets `id="accessoires"` and `.owl-aye-carousel`, and `aye-aye.css` copies the `#men` rules for it. Explore and Social are the template's layouts too (Social = six `col-2` thumbnails, no carousel). The owner asked for all of these to stay at container width — don't make them full width again.

### Navigation is full page loads, on purpose

Internal links are plain `<a href="/homme/">`, not `next/link`. With client-side navigation React swaps the DOM while jQuery keeps handlers on the old nodes: carousels would not re-init, the burger menu would lose its handler, and the preloader would reappear with no `load` event to hide it. Switch a page to `next/link` only once it no longer depends on `custom.js`.

## Styling rules

**`public/assets/css/aye-aye.css` is the only stylesheet to edit.** The template's five stylesheets are byte-identical to the original and must stay that way; the project sheet is loaded last. It uses only the template's palette (`#2a2a2a`, `#f7f7f7`, `#eee`) and Poppins — no new font, no new colour. One exception, asked for by the owner: the Facebook logo of the « Nous suivre sur Facebook » button sits in a round Facebook-blue badge (`#1877f2`, `.aye-icone-facebook`) so it is recognisable at a glance.

Three things in it are load-bearing:

- **`img[width][height] { height: auto }`** — every `<img>` carries its intrinsic `width`/`height` so the browser reserves the exact space before the file arrives (measured CLS ≈ 0). Without this rule the `height` attribute acts as a fixed height and **stretches every image**. Note its specificity (0,2,1): a rule like `.aye-logo img` loses to it, which is why the logo rules are written `.header-area .aye-logo img[width][height]`.
- **Generic `.item` card rules.** The template only styled product cards under `#products`, `#men`, `#women`, `#kids`. The project's sections use other ids, so the same rules are repeated there without an id. A new product section gets them for free; don't re-scope them to an id.
- **Header height.** The header is 120 px on desktop (template: 100) so the vertical logo stays legible; `.main-banner`, `.page-heading`, `.about-page-heading` and the product page's `.aye-fiche` are pushed down to match, so the gap under the header stays the template's 60 px. Sticky is the template's 80 px. On mobile the header is 64 px (see below). Change one and you must change the others.
- **Buttons on light backgrounds.** The template's `.main-border-button` is white, made for dark photos, and was invisible on the project's white sections. The containers listed in the « Boutons sur fond clair » rule get the template's own dark variant (the one from its Explore section). Add any new light-background button container to that rule; `.aye-plein` gives the filled primary button.

**Mobile version (under 768 px), modelled on BazarChic at the owner's request.** It lives in the last block of `aye-aye.css`.
- The header is 64 px, fixed, white. From left to right: the logo, then search and account (24 px icons), then the menu button (burger) at the far right, where the template has it. The burger opens the template's own dropdown with the five text links, toggled by custom.js. The owner tried a bar of menu icons and a burger left of the logo, and settled on this. Below 375 px the logo shrinks to 50 px; the header's `.container` is full width on mobile, otherwise Bootstrap's 540 px container pushes the logo towards the middle between 576 and 767 px. The template forces `min-height: 80px` on `.header-area.header-sticky`, and that is overridden too.
- On the home page the header gets `aye-entete-sur-hero` and is transparent over a full-screen, edge-to-edge hero, with the white logo (`.aye-logo-clair`), white icons and a white burger. It turns white as soon as the hero is scrolled past or the menu is opened. `aye-aye.js` adds `aye-entete-opaque` for this, because custom.js only reacts after the whole `#top` block, which on mobile also contains the four stacked tiles.
- The hero uses a dedicated portrait image (`banniere/principale-mobile.jpg`) through `<picture>`, shown in `cover`. The figure has side margins, so only backdrop can be trimmed. The text sits at the bottom with a full-width white button.
- Under the hero: a centred title and tabs (`.aye-onglets-mobile`, a `col-12` hidden from 768 px up, so the desktop row is untouched). The tabs wrap onto centred lines instead of scrolling sideways: the owner saw « ACCESSOIR… » cut at the screen edge as a bug. The tiles become full-width cards with a 10 px gutter.
- Footer: the logo is centred.
- Contact page: each contact line is one tappable row (icon in a light round badge, small grey label above the value), and the two buttons are full width. The owner found the earlier label/value columns too crowded.
- Section titles (`.section-heading h2`, the Explore and About titles) are centred and 24 px instead of the template's 34 px, at the owner's request; subtitles keep their 14 px. Inside such a title, a `<span>` would get the template's subtitle style: `.aye-insecable` cancels it.

**Responsive fixes on top of the template** (checked page by page from 320 to 1920 px, no horizontal scroll anywhere):
- carousel arrows sit 80 px outside the container in the template, which overflows below 1300 px; there they move onto the photos' edges, on a white background;
- 768–992 px: the template cuts the menu spacing to 5 px; the project uses 9 px;
- « Suivez-nous » shows 3 thumbnails per row under 768 px (the template keeps 6, about 60 px each);
- the newsletter contact block is one 2-column grid (`.aye-coordonnees`): WhatsApp | Téléphone, then the e-mail and « Boutique » on full rows. Rows stay aligned and the e-mail is never broken mid-word (the owner saw « …gmail.c / om » as a bug).

**Font sizes of template text are the template's.** The owner asked twice not to change them. The only override is the banner title on phones under ~450 px, `min(52px, 11.5vw)`, so that the 52 px title fits the screen.

**Brand copy is used verbatim.** The structure texts come from the owner (home, Modèles, Collections, À propos, Suivez-nous, Contact, footer). They write « Aye Aye » without a hyphen and « Porter votre culture avec fierté ! » (`MARQUE.slogan`). Keep their wording; product names keep « Aye-Aye ».

Images below the first screen carry `loading="lazy" decoding="async"`; keep the first screen eager (5 images on the home page, 3 on a category page).

## Gotchas

- **Font Awesome**: the bundled font file is older than its stylesheet. `fa-user-o` and `fa-shopping-bag` are declared in the CSS but render as empty squares — use `fa-user` and `fa-shopping-cart`. Check any new icon in the browser, not just in the CSS.
- **Contact details** live in one place: the `CONTACT` export of `app/components/Footer.js` (phones, WhatsApp, e-mail, address, opening hours, Facebook). Import it, never retype a phone number. `MARQUE` next to it holds the slogan.
- **Footer** follows the owner's structure: logo · Modèles (anchors on `/modeles/`) · La marque · Suivez-nous (Facebook, WhatsApp) · Contact, then « © 2026 Aye Aye Madagascar. Porter votre culture avec fierté ! ». It has no cart or favourites column, so `/compte/` (the account icon) is the only way to them and carries `CompteurPanier`.
- **Browser tab title** of the home page is just « Aye-Aye Madagascar » (owner's request); other pages read « Page — Aye-Aye Madagascar ».
- **Brand logo**: the official logo **as is**: the aye-aye head with « AYE-AYE Madagascar » *underneath*, both inside the image. There is **nothing next to it and nothing under it**, in the header and in the footer: the owner had the tagline « Authentique · Nature · Qualité » removed from both. Don't put it back. The owner rejected two earlier versions: an HTML wordmark beside a cropped head, and a horizontal lockup with the text on the right. `node scripts/logo.mjs` only trims the empty margins of `LOGO AYE AYE MADAGASCAR.png` and writes `logo-aye-aye.png` plus a negated `-blanc.png` for the footer. Display heights: 100 px in the header, 70 px sticky, 54 px in the 64 px mobile header, 110 px in the footer. The white version is also used in the transparent mobile header on the home page.
- **Navbar**: Accueil · Modèles (`/modeles/`) · Collections (`/collections/`) · À propos · Contact, five plain links, then search and account icons. The Homme / Femme / Enfant / Accessoires pages are no longer in the menu; they are reached from the banner tiles, the mobile tabs and the Modèles page. The icons are inline SVG because the bundled Font Awesome has no outline user icon. They exist **twice** in `Header.js` and CSS shows one copy: `.aye-actions-bord`, at the right edge of the screen, from 1400 px up (the owner's request, where the `.container` margin is wide enough) and on phones (right end of the 64 px bar); `li.aye-action` inside the menu, after « Contact », from 768 to 1399 px, where the edge copy would overlap the menu. Favourites and the cart are on `/compte/`. `actif` keys: `accueil`, `modeles`, `collections`, `apropos`, `contact`.
- **No photo is ever cropped** (owner's request, repeated). Every image derived from the brand photos (banner and its mobile portrait version, heading strips, « Suivez-nous » and « Découvrez » thumbnails, pillars, « Notre histoire », collection photos) comes from `node scripts/photos-cadrees.mjs`. The script fits the whole portrait photo in the frame and fills the gap by stretching a 1 px edge strip, blurred along its length. The studio backdrop is plain grey, so it continues without a seam. The strip is 1 px because a wider one catches a sleeve near the edge once the photo is shrunk, and the blur is there because unblurred JPEG grain turns into thin lines when stretched. Don't feed it `DSC_1806`: the raised arm touches the left edge and would be smeared. Images that carry white text use the tone of the template image they replace: banner mean ≈ 77 / 95, heading strips ≈ 60. That tone is what keeps the text readable, with no CSS overlay. The heading strips are shown with `background-size: cover`, so the subject is centred with 8 % headroom: only backdrop gets trimmed, whatever the screen width. The main image is the écru garment (the owner asked for grey); the Homme tile keeps the red garment's colour.
- **Search** (owner's request): the magnifier does not go to `/recherche/` any more. It opens `RechercheRapide`, a bar that slides down over the top of the screen on mobile and desktop, with results while typing, « Voir tous les résultats » and Enter leading to `/recherche/?q=…`. The links keep `href="/recherche/"` as a no-JS fallback and carry `data-ouvrir-recherche`; a delegated listener opens the bar. Closed, the bar stays in the DOM, transparent and inert, so the input can be focused *inside* the click (the only way to raise the iPhone keyboard). Filtering is `rechercherProduits()` in `catalogue.js`, shared with the results page.
- **Product page facts**: the info box and the delivery line only state true things (brand pillars, how ordering really works, the WhatsApp number). There is no invented delivery time, payment method or size chart: the size guide sends people to WhatsApp. Keep it that way until the brand supplies real data.
- The order form on `/checkout/` **does not send anything** — it shows a confirmation and the contact details. Wiring it to WhatsApp or e-mail is the next obvious step.
- `AGENTS.md` is generated and rewritten by `next dev` — a Next.js artifact, not project documentation.

## Images

Brand photos come out of the camera at 3400×6048 and ~1 MB each. `npm run images` compresses anything over 500 KB (resize to 1600 px, JPEG q80) and keeps untouched copies in `photos-originales/`; template images stay below the threshold and are never touched. Everything in `public/assets/images/{banniere,social,piliers,apropos,collections}/` is generated by `scripts/photos-cadrees.mjs` (see Gotchas): edit the script, not the files.

## Legacy

The five original `.html` files and the root `assets/` folder are the untouched reference the Next.js port was verified against. They are not used by the build and can be deleted once the site is accepted.

## Template attribution

TemplateMo 571 Hexashop. The owner bought the template's licence from ThemeWagon, so the free version's credit links (« Design : TemplateMo · Distribué par : ThemeWagon ») were removed from the footer and from `app/layout.js` at their request. Don't add them back.
