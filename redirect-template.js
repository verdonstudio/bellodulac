// Fichier : redirect-template.js
//
// Modele des actions proposees par url-generator.html pour chaque reservation
// (a la fois pour le bloc "a coller dans redirect.js" et pour les QR codes).
// Source unique : pour ajouter/retirer une action partout dans le generateur,
// il suffit de modifier ce fichier, sans toucher au code de url-generator.html.
//
// Placeholders : {{reservation}} {{lang}} {{logement}} {{startdate}} {{enddate}}
// remplaces par url-generator.html au moment de la generation, a partir des
// champs du formulaire.
//
// Pourquoi {{...}} et pas %...% : plusieurs de ces URLs contiennent deja des
// caracteres percent-encodes en dur (ex. "%2C" pour une virgule dans
// "pos=43.82945%2C6.21921"). Un delimiteur "%variable%" pourrait entrer en
// collision avec ces sequences (notamment si deux %XX se retrouvent cote a
// cote, comme "%2C%2C" dans "cat=parking_gratuit%2Cparking_zonebleu%2C...").
// Les doubles accolades ne sont jamais utilisees ailleurs dans ces URLs, donc
// aucune ambiguite possible.
//
// Les actions "evenements", "map", "highlights" et "panorama" sont enrichies
// par url-generator.html avec les options du formulaire (evenements cochés,
// visites POI, bouton retour, zoom/position carte) : les valeurs ci-dessous
// servent de base/valeurs par defaut, ecrasees par le formulaire si renseigne.
// Les autres actions (today, parking, trash, baudinard, quinson, galetas,
// plage-bellodulac1/2, martel) sont des liens a usage unique vers un lieu ou
// un ecran precis : elles sont utilisees telles quelles, sans enrichissement.
window.REDIRECT_TEMPLATE = {
  "home": "home.html?res={{reservation}}&lang={{lang}}&logement={{logement}}",
  "map": "index.html?lang={{lang}}&logement={{logement}}&edatestart={{startdate}}&edateend={{enddate}}&zoom=13&pos=43.82945%2C6.21921",
  "evenements": "evenements.html?lang={{lang}}&logement={{logement}}&edatestart={{startdate}}&edateend={{enddate}}",
  "highlights": "highlights.html?lang={{lang}}&logement={{logement}}&edatestart={{startdate}}&edateend={{enddate}}&from=evenements&showevents=3stars&showpois=true",
  "panorama": "panorama.html?lang={{lang}}&logement={{logement}}&edatestart={{startdate}}&edateend={{enddate}}",
  "today": "highlights.html?lang={{lang}}&logement={{logement}}&edatestart={{startdate}}&edateend={{enddate}}&from=evenements&showevents=today&showpois=today",
  "parking": "index.html?logement={{logement}}&lang={{lang}}&edatestart={{startdate}}&edateend={{enddate}}&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1",
  "trash": "index.html?logement={{logement}}&lang={{lang}}&edatestart={{startdate}}&edateend={{enddate}}&zoom=16&pos=43.84536%2C6.2203&cat=ordures&fullscreen=1",
  "baudinard": "index.html?logement={{logement}}&lang={{lang}}&edatestart={{startdate}}&edateend={{enddate}}&zoom=13&pos=43.73917%2C6.08299&fullscreen=1&poi=aquattitude-montpezat",
  "quinson": "index.html?logement={{logement}}&lang={{lang}}&edatestart={{startdate}}&edateend={{enddate}}&zoom=16.5&pos=43.69367%2C6.04253&fullscreen=1&poi=canoe-quinson",
  "galetas": "index.html?logement={{logement}}&lang={{lang}}&edatestart={{startdate}}&edateend={{enddate}}&zoom=15.5&pos=43.80229%2C6.25044&poi=canoe-galetas-1",
  "plage-bellodulac1": "index.html?lang={{lang}}&logement={{logement}}&edatestart={{startdate}}&edateend={{enddate}}&zoom=17&pos=43.77194%2C6.20816&fullscreen=1&trace=plage-salles",
  "plage-bellodulac2": "index.html?lang={{lang}}&logement={{logement}}&edatestart={{startdate}}&edateend={{enddate}}&zoom=17&pos=43.77341%2C6.20707&fullscreen=1&trace=plage-margaridon",
  "martel": "index.html?lang={{lang}}&logement={{logement}}&edatestart={{startdate}}&edateend={{enddate}}&zoom=12&pos=43.77109%2C6.30169&poi=blanc-martel"
};

// Libelles affiches dans le generateur pour chaque action (fallback automatique
// sur le nom de la cle si une nouvelle action est ajoutee sans libelle ici).
window.REDIRECT_TEMPLATE_LABELS = {
  "home": "Accueil (résumé des 4 liens)",
  "evenements": "Évènements",
  "map": "Carte",
  "highlights": "Programme",
  "panorama": "Panorama 360°",
  "today": "Que faire aujourd'hui",
  "parking": "Parking",
  "trash": "Poubelles / tri",
  "baudinard": "Aquattitude (lac de Baudinard)",
  "quinson": "Canoë — Quinson",
  "galetas": "Canoë — Le Galetas",
  "plage-bellodulac1": "Plage Bell'O du Lac 1",
  "plage-bellodulac2": "Plage Bell'O du Lac 2",
  "martel": "Sentier Blanc-Martel"
};

// Support "flyer" a coller sur le mot de bienvenue : le QR code de l'action "home"
// est incruste automatiquement dans l'emplacement blanc prevu sur ce visuel, pour
// n'avoir plus qu'un seul PNG a telecharger par langue (voir url-generator.html,
// section "Flyer d'accueil"). "rect" = zone interieure au cadre blanc du visuel,
// en pixels reels du fichier image (mesuree une fois, ne bouge pas tant que le
// visuel n'est pas remplace).
// Pour ajouter la version FR : deposer l'image dans assets/flyer-template-fr.png
// et ajouter une entree "fr" ci-dessous (memes cles que "en").
window.FLYER_TEMPLATES = {
  en: {
    image: "assets/flyer-template-en.png",
    label: "English",
    rect: { x: 57, y: 327, width: 618, height: 620 }
  },
  fr: {
    image: "assets/flyer-template-fr.png",
    label: "Français",
    rect: { x: 57, y: 327, width: 618, height: 620 }
  }
};
