# Audit UX/UI & corrections — MIRAZUR

## Problèmes détectés

1. **Conversion insuffisamment claire**
   - Le hero était esthétique, mais ne disait pas assez vite quoi acheter, pourquoi maintenant et quelle action faire.
   - Le parcours de commande par email pouvait être confondu avec un paiement direct.

2. **Section Collections inutile**
   - La section “Le football comme vestiaire de soleil” ajoutait une respiration éditoriale sans action commerciale.
   - Elle ralentissait l’accès aux produits et diluait la boutique.

3. **Confiance e-commerce incomplète**
   - Il manquait un vrai guide des tailles, un processus de commande, des réponses FAQ orientées objections et des informations légales visibles.

4. **Cartes produits à professionnaliser**
   - Les cartes devaient garder une hauteur stable, des images au même ratio et des boutons alignés.
   - Les titres contenant des noms réels étaient plus risqués et moins propres pour une base de marque.

5. **Accessibilité et maintenance**
   - Le panier était fonctionnel mais l’ensemble devait mieux couvrir les états ARIA, les ancres, le focus et la lisibilité du code.

## Corrections appliquées

1. **Hero et navigation**
   - Wording remplacé par : “Porté par le football. Taillé pour le soleil.”
   - CTA principal : “Découvrir le drop”.
   - CTA secondaire : “Découvrir la marque”.
   - Navigation conservée et allégée : Boutique, Histoire, FAQ, Panier.

2. **Suppression de Collections**
   - Suppression complète du bloc Collections.
   - Suppression des liens, ancres et références `#collections`.

3. **Boutique et fiche produit**
   - Noms produits neutralisés : Atlas 02, Riviera 19, Golden 10, Serpent 07, Dynasty 10.
   - Badges ajoutés : Drop limité, Nouveau, Best-seller.
   - Cartes structurées avec label, titre, prix et bouton aligné.
   - Fiche produit enrichie avec réassurance sous le bouton d’ajout panier.

4. **Parcours d’achat**
   - Ajout de “Comment commander ?” en 5 étapes.
   - Mail de commande clarifié : demande de confirmation de disponibilité, délai et paiement avant validation.
   - Panier conservé avec variantes distinctes couleur/taille, fusion des doublons identiques, total et localStorage.

5. **Confiance et contenu**
   - Ajout “Pourquoi MIRAZUR ?” avec 4 arguments.
   - Ajout du guide des tailles avec tableau S / M / L / XL.
   - FAQ enrichie : taille, commande, paiement, délais, retours, drops limités, designs officiels, contact.
   - Histoire réécrite avec un angle plus concret : football, Casablanca, Riviera, soleil, tribunes, premium.
   - Footer enrichi avec contact, guide tailles, liens légaux et navigation.

6. **Légal et SEO**
   - Ajout de sections internes : Mentions légales, CGV, Confidentialité, Livraison & retours.
   - Meta description améliorée.
   - Hiérarchie H1/H2/H3 conservée.
   - Liens internes validés.

7. **Accessibilité**
   - Focus visible conservé.
   - `aria-live` pour panier/messages.
   - Focus trap et fermeture Escape du panier conservés.
   - `aria-expanded` synchronisé sur les accordéons FAQ.
   - Attributs alt produits mis à jour avec les nouveaux noms.

## Tests réalisés

- `node --check assets/js/main.js` : OK.
- Vérification automatique des ancres `href="#..."` : aucune ancre manquante.
- Vérification des assets référencés dans `index.html` : aucun fichier manquant.
- Recherche `#collections` / “Collections” : aucune référence active restante dans le projet final.
- Vérification que les titres produits visibles ne contiennent plus “Oversize”.
- Serveur local lancé avec `python3 -m http.server 4173`.

## Limite de vérification

Playwright est installé, mais son Chromium local n’est pas présent. Une tentative via Google Chrome système a été bloquée par les permissions macOS du sandbox. Les validations navigateur automatisées complètes devront être relancées hors sandbox ou après installation du navigateur Playwright.

## Recommandations restantes

- Tester sur vrais appareils : iPhone Safari, Android Chrome, tablette.
- Compléter les contenus légaux avec les informations juridiques réelles.
- Brancher un vrai paiement ou formulaire de commande si la boutique devient transactionnelle.
- Ajouter des visuels face/dos, zoom produit ou photos portées si disponibles.
- Brancher le formulaire Club MIRAZUR à un CRM/emailing avant mise en ligne.
