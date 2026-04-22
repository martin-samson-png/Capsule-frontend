
# 💰 Expense Tracker App - Frontend (Nuxt 4)

Interface utilisateur réactive et haute performance pour la gestion des finances personnelles, exploitant les dernières conventions de **Nuxt 4**.

## 🚀 Stack Technique

* **Framework** : [Nuxt 4](https://nuxt.com/) - Structure moderne avec dossier `app/`.
* **Langage** : TypeScript (Strict Mode).
* **Gestion d'état** : Composition API (ShallowRef & Computed pour la performance).
* **Communication API** : `$fetch` natif avec gestion des types partagés.

## 🛠️ Fonctionnalités Clés

* **Optimisation des Payloads (Dirty Checking)** : Le client identifie uniquement les champs modifiés lors de l'édition pour envoyer un payload minimal (`PATCH`) au serveur.
* **Formatage & Normalisation** : 
    - Conversion bidirectionnelle : Euros (UI) ↔ Centimes (API).
    - Normalisation des dates au format ISO avant envoi au Backend.
* **Structure Nuxt 4 (App Layer)** : Organisation optimisée autour du dossier `app/` pour une meilleure séparation des composants et des composables.
* **Gestion des Objectifs** : Suivi visuel de la progression avec mise à jour automatique des statuts.

## 🏗️ Structure du Projet (Nuxt v4 Layout)

* **`app/components/`** : Composants modulaires (Input monétaire, sélecteurs, widgets de balance).
* **`app/composables/`** : Logique métier partagée :
    - `useTransaction` : Cycle de vie des transactions et appels API.
    - `useFormUtils` : Utilitaires de calcul des "dirty values" et formatage.
* **`app/pages/`** : Vues applicatives (Dashboard, Transactions, Paramètres).

## 🔧 Installation

1.  Installer les dépendances :
    ```bash
    npm install
    ```
2.  Configurer le `.env` :
    ```env
    NUXT_PUBLIC_API_BASE=http://localhost:3001/api
    ```
3.  Lancer l'application :
    ```bash
    npm run dev
    ```

## 🔒 Sécurité
L'application utilise le token de session **Supabase Auth**. Ce token est injecté dans les headers de chaque requête sortante pour authentifier l'utilisateur auprès du Backend Express.
