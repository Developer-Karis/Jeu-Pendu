"use strict";

// Initialisation des variables globales

let dictionnaire = ["terminal", "processeur", "informatique", "peripheriques", "ordinateur", "numerique", "analogique", "declick",
    "angle", "armoire", "banc", "bureau", "cabinet", "carreau", "chaise", "classe", "cle", "coin", "couloir", "dossier", "eau", "ecole", "ecriture",
    "entree", "escalier", "etagere", "etude", "exterieur", "fenetre", "interieur", "lavabo", "lecture", "lit", "marche", "matelas", "maternelle",
    "meuble", "mousse", "mur", "peluche", "placard", "plafond", "porte", "portemanteau", "poubelle", "radiateur", "rampe", "recreation", "rentree",
    "rideau", "robinet", "salle", "savon", "serrure", "serviette", "siege", "sieste", "silence", "sol", "sommeil", "sonnette", "sortie", "table",
    "tableau", "tabouret", "tapis", "tiroir", "toilette", "vitre", "wc"];

let motRandom = motsAleatoires().toUpperCase();         // Mot générer aléatoirement
let mauvaiseLettre = 0;                                 // Permet de compter le nombre de mauvaise lettres 
let lettresTrouvees = 0;                                // Permet de mettre toutes les lettres trouvées dans un tableau.
let score = 0;                                          // Permet d'incrémenter le score lorsque le joueur gagne la partie
let fini = false;                                       // Indique si le jeu est fini ou pas.
let nomJoueur;                                          // Variable du prompt - Demande le nom du Joueur
let essais = 8;                                         // Nombre d'essais pour le joueur
let secondes = 60;                                      // Temps restant du joueur
let interval = setInterval(timer, 1000);                // Ajoute un timer

/**
 * Permet de lancer le jeu
 */
function startGame() {
    let accueil = document.getElementById('accueil');
    accueil.volume = 0.1;
    let tirets = "?";
    let newSpan = document.getElementById("mettreMot");
    for (let i in motRandom) {
        newSpan.innerHTML += "<span id=\"" + i + "\">" + tirets + "</span>";
    }
    document.getElementById('tentatives').innerHTML = "Nombre d'essais : " + essais;
    document.getElementById('infos').innerHTML = 'Cliquer sur une lettre juste en dessous pour commencer à jouer !';
    document.getElementById('timer').innerHTML = "Temps restant : " + secondes + " secondes";
}

/**
 * Fonction qui modifie la couleur lorsque la lettre,
 * selectionnée est bonne ou pas.
 * @param {*} lettre - Lettre reçu en paramètre, L'élément en cours
 * @param {*} couleur - Couleur reçu en paramètre, String avec le code couleur
 */
function changeCouleurLettre(lettre, couleur) {
    lettre.style.backgroundColor = couleur;
}

/**
 * Fonction qui gère les lettres du clavier, introduits par l'utilisateur
 * @param {*} element - L'élément en cours, this(lettre)
 */
function choisirLettre(lettre) {
    if (lettre.style.backgroundColor == "#25EB06" || fini) return;
    changeCouleurLettre(lettre, "#25EB06");

    let motTrouvee = false;

    for (let i in motRandom) {
        if (motRandom.charAt(i) == lettre.innerHTML) {
            document.getElementById(i).innerHTML = lettre.innerHTML;
            motTrouvee = true;
            lettre.disabled = true;
            lettresTrouvees++;
            score++;
            let bonneReponse = document.getElementById('bonneReponse');
            bonneReponse.volume = 0.1;
            accueil.pause();
            bonneReponse.play();
        }
    }

    if (!motTrouvee) {
        let mauvaiseReponse = document.getElementById('mauvaiseReponse');
        mauvaiseReponse.volume = 0.1;
        accueil.pause();
        mauvaiseReponse.play();
        essais--;
        document.getElementById('tentatives').innerHTML = "Nombre d'essais : " + essais;
        mauvaiseLettre++;
        lettre.disabled = true;
        changeCouleurLettre(lettre, "red");
        document.getElementById('imagePendu').src = "images/pendu" + mauvaiseLettre + ".PNG";

        if (mauvaiseLettre >= 8 && essais == 0) {
            document.getElementById('imagePendu').src = "images/perdu.gif";
            alert("Vous avez perdu !"
                + "\n" + "Le mot à trouvé était : " + motRandom);
            for (let i in motRandom) {
                document.getElementById(i).innerHTML = motRandom.charAt(i);
            }
            fini = true;
            // Activé l'audio
            let son_perdu = document.getElementById('sonPerdu');
            son_perdu.play();
            son_perdu.volume = 0.4;
            // Mettre en pause la musique sur la page d'acceuil
            accueil.pause();
            clearInterval(interval);
        }
    }
    if (lettresTrouvees == motRandom.length) {
        document.getElementById('imagePendu').src = "images/win.gif";
        fini = true;
        score += 5;
        let gagnant = document.getElementById('sonGagnant');
        gagnant.volume = 0.2;
        accueil.pause();
        gagnant.play();
    }
}

/**
 * Affiche le tableau de Scores pour les joueurs
 */
function tableauScores() {
    alert("Voici le Tableau de Scores : "
        + "\n" + "Score : " + score
        + "\n" + "Lettre trouvée + 1 points"
        + "\n" + "Mot trouvé + 5 points");
}

/**
 * Permet de générer aléatoirement un mot dans le tableau Dictionnaire
 */
function motsAleatoires() {
    let premierMot = 0;
    let dernierMot = dictionnaire.length - 1;
    let resultat = Math.floor(Math.random() * (dernierMot - premierMot));
    let afficheMot = dictionnaire[resultat];
    return afficheMot;
}

/**
 * Ajouter un timer pour rajouter de la difficulté dans le Jeu
 */
function timer() {
    if (secondes <= 30) {
        score += 2;
    }
    document.getElementById('timer').innerHTML = "Temps restant : " + secondes + " secondes";
    secondes--;
}