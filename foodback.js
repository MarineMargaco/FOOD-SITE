// je vais chercher le driver sqlite3 dans node_modules
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());



const dbFile = 'food.db';
const db = new sqlite3.Database(dbFile);


db.serialize(() => {

    db.run('CREATE TABLE recettes ( recette_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, url TEXT , description VARYING CHARACTER(255), recette2_id INTEGER )');
    db.run('CREATE TABLE articles ( article_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, url TEXT , description TEXT)');
    db.run('CREATE TABLE bien ( bien_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, url TEXT , description TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS client (client_id INTEGER PRIMARY KEY AUTOINCREMENT,  firstname TEXT , name TEXT , mail TEXT , password TEXT)');

    db.run('INSERT INTO recettes (name,url,description, recette2_id) VALUES (?,?,?,?)', 'Fondant au chocolat', 'https://static.cuisineaz.com/400x320/i75546-fondant-au-chocolat-de-delphine.jpg', 'Etape 1 : Préchauffer le four à 200°C. Etape 2 : Mélanger le sucre et les oeufs puis ajouter la farine et continuer de mélanger. Etape 3 : Faire fondre le chocolat au micro-onde. Etape 4 : Incorporer le chocolat au mélange. Etape 5 : Remplir les ramequins, enfourner et laisser cuire 6 à 7 min. Bonne Dégustation !', 1);
    db.run('INSERT INTO recettes (name,url,description, recette2_id) VALUES (?,?,?,?)', 'Pasteis de Nata', 'https://missdenglishclass.files.wordpress.com/2015/09/pastel-de-nata.jpg', 'Achetez les directement ça fait moins de boulot !', 1);
    db.run('INSERT INTO recettes (name,url,description, recette2_id) VALUES (?,?,?,?)', 'Burger avocat', 'http://www.seriouseats.com/images/2016/04/20160428-memorial-day-burger-recipes-roundup-19.jpg', 'Faites un burger normal et ajoutez-y de l\'avocat', 4);
    db.run('INSERT INTO recettes (name,url,description, recette2_id) VALUES (?,?,?,?)', 'Lasagne', 'https://dinnerthendessert.com/wp-content/uploads/2016/04/Ultimate-Meat-Lasagna-3-1.jpg', 'Etape 1 : Faire sauter la viande hachée, les tomates et les oignons dans une poêle. Etape 2 : Faire cuire la béchamel. Etape 3 : Dans un plat du cuisson , placer 3 feuilles de pâtes à lasagne , ajouter le viande puis la béchamel jusqu\'à la fin de votre paquet de pâtes. Etape 4 : Enfourner pendant 30minutes à 180°C.', 4);

    db.run('INSERT INTO articles (name,url,description) VALUES (?,?,?)', 'La montée des FOOD TRUCKS', 'https://tse1.mm.bing.net/th?id=OIP.GklG-pNS1dGAhP4-CQtaUQHaE8&pid=15.1&P=0&w=235&h=157', 'WAOW');
    db.run('INSERT INTO articles (name,url,description) VALUES (?,?,?)', 'Où manger VEGAN à Paris', 'https://tse1.mm.bing.net/th?id=OIP.HpMdmROo-ysUkROyCyHgvAHaE8&pid=15.1&P=0&w=236&h=158', 'Hank Burgers / Cloud Cakes / By Chloé / Happiz ');

    db.run('INSERT INTO bien (name,url,description) VALUES (?,?,?)', 'TOP 5 des workout du moment', 'https://tse1.mm.bing.net/th?id=OIP.Nme0MGpAKFQ-RDEAETLFsAHaD8&pid=15.1&P=0&w=285&h=153', 'Pilate, Hot Yoga, Cycle Class, Cryothérapie, Squash');


    db.all('SELECT * FROM articles', function (error, data) {
        if (!error) console.log(data);
        else console.log(error);
    });
})

app.get('/sucre', function (request, response) {
    db.all('SELECT * FROM recettes WHERE recette2_id= 1', function (error, data) {
        response.send(data);
    })
});

app.get('/sale', function (request, response) {
    db.all('SELECT * FROM recettes WHERE recette2_id= 4', function (error, data) {
        response.send(data);
    });
});

app.get('/article', function (request, response) {
    db.all('SELECT * FROM articles', function (error, data) {
        response.send(data);
    })
});

app.get('/be', function (request, response) {
    db.all('SELECT * FROM bien', function (error, data) {
        response.send(data);
    })
});

app.post('/client', function (request, response) {
    console.log(request.body.client_name);
    db.run('INSERT INTO client (firstname, name, mail, password) VALUES(?, ? , ?, ?)', request.body.firstname, request.body.name, request.body.mail, request.body.password);
    response.send(data);
});

app.listen(5000, function (error) {
    if (!error) {
        console.log('app listening port 5000');
    }
});