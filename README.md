# Backend de l'application nodeJS pour le projet Diginamic "Concession automobile"

## Pour l'installation

Après avoir cloné le projet, lancer :
### `npm i`

Dans le dossier de l'application, vous pouvez lancer : 
### `npm start`

Créer un fichier à la racine nodemon.json avec le contenu suivant et remplacer les valeurs des paramètres : 
### `{
    "env": {
            "HOST": "localhost",
            "DB_USER": "<nom_utilisateur>",
            "DB_PASSWORD": "<mot_de_passe>",
            "DB_NAME": "<car_project>"
        }
    }`