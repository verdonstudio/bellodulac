/* ==========================================================================
   reservations.js — Fichier de correspondance "voyageur du jour", utilise par
   home.html (et tv.html) pour afficher "Bienvenue {Nom} !" quand la date du
   jour tombe dans le sejour d'un voyageur pour le logement affiche (Google TV
   notamment, qui n'a pas de code reservation dans son URL — juste
   ?logement=...&lang=...).

   Comment ajouter une reservation : ajoute une ligne dans le tableau ci-dessous
   (n'oublie pas la virgule a la fin de la ligne precedente). Aucune donnee
   sensible ici (juste prenom/nom + dates + code reservation), ce fichier est
   public comme les autres (logements.js, pois.js, evenements.js).

   Champs :
   - annonce : texte libre identifiant le logement (ex: "Bell'Étoile (Moustiers)",
     "Maison Bell'O 6P", "Maison Bell'O 8P"). Rapproche automatiquement par
     mots-cles (moustiers/etoile, salles/lac/bell'o + 6/8 personnes si precise).
     Pour un rapprochement garanti, on peut aussi ecrire directement l'id exact :
     "moustiers", "salles6" ou "salles8".
   - nom : prenom (+ nom si tu veux) du voyageur, affiche tel quel dans "Bienvenue".
   - voyageurs : nombre de voyageurs (informatif uniquement, n'est pas utilise pour
     le rapprochement du logement — c'est le texte de "annonce", ex "6P"/"8P", qui
     fait la difference entre les deux maisons des Salles-sur-Verdon).
   - arrivee / depart : au format "AAAA-MM-JJ" (recommande) ou "JJ/MM/AAAA".
     Bornes incluses (le jour du depart affiche encore le message de bienvenue).
   - code : le code de reservation de cette meme reservation dans redirect.js
     (cle de l'objet "reservations", ex "HMKZPX4TMA"). Sert a tv.html pour
     retrouver automatiquement les liens (carte, evenements, programme...) et la
     LANGUE de cette reservation, sans avoir a la re-saisir ici. Si absent ou si
     le code n'existe pas (encore) dans redirect.js, on retombe simplement sur
     les liens/langue par defaut.

   Si aucune reservation ne correspond a la date du jour + au logement, home.html
   et tv.html n'affichent RIEN de special : le comportement par defaut reste
   inchange.
   ========================================================================== */

window.RESERVATIONS = [
  { annonce: "Bell'Etoile (Moustiers)", nom: "Thomas Szulevicz",   voyageurs: 3, arrivee: "16/10/2026", depart: "19/10/2026", code: "HMFFSNS4BJ" },
  { annonce: "Bell'Etoile (Moustiers)", nom: "Michelle Bush",      voyageurs: 4, arrivee: "01/10/2026", depart: "04/10/2026", code: "HMAZKZK5XA" },
  { annonce: "Maison Bell'O 6P",        nom: "Julie Etienne",      voyageurs: 6, arrivee: "25/09/2026", depart: "27/09/2026", code: "HMDXYHZQZN" },
  { annonce: "Bell'Etoile (Moustiers)", nom: "Franziska Nonnast",  voyageurs: 2, arrivee: "10/09/2026", depart: "13/09/2026", code: "HM9FT3XCJQ" },
  { annonce: "Maison Bell'O 6P",        nom: "Marylène Lebas",     voyageurs: 3, arrivee: "08/09/2026", depart: "14/09/2026", code: "HMMBAKWMFD" },
  { annonce: "Bell'Etoile (Moustiers)", nom: "Anais Galisson",     voyageurs: 2, arrivee: "31/08/2026", depart: "05/09/2026", code: "HMYRZQWQNF" },
  { annonce: "Bell'Etoile (Moustiers)", nom: "Nathalie Gireaud",   voyageurs: 4, arrivee: "25/08/2026", depart: "28/08/2026", code: "HMB2JRYYN5" },
  { annonce: "Maison Bell'O 8P",        nom: "Sylvia Schneider",   voyageurs: 4, arrivee: "22/08/2026", depart: "29/08/2026", code: "HMKZPX4TMA" }
];
