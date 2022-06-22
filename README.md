# Projet Semestre

## Setup

### Linux

`sudo make install-dependencies`

`make setup`

### Windows

Installer npm et node.js (<https://github.com/coreybutler/nvm-windows>), et python (pour SQLite3)
Puis npm install

## Build

### Linux

`make build`

### Windows

`npx electron-forge import`

`npm run make`

## Sujet

Wavia est une application de gestion de bibliothèque musicale qui utilise une base de données

### Technologies

_Electron.js + SQLite_
Electron est un framework Javascript qui permet de réaliser des applications/logiciels sans passer par un navigateur. Il est notamment utilisé pour le développement de Discord.
SQLite est un langage permettant de dialoguer avec une donnée, il est léger et simple. Nous l’avons choisi car il vient par défaut avec Electron.

### Features et cas d’utilisations

L’utilisateur sera capable de :

- Ajouter, supprimer ou modifier :
  - Un titre
  - Un artiste
  - Un album
  - Un groupe
  - Effectuer une recherche au sein de la base de données
  - Importer la liste et les chemins vers les fichiers musicaux qu’il possède

Toutes ces actions seront réalisables à partir de l’information utilisateur de l’application (GUI).

### Extensions possibles

- Utiliser un framework Javascript pour le frontend (Vue ou Angular)
- Ecoute (pouvoir écouter les titres, historique et faire des recommandations)
- Autocorrection des métas (titre, compositeur, paroles, …etc) local storage pour image & paroles
- Streaming (fichiers many to many + polymorphisme de la source d’un titre: fichier / web stream)
- Playlists (playlistes manuelles + playlistes dynamiques)

![Such WOW](https://upload.wikimedia.org/wikipedia/commons/d/df/Doge_homemade_meme.jpg)
