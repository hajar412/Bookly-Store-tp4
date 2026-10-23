# Bookly Store

Tableau de bord des commandes d'une librairie en ligne, réalisé en HTML, Bootstrap et JavaScript (TP4).

## Description

Bookly Store charge trois fichiers JSON liés entre eux (clients, produits, commandes), les stocke dans un état central, puis reconstruit les informations utiles en reliant les identifiants. L'application affiche les commandes avec le nom du client et le montant calculé, permet de les rechercher et de les filtrer, et montre le détail de chaque commande.

Les données ne sont pas répétées : une commande ne contient que des identifiants (`customerId`, `productId`). Le nom du client, le prix des livres et les totaux sont retrouvés et calculés par le code.

## Fonctionnalités

- Chargement de trois fichiers JSON avec `fetch()`, `async / await` et `try / catch`
- Quatre indicateurs calculés dynamiquement : clients, produits, commandes, montant cumulé
- Recherche d'une commande par nom de client
- Filtre par statut de commande (Livrée, En attente, Annulée)
- Filtre par catégorie de produit
- Les trois critères fonctionnent ensemble
- Détail d'une commande dans un modal : client, ville, date, statut, produits, montant de chaque ligne et total
- Message d'erreur dans la page si un fichier ne se charge pas
- Interface responsive avec Bootstrap

## Structure du projet

bookly-store/
|-- index.html
|-- livre.png
|-- README.md
|-- css/
|   '-- style.css
|-- data/
|   |-- customers.json
|   |-- products.json
|   '-- orders.json
'-- js/
    |-- app.js
    |-- state.js
    |-- dataService.js
    |-- selectors.js
    '-- view.js

| Fichier | Rôle |
|---|---|
| `state.js` | conserve l'état de l'application (données et filtres) |
| `dataService.js` | charge les trois fichiers JSON |
| `selectors.js` | retrouve, relie, filtre et calcule les données |
| `view.js` | met à jour l'affichage dans le DOM |
| `app.js` | initialise l'application et gère les événements |

## Modèle de données

Customer <-- customerId <-- Order --> productId --> Product

- `customers.json` : `id`, `name`, `city`, `active`
- `products.json` : `id`, `name`, `category`, `price`, `stock`
- `orders.json` : `id`, `customerId`, `status`, `date`, `items` (liste de `productId` et `quantity`)

Statuts utilisés : `Livree`, `En attente`, `Annulee`.

## Fonctionnement

fichiers JSON  ->  chargement  ->  state  ->  traitement  ->  render()  ->  DOM

Quand l'utilisateur agit : événement, modification du `state`, puis nouvel appel de `render()`.

Méthodes JavaScript utilisées : `find()` pour relier les entités, `filter()` pour la recherche et les filtres, `map()` pour produire le HTML, `forEach()` pour les calculs et les totaux.

## Lancer le projet

Le projet utilise `fetch()` et des modules JavaScript : il ne fonctionne pas en ouvrant `index.html` par double-clic. Il faut le servir par un serveur local.

1. Cloner le dépôt :
   bash
   git clone https://github.com/hajar412/Bookly-Store-tp4.git
   
2. Ouvrir le dossier dans Visual Studio Code.
3. Installer l'extension **Live Server** (si elle n'est pas installée).
4. Clic droit sur `index.html`, puis **Open with Live Server**.

## Technologies

HTML5, CSS3, Bootstrap 5, JavaScript (modules ES), JSON, Git et GitHub.

## Auteur

EL KASRAOUI HAJAR  - LST DI
