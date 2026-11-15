# TP2 - Gestion des tickets de maintenance

## 1. Présentation
Ce projet est une application web réalisée avec Vue.js 3 pour gérer des tickets de maintenance informatique.

## 2. Technologies utilisées
- Vue.js 3
- JavaScript
- Axios
- Vue Router
- JSON Server
- HTML et CSS

## 3. Installation

Installer les dépendances :

```bash
npm install
```

## 4. Lancement du projet

Lancer le serveur JSON :

```bash
npx json-server db.json --port 3000
```

Lancer Vue.js dans un deuxième terminal :

```bash
npm run dev
```

## 5. Fonctionnalités réalisées
- Afficher la liste des tickets.
- Rechercher un ticket par titre.
- Filtrer les tickets par statut et priorité.
- Ajouter un nouveau ticket.
- Modifier un ticket.
- Supprimer un ticket avec confirmation.
- Consulter les détails d'un ticket.
- Modifier le statut d'un ticket.
- Valider les champs obligatoires.
- Afficher les messages d'erreur.

## 6. Questions

**1. Quelle est la différence entre POST, PUT et PATCH ?**

- POST : permet d'ajouter un nouveau ticket.
- PUT : permet de remplacer les informations d'un ticket.
- PATCH : permet de modifier seulement certaines informations.

**2. Pourquoi demander une confirmation avant DELETE ?**

Pour éviter de supprimer un ticket par erreur.

**3. Quel est le rôle de Vue Router ?**

Vue Router permet de naviguer entre les différentes pages de l'application sans recharger toute la page.

**4. Comment éviter les doublons lors de l'enregistrement ?**

On désactive le bouton d'enregistrement pendant l'envoi du formulaire pour empêcher plusieurs clics.

## 7. Difficultés rencontrées

J'ai rencontré quelques difficultés lors de la configuration du projet, de la navigation entre les pages et de la communication avec JSON Server. J'ai réussi à les résoudre progressivement.

## 8. Auteur

Nom : Arij Mtimet  
Formation : L2 DSI 1 
Établissement : ISET Djerba