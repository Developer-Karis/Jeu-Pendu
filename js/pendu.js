"use strict";

// Initialisation des variables globales

let dictionnairesMots = ["terminal", "processeur", "informatique", "peripheriques", "ordinateur", "numerique", "analogique", "declick",
    "angle", "armoire", "banc", "bureau", "cabinet", "carreau", "chaise", "classe", "cle", "coin", "couloir", "dossier", "eau", "ecole", "ecriture",
    "entree", "escalier", "etagere", "etude", "exterieur", "fenetre", "interieur", "lavabo", "lecture", "lit", "marche", "matelas", "maternelle",
    "meuble", "mousse", "mur", "peluche", "placard", "plafond", "porte", "portemanteau", "poubelle", "radiateur", "rampe", "recreation", "rentree",
    "rideau", "robinet", "salle", "savon", "serrure", "serviette", "siege", "sieste", "silence", "sol", "sommeil", "sonnette", "sortie", "table",
    "tableau", "tabouret", "tapis", "tiroir", "toilette", "vitre", "wc"];

let motRandom = motsAleatoires().toUpperCase(); // Mot générer aléatoirement
console.log(motRandom);

let listeMots = dictionnairesMots; // Contient tous les mots du Dictionnaires - Liste de mots
let mauvaiseLettre = 0; // Permet de compter le nombre de mauvaise lettres 
let bonneLettre = 0;    // Permet de compter le nombre de bonne lettres
let motTrouvee = false; // Permet d'indiquer si le mot à été trouvé ou pas

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
    for (let i in motRandom) {
        if (lettre.innerHTML == motRandom.charAt(i)) {
            changeCouleurLettre(lettre, "#25EB06");
            bonneLettre++;
        }
    }

    /*if (!motTrouvee) {
        mauvaiseLettre++;
        document.getElementById('imagePendu').src = "images/pendu" + mauvaiseLettre + ".PNG";

        if (mauvaiseLettre >= 8) {
            alert("Vous avez perdu !");
        }
    }*/
    if (bonneLettre == motRandom.length) {
        alert("Vous avez gagné !");
    }
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