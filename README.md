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

## Mise en place du Bot Discord

(source : https://discordjs.guide/preparations/setting-up-a-bot-application.html)

1. Se rendre sur le [portail développeur Discord](https://discord.com/developers/applications).

2. Créer une nouvelle application.

3. Noter les informations suivantes dans le fichier .env.local :

- DISCORD_APPLICATION_ID -> "Application id", onglet "General information"
- DISCORD_PUBLIC_KEY -> "Public key", onglet "General information"
- DISCORD_TOKEN -> Onglet "Bot", cliquer sur "Reset token" et copier la valeur générée

4. Inviter le bot à un serveur :

    1. Allez dans l'onglet "OAuth2", descendre pour voir la section "OAuth2 URL Generator"

    2. Dans les scopes, cocher "bot" et "applications commands"

    3. Dans les permissions, cocher "Manage roles", "Send messages", et "Read Message History"

    4. Naviguer sur l'URL générée et choisir et serveur.

5. Copier l'id du serveur dans la variables DISCORD_SERVER_ID du .env :

    1. Activer les options développeur sur l'application Discord

    2. Clic-droit sur le serveur -> "Copier l'identifiant du serveur" tout en bas
