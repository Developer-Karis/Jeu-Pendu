"use strict";

// Initialisation des variables globales
// Tableau qui contient tous les mots du Jeu Pendu
let dictionnaire = ["aikido", "alpinisme", "aviron", "badminton", "baseball", "basketball", "billard"];

// Tous les thèmes du Jeu
let musique = ["billie"];
let animaux = ["singe", "gorille"];
let informatique = ["processeur", "ordinateur"];
let jeux = ["battlefield", "valorant"];
let films = ["intouchables", "fast and furious"];
let sports = ["aikido", "alpinisme", "aviron", "badminton", "baseball", "basketball", "billard"];

// Gérer les images du Pendu
let ajouterImageSports = new Array();

// Autres variables globales
let motRandom = motsAleatoires().toUpperCase();         // Mot générer aléatoirement
let mauvaiseLettre = 0;                                 // Permet de compter le nombre de mauvaise lettres 
let lettresTrouvees = 0;                                // Permet de mettre toutes les lettres trouvées dans un tableau.
let score = 0;                                          // Permet d'incrémenter le score lorsque le joueur gagne la partie
let fini = false;                                       // Indique si le jeu est fini ou pas.
let nomJoueur;                                          // Variable du prompt - Demande le nom du Joueur
let essais = 8;                                         // Nombre d'essais pour le joueur
let secondes = 30;                                      // Temps restant du joueur
let interval = setInterval(timer, 1000);                // Ajoute un timer
let themes = "";                                        // Indique le thème du mots au joueur

/**
 * Permet de lancer le jeu
 */
function startGame() {
    let accueil = document.getElementById('accueil');
    accueil.volume = 0.08;
    let tirets = "?";
    let newSpan = document.getElementById("mettreMot");
    for (let i in motRandom) {
        // Permet de créer le mot avec le symbole ?
        newSpan.innerHTML += "<span id=\"" + i + "\">" + tirets + "</span>";
        // Condition qui permet de comparer le tableau Dictionnaire 
        // et les tableaux des différents thèmes pour afficher le thème du Pendu
        if (motRandom.toLowerCase() == musique[i]) {
            themes = "Musique";
            imageMusic();
        }
        if (motRandom.toLowerCase() == animaux[i]) {
            themes = "Animaux";
            imageAnimaux();
        }
        if (motRandom.toLowerCase() == informatique[i]) {
            themes = "Informatique";
            imageInformatique();
        }
        if (motRandom.toLowerCase() == jeux[i]) {
            themes = "Jeux Vidéo";
            imageJeux();
        }
        if (motRandom.toLowerCase() == films[i]) {
            themes = "Films";
            imageFilms();
        }
        if (motRandom.toLowerCase() == sports[i]) {
            themes = "Sports";
            imageSports();
        }
    }
    document.getElementById('tentatives').innerHTML = "Nombre d'essais : " + essais;
    document.getElementById('infos').innerHTML = 'Cliquer sur une lettre juste en dessous pour commencer à jouer !';
    document.getElementById('timer').innerHTML = "Temps restant : " + secondes + " secondes";
    document.getElementById('themes').innerHTML = "Thème : " + themes;
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
            bonneReponse.volume = 0.2;
            bonneReponse.play();
        }
    }

    if (!motTrouvee) {
        let mauvaiseReponse = document.getElementById('mauvaiseReponse');
        mauvaiseReponse.volume = 0.1;
        mauvaiseReponse.play();
        essais--;
        document.getElementById('tentatives').innerHTML = "Nombre d'essais : " + essais;
        mauvaiseLettre++;
        lettre.disabled = true;
        changeCouleurLettre(lettre, "red");
        document.getElementById('imagePendu').src = "images/pendu" + mauvaiseLettre + ".PNG";

        if (mauvaiseLettre == 8 && essais == 0) {
            accueil.pause();
            sonCountdown.pause();
            document.getElementById('imagePendu').src = "images/perdu.gif";
            for (let i in motRandom) {
                document.getElementById(i).innerHTML = motRandom.charAt(i);
            }
            fini = true;
            let son_perdu = document.getElementById('sonPerdu');
            son_perdu.play();
            son_perdu.volume = 0.3;
            clearInterval(interval);
        }
    }
    if (lettresTrouvees == motRandom.length) {
        document.getElementById('imagePendu').src = "images/win.gif";
        fini = true;
        score += 5;
        let gagnant = document.getElementById('sonGagnant');
        gagnant.volume = 0.3;
        accueil.pause();
        sonCountdown.pause();
        gagnant.play();
        clearInterval(interval);
    }
}

/**
 * Affiche le tableau de Scores pour les joueurs
 */
function tableauScores() {
    alert("Voici le Tableau de Scores : "
        + "\n" + "Score : " + score
        + "\n" + "Lettre trouvée + 1 points"
        + "\n" + 'Lettre trouvée en moins de 20 secondes + 3 points'
        + "\n" + "Mot trouvé + 5 points");
}

/**
 * Permet de générer aléatoirement un mot dans le tableau Dictionnaire
 */
function motsAleatoires() {
    let premierMot = 0;
    let dernierMot = dictionnaire.length;
    let resultat = Math.floor(Math.random() * (dernierMot - premierMot));
    let afficheMot = dictionnaire[resultat];
    return afficheMot;
}

/**
 * Ajouter un timer pour rajouter de la difficulté dans le Jeu
 */
function timer() {
    if (secondes >= 0 && secondes <= 10) {
        let sonCountdown = document.getElementById('sonCountdown');
        sonCountdown.volume = 0.1;
        accueil.pause();
        sonCountdown.play();
    }
    if (secondes == 0) {
        accueil.pause();
        sonCountdown.pause();
        document.getElementById('imagePendu').src = "images/perdu.gif";
        for (let i in motRandom) {
            document.getElementById(i).innerHTML = motRandom.charAt(i);
        }
        fini = true;
        let son_perdu = document.getElementById('sonPerdu');
        son_perdu.play();
        son_perdu.volume = 0.2;
        clearInterval(interval);
    }
    document.getElementById('timer').innerHTML = "Temps restant : " + secondes + " secondes";
    secondes--;
}

/**
 * Permet de gérer les musiques du Pendu
 */
function imageMusic() {

}

/**
 * Permet de gérer les images Animaux du Pendu
 */
function imageAnimaux() {

}

/**
 * Permet de gérer les images Informatique du Pendu
 */
function imageInformatique() {

}

/**
 * Permet de gérer les images Jeu du Pendu
 */
function imageJeux() {

}

/**
 * Permet de gérer les images Films du Pendu
 */
function imageFilms() {

}

/**
 * Permet de gérer les images Sports du Pendu
 */
function imageSports() {
    // Afficher les images Sports
    let nombreImageSports = document.getElementsByClassName('themesPendu');
    for (let i = 0; i < nombreImageSports.length; i++) {
        ajouterImageSports.push("images/themes/sports/sports" + i + ".gif");
        nombreImageSports[i].src = ajouterImageSports[i];
    }
    // Changer aléatoirement les images du Thème Sports
    let randomImageSports = Math.floor(Math.random() * ajouterImageSports.length);
    nombreImageSports[0].src = ajouterImageSports[randomImageSports];
}