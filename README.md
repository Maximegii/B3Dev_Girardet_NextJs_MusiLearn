# 🎵 **MusiLearn - Gestion de Cours de Musique**  

MusiLearn est une application web permettant la gestion des cours de musique avec différents rôles : **Admin, Enseignant et Étudiant**.  

## 🚀 **Installation et Lancement**  

### 1️⃣ **Installer PNPM**  
Avant de commencer, il est recommandé d’utiliser **PNPM** comme gestionnaire de paquets.  
Si ce n'est pas encore fait, installe-le avec la commande suivante :  

```sh
npm install -g pnpm
````
### 2️⃣ Installation des dépendances

Après avoir cloné le projet, place-toi dans le dossier de l'application et installe les dépendances avec :

````sh
pnpm install
````

### 3️⃣ Démarrer l'application
Une fois les dépendances installées, lance le serveur en exécutant :

````sh
pnpm run start
````
L'application sera alors accessible sur :

👉 http://localhost:3000

🎯 Fonctionnalités et Guide d'utilisation

🔹 Initialisation des données
Lors de la première utilisation en local, il faut générer un premier jeu de données.
Pour cela, rends-toi sur :

👉 http://localhost:3000/seed

Ensuite, pour vérifier que les données ont bien été ajoutées, visite :

👉 http://localhost:3000/query

Tu devrais voir un exemple de données insérées.

👤 Rôles et Accès
🔸 Connexion en tant qu'Admin
Pour accéder au tableau de bord Admin, connecte-toi avec :

Email : admin@musilearn.com
Mot de passe : 123456
En tant qu’Admin, tu as accès à l’onglet Admin, qui permet de gérer les utilisateurs et leurs rôles.

Pour se connecter en enseignant : 
Email: teacher@musilearn.com
MDP: 123456

Et en student : 

Email : student@musilearn.com
MDP: 123456 

🎓 Rôle Enseignant
Une fois connecté en tant qu’enseignant, tu auras accès aux sections suivantes :

📚 Gestion des Cours
Ajouter, modifier ou supprimer des cours
Consulter la liste des cours
📝 Gestion des Notes
Voir la liste des étudiants
Consulter les cours auxquels ils sont inscrits
Ajouter ou modifier une note et un commentaire
🧑‍🎓 Rôle Étudiant
Les étudiants ont accès à :

🎼 Onglet Cours
Afficher la liste des cours
S’inscrire aux cours disponibles
📖 Onglet Mon Espace
Voir ses cours
Consulter ses notes et commentaires laissés par les enseignants



