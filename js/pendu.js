"use strict";

// Initialisation des variables globales

let dictionnaire = ["terminal", "processeur", "informatique", "peripheriques", "ordinateur", "numerique", "analogique", "declick",
    "angle", "armoire", "banc", "bureau", "cabinet", "carreau", "chaise", "classe", "cle", "coin", "couloir", "dossier", "eau", "ecole", "ecriture",
    "entree", "escalier", "etagere", "etude", "exterieur", "fenetre", "interieur", "lavabo", "lecture", "lit", "marche", "matelas", "maternelle",
    "meuble", "mousse", "mur", "peluche", "placard", "plafond", "porte", "portemanteau", "poubelle", "radiateur", "rampe", "recreation", "rentree",
    "rideau", "robinet", "salle", "savon", "serrure", "serviette", "siege", "sieste", "silence", "sol", "sommeil", "sonnette", "sortie", "table",
    "tableau", "tabouret", "tapis", "tiroir", "toilette", "vitre", "wc"];

let motRandom = motsAleatoires().toUpperCase();     // Mot générer aléatoirement
let mauvaiseLettre = 0;                             // Permet de compter le nombre de mauvaise lettres 
let lettresTrouvees = 0;                            // Permet de mettre toutes les lettres trouvées dans un tableau.
let score = 0;                                      // Permet d'incrémenter le score lorsque le joueur gagne la partie
let fini = false;                                   // Indique si le jeu est fini ou pas.
let nomJoueur;                                      // Variable du prompt - Demande le nom du Joueur
let essais = 8;                                     // Nombre d'essais pour le joueur

/**
 * Permet de lancer le jeu
 */
function startGame() {
    let tirets = "?";
    let newSpan = document.getElementById("mettreMot");
    for (let i in motRandom) {
        newSpan.innerHTML += "<span id=\"" + i + "\">" + tirets + "</span>";
    }
    document.getElementById('tentatives').innerHTML = "Nombre d'essais : " + essais;
    document.getElementById('infos').innerHTML = 'Cliquer sur un bouton juste en dessous avec la souris pour commencer à jouer !';
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
        }
    }

    if (!motTrouvee) {
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
        }
    }
    if (lettresTrouvees == motRandom.length) {
        document.getElementById('imagePendu').src = "images/win.gif";
        fini = true;
        score += 5;
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