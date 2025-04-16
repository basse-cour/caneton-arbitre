# Caneton arbitre
Le bot Discord qui compte les "nez" et les "becs" (et même les "necs")

## Installation

```bash
git clone https://github.com/basse-cour/caneton-arbitre.git
cd caneton-arbitre
npm i
npm run build
npm start
```

## Commandes npm

| Commande                | Description                                                          |
|-------------------------|----------------------------------------------------------------------|
| npm run build           | Transpile le projet en JS dans le dossier "dist"                     |
| npm start               | Démarre l'application (dist/index.js)                                |
| npm run build-start     | Transpile et démarre l'application si réussi                         |
| npm run watch           | Transpile et démarre le projet à chaque modification                 |
| npm run deploy-commands | Enregistre les commandes auprès de Discord pour le serveur configuré |
