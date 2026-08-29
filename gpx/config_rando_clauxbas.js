window.PARCOURS_CONFIG = {
  // Titre et sous-titre bilingues
  title: {
    fr: "Tour du village par les Claux depuis la maison Bell'Étoile",
    en: "Village loop via Les Claux from the Bell'Étoile house",
    de: "Dorfrundgang über Les Claux ab dem Haus Bell'Étoile",
    nl: "Dorpsronde via Les Claux vanaf het huis Bell'Étoile"
  },
  subtitle: {
    fr: "Moustiers-Sainte-Marie, colline des Claux",
    en: "Moustiers-Sainte-Marie, Les Claux hill",
    de: "Moustiers-Sainte-Marie, Hügel Les Claux",
    nl: "Moustiers-Sainte-Marie, heuvel Les Claux"
  },

  // Le reste de ta config ne bouge pas...
  gpx: "data/parcours.gpx",
  basemap:  "voyager", // topo, voyager, osm, positron
  showStats: true,
  editMode: false,

  photos: [
    { src: "data/photos/28.jpg", lat: 43.850158, lng: 6.21882, caption: "Vue panoramique sur Moustiers-Sainte-Marie depuis les oliveraies des Claux" },
    { src: "data/photos/29.jpg", lat: 43.85008, lng: 6.214464, caption: "Panneau de randonnée vers Le Claux Bas" },
    { src: "data/photos/30.jpg", lat: 43.849237, lng: 6.21456, caption: "Un banc avec vue sur le village et les gorges" },
    { src: "data/photos/31.jpg", lat: 43.848471, lng: 6.214957, caption: "Le clocher et le village vus depuis la colline" }
  ],

  pois: [
    { lat: 43.847179, lng: 6.220829, logo: "images/bell-etoile-logo.png", badgeFr: "🏡 Votre séjour", badgeEn: "🏡 Your stay", titleFr: "Bell'Étoile", titleEn: "Bell'Étoile", descFr: "Moustiers-Sainte-Marie, Provence", descEn: "Moustiers-Sainte-Marie, Provence" },
    { lat: 43.772767, lng: 6.207962, logo: "images/bellodulac-logo.png", badgeFr: "🏡 Votre séjour", badgeEn: "🏡 Your stay", titleFr: "Bell'O du Lac", titleEn: "Bell'O du Lac", descFr: "Salles sur Verdon", descEn: "Salles sur Verdon" }
  ]


};
