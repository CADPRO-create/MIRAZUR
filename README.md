# MIRAZUR HTML Clean — version UX/UI e-commerce

Site statique MIRAZUR en HTML, CSS et JavaScript vanilla.  
Aucun framework, aucun build tool, aucun fichier Shopify.

## Ce qui a été renforcé

- Hero plus clair et plus orienté conversion.
- Suppression définitive de la section Collections.
- Boutique générée depuis une source de données JS unique.
- Noms produits plus neutres : Atlas 02, Riviera 19, Golden 10, Serpent 07, Dynasty 10.
- Cartes produits homogènes : ratio image stable, labels, badges, prix et boutons alignés.
- Fiche produit plus rassurante : choix couleur/taille, quantité, message de sélection et points de confiance.
- Section “Pourquoi MIRAZUR ?” avec 4 arguments.
- Section “Comment commander ?” pour clarifier que le panier prépare une demande par email.
- Guide des tailles avec tableau indicatif S / M / L / XL.
- FAQ enrichie avec les objections d’achat principales.
- Sections légales internes : mentions légales, CGV, confidentialité, livraison & retours.
- Footer plus professionnel avec navigation, contact et liens légaux.
- Panier conservé et renforcé : variantes par couleur/taille, quantités, total, localStorage, mailto lisible.
- Accessibilité améliorée : focus visible, aria-live, focus trap panier, Escape, aria-expanded FAQ.

## Lancer le site en local

Depuis ce dossier :

```bash
python3 -m http.server 4173
```

Puis ouvrir :

```text
http://localhost:4173
```

## Structure

- `index.html` : SEO, structure sémantique, sections commerciales et légales.
- `assets/css/styles.css` : direction artistique, responsive, accessibilité et layout.
- `assets/js/main.js` : données produits, génération boutique, sélection produit, panier, FAQ et Club MIRAZUR.
- `assets/images/` : visuels WebP du hero et des produits.
- `favicon.svg` : icône MIRAZUR noir/gold.
- `AUDIT_CORRECTIONS.md` : audit et détail des corrections.

## Modifier un produit

Les données produits sont centralisées dans `assets/js/main.js`, dans le tableau `products`.

Champs utiles :

- `id`
- `name`
- `price`
- `collection`
- `image`
- `alt`
- `badge`
- `colors`
- `sizes`
- `description`

Les cartes de la boutique et la fiche produit sélectionnée se mettent à jour automatiquement depuis ce tableau.

## Modifier l’email de commande

Dans `assets/js/main.js`, changer la valeur :

```js
const orderEmail = "contact@mirazur.com";
```

Le bouton “Commander par email” génère un email avec les produits, couleurs, tailles, quantités, total estimé, coordonnées client à compléter et demande de confirmation avant paiement.

## Avant une mise en ligne réelle

- Remplacer `contact@mirazur.com` par l’email réel.
- Ajouter le domaine final dans la balise canonical.
- Compléter les mentions légales avec les vraies informations de l’éditeur.
- Adapter CGV, confidentialité, livraison et retours au statut juridique de la boutique.
- Brancher le formulaire Club MIRAZUR à un outil email ou CRM.
- Tester sur vrais appareils iOS Safari et Android Chrome avant publication.
