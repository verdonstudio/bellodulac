window.PARCOURS_CONFIG = {
  // Titre et sous-titre bilingues
  title: {
    fr: "Randonnée familiale au bord du lac des Salles sur Verdon",
    en: "Family hike by the lake of the Salles sur Verdon"
  },
  subtitle: {
    fr: "Randonnée aux Salles sur Verdon",
    en: "Hiking in Les Salles sur Verdon"
  },
  
  // Le reste de ta config ne bouge pas...
  gpx: "data/parcours.gpx",
  basemap:  "voyager", // topo, voyager, osm, positron
  showStats: true,
  editMode: false,
  photos: [
    { src: "data/photos/rando-salles2.jpg", lat: 43.778837, lng: 6.208456 },
    { src: "data/photos/rando-salles3.jpg", lat: 43.787485, lng: 6.217661 },
    { src: "data/photos/rando-salles.jpg", lat: 43.780812, lng: 6.209056 }
  ],

  pois: [
    { lat: 43.847179, lng: 6.220829, logo: "images/bell-etoile-logo.png", badgeFr: "🏡 Votre séjour", badgeEn: "🏡 Your stay", titleFr: "Bell'Étoile", titleEn: "Bell'Étoile", descFr: "Moustiers-Sainte-Marie, Provence", descEn: "Moustiers-Sainte-Marie, Provence" },
    { lat: 43.772767, lng: 6.207962, logo: "images/bellodulac-logo.png", badgeFr: "🏡 Votre séjour", badgeEn: "🏡 Your stay", titleFr: "Bell'O du Lac", titleEn: "Bell'O du Lac", descFr: "Salles sur Verdon", descEn: "Salles sur Verdon" }
  ]
};


