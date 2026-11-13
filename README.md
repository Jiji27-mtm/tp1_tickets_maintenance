# TP1 - Gestion des tickets de maintenance

## Informations
- **Nom :** Arij Mtimet
- **Classe :** L2 DSI
- **Établissement :** ISET Djerba
- **Module :** Framework côté client

## Présentation
Ce projet consiste à créer une application Vue.js permettant de consulter et rechercher des tickets de maintenance informatique.

## Technologies utilisées
- Vue.js 3
- Vite
- Axios
- JSON Server
- JavaScript et CSS

## Installation

```bash
npm install
npm install axios
```

## Lancement du projet

Terminal 1 :
```bash
npx json-server db.json --port 3000
```

Terminal 2 :
```bash
npm run dev
```

## Fonctionnalités
- Afficher les tickets.
- Rechercher un ticket par titre.
- Filtrer par statut et priorité.
- Afficher le nombre de tickets.
- Gérer le chargement et les erreurs.

## Questions

**1. Différence entre API REST et db.json :**

`db.json` contient les données, tandis que l'API REST permet d'accéder à ces données.

**2. Pourquoi utiliser onMounted() ?**

Pour charger les tickets automatiquement lorsque le composant s'affiche.

**3. Quel est le rôle d'Axios ?**

Axios permet de communiquer avec l'API et de récupérer les tickets.

**4. Différence entre ref() et computed() :**

`ref()` permet de créer une donnée réactive. `computed()` permet de calculer une valeur à partir d'autres données réactives.

## Captures d'écran

Les captures demandées sont enregistrées dans le dossier `captures/`.

## Conclusion

Ce TP m'a permis de découvrir les API REST et d'apprendre à utiliser Vue.js et Axios pour afficher et filtrer des données.