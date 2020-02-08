"use strict";

// Initialisation des variables globales

let dictionnairesMots = ["terminal", "processeur", "informatique", "peripheriques", "ordinateur", "numerique", "analogique", "declick",
    "angle", "armoire", "banc", "bureau", "cabinet", "carreau", "chaise", "classe", "cle", "coin", "couloir", "dossier", "eau", "ecole", "ecriture",
    "entree", "escalier", "etagere", "etude", "exterieur", "fenetre", "interieur", "lavabo", "lecture", "lit", "marche", "matelas", "maternelle",
    "meuble", "mousse", "mur", "peluche", "placard", "plafond", "porte", "portemanteau", "poubelle", "radiateur", "rampe", "recreation", "rentree",
    "rideau", "robinet", "salle", "savon", "serrure", "serviette", "siege", "sieste", "silence", "sol", "sommeil", "sonnette", "sortie", "table",
    "tableau", "tabouret", "tapis", "tiroir", "toilette", "vitre", "wc"];

let motRandom = motsAleatoires().toUpperCase();
console.log(motRandom);

/**
 * Permet de lancer le jeu
 */
function game() {
    init();
    recommencer();
    nombresEssais();
}

/**
 * Créer le mot cacher
 */
function init() {
    let tirets = "-";
    let newDiv = document.getElementById("mettreMot");
    for (let i in motRandom) {
        newDiv.innerHTML += "<span class='lettre'>" + tirets + "</span>";
    }
    document.getElementById("imagePendu").src = "images/blanc.jpg";
}

/**
 * Vérifie et teste la lettre reçu en paramètre,
 * l'utilisateur choisie une lettre pour compléter le mot.
 * 
 * @param {*} lettre - Lettre recçu en paramètre
 */
function choisirLettre(lettre) {
    let nbErreurs = 0;
    nbErreurs++;
    for (let i in motRandom) {
        if (lettre == motRandom.charAt(i)) {
            tirets = lettre;
        } else if (lettre !== motRandom.charAt(i)) {
            document.getElementById("imagePendu").src = "images/pendu" + nbErreurs + ".PNG";
        }
    }
}

/**
 * Affiche le nombre d'essais encore possible pour le joueur
 */
function nombresEssais() {
    let infos = document.getElementById("essais");
    let nbEssais = motRandom.length;
    infos.innerHTML = ("Il vous reste " + nbEssais + " essais");
    return nbEssais;
}

/**
 * Permet de générer aléatoirement un mot dans le tableau Dictionnaire
 */
function motsAleatoires() {
    let premierMot = 0;
    let dernierMot = dictionnairesMots.length - 1;
    let resultat = Math.floor(Math.random() * (dernierMot - premierMot));
    let afficheMot = dictionnairesMots[resultat];
    return afficheMot;
}

/**
 * Permet de rafraîchir la page en remettant tout à zéro
 */
function recommencer() {
    document.getElementById("restart").src = "images/restart.PNG";
    let recom = document.getElementById("restart");
    if (recom.onclick == true) {
        window.location.reload();
    }
}