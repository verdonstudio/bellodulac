/* ==========================================================================
   pois.js — Fichier de base de données des POIs
   - 'pano: [x%, y%]' et 'scale' gèrent le placement sur le panorama 360.
   - 'backintime: { ville: ["moustiers"], coords: [x%, y%] }' gère le placement par ville.
   - 'trace: { ... }' affiche un chemin piéton sur la carte 2D de l'accueil.
   - 'traceAutoShow: true' affiche ce chemin automatiquement a l'ouverture du
     popup du POI (sans passer par le bouton "🚶 Afficher le chemin").
   ========================================================================== */

window.POI_BASE_URL = "";

window.POI_CATEGORIES = {
  "golf": {
    "fr": "Mini-golf",
    "en": "Mini-golf",
    "de": "Minigolf",
    "nl": "Minigolf",
    "color": "#10B981",
    "emoji": "⛳"
  },
  "etoile": {
    "fr": "Etoile de Moustiers",
    "en": "Moustiers star",
    "de": "Stern von Moustiers",
    "nl": "Ster van Moustiers",
    "color": "#6D8171",
    "emoji": "⭐"
  },
  "coeur": {
    "fr": "Iles de Costebelle",
    "en": "Costebelle Island",
    "de": "Costebelle-Inseln",
    "nl": "Eilanden van Costebelle",
    "color": "#6D8171",
    "emoji": "💚"
  },
  "marché": {
    "fr": "Marché",
    "en": "Market",
    "de": "Markt",
    "nl": "Markt",
    "color": "#2CD859",
    "emoji": "🧺"
  },
  "visite": {
    "fr": "Visites & Panoramas",
    "en": "Visits & Panoramas",
    "de": "Besichtigungen & Panoramen",
    "nl": "Bezoeken & panorama's",
    "color": "#91618F",
    "emoji": "📸"
  },
  "plage": {
    "fr": "Plages & Lac",
    "en": "Beaches & Lake",
    "de": "Strände & See",
    "nl": "Stranden & meer",
    "color": "#36EFF8",
    "emoji": "🏖️"
  },
  "nature": {
    "fr": "Nature & Paysages",
    "en": "Nature & Landscapes",
    "de": "Natur & Landschaften",
    "nl": "Natuur & landschappen",
    "color": "#2CD859",
    "emoji": "🌳"
  },
  "rando": {
    "fr": "Randonnée",
    "en": "Hiking",
    "de": "Wandern",
    "nl": "Wandelen",
    "color": "#A77E19",
    "emoji": "🥾"
  },
  "equitation": {
    "fr": "Équitation",
    "en": "Horse Riding",
    "de": "Reiten",
    "nl": "Paardrijden",
    "color": "#2CD859",
    "emoji": "🐎"
  },
  "running": {
    "fr": "Running et Trail",
    "en": "Running & Trail",
    "de": "Laufen & Trail",
    "nl": "Hardlopen & trail",
    "color": "#A77E19",
    "emoji": "🏃‍♂️"
  },
  "sensations": {
    "fr": "Sensations",
    "en": "Sensational",
    "de": "Nervenkitzel",
    "nl": "Sensatie",
    "color": "#DA2AC5",
    "emoji": "⚡"
  },
  "sportaquatique": {
    "fr": "Sport aquatique",
    "en": "Water sport",
    "de": "Wassersport",
    "nl": "Watersport",
    "color": "#2563EB",
    "emoji": "⛵"
  },
  "velo": {
    "fr": "Vélo",
    "en": "Bike",
    "de": "Fahrrad",
    "nl": "Fiets",
    "color": "#A77E19",
    "emoji": "🚴"
  },
  "tennis": {
    "fr": "Tennis",
    "en": "Tennis",
    "de": "Tennis",
    "nl": "Tennis",
    "color": "#A77E19",
    "emoji": "🎾"
  },
  "petanque": {
    "fr": "Pétanque",
    "en": "Petanque",
    "de": "Pétanque",
    "nl": "Jeu de boules",
    "color": "#A77E19",
    "emoji": "🪩"
  },
  "commerce": {
    "fr": "Commerces",
    "en": "Shops",
    "de": "Geschäfte",
    "nl": "Winkels",
    "color": "#585858",
    "emoji": "🏪"
  },
  "station": {
    "fr": "Stations service",
    "en": "Gaz stations",
    "de": "Tankstellen",
    "nl": "Tankstations",
    "color": "#585858",
    "emoji": "⛽"
  },
  "laverie": {
    "fr": "Laverie automatique",
    "en": "Laundromat",
    "de": "Waschsalon",
    "nl": "Wasserette",
    "color": "#585858",
    "emoji": "👕"
  },
  "relais": {
    "fr": "Point relais",
    "en": "Pickup point",
    "de": "Paketstation",
    "nl": "Afhaalpunt",
    "color": "#585858",
    "emoji": "📦"
  },
  "ordures": {
    "fr": "Tri & ordures",
    "en": "Waste & recycling",
    "de": "Mülltrennung & Abfall",
    "nl": "Afvalscheiding & vuilnis",
    "color": "#3F8F4F",
    "emoji": "♻️"
  },
  "parking_gratuit": {
    "fr": "Parking gratuit",
    "en": "Free parking",
    "de": "Kostenloses Parken",
    "nl": "Gratis parkeren",
    "color": "#10B981",
    "emoji": "🅿️"
  },
  "parking_zonebleu": {
    "fr": "Durée limitée",
    "en": "Limited duration",
    "de": "Zeitlich begrenzt",
    "nl": "Beperkte duur",
    "color": "#549DF1",
    "emoji": "🅿️"
  },
  "parking_payant": {
    "fr": "Parking payant",
    "en": "Paid parking",
    "de": "Kostenpflichtiges Parken",
    "nl": "Betaald parkeren",
    "color": "#EF4444",
    "emoji": "🅿️"
  },
  "logement": {
    "fr": "Logement",
    "en": "Accommodation",
    "de": "Unterkunft",
    "nl": "Accommodatie",
    "color": "#EA0000",
    "emoji": "🏡"
  },
  "toponyme": {
    "fr": "Lieu-dit",
    "en": "Place name",
    "de": "Ortsname",
    "nl": "Plaatsnaam",
    "color": "#0284c7",
    "emoji": "🏷️"
  },
  "restaurant": {
    "fr": "Restauration",
    "en": "Restaurants",
    "de": "Restaurants",
    "nl": "Restaurants",
    "color": "#FF9F1C",
    "emoji": "🍽️"
  },
  "pharmacie": {
    "fr": "Pharmacie",
    "en": "Pharmacy",
    "de": "Apotheke",
    "nl": "Apotheek",
    "color": "#10B981",
    "emoji": "⚕️"
  }
};

window.POI_STAR_LABELS = {
  "1": {
    "fr": "Autre",
    "en": "Other",
    "de": "Sonstiges",
    "nl": "Overig"
  },
  "2": {
    "fr": "A voir",
    "en": "Worth a visit",
    "de": "Sehenswert",
    "nl": "De moeite waard"
  },
  "3": {
    "fr": "Nos préférés",
    "en": "Our preferences",
    "de": "Unsere Favoriten",
    "nl": "Onze favorieten"
  }
};

window.POIS = [
  {
    "id": "aperitif-ferme-roumoules",
    "cat": "restaurant",
    "coords": [
      43.804997,
      6.138114
    ],
    "stars": 2,
    "img": "https://static.apidae-tourisme.com/filestore/objets-touristiques/images/153/45/29765017.jpg",
    "fr": {
      "name": "Soirée apéritif à la ferme",
      "desc": "Profitez d'une soirée conviviale avec un apéritif de produits locaux. Au programme : visite guidée, nourrissage des animaux, rencontre avec les daims et échanges chaleureux sur la vie paysanne.",
      "url": "https://provence-alpes-cotedazur.com/que-faire/sortir/toutes-les-sorties/soiree-aperitif-a-la-ferme-roumoules-fr-6660076/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Aperitif evening at the farm",
      "desc": "Enjoy a friendly evening with a local aperitif. The program includes a guided tour, feeding the animals, meeting the deer, and warm discussions about farm life.",
      "url": "https://provence-alpes-cotedazur.com/que-faire/sortir/toutes-les-sorties/soiree-aperitif-a-la-ferme-roumoules-fr-6660076/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Aperitif-Abend auf dem Bauernhof",
      "desc": "Genießen Sie einen geselligen Abend mit einem Aperitif aus lokalen Produkten. Auf dem Programm stehen eine geführte Besichtigung, die Fütterung der Tiere, eine Begegnung mit den Damhirschen und herzliche Gespräche über das Landleben.",
      "url": "https://provence-alpes-cotedazur.com/que-faire/sortir/toutes-les-sorties/soiree-aperitif-a-la-ferme-roumoules-fr-6660076/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Aperitiefavond op de boerderij",
      "desc": "Geniet van een gezellige avond met een aperitief van lokale producten. Op het programma staan een rondleiding, het voeren van de dieren, een ontmoeting met de damherten en warme gesprekken over het boerenleven.",
      "url": "https://provence-alpes-cotedazur.com/que-faire/sortir/toutes-les-sorties/soiree-aperitif-a-la-ferme-roumoules-fr-6660076/",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      25.475,
      45.802
    ],
    "scale": 0.9
  },
  {
    "id": "minigolf-verdon-salles",
    "cat": "golf",
    "coords": [
      43.77538,
      6.21202
    ],
    "stars": 2,
    "img": "https://www.tourinprovence.fr/synchACVS/ressources/images/APIDAE/mini/6908_1_2.jpg",
    "fr": {
      "name": "Mini Golf du Verdon",
      "desc": "Parcours de mini-golf de 16 trous ombragé à l'entrée des Salles-sur-Verdon. Idéal pour une activité ludique en famille ou entre amis à deux pas du lac de Sainte-Croix.",
      "links": [
        {
          "url": "https://provence-alpes-cotedazur.com/que-faire/detente-et-loisirs/toutes-les-activites-detente-et-loisirs/mini-golf-du-verdon-les-salles-sur-verdon-fr-6609161",
          "label": "Plus d'informations ℹ️"
        },
        {
          "url": "https://www.tripadvisor.fr/ShowUserReviews-g1761554-d34515927-r1067936881-Mini_Golf_du_Verdon-Les_Salles_sur_Verdon_Var_Provence_Alpes_Cote_d_Azur.html",
          "label": "Avis TripAdvisor 💬"
        }
      ]
    },
    "en": {
      "name": "Verdon Mini Golf",
      "desc": "Shaded 16-hole mini-golf course located at the entrance of Les Salles-sur-Verdon. A fun activity for families and friends near Lake Sainte-Croix.",
      "links": [
        {
          "url": "https://provence-alpes-cotedazur.com/que-faire/detente-et-loisirs/toutes-les-activites-detente-et-loisirs/mini-golf-du-verdon-les-salles-sur-verdon-fr-6609161",
          "label": "More details ℹ️"
        },
        {
          "url": "https://www.tripadvisor.fr/ShowUserReviews-g1761554-d34515927-r1067936881-Mini_Golf_du_Verdon-Les_Salles_sur_Verdon_Var_Provence_Alpes_Cote_d_Azur.html",
          "label": "TripAdvisor Reviews 💬"
        }
      ]
    },
    "de": {
      "name": "Verdon Minigolf",
      "desc": "Schattiger Minigolfplatz mit 16 Bahnen am Ortseingang von Les Salles-sur-Verdon. Eine unterhaltsame Aktivität für die ganze Familie oder mit Freunden, ganz in der Nähe des Lac de Sainte-Croix.",
      "links": [
        {
          "url": "https://provence-alpes-cotedazur.com/que-faire/detente-et-loisirs/toutes-les-activites-detente-et-loisirs/mini-golf-du-verdon-les-salles-sur-verdon-fr-6609161",
          "label": "Weitere Informationen ℹ️"
        },
        {
          "url": "https://www.tripadvisor.fr/ShowUserReviews-g1761554-d34515927-r1067936881-Mini_Golf_du_Verdon-Les_Salles_sur_Verdon_Var_Provence_Alpes_Cote_d_Azur.html",
          "label": "TripAdvisor-Bewertungen 💬"
        }
      ]
    },
    "nl": {
      "name": "Verdon Minigolf",
      "desc": "Beschaduwde minigolfbaan met 16 holes bij de ingang van Les Salles-sur-Verdon. Een leuke activiteit voor het hele gezin of met vrienden, vlakbij het Meer van Sainte-Croix.",
      "links": [
        {
          "url": "https://provence-alpes-cotedazur.com/que-faire/detente-et-loisirs/toutes-les-activites-detente-et-loisirs/mini-golf-du-verdon-les-salles-sur-verdon-fr-6609161",
          "label": "Meer informatie ℹ️"
        },
        {
          "url": "https://www.tripadvisor.fr/ShowUserReviews-g1761554-d34515927-r1067936881-Mini_Golf_du_Verdon-Les_Salles_sur_Verdon_Var_Provence_Alpes_Cote_d_Azur.html",
          "label": "TripAdvisor-beoordelingen 💬"
        }
      ]
    },
    "pano": [
      21,
      58
    ],
    "scale": 1.3,
    "trace": {
      "logements": [
        "salles6",
        "salles8"
      ],
      "coords": [
        [
          43.77269,
          6.20827
        ],
        [
          43.77275,
          6.20832
        ],
        [
          43.77301,
          6.20835
        ],
        [
          43.77311,
          6.20844
        ],
        [
          43.77325,
          6.20856
        ],
        [
          43.77332,
          6.20862
        ],
        [
          43.77323,
          6.20882
        ],
        [
          43.77315,
          6.20901
        ],
        [
          43.77323,
          6.20907
        ],
        [
          43.77325,
          6.20909
        ],
        [
          43.77316,
          6.20931
        ],
        [
          43.77323,
          6.20942
        ],
        [
          43.77321,
          6.20947
        ],
        [
          43.7732,
          6.20951
        ],
        [
          43.77335,
          6.20963
        ],
        [
          43.77373,
          6.2099
        ],
        [
          43.77377,
          6.20993
        ],
        [
          43.77385,
          6.21
        ],
        [
          43.77396,
          6.21011
        ],
        [
          43.77408,
          6.21026
        ],
        [
          43.77412,
          6.21031
        ],
        [
          43.77425,
          6.21056
        ],
        [
          43.77428,
          6.21061
        ],
        [
          43.77434,
          6.21074
        ],
        [
          43.77437,
          6.21086
        ],
        [
          43.77441,
          6.21099
        ],
        [
          43.77443,
          6.2111
        ],
        [
          43.77444,
          6.21118
        ],
        [
          43.77446,
          6.21126
        ],
        [
          43.77447,
          6.21133
        ],
        [
          43.7745,
          6.21149
        ],
        [
          43.77454,
          6.21163
        ],
        [
          43.77459,
          6.21173
        ],
        [
          43.77465,
          6.2118
        ],
        [
          43.77472,
          6.21188
        ],
        [
          43.7748,
          6.21193
        ],
        [
          43.77487,
          6.21197
        ],
        [
          43.77506,
          6.21206
        ],
        [
          43.77517,
          6.21211
        ],
        [
          43.77524,
          6.21213
        ],
        [
          43.77526,
          6.21214
        ],
        [
          43.77534,
          6.21218
        ]
      ]
    }
  },
  {
    "id": "pharmacie-moustiers",
    "cat": "pharmacie",
    "coords": [
      43.845321,
      6.221209
    ],
    "stars": 1,
    "img": "https://www.orphie-provence.com/IMG/jpg/pharmacie_du_verdon2.jpg",
    "fr": {
      "name": "Pharmacie du Verdon",
      "desc": "Pharmacie située sur l'Avenue de Lérins à Moustiers-Sainte-Marie. Tél : 04 92 74 60 61. Médecin de garde : 116 117. Urgences : 15 ou 112.",
      "links": [
        {
          "url": "https://www.orphie-provence.com/Pharmacie-du-Verdon",
          "label": "Plus d'informations ℹ️"
        },
        {
          "url": "https://www.doctolib.fr/search?keyword=medecin-generaliste",
          "label": "Prendre RDV avec un médecin 📅"
        }
      ]
    },
    "en": {
      "name": "Pharmacie du Verdon",
      "desc": "Pharmacy located on Avenue de Lérins in Moustiers-Sainte-Marie. Tel: 04 92 74 60 61. On-call doctor: 116 117. Emergencies: 15 or 112.",
      "links": [
        {
          "url": "https://www.orphie-provence.com/Pharmacie-du-Verdon",
          "label": "More details ℹ️"
        },
        {
          "url": "https://www.doctolib.fr/search?keyword=medecin-generaliste",
          "label": "Book an appointment with a doctor 📅"
        }
      ]
    },
    "de": {
      "name": "Pharmacie du Verdon",
      "desc": "Apotheke in der Avenue de Lérins in Moustiers-Sainte-Marie. Tel.: 04 92 74 60 61. Bereitschaftsarzt: 116 117. Notruf: 15 oder 112.",
      "links": [
        {
          "url": "https://www.orphie-provence.com/Pharmacie-du-Verdon",
          "label": "Weitere Informationen ℹ️"
        },
        {
          "url": "https://www.doctolib.fr/search?keyword=medecin-generaliste",
          "label": "Termin bei einem Arzt vereinbaren 📅"
        }
      ]
    },
    "nl": {
      "name": "Pharmacie du Verdon",
      "desc": "Apotheek aan de Avenue de Lérins in Moustiers-Sainte-Marie. Tel: 04 92 74 60 61. Dienstdoende arts: 116 117. Noodgevallen: 15 of 112.",
      "links": [
        {
          "url": "https://www.orphie-provence.com/Pharmacie-du-Verdon",
          "label": "Meer informatie ℹ️"
        },
        {
          "url": "https://www.doctolib.fr/search?keyword=medecin-generaliste",
          "label": "Afspraak maken met een arts 📅"
        }
      ]
    },
    "trace": {
      "logements": [
        "moustiers"
      ],
      "coords": [
        [
          43.84717,
          6.22067
        ],
        [
          43.84714,
          6.22075
        ],
        [
          43.84713,
          6.22081
        ],
        [
          43.84714,
          6.22095
        ],
        [
          43.84714,
          6.22102
        ],
        [
          43.84713,
          6.22109
        ],
        [
          43.84708,
          6.22129
        ],
        [
          43.84702,
          6.22141
        ],
        [
          43.847,
          6.22143
        ],
        [
          43.84698,
          6.22145
        ],
        [
          43.84697,
          6.22147
        ],
        [
          43.84684,
          6.22159
        ],
        [
          43.8468,
          6.22162
        ],
        [
          43.84677,
          6.22162
        ],
        [
          43.8467,
          6.22159
        ],
        [
          43.84662,
          6.22154
        ],
        [
          43.84651,
          6.22144
        ],
        [
          43.84638,
          6.22136
        ],
        [
          43.84628,
          6.22132
        ],
        [
          43.84619,
          6.22134
        ],
        [
          43.84614,
          6.22136
        ],
        [
          43.84613,
          6.22137
        ],
        [
          43.84608,
          6.22137
        ],
        [
          43.84603,
          6.22136
        ],
        [
          43.84594,
          6.22131
        ],
        [
          43.84583,
          6.22125
        ],
        [
          43.84576,
          6.22122
        ],
        [
          43.84563,
          6.22121
        ],
        [
          43.84547,
          6.2212
        ],
        [
          43.84532,
          6.22121
        ]
      ]
    }
  },
  {
    "id": "trottinette-salles",
    "cat": "sensations",
    "coords": [
      43.7734,
      6.20466
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/trottinverdon_salles.jpg",
    "fr": {
      "name": "Trottinette électrique tout-terrain",
      "desc": "Balade guidée en trott'élec tout-terrain autour du lac de Sainte-Croix, au départ de la base nautique des Salles-sur-Verdon. Deux parcours : « Autour du Lac » (2h, dès 12 ans, 50€) ou « Sur les hauteurs du Lac » avec apéro au coucher de soleil (dès 14 ans, 70€).",
      "links": [
        {
          "url": "https://trottinverdon.com/parcours-des-salles-sur-verdon/",
          "label": "En savoir plus 🛴"
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Di_t3fQhWf5c",
          "label": "Voir la vidéo ▶️"
        }
      ]
    },
    "en": {
      "name": "Off-road electric scooter tour",
      "desc": "Guided off-road electric scooter ride around Lake Sainte-Croix, departing from the Les Salles-sur-Verdon water sports base. Two routes: \"Around the Lake\" (2h, from age 12, €50) or \"Above the Lake\" with sunset drinks (from age 14, €70).",
      "links": [
        {
          "url": "https://trottinverdon.com/parcours-des-salles-sur-verdon/",
          "label": "Learn more 🛴"
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Di_t3fQhWf5c",
          "label": "Watch video ▶️"
        }
      ]
    },
    "de": {
      "name": "Geländegängige Elektro-Trottinett-Tour",
      "desc": "Geführte Geländetour mit dem E-Scooter rund um den Lac de Sainte-Croix, Start am Wassersportzentrum von Les Salles-sur-Verdon. Zwei Strecken: „Rund um den See“ (2 Std., ab 12 Jahren, 50 €) oder „Über dem See“ mit Aperitif bei Sonnenuntergang (ab 14 Jahren, 70 €).",
      "links": [
        {
          "url": "https://trottinverdon.com/parcours-des-salles-sur-verdon/",
          "label": "Mehr erfahren 🛴"
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Di_t3fQhWf5c",
          "label": "Video ansehen ▶️"
        }
      ]
    },
    "nl": {
      "name": "Off-road tocht met de elektrische step",
      "desc": "Begeleide off-road tocht met de elektrische step rond het Meer van Sainte-Croix, vertrek vanaf de watersportbasis van Les Salles-sur-Verdon. Twee routes: \"Rond het meer\" (2 uur, vanaf 12 jaar, € 50) of \"Boven het meer\" met een drankje bij zonsondergang (vanaf 14 jaar, € 70).",
      "links": [
        {
          "url": "https://trottinverdon.com/parcours-des-salles-sur-verdon/",
          "label": "Meer informatie 🛴"
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Di_t3fQhWf5c",
          "label": "Bekijk de video ▶️"
        }
      ]
    },
    "pano": [
      21.065,
      55.579
    ],
    "scale": 1.3
  },
  {
    "id": "parking-lerins-gratuit",
    "cat": "parking_gratuit",
    "coords": [
      43.84545,
      6.2212
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/parking-lerins-gratuit.jpg",
    "fr": {
      "name": "Avenue de Lérins",
      "desc": "Parking gratuit (30 places). Quelques places le long de l'avenue en redescendant jusqu'à la pharmacie.",
      "url": "https://www.google.com/maps/@43.8453212,6.2212093,3a,75y,236.88h,94.65t/data=!3m7!1e1!3m5!1sc2kIprlzPuefDQ0jXZICaw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-4.65257664656275%26panoid%3Dc2kIprlzPuefDQ0jXZICaw%26yaw%3D236.87653873400427!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Y aller"
    },
    "en": {
      "name": "Avenue de Lérins",
      "desc": "Free parking (30 places). A few spaces along the avenue, going down to the pharmacy.",
      "url": "https://www.google.com/maps/@43.8453212,6.2212093,3a,75y,236.88h,94.65t/data=!3m7!1e1!3m5!1sc2kIprlzPuefDQ0jXZICaw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-4.65257664656275%26panoid%3Dc2kIprlzPuefDQ0jXZICaw%26yaw%3D236.87653873400427!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Directions"
    },
    "de": {
      "name": "Avenue de Lérins",
      "desc": "Kostenloser Parkplatz (30 Plätze). Einige Plätze entlang der Allee, bergab bis zur Apotheke.",
      "url": "https://www.google.com/maps/@43.8453212,6.2212093,3a,75y,236.88h,94.65t/data=!3m7!1e1!3m5!1sc2kIprlzPuefDQ0jXZICaw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-4.65257664656275%26panoid%3Dc2kIprlzPuefDQ0jXZICaw%26yaw%3D236.87653873400427!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Anfahrt"
    },
    "nl": {
      "name": "Avenue de Lérins",
      "desc": "Gratis parkeren (30 plaatsen). Enkele plaatsen langs de laan, richting de apotheek.",
      "url": "https://www.google.com/maps/@43.8453212,6.2212093,3a,75y,236.88h,94.65t/data=!3m7!1e1!3m5!1sc2kIprlzPuefDQ0jXZICaw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-4.65257664656275%26panoid%3Dc2kIprlzPuefDQ0jXZICaw%26yaw%3D236.87653873400427!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Route"
    },
    "trace": {
      "logements": [
        "moustiers"
      ],
      "coords": [
        [
          43.84714,
          6.22078
        ],
        [
          43.84714,
          6.22101
        ],
        [
          43.84708,
          6.22129
        ],
        [
          43.84699,
          6.22144
        ],
        [
          43.84684,
          6.2216
        ],
        [
          43.84676,
          6.22162
        ],
        [
          43.84668,
          6.22158
        ],
        [
          43.84661,
          6.22154
        ],
        [
          43.84651,
          6.22144
        ],
        [
          43.84637,
          6.22135
        ],
        [
          43.84628,
          6.22132
        ],
        [
          43.84618,
          6.22134
        ],
        [
          43.8461,
          6.22138
        ],
        [
          43.84598,
          6.22134
        ],
        [
          43.84584,
          6.22126
        ],
        [
          43.84576,
          6.22122
        ],
        [
          43.84562,
          6.22121
        ],
        [
          43.84545,
          6.2212
        ]
      ]
    }
  },
  {
    "id": "parking-maire-gratuit",
    "cat": "parking_gratuit",
    "coords": [
      43.84476869583345,
      6.218819618225098
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/parking_maire.jpg",
    "fr": {
      "name": "Parking de La Maïre",
      "desc": "Type : Parking gratuit. Situé au rond-point en bas de la route D952. Plus éloigné du village, idéal pour un covoiturage ou un départ de randonnée.",
      "url": "https://www.google.com/maps/place/Moustiers-Sainte-Marie/@43.8447189,6.2184867,3a,75y,0.62h,97.46t/data=!3m7!1e1!3m5!1scZZB-jOhPo-yIk4D-BE8Zg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-7.463770753353828%26panoid%3DcZZB-jOhPo-yIk4D-BE8Zg%26yaw%3D0.6238241531946755!7i16384!8i8192!4m10!1m2!2m1!1sParking+moustiers!3m6!1s0x12cbee0ced172943:0x80c849fc72df5ef2!8m2!3d43.8449437!4d6.2182351!15sChFQYXJraW5nIG1vdXN0aWVyc1oTIhFwYXJraW5nIG1vdXN0aWVyc5IBC3BhcmtpbmdfbG90mgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVU5JTjFwVGExcFJFQUXgAQD6AQQIABBM!16s%2Fg%2F11hbg9x6w7?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Y aller"
    },
    "en": {
      "name": "La Maïre Parking",
      "desc": "Type: Free parking. Located at the roundabout at the bottom of the D952 road. Further from the village, ideal for carpooling or hiking.",
      "url": "https://www.google.com/maps/place/Moustiers-Sainte-Marie/@43.8447189,6.2184867,3a,75y,0.62h,97.46t/data=!3m7!1e1!3m5!1scZZB-jOhPo-yIk4D-BE8Zg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-7.463770753353828%26panoid%3DcZZB-jOhPo-yIk4D-BE8Zg%26yaw%3D0.6238241531946755!7i16384!8i8192!4m10!1m2!2m1!1sParking+moustiers!3m6!1s0x12cbee0ced172943:0x80c849fc72df5ef2!8m2!3d43.8449437!4d6.2182351!15sChFQYXJraW5nIG1vdXN0aWVyc1oTIhFwYXJraW5nIG1vdXN0aWVyc5IBC3BhcmtpbmdfbG90mgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVU5JTjFwVGExcFJFQUXgAQD6AQQIABBM!16s%2Fg%2F11hbg9x6w7?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Directions"
    },
    "de": {
      "name": "Parkplatz La Maïre",
      "desc": "Typ: Kostenloser Parkplatz. Am Kreisverkehr am Ende der D952 gelegen. Etwas außerhalb des Dorfes, ideal für Fahrgemeinschaften oder als Ausgangspunkt für Wanderungen.",
      "url": "https://www.google.com/maps/place/Moustiers-Sainte-Marie/@43.8447189,6.2184867,3a,75y,0.62h,97.46t/data=!3m7!1e1!3m5!1scZZB-jOhPo-yIk4D-BE8Zg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-7.463770753353828%26panoid%3DcZZB-jOhPo-yIk4D-BE8Zg%26yaw%3D0.6238241531946755!7i16384!8i8192!4m10!1m2!2m1!1sParking+moustiers!3m6!1s0x12cbee0ced172943:0x80c849fc72df5ef2!8m2!3d43.8449437!4d6.2182351!15sChFQYXJraW5nIG1vdXN0aWVyc1oTIhFwYXJraW5nIG1vdXN0aWVyc5IBC3BhcmtpbmdfbG90mgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVU5JTjFwVGExcFJFQUXgAQD6AQQIABBM!16s%2Fg%2F11hbg9x6w7?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Anfahrt"
    },
    "nl": {
      "name": "Parkeerplaats La Maïre",
      "desc": "Type: Gratis parkeren. Gelegen bij de rotonde aan het einde van de D952. Verder van het dorp, ideaal om te carpoolen of als vertrekpunt voor wandelingen.",
      "url": "https://www.google.com/maps/place/Moustiers-Sainte-Marie/@43.8447189,6.2184867,3a,75y,0.62h,97.46t/data=!3m7!1e1!3m5!1scZZB-jOhPo-yIk4D-BE8Zg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-7.463770753353828%26panoid%3DcZZB-jOhPo-yIk4D-BE8Zg%26yaw%3D0.6238241531946755!7i16384!8i8192!4m10!1m2!2m1!1sParking+moustiers!3m6!1s0x12cbee0ced172943:0x80c849fc72df5ef2!8m2!3d43.8449437!4d6.2182351!15sChFQYXJraW5nIG1vdXN0aWVyc1oTIhFwYXJraW5nIG1vdXN0aWVyc5IBC3BhcmtpbmdfbG90mgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVU5JTjFwVGExcFJFQUXgAQD6AQQIABBM!16s%2Fg%2F11hbg9x6w7?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Route"
    },
    "trace": {
      "logements": [
        "moustiers"
      ],
      "coords": [
        [
          43.84714,
          6.22084
        ],
        [
          43.84714,
          6.22095
        ],
        [
          43.84714,
          6.22102
        ],
        [
          43.84713,
          6.22109
        ],
        [
          43.84708,
          6.22129
        ],
        [
          43.84702,
          6.22141
        ],
        [
          43.847,
          6.22143
        ],
        [
          43.84698,
          6.22145
        ],
        [
          43.84697,
          6.22147
        ],
        [
          43.84684,
          6.22159
        ],
        [
          43.8468,
          6.22162
        ],
        [
          43.84677,
          6.22162
        ],
        [
          43.8467,
          6.22159
        ],
        [
          43.84662,
          6.22154
        ],
        [
          43.84651,
          6.22144
        ],
        [
          43.84638,
          6.22136
        ],
        [
          43.84628,
          6.22132
        ],
        [
          43.84619,
          6.22134
        ],
        [
          43.84614,
          6.22136
        ],
        [
          43.84613,
          6.22137
        ],
        [
          43.84608,
          6.22137
        ],
        [
          43.84603,
          6.22136
        ],
        [
          43.84594,
          6.22131
        ],
        [
          43.84583,
          6.22125
        ],
        [
          43.84576,
          6.22122
        ],
        [
          43.84563,
          6.22121
        ],
        [
          43.84547,
          6.2212
        ],
        [
          43.84546,
          6.22116
        ],
        [
          43.84548,
          6.22111
        ],
        [
          43.84565,
          6.22113
        ],
        [
          43.84568,
          6.22109
        ],
        [
          43.84565,
          6.22105
        ],
        [
          43.8455,
          6.22102
        ],
        [
          43.84529,
          6.22095
        ],
        [
          43.84502,
          6.22087
        ],
        [
          43.84471,
          6.2207
        ],
        [
          43.84457,
          6.22063
        ],
        [
          43.84455,
          6.22062
        ],
        [
          43.84456,
          6.22055
        ],
        [
          43.84453,
          6.22015
        ],
        [
          43.84459,
          6.22008
        ],
        [
          43.84473,
          6.22005
        ],
        [
          43.84474,
          6.21973
        ],
        [
          43.84474,
          6.21963
        ],
        [
          43.84459,
          6.21953
        ],
        [
          43.84446,
          6.21944
        ],
        [
          43.84429,
          6.2194
        ],
        [
          43.84412,
          6.21938
        ],
        [
          43.84428,
          6.21923
        ],
        [
          43.84448,
          6.21904
        ],
        [
          43.84468,
          6.21873
        ]
      ]
    }
  },
  {
    "id": "parking-calade-tempesta",
    "cat": "parking_gratuit",
    "coords": [
      43.84451,
      6.22186
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/parking-calade-tempesta.png",
    "fr": {
      "name": "Parking Calade Tempesta",
      "desc": "Parking gratuit le long de la rue (53 places)",
      "url": "https://www.google.com/maps/@43.8442594,6.2219702,3a,75y,28.01h,102.09t/data=!3m7!1e1!3m5!1sXSUnrZ71xBL1fKhwU2yE6Q!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-12.092694173398286%26panoid%3DXSUnrZ71xBL1fKhwU2yE6Q%26yaw%3D28.014824410760696!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Y aller"
    },
    "en": {
      "name": "Calade Tempesta Parking",
      "desc": "Free parking along the road (53 places)",
      "url": "https://www.google.com/maps/@43.8442594,6.2219702,3a,75y,28.01h,102.09t/data=!3m7!1e1!3m5!1sXSUnrZ71xBL1fKhwU2yE6Q!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-12.092694173398286%26panoid%3DXSUnrZ71xBL1fKhwU2yE6Q%26yaw%3D28.014824410760696!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Directions"
    },
    "de": {
      "name": "Parkplatz Calade Tempesta",
      "desc": "Kostenloses Parken entlang der Straße (53 Plätze)",
      "url": "https://www.google.com/maps/@43.8442594,6.2219702,3a,75y,28.01h,102.09t/data=!3m7!1e1!3m5!1sXSUnrZ71xBL1fKhwU2yE6Q!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-12.092694173398286%26panoid%3DXSUnrZ71xBL1fKhwU2yE6Q%26yaw%3D28.014824410760696!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Anfahrt"
    },
    "nl": {
      "name": "Parkeerplaats Calade Tempesta",
      "desc": "Gratis parkeren langs de straat (53 plaatsen)",
      "url": "https://www.google.com/maps/@43.8442594,6.2219702,3a,75y,28.01h,102.09t/data=!3m7!1e1!3m5!1sXSUnrZ71xBL1fKhwU2yE6Q!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-12.092694173398286%26panoid%3DXSUnrZ71xBL1fKhwU2yE6Q%26yaw%3D28.014824410760696!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Route"
    },
    "trace": {
      "logements": [
        "moustiers"
      ],
      "coords": [
        [
          43.84713,
          6.22079
        ],
        [
          43.84713,
          6.22107
        ],
        [
          43.84706,
          6.22132
        ],
        [
          43.84693,
          6.2215
        ],
        [
          43.84679,
          6.22163
        ],
        [
          43.84669,
          6.22189
        ],
        [
          43.84661,
          6.22176
        ],
        [
          43.8465,
          6.22186
        ],
        [
          43.84645,
          6.22182
        ],
        [
          43.8464,
          6.2219
        ],
        [
          43.84626,
          6.22187
        ],
        [
          43.8462,
          6.22186
        ],
        [
          43.84609,
          6.22193
        ],
        [
          43.84598,
          6.22202
        ],
        [
          43.84594,
          6.22205
        ],
        [
          43.84585,
          6.22216
        ],
        [
          43.84575,
          6.22222
        ],
        [
          43.84567,
          6.22224
        ],
        [
          43.84556,
          6.22231
        ],
        [
          43.84555,
          6.22224
        ],
        [
          43.8455,
          6.2222
        ],
        [
          43.84547,
          6.22218
        ],
        [
          43.84545,
          6.22209
        ],
        [
          43.84538,
          6.22204
        ],
        [
          43.84516,
          6.22196
        ],
        [
          43.84501,
          6.22201
        ],
        [
          43.8448,
          6.22205
        ],
        [
          43.84476,
          6.22206
        ],
        [
          43.8448,
          6.222
        ],
        [
          43.84485,
          6.22194
        ],
        [
          43.84478,
          6.22188
        ],
        [
          43.84474,
          6.2219
        ],
        [
          43.84469,
          6.22186
        ],
        [
          43.84464,
          6.2219
        ],
        [
          43.84458,
          6.22186
        ],
        [
          43.84454,
          6.22185
        ],
        [
          43.84451,
          6.22186
        ]
      ]
    }
  },
  {
    "id": "parking-riez-gratuit1",
    "cat": "parking_gratuit",
    "coords": [
      43.84255895777156,
      6.2195668932092705
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/parking-riez-gratuit1.png",
    "fr": {
      "name": "Petit Parking Route de Riez",
      "desc": "Type : Parking gratuit. Quelques places le long de la route. À environ 15 min à pied du centre, il évite les embouteillages l'été. Navette petit train disponible en haute saison.",
      "url": "https://www.google.com/maps/@43.8425107,6.2198476,3a,75y,298.44h,95.95t/data=!3m7!1e1!3m5!1siEZ59wE1fYGlPS3dJZ7JOg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-5.950627119086306%26panoid%3DiEZ59wE1fYGlPS3dJZ7JOg%26yaw%3D298.44094239668993!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Y aller"
    },
    "en": {
      "name": "Route de Riez Car Park",
      "desc": "Type: Free parking. Some places along the road. About 15 min walk to the center. Tourist shuttle train available in peak season.",
      "url": "https://www.google.com/maps/@43.8425107,6.2198476,3a,75y,298.44h,95.95t/data=!3m7!1e1!3m5!1siEZ59wE1fYGlPS3dJZ7JOg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-5.950627119086306%26panoid%3DiEZ59wE1fYGlPS3dJZ7JOg%26yaw%3D298.44094239668993!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Directions"
    },
    "de": {
      "name": "Parkplatz Route de Riez",
      "desc": "Typ: Kostenloser Parkplatz. Einige Plätze entlang der Straße. Etwa 15 Gehminuten vom Zentrum entfernt, vermeidet die sommerlichen Staus. In der Hochsaison verkehrt ein kleiner Touristenzug.",
      "url": "https://www.google.com/maps/@43.8425107,6.2198476,3a,75y,298.44h,95.95t/data=!3m7!1e1!3m5!1siEZ59wE1fYGlPS3dJZ7JOg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-5.950627119086306%26panoid%3DiEZ59wE1fYGlPS3dJZ7JOg%26yaw%3D298.44094239668993!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Anfahrt"
    },
    "nl": {
      "name": "Parkeerplaats Route de Riez",
      "desc": "Type: Gratis parkeren. Enkele plaatsen langs de weg. Ongeveer 15 minuten lopen van het centrum, zo vermijdt u de zomerse drukte. In het hoogseizoen rijdt er een toeristentreintje.",
      "url": "https://www.google.com/maps/@43.8425107,6.2198476,3a,75y,298.44h,95.95t/data=!3m7!1e1!3m5!1siEZ59wE1fYGlPS3dJZ7JOg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-5.950627119086306%26panoid%3DiEZ59wE1fYGlPS3dJZ7JOg%26yaw%3D298.44094239668993!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Route"
    },
    "trace": {
      "logements": [
        "moustiers"
      ],
      "coords": [
        [
          43.84714,
          6.22084
        ],
        [
          43.84714,
          6.22095
        ],
        [
          43.84714,
          6.22102
        ],
        [
          43.84713,
          6.22109
        ],
        [
          43.84708,
          6.22129
        ],
        [
          43.84702,
          6.22141
        ],
        [
          43.847,
          6.22143
        ],
        [
          43.84698,
          6.22145
        ],
        [
          43.84697,
          6.22147
        ],
        [
          43.84684,
          6.22159
        ],
        [
          43.8468,
          6.22162
        ],
        [
          43.84677,
          6.22162
        ],
        [
          43.8467,
          6.22159
        ],
        [
          43.84662,
          6.22154
        ],
        [
          43.84651,
          6.22144
        ],
        [
          43.84638,
          6.22136
        ],
        [
          43.84628,
          6.22132
        ],
        [
          43.84619,
          6.22134
        ],
        [
          43.84614,
          6.22136
        ],
        [
          43.84613,
          6.22137
        ],
        [
          43.84608,
          6.22137
        ],
        [
          43.84603,
          6.22136
        ],
        [
          43.84594,
          6.22131
        ],
        [
          43.84583,
          6.22125
        ],
        [
          43.84576,
          6.22122
        ],
        [
          43.84563,
          6.22121
        ],
        [
          43.84547,
          6.2212
        ],
        [
          43.84546,
          6.22116
        ],
        [
          43.84548,
          6.22111
        ],
        [
          43.84565,
          6.22113
        ],
        [
          43.84568,
          6.22109
        ],
        [
          43.84565,
          6.22105
        ],
        [
          43.8455,
          6.22102
        ],
        [
          43.84529,
          6.22095
        ],
        [
          43.84502,
          6.22087
        ],
        [
          43.84471,
          6.2207
        ],
        [
          43.84457,
          6.22063
        ],
        [
          43.84455,
          6.22062
        ],
        [
          43.84445,
          6.22055
        ],
        [
          43.84437,
          6.22046
        ],
        [
          43.84429,
          6.22036
        ],
        [
          43.84393,
          6.22001
        ],
        [
          43.84384,
          6.21992
        ],
        [
          43.84371,
          6.21978
        ],
        [
          43.8436,
          6.21965
        ],
        [
          43.84359,
          6.21962
        ],
        [
          43.84358,
          6.21961
        ],
        [
          43.84353,
          6.21953
        ],
        [
          43.84351,
          6.21949
        ],
        [
          43.84344,
          6.21951
        ],
        [
          43.84338,
          6.21953
        ],
        [
          43.84323,
          6.21958
        ],
        [
          43.84292,
          6.21967
        ],
        [
          43.84266,
          6.21977
        ],
        [
          43.84251,
          6.21983
        ]
      ]
    }
  },
  {
    "id": "parking-riez-gratuit2",
    "cat": "parking_gratuit",
    "coords": [
      43.843540432939115,
      6.219373439174599
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/parking-riez-gratuit2.jpg",
    "fr": {
      "name": "Parking du stade",
      "desc": "Parking gratuit (3 places).Le long de la route. À environ 15 min à pied du centre, il évite les embouteillages l'été. Navette petit train disponible en haute saison.",
      "url": "https://www.google.com/maps/@43.8434926,6.2193708,3a,75y,302.99h,92.75t/data=!3m10!1e1!3m8!1s7DxtMIDXbHylCF_KmEWKgQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-2.748729741877014%26panoid%3D7DxtMIDXbHylCF_KmEWKgQ%26yaw%3D302.98623854638294!7i16384!8i8192!9m2!1b1!2i40?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Y aller"
    },
    "en": {
      "name": "Stadium Parking",
      "desc": "Free parking (3 places). Along the road. About 15 min walk to the center. Tourist shuttle train available in peak season.",
      "url": "https://www.google.com/maps/@43.8434926,6.2193708,3a,75y,302.99h,92.75t/data=!3m10!1e1!3m8!1s7DxtMIDXbHylCF_KmEWKgQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-2.748729741877014%26panoid%3D7DxtMIDXbHylCF_KmEWKgQ%26yaw%3D302.98623854638294!7i16384!8i8192!9m2!1b1!2i40?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Directions"
    },
    "de": {
      "name": "Parkplatz am Stadion",
      "desc": "Kostenloser Parkplatz (3 Plätze). Entlang der Straße. Etwa 15 Gehminuten vom Zentrum entfernt, vermeidet die sommerlichen Staus. In der Hochsaison verkehrt ein kleiner Touristenzug.",
      "url": "https://www.google.com/maps/@43.8434926,6.2193708,3a,75y,302.99h,92.75t/data=!3m10!1e1!3m8!1s7DxtMIDXbHylCF_KmEWKgQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-2.748729741877014%26panoid%3D7DxtMIDXbHylCF_KmEWKgQ%26yaw%3D302.98623854638294!7i16384!8i8192!9m2!1b1!2i40?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Anfahrt"
    },
    "nl": {
      "name": "Parkeerplaats bij het stadion",
      "desc": "Gratis parkeren (3 plaatsen). Langs de weg. Ongeveer 15 minuten lopen van het centrum, zo vermijdt u de zomerse drukte. In het hoogseizoen rijdt er een toeristentreintje.",
      "url": "https://www.google.com/maps/@43.8434926,6.2193708,3a,75y,302.99h,92.75t/data=!3m10!1e1!3m8!1s7DxtMIDXbHylCF_KmEWKgQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-2.748729741877014%26panoid%3D7DxtMIDXbHylCF_KmEWKgQ%26yaw%3D302.98623854638294!7i16384!8i8192!9m2!1b1!2i40?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Route"
    },
    "trace": {
      "logements": [
        "moustiers"
      ],
      "coords": [
        [
          43.84714,
          6.22084
        ],
        [
          43.84714,
          6.22095
        ],
        [
          43.84714,
          6.22102
        ],
        [
          43.84713,
          6.22109
        ],
        [
          43.84708,
          6.22129
        ],
        [
          43.84702,
          6.22141
        ],
        [
          43.847,
          6.22143
        ],
        [
          43.84698,
          6.22145
        ],
        [
          43.84697,
          6.22147
        ],
        [
          43.84684,
          6.22159
        ],
        [
          43.8468,
          6.22162
        ],
        [
          43.84677,
          6.22162
        ],
        [
          43.8467,
          6.22159
        ],
        [
          43.84662,
          6.22154
        ],
        [
          43.84651,
          6.22144
        ],
        [
          43.84638,
          6.22136
        ],
        [
          43.84628,
          6.22132
        ],
        [
          43.84619,
          6.22134
        ],
        [
          43.84614,
          6.22136
        ],
        [
          43.84613,
          6.22137
        ],
        [
          43.84608,
          6.22137
        ],
        [
          43.84603,
          6.22136
        ],
        [
          43.84594,
          6.22131
        ],
        [
          43.84583,
          6.22125
        ],
        [
          43.84576,
          6.22122
        ],
        [
          43.84563,
          6.22121
        ],
        [
          43.84547,
          6.2212
        ],
        [
          43.84546,
          6.22116
        ],
        [
          43.84548,
          6.22111
        ],
        [
          43.84565,
          6.22113
        ],
        [
          43.84568,
          6.22109
        ],
        [
          43.84565,
          6.22105
        ],
        [
          43.8455,
          6.22102
        ],
        [
          43.84529,
          6.22095
        ],
        [
          43.84502,
          6.22087
        ],
        [
          43.84471,
          6.2207
        ],
        [
          43.84457,
          6.22063
        ],
        [
          43.84455,
          6.22062
        ],
        [
          43.84445,
          6.22055
        ],
        [
          43.84437,
          6.22046
        ],
        [
          43.84429,
          6.22036
        ],
        [
          43.84393,
          6.22001
        ],
        [
          43.84384,
          6.21992
        ],
        [
          43.84371,
          6.21978
        ],
        [
          43.8436,
          6.21965
        ],
        [
          43.84359,
          6.21962
        ],
        [
          43.84358,
          6.21961
        ],
        [
          43.84353,
          6.21953
        ],
        [
          43.84351,
          6.21949
        ],
        [
          43.84349,
          6.21945
        ],
        [
          43.84347,
          6.21938
        ]
      ]
    }
  },
  {
    "id": "parking-3places",
    "cat": "parking_gratuit",
    "coords": [
      43.847453183159445,
      6.220455765724182
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/parking_3places.jpg",
    "fr": {
      "name": "Parking 3 places",
      "desc": "Type : Parking gratuit.Le long de la route. Seulement 3 places à proximité immédiate du logement.",
      "url": "https://www.google.com/maps/@43.847518,6.2204303,3a,90y,225.05h,99.17t/data=!3m10!1e1!3m8!1srLxknkZ4qjXKg09gagqUvw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-9.173335441444806%26panoid%3DrLxknkZ4qjXKg09gagqUvw%26yaw%3D225.0466952080189!7i16384!8i8192!9m2!1b1!2i31?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Y aller"
    },
    "en": {
      "name": "3 places parking",
      "desc": "Type : Free parking.Along the road. Only 3 places in the immediate vicinity of the accommodation.",
      "url": "https://www.google.com/maps/@43.847518,6.2204303,3a,90y,225.05h,99.17t/data=!3m10!1e1!3m8!1srLxknkZ4qjXKg09gagqUvw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-9.173335441444806%26panoid%3DrLxknkZ4qjXKg09gagqUvw%26yaw%3D225.0466952080189!7i16384!8i8192!9m2!1b1!2i31?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Directions"
    },
    "de": {
      "name": "Parkplatz mit 3 Plätzen",
      "desc": "Typ: Kostenloser Parkplatz. Entlang der Straße. Nur 3 Plätze in unmittelbarer Nähe der Unterkunft.",
      "url": "https://www.google.com/maps/@43.847518,6.2204303,3a,90y,225.05h,99.17t/data=!3m10!1e1!3m8!1srLxknkZ4qjXKg09gagqUvw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-9.173335441444806%26panoid%3DrLxknkZ4qjXKg09gagqUvw%26yaw%3D225.0466952080189!7i16384!8i8192!9m2!1b1!2i31?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Anfahrt"
    },
    "nl": {
      "name": "Parkeerplaats met 3 plekken",
      "desc": "Type: Gratis parkeren. Langs de weg. Slechts 3 plekken vlak bij de accommodatie.",
      "url": "https://www.google.com/maps/@43.847518,6.2204303,3a,90y,225.05h,99.17t/data=!3m10!1e1!3m8!1srLxknkZ4qjXKg09gagqUvw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-9.173335441444806%26panoid%3DrLxknkZ4qjXKg09gagqUvw%26yaw%3D225.0466952080189!7i16384!8i8192!9m2!1b1!2i31?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Route"
    },
    "trace": {
      "logements": [
        "moustiers"
      ],
      "coords": [
        [
          43.84714,
          6.22078
        ],
        [
          43.84714,
          6.22073
        ],
        [
          43.84722,
          6.22059
        ],
        [
          43.8473,
          6.22052
        ],
        [
          43.84737,
          6.22048
        ],
        [
          43.84745,
          6.22045
        ]
      ]
    }
  },
  {
    "id": "parking-lerins-zonebleu",
    "cat": "parking_zonebleu",
    "coords": [
      43.84584763148919,
      6.221252381801606
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/parking-lerins-zonebleu.png",
    "fr": {
      "name": "Avenue de Lérins",
      "desc": "Type : Parking gratuit limité à 1H. Quelques places le long de l'avenue, juste après les emplacements réservés au petit train.",
      "url": "https://www.google.com/maps/@43.8457994,6.2212576,3a,75y,239.45h,97.25t/data=!3m7!1e1!3m5!1ssGHM_0EFNYF7HDz4Tab7Rw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-7.248803413390817%26panoid%3DsGHM_0EFNYF7HDz4Tab7Rw%26yaw%3D239.44917299414527!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Y aller"
    },
    "en": {
      "name": "Avenue de Lérins",
      "desc": "Type: Free parking. A few spaces along the avenue, just after the spots reserved for the tourist train.",
      "url": "https://www.google.com/maps/@43.8457994,6.2212576,3a,75y,239.45h,97.25t/data=!3m7!1e1!3m5!1ssGHM_0EFNYF7HDz4Tab7Rw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-7.248803413390817%26panoid%3DsGHM_0EFNYF7HDz4Tab7Rw%26yaw%3D239.44917299414527!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Directions"
    },
    "de": {
      "name": "Avenue de Lérins",
      "desc": "Typ: Kostenloses Parken, auf 1 Stunde begrenzt. Einige Plätze entlang der Allee, direkt nach den für den kleinen Touristenzug reservierten Stellplätzen.",
      "url": "https://www.google.com/maps/@43.8457994,6.2212576,3a,75y,239.45h,97.25t/data=!3m7!1e1!3m5!1ssGHM_0EFNYF7HDz4Tab7Rw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-7.248803413390817%26panoid%3DsGHM_0EFNYF7HDz4Tab7Rw%26yaw%3D239.44917299414527!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Anfahrt"
    },
    "nl": {
      "name": "Avenue de Lérins",
      "desc": "Type: Gratis parkeren, beperkt tot 1 uur. Enkele plaatsen langs de laan, net na de plekken die gereserveerd zijn voor het toeristentreintje.",
      "url": "https://www.google.com/maps/@43.8457994,6.2212576,3a,75y,239.45h,97.25t/data=!3m7!1e1!3m5!1ssGHM_0EFNYF7HDz4Tab7Rw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-7.248803413390817%26panoid%3DsGHM_0EFNYF7HDz4Tab7Rw%26yaw%3D239.44917299414527!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Route"
    },
    "trace": {
      "logements": [
        "moustiers"
      ],
      "coords": [
        [
          43.84717,
          6.22067
        ],
        [
          43.84714,
          6.22075
        ],
        [
          43.84713,
          6.22081
        ],
        [
          43.84714,
          6.22095
        ],
        [
          43.84714,
          6.22102
        ],
        [
          43.84713,
          6.22109
        ],
        [
          43.84708,
          6.22129
        ],
        [
          43.84702,
          6.22141
        ],
        [
          43.847,
          6.22143
        ],
        [
          43.84698,
          6.22145
        ],
        [
          43.84697,
          6.22147
        ],
        [
          43.84684,
          6.22159
        ],
        [
          43.8468,
          6.22162
        ],
        [
          43.84677,
          6.22162
        ],
        [
          43.8467,
          6.22159
        ],
        [
          43.84662,
          6.22154
        ],
        [
          43.84651,
          6.22144
        ],
        [
          43.84638,
          6.22136
        ],
        [
          43.84628,
          6.22132
        ],
        [
          43.84619,
          6.22134
        ],
        [
          43.84614,
          6.22136
        ],
        [
          43.84613,
          6.22137
        ],
        [
          43.84608,
          6.22137
        ],
        [
          43.84603,
          6.22136
        ],
        [
          43.84594,
          6.22131
        ],
        [
          43.84584,
          6.22126
        ]
      ]
    }
  },
  {
    "id": "parking-deposeminute-15mins",
    "cat": "parking_zonebleu",
    "coords": [
      43.84710692928554,
      6.220764219760896
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/depose_minute_15mins.jpg",
    "fr": {
      "name": "Dépose minute",
      "desc": "Type : Parking gratuit 15 minutes. Pour déposer et charger les bagages et les courses.",
      "url": "https://www.google.com/maps/@43.8471674,6.2207608,3a,75y,173.06h,94.65t/data=!3m10!1e1!3m8!1sWijBRmvTs4f3b_fWgPh6Cg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-4.645023307795114%26panoid%3DWijBRmvTs4f3b_fWgPh6Cg%26yaw%3D173.05717634638071!7i16384!8i8192!9m2!1b1!2i40?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Y aller"
    },
    "en": {
      "name": "Drop off zone",
      "desc": "Type : Free parking 15 minutes. To drop off and load luggage and shopping.",
      "url": "https://www.google.com/maps/@43.8471674,6.2207608,3a,75y,173.06h,94.65t/data=!3m10!1e1!3m8!1sWijBRmvTs4f3b_fWgPh6Cg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-4.645023307795114%26panoid%3DWijBRmvTs4f3b_fWgPh6Cg%26yaw%3D173.05717634638071!7i16384!8i8192!9m2!1b1!2i40?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Directions"
    },
    "de": {
      "name": "Kurzzeitparkzone",
      "desc": "Typ: Kostenloses Parken für 15 Minuten. Zum Ein- und Ausladen von Gepäck und Einkäufen.",
      "url": "https://www.google.com/maps/@43.8471674,6.2207608,3a,75y,173.06h,94.65t/data=!3m10!1e1!3m8!1sWijBRmvTs4f3b_fWgPh6Cg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-4.645023307795114%26panoid%3DWijBRmvTs4f3b_fWgPh6Cg%26yaw%3D173.05717634638071!7i16384!8i8192!9m2!1b1!2i40?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Anfahrt"
    },
    "nl": {
      "name": "Kortparkeerzone",
      "desc": "Type: Gratis parkeren voor 15 minuten. Om bagage en boodschappen in en uit te laden.",
      "url": "https://www.google.com/maps/@43.8471674,6.2207608,3a,75y,173.06h,94.65t/data=!3m10!1e1!3m8!1sWijBRmvTs4f3b_fWgPh6Cg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-4.645023307795114%26panoid%3DWijBRmvTs4f3b_fWgPh6Cg%26yaw%3D173.05717634638071!7i16384!8i8192!9m2!1b1!2i40?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Route"
    }
  },
  {
    "id": "parking-deposeminute-30mins",
    "cat": "parking_zonebleu",
    "coords": [
      43.84698893169614,
      6.221351623535157
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/pont-zonebleu.jpg",
    "fr": {
      "name": "Dépose minute",
      "desc": "Type : Parking gratuit 30 minutes. toute l'année, tous les jours de 10h à 19h, durée de stationnement 30mn, stationnement interdit sauf livraisons, tous les jours de 6h à 10h.",
      "url": "https://www.google.com/maps/@43.8470896,6.2212575,3a,75y,167.19h,91.75t/data=!3m10!1e1!3m8!1s7isH_QqwCL6eY13L9aMH8A!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-1.7536543646196776%26panoid%3D7isH_QqwCL6eY13L9aMH8A%26yaw%3D167.1946146605006!7i16384!8i8192!9m2!1b1!2i31?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Y aller"
    },
    "en": {
      "name": "Drop off zone",
      "desc": "Type : Free parking 30 minutes. All year round, every day from 10am to 7pm, parking time 30min, parking prohibited except deliveries, every day from 6am to 10am.",
      "url": "https://www.google.com/maps/@43.8470896,6.2212575,3a,75y,167.19h,91.75t/data=!3m10!1e1!3m8!1s7isH_QqwCL6eY13L9aMH8A!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-1.7536543646196776%26panoid%3D7isH_QqwCL6eY13L9aMH8A%26yaw%3D167.1946146605006!7i16384!8i8192!9m2!1b1!2i31?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Directions"
    },
    "de": {
      "name": "Kurzzeitparkzone",
      "desc": "Typ: Kostenloses Parken für 30 Minuten. Ganzjährig, täglich von 10 bis 19 Uhr, Höchstparkdauer 30 Minuten; von 6 bis 10 Uhr ist das Parken außer für Lieferungen untersagt.",
      "url": "https://www.google.com/maps/@43.8470896,6.2212575,3a,75y,167.19h,91.75t/data=!3m10!1e1!3m8!1s7isH_QqwCL6eY13L9aMH8A!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-1.7536543646196776%26panoid%3D7isH_QqwCL6eY13L9aMH8A%26yaw%3D167.1946146605006!7i16384!8i8192!9m2!1b1!2i31?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Anfahrt"
    },
    "nl": {
      "name": "Kortparkeerzone",
      "desc": "Type: Gratis parkeren voor 30 minuten. Het hele jaar door, dagelijks van 10.00 tot 19.00 uur, parkeertijd 30 minuten; van 6.00 tot 10.00 uur is parkeren verboden, behalve voor leveringen.",
      "url": "https://www.google.com/maps/@43.8470896,6.2212575,3a,75y,167.19h,91.75t/data=!3m10!1e1!3m8!1s7isH_QqwCL6eY13L9aMH8A!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-1.7536543646196776%26panoid%3D7isH_QqwCL6eY13L9aMH8A%26yaw%3D167.1946146605006!7i16384!8i8192!9m2!1b1!2i31?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Route"
    },
    "trace": {
      "logements": [
        "moustiers"
      ],
      "coords": [
        [
          43.84717,
          6.22067
        ],
        [
          43.84714,
          6.22075
        ],
        [
          43.84703,
          6.22076
        ],
        [
          43.84697,
          6.2208
        ],
        [
          43.84696,
          6.22085
        ],
        [
          43.84694,
          6.22091
        ],
        [
          43.84696,
          6.22101
        ],
        [
          43.84697,
          6.22108
        ],
        [
          43.84702,
          6.22117
        ],
        [
          43.84705,
          6.2212
        ],
        [
          43.84706,
          6.22123
        ],
        [
          43.84702,
          6.22126
        ],
        [
          43.84699,
          6.22135
        ]
      ]
    }
  },
  {
    "id": "parking-magnant-haut",
    "cat": "parking_payant",
    "coords": [
      43.8432109510779,
      6.221083402633667
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/parking-magnant-haut.jpg",
    "fr": {
      "name": "Parking Magnant Haut et bas",
      "desc": "Type : Payant derrière et devant le Proxy.",
      "url": "https://www.google.com/maps/place/Parking+Magnans+Haut/@43.8431226,6.2210481,3a,75y,28.54h,89.58t/data=!3m7!1e1!3m5!1sExWemoEJQ9_6Bl_2obzcZg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0.41992226104532904%26panoid%3DExWemoEJQ9_6Bl_2obzcZg%26yaw%3D28.53800050858365!7i16384!8i8192!4m14!1m7!3m6!1s0x12cbefe910cb754f:0xafbbe1f14466224d!2sParking+Magnans+Haut!8m2!3d43.8434902!4d6.2209272!16s%2Fg%2F11rwl2frnv!3m5!1s0x12cbefe910cb754f:0xafbbe1f14466224d!8m2!3d43.8434902!4d6.2209272!16s%2Fg%2F11rwl2frnv?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Y aller"
    },
    "en": {
      "name": "Magnant Haut & bas Parking",
      "desc": "Type: Paid parking behind and in front of Proxi.",
      "url": "https://www.google.com/maps/place/Parking+Magnans+Haut/@43.8431226,6.2210481,3a,75y,28.54h,89.58t/data=!3m7!1e1!3m5!1sExWemoEJQ9_6Bl_2obzcZg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0.41992226104532904%26panoid%3DExWemoEJQ9_6Bl_2obzcZg%26yaw%3D28.53800050858365!7i16384!8i8192!4m14!1m7!3m6!1s0x12cbefe910cb754f:0xafbbe1f14466224d!2sParking+Magnans+Haut!8m2!3d43.8434902!4d6.2209272!16s%2Fg%2F11rwl2frnv!3m5!1s0x12cbefe910cb754f:0xafbbe1f14466224d!8m2!3d43.8434902!4d6.2209272!16s%2Fg%2F11rwl2frnv?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Directions"
    },
    "de": {
      "name": "Parkplatz Magnant Haut & Bas",
      "desc": "Typ: Kostenpflichtiger Parkplatz hinter und vor dem Proxi-Supermarkt.",
      "url": "https://www.google.com/maps/place/Parking+Magnans+Haut/@43.8431226,6.2210481,3a,75y,28.54h,89.58t/data=!3m7!1e1!3m5!1sExWemoEJQ9_6Bl_2obzcZg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0.41992226104532904%26panoid%3DExWemoEJQ9_6Bl_2obzcZg%26yaw%3D28.53800050858365!7i16384!8i8192!4m14!1m7!3m6!1s0x12cbefe910cb754f:0xafbbe1f14466224d!2sParking+Magnans+Haut!8m2!3d43.8434902!4d6.2209272!16s%2Fg%2F11rwl2frnv!3m5!1s0x12cbefe910cb754f:0xafbbe1f14466224d!8m2!3d43.8434902!4d6.2209272!16s%2Fg%2F11rwl2frnv?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Anfahrt"
    },
    "nl": {
      "name": "Parkeerplaats Magnant Haut & Bas",
      "desc": "Type: Betaald parkeren achter en voor de Proxi-supermarkt.",
      "url": "https://www.google.com/maps/place/Parking+Magnans+Haut/@43.8431226,6.2210481,3a,75y,28.54h,89.58t/data=!3m7!1e1!3m5!1sExWemoEJQ9_6Bl_2obzcZg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0.41992226104532904%26panoid%3DExWemoEJQ9_6Bl_2obzcZg%26yaw%3D28.53800050858365!7i16384!8i8192!4m14!1m7!3m6!1s0x12cbefe910cb754f:0xafbbe1f14466224d!2sParking+Magnans+Haut!8m2!3d43.8434902!4d6.2209272!16s%2Fg%2F11rwl2frnv!3m5!1s0x12cbefe910cb754f:0xafbbe1f14466224d!8m2!3d43.8434902!4d6.2209272!16s%2Fg%2F11rwl2frnv?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Route"
    },
    "trace": {
      "logements": [
        "moustiers"
      ],
      "coords": [
        [
          43.84717,
          6.22067
        ],
        [
          43.84714,
          6.22075
        ],
        [
          43.84713,
          6.22081
        ],
        [
          43.84714,
          6.22095
        ],
        [
          43.84714,
          6.22102
        ],
        [
          43.84713,
          6.22109
        ],
        [
          43.84708,
          6.22129
        ],
        [
          43.84702,
          6.22141
        ],
        [
          43.847,
          6.22143
        ],
        [
          43.84698,
          6.22145
        ],
        [
          43.84697,
          6.22147
        ],
        [
          43.84684,
          6.22159
        ],
        [
          43.8468,
          6.22162
        ],
        [
          43.84677,
          6.22162
        ],
        [
          43.8467,
          6.22159
        ],
        [
          43.84662,
          6.22154
        ],
        [
          43.84651,
          6.22144
        ],
        [
          43.84638,
          6.22136
        ],
        [
          43.84628,
          6.22132
        ],
        [
          43.84619,
          6.22134
        ],
        [
          43.84614,
          6.22136
        ],
        [
          43.84613,
          6.22137
        ],
        [
          43.84608,
          6.22137
        ],
        [
          43.84604,
          6.2214
        ],
        [
          43.84596,
          6.22138
        ],
        [
          43.8457,
          6.22128
        ],
        [
          43.84557,
          6.22128
        ],
        [
          43.84533,
          6.22132
        ],
        [
          43.8453,
          6.22135
        ],
        [
          43.84477,
          6.2214
        ],
        [
          43.84476,
          6.22129
        ],
        [
          43.84406,
          6.22129
        ],
        [
          43.84401,
          6.22131
        ],
        [
          43.84399,
          6.22131
        ],
        [
          43.84397,
          6.22127
        ],
        [
          43.84389,
          6.22134
        ],
        [
          43.84381,
          6.22143
        ],
        [
          43.84377,
          6.22132
        ],
        [
          43.84375,
          6.22127
        ],
        [
          43.84375,
          6.22119
        ],
        [
          43.84378,
          6.22105
        ],
        [
          43.84381,
          6.22094
        ],
        [
          43.84371,
          6.22091
        ],
        [
          43.84369,
          6.22098
        ],
        [
          43.84361,
          6.22109
        ],
        [
          43.8436,
          6.22112
        ],
        [
          43.84352,
          6.22115
        ],
        [
          43.84346,
          6.22117
        ],
        [
          43.84337,
          6.22117
        ],
        [
          43.84328,
          6.22112
        ],
        [
          43.84321,
          6.22108
        ]
      ]
    }
  },
  {
    "id": "parking-haut-moustiers",
    "cat": "parking_payant",
    "coords": [
      43.845547790051455,
      6.222601466302039
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/parking-haut-moustiers.jpg",
    "fr": {
      "name": "Parking haut Moustiers",
      "desc": "Type : Parking payant.",
      "url": "https://www.google.com/maps/place/Parking+payant+Haut+de+Moustiers-Sainte-Marie/@43.8456376,6.2223637,3a,90y,136.09h,95.02t/data=!3m10!1e1!3m8!1sLjvqL_7KWNmZN7lu7dSP5A!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-5.016035130308964%26panoid%3DLjvqL_7KWNmZN7lu7dSP5A%26yaw%3D136.0902660330998!7i16384!8i8192!9m2!1b1!2i43!4m6!3m5!1s0x12cbee0ec7126b89:0xe9d21a7f7a632d57!8m2!3d43.8459934!4d6.222739!16s%2Fg%2F11gfh_rsxs?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Y aller"
    },
    "en": {
      "name": "Parking haut Moustiers",
      "desc": "Type: Paid parking.",
      "url": "https://www.google.com/maps/place/Parking+payant+Haut+de+Moustiers-Sainte-Marie/@43.8456376,6.2223637,3a,90y,136.09h,95.02t/data=!3m10!1e1!3m8!1sLjvqL_7KWNmZN7lu7dSP5A!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-5.016035130308964%26panoid%3DLjvqL_7KWNmZN7lu7dSP5A%26yaw%3D136.0902660330998!7i16384!8i8192!9m2!1b1!2i43!4m6!3m5!1s0x12cbee0ec7126b89:0xe9d21a7f7a632d57!8m2!3d43.8459934!4d6.222739!16s%2Fg%2F11gfh_rsxs?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Directions"
    },
    "de": {
      "name": "Parking haut Moustiers",
      "desc": "Typ: Kostenpflichtiger Parkplatz.",
      "url": "https://www.google.com/maps/place/Parking+payant+Haut+de+Moustiers-Sainte-Marie/@43.8456376,6.2223637,3a,90y,136.09h,95.02t/data=!3m10!1e1!3m8!1sLjvqL_7KWNmZN7lu7dSP5A!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-5.016035130308964%26panoid%3DLjvqL_7KWNmZN7lu7dSP5A%26yaw%3D136.0902660330998!7i16384!8i8192!9m2!1b1!2i43!4m6!3m5!1s0x12cbee0ec7126b89:0xe9d21a7f7a632d57!8m2!3d43.8459934!4d6.222739!16s%2Fg%2F11gfh_rsxs?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Anfahrt"
    },
    "nl": {
      "name": "Parking haut Moustiers",
      "desc": "Type: Betaald parkeren.",
      "url": "https://www.google.com/maps/place/Parking+payant+Haut+de+Moustiers-Sainte-Marie/@43.8456376,6.2223637,3a,90y,136.09h,95.02t/data=!3m10!1e1!3m8!1sLjvqL_7KWNmZN7lu7dSP5A!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-5.016035130308964%26panoid%3DLjvqL_7KWNmZN7lu7dSP5A%26yaw%3D136.0902660330998!7i16384!8i8192!9m2!1b1!2i43!4m6!3m5!1s0x12cbee0ec7126b89:0xe9d21a7f7a632d57!8m2!3d43.8459934!4d6.222739!16s%2Fg%2F11gfh_rsxs?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Route"
    },
    "trace": {
      "logements": [
        "moustiers"
      ],
      "coords": [
        [
          43.84717,
          6.22067
        ],
        [
          43.84714,
          6.22075
        ],
        [
          43.84713,
          6.22081
        ],
        [
          43.84714,
          6.22095
        ],
        [
          43.84714,
          6.22102
        ],
        [
          43.84713,
          6.22109
        ],
        [
          43.84708,
          6.22129
        ],
        [
          43.84702,
          6.22141
        ],
        [
          43.847,
          6.22143
        ],
        [
          43.84698,
          6.22145
        ],
        [
          43.84697,
          6.22147
        ],
        [
          43.84684,
          6.22159
        ],
        [
          43.8468,
          6.22162
        ],
        [
          43.84676,
          6.22173
        ],
        [
          43.84669,
          6.22189
        ],
        [
          43.84662,
          6.22175
        ],
        [
          43.84657,
          6.2218
        ],
        [
          43.84654,
          6.22181
        ],
        [
          43.8465,
          6.22185
        ],
        [
          43.84645,
          6.22182
        ],
        [
          43.8464,
          6.2219
        ],
        [
          43.8463,
          6.22187
        ],
        [
          43.84619,
          6.22186
        ],
        [
          43.84611,
          6.22191
        ],
        [
          43.84595,
          6.22204
        ],
        [
          43.84586,
          6.22216
        ],
        [
          43.84584,
          6.22218
        ],
        [
          43.84574,
          6.22223
        ],
        [
          43.84567,
          6.22224
        ],
        [
          43.84557,
          6.2223
        ],
        [
          43.84556,
          6.22236
        ],
        [
          43.84555,
          6.22244
        ],
        [
          43.84553,
          6.22254
        ],
        [
          43.84553,
          6.22257
        ],
        [
          43.84555,
          6.22258
        ]
      ]
    }
  },
  {
    "id": "costebelle-salles",
    "cat": "coeur",
    "coords": [
      43.76670863279485,
      6.203927993774415
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/lac_costebelle.jpg",
    "fr": {
      "name": "Ile de Costebelle",
      "desc": "En paddle ou en kayak découvrez la mystérieuse île de Costebelle en forme de coeur! Arrétez-vous sur une de ses plages pour pique-niquer",
      "url": "gpx/paddle_costebelle.html",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Costebelle Island",
      "desc": "By paddle or kayak, discover the mysterious island of Costebelle with the shape of a heart! Stop at one of its beaches for a picnic.",
      "url": "gpx/paddle_costebelle.html?lang=EN",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Insel Costebelle",
      "desc": "Entdecken Sie beim Stand-up-Paddling oder Kajakfahren die geheimnisvolle, herzförmige Insel Costebelle! Machen Sie an einem ihrer Strände Halt für ein Picknick.",
      "url": "gpx/paddle_costebelle.html?lang=DE",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Eiland Costebelle",
      "desc": "Ontdek per supboard of kajak het mysterieuze, hartvormige eiland Costebelle! Stop op een van de stranden voor een picknick.",
      "url": "gpx/paddle_costebelle.html?lang=NL",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      16.222,
      54.304
    ],
    "scale": 1.3
  },
  {
    "id": "station-moustiers",
    "cat": "station",
    "coords": [
      43.844029243677,
      6.214672923088074
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/moustiers-station.jpg",
    "fr": {
      "name": "TotalEnergies Contact",
      "desc": "Quartier St Jean, Quartier Saint-Jean, 792 Rte de Riez, 04360 Moustiers-Sainte-Marie, France",
      "url": "https://www.google.com/maps/place/TotalEnergies+Contact/@43.8439843,6.2149324,19z/data=!4m6!3m5!1s0x12cbef6597ca6c95:0x6e3ac86cf9e4bf0!8m2!3d43.8440304!4d6.2147533!16s%2Fg%2F11h75ln1hw?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "TotalEnergies Contact",
      "desc": "Quartier St Jean, Quartier Saint-Jean, 792 Rte de Riez, 04360 Moustiers-Sainte-Marie, France",
      "url": "https://www.google.com/maps/place/TotalEnergies+Contact/@43.8439843,6.2149324,19z/data=!4m6!3m5!1s0x12cbef6597ca6c95:0x6e3ac86cf9e4bf0!8m2!3d43.8440304!4d6.2147533!16s%2Fg%2F11h75ln1hw?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "More details"
    },
    "de": {
      "name": "TotalEnergies Contact",
      "desc": "Quartier St Jean, Quartier Saint-Jean, 792 Rte de Riez, 04360 Moustiers-Sainte-Marie, Frankreich",
      "url": "https://www.google.com/maps/place/TotalEnergies+Contact/@43.8439843,6.2149324,19z/data=!4m6!3m5!1s0x12cbef6597ca6c95:0x6e3ac86cf9e4bf0!8m2!3d43.8440304!4d6.2147533!16s%2Fg%2F11h75ln1hw?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "TotalEnergies Contact",
      "desc": "Quartier St Jean, Quartier Saint-Jean, 792 Rte de Riez, 04360 Moustiers-Sainte-Marie, Frankrijk",
      "url": "https://www.google.com/maps/place/TotalEnergies+Contact/@43.8439843,6.2149324,19z/data=!4m6!3m5!1s0x12cbef6597ca6c95:0x6e3ac86cf9e4bf0!8m2!3d43.8440304!4d6.2147533!16s%2Fg%2F11h75ln1hw?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      43.791,
      52.775
    ],
    "scale": 0.8
  },
  {
    "id": "station-salles",
    "cat": "station",
    "coords": [
      43.77453501370113,
      6.217902302742004
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/salles-station.jpg",
    "fr": {
      "name": "TotalEnergies Contact",
      "desc": "D957, 83630 Les Salles-sur-Verdon",
      "url": "https://www.google.com/maps/place/TotalEnergies+Contact/@43.774482,6.215212,17z/data=!3m1!4b1!4m6!3m5!1s0x12cbe55f8b31f6cb:0x2e07d91e47fc9fcf!8m2!3d43.7744782!4d6.2177869!16s%2Fg%2F11g9dq8nl7?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "TotalEnergies Contact",
      "desc": "D957, 83630 Les Salles-sur-Verdon",
      "url": "https://www.google.com/maps/place/TotalEnergies+Contact/@43.774482,6.215212,17z/data=!3m1!4b1!4m6!3m5!1s0x12cbe55f8b31f6cb:0x2e07d91e47fc9fcf!8m2!3d43.7744782!4d6.2177869!16s%2Fg%2F11g9dq8nl7?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "More details"
    },
    "de": {
      "name": "TotalEnergies Contact",
      "desc": "D957, 83630 Les Salles-sur-Verdon",
      "url": "https://www.google.com/maps/place/TotalEnergies+Contact/@43.774482,6.215212,17z/data=!3m1!4b1!4m6!3m5!1s0x12cbe55f8b31f6cb:0x2e07d91e47fc9fcf!8m2!3d43.7744782!4d6.2177869!16s%2Fg%2F11g9dq8nl7?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "TotalEnergies Contact",
      "desc": "D957, 83630 Les Salles-sur-Verdon",
      "url": "https://www.google.com/maps/place/TotalEnergies+Contact/@43.774482,6.215212,17z/data=!3m1!4b1!4m6!3m5!1s0x12cbe55f8b31f6cb:0x2e07d91e47fc9fcf!8m2!3d43.7744782!4d6.2177869!16s%2Fg%2F11g9dq8nl7?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      21.486,
      66.206
    ],
    "scale": 1.6
  },
  {
    "id": "relais-salles",
    "cat": "relais",
    "coords": [
      43.77452,
      6.2175
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/relais/1.jpg",
    "fr": {
      "name": "Mondial Relais",
      "desc": "D957, 83630 Les Salles-sur-Verdon",
      "links": [
        {
          "url": "galerie.html?folder=relais&count=1",
          "label": "Plus d'informations"
        },
        {
          "url": "https://www.google.com/maps/place/ORAPI+MARKET+L'%C3%A9picerie+d'%C3%A0+c%C3%B4t%C3%A9+by+Casino/@43.7743599,6.2177072,3a,75y,90t/data=!3m11!1e2!3m9!1sCIABIhCTt9ddeIr4BzGB604apDcx!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAE8N7o6UT-lXYbjDqpDRKnKy9PlBb1S1_d8w6zJfFqrOhMFEU1HAYzPgAQKXYbI_MsuWcZFhhGRJ-RFyGrXC0bvl6O8JW25QzuOQ7Xmty0GwJB8CbZ5o3rHEg6BmTmmN3XAN4ryClppV7c%3Dw114-h86-k-no!7i4032!8i3024!9m2!1b1!2i38!4m7!3m6!1s0x12cbe55f8e278b8b:0xf63a32a941e79e4a!8m2!3d43.7744417!4d6.2177583!10e5!16s%2Fg%2F11g8_2c8tz?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
          "urlLabel": "Directions"
        }
      ]
    },
    "en": {
      "name": "Mondial Relais",
      "desc": "D957, 83630 Les Salles-sur-Verdon",
      "links": [
        {
          "url": "galerie.html?folder=relais&count=1",
          "label": "More details"
        },
        {
          "url": "https://www.google.com/maps/place/ORAPI+MARKET+L'%C3%A9picerie+d'%C3%A0+c%C3%B4t%C3%A9+by+Casino/@43.7743599,6.2177072,3a,75y,90t/data=!3m11!1e2!3m9!1sCIABIhCTt9ddeIr4BzGB604apDcx!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAE8N7o6UT-lXYbjDqpDRKnKy9PlBb1S1_d8w6zJfFqrOhMFEU1HAYzPgAQKXYbI_MsuWcZFhhGRJ-RFyGrXC0bvl6O8JW25QzuOQ7Xmty0GwJB8CbZ5o3rHEg6BmTmmN3XAN4ryClppV7c%3Dw114-h86-k-no!7i4032!8i3024!9m2!1b1!2i38!4m7!3m6!1s0x12cbe55f8e278b8b:0xf63a32a941e79e4a!8m2!3d43.7744417!4d6.2177583!10e5!16s%2Fg%2F11g8_2c8tz?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
          "urlLabel": "Directions"
        }
      ]
    },
    "de": {
      "name": "Mondial Relais",
      "desc": "D957, 83630 Les Salles-sur-Verdon",
      "links": [
        {
          "url": "galerie.html?folder=relais&count=1",
          "label": "Weitere Informationen"
        },
        {
          "url": "https://www.google.com/maps/place/ORAPI+MARKET+L'%C3%A9picerie+d'%C3%A0+c%C3%B4t%C3%A9+by+Casino/@43.7743599,6.2177072,3a,75y,90t/data=!3m11!1e2!3m9!1sCIABIhCTt9ddeIr4BzGB604apDcx!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAE8N7o6UT-lXYbjDqpDRKnKy9PlBb1S1_d8w6zJfFqrOhMFEU1HAYzPgAQKXYbI_MsuWcZFhhGRJ-RFyGrXC0bvl6O8JW25QzuOQ7Xmty0GwJB8CbZ5o3rHEg6BmTmmN3XAN4ryClppV7c%3Dw114-h86-k-no!7i4032!8i3024!9m2!1b1!2i38!4m7!3m6!1s0x12cbe55f8e278b8b:0xf63a32a941e79e4a!8m2!3d43.7744417!4d6.2177583!10e5!16s%2Fg%2F11g8_2c8tz?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
          "label": "Anfahrt"
        }
      ]
    },
    "nl": {
      "name": "Mondial Relais",
      "desc": "D957, 83630 Les Salles-sur-Verdon",
      "links": [
        {
          "url": "galerie.html?folder=relais&count=1",
          "label": "Meer informatie"
        },
        {
          "url": "https://www.google.com/maps/place/ORAPI+MARKET+L'%C3%A9picerie+d'%C3%A0+c%C3%B4t%C3%A9+by+Casino/@43.7743599,6.2177072,3a,75y,90t/data=!3m11!1e2!3m9!1sCIABIhCTt9ddeIr4BzGB604apDcx!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAE8N7o6UT-lXYbjDqpDRKnKy9PlBb1S1_d8w6zJfFqrOhMFEU1HAYzPgAQKXYbI_MsuWcZFhhGRJ-RFyGrXC0bvl6O8JW25QzuOQ7Xmty0GwJB8CbZ5o3rHEg6BmTmmN3XAN4ryClppV7c%3Dw114-h86-k-no!7i4032!8i3024!9m2!1b1!2i38!4m7!3m6!1s0x12cbe55f8e278b8b:0xf63a32a941e79e4a!8m2!3d43.7744417!4d6.2177583!10e5!16s%2Fg%2F11g8_2c8tz?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
          "label": "Route"
        }
      ]
    },
    "pano": [
      21.22,
      62.38
    ],
    "scale": 1.6
  },
  {
    "id": "laverie-salles",
    "cat": "laverie",
    "coords": [
      43.77458,
      6.21764
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/salles-laverie.png",
    "fr": {
      "name": "Laverie automatique Wash me",
      "desc": "D957, 83630 Les Salles-sur-Verdon",
      "links": [
        {
          "url": "galerie.html?folder=laverie&count=8",
          "label": "Plus d'informations"
        },
        {
          "url": "https://www.google.com/maps/place/ORAPI+MARKET+L'%C3%A9picerie+d'%C3%A0+c%C3%B4t%C3%A9+by+Casino/@43.7743599,6.2177072,3a,75y,90t/data=!3m11!1e2!3m9!1sCIABIhCTt9ddeIr4BzGB604apDcx!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAE8N7o6UT-lXYbjDqpDRKnKy9PlBb1S1_d8w6zJfFqrOhMFEU1HAYzPgAQKXYbI_MsuWcZFhhGRJ-RFyGrXC0bvl6O8JW25QzuOQ7Xmty0GwJB8CbZ5o3rHEg6BmTmmN3XAN4ryClppV7c%3Dw114-h86-k-no!7i4032!8i3024!9m2!1b1!2i38!4m7!3m6!1s0x12cbe55f8e278b8b:0xf63a32a941e79e4a!8m2!3d43.7744417!4d6.2177583!10e5!16s%2Fg%2F11g8_2c8tz?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
          "urlLabel": "Directions"
        }
      ]
    },
    "en": {
      "name": "Laundromat  Wash me",
      "desc": "D957, 83630 Les Salles-sur-Verdon",
      "links": [
        {
          "url": "galerie.html?folder=laverie&count=8",
          "label": "More details"
        },
        {
          "url": "https://www.google.com/maps/place/ORAPI+MARKET+L'%C3%A9picerie+d'%C3%A0+c%C3%B4t%C3%A9+by+Casino/@43.7743599,6.2177072,3a,75y,90t/data=!3m11!1e2!3m9!1sCIABIhCTt9ddeIr4BzGB604apDcx!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAE8N7o6UT-lXYbjDqpDRKnKy9PlBb1S1_d8w6zJfFqrOhMFEU1HAYzPgAQKXYbI_MsuWcZFhhGRJ-RFyGrXC0bvl6O8JW25QzuOQ7Xmty0GwJB8CbZ5o3rHEg6BmTmmN3XAN4ryClppV7c%3Dw114-h86-k-no!7i4032!8i3024!9m2!1b1!2i38!4m7!3m6!1s0x12cbe55f8e278b8b:0xf63a32a941e79e4a!8m2!3d43.7744417!4d6.2177583!10e5!16s%2Fg%2F11g8_2c8tz?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
          "urlLabel": "Directions"
        }
      ]
    },
    "de": {
      "name": "Waschsalon Wash me",
      "desc": "D957, 83630 Les Salles-sur-Verdon",
      "links": [
        {
          "url": "galerie.html?folder=laverie&count=8",
          "label": "Weitere Informationen"
        },
        {
          "url": "https://www.google.com/maps/place/ORAPI+MARKET+L'%C3%A9picerie+d'%C3%A0+c%C3%B4t%C3%A9+by+Casino/@43.7743599,6.2177072,3a,75y,90t/data=!3m11!1e2!3m9!1sCIABIhCTt9ddeIr4BzGB604apDcx!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAE8N7o6UT-lXYbjDqpDRKnKy9PlBb1S1_d8w6zJfFqrOhMFEU1HAYzPgAQKXYbI_MsuWcZFhhGRJ-RFyGrXC0bvl6O8JW25QzuOQ7Xmty0GwJB8CbZ5o3rHEg6BmTmmN3XAN4ryClppV7c%3Dw114-h86-k-no!7i4032!8i3024!9m2!1b1!2i38!4m7!3m6!1s0x12cbe55f8e278b8b:0xf63a32a941e79e4a!8m2!3d43.7744417!4d6.2177583!10e5!16s%2Fg%2F11g8_2c8tz?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
          "label": "Anfahrt"
        }
      ]
    },
    "nl": {
      "name": "Wasserette Wash me",
      "desc": "D957, 83630 Les Salles-sur-Verdon",
      "links": [
        {
          "url": "galerie.html?folder=laverie&count=8",
          "label": "Meer informatie"
        },
        {
          "url": "https://www.google.com/maps/place/ORAPI+MARKET+L'%C3%A9picerie+d'%C3%A0+c%C3%B4t%C3%A9+by+Casino/@43.7743599,6.2177072,3a,75y,90t/data=!3m11!1e2!3m9!1sCIABIhCTt9ddeIr4BzGB604apDcx!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAE8N7o6UT-lXYbjDqpDRKnKy9PlBb1S1_d8w6zJfFqrOhMFEU1HAYzPgAQKXYbI_MsuWcZFhhGRJ-RFyGrXC0bvl6O8JW25QzuOQ7Xmty0GwJB8CbZ5o3rHEg6BmTmmN3XAN4ryClppV7c%3Dw114-h86-k-no!7i4032!8i3024!9m2!1b1!2i38!4m7!3m6!1s0x12cbe55f8e278b8b:0xf63a32a941e79e4a!8m2!3d43.7744417!4d6.2177583!10e5!16s%2Fg%2F11g8_2c8tz?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
          "label": "Route"
        }
      ]
    },
    "pano": [
      20.835,
      66.206
    ],
    "scale": 1.6
  },
  {
    "id": "laverie-riez",
    "cat": "laverie",
    "coords": [
      43.82122,
      6.09025
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/riez-laverie.jpg",
    "fr": {
      "name": "Laverie automatique Wash me",
      "desc": "Route de Digne Quartier Samson, 04500 Riez",
      "links": [
        {
          "url": "galerie.html?folder=laverie&count=8",
          "label": "Plus d'informations"
        },
        {
          "url": "https://www.google.com/maps/place/Laverie+Revolution+Laundry/@43.8227087,6.0883325,17z/data=!3m1!4b1!4m6!3m5!1s0x12cbe94b081431e5:0x96fed0d4a5d516a3!8m2!3d43.8227049!4d6.0909074!16s%2Fg%2F11qz8h9v8k?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
          "label": "Direction"
        }
      ]
    },
    "en": {
      "name": "Laundromat  Wash me",
      "desc": "Route de Digne Quartier Samson, 04500 Riez",
      "links": [
        {
          "url": "galerie.html?folder=laverie&count=8",
          "label": "More details"
        },
        {
          "url": "https://www.google.com/maps/place/Laverie+Revolution+Laundry/@43.8227087,6.0883325,17z/data=!3m1!4b1!4m6!3m5!1s0x12cbe94b081431e5:0x96fed0d4a5d516a3!8m2!3d43.8227049!4d6.0909074!16s%2Fg%2F11qz8h9v8k?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
          "label": "Direction"
        }
      ]
    },
    "de": {
      "name": "Waschsalon Wash me",
      "desc": "Route de Digne Quartier Samson, 04500 Riez",
      "links": [
        {
          "url": "galerie.html?folder=laverie&count=8",
          "label": "Weitere Informationen"
        },
        {
          "url": "https://www.google.com/maps/place/Laverie+Revolution+Laundry/@43.8227087,6.0883325,17z/data=!3m1!4b1!4m6!3m5!1s0x12cbe94b081431e5:0x96fed0d4a5d516a3!8m2!3d43.8227049!4d6.0909074!16s%2Fg%2F11qz8h9v8k?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
          "label": "Anfahrt"
        }
      ]
    },
    "nl": {
      "name": "Wasserette Wash me",
      "desc": "Route de Digne Quartier Samson, 04500 Riez",
      "links": [
        {
          "url": "galerie.html?folder=laverie&count=8",
          "label": "Meer informatie"
        },
        {
          "url": "https://www.google.com/maps/place/Laverie+Revolution+Laundry/@43.8227087,6.0883325,17z/data=!3m1!4b1!4m6!3m5!1s0x12cbe94b081431e5:0x96fed0d4a5d516a3!8m2!3d43.8227049!4d6.0909074!16s%2Fg%2F11qz8h9v8k?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
          "label": "Route"
        }
      ]
    },
    "pano": [
      24.979,
      45.106
    ],
    "scale": 0.8
  },
  {
    "id": "station-aups",
    "cat": "station",
    "coords": [
      43.61644966286344,
      6.219457983970643
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/aups-station.png",
    "fr": {
      "name": "TotalEnergies Contact",
      "desc": "Za Des Uchanes Route de Salernes, Rte de Sillans, 83630 Aups",
      "url": "https://www.google.com/maps/place/Intermarch%C3%A9+station-service+Aups/@43.6164052,6.2176514,17z/data=!3m1!4b1!4m6!3m5!1s0x12c9580c6437d049:0xf331438ffaa71219!8m2!3d43.616403!4d6.219123!16s%2Fg%2F11d_d8fxg3?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "TotalEnergies Contact",
      "desc": "Za Des Uchanes Route de Salernes, Rte de Sillans, 83630 Aups",
      "url": "https://www.google.com/maps/place/Intermarch%C3%A9+station-service+Aups/@43.6164052,6.2176514,17z/data=!3m1!4b1!4m6!3m5!1s0x12c9580c6437d049:0xf331438ffaa71219!8m2!3d43.616403!4d6.219123!16s%2Fg%2F11d_d8fxg3?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "More details"
    },
    "de": {
      "name": "TotalEnergies Contact",
      "desc": "Za Des Uchanes Route de Salernes, Rte de Sillans, 83630 Aups",
      "url": "https://www.google.com/maps/place/Intermarch%C3%A9+station-service+Aups/@43.6164052,6.2176514,17z/data=!3m1!4b1!4m6!3m5!1s0x12c9580c6437d049:0xf331438ffaa71219!8m2!3d43.616403!4d6.219123!16s%2Fg%2F11d_d8fxg3?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "TotalEnergies Contact",
      "desc": "Za Des Uchanes Route de Salernes, Rte de Sillans, 83630 Aups",
      "url": "https://www.google.com/maps/place/Intermarch%C3%A9+station-service+Aups/@43.6164052,6.2176514,17z/data=!3m1!4b1!4m6!3m5!1s0x12c9580c6437d049:0xf331438ffaa71219!8m2!3d43.616403!4d6.219123!16s%2Fg%2F11d_d8fxg3?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      99.56,
      45.308
    ],
    "scale": 0.7
  },
  {
    "id": "station-riez",
    "cat": "station",
    "coords": [
      43.82102765808606,
      6.090250611305238
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/riez-station.png",
    "fr": {
      "name": "Intermarché station-service Riez",
      "desc": "Route de Digne Quartier Samson, 04500 Riez",
      "url": "https://www.google.com/maps/place/Intermarch%C3%A9+station-service+Riez/@43.8221529,6.0912999,19.79z/data=!4m6!3m5!1s0x12cbe9b52ad6025d:0xdd8a089cf7881277!8m2!3d43.821992!4d6.091163!16s%2Fg%2F11j4cwfn85?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Intermarché station-service Riez",
      "desc": "Route de Digne Quartier Samson, 04500 Riez",
      "url": "https://www.google.com/maps/place/Intermarch%C3%A9+station-service+Riez/@43.8221529,6.0912999,19.79z/data=!4m6!3m5!1s0x12cbe9b52ad6025d:0xdd8a089cf7881277!8m2!3d43.821992!4d6.091163!16s%2Fg%2F11j4cwfn85?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Intermarché station-service Riez",
      "desc": "Route de Digne Quartier Samson, 04500 Riez",
      "url": "https://www.google.com/maps/place/Intermarch%C3%A9+station-service+Riez/@43.8221529,6.0912999,19.79z/data=!4m6!3m5!1s0x12cbe9b52ad6025d:0xdd8a089cf7881277!8m2!3d43.821992!4d6.091163!16s%2Fg%2F11j4cwfn85?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Intermarché station-service Riez",
      "desc": "Route de Digne Quartier Samson, 04500 Riez",
      "url": "https://www.google.com/maps/place/Intermarch%C3%A9+station-service+Riez/@43.8221529,6.0912999,19.79z/data=!4m6!3m5!1s0x12cbe9b52ad6025d:0xdd8a089cf7881277!8m2!3d43.821992!4d6.091163!16s%2Fg%2F11j4cwfn85?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      24.535,
      45.207
    ],
    "scale": 0.8
  },
  {
    "id": "commerce-magnans",
    "cat": "commerce",
    "coords": [
      43.843077469660045,
      6.221314072608949
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/moustiers-commerce.jpg",
    "fr": {
      "name": "Proxi aux Magnans",
      "desc": "Quartier St Jean, Quartier Saint-Jean, 792 Rte de Riez, 04360 Moustiers-Sainte-Marie, France",
      "url": "https://www.google.com/maps/place/Proxi+Super+C.C+Les+Magnans/@43.8432094,6.2210735,17z/data=!4m6!3m5!1s0x12cbee0dd0890ca1:0xd7ac361221f9e90a!8m2!3d43.8431337!4d6.2212293!16s%2Fg%2F11bzz1g6rw?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Proxi aux Magnans",
      "desc": "Quartier St Jean, Quartier Saint-Jean, 792 Rte de Riez, 04360 Moustiers-Sainte-Marie, France",
      "url": "https://www.google.com/maps/place/Proxi+Super+C.C+Les+Magnans/@43.8432094,6.2210735,17z/data=!4m6!3m5!1s0x12cbee0dd0890ca1:0xd7ac361221f9e90a!8m2!3d43.8431337!4d6.2212293!16s%2Fg%2F11bzz1g6rw?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Proxi aux Magnans",
      "desc": "Quartier St Jean, Quartier Saint-Jean, 792 Rte de Riez, 04360 Moustiers-Sainte-Marie, Frankreich",
      "url": "https://www.google.com/maps/place/Proxi+Super+C.C+Les+Magnans/@43.8432094,6.2210735,17z/data=!4m6!3m5!1s0x12cbee0dd0890ca1:0xd7ac361221f9e90a!8m2!3d43.8431337!4d6.2212293!16s%2Fg%2F11bzz1g6rw?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Proxi aux Magnans",
      "desc": "Quartier St Jean, Quartier Saint-Jean, 792 Rte de Riez, 04360 Moustiers-Sainte-Marie, Frankrijk",
      "url": "https://www.google.com/maps/place/Proxi+Super+C.C+Les+Magnans/@43.8432094,6.2210735,17z/data=!4m6!3m5!1s0x12cbee0dd0890ca1:0xd7ac361221f9e90a!8m2!3d43.8431337!4d6.2212293!16s%2Fg%2F11bzz1g6rw?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      44.655,
      53.348
    ],
    "scale": 0.8,
    "trace": {
      "logements": [
        "moustiers"
      ],
      "coords": [
        [
          43.84717,
          6.22067
        ],
        [
          43.84714,
          6.22075
        ],
        [
          43.84713,
          6.22081
        ],
        [
          43.84714,
          6.22095
        ],
        [
          43.84714,
          6.22102
        ],
        [
          43.84713,
          6.22109
        ],
        [
          43.84708,
          6.22129
        ],
        [
          43.84702,
          6.22141
        ],
        [
          43.847,
          6.22143
        ],
        [
          43.84698,
          6.22145
        ],
        [
          43.84697,
          6.22147
        ],
        [
          43.84684,
          6.22159
        ],
        [
          43.8468,
          6.22162
        ],
        [
          43.84677,
          6.22162
        ],
        [
          43.8467,
          6.22159
        ],
        [
          43.84662,
          6.22154
        ],
        [
          43.84651,
          6.22144
        ],
        [
          43.84638,
          6.22136
        ],
        [
          43.84628,
          6.22132
        ],
        [
          43.84619,
          6.22134
        ],
        [
          43.84614,
          6.22136
        ],
        [
          43.84613,
          6.22137
        ],
        [
          43.84608,
          6.22137
        ],
        [
          43.84604,
          6.2214
        ],
        [
          43.84596,
          6.22138
        ],
        [
          43.8457,
          6.22128
        ],
        [
          43.84557,
          6.22128
        ],
        [
          43.84533,
          6.22132
        ],
        [
          43.8453,
          6.22135
        ],
        [
          43.84477,
          6.2214
        ],
        [
          43.84476,
          6.22129
        ],
        [
          43.84406,
          6.22129
        ],
        [
          43.84401,
          6.22131
        ],
        [
          43.84399,
          6.22131
        ],
        [
          43.84397,
          6.22127
        ],
        [
          43.84389,
          6.22134
        ],
        [
          43.84381,
          6.22143
        ],
        [
          43.84375,
          6.22149
        ],
        [
          43.84365,
          6.22155
        ],
        [
          43.84357,
          6.22157
        ],
        [
          43.84353,
          6.22158
        ],
        [
          43.84336,
          6.22159
        ],
        [
          43.84323,
          6.22158
        ],
        [
          43.84318,
          6.22158
        ],
        [
          43.84313,
          6.22157
        ],
        [
          43.84313,
          6.22154
        ],
        [
          43.84315,
          6.2214
        ],
        [
          43.84307,
          6.22139
        ]
      ]
    }
  },
  {
    "id": "commerce-super-village",
    "cat": "commerce",
    "coords": [
      43.84719784530177,
      6.221512556076051
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/moustiers-commerce2.jpg",
    "fr": {
      "name": "Proxi Super Village",
      "desc": "8 Rue de la Diane, 04360 Moustiers-Sainte-Marie",
      "url": "https://www.google.com/maps/place/Proxi+Super+Village/@43.8472699,6.2215015,20z/data=!4m6!3m5!1s0x12cbee0959cbf5ad:0x180055a617843a42!8m2!3d43.8472398!4d6.2215683!16s%2Fg%2F1tg7j03b?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Proxi Super Village",
      "desc": "8 Rue de la Diane, 04360 Moustiers-Sainte-Marie",
      "url": "https://www.google.com/maps/place/Proxi+Super+Village/@43.8472699,6.2215015,20z/data=!4m6!3m5!1s0x12cbee0959cbf5ad:0x180055a617843a42!8m2!3d43.8472398!4d6.2215683!16s%2Fg%2F1tg7j03b?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Proxi Super Village",
      "desc": "8 Rue de la Diane, 04360 Moustiers-Sainte-Marie",
      "url": "https://www.google.com/maps/place/Proxi+Super+Village/@43.8472699,6.2215015,20z/data=!4m6!3m5!1s0x12cbee0959cbf5ad:0x180055a617843a42!8m2!3d43.8472398!4d6.2215683!16s%2Fg%2F1tg7j03b?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Proxi Super Village",
      "desc": "8 Rue de la Diane, 04360 Moustiers-Sainte-Marie",
      "url": "https://www.google.com/maps/place/Proxi+Super+Village/@43.8472699,6.2215015,20z/data=!4m6!3m5!1s0x12cbee0959cbf5ad:0x180055a617843a42!8m2!3d43.8472398!4d6.2215683!16s%2Fg%2F1tg7j03b?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      44.985,
      54.091
    ],
    "scale": 0.8,
    "trace": {
      "logements": [
        "moustiers"
      ],
      "coords": [
        [
          43.84717,
          6.22067
        ],
        [
          43.84714,
          6.22075
        ],
        [
          43.84713,
          6.22081
        ],
        [
          43.84714,
          6.22095
        ],
        [
          43.84714,
          6.22102
        ],
        [
          43.84713,
          6.22109
        ],
        [
          43.84708,
          6.22129
        ],
        [
          43.84716,
          6.22145
        ],
        [
          43.8472,
          6.22146
        ],
        [
          43.8472,
          6.22146
        ]
      ]
    }
  },
  {
    "id": "commerce-orapi-salles",
    "cat": "commerce",
    "coords": [
      43.77443,
      6.21772
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/salles-commerce.jpg",
    "fr": {
      "name": "ORAPI MARKET",
      "desc": "D957, 83630 Les Salles-sur-Verdon",
      "url": "https://www.google.com/maps/place/ORAPI+MARKET+L'%C3%A9picerie+d'%C3%A0+c%C3%B4t%C3%A9+by+Casino/@43.7744455,6.2151834,17z/data=!3m1!4b1!4m6!3m5!1s0x12cbe55f8e278b8b:0xf63a32a941e79e4a!8m2!3d43.7744417!4d6.2177583!16s%2Fg%2F11g8_2c8tz?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "ORAPI MARKET",
      "desc": "D957, 83630 Les Salles-sur-Verdon",
      "url": "https://www.google.com/maps/place/ORAPI+MARKET+L'%C3%A9picerie+d'%C3%A0+c%C3%B4t%C3%A9+by+Casino/@43.7744455,6.2151834,17z/data=!3m1!4b1!4m6!3m5!1s0x12cbe55f8e278b8b:0xf63a32a941e79e4a!8m2!3d43.7744417!4d6.2177583!16s%2Fg%2F11g8_2c8tz?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "More details"
    },
    "de": {
      "name": "ORAPI MARKET",
      "desc": "D957, 83630 Les Salles-sur-Verdon",
      "url": "https://www.google.com/maps/place/ORAPI+MARKET+L'%C3%A9picerie+d'%C3%A0+c%C3%B4t%C3%A9+by+Casino/@43.7744455,6.2151834,17z/data=!3m1!4b1!4m6!3m5!1s0x12cbe55f8e278b8b:0xf63a32a941e79e4a!8m2!3d43.7744417!4d6.2177583!16s%2Fg%2F11g8_2c8tz?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "ORAPI MARKET",
      "desc": "D957, 83630 Les Salles-sur-Verdon",
      "url": "https://www.google.com/maps/place/ORAPI+MARKET+L'%C3%A9picerie+d'%C3%A0+c%C3%B4t%C3%A9+by+Casino/@43.7744455,6.2151834,17z/data=!3m1!4b1!4m6!3m5!1s0x12cbe55f8e278b8b:0xf63a32a941e79e4a!8m2!3d43.7744417!4d6.2177583!16s%2Fg%2F11g8_2c8tz?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      21.88,
      62.274
    ],
    "scale": 1.6,
    "trace": {
      "logements": [
        "salles6",
        "salles8"
      ],
      "coords": [
        [
          43.77269,
          6.20827
        ],
        [
          43.77275,
          6.20832
        ],
        [
          43.77301,
          6.20835
        ],
        [
          43.77311,
          6.20844
        ],
        [
          43.77325,
          6.20856
        ],
        [
          43.77332,
          6.20862
        ],
        [
          43.77323,
          6.20882
        ],
        [
          43.77315,
          6.20901
        ],
        [
          43.77323,
          6.20907
        ],
        [
          43.77325,
          6.20909
        ],
        [
          43.77316,
          6.20931
        ],
        [
          43.77323,
          6.20942
        ],
        [
          43.77321,
          6.20947
        ],
        [
          43.7732,
          6.20951
        ],
        [
          43.77335,
          6.20963
        ],
        [
          43.77373,
          6.2099
        ],
        [
          43.77377,
          6.20993
        ],
        [
          43.77385,
          6.21
        ],
        [
          43.77396,
          6.21011
        ],
        [
          43.77408,
          6.21026
        ],
        [
          43.77412,
          6.21031
        ],
        [
          43.77425,
          6.21056
        ],
        [
          43.77428,
          6.21061
        ],
        [
          43.77434,
          6.21074
        ],
        [
          43.77437,
          6.21086
        ],
        [
          43.77441,
          6.21099
        ],
        [
          43.77443,
          6.2111
        ],
        [
          43.77444,
          6.21118
        ],
        [
          43.77446,
          6.21126
        ],
        [
          43.77447,
          6.21133
        ],
        [
          43.7745,
          6.21149
        ],
        [
          43.77454,
          6.21163
        ],
        [
          43.77457,
          6.21176
        ],
        [
          43.77464,
          6.21215
        ],
        [
          43.77467,
          6.21247
        ],
        [
          43.77468,
          6.21272
        ],
        [
          43.77467,
          6.21301
        ],
        [
          43.77465,
          6.2131
        ],
        [
          43.77461,
          6.21322
        ],
        [
          43.77447,
          6.21361
        ],
        [
          43.7743,
          6.21399
        ],
        [
          43.77375,
          6.21512
        ],
        [
          43.77356,
          6.21593
        ],
        [
          43.77349,
          6.21624
        ],
        [
          43.7735,
          6.21633
        ],
        [
          43.7735,
          6.2164
        ],
        [
          43.77356,
          6.21641
        ],
        [
          43.77367,
          6.21647
        ],
        [
          43.77382,
          6.21657
        ],
        [
          43.77389,
          6.2167
        ],
        [
          43.77392,
          6.21688
        ],
        [
          43.77392,
          6.21695
        ],
        [
          43.77392,
          6.217
        ],
        [
          43.7739,
          6.21706
        ],
        [
          43.77385,
          6.21717
        ],
        [
          43.77374,
          6.21735
        ],
        [
          43.77368,
          6.21746
        ],
        [
          43.77364,
          6.21754
        ],
        [
          43.77366,
          6.21764
        ],
        [
          43.77389,
          6.21802
        ],
        [
          43.77387,
          6.21809
        ],
        [
          43.77393,
          6.21811
        ],
        [
          43.7742,
          6.21799
        ],
        [
          43.77431,
          6.21783
        ],
        [
          43.77436,
          6.21768
        ]
      ]
    }
  },
  {
    "id": "commerce-proxi-salles",
    "cat": "commerce",
    "coords": [
      43.77403097584963,
      6.211465001106262
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/salles-commerce2.jpg",
    "fr": {
      "name": "Proxi",
      "desc": "2 Bd de la Tuilière, 83630 Les Salles-sur-Verdon",
      "url": "https://www.google.com/maps/place/PROXI/@43.7740185,6.2087938,17z/data=!3m1!4b1!4m6!3m5!1s0x12cbe561f4bd6625:0xcab0de575e036ae4!8m2!3d43.7740147!4d6.2113687!16s%2Fg%2F11c503z6d8?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Proxi",
      "desc": "2 Bd de la Tuilière, 83630 Les Salles-sur-Verdon",
      "url": "https://www.google.com/maps/place/PROXI/@43.7740185,6.2087938,17z/data=!3m1!4b1!4m6!3m5!1s0x12cbe561f4bd6625:0xcab0de575e036ae4!8m2!3d43.7740147!4d6.2113687!16s%2Fg%2F11c503z6d8?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Proxi",
      "desc": "2 Bd de la Tuilière, 83630 Les Salles-sur-Verdon",
      "url": "https://www.google.com/maps/place/PROXI/@43.7740185,6.2087938,17z/data=!3m1!4b1!4m6!3m5!1s0x12cbe561f4bd6625:0xcab0de575e036ae4!8m2!3d43.7740147!4d6.2113687!16s%2Fg%2F11c503z6d8?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Proxi",
      "desc": "2 Bd de la Tuilière, 83630 Les Salles-sur-Verdon",
      "url": "https://www.google.com/maps/place/PROXI/@43.7740185,6.2087938,17z/data=!3m1!4b1!4m6!3m5!1s0x12cbe561f4bd6625:0xcab0de575e036ae4!8m2!3d43.7740147!4d6.2113687!16s%2Fg%2F11c503z6d8?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      20.605,
      59.729
    ],
    "scale": 1.6,
    "trace": {
      "logements": [
        "salles6",
        "salles8"
      ],
      "coords": [
        [
          43.77269,
          6.20827
        ],
        [
          43.77275,
          6.20832
        ],
        [
          43.77301,
          6.20835
        ],
        [
          43.77311,
          6.20844
        ],
        [
          43.77325,
          6.20856
        ],
        [
          43.77332,
          6.20862
        ],
        [
          43.77323,
          6.20882
        ],
        [
          43.77315,
          6.20901
        ],
        [
          43.77323,
          6.20907
        ],
        [
          43.77325,
          6.20909
        ],
        [
          43.77316,
          6.20931
        ],
        [
          43.77323,
          6.20942
        ],
        [
          43.77321,
          6.20947
        ],
        [
          43.7732,
          6.20951
        ],
        [
          43.77335,
          6.20963
        ],
        [
          43.77373,
          6.2099
        ],
        [
          43.77371,
          6.20996
        ],
        [
          43.77361,
          6.21021
        ],
        [
          43.77369,
          6.21029
        ],
        [
          43.77372,
          6.21032
        ],
        [
          43.77375,
          6.2104
        ],
        [
          43.77389,
          6.2108
        ],
        [
          43.77397,
          6.21075
        ],
        [
          43.77401,
          6.21087
        ],
        [
          43.77419,
          6.21135
        ]
      ]
    }
  },
  {
    "id": "commerce-aups",
    "cat": "commerce",
    "coords": [
      43.616464712192574,
      6.218969821929932
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/aups-commerce.jpg",
    "fr": {
      "name": "Intermarché SUPER Aups",
      "desc": "Za Des Uchanes Route de Salernes, Rte de Sillans, 83630 Aups",
      "url": "https://www.google.com/maps/place/Intermarch%C3%A9+SUPER+Aups/@43.6164069,6.2165481,17z/data=!3m1!4b1!4m6!3m5!1s0x12c9580c65020473:0x191face86f5d020d!8m2!3d43.616403!4d6.219123!16s%2Fg%2F1tgldj6p?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Intermarché SUPER Aups",
      "desc": "Za Des Uchanes Route de Salernes, Rte de Sillans, 83630 Aups",
      "url": "https://www.google.com/maps/place/Intermarch%C3%A9+SUPER+Aups/@43.6164069,6.2165481,17z/data=!3m1!4b1!4m6!3m5!1s0x12c9580c65020473:0x191face86f5d020d!8m2!3d43.616403!4d6.219123!16s%2Fg%2F1tgldj6p?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Intermarché SUPER Aups",
      "desc": "Za Des Uchanes Route de Salernes, Rte de Sillans, 83630 Aups",
      "url": "https://www.google.com/maps/place/Intermarch%C3%A9+SUPER+Aups/@43.6164069,6.2165481,17z/data=!3m1!4b1!4m6!3m5!1s0x12c9580c65020473:0x191face86f5d020d!8m2!3d43.616403!4d6.219123!16s%2Fg%2F1tgldj6p?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Intermarché SUPER Aups",
      "desc": "Za Des Uchanes Route de Salernes, Rte de Sillans, 83630 Aups",
      "url": "https://www.google.com/maps/place/Intermarch%C3%A9+SUPER+Aups/@43.6164069,6.2165481,17z/data=!3m1!4b1!4m6!3m5!1s0x12c9580c65020473:0x191face86f5d020d!8m2!3d43.616403!4d6.219123!16s%2Fg%2F1tgldj6p?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      99.936,
      44.904
    ],
    "scale": 0.7
  },
  {
    "id": "commerce-riez",
    "cat": "commerce",
    "coords": [
      43.82123085692504,
      6.090119183063508
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/riez-commerce.png",
    "fr": {
      "name": "Intermarché CONTACT Riez",
      "desc": "Route de Digne Quartier Samson, 04500 Riez",
      "url": "https://www.intermarche.com/magasins/12162/riez-04500/infos-pratiques)",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Intermarché CONTACT Riez",
      "desc": "Route de Digne Quartier Samson, 04500 Riez",
      "url": "https://www.intermarche.com/magasins/12162/riez-04500/infos-pratiques)",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Intermarché CONTACT Riez",
      "desc": "Route de Digne Quartier Samson, 04500 Riez",
      "url": "https://www.intermarche.com/magasins/12162/riez-04500/infos-pratiques)",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Intermarché CONTACT Riez",
      "desc": "Route de Digne Quartier Samson, 04500 Riez",
      "url": "https://www.intermarche.com/magasins/12162/riez-04500/infos-pratiques)",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      24.263,
      44.4
    ],
    "scale": 0.8
  },
  {
    "id": "parapente-verdon",
    "cat": "sensations",
    "coords": [
      43.84304029469384,
      6.22127652168274
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/moustiers-parapente.jpg",
    "fr": {
      "name": "Parapente au-dessus du Verdon",
      "desc": "Vol biplace au-dessus du lac Sainte-Croix et des Gorges. Décollage depuis Aiguines, dès 6 ans, avril à octobre.",
      "url": "https://www.moustiers.fr/sport-evasion/sensations-fortes/parapente/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Paragliding over the Verdon",
      "desc": "Tandem flight over Lake Sainte-Croix and the Gorges. Takeoff from Aiguines, from age 6, April to October.",
      "url": "https://www.moustiers.fr/sport-evasion/sensations-fortes/parapente/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Gleitschirmfliegen über dem Verdon",
      "desc": "Tandemflug über dem Lac de Sainte-Croix und den Schluchten. Start in Aiguines, ab 6 Jahren, von April bis Oktober.",
      "url": "https://www.moustiers.fr/sport-evasion/sensations-fortes/parapente/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Paragliding boven de Verdon",
      "desc": "Tandemvlucht boven het Meer van Sainte-Croix en de kloven. Vertrek vanuit Aiguines, vanaf 6 jaar, van april tot oktober.",
      "url": "https://www.moustiers.fr/sport-evasion/sensations-fortes/parapente/",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      45.95,
      46.334
    ],
    "scale": 0.8
  },
  {
    "id": "rafting-castellane",
    "cat": "sportaquatique",
    "coords": [
      43.84706388920824,
      6.221308708190919
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/moustiers-rafting.jpg",
    "fr": {
      "name": "Rafting dans le Verdon",
      "desc": "Descente sportive en rafting depuis Castellane. Rapides classe II à IV selon la saison.",
      "url": "https://www.moustiers.fr/fiche/verdon-passion-aquaventure/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Rafting in the Verdon",
      "desc": "Thrilling rafting descent from Castellane. Class II to IV rapids depending on season.",
      "url": "https://www.moustiers.fr/fiche/verdon-passion-aquaventure/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Rafting im Verdon",
      "desc": "Spannende Rafting-Abfahrt ab Castellane. Stromschnellen der Klasse II bis IV, je nach Saison.",
      "url": "https://www.moustiers.fr/fiche/verdon-passion-aquaventure/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Raften in de Verdon",
      "desc": "Spannende raftingtocht vanuit Castellane. Stroomversnellingen van klasse II tot IV, afhankelijk van het seizoen.",
      "url": "https://www.moustiers.fr/fiche/verdon-passion-aquaventure/",
      "urlLabel": "Meer informatie"
    }
  },
  {
    "id": "rafting-salles",
    "cat": "sportaquatique",
    "coords": [
      43.77431858298277,
      6.211218237876893
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/salles-rafting.jpg",
    "fr": {
      "name": "Rafting dans le Verdon",
      "desc": "Descente sportive en rafting depuis Castellane. Rapides classe II à IV selon la saison.",
      "url": "https://lesguides.net/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Rafting in the Verdon",
      "desc": "Thrilling rafting descent from Castellane. Class II to IV rapids depending on season.",
      "url": "https://lesguides.net/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Rafting im Verdon",
      "desc": "Spannende Rafting-Abfahrt ab Castellane. Stromschnellen der Klasse II bis IV, je nach Saison.",
      "url": "https://lesguides.net/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Raften in de Verdon",
      "desc": "Spannende raftingtocht vanuit Castellane. Stroomversnellingen van klasse II tot IV, afhankelijk van het seizoen.",
      "url": "https://lesguides.net/",
      "urlLabel": "Meer informatie"
    }
  },
  {
    "id": "blanc-martel",
    "cat": "rando",
    "coords": [
      43.74752,
      6.34898
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/sentier-blanc-martel.jpg",
    "fr": {
      "name": "Rando : Sentier Blanc-Martel",
      "desc": "14 km au fond du canyon. Tunnels, échelles, vues plongeantes — un des plus beaux sentiers de France.",
      "links": [
        {
          "url": "gpx/blanc_martel.pdf",
          "label": "Plus d'informations"
        },
        {
          "url": "https://navette.parcduverdon.fr/",
          "label": "Navette"
        },
        {
          "url": "gpx/rando_blancmartel.html",
          "label": "Parcours GPX"
        }
      ]
    },
    "en": {
      "name": "Hike: Blanc-Martel Trail",
      "desc": "14 km at the bottom of the canyon. Tunnels, ladders, plunging views — one of France's most beautiful trails.",
      "links": [
        {
          "url": "gpx/blanc_martel.pdf",
          "label": "More details"
        },
        {
          "url": "https://navette.parcduverdon.fr/en/",
          "label": "Bus"
        },
        {
          "url": "gpx/rando_blancmartel.html",
          "label": "GPX route"
        }
      ]
    },
    "de": {
      "name": "Wanderung: Blanc-Martel-Pfad",
      "desc": "14 km am Grund der Schlucht. Tunnel, Leitern, spektakuläre Ausblicke — einer der schönsten Wanderwege Frankreichs.",
      "links": [
        {
          "url": "gpx/blanc_martel.pdf",
          "label": "Weitere Informationen"
        },
        {
          "url": "https://navette.parcduverdon.fr/en/",
          "label": "Shuttlebus"
        },
        {
          "url": "gpx/rando_blancmartel.html",
          "label": "GPX-Route"
        }
      ]
    },
    "nl": {
      "name": "Wandeling: Blanc-Martel-pad",
      "desc": "14 km op de bodem van de kloof. Tunnels, ladders, duizelingwekkende uitzichten — een van de mooiste wandelpaden van Frankrijk.",
      "links": [
        {
          "url": "gpx/blanc_martel.pdf",
          "label": "Meer informatie"
        },
        {
          "url": "https://navette.parcduverdon.fr/en/",
          "label": "Pendelbus"
        },
        {
          "url": "gpx/rando_blancmartel.html",
          "label": "GPX-route"
        }
      ]
    }
  },
  {
    "id": "sentier-imbut",
    "cat": "rando",
    "coords": [
      43.758,
      6.325
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/rando_imbus.jpg",
    "fr": {
      "name": "Rando : Sentier de l'Imbut",
      "desc": "Randonnée engagée au fond du canyon. Passages câblés, mains courantes et descente vers le Styx. 🚫 Attention : actuellement fermée par arrêté.",
      "url": "https://verdonsecret.com/le-sentier-de-limbut/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Hike: Imbut Trail",
      "desc": "Challenging hike at the bottom of the canyon. Cabled passages, handrails and descent towards the Styx. 🚫 Note: currently closed by decree.",
      "url": "https://verdonsecret.com/le-sentier-de-limbut/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Wanderung: Imbut-Pfad",
      "desc": "Anspruchsvolle Wanderung am Grund der Schlucht. Passagen mit Seilsicherung, Geländer und Abstieg zum Styx. 🚫 Hinweis: derzeit per Verfügung gesperrt.",
      "url": "https://verdonsecret.com/le-sentier-de-limbut/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Wandeling: Imbut-pad",
      "desc": "Uitdagende wandeling op de bodem van de kloof. Passages met kabels, leuningen en afdaling richting de Styx. 🚫 Let op: momenteel gesloten bij besluit.",
      "url": "https://verdonsecret.com/le-sentier-de-limbut/",
      "urlLabel": "Meer informatie"
    }
  },
  {
    "id": "sentier-quinson",
    "cat": "rando",
    "coords": [
      43.696955736299735,
      6.038532257080078
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/quinson-rando.jpg",
    "fr": {
      "name": "Rando : Sentier du Garde Canal",
      "desc": "Sur l'ancien sentier du garde canal, vous aurez le privilège de pénétrer les basses gorges du Verdon pour rejoindre la chapelle de Sainte-Maxime.",
      "links": [
        {
          "url": "https://www.tourisme-alpes-haute-provence.com/pratiquer-des-activites/6803710_sports-pedestres-quinson-quinson-sentier-du-garde-canal/",
          "label": "Plus d'informations"
        },
        {
          "url": "gpx/rando_quinson.html",
          "label": "Parcours GPX"
        }
      ]
    },
    "en": {
      "name": "Hike: Garde Canal Trail",
      "desc": "On the old canal guard trail, you will have the privilege of entering the lower gorges of the Verdon to reach the chapel of Sainte-Maxime.",
      "links": [
        {
          "url": "https://www.tourisme-alpes-haute-provence.com/pratiquer-des-activites/6803710_sports-pedestres-quinson-quinson-sentier-du-garde-canal/",
          "label": "More details"
        },
        {
          "url": "gpx/rando_quinson.html?logement=moustiers&lang=EN",
          "label": "GPX route"
        }
      ]
    },
    "de": {
      "name": "Wanderung: Garde-Canal-Pfad",
      "desc": "Auf dem alten Kanalwärterpfad haben Sie die Gelegenheit, in die unteren Schluchten des Verdon einzutauchen und die Kapelle Sainte-Maxime zu erreichen.",
      "links": [
        {
          "url": "https://www.tourisme-alpes-haute-provence.com/pratiquer-des-activites/6803710_sports-pedestres-quinson-quinson-sentier-du-garde-canal/",
          "label": "Weitere Informationen"
        },
        {
          "url": "gpx/rando_quinson.html?logement=moustiers&lang=DE",
          "label": "GPX-Route"
        }
      ]
    },
    "nl": {
      "name": "Wandeling: Garde Canal-pad",
      "desc": "Via het oude kanaalwachterspad krijgt u de kans om de lagere kloven van de Verdon te verkennen en de kapel van Sainte-Maxime te bereiken.",
      "links": [
        {
          "url": "https://www.tourisme-alpes-haute-provence.com/pratiquer-des-activites/6803710_sports-pedestres-quinson-quinson-sentier-du-garde-canal/",
          "label": "Meer informatie"
        },
        {
          "url": "gpx/rando_quinson.html?logement=moustiers&lang=NL",
          "label": "GPX-route"
        }
      ]
    },
    "pano": [
      13.722,
      45.165
    ],
    "scale": 0.7
  },
  {
    "id": "canoe-quinson",
    "cat": "sportaquatique",
    "coords": [
      43.69479634538052,
      6.039627674142737
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/quinson-canoe.jpg",
    "fr": {
      "name": "Location Nautic Verdon",
      "desc": "Remontée en canoë-kayak depuis le Pont du Quinson à Esparron. Coucher de soleil inoubliable.",
      "links": [
        {
          "url": "https://www.location-bateaux-verdon.com/",
          "label": "Plus d'informations"
        },
        {
          "url": "gpx/quinson_gorges_basses.pdf",
          "label": "Parcours détaillé"
        }
      ]
    },
    "en": {
      "name": "Nautic Verdon Rental",
      "desc": "Canoe-kayak journey from Pont du Quinson to Esparron. Unforgettable sunset views.",
      "links": [
        {
          "url": "https://www.location-bateaux-verdon.com/",
          "label": "More details"
        },
        {
          "url": "gpx/quinson_gorges_basses.pdf",
          "label": "GPX route"
        }
      ]
    },
    "de": {
      "name": "Nautic Verdon – Bootsverleih",
      "desc": "Kanu-Kajak-Tour vom Pont du Quinson nach Esparron. Unvergessliche Sonnenuntergänge.",
      "links": [
        {
          "url": "https://www.location-bateaux-verdon.com/",
          "label": "Weitere Informationen"
        },
        {
          "url": "gpx/quinson_gorges_basses.pdf",
          "label": "GPX-Route"
        }
      ]
    },
    "nl": {
      "name": "Nautic Verdon Verhuur",
      "desc": "Kano-kajaktocht van de Pont du Quinson naar Esparron. Onvergetelijke zonsondergangen.",
      "links": [
        {
          "url": "https://www.location-bateaux-verdon.com/",
          "label": "Meer informatie"
        },
        {
          "url": "gpx/quinson_gorges_basses.pdf",
          "label": "GPX-route"
        }
      ]
    },
    "pano": [
      13.516,
      45.542
    ],
    "scale": 0.7
  },
  {
    "id": "lac-esparron",
    "cat": "plage",
    "coords": [
      43.73637930389275,
      5.9671854972839355
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/plage-esparron.jpg",
    "fr": {
      "name": "Lac d'Esparron",
      "desc": "Petit lac sauvage en aval des basses Gorges. Calanques d'eau douce, kayak et baignade tranquille.",
      "url": "https://www.tourisme-alpes-haute-provence.com/grands-espaces-naturels/768346_lac-esparron-de-verdon-le-lac-d-esparron-de-verdon/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Lake Esparron",
      "desc": "Small wild lake downstream from the lower Gorges. Freshwater creeks, kayaking and quiet swimming.",
      "url": "https://www.tourisme-alpes-haute-provence.com/grands-espaces-naturels/768346_lac-esparron-de-verdon-le-lac-d-esparron-de-verdon/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Esparron-See",
      "desc": "Kleiner, wilder See unterhalb der unteren Schluchten. Süßwasserbuchten, Kajakfahren und ruhiges Baden.",
      "url": "https://www.tourisme-alpes-haute-provence.com/grands-espaces-naturels/768346_lac-esparron-de-verdon-le-lac-d-esparron-de-verdon/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Meer van Esparron",
      "desc": "Klein, wild meer stroomafwaarts van de lagere kloven. Zoetwaterkreekjes, kajakken en rustig zwemmen.",
      "url": "https://www.tourisme-alpes-haute-provence.com/grands-espaces-naturels/768346_lac-esparron-de-verdon-le-lac-d-esparron-de-verdon/",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      16.24,
      44.633
    ],
    "scale": 0.5
  },
  {
    "id": "valensole-plateau",
    "cat": "nature",
    "coords": [
      43.838,
      6.002
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/valensole_lavande.jpg",
    "fr": {
      "name": "Plateau de Valensole",
      "desc": "Champs de lavande à perte de vue, floraison début juillet. Distilleries, miel et huile d'olive.",
      "url": "https://www.moustiers.fr/destination-verdon/lavande-plateau-valensole/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Valensole Plateau",
      "desc": "Endless lavender fields, blooming in early July. Distilleries, honey and olive oil.",
      "url": "https://www.moustiers.fr/destination-verdon/lavande-plateau-valensole/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Hochebene von Valensole",
      "desc": "Endlose Lavendelfelder, Blütezeit Anfang Juli. Destillerien, Honig und Olivenöl.",
      "url": "https://www.moustiers.fr/destination-verdon/lavande-plateau-valensole/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Plateau van Valensole",
      "desc": "Eindeloze lavendelvelden, in bloei begin juli. Distilleerderijen, honing en olijfolie.",
      "url": "https://www.moustiers.fr/destination-verdon/lavande-plateau-valensole/",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      28.074,
      45.058
    ],
    "scale": 0.6
  },
  {
    "id": "rando-baudinard",
    "cat": "rando",
    "coords": [
      43.725,
      6.135
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/baudinard-rando.jpg",
    "fr": {
      "name": "Rando : Gorges de Baudinard",
      "desc": "Canyon secret, lac turquoise et barrage de Sainte-Croix. Hors des sentiers battus.",
      "url": "https://www.decathlon-outdoor.com/fr-fr/inspire/france/randonnee-gorges-de-baudinard-verdon",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Hike: Baudinard Gorges",
      "desc": "Secret canyon, turquoise lake and Sainte-Croix dam. Off the beaten path.",
      "url": "https://www.decathlon-outdoor.com/fr-fr/inspire/france/randonnee-gorges-de-baudinard-verdon",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Wanderung: Schlucht von Baudinard",
      "desc": "Geheimer Canyon, türkisfarbener See und der Staudamm von Sainte-Croix. Abseits der ausgetretenen Pfade.",
      "url": "https://www.decathlon-outdoor.com/fr-fr/inspire/france/randonnee-gorges-de-baudinard-verdon",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Wandeling: kloof van Baudinard",
      "desc": "Geheime kloof, turquoise meer en de stuwdam van Sainte-Croix. Verscholen parel, ver van de gebaande paden.",
      "url": "https://www.decathlon-outdoor.com/fr-fr/inspire/france/randonnee-gorges-de-baudinard-verdon",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      17.569,
      45.165
    ],
    "scale": 0.7
  },
  {
    "id": "rando-moustiers",
    "cat": "rando",
    "coords": [
      43.848225476807386,
      6.224269866943359
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/moustiers_chapelle.jpg",
    "fr": {
      "name": "Rando : Visite guidée intéractive",
      "desc": "Deux parcours d'1h30 : un pour les enfants, un pour les adultes avec 15 points d'intérêt en vidéo.",
      "links": [
        {
          "url": "https://visite-moustiers.orpheo.app/desktop.html",
          "label": "Plus d'informations"
        },
        {
          "url": "gpx/rando_moustiers.html",
          "label": "Parcours GPX"
        }
      ]
    },
    "en": {
      "name": "Hike: Interactive guided tour",
      "desc": "Two 1h30 tours: one for children, one for adults, with 15 points of interest in video.",
      "links": [
        {
          "url": "https://visite-moustiers.orpheo.app/desktop.html",
          "label": "More details"
        },
        {
          "url": "gpx/rando_moustiers.html?logement=moustiers&lang=EN",
          "label": "GPX route"
        }
      ]
    },
    "de": {
      "name": "Wanderung: Interaktive Führung",
      "desc": "Zwei Rundgänge von je 1,5 Stunden: einer für Kinder, einer für Erwachsene, mit 15 Sehenswürdigkeiten als Video.",
      "links": [
        {
          "url": "https://visite-moustiers.orpheo.app/desktop.html",
          "label": "Weitere Informationen"
        },
        {
          "url": "gpx/rando_moustiers.html?logement=moustiers&lang=DE",
          "label": "GPX-Strecke"
        }
      ]
    },
    "nl": {
      "name": "Wandeling: interactieve gegidste tour",
      "desc": "Twee tochten van anderhalf uur: één voor kinderen, één voor volwassenen, met 15 bezienswaardigheden in video.",
      "links": [
        {
          "url": "https://visite-moustiers.orpheo.app/desktop.html",
          "label": "Meer informatie"
        },
        {
          "url": "gpx/rando_moustiers.html?logement=moustiers&lang=NL",
          "label": "GPX-route"
        }
      ]
    },
    "pano": [
      45.573,
      48.247
    ],
    "scale": 0.8
  },
  {
    "id": "velo",
    "cat": "velo",
    "coords": [
      43.81976481008344,
      6.225793361663819
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/moustiers-velo.png",
    "fr": {
      "name": "Vélo électriques : location de vélos électriques",
      "desc": "Location de vélos électriques à Moustiers-Sainte-Marie.",
      "url": "https://www.moustiersbikeservices.com/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Electric bikes: electric bike rental shop",
      "desc": "Electric bike rental shop in Moustiers Sainte Marie.",
      "url": "https://www.moustiersbikeservices.com/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "E-Bikes: Elektrofahrrad-Verleih",
      "desc": "Verleih von Elektrofahrrädern in Moustiers-Sainte-Marie.",
      "url": "https://www.moustiersbikeservices.com/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Elektrische fietsen: verhuur van e-bikes",
      "desc": "Verhuur van elektrische fietsen in Moustiers-Sainte-Marie.",
      "url": "https://www.moustiersbikeservices.com/",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      44.591,
      57.492
    ],
    "scale": 1
  },
  {
    "id": "cascade-sillan",
    "cat": "visite",
    "coords": [
      43.563847711852645,
      6.185040470155619
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/cascade-sillan.jpg",
    "fr": {
      "name": "Sillan la cascade",
      "desc": "Sillans-la-Cascade est un village du Var situé à seulement 9 km de Aups, aux portes du parc régional du Verdon. Sa principale curiosité est sa cascade, une superbe cascade de 44 mètres de haut, où la Bresque, se jette dans une magnifique bassin d’un vert bleu rappelant le Verdon. ",
      "url": "https://provence-alpes-cotedazur.com/que-faire/itineraires-randonnee/sillans-la-cascade-la-cascade-sillans-la-cascade-fr-4683501/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Sillans Waterfall",
      "desc": "Sillans-la-Cascade is a village in the Var located just 9 km from Aups, at the gates of the Verdon Regional Park. His main curiosity is his waterfall, a superb waterfall of 44 meters high, where the Bresque, flows into a magnificent basin of a blue green reminiscent of the Verdon.",
      "url": "https://provence-alpes-cotedazur.com/que-faire/itineraires-randonnee/sillans-la-cascade-la-cascade-sillans-la-cascade-fr-4683501/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Wasserfall von Sillans",
      "desc": "Sillans-la-Cascade ist ein Dorf im Var, nur 9 km von Aups entfernt, am Tor zum Regionalpark Verdon. Die Hauptattraktion ist sein Wasserfall: ein prächtiger, 44 Meter hoher Fall, in dem die Bresque in ein malerisches blaugrünes Becken stürzt, das an den Verdon erinnert.",
      "url": "https://provence-alpes-cotedazur.com/que-faire/itineraires-randonnee/sillans-la-cascade-la-cascade-sillans-la-cascade-fr-4683501/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Waterval van Sillans",
      "desc": "Sillans-la-Cascade is een dorpje in de Var, op slechts 9 km van Aups, aan de poorten van het Regionaal Natuurpark Verdon. De belangrijkste attractie is de waterval: een prachtige, 44 meter hoge waterval waar de Bresque neerstort in een schitterend blauwgroen bassin dat doet denken aan de Verdon.",
      "url": "https://provence-alpes-cotedazur.com/que-faire/itineraires-randonnee/sillans-la-cascade-la-cascade-sillans-la-cascade-fr-4683501/",
      "urlLabel": "Meer informatie"
    }
  },
  {
    "id": "visite-quinson",
    "cat": "visite",
    "coords": [
      43.69970261739675,
      6.036880016326905
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/quinson_musee.jpg",
    "fr": {
      "name": "Musées de Préhistoire à Quinson",
      "desc": "Musées de Préhistoire à Quinson: Prenez quelques minutes pour découvrir l'un des plus grands musées de Préhistoire d'Europe, situé à Quinson",
      "url": "https://www.moustiersbikeservices.com/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Prehistory Museums in Quinson",
      "desc": "Prehistory Museums in Quinson: Take a few minutes to discover one of the largest prehistory museums in Europe, located in Quinson",
      "url": "https://www.moustiersbikeservices.com/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Vorgeschichtsmuseum in Quinson",
      "desc": "Museum der Vorgeschichte in Quinson: Nehmen Sie sich ein paar Minuten Zeit, um eines der größten Vorgeschichtsmuseen Europas zu entdecken, das sich in Quinson befindet.",
      "url": "https://www.moustiersbikeservices.com/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Prehistorisch museum in Quinson",
      "desc": "Museum voor prehistorie in Quinson: neem een paar minuten de tijd om een van de grootste prehistorische musea van Europa te ontdekken, gelegen in Quinson.",
      "url": "https://www.moustiersbikeservices.com/",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      14.841,
      46.334
    ],
    "scale": 0.7
  },
  {
    "id": "visite-faience",
    "cat": "visite",
    "coords": [
      43.84594918874863,
      6.221477687358856
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/musee_faience.jpg",
    "fr": {
      "name": "Faïence & ateliers d'artisans",
      "desc": "Flânez dans les ruelles pour découvrir les ateliers et le Musée de la Faïence de Moustiers.",
      "url": "https://www.moustiers.fr/incontournable-moustiers/faience/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Faïence & artisan workshops",
      "desc": "Wander the narrow streets to discover the workshops and the Faïence Museum of Moustiers.",
      "url": "https://www.moustiers.fr/incontournable-moustiers/faience/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Fayence & Handwerksateliers",
      "desc": "Schlendern Sie durch die engen Gassen und entdecken Sie die Werkstätten und das Fayence-Museum von Moustiers.",
      "url": "https://www.moustiers.fr/incontournable-moustiers/faience/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Faience & ambachtelijke ateliers",
      "desc": "Slenter door de smalle straatjes en ontdek de ateliers en het Faience Museum van Moustiers.",
      "url": "https://www.moustiers.fr/incontournable-moustiers/faience/",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      44.538,
      50.903
    ],
    "scale": 0.8,
    "trace": {
      "logements": [
        "moustiers"
      ],
      "coords": [
        [
          43.84717,
          6.22067
        ],
        [
          43.84714,
          6.22075
        ],
        [
          43.84713,
          6.22081
        ],
        [
          43.84714,
          6.22095
        ],
        [
          43.84714,
          6.22102
        ],
        [
          43.84713,
          6.22109
        ],
        [
          43.84708,
          6.22129
        ],
        [
          43.84702,
          6.22141
        ],
        [
          43.847,
          6.22143
        ],
        [
          43.84698,
          6.22145
        ],
        [
          43.84697,
          6.22147
        ],
        [
          43.84684,
          6.22159
        ],
        [
          43.8468,
          6.22162
        ],
        [
          43.84677,
          6.22162
        ],
        [
          43.8467,
          6.22159
        ],
        [
          43.84662,
          6.22154
        ],
        [
          43.84651,
          6.22144
        ],
        [
          43.84638,
          6.22136
        ],
        [
          43.84628,
          6.22132
        ],
        [
          43.84619,
          6.22134
        ],
        [
          43.84614,
          6.22136
        ],
        [
          43.84613,
          6.22137
        ],
        [
          43.84608,
          6.22137
        ],
        [
          43.84604,
          6.2214
        ],
        [
          43.84596,
          6.22138
        ]
      ]
    }
  },
  {
    "id": "etoile",
    "cat": "etoile",
    "coords": [
      43.84853690610675,
      6.225546598434449
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/moustiers-etoile.jpg",
    "fr": {
      "name": "L'étoile suspendue de Moustiers",
      "desc": "La célèbre étoile dorée suspendue entre les deux falaises au-dessus du village.",
      "url": "https://www.moustiers.fr/incontournable-moustiers/moustiers-village-caractere/legende-etoile-moustiers/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "The hanging star of Moustiers",
      "desc": "The famous golden star hanging between the two cliffs above the village.",
      "url": "https://www.moustiers.fr/incontournable-moustiers/moustiers-village-caractere/legende-etoile-moustiers/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Der hängende Stern von Moustiers",
      "desc": "Der berühmte goldene Stern, der zwischen den beiden Felswänden über dem Dorf hängt.",
      "url": "https://www.moustiers.fr/incontournable-moustiers/moustiers-village-caractere/legende-etoile-moustiers/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "De hangende ster van Moustiers",
      "desc": "De beroemde gouden ster die tussen de twee rotswanden boven het dorp hangt.",
      "url": "https://www.moustiers.fr/incontournable-moustiers/moustiers-village-caractere/legende-etoile-moustiers/",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      45.573,
      44.527
    ],
    "scale": 0.8
  },
  {
    "id": "marché-moustiers",
    "cat": "marché",
    "coords": [
      43.846883991020924,
      6.221550107002259
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/marche_moustiers.jpg",
    "fr": {
      "name": "Marché de Moustiers",
      "desc": "Marché hebdomadaire le vendredi de 8h à 12h30",
      "url": "https://www.ville-moustiers-sainte-marie.fr/vivre-a-moustiers/marche/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Moustiers Market",
      "desc": "Weekly Market Friday from 8 a.m. to 12:30 p.m",
      "url": "https://www.ville-moustiers-sainte-marie.fr/vivre-a-moustiers/marche/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Markt von Moustiers",
      "desc": "Wochenmarkt jeden Freitag von 8 bis 12:30 Uhr.",
      "url": "https://www.ville-moustiers-sainte-marie.fr/vivre-a-moustiers/marche/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Markt van Moustiers",
      "desc": "Wekelijkse markt op vrijdag van 8.00 tot 12.30 uur.",
      "url": "https://www.ville-moustiers-sainte-marie.fr/vivre-a-moustiers/marche/",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      45.223,
      51.753
    ],
    "scale": 0.8,
    "trace": {
      "logements": [
        "moustiers"
      ],
      "coords": [
        [
          43.84717,
          6.22067
        ],
        [
          43.84714,
          6.22075
        ],
        [
          43.84713,
          6.22081
        ],
        [
          43.84714,
          6.22095
        ],
        [
          43.84714,
          6.22102
        ],
        [
          43.84713,
          6.22109
        ],
        [
          43.84708,
          6.22129
        ],
        [
          43.84702,
          6.22141
        ],
        [
          43.847,
          6.22143
        ],
        [
          43.84698,
          6.22145
        ],
        [
          43.84697,
          6.22147
        ],
        [
          43.84689,
          6.22155
        ]
      ]
    }
  },
  {
    "id": "marché-salles",
    "cat": "marché",
    "coords": [
      43.77328628967364,
      6.2087345123291025
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/marche_verdon.jpg",
    "fr": {
      "name": "Grand Marché des Salles sur Verdon",
      "desc": "Marché hebdomadaire le jeudi de 8h à 12h30",
      "url": "https://www.parcduverdon.fr/fiche-apidae/marche-provencal-des-salles-sur-verdon/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Salles sur Verdon Market",
      "desc": "Weekly Market Thursday from 8 a.m. to 12:30 p.m",
      "url": "https://www.parcduverdon.fr/fiche-apidae/marche-provencal-des-salles-sur-verdon/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Markt von Les Salles-sur-Verdon",
      "desc": "Wochenmarkt jeden Donnerstag von 8 bis 12:30 Uhr.",
      "url": "https://www.parcduverdon.fr/fiche-apidae/marche-provencal-des-salles-sur-verdon/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Markt van Les Salles-sur-Verdon",
      "desc": "Wekelijkse markt op donderdag van 8.00 tot 12.30 uur.",
      "url": "https://www.parcduverdon.fr/fiche-apidae/marche-provencal-des-salles-sur-verdon/",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      18.994,
      59.113
    ],
    "scale": 1.6,
    "trace": {
      "logements": [
        "salles6",
        "salles8"
      ],
      "coords": [
        [
          43.77269,
          6.20827
        ],
        [
          43.77275,
          6.20832
        ],
        [
          43.77301,
          6.20835
        ],
        [
          43.77311,
          6.20844
        ],
        [
          43.77325,
          6.20856
        ],
        [
          43.77332,
          6.20862
        ],
        [
          43.77327,
          6.20872
        ]
      ]
    }
  },
  {
    "id": "accrobranche-verdon",
    "cat": "nature",
    "coords": [
      43.67905743189998,
      6.221737861633301
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/aups-accrobranche.jpg",
    "fr": {
      "name": "Accrobranche au Verdon",
      "desc": "Parcours aventure dans les arbres près du lac Sainte-Croix. Tyroliennes, ponts de singe, parcours enfants et adultes.",
      "url": "https://www.accro-verdon.fr/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Adventure Park at the Verdon",
      "desc": "Treetop adventure course near Lake Sainte-Croix. Zip-lines, monkey bridges, kids and adult courses.",
      "url": "https://www.accro-verdon.fr/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Kletterpark am Verdon",
      "desc": "Baumwipfelpfad-Abenteuerparcours nahe dem Lac de Sainte-Croix. Seilrutschen, Affenbrücken, Parcours für Kinder und Erwachsene.",
      "url": "https://www.accro-verdon.fr/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Klimpark aan de Verdon",
      "desc": "Avonturenparcours in de boomtoppen bij het Lac de Sainte-Croix. Tokkelbanen, apenbruggen, parcours voor kinderen en volwassenen.",
      "url": "https://www.accro-verdon.fr/",
      "urlLabel": "Meer informatie"
    }
  },
  {
    "id": "plage-margaridon",
    "cat": "plage",
    "coords": [
      43.77390218163457,
      6.20530128479004
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/plage_margaridon.jpg",
    "fr": {
      "name": "Plage de Margaridon",
      "desc": "Base nautique complète : voile, kayak, paddle, pédalo. Plage surveillée en été.",
      "url": "https://www.google.com/maps/place/Plage+de+Margaridon+(Les+Salles-sur-Verdon)/@43.7739201,6.2053012,17z/data=!4m14!1m7!3m6!1s0x12cbe5b4f8487e19:0x6f75bcda87a4d6c1!2sPlage+de+Margaridon+(Les+Salles-sur-Verdon)!8m2!3d43.7739153!4d6.2052647!16s%2Fg%2F11hk0_j7xc!3m5!1s0x12cbe5b4f8487e19:0x6f75bcda87a4d6c1!8m2!3d43.7739153!4d6.2052647!16s%2Fg%2F11hk0_j7xc?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Margaridon Beach",
      "desc": "Full water sports base: sailing, kayaking, paddleboarding, pedal boats. Supervised beach in summer.",
      "url": "https://www.google.com/maps/place/Plage+de+Margaridon+(Les+Salles-sur-Verdon)/@43.7739201,6.2053012,17z/data=!4m14!1m7!3m6!1s0x12cbe5b4f8487e19:0x6f75bcda87a4d6c1!2sPlage+de+Margaridon+(Les+Salles-sur-Verdon)!8m2!3d43.7739153!4d6.2052647!16s%2Fg%2F11hk0_j7xc!3m5!1s0x12cbe5b4f8487e19:0x6f75bcda87a4d6c1!8m2!3d43.7739153!4d6.2052647!16s%2Fg%2F11hk0_j7xc?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Strand von Margaridon",
      "desc": "Komplette Wassersportbasis: Segeln, Kajak, Stand-up-Paddling, Tretboote. Im Sommer bewachter Strand.",
      "url": "https://www.google.com/maps/place/Plage+de+Margaridon+(Les+Salles-sur-Verdon)/@43.7739201,6.2053012,17z/data=!4m14!1m7!3m6!1s0x12cbe5b4f8487e19:0x6f75bcda87a4d6c1!2sPlage+de+Margaridon+(Les+Salles-sur-Verdon)!8m2!3d43.7739153!4d6.2052647!16s%2Fg%2F11hk0_j7xc!3m5!1s0x12cbe5b4f8487e19:0x6f75bcda87a4d6c1!8m2!3d43.7739153!4d6.2052647!16s%2Fg%2F11hk0_j7xc?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Strand van Margaridon",
      "desc": "Complete watersportbasis: zeilen, kajakken, suppen, waterfietsen. In de zomer bewaakt strand.",
      "url": "https://www.google.com/maps/place/Plage+de+Margaridon+(Les+Salles-sur-Verdon)/@43.7739201,6.2053012,17z/data=!4m14!1m7!3m6!1s0x12cbe5b4f8487e19:0x6f75bcda87a4d6c1!2sPlage+de+Margaridon+(Les+Salles-sur-Verdon)!8m2!3d43.7739153!4d6.2052647!16s%2Fg%2F11hk0_j7xc!3m5!1s0x12cbe5b4f8487e19:0x6f75bcda87a4d6c1!8m2!3d43.7739153!4d6.2052647!16s%2Fg%2F11hk0_j7xc?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      20.087,
      55.26
    ],
    "traceAutoShow": true,
    "trace": {
      "logements": [
        "salles6",
        "salles8"
      ],
      "coords": [
        [
          43.77414,
          6.20534
        ],
        [
          43.774,
          6.20614
        ],
        [
          43.77399,
          6.2062
        ],
        [
          43.77407,
          6.2063
        ],
        [
          43.77406,
          6.20638
        ],
        [
          43.77391,
          6.20646
        ],
        [
          43.77391,
          6.20654
        ],
        [
          43.77393,
          6.20669
        ],
        [
          43.77386,
          6.20717
        ],
        [
          43.77398,
          6.20726
        ],
        [
          43.77387,
          6.20797
        ],
        [
          43.77376,
          6.20801
        ],
        [
          43.77387,
          6.20809
        ],
        [
          43.7739,
          6.20821
        ],
        [
          43.77354,
          6.2088
        ],
        [
          43.77301,
          6.20835
        ],
        [
          43.77275,
          6.20832
        ],
        [
          43.77269,
          6.20828
        ]
      ]
    },
    "scale": 1.3,
    "backintime": {
      "ville": [
        "salles"
      ],
      "coords": [
        51.198,
        34.538
      ]
    }
  },
  {
    "id": "plage-chabassole",
    "cat": "plage",
    "coords": [
      43.79640388208689,
      6.233131434934004
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/plage-chabassole.jpg",
    "fr": {
      "name": "Plage de Chabassole",
      "desc": "Base nautique : kayak, paddle, pédalo. Plage surveillée en été.",
      "url": "https://www.lacs-gorges-verdon.fr/aquatique/nautisme/1789-location-chabassole-plage.html",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Chabassole Beach",
      "desc": "Water sports base: kayaking, paddleboarding, pedal boats. Supervised beach in summer.",
      "url": "https://www.lacs-gorges-verdon.fr/aquatique/nautisme/1789-location-chabassole-plage.html",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Strand von Chabassole",
      "desc": "Wassersportbasis: Kajak, Stand-up-Paddling, Tretboote. Im Sommer bewachter Strand.",
      "url": "https://www.lacs-gorges-verdon.fr/aquatique/nautisme/1789-location-chabassole-plage.html",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Strand van Chabassole",
      "desc": "Watersportbasis: kajakken, suppen, waterfietsen. In de zomer bewaakt strand.",
      "url": "https://www.lacs-gorges-verdon.fr/aquatique/nautisme/1789-location-chabassole-plage.html",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      41.111,
      62.912
    ],
    "scale": 1.3
  },
  {
    "id": "plage-salles",
    "cat": "plage",
    "coords": [
      43.77124,
      6.20809
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/plage_costebelle/1.png",
    "fr": {
      "name": "Plage Costebelle",
      "desc": "Plage familiale avec jeux et plateforme flottante pour plonger en haute saison et location de matériel. Plage surveillée en été.",
      "url": "galerie.html?folder=plage_costebelle&image=1.png",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Costebelle Beach",
      "desc": "Family beach with games and floating platform to dive in high season and equipment rental. Beach monitored in summer.",
      "url": "galerie.html?lang=EN&folder=plage_costebelle&image=1.png",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Strand Costebelle",
      "desc": "Familienstrand mit Spielgeräten und schwimmender Plattform zum Springen in der Hochsaison sowie Materialverleih. Im Sommer bewachter Strand.",
      "url": "galerie.html?lang=DE&folder=plage_costebelle&image=1.png",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Strand Costebelle",
      "desc": "Familiestrand met speeltoestellen en een drijvend platform om in het hoogseizoen vanaf te duiken, plus materiaalverhuur. In de zomer bewaakt strand.",
      "url": "galerie.html?lang=NL&folder=plage_costebelle&image=1.png",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      18.52,
      56.217
    ],
    "traceAutoShow": true,
    "trace": {
      "logements": [
        "salles6",
        "salles8"
      ],
      "coords": [
        [
          43.77264860239855,
          6.208356320858003
        ],
        [
          43.77243361745658,
          6.208576261997224
        ],
        [
          43.772425870237036,
          6.20865136384964
        ],
        [
          43.77237745009216,
          6.208678185939789
        ],
        [
          43.77220120043377,
          6.208624541759492
        ],
        [
          43.772092738847334,
          6.208195388317108
        ],
        [
          43.77205,
          6.20764
        ],
        [
          43.77195,
          6.20774
        ],
        [
          43.77192,
          6.2079
        ],
        [
          43.77178,
          6.20795
        ],
        [
          43.77165,
          6.20785
        ],
        [
          43.77161,
          6.20793
        ],
        [
          43.77161,
          6.20806
        ],
        [
          43.7715,
          6.20798
        ],
        [
          43.77132,
          6.20789
        ],
        [
          43.77129,
          6.20806
        ],
        [
          43.77123,
          6.2082
        ]
      ]
    },
    "scale": 1.5,
    "backintime": {
      "ville": [
        "salles"
      ],
      "coords": [
        57.396,
        51.01
      ]
    }
  },
  {
    "id": "base-salles",
    "cat": "sportaquatique",
    "coords": [
      43.77092724858371,
      6.208562850952149
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/plage-verdon-loisir.jpg",
    "fr": {
      "name": "Base nautique Verdon Loisir",
      "desc": "Base nautique complète : voile, kayak, paddle, pédalo. Plage surveillée en été.",
      "url": "https://verdon-loisirs.com/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Verdon Loisir Water Sports Base",
      "desc": "Full water sports base: sailing, kayaking, paddleboarding, pedal boats. Supervised beach in summer.",
      "url": "https://verdon-loisirs.com/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Wassersportbasis Verdon Loisir",
      "desc": "Komplette Wassersportbasis: Segeln, Kajak, Stand-up-Paddling, Tretboote. Im Sommer bewachter Strand.",
      "url": "https://verdon-loisirs.com/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Watersportbasis Verdon Loisir",
      "desc": "Complete watersportbasis: zeilen, kajakken, suppen, waterfietsen. In de zomer bewaakt strand.",
      "url": "https://verdon-loisirs.com/",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      18.058,
      56.111
    ],
    "trace": {
      "logements": [
        "salles6",
        "salles8"
      ],
      "coords": [
        [
          43.77264860239855,
          6.208356320858003
        ],
        [
          43.77243361745658,
          6.208576261997224
        ],
        [
          43.772425870237036,
          6.20865136384964
        ],
        [
          43.77237745009216,
          6.208678185939789
        ],
        [
          43.77220120043377,
          6.208624541759492
        ],
        [
          43.772092738847334,
          6.208195388317108
        ],
        [
          43.77205,
          6.20764
        ],
        [
          43.77195,
          6.20774
        ],
        [
          43.77192,
          6.2079
        ],
        [
          43.77178,
          6.20795
        ],
        [
          43.77165,
          6.20785
        ],
        [
          43.77161,
          6.20793
        ],
        [
          43.77161,
          6.20806
        ],
        [
          43.7715,
          6.20798
        ],
        [
          43.77132,
          6.20789
        ],
        [
          43.77129,
          6.20806
        ],
        [
          43.77123,
          6.2082
        ]
      ]
    },
    "scale": 1.5
  },
  {
    "id": "plage-sainte-croix",
    "cat": "plage",
    "coords": [
      43.76010700609544,
      6.154017448425293
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/plage-sainte-croix-du-verdon.jpg",
    "fr": {
      "name": "Plage du village de Sainte-Croix",
      "desc": "Plage du village de Sainte-Croix-du-Verdon, à l'extrémité ouest du lac. Eaux turquoise, cadre paisible.",
      "url": "https://lesgorgesduverdon.fr/sainte-croix-du-verdon/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Sainte-Croix Village Beach",
      "desc": "Beach at Sainte-Croix-du-Verdon village, western end of the lake. Turquoise waters, peaceful setting.",
      "url": "https://lesgorgesduverdon.fr/sainte-croix-du-verdon/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Dorfstrand von Sainte-Croix",
      "desc": "Strand im Dorf Sainte-Croix-du-Verdon, am westlichen Ende des Sees. Türkisfarbenes Wasser, ruhige Umgebung.",
      "url": "https://lesgorgesduverdon.fr/sainte-croix-du-verdon/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Dorpsstrand van Sainte-Croix",
      "desc": "Strand bij het dorp Sainte-Croix-du-Verdon, aan de westelijke oever van het meer. Turquoise water, rustige omgeving.",
      "url": "https://lesgorgesduverdon.fr/sainte-croix-du-verdon/",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      18.072,
      47.29
    ],
    "scale": 0.9
  },
  {
    "id": "plage-bauduen",
    "cat": "plage",
    "coords": [
      43.732080727705345,
      6.1771488189697275
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/plage-bauduen.jpg",
    "fr": {
      "name": "Plage de Bauduen",
      "desc": "Grande plage aménagée côté Var du lac Sainte-Croix. Port de plaisance, location de bateaux.",
      "url": "https://www.lacs-gorges-verdon.fr/aquatique/bagnades-plages/5601-plage-de-bauduen.html",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Bauduen Beach",
      "desc": "Large equipped beach on the Var side of Lake Sainte-Croix. Marina and boat rentals.",
      "url": "https://www.lacs-gorges-verdon.fr/aquatique/bagnades-plages/5601-plage-de-bauduen.html",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Strand von Bauduen",
      "desc": "Großer, gut ausgestatteter Strand auf der Var-Seite des Lac de Sainte-Croix. Yachthafen und Bootsverleih.",
      "url": "https://www.lacs-gorges-verdon.fr/aquatique/bagnades-plages/5601-plage-de-bauduen.html",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Strand van Bauduen",
      "desc": "Groot, goed uitgerust strand aan de Var-zijde van het Lac de Sainte-Croix. Jachthaven en bootverhuur.",
      "url": "https://www.lacs-gorges-verdon.fr/aquatique/bagnades-plages/5601-plage-de-bauduen.html",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      8.77,
      45.696
    ],
    "scale": 0.7
  },
  {
    "id": "plage-galetas",
    "cat": "plage",
    "coords": [
      43.80091964899584,
      6.245459318161012
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/plage-galetas.jpg",
    "fr": {
      "name": "Plage du Galetas",
      "desc": "Plage aménagée avec baignade surveillée (juil-août). Canoës, pédalos, bateaux électriques.",
      "url": "https://www.lacs-gorges-verdon.fr/aquatique/bagnades-plages/4519-plage-du-galetas.html",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Galetas Beach",
      "desc": "Equipped beach with supervised swimming (July-August). Canoes, pedal boats, electric boats.",
      "url": "https://www.lacs-gorges-verdon.fr/aquatique/bagnades-plages/4519-plage-du-galetas.html",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Strand von Galetas",
      "desc": "Ausgestatteter Strand mit bewachtem Badebereich (Juli–August). Kanus, Tretboote, Elektroboote.",
      "url": "https://www.lacs-gorges-verdon.fr/aquatique/bagnades-plages/4519-plage-du-galetas.html",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Strand van Galetas",
      "desc": "Uitgerust strand met bewaakt zwemgedeelte (juli-augustus). Kano's, waterfietsen, elektrische boten.",
      "url": "https://www.lacs-gorges-verdon.fr/aquatique/bagnades-plages/4519-plage-du-galetas.html",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      47.111,
      63.124
    ],
    "scale": 1.3
  },
  {
    "id": "plage-quinson",
    "cat": "plage",
    "coords": [
      43.69390328311974,
      6.037218861795549
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/plage-quinson.jpg",
    "fr": {
      "name": "Montmeyan plage",
      "desc": "Grande plage aménagée à côté du pont de Quinson.",
      "url": "https://www.la-provence-verte.net/activites/nature-montmeyan-plage-de-montmeyan-au-lac-de-quinson_1155.html",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Montmeyan Beach",
      "desc": "Large beach area next to the Quinson bridge.",
      "url": "https://www.la-provence-verte.net/activites/nature-montmeyan-plage-de-montmeyan-au-lac-de-quinson_1155.html",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Strand Montmeyan",
      "desc": "Großes Strandgelände direkt an der Brücke von Quinson.",
      "url": "https://www.la-provence-verte.net/activites/nature-montmeyan-plage-de-montmeyan-au-lac-de-quinson_1155.html",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Strand Montmeyan",
      "desc": "Groot strandgebied naast de brug van Quinson.",
      "url": "https://www.la-provence-verte.net/activites/nature-montmeyan-plage-de-montmeyan-au-lac-de-quinson_1155.html",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      14.072,
      45.165
    ],
    "scale": 0.7
  },
  {
    "id": "saut-elastique",
    "cat": "sensations",
    "coords": [
      43.73022980298448,
      6.387080679395402
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/artuby-saut.jpg",
    "fr": {
      "name": "Saut à l'élastique",
      "desc": "Le plus haut pont d'Europe : 182 m d'adrénaline vous attendent lors de votre saut en élastique.",
      "url": "https://www.latitude-challenge.fr/elastique",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Elastic jump",
      "desc": "The highest bridge in Europe: 182 m of adrenaline await you during your elastic jump.",
      "url": "https://www.latitude-challenge.fr/elastique",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Bungee-Sprung",
      "desc": "Die höchste Brücke Europas: 182 m Adrenalin erwarten Sie bei Ihrem Bungee-Sprung.",
      "url": "https://www.latitude-challenge.fr/elastique",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Bungeejumpen",
      "desc": "De hoogste brug van Europa: 182 m adrenaline wacht op u tijdens uw bungeesprong.",
      "url": "https://www.latitude-challenge.fr/elastique",
      "urlLabel": "Meer informatie"
    }
  },
  {
    "id": "canoe-galetas-1",
    "cat": "sportaquatique",
    "coords": [
      43.80133973391126,
      6.248624324798585
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/plage-gorges.jpg",
    "fr": {
      "name": "MYC Plage - Location de Pédalos",
      "desc": "Remontée en canoë-kayak depuis le Pont du Galetas dans les gorges. Coucher de soleil inoubliable.",
      "url": "https://mycplage.fr/reservation-pedalo/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "MYC Beach - Kayak rental",
      "desc": "Canoe-kayak journey from Pont du Galetas into the gorges. Unforgettable sunset views.",
      "url": "https://mycplage.fr/reservation-pedalo/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "MYC Plage – Kajakverleih",
      "desc": "Kanu-Kajak-Tour vom Pont du Galetas in die Schluchten. Unvergessliche Sonnenuntergänge.",
      "url": "https://mycplage.fr/reservation-pedalo/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "MYC Plage - Kajakverhuur",
      "desc": "Kano-kajaktocht vanaf de Pont du Galetas de kloven in. Onvergetelijke zonsondergangen.",
      "url": "https://mycplage.fr/reservation-pedalo/",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      48.133,
      62.38
    ],
    "scale": 1.2
  },
  {
    "id": "canoe-galetas-2",
    "cat": "sportaquatique",
    "coords": [
      43.803081990049286,
      6.246886253356934
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/plage-gorges2.png",
    "fr": {
      "name": "Base nautique de l’Étoile",
      "desc": "Remontée en canoë-kayak depuis le Pont du Galetas dans les gorges.Réservez votre bateau électrique, pédalo ou canoë en ligne",
      "url": "https://base-nautique-etoile.fr/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Nautical base l'Etoile",
      "desc": "Canoe-kayak journey from Pont du Galetas into the gorges. book your electric boat, pedal boat or canoe online",
      "url": "https://base-nautique-etoile.fr/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Wassersportbasis l'Étoile",
      "desc": "Kanu-Kajak-Tour vom Pont du Galetas in die Schluchten. Buchen Sie Ihr Elektroboot, Tretboot oder Kanu online.",
      "url": "https://base-nautique-etoile.fr/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Watersportbasis l'Étoile",
      "desc": "Kano-kajaktocht vanaf de Pont du Galetas de kloven in. Boek uw elektrische boot, waterfiets of kano online.",
      "url": "https://base-nautique-etoile.fr/",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      47.937,
      60.149
    ],
    "scale": 1.1
  },
  {
    "id": "base-artignosc",
    "cat": "sportaquatique",
    "coords": [
      43.7201611920567,
      6.090223789215088
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/plage-artignosc.jpg",
    "fr": {
      "name": "Base Nautique d´Artignosc",
      "desc": "Location de canoë-kayak depuis la plage d’Artignosc",
      "url": "https://base-nautique-artignosc.fr/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Canoeing in Artignosc",
      "desc": "Canoe-kayak journey Canoe from Artignosc beach",
      "url": "https://base-nautique-artignosc.fr/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Kanufahren in Artignosc",
      "desc": "Kanu-Kajak-Tour ab dem Strand von Artignosc.",
      "url": "https://base-nautique-artignosc.fr/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Kanoën in Artignosc",
      "desc": "Kano-kajaktocht vanaf het strand van Artignosc.",
      "url": "https://base-nautique-artignosc.fr/",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      14.072,
      47.078
    ],
    "scale": 0.8
  },
  {
    "id": "base-cadeno-moustiers",
    "cat": "sportaquatique",
    "coords": [
      43.804959,
      6.229093
    ],
    "stars": 2,
    "img": "https://static.apidae-tourisme.com/filestore/objets-touristiques/images/13/72/18499597-diaporama.jpg",
    "fr": {
      "name": "Base nautique La Cadeno",
      "desc": "Type : Location nautique. Pédalos, canoës, kayaks et paddles sur le lac de Sainte-Croix et dans les Gorges du Verdon. Plage, transats, snack et buvette sur place. Ouvert du 13 juin au 13 septembre.",
      "url": "https://www.moustiers.fr/fiche/base-nautique-la-cadeno/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "La Cadeno Water Sports Base",
      "desc": "Type: Boat rental. Pedal boats, canoes, kayaks and paddleboards on Lac de Sainte-Croix and in the Verdon Gorges. Beach, sun loungers and snack bar on site. Open June 13 to September 13.",
      "url": "https://www.moustiers.fr/en/fiche/water-sports-centre-la-cadeno/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Wassersportbasis La Cadeno",
      "desc": "Art: Bootsverleih. Tretboote, Kanus, Kajaks und Paddleboards auf dem Lac de Sainte-Croix und in den Verdonschluchten. Strand, Liegestühle und Snackbar vor Ort. Geöffnet vom 13. Juni bis 13. September.",
      "url": "https://www.moustiers.fr/en/fiche/water-sports-centre-la-cadeno/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Watersportbasis La Cadeno",
      "desc": "Type: bootverhuur. Waterfietsen, kano's, kajaks en suppen op het Lac de Sainte-Croix en in de Gorges du Verdon. Strand, ligstoelen en snackbar ter plaatse. Geopend van 13 juni tot 13 september.",
      "url": "https://www.moustiers.fr/en/fiche/water-sports-centre-la-cadeno/",
      "urlLabel": "Meer informatie"
    }
  },
  {
    "id": "aiguines-table-orientation",
    "cat": "visite",
    "coords": [
      43.776906952666536,
      6.243630051612855
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/aiguines_orientation.jpg",
    "fr": {
      "name": "Aiguines: Table d'orientation",
      "desc": "Point de vue sur les collines du haut-var depuis la table d'orientation en céramique avec un banc à l'ombre.",
      "url": "https://provence-alpes-cotedazur.com/decouvrir/espaces-naturels/patrimoine-naturel/point-de-vue-de-la-chapelle-saint-pierre-aiguines-fr-3346977/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Aiguines: Orientation table",
      "desc": "Viewpoint overlooking the hills of the upper Var from the ceramic orientation table with a bench in the shade.",
      "url": "https://provence-alpes-cotedazur.com/decouvrir/espaces-naturels/patrimoine-naturel/point-de-vue-de-la-chapelle-saint-pierre-aiguines-fr-3346977/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Aiguines: Orientierungstafel",
      "desc": "Aussichtspunkt über die Hügel des oberen Var, von der keramischen Orientierungstafel mit schattiger Sitzbank aus.",
      "url": "https://provence-alpes-cotedazur.com/decouvrir/espaces-naturels/patrimoine-naturel/point-de-vue-de-la-chapelle-saint-pierre-aiguines-fr-3346977/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Aiguines: oriëntatietafel",
      "desc": "Uitzicht over de heuvels van de haute-Var vanaf de keramische oriëntatietafel, met een bankje in de schaduw.",
      "url": "https://provence-alpes-cotedazur.com/decouvrir/espaces-naturels/patrimoine-naturel/point-de-vue-de-la-chapelle-saint-pierre-aiguines-fr-3346977/",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      1.898,
      92.136
    ],
    "scale": 2.5
  },
  {
    "id": "aiguines",
    "cat": "visite",
    "coords": [
      43.77355643720357,
      6.241390407085419
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/aiguines-chateau.jpeg",
    "fr": {
      "name": "Aiguines",
      "desc": "Village perché face au lac Sainte-Croix. Château Renaissance, ruelles fleuries, tourneurs sur bois et porte des gorges.",
      "url": "https://www.google.com/maps/search/visiter+aiguines/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Aiguines",
      "desc": "Hilltop village overlooking Lake Sainte-Croix. Renaissance château, flower-lined streets, woodturners.",
      "url": "https://www.google.com/maps/search/visiter+aiguines/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Aiguines",
      "desc": "Hoch gelegenes Dorf mit Blick auf den Lac de Sainte-Croix. Renaissance-Schloss, blumengesäumte Gassen, Holzdrechsler.",
      "url": "https://www.google.com/maps/search/visiter+aiguines/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Aiguines",
      "desc": "Hooggelegen dorp met uitzicht op het Lac de Sainte-Croix. Renaissancekasteel, met bloemen omzoomde straatjes, houtdraaiers.",
      "url": "https://www.google.com/maps/search/visiter+aiguines/",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      4.405,
      49.841
    ],
    "scale": 0.9
  },
  {
    "id": "ordures-decheterie",
    "cat": "ordures",
    "coords": [
      43.815923,
      6.226185
    ],
    "stars": 1,
    "img": "https://sitmahp.geosphere.fr/donnees/photos/PAA/OM/DECHETERIE/moustier",
    "fr": {
      "name": "Déchèterie de Moustiers",
      "desc": "Déchèterie intercommunale, lieu-dit Saint-Clair, D957 vers Les Salles. Bois, déchets verts, cartons, gravats, encombrants, ferraille, électroménager, ampoules. Mar/jeu/sam 8h30-12h, mer/ven 13h30-17h. Colonnes verre, papier et emballages sur place. Tél 04 92 79 81 67.",
      "url": "https://maps.google.com/?q=43.815923,6.226185",
      "urlLabel": "Y aller"
    },
    "en": {
      "name": "Moustiers recycling centre",
      "desc": "Intercommunal recycling centre, Saint-Clair, D957 towards Les Salles. Wood, garden waste, cardboard, rubble, bulky items, scrap metal, appliances, bulbs. Tue/Thu/Sat 8:30am-12pm, Wed/Fri 1:30-5pm. Glass, paper and packaging bins on site. Tel +33 4 92 79 81 67.",
      "url": "https://maps.google.com/?q=43.815923,6.226185",
      "urlLabel": "Directions"
    },
    "de": {
      "name": "Wertstoffhof Moustiers",
      "desc": "Interkommunaler Wertstoffhof, Saint-Clair, D957 Richtung Les Salles. Holz, Grünabfälle, Kartons, Bauschutt, Sperrmüll, Schrott, Elektrogeräte, Lampen. Di/Do/Sa 8:30–12 Uhr, Mi/Fr 13:30–17 Uhr. Container für Glas, Papier und Verpackungen vor Ort. Tel. +33 4 92 79 81 67.",
      "url": "https://maps.google.com/?q=43.815923,6.226185",
      "urlLabel": "Anfahrt"
    },
    "nl": {
      "name": "Milieustraat Moustiers",
      "desc": "Intercommunale milieustraat, Saint-Clair, D957 richting Les Salles. Hout, tuinafval, karton, puin, grofvuil, schroot, apparatuur, lampen. Di/do/za 8.30-12.00 uur, wo/vr 13.30-17.00 uur. Containers voor glas, papier en verpakkingen ter plaatse. Tel. +33 4 92 79 81 67.",
      "url": "https://maps.google.com/?q=43.815923,6.226185",
      "urlLabel": "Route"
    }
  },
  {
    "id": "ordures-16pct",
    "cat": "ordures",
    "coords": [
      43.841146,
      6.210743
    ],
    "stars": 1,
    "img": "https://sitmahp.geosphere.fr/donnees/photos/PAA/OM/04135/20250127135343.jpg",
    "fr": {
      "name": "Tri – 16 %",
      "desc": "Colonnes de tri : ordures ménagères, emballages, papier, verre. Colonnes aériennes.",
      "url": "https://maps.google.com/?q=43.841146,6.210743",
      "urlLabel": "Y aller"
    },
    "en": {
      "name": "Recycling – 16 %",
      "desc": "Sorting bins: household waste, packaging, paper, glass. Above-ground bins.",
      "url": "https://maps.google.com/?q=43.841146,6.210743",
      "urlLabel": "Directions"
    },
    "de": {
      "name": "Recycling – 16 %",
      "desc": "Sortierbehälter: Hausmüll, Verpackungen, Papier, Glas. Oberirdische Container.",
      "url": "https://maps.google.com/?q=43.841146,6.210743",
      "urlLabel": "Anfahrt"
    },
    "nl": {
      "name": "Recycling – 16 %",
      "desc": "Sorteercontainers: huisvuil, verpakkingen, papier, glas. Bovengrondse containers.",
      "url": "https://maps.google.com/?q=43.841146,6.210743",
      "urlLabel": "Route"
    }
  },
  {
    "id": "ordures-camping-car",
    "cat": "ordures",
    "coords": [
      43.843591,
      6.218806
    ],
    "stars": 1,
    "img": "https://sitmahp.geosphere.fr/donnees/photos/PAA/OM/04135/20250127141050.jpg",
    "fr": {
      "name": "Tri – Aire de camping-car",
      "desc": "Colonnes de tri : ordures ménagères, emballages, papier, verre. Colonnes aériennes.",
      "url": "https://maps.google.com/?q=43.843591,6.218806",
      "urlLabel": "Y aller"
    },
    "en": {
      "name": "Recycling – Aire de camping-car",
      "desc": "Sorting bins: household waste, packaging, paper, glass. Above-ground bins.",
      "url": "https://maps.google.com/?q=43.843591,6.218806",
      "urlLabel": "Directions"
    },
    "de": {
      "name": "Recycling – Aire de camping-car",
      "desc": "Sortierbehälter: Hausmüll, Verpackungen, Papier, Glas. Oberirdische Container.",
      "url": "https://maps.google.com/?q=43.843591,6.218806",
      "urlLabel": "Anfahrt"
    },
    "nl": {
      "name": "Recycling – Aire de camping-car",
      "desc": "Sorteercontainers: huisvuil, verpakkingen, papier, glas. Bovengrondse containers.",
      "url": "https://maps.google.com/?q=43.843591,6.218806",
      "urlLabel": "Route"
    },
    "trace": {
      "logements": [
        "moustiers"
      ],
      "coords": [
        [
          43.84717,
          6.22067
        ],
        [
          43.84714,
          6.22075
        ],
        [
          43.84713,
          6.22081
        ],
        [
          43.84714,
          6.22095
        ],
        [
          43.84714,
          6.22102
        ],
        [
          43.84713,
          6.22109
        ],
        [
          43.84708,
          6.22129
        ],
        [
          43.84702,
          6.22141
        ],
        [
          43.847,
          6.22143
        ],
        [
          43.84698,
          6.22145
        ],
        [
          43.84697,
          6.22147
        ],
        [
          43.84684,
          6.22159
        ],
        [
          43.8468,
          6.22162
        ],
        [
          43.84677,
          6.22162
        ],
        [
          43.8467,
          6.22159
        ],
        [
          43.84662,
          6.22154
        ],
        [
          43.84651,
          6.22144
        ],
        [
          43.84638,
          6.22136
        ],
        [
          43.84628,
          6.22132
        ],
        [
          43.84619,
          6.22134
        ],
        [
          43.84614,
          6.22136
        ],
        [
          43.84613,
          6.22137
        ],
        [
          43.84608,
          6.22137
        ],
        [
          43.84603,
          6.22136
        ],
        [
          43.84594,
          6.22131
        ],
        [
          43.84583,
          6.22125
        ],
        [
          43.84576,
          6.22122
        ],
        [
          43.84563,
          6.22121
        ],
        [
          43.84547,
          6.2212
        ],
        [
          43.84546,
          6.22116
        ],
        [
          43.84548,
          6.22111
        ],
        [
          43.84565,
          6.22113
        ],
        [
          43.84568,
          6.22109
        ],
        [
          43.84565,
          6.22105
        ],
        [
          43.8455,
          6.22102
        ],
        [
          43.84529,
          6.22095
        ],
        [
          43.84502,
          6.22087
        ],
        [
          43.84471,
          6.2207
        ],
        [
          43.84457,
          6.22063
        ],
        [
          43.84455,
          6.22062
        ],
        [
          43.84445,
          6.22055
        ],
        [
          43.84437,
          6.22046
        ],
        [
          43.84429,
          6.22036
        ],
        [
          43.84393,
          6.22001
        ],
        [
          43.84384,
          6.21992
        ],
        [
          43.84371,
          6.21978
        ],
        [
          43.8436,
          6.21965
        ],
        [
          43.84359,
          6.21962
        ],
        [
          43.84358,
          6.21961
        ],
        [
          43.84353,
          6.21953
        ],
        [
          43.84351,
          6.21949
        ],
        [
          43.84349,
          6.21945
        ],
        [
          43.84345,
          6.21925
        ],
        [
          43.84344,
          6.21919
        ],
        [
          43.84364,
          6.21904
        ],
        [
          43.84368,
          6.21897
        ],
        [
          43.8437,
          6.21888
        ],
        [
          43.8437,
          6.21882
        ],
        [
          43.84362,
          6.21875
        ]
      ]
    }
  },
  {
    "id": "ordures-cimetiere",
    "cat": "ordures",
    "coords": [
      43.844103,
      6.222923
    ],
    "stars": 1,
    "img": "https://sitmahp.geosphere.fr/donnees/photos/PAA/OM/04135/20250127141905.jpg",
    "fr": {
      "name": "Tri – Cimetière",
      "desc": "Colonnes de tri : ordures ménagères, emballages, papier, carton, verre, déchets verts (compostage). Colonnes aériennes.",
      "url": "https://maps.google.com/?q=43.844103,6.222923",
      "urlLabel": "Y aller"
    },
    "en": {
      "name": "Recycling – Cimetière",
      "desc": "Sorting bins: household waste, packaging, paper, cardboard, glass, garden waste (composting). Above-ground bins.",
      "url": "https://maps.google.com/?q=43.844103,6.222923",
      "urlLabel": "Directions"
    },
    "de": {
      "name": "Recycling – Cimetière",
      "desc": "Sortierbehälter: Hausmüll, Verpackungen, Papier, Karton, Glas, Grünabfälle (Kompostierung). Oberirdische Container.",
      "url": "https://maps.google.com/?q=43.844103,6.222923",
      "urlLabel": "Anfahrt"
    },
    "nl": {
      "name": "Recycling – Cimetière",
      "desc": "Sorteercontainers: huisvuil, verpakkingen, papier, karton, glas, tuinafval (compostering). Bovengrondse containers.",
      "url": "https://maps.google.com/?q=43.844103,6.222923",
      "urlLabel": "Route"
    },
    "trace": {
      "logements": [
        "moustiers"
      ],
      "coords": [
        [
          43.84717,
          6.22067
        ],
        [
          43.84714,
          6.22075
        ],
        [
          43.84713,
          6.22081
        ],
        [
          43.84714,
          6.22095
        ],
        [
          43.84714,
          6.22102
        ],
        [
          43.84713,
          6.22109
        ],
        [
          43.84708,
          6.22129
        ],
        [
          43.84702,
          6.22141
        ],
        [
          43.847,
          6.22143
        ],
        [
          43.84698,
          6.22145
        ],
        [
          43.84697,
          6.22147
        ],
        [
          43.84684,
          6.22159
        ],
        [
          43.8468,
          6.22162
        ],
        [
          43.84676,
          6.22173
        ],
        [
          43.84669,
          6.22189
        ],
        [
          43.84662,
          6.22175
        ],
        [
          43.84657,
          6.2218
        ],
        [
          43.84654,
          6.22181
        ],
        [
          43.8465,
          6.22185
        ],
        [
          43.84645,
          6.22182
        ],
        [
          43.8464,
          6.2219
        ],
        [
          43.8463,
          6.22187
        ],
        [
          43.84619,
          6.22186
        ],
        [
          43.84611,
          6.22191
        ],
        [
          43.84595,
          6.22204
        ],
        [
          43.84586,
          6.22216
        ],
        [
          43.84584,
          6.22218
        ],
        [
          43.84574,
          6.22223
        ],
        [
          43.84567,
          6.22224
        ],
        [
          43.84557,
          6.2223
        ],
        [
          43.84555,
          6.22224
        ],
        [
          43.84552,
          6.22221
        ],
        [
          43.84547,
          6.22219
        ],
        [
          43.84539,
          6.22217
        ],
        [
          43.84523,
          6.22213
        ],
        [
          43.84513,
          6.22213
        ],
        [
          43.84496,
          6.22216
        ],
        [
          43.84466,
          6.22224
        ],
        [
          43.84459,
          6.22226
        ],
        [
          43.84452,
          6.22228
        ],
        [
          43.84445,
          6.22234
        ],
        [
          43.84438,
          6.22242
        ],
        [
          43.84434,
          6.22245
        ],
        [
          43.8443,
          6.22247
        ],
        [
          43.84428,
          6.22247
        ],
        [
          43.84425,
          6.22245
        ],
        [
          43.84417,
          6.22258
        ],
        [
          43.84415,
          6.22267
        ],
        [
          43.84412,
          6.22275
        ],
        [
          43.84409,
          6.22285
        ],
        [
          43.84407,
          6.22289
        ]
      ]
    }
  },
  {
    "id": "ordures-etoile",
    "cat": "ordures",
    "coords": [
      43.803814,
      6.247161
    ],
    "stars": 1,
    "img": "https://sitmahp.geosphere.fr/donnees/photos/PAA/OM/04135/20250127145634.jpg",
    "fr": {
      "name": "Tri – Étoile",
      "desc": "Colonnes de tri : emballages, verre. Colonnes aériennes.",
      "url": "https://maps.google.com/?q=43.803814,6.247161",
      "urlLabel": "Y aller"
    },
    "en": {
      "name": "Recycling – Étoile",
      "desc": "Sorting bins: packaging, glass. Above-ground bins.",
      "url": "https://maps.google.com/?q=43.803814,6.247161",
      "urlLabel": "Directions"
    },
    "de": {
      "name": "Recycling – Étoile",
      "desc": "Sortierbehälter: Verpackungen, Glas. Oberirdische Container.",
      "url": "https://maps.google.com/?q=43.803814,6.247161",
      "urlLabel": "Anfahrt"
    },
    "nl": {
      "name": "Recycling – Étoile",
      "desc": "Sorteercontainers: verpakkingen, glas. Bovengrondse containers.",
      "url": "https://maps.google.com/?q=43.803814,6.247161",
      "urlLabel": "Route"
    }
  },
  {
    "id": "ordures-cadeno",
    "cat": "ordures",
    "coords": [
      43.805921,
      6.234103
    ],
    "stars": 1,
    "img": "https://sitmahp.geosphere.fr/donnees/photos/PAA/OM/04135/20250127145155.jpg",
    "fr": {
      "name": "Tri – La Cadeno",
      "desc": "Colonnes de tri : emballages, verre. Colonnes aériennes.",
      "url": "https://maps.google.com/?q=43.805921,6.234103",
      "urlLabel": "Y aller"
    },
    "en": {
      "name": "Recycling – La Cadeno",
      "desc": "Sorting bins: packaging, glass. Above-ground bins.",
      "url": "https://maps.google.com/?q=43.805921,6.234103",
      "urlLabel": "Directions"
    },
    "de": {
      "name": "Recycling – La Cadeno",
      "desc": "Sortierbehälter: Verpackungen, Glas. Oberirdische Container.",
      "url": "https://maps.google.com/?q=43.805921,6.234103",
      "urlLabel": "Anfahrt"
    },
    "nl": {
      "name": "Recycling – La Cadeno",
      "desc": "Sorteercontainers: verpakkingen, glas. Bovengrondse containers.",
      "url": "https://maps.google.com/?q=43.805921,6.234103",
      "urlLabel": "Route"
    }
  },
  {
    "id": "ordures-parking-bus",
    "cat": "ordures",
    "coords": [
      43.846112,
      6.217372
    ],
    "stars": 1,
    "img": "https://sitmahp.geosphere.fr/donnees/photos/PAA/OM/04135/20250127140536.jpg",
    "fr": {
      "name": "Tri – Parking des bus",
      "desc": "Colonnes de tri : ordures ménagères, emballages, papier, carton, verre. Colonnes semi-enterrées.",
      "url": "https://maps.google.com/?q=43.846112,6.217372",
      "urlLabel": "Y aller"
    },
    "en": {
      "name": "Recycling – Parking des bus",
      "desc": "Sorting bins: household waste, packaging, paper, cardboard, glass. Semi-underground bins.",
      "url": "https://maps.google.com/?q=43.846112,6.217372",
      "urlLabel": "Directions"
    },
    "de": {
      "name": "Recycling – Parking des bus",
      "desc": "Sortierbehälter: Hausmüll, Verpackungen, Papier, Karton, Glas. Halb unterirdische Container.",
      "url": "https://maps.google.com/?q=43.846112,6.217372",
      "urlLabel": "Anfahrt"
    },
    "nl": {
      "name": "Recycling – Parking des bus",
      "desc": "Sorteercontainers: huisvuil, verpakkingen, papier, karton, glas. Halfondergrondse containers.",
      "url": "https://maps.google.com/?q=43.846112,6.217372",
      "urlLabel": "Route"
    },
    "trace": {
      "logements": [
        "moustiers"
      ],
      "coords": [
        [
          43.84717,
          6.22067
        ],
        [
          43.84719,
          6.22063
        ],
        [
          43.84723,
          6.22058
        ],
        [
          43.84727,
          6.22055
        ],
        [
          43.84732,
          6.22052
        ],
        [
          43.8474,
          6.22048
        ],
        [
          43.84741,
          6.22047
        ],
        [
          43.84756,
          6.22042
        ],
        [
          43.84773,
          6.22037
        ],
        [
          43.84792,
          6.22033
        ],
        [
          43.84815,
          6.22035
        ],
        [
          43.84824,
          6.22035
        ],
        [
          43.84841,
          6.22032
        ],
        [
          43.84858,
          6.2203
        ],
        [
          43.84864,
          6.22029
        ],
        [
          43.84874,
          6.22028
        ],
        [
          43.84873,
          6.22022
        ],
        [
          43.84849,
          6.22025
        ],
        [
          43.84838,
          6.2202
        ],
        [
          43.84826,
          6.22019
        ],
        [
          43.84801,
          6.22017
        ],
        [
          43.84797,
          6.22008
        ],
        [
          43.84807,
          6.22001
        ],
        [
          43.84812,
          6.21994
        ],
        [
          43.84809,
          6.21988
        ],
        [
          43.84801,
          6.21982
        ],
        [
          43.84795,
          6.21965
        ],
        [
          43.84791,
          6.21936
        ],
        [
          43.84784,
          6.21906
        ],
        [
          43.84783,
          6.21897
        ],
        [
          43.84771,
          6.2189
        ],
        [
          43.84756,
          6.21874
        ],
        [
          43.84741,
          6.21865
        ],
        [
          43.84728,
          6.2186
        ],
        [
          43.84716,
          6.21848
        ],
        [
          43.84712,
          6.21841
        ],
        [
          43.84705,
          6.21808
        ],
        [
          43.84696,
          6.21786
        ],
        [
          43.8469,
          6.21774
        ],
        [
          43.84639,
          6.21749
        ],
        [
          43.84629,
          6.21738
        ],
        [
          43.84616,
          6.21727
        ],
        [
          43.84609,
          6.21734
        ]
      ]
    }
  },
  {
    "id": "ordures-delestage",
    "cat": "ordures",
    "coords": [
      43.845118,
      6.218331
    ],
    "stars": 1,
    "img": "https://sitmahp.geosphere.fr/donnees/photos/PAA/OM/04135/20250127151140.jpg",
    "fr": {
      "name": "Tri – Parking de délestage",
      "desc": "Colonnes de tri : ordures ménagères, emballages, papier, carton, verre, déchets verts (compostage). Colonnes semi-enterrées.",
      "url": "https://maps.google.com/?q=43.845118,6.218331",
      "urlLabel": "Y aller"
    },
    "en": {
      "name": "Recycling – Parking de délestage",
      "desc": "Sorting bins: household waste, packaging, paper, cardboard, glass, garden waste (composting). Semi-underground bins.",
      "url": "https://maps.google.com/?q=43.845118,6.218331",
      "urlLabel": "Directions"
    },
    "de": {
      "name": "Recycling – Parking de délestage",
      "desc": "Sortierbehälter: Hausmüll, Verpackungen, Papier, Karton, Glas, Grünabfälle (Kompostierung). Halb unterirdische Container.",
      "url": "https://maps.google.com/?q=43.845118,6.218331",
      "urlLabel": "Anfahrt"
    },
    "nl": {
      "name": "Recycling – Parking de délestage",
      "desc": "Sorteercontainers: huisvuil, verpakkingen, papier, karton, glas, tuinafval (compostering). Halfondergrondse containers.",
      "url": "https://maps.google.com/?q=43.845118,6.218331",
      "urlLabel": "Route"
    },
    "trace": {
      "logements": [
        "moustiers"
      ],
      "coords": [
        [
          43.84717,
          6.22067
        ],
        [
          43.84714,
          6.22075
        ],
        [
          43.84713,
          6.22081
        ],
        [
          43.84714,
          6.22095
        ],
        [
          43.84714,
          6.22102
        ],
        [
          43.84713,
          6.22109
        ],
        [
          43.84708,
          6.22129
        ],
        [
          43.84702,
          6.22141
        ],
        [
          43.847,
          6.22143
        ],
        [
          43.84698,
          6.22145
        ],
        [
          43.84697,
          6.22147
        ],
        [
          43.84684,
          6.22159
        ],
        [
          43.8468,
          6.22162
        ],
        [
          43.84677,
          6.22162
        ],
        [
          43.8467,
          6.22159
        ],
        [
          43.84662,
          6.22154
        ],
        [
          43.84651,
          6.22144
        ],
        [
          43.84638,
          6.22136
        ],
        [
          43.84628,
          6.22132
        ],
        [
          43.84619,
          6.22134
        ],
        [
          43.84614,
          6.22136
        ],
        [
          43.84613,
          6.22137
        ],
        [
          43.84608,
          6.22137
        ],
        [
          43.84603,
          6.22136
        ],
        [
          43.84594,
          6.22131
        ],
        [
          43.84583,
          6.22125
        ],
        [
          43.84576,
          6.22122
        ],
        [
          43.84563,
          6.22121
        ],
        [
          43.84547,
          6.2212
        ],
        [
          43.84546,
          6.22116
        ],
        [
          43.84548,
          6.22111
        ],
        [
          43.84565,
          6.22113
        ],
        [
          43.84568,
          6.22109
        ],
        [
          43.84565,
          6.22105
        ],
        [
          43.8455,
          6.22102
        ],
        [
          43.84529,
          6.22095
        ],
        [
          43.84502,
          6.22087
        ],
        [
          43.84471,
          6.2207
        ],
        [
          43.84457,
          6.22063
        ],
        [
          43.84455,
          6.22062
        ],
        [
          43.84456,
          6.22055
        ],
        [
          43.84453,
          6.22015
        ],
        [
          43.84459,
          6.22008
        ],
        [
          43.84473,
          6.22005
        ],
        [
          43.84474,
          6.21973
        ],
        [
          43.84474,
          6.21963
        ],
        [
          43.84459,
          6.21953
        ],
        [
          43.84446,
          6.21944
        ],
        [
          43.84429,
          6.2194
        ],
        [
          43.84412,
          6.21938
        ],
        [
          43.84428,
          6.21923
        ],
        [
          43.84448,
          6.21904
        ],
        [
          43.84468,
          6.21873
        ],
        [
          43.84482,
          6.21842
        ],
        [
          43.84487,
          6.21837
        ],
        [
          43.84491,
          6.21829
        ],
        [
          43.84507,
          6.2183
        ],
        [
          43.84512,
          6.21829
        ]
      ]
    }
  },
  {
    "id": "ordures-magnans",
    "cat": "ordures",
    "coords": [
      43.843206,
      6.220933
    ],
    "stars": 1,
    "img": "https://sitmahp.geosphere.fr/donnees/photos/PAA/OM/04135/20250127141448.jpg",
    "fr": {
      "name": "Tri – Parking des Magnans",
      "desc": "Colonnes de tri : ordures ménagères, emballages, papier, verre.",
      "url": "https://maps.google.com/?q=43.843206,6.220933",
      "urlLabel": "Y aller"
    },
    "en": {
      "name": "Recycling – Parking des Magnans",
      "desc": "Sorting bins: household waste, packaging, paper, glass.",
      "url": "https://maps.google.com/?q=43.843206,6.220933",
      "urlLabel": "Directions"
    },
    "de": {
      "name": "Recycling – Parking des Magnans",
      "desc": "Sortierbehälter: Hausmüll, Verpackungen, Papier, Glas.",
      "url": "https://maps.google.com/?q=43.843206,6.220933",
      "urlLabel": "Anfahrt"
    },
    "nl": {
      "name": "Recycling – Parking des Magnans",
      "desc": "Sorteercontainers: huisvuil, verpakkingen, papier, glas.",
      "url": "https://maps.google.com/?q=43.843206,6.220933",
      "urlLabel": "Route"
    },
    "trace": {
      "logements": [
        "moustiers"
      ],
      "coords": [
        [
          43.84717,
          6.22067
        ],
        [
          43.84714,
          6.22075
        ],
        [
          43.84713,
          6.22081
        ],
        [
          43.84714,
          6.22095
        ],
        [
          43.84714,
          6.22102
        ],
        [
          43.84713,
          6.22109
        ],
        [
          43.84708,
          6.22129
        ],
        [
          43.84702,
          6.22141
        ],
        [
          43.847,
          6.22143
        ],
        [
          43.84698,
          6.22145
        ],
        [
          43.84697,
          6.22147
        ],
        [
          43.84684,
          6.22159
        ],
        [
          43.8468,
          6.22162
        ],
        [
          43.84677,
          6.22162
        ],
        [
          43.8467,
          6.22159
        ],
        [
          43.84662,
          6.22154
        ],
        [
          43.84651,
          6.22144
        ],
        [
          43.84638,
          6.22136
        ],
        [
          43.84628,
          6.22132
        ],
        [
          43.84619,
          6.22134
        ],
        [
          43.84614,
          6.22136
        ],
        [
          43.84613,
          6.22137
        ],
        [
          43.84608,
          6.22137
        ],
        [
          43.84604,
          6.2214
        ],
        [
          43.84596,
          6.22138
        ],
        [
          43.8457,
          6.22128
        ],
        [
          43.84557,
          6.22128
        ],
        [
          43.84533,
          6.22132
        ],
        [
          43.8453,
          6.22135
        ],
        [
          43.84477,
          6.2214
        ],
        [
          43.84476,
          6.22129
        ],
        [
          43.84406,
          6.22129
        ],
        [
          43.84401,
          6.22131
        ],
        [
          43.84399,
          6.22131
        ],
        [
          43.84397,
          6.22127
        ],
        [
          43.84389,
          6.22134
        ],
        [
          43.84381,
          6.22143
        ],
        [
          43.84377,
          6.22132
        ],
        [
          43.84375,
          6.22127
        ],
        [
          43.84375,
          6.22119
        ],
        [
          43.84378,
          6.22105
        ],
        [
          43.84381,
          6.22094
        ],
        [
          43.84371,
          6.22091
        ],
        [
          43.84369,
          6.22098
        ],
        [
          43.84361,
          6.22109
        ],
        [
          43.8436,
          6.22112
        ],
        [
          43.84352,
          6.22115
        ],
        [
          43.84346,
          6.22117
        ],
        [
          43.84337,
          6.22117
        ],
        [
          43.84321,
          6.22093
        ]
      ]
    }
  },
  {
    "id": "ordures-saint-saturnin",
    "cat": "ordures",
    "coords": [
      43.811706,
      6.227031
    ],
    "stars": 1,
    "img": "https://sitmahp.geosphere.fr/donnees/photos/PAA/OM/04135/20250127150419.jpg",
    "fr": {
      "name": "Tri – Parking Saint-Saturnin",
      "desc": "Colonnes de tri : ordures ménagères, emballages, verre. Colonnes aériennes.",
      "url": "https://maps.google.com/?q=43.811706,6.227031",
      "urlLabel": "Y aller"
    },
    "en": {
      "name": "Recycling – Parking Saint-Saturnin",
      "desc": "Sorting bins: household waste, packaging, glass. Above-ground bins.",
      "url": "https://maps.google.com/?q=43.811706,6.227031",
      "urlLabel": "Directions"
    },
    "de": {
      "name": "Recycling – Parking Saint-Saturnin",
      "desc": "Sortierbehälter: Hausmüll, Verpackungen, Glas. Oberirdische Container.",
      "url": "https://maps.google.com/?q=43.811706,6.227031",
      "urlLabel": "Anfahrt"
    },
    "nl": {
      "name": "Recycling – Parking Saint-Saturnin",
      "desc": "Sorteercontainers: huisvuil, verpakkingen, glas. Bovengrondse containers.",
      "url": "https://maps.google.com/?q=43.811706,6.227031",
      "urlLabel": "Route"
    }
  },
  {
    "id": "ordures-galetas",
    "cat": "ordures",
    "coords": [
      43.802477,
      6.249657
    ],
    "stars": 1,
    "img": "https://sitmahp.geosphere.fr/donnees/photos/PAA/OM/04135/20250127145854.jpg",
    "fr": {
      "name": "Tri – Pont du Galetas",
      "desc": "Colonnes de tri : ordures ménagères, emballages, verre. Colonnes aériennes.",
      "url": "https://maps.google.com/?q=43.802477,6.249657",
      "urlLabel": "Y aller"
    },
    "en": {
      "name": "Recycling – Pont du Galetas",
      "desc": "Sorting bins: household waste, packaging, glass. Above-ground bins.",
      "url": "https://maps.google.com/?q=43.802477,6.249657",
      "urlLabel": "Directions"
    },
    "de": {
      "name": "Recycling – Pont du Galetas",
      "desc": "Sortierbehälter: Hausmüll, Verpackungen, Glas. Oberirdische Container.",
      "url": "https://maps.google.com/?q=43.802477,6.249657",
      "urlLabel": "Anfahrt"
    },
    "nl": {
      "name": "Recycling – Pont du Galetas",
      "desc": "Sorteercontainers: huisvuil, verpakkingen, glas. Bovengrondse containers.",
      "url": "https://maps.google.com/?q=43.802477,6.249657",
      "urlLabel": "Route"
    }
  },
  {
    "id": "ordures-venascle",
    "cat": "ordures",
    "coords": [
      43.855043,
      6.191441
    ],
    "stars": 1,
    "img": "https://sitmahp.geosphere.fr/donnees/photos/PAA/OM/04135/20250127152309.jpg",
    "fr": {
      "name": "Tri – Venascle",
      "desc": "Colonnes de tri : ordures ménagères, emballages, papier, verre. Colonnes aériennes.",
      "url": "https://maps.google.com/?q=43.855043,6.191441",
      "urlLabel": "Y aller"
    },
    "en": {
      "name": "Recycling – Venascle",
      "desc": "Sorting bins: household waste, packaging, paper, glass. Above-ground bins.",
      "url": "https://maps.google.com/?q=43.855043,6.191441",
      "urlLabel": "Directions"
    },
    "de": {
      "name": "Recycling – Venascle",
      "desc": "Sortierbehälter: Hausmüll, Verpackungen, Papier, Glas. Oberirdische Container.",
      "url": "https://maps.google.com/?q=43.855043,6.191441",
      "urlLabel": "Anfahrt"
    },
    "nl": {
      "name": "Recycling – Venascle",
      "desc": "Sorteercontainers: huisvuil, verpakkingen, papier, glas. Bovengrondse containers.",
      "url": "https://maps.google.com/?q=43.855043,6.191441",
      "urlLabel": "Route"
    }
  },
  {
    "id": "rando-courchon",
    "cat": "rando",
    "coords": [
      43.84611954959796,
      6.222624225600245
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/rando-courchon.jpg",
    "fr": {
      "name": "Rando : Baisse de Courchon (920 m)",
      "desc": "Boucle depuis Moustiers par le Ravin de Notre-Dame. Chapelle, grotte et voie romaine. Attention, du fait de sa dangerosité, cet itinéraire est très vivement déconseillé aux jeunes enfants.",
      "url": "https://www.cheminsdesparcs.fr/fr/trek/63851-MOUSTIERS-SAINTE-MARIE---Le-sentier-de-Courchon",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Hike: Baisse de Courchon (920m)",
      "desc": "Loop from Moustiers via the Ravin de Notre-Dame. Chapel, cave and Roman road. Attention, because of its dangerousness, this route is very strongly discouraged for young children.",
      "url": "https://www.cheminsdesparcs.fr/fr/trek/63851-MOUSTIERS-SAINTE-MARIE---Le-sentier-de-Courchon",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Wanderung: Baisse de Courchon (920 m)",
      "desc": "Rundweg ab Moustiers durch den Ravin de Notre-Dame. Kapelle, Höhle und römische Straße. Achtung: Aufgrund ihrer Gefährlichkeit wird diese Route für kleine Kinder dringend nicht empfohlen.",
      "url": "https://www.cheminsdesparcs.fr/fr/trek/63851-MOUSTIERS-SAINTE-MARIE---Le-sentier-de-Courchon",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Wandeling: Baisse de Courchon (920 m)",
      "desc": "Lus vanuit Moustiers via de Ravin de Notre-Dame. Kapel, grot en Romeinse weg. Let op: door de gevaarlijke aard van dit traject wordt het sterk afgeraden voor jonge kinderen.",
      "url": "https://www.cheminsdesparcs.fr/fr/trek/63851-MOUSTIERS-SAINTE-MARIE---Le-sentier-de-Courchon",
      "urlLabel": "Meer informatie"
    }
  },
  {
    "id": "boucle-rougon",
    "cat": "rando",
    "coords": [
      43.793003242127654,
      6.433200838941296
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/rando-rougon.jpg",
    "fr": {
      "name": "Rando : Boucle de Rougon aux vautours",
      "desc": "Circuit depuis Rougon pour observer les vautours fauves. Panorama sur le Point Sublime. Départ depuis l'arrêt de bus Rougon Carajuan",
      "url": "https://www.komoot.com/fr-fr/smarttour/1503577",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Hike: Rougon Vulture Loop",
      "desc": "Circuit from Rougon to observe griffon vultures. Panoramic views over Point Sublime. Departure from the Rougon Carajuan bus stop",
      "url": "https://www.komoot.com/fr-fr/smarttour/1503577",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Wanderung: Geierrundweg ab Rougon",
      "desc": "Rundwanderung ab Rougon zur Beobachtung von Gänsegeiern. Panoramablick auf den Point Sublime. Start an der Bushaltestelle Rougon Carajuan",
      "url": "https://www.komoot.com/fr-fr/smarttour/1503577",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Wandeling: gierenroute vanaf Rougon",
      "desc": "Rondwandeling vanaf Rougon om vale gieren te observeren. Panoramisch uitzicht op de Point Sublime. Vertrek bij de bushalte Rougon Carajuan",
      "url": "https://www.komoot.com/fr-fr/smarttour/1503577",
      "urlLabel": "Meer informatie"
    }
  },
  {
    "id": "trail-verdon",
    "cat": "running",
    "coords": [
      43.84450684532304,
      6.219126880110792
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/trail-moustiers.jpg",
    "fr": {
      "name": "Trail depuis Moustiers",
      "desc": "Plusieurs trails sur Moustiers. Départ et parking à l'entrée du village, sur la route de Riez.",
      "url": "https://www.moustiers.fr/sport-evasion/randonnees-trails/espace-trail/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Trail Running from Moustiers",
      "desc": "Several trails on Moustiers. Departure and parking at the entrance of the village, on the road to Riez.",
      "url": "https://www.moustiers.fr/sport-evasion/randonnees-trails/espace-trail/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Trailrunning ab Moustiers",
      "desc": "Mehrere Trailstrecken rund um Moustiers. Start und Parkplatz am Ortseingang, an der Straße nach Riez.",
      "url": "https://www.moustiers.fr/sport-evasion/randonnees-trails/espace-trail/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Trailrunning vanuit Moustiers",
      "desc": "Verschillende trailroutes rond Moustiers. Vertrek en parkeren bij de ingang van het dorp, aan de weg naar Riez.",
      "url": "https://www.moustiers.fr/sport-evasion/randonnees-trails/espace-trail/",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      45.605,
      50.584
    ],
    "scale": 0.8
  },
  {
    "id": "trail-salles",
    "cat": "running",
    "coords": [
      43.773084256635656,
      6.208983819548171
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/running-salles.jpg",
    "fr": {
      "name": "Trail depuis les Salles sur Verdon",
      "desc": "Plusieurs trails sur les Salles sur Verdon. Départ depuis le centre du village",
      "url": "https://www.komoot.com/fr-fr/guide/1032350/circuits-de-course-a-pied-autour-de-les-salles-sur-verdon",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Trail Running from les Salles sur Verdon",
      "desc": "Several trails on les Salles sur Verdon. Departure from the village center.",
      "url": "https://www.komoot.com/fr-fr/guide/1032350/circuits-de-course-a-pied-autour-de-les-salles-sur-verdon",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Trailrunning ab Les Salles-sur-Verdon",
      "desc": "Mehrere Trailstrecken rund um Les Salles-sur-Verdon. Start im Ortszentrum.",
      "url": "https://www.komoot.com/fr-fr/guide/1032350/circuits-de-course-a-pied-autour-de-les-salles-sur-verdon",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Trailrunning vanuit Les Salles-sur-Verdon",
      "desc": "Verschillende trailroutes rond Les Salles-sur-Verdon. Vertrek vanuit het dorpscentrum.",
      "url": "https://www.komoot.com/fr-fr/guide/1032350/circuits-de-course-a-pied-autour-de-les-salles-sur-verdon",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      21.309,
      58.448
    ],
    "scale": 1.3
  },
  {
    "id": "rando-salles",
    "cat": "rando",
    "coords": [
      43.77293,
      6.20834
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/rando-salles.jpg",
    "fr": {
      "name": "Randonnée aux Salles sur Verdon",
      "desc": "Randonnée familiale au bord du lac des Salles sur Verdon",
      "url": "gpx/rando_salles.html",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Hiking in Les Salles sur Verdon",
      "desc": "Family hike by the lake of the Salles sur Verdon",
      "url": "gpx/rando_salles.html?lang=EN",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Wandern in Les Salles-sur-Verdon",
      "desc": "Familienwanderung am See von Les Salles-sur-Verdon",
      "url": "gpx/rando_salles.html?lang=DE",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Wandelen in Les Salles-sur-Verdon",
      "desc": "Familiewandeling aan het meer van Les Salles-sur-Verdon",
      "url": "gpx/rando_salles.html?lang=NL",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      21.779,
      56.748
    ],
    "scale": 1.3
  },
  {
    "id": "tri-salles",
    "cat": "ordures",
    "coords": [
      43.77651,
      6.20897
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/tri-salles.jpg",
    "fr": {
      "name": "Tri selectif les Salles sur Verdon",
      "desc": "Tri selectif les Salles sur Verdon: 19 Rue Pierre Blanche Les Salles-sur-Verdon 83630. 🍾Verre ♻️Plastique 📰Papier  ⚙️Métaux",
      "url": "https://google.com/maps/dir/?api=1&destination=43.77656,6.2089686",
      "urlLabel": "Y aller"
    },
    "en": {
      "name": "Selective Sorting les Salles sur Verdon",
      "desc": "Sort selective les Salles sur Verdon: 19 Rue Pierre Blanche Les Salles-sur-Verdon 83630. 🍾Glass ♻️Plastic 📰Paper ⚙️Metals",
      "url": "https://google.com/maps/dir/?api=1&destination=43.77656,6.2089686",
      "urlLabel": "Directions"
    },
    "de": {
      "name": "Mülltrennung Les Salles-sur-Verdon",
      "desc": "Wertstoffsammelstelle Les Salles-sur-Verdon: 19 Rue Pierre Blanche, Les Salles-sur-Verdon 83630. 🍾Glas ♻️Kunststoff 📰Papier ⚙️Metalle",
      "url": "https://google.com/maps/dir/?api=1&destination=43.77656,6.2089686",
      "urlLabel": "Anfahrt"
    },
    "nl": {
      "name": "Afvalscheiding Les Salles-sur-Verdon",
      "desc": "Afvalscheidingspunt Les Salles-sur-Verdon: 19 Rue Pierre Blanche, Les Salles-sur-Verdon 83630. 🍾Glas ♻️Plastic 📰Papier ⚙️Metaal",
      "url": "https://google.com/maps/dir/?api=1&destination=43.77656,6.2089686",
      "urlLabel": "Routebeschrijving"
    },
    "pano": [
      22.371,
      58.13
    ],
    "scale": 1.3,
    "trace": {
      "logements": [
        "salles6",
        "salles8"
      ],
      "coords": [
        [
          43.77269,
          6.20827
        ],
        [
          43.77275,
          6.20832
        ],
        [
          43.77301,
          6.20835
        ],
        [
          43.77311,
          6.20844
        ],
        [
          43.77325,
          6.20856
        ],
        [
          43.77332,
          6.20862
        ],
        [
          43.77344,
          6.20873
        ],
        [
          43.77354,
          6.20881
        ],
        [
          43.77355,
          6.20879
        ],
        [
          43.77371,
          6.20842
        ],
        [
          43.7738,
          6.20848
        ],
        [
          43.77391,
          6.20822
        ],
        [
          43.7739,
          6.20816
        ],
        [
          43.77388,
          6.2081
        ],
        [
          43.77383,
          6.20807
        ],
        [
          43.77379,
          6.20804
        ],
        [
          43.77376,
          6.20801
        ],
        [
          43.77377,
          6.20799
        ],
        [
          43.77382,
          6.20797
        ],
        [
          43.77387,
          6.20797
        ],
        [
          43.77388,
          6.20789
        ],
        [
          43.77389,
          6.20779
        ],
        [
          43.77391,
          6.20769
        ],
        [
          43.77393,
          6.20757
        ],
        [
          43.77394,
          6.20748
        ],
        [
          43.77394,
          6.20742
        ],
        [
          43.77394,
          6.20737
        ],
        [
          43.77396,
          6.20734
        ],
        [
          43.77398,
          6.20726
        ],
        [
          43.77389,
          6.20721
        ],
        [
          43.77387,
          6.20719
        ],
        [
          43.77386,
          6.20716
        ],
        [
          43.77387,
          6.20712
        ],
        [
          43.77393,
          6.20674
        ],
        [
          43.77394,
          6.20671
        ],
        [
          43.77393,
          6.20665
        ],
        [
          43.77392,
          6.20661
        ],
        [
          43.77392,
          6.20657
        ],
        [
          43.77391,
          6.20652
        ],
        [
          43.77391,
          6.20649
        ],
        [
          43.77392,
          6.20647
        ],
        [
          43.77393,
          6.20646
        ],
        [
          43.77402,
          6.20642
        ],
        [
          43.77404,
          6.20641
        ],
        [
          43.77406,
          6.20638
        ],
        [
          43.77407,
          6.20636
        ],
        [
          43.77407,
          6.20633
        ],
        [
          43.77406,
          6.20628
        ],
        [
          43.77404,
          6.20625
        ],
        [
          43.77402,
          6.20624
        ],
        [
          43.774,
          6.20621
        ],
        [
          43.77399,
          6.20619
        ],
        [
          43.77399,
          6.20617
        ],
        [
          43.774,
          6.20613
        ],
        [
          43.77422,
          6.20624
        ],
        [
          43.77429,
          6.20627
        ],
        [
          43.77485,
          6.20657
        ],
        [
          43.77516,
          6.20671
        ],
        [
          43.77546,
          6.20684
        ],
        [
          43.77553,
          6.20702
        ],
        [
          43.77571,
          6.2073
        ],
        [
          43.77622,
          6.20783
        ],
        [
          43.77626,
          6.20788
        ],
        [
          43.7763,
          6.20792
        ],
        [
          43.7764,
          6.20802
        ],
        [
          43.77663,
          6.20829
        ],
        [
          43.77668,
          6.20837
        ],
        [
          43.77669,
          6.20844
        ],
        [
          43.77668,
          6.20851
        ],
        [
          43.77651,
          6.20896
        ],
        [
          43.77647,
          6.20908
        ],
        [
          43.77649,
          6.20909
        ],
        [
          43.77651,
          6.20898
        ],
        [
          43.77652,
          6.20897
        ]
      ]
    }
  },
  {
    "id": "rando-salles2",
    "cat": "rando",
    "coords": [
      43.77149,
      6.21253
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/rando-salles4.jpg",
    "fr": {
      "name": "Randonnée entre les Salles sur Verdon et Aiguines",
      "desc": "Boucle entre les Salles sur Verdon et Aiguines. Départ des Salles sur Verdon ou d'Aiguines",
      "links": [
        {
          "url": "gpx/salles_aiguines.pdf",
          "label": "Plus d'informations"
        },
        {
          "url": "gpx/rando_aiguines.html",
          "label": "Parcours GPX"
        }
      ]
    },
    "en": {
      "name": "Hiking between les Salles sur Verdon and Aiguines",
      "desc": "Loop between the rooms on Verdon and Aiguines. Departure from les Salles sur Verdon or Aiguines",
      "links": [
        {
          "url": "gpx/salles_aiguines.pdf",
          "label": "More details"
        },
        {
          "url": "gpx/rando_aiguines.html?lang=EN",
          "label": "GPX route"
        }
      ]
    },
    "de": {
      "name": "Wanderung zwischen Les Salles-sur-Verdon und Aiguines",
      "desc": "Rundweg zwischen Les Salles-sur-Verdon und Aiguines. Start in Les Salles-sur-Verdon oder in Aiguines",
      "links": [
        {
          "url": "gpx/salles_aiguines.pdf",
          "label": "Weitere Informationen"
        },
        {
          "url": "gpx/rando_aiguines.html?lang=DE",
          "label": "GPX-Track"
        }
      ]
    },
    "nl": {
      "name": "Wandeling tussen Les Salles-sur-Verdon en Aiguines",
      "desc": "Rondwandeling tussen Les Salles-sur-Verdon en Aiguines. Vertrek vanuit Les Salles-sur-Verdon of Aiguines",
      "links": [
        {
          "url": "gpx/salles_aiguines.pdf",
          "label": "Meer informatie"
        },
        {
          "url": "gpx/rando_aiguines.html?lang=NL",
          "label": "GPX-route"
        }
      ]
    },
    "pano": [
      17.345,
      59.511
    ],
    "scale": 1.5
  },
  {
    "id": "equitation-salles",
    "cat": "equitation",
    "coords": [
      43.77181,
      6.21547
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/salles-equitation.jpg",
    "fr": {
      "name": "Balade à cheval aux Salles sur Verdon",
      "desc": "balades équestres à la journée au départ de Salles-sur-Verdon, au cœur des paysages préservés du Lac de Sainte-Croix. Accompagné d’un guide passionné, vous explorez à cheval des sentiers sauvages, crêtes panoramiques et berges turquoise typiques des Gorges du Verdon.",
      "url": "https://www.verdonequitation.fr/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Horseback riding in the Salles sur Verdon",
      "desc": "Equestrian walks by the day from Salles-sur-Verdon, in the heart of the unspoilt landscapes of Lake Sainte-Croix. Accompanied by a passionate guide, you explore on horseback wild trails, panoramic ridges and turquoise banks typical of the Gorges du Verdon.",
      "url": "https://www.verdonequitation.fr/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Reiten in Les Salles-sur-Verdon",
      "desc": "Ganztägige Reitausflüge ab Les Salles-sur-Verdon, mitten in der unberührten Landschaft rund um den Lac de Sainte-Croix. Begleitet von einem passionierten Guide erkunden Sie zu Pferd wilde Pfade, Panoramakämme und türkisfarbene Ufer, typisch für die Gorges du Verdon.",
      "url": "https://www.verdonequitation.fr/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Paardrijden in Les Salles-sur-Verdon",
      "desc": "Dagtochten te paard vanuit Les Salles-sur-Verdon, in het hart van het ongerepte landschap rond het Meer van Sainte-Croix. Begeleid door een gepassioneerde gids verkent u te paard wilde paden, panoramische bergkammen en turquoise oevers, kenmerkend voor de Gorges du Verdon.",
      "url": "https://www.verdonequitation.fr/",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      17.947,
      59.511
    ],
    "scale": 1.6
  },
  {
    "id": "vtt-salles",
    "cat": "velo",
    "coords": [
      43.773835363473836,
      6.208471655845643
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/vtt-salles.jpg",
    "fr": {
      "name": "VTT – Salles sur Verdon",
      "desc": "250 km de circuits balisés FFC autour du lac et des gorges. Cross-country, enduro, VAE. Tous niveaux.",
      "url": "https://www.veloloisirprovence.com/search/simple.php?id_langage=1&q=les+salles+sur+verdon",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Mountain Biking — Salles sur Verdon",
      "desc": "250 km of FFC-marked trails around the lake and gorges. Cross-country, enduro, e-bikes. All levels.",
      "url": "https://uk.veloloisirprovence.com/search/simple.php?id_langage=2&q=les+salles+sur+verdon",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Mountainbiken – Les Salles-sur-Verdon",
      "desc": "250 km ausgeschilderte FFC-Strecken rund um den See und die Schluchten. Cross-Country, Enduro, E-Bikes. Für alle Niveaus.",
      "url": "https://uk.veloloisirprovence.com/search/simple.php?id_langage=2&q=les+salles+sur+verdon",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Mountainbiken – Les Salles-sur-Verdon",
      "desc": "250 km bewegwijzerde FFC-routes rond het meer en de kloven. Cross-country, enduro, e-bikes. Voor alle niveaus.",
      "url": "https://uk.veloloisirprovence.com/search/simple.php?id_langage=2&q=les+salles+sur+verdon",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      18.492,
      61.637
    ],
    "scale": 1.6
  },
  {
    "id": "vtt-moustiers",
    "cat": "velo",
    "coords": [
      43.847139813818046,
      6.221027076244355
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/vtt-moustiers.jpg",
    "fr": {
      "name": "VTT – Moustiers",
      "desc": "250 km de circuits balisés FFC autour du lac et des gorges. Cross-country, enduro, VAE. Tous niveaux.",
      "url": "https://www.veloloisirprovence.com/search/simple.php?id_langage=1&q=moustiers",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Mountain Biking — Moustiers",
      "desc": "250 km of FFC-marked trails around the lake and gorges. Cross-country, enduro, e-bikes. All levels.",
      "url": "https://uk.veloloisirprovence.com/search/simple.php?id_langage=2&q=moustiers",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Mountainbiken – Moustiers",
      "desc": "250 km ausgeschilderte FFC-Strecken rund um den See und die Schluchten. Cross-Country, Enduro, E-Bikes. Für alle Niveaus.",
      "url": "https://uk.veloloisirprovence.com/search/simple.php?id_langage=2&q=moustiers",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Mountainbiken – Moustiers",
      "desc": "250 km bewegwijzerde FFC-routes rond het meer en de kloven. Cross-country, enduro, e-bikes. Voor alle niveaus.",
      "url": "https://uk.veloloisirprovence.com/search/simple.php?id_langage=2&q=moustiers",
      "urlLabel": "Meer informatie"
    },
    "pano": [
      44.146,
      56.961
    ],
    "scale": 1
  },
  {
    "id": "crete-belvedere",
    "cat": "visite",
    "coords": [
      43.765341102113084,
      6.37333631515503
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/crete-belvedere.jpg",
    "fr": {
      "name": "La Route des Crêtes",
      "desc": "La mythique route des crêtes et le Belvédère de la Dent d'Aire.",
      "url": "https://www.tourisme-alpes-haute-provence.com/pratiquer-des-activites/555260_routes-touristiques-la-palud-sur-verdon-la-route-des-cretes/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "The Route des Crêtes",
      "desc": "The legendary ridge road, and the Belvédère de la Dent d'Aire",
      "url": "https://www.tourisme-alpes-haute-provence.com/pratiquer-des-activites/555260_routes-touristiques-la-palud-sur-verdon-la-route-des-cretes/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Die Route des Crêtes",
      "desc": "Die legendäre Kammstraße und der Belvédère de la Dent d'Aire.",
      "url": "https://www.tourisme-alpes-haute-provence.com/pratiquer-des-activites/555260_routes-touristiques-la-palud-sur-verdon-la-route-des-cretes/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "De Route des Crêtes",
      "desc": "De legendarische bergkamweg en het uitzichtpunt Belvédère de la Dent d'Aire.",
      "url": "https://www.tourisme-alpes-haute-provence.com/pratiquer-des-activites/555260_routes-touristiques-la-palud-sur-verdon-la-route-des-cretes/",
      "urlLabel": "Meer informatie"
    }
  },
  {
    "id": "logement-moustiers",
    "cat": "logement",
    "coords": [
      43.84714,
      6.22078
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/moustiers-terrasse.jpg",
    "fr": {
      "name": "Bell'Étoile (Moustiers)",
      "desc": "Votre logement",
      "url": "https://www.airbnb.fr/rooms/1631901662839629884"
    },
    "en": {
      "name": "Bell'Étoile (Moustiers)",
      "desc": "Your stay",
      "url": "https://www.airbnb.fr/rooms/1631901662839629884"
    },
    "de": {
      "name": "Bell'Étoile (Moustiers)",
      "desc": "Ihre Unterkunft",
      "url": "https://www.airbnb.fr/rooms/1631901662839629884"
    },
    "nl": {
      "name": "Bell'Étoile (Moustiers)",
      "desc": "Uw verblijf",
      "url": "https://www.airbnb.fr/rooms/1631901662839629884"
    },
    "pano": [
      44.991,
      48.565
    ],
    "scale": 0.8,
    "backintime": {
      "ville": [
        "moustiers"
      ],
      "coords": [
        51.042,
        47.503
      ],
      "noClick": true
    }
  },
  {
    "id": "logement-salles",
    "cat": "logement",
    "coords": [
      43.77264860239855,
      6.208356320858003
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/bello6-cover.jpg",
    "fr": {
      "name": "Bell'O du Lac (Les Salles)",
      "desc": "Votre logement",
      "url": "https://www.airbnb.fr/rooms/1401227916063751925"
    },
    "en": {
      "name": "Bell'O du Lac (Les Salles)",
      "desc": "Your stay",
      "url": "https://www.airbnb.fr/rooms/1401227916063751925"
    },
    "de": {
      "name": "Bell'O du Lac (Les Salles)",
      "desc": "Ihre Unterkunft",
      "url": "https://www.airbnb.fr/rooms/1401227916063751925"
    },
    "nl": {
      "name": "Bell'O du Lac (Les Salles)",
      "desc": "Uw verblijf",
      "url": "https://www.airbnb.fr/rooms/1401227916063751925"
    },
    "pano": [
      19.519,
      55.154
    ],
    "scale": 1,
    "backintime": {
      "ville": [
        "salles"
      ],
      "coords": [
        57.344,
        41.552
      ]
    }
  },
  {
    "id": "salles-tennis",
    "cat": "tennis",
    "coords": [
      43.77499,
      6.21375
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/salles-tennis.jpg",
    "fr": {
      "name": "Aire multisports",
      "desc": "Terrains de tennis/basket gratuit 7/7 de 8h à 21h",
      "url": "https://www.google.com/maps/@43.775028,6.2136502,3a,75y,186.53h,89.24t/data=!3m7!1e1!3m5!1sMBvBKkwNo0NaBv2-iewZDw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0.7642778998838509%26panoid%3DMBvBKkwNo0NaBv2-iewZDw%26yaw%3D186.52954061319392!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D"
    },
    "en": {
      "name": "Multisports zone",
      "desc": "Free Tennis & basket playground 7/7 from 8am to 9pm",
      "url": "https://www.google.com/maps/@43.775028,6.2136502,3a,75y,186.53h,89.24t/data=!3m7!1e1!3m5!1sMBvBKkwNo0NaBv2-iewZDw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0.7642778998838509%26panoid%3DMBvBKkwNo0NaBv2-iewZDw%26yaw%3D186.52954061319392!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D"
    },
    "de": {
      "name": "Multisportanlage",
      "desc": "Kostenlose Tennis- und Basketballplätze, täglich von 8 bis 21 Uhr",
      "url": "https://www.google.com/maps/@43.775028,6.2136502,3a,75y,186.53h,89.24t/data=!3m7!1e1!3m5!1sMBvBKkwNo0NaBv2-iewZDw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0.7642778998838509%26panoid%3DMBvBKkwNo0NaBv2-iewZDw%26yaw%3D186.52954061319392!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D"
    },
    "nl": {
      "name": "Multisportterrein",
      "desc": "Gratis tennis- en basketbalveld, dagelijks open van 8.00 tot 21.00 uur",
      "url": "https://www.google.com/maps/@43.775028,6.2136502,3a,75y,186.53h,89.24t/data=!3m7!1e1!3m5!1sMBvBKkwNo0NaBv2-iewZDw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0.7642778998838509%26panoid%3DMBvBKkwNo0NaBv2-iewZDw%26yaw%3D186.52954061319392!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D"
    },
    "pano": [
      19.448,
      60.837
    ],
    "scale": 1.6,
    "trace": {
      "logements": [
        "salles6",
        "salles8"
      ],
      "coords": [
        [
          43.77269,
          6.20827
        ],
        [
          43.77275,
          6.20832
        ],
        [
          43.77301,
          6.20835
        ],
        [
          43.77311,
          6.20844
        ],
        [
          43.77325,
          6.20856
        ],
        [
          43.77332,
          6.20862
        ],
        [
          43.77323,
          6.20882
        ],
        [
          43.77315,
          6.20901
        ],
        [
          43.77323,
          6.20907
        ],
        [
          43.77325,
          6.20909
        ],
        [
          43.77316,
          6.20931
        ],
        [
          43.77323,
          6.20942
        ],
        [
          43.77321,
          6.20947
        ],
        [
          43.7732,
          6.20951
        ],
        [
          43.77335,
          6.20963
        ],
        [
          43.77373,
          6.2099
        ],
        [
          43.77377,
          6.20993
        ],
        [
          43.77385,
          6.21
        ],
        [
          43.77396,
          6.21011
        ],
        [
          43.77408,
          6.21026
        ],
        [
          43.77412,
          6.21031
        ],
        [
          43.77425,
          6.21056
        ],
        [
          43.77428,
          6.21061
        ],
        [
          43.77434,
          6.21074
        ],
        [
          43.77437,
          6.21086
        ],
        [
          43.77441,
          6.21099
        ],
        [
          43.77443,
          6.2111
        ],
        [
          43.77444,
          6.21118
        ],
        [
          43.77446,
          6.21126
        ],
        [
          43.77447,
          6.21133
        ],
        [
          43.7745,
          6.21149
        ],
        [
          43.77454,
          6.21163
        ],
        [
          43.77457,
          6.21176
        ],
        [
          43.77464,
          6.21215
        ],
        [
          43.77467,
          6.21247
        ],
        [
          43.77468,
          6.21272
        ],
        [
          43.77467,
          6.21301
        ],
        [
          43.77493,
          6.21315
        ],
        [
          43.77516,
          6.21337
        ],
        [
          43.77499,
          6.21375
        ]
      ]
    }
  },
  {
    "id": "salles-petanque",
    "cat": "petanque",
    "coords": [
      43.77343,
      6.20946
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/salles-petanque.jpg",
    "fr": {
      "name": "Terrains de pétanque",
      "desc": "Terrains de pétanque aux Salles sur Verdon",
      "url": "https://www.google.com/maps/place/Office+de+tourisme+des+Salles-sur-Verdon/@43.7735803,6.2097836,3a,75y,273.76h,101.73t/data=!3m7!1e1!3m5!1smZDsjFadQm0wJTSUH2bREQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-11.7311936614866%26panoid%3DmZDsjFadQm0wJTSUH2bREQ%26yaw%3D273.75636389552403!7i13312!8i6656!4m6!3m5!1s0x12cbe562445af35d:0x12a3c4e71960d5a3!8m2!3d43.7736724!4d6.2092511!16s%2Fg%2F1pp2vh4ss?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D"
    },
    "en": {
      "name": "Petanque field",
      "desc": "Petanque fields in les Salles sur Verdon",
      "url": "https://www.google.com/maps/place/Office+de+tourisme+des+Salles-sur-Verdon/@43.7735803,6.2097836,3a,75y,273.76h,101.73t/data=!3m7!1e1!3m5!1smZDsjFadQm0wJTSUH2bREQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-11.7311936614866%26panoid%3DmZDsjFadQm0wJTSUH2bREQ%26yaw%3D273.75636389552403!7i13312!8i6656!4m6!3m5!1s0x12cbe562445af35d:0x12a3c4e71960d5a3!8m2!3d43.7736724!4d6.2092511!16s%2Fg%2F1pp2vh4ss?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D"
    },
    "de": {
      "name": "Pétanque-Plätze",
      "desc": "Pétanque-Plätze in Les Salles-sur-Verdon",
      "url": "https://www.google.com/maps/place/Office+de+tourisme+des+Salles-sur-Verdon/@43.7735803,6.2097836,3a,75y,273.76h,101.73t/data=!3m7!1e1!3m5!1smZDsjFadQm0wJTSUH2bREQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-11.7311936614866%26panoid%3DmZDsjFadQm0wJTSUH2bREQ%26yaw%3D273.75636389552403!7i13312!8i6656!4m6!3m5!1s0x12cbe562445af35d:0x12a3c4e71960d5a3!8m2!3d43.7736724!4d6.2092511!16s%2Fg%2F1pp2vh4ss?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D"
    },
    "nl": {
      "name": "Jeu-de-boulesveld",
      "desc": "Jeu-de-boulesvelden in Les Salles-sur-Verdon",
      "url": "https://www.google.com/maps/place/Office+de+tourisme+des+Salles-sur-Verdon/@43.7735803,6.2097836,3a,75y,273.76h,101.73t/data=!3m7!1e1!3m5!1smZDsjFadQm0wJTSUH2bREQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-11.7311936614866%26panoid%3DmZDsjFadQm0wJTSUH2bREQ%26yaw%3D273.75636389552403!7i13312!8i6656!4m6!3m5!1s0x12cbe562445af35d:0x12a3c4e71960d5a3!8m2!3d43.7736724!4d6.2092511!16s%2Fg%2F1pp2vh4ss?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D"
    },
    "pano": [
      19.931,
      59.113
    ],
    "scale": 1.5,
    "trace": {
      "logements": [
        "salles6",
        "salles8"
      ],
      "coords": [
        [
          43.77269,
          6.20827
        ],
        [
          43.77275,
          6.20832
        ],
        [
          43.77301,
          6.20835
        ],
        [
          43.77311,
          6.20844
        ],
        [
          43.77325,
          6.20856
        ],
        [
          43.77332,
          6.20862
        ],
        [
          43.77323,
          6.20882
        ],
        [
          43.77357,
          6.2091
        ],
        [
          43.77343,
          6.20946
        ]
      ]
    }
  },
  {
    "id": "aups-marche",
    "cat": "marché",
    "coords": [
      43.62714,
      6.22377
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/aups-marche.jpg",
    "fr": {
      "name": "Marché Aups",
      "desc": "Marché tous les mercredi et samedi",
      "url": "https://www.tripadvisor.fr/Attraction_Review-g672316-d20911103-Reviews-Marche_Provencal_De_Aups-Aups_Var_Provence_Alpes_Cote_d_Azur.html"
    },
    "en": {
      "name": "Aups Market",
      "desc": "Market on Wednesdays & Saturdays",
      "url": "https://www.tripadvisor.fr/Attraction_Review-g672316-d20911103-Reviews-Marche_Provencal_De_Aups-Aups_Var_Provence_Alpes_Cote_d_Azur.html"
    },
    "de": {
      "name": "Markt von Aups",
      "desc": "Markt jeden Mittwoch und Samstag",
      "url": "https://www.tripadvisor.fr/Attraction_Review-g672316-d20911103-Reviews-Marche_Provencal_De_Aups-Aups_Var_Provence_Alpes_Cote_d_Azur.html"
    },
    "nl": {
      "name": "Markt van Aups",
      "desc": "Markt op woensdag en zaterdag",
      "url": "https://www.tripadvisor.fr/Attraction_Review-g672316-d20911103-Reviews-Marche_Provencal_De_Aups-Aups_Var_Provence_Alpes_Cote_d_Azur.html"
    },
    "pano": [
      99.173,
      44.846
    ],
    "scale": 0.7
  },
  {
    "id": "salles-panorama",
    "cat": "visite",
    "coords": [
      43.77235,
      6.20873
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/salles_panorama.jpeg",
    "fr": {
      "name": "Panorama Îles de Costebelle",
      "desc": "Splendide vue du lac et de l'île de Costebelle",
      "links": [
        {
          "url": "video.html?youtube=https%3A%2F%2Fyoutu.be%2F1jfdrL405zs",
          "label": "Voir la vidéo ▶️"
        },
        {
          "url": "https://www.google.com/maps/@43.7724377,6.2087249,3a,75y,180.06h,95.03t/data=!3m7!1e1!3m5!1sNZO4wbZuXhK2tlb5ILiVIg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-5.026924052406343%26panoid%3DNZO4wbZuXhK2tlb5ILiVIg%26yaw%3D180.06160344799838!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D",
          "label": "Itinéraire GPS 📍"
        }
      ]
    },
    "en": {
      "name": "Costebelle island view",
      "desc": "Incredible view of the lac and Costebelle Island",
      "links": [
        {
          "url": "video.html?youtube=https%3A%2F%2Fyoutu.be%2F1jfdrL405zs",
          "label": "Watch video ▶️"
        },
        {
          "url": "https://www.google.com/maps/@43.7724377,6.2087249,3a,75y,180.06h,95.03t/data=!3m7!1e1!3m5!1sNZO4wbZuXhK2tlb5ILiVIg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-5.026924052406343%26panoid%3DNZO4wbZuXhK2tlb5ILiVIg%26yaw%3D180.06160344799838!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D",
          "label": "GPS Directions 📍"
        }
      ]
    },
    "de": {
      "name": "Aussicht auf die Costebelle-Inseln",
      "desc": "Herrlicher Blick auf den See und die Île de Costebelle",
      "links": [
        {
          "url": "video.html?youtube=https%3A%2F%2Fyoutu.be%2F1jfdrL405zs",
          "label": "Video ansehen ▶️"
        },
        {
          "url": "https://www.google.com/maps/@43.7724377,6.2087249,3a,75y,180.06h,95.03t/data=!3m7!1e1!3m5!1sNZO4wbZuXhK2tlb5ILiVIg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-5.026924052406343%26panoid%3DNZO4wbZuXhK2tlb5ILiVIg%26yaw%3D180.06160344799838!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D",
          "label": "GPS-Route 📍"
        }
      ]
    },
    "nl": {
      "name": "Uitzicht op de eilanden van Costebelle",
      "desc": "Prachtig uitzicht op het meer en het eiland Costebelle",
      "links": [
        {
          "url": "video.html?youtube=https%3A%2F%2Fyoutu.be%2F1jfdrL405zs",
          "label": "Video bekijken ▶️"
        },
        {
          "url": "https://www.google.com/maps/@43.7724377,6.2087249,3a,75y,180.06h,95.03t/data=!3m7!1e1!3m5!1sNZO4wbZuXhK2tlb5ILiVIg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-5.026924052406343%26panoid%3DNZO4wbZuXhK2tlb5ILiVIg%26yaw%3D180.06160344799838!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D",
          "label": "GPS-route 📍"
        }
      ]
    },
    "pano": [
      18.937,
      55.048
    ],
    "scale": 1.5,
    "backintime": {
      "ville": [
        "salles"
      ],
      "coords": [
        48.438,
        79.065
      ]
    },
    "trace": {
      "logements": [
        "salles6",
        "salles8"
      ],
      "coords": [
        [
          43.77269,
          6.20827
        ],
        [
          43.7726,
          6.2082
        ],
        [
          43.77244,
          6.20856
        ],
        [
          43.77243,
          6.20861
        ],
        [
          43.77243,
          6.20865
        ],
        [
          43.77244,
          6.20869
        ]
      ]
    }
  },
  {
    "id": "salles-surfcenter",
    "cat": [
      "sportaquatique",
      "restaurant"
    ],
    "coords": [
      43.7733,
      6.20458
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/salles-surfcenter.png",
    "fr": {
      "name": "Surf center",
      "desc": "Location nautique, snack, glaces et concerts",
      "links": [
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DmoEdHK_xkCs",
          "label": "Voir la vidéo ▶️"
        },
        {
          "url": "galerie.html?folder=plage_margaridon&image=1.png",
          "label": "Vue de nuit 📸"
        },
        {
          "url": "https://surfcenter.fr",
          "label": "Site Web 🌐"
        }
      ]
    },
    "en": {
      "name": "Surf center",
      "desc": "Boat rental, snack, ice cream and concerts",
      "links": [
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DmoEdHK_xkCs",
          "label": "Watch video ▶️"
        },
        {
          "url": "galerie.html?folder=plage_margaridon&image=1.png&lang=EN",
          "label": "View by night 📸"
        },
        {
          "url": "https://surfcenter.fr",
          "label": "Website 🌐"
        }
      ]
    },
    "de": {
      "name": "Surf Center",
      "desc": "Bootsverleih, Snackbar, Eis und Konzerte",
      "links": [
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DmoEdHK_xkCs",
          "label": "Video ansehen ▶️"
        },
        {
          "url": "galerie.html?folder=plage_margaridon&image=1.png&lang=DE",
          "label": "Nachtansicht 📸"
        },
        {
          "url": "https://surfcenter.fr",
          "label": "Webseite 🌐"
        }
      ]
    },
    "nl": {
      "name": "Surf Center",
      "desc": "Bootverhuur, snackbar, ijs en concerten",
      "links": [
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DmoEdHK_xkCs",
          "label": "Video bekijken ▶️"
        },
        {
          "url": "galerie.html?folder=plage_margaridon&image=1.png&lang=NL",
          "label": "Nachtbeeld 📸"
        },
        {
          "url": "https://surfcenter.fr",
          "label": "Website 🌐"
        }
      ]
    },
    "pano": [
      20.562,
      55.685
    ],
    "scale": 1.3,
    "trace": {
      "logements": [
        "salles6",
        "salles8"
      ],
      "coords": [
        [
          43.77269,
          6.20827
        ],
        [
          43.77275,
          6.20832
        ],
        [
          43.77301,
          6.20835
        ],
        [
          43.77311,
          6.20844
        ],
        [
          43.77325,
          6.20856
        ],
        [
          43.77332,
          6.20862
        ],
        [
          43.77344,
          6.20873
        ],
        [
          43.77354,
          6.20881
        ],
        [
          43.77355,
          6.20879
        ],
        [
          43.77371,
          6.20842
        ],
        [
          43.7738,
          6.20848
        ],
        [
          43.77391,
          6.20822
        ],
        [
          43.7739,
          6.20816
        ],
        [
          43.77388,
          6.2081
        ],
        [
          43.77383,
          6.20807
        ],
        [
          43.77379,
          6.20804
        ],
        [
          43.77376,
          6.20801
        ],
        [
          43.77377,
          6.20799
        ],
        [
          43.77382,
          6.20797
        ],
        [
          43.77387,
          6.20797
        ],
        [
          43.77388,
          6.20789
        ],
        [
          43.77389,
          6.20779
        ],
        [
          43.77391,
          6.20769
        ],
        [
          43.77393,
          6.20757
        ],
        [
          43.77394,
          6.20748
        ],
        [
          43.77394,
          6.20742
        ],
        [
          43.77394,
          6.20737
        ],
        [
          43.77396,
          6.20734
        ],
        [
          43.77398,
          6.20726
        ],
        [
          43.77389,
          6.20721
        ],
        [
          43.77387,
          6.20719
        ],
        [
          43.77386,
          6.20716
        ],
        [
          43.77387,
          6.20712
        ],
        [
          43.77393,
          6.20674
        ],
        [
          43.77394,
          6.20671
        ],
        [
          43.77393,
          6.20665
        ],
        [
          43.77392,
          6.20661
        ],
        [
          43.77392,
          6.20657
        ],
        [
          43.77391,
          6.20652
        ],
        [
          43.77391,
          6.20649
        ],
        [
          43.77392,
          6.20647
        ],
        [
          43.77393,
          6.20646
        ],
        [
          43.77402,
          6.20642
        ],
        [
          43.77404,
          6.20641
        ],
        [
          43.77406,
          6.20638
        ],
        [
          43.77407,
          6.20636
        ],
        [
          43.77407,
          6.20633
        ],
        [
          43.77406,
          6.20628
        ],
        [
          43.77404,
          6.20625
        ],
        [
          43.77402,
          6.20624
        ],
        [
          43.774,
          6.20621
        ],
        [
          43.77399,
          6.20619
        ],
        [
          43.77399,
          6.20617
        ],
        [
          43.774,
          6.20613
        ],
        [
          43.77363,
          6.20595
        ],
        [
          43.7737,
          6.20566
        ],
        [
          43.77358,
          6.20556
        ],
        [
          43.7735,
          6.20542
        ],
        [
          43.77333,
          6.2053
        ],
        [
          43.77321,
          6.20519
        ],
        [
          43.7734,
          6.20484
        ],
        [
          43.77344,
          6.20464
        ],
        [
          43.77334,
          6.20453
        ],
        [
          43.77333,
          6.20452
        ]
      ]
    }
  },
  {
    "id": "gorges-saintmaurin",
    "cat": "visite",
    "coords": [
      43.79591,
      6.25826
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/cascade_saintmaurin.png",
    "fr": {
      "name": "Cascade Saint Maurin",
      "desc": "Superbe cascade à voir en remontant les gorges du Verdon",
      "links": [
        {
          "url": "video.html?youtube=https%3A%2F%2Fyoutube.com%2Fshorts%2F6_6PX8sX8Ig",
          "label": "Voir la vidéo ▶️"
        },
        {
          "url": "https://www.google.com/maps/place/Cascade+Saint+Maurin/@43.7960688,6.256383,17z/data=!3m1!4b1!4m6!3m5!1s0x12cbf1550ae39d99:0xdad64c06297f0695!8m2!3d43.796065!4d6.2589579!16s%2Fg%2F11hz7dhm87?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D",
          "label": "Itinéraire GPS 📍"
        }
      ]
    },
    "en": {
      "name": "Saint Maurin waterfall",
      "desc": "Superb waterfall to see when going up the Gorges du Verdon",
      "links": [
        {
          "url": "video.html?youtube=https%3A%2F%2Fyoutube.com%2Fshorts%2F6_6PX8sX8Ig",
          "label": "Watch video ▶️"
        },
        {
          "url": "https://www.google.com/maps/place/Cascade+Saint+Maurin/@43.7960688,6.256383,17z/data=!3m1!4b1!4m6!3m5!1s0x12cbf1550ae39d99:0xdad64c06297f0695!8m2!3d43.796065!4d6.2589579!16s%2Fg%2F11hz7dhm87?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D",
          "label": "GPS Directions 📍"
        }
      ]
    },
    "de": {
      "name": "Wasserfall Saint Maurin",
      "desc": "Wunderschöner Wasserfall, den man beim Aufstieg durch die Verdonschlucht sehen kann",
      "links": [
        {
          "url": "video.html?youtube=https%3A%2F%2Fyoutube.com%2Fshorts%2F6_6PX8sX8Ig",
          "label": "Video ansehen ▶️"
        },
        {
          "url": "https://www.google.com/maps/place/Cascade+Saint+Maurin/@43.7960688,6.256383,17z/data=!3m1!4b1!4m6!3m5!1s0x12cbf1550ae39d99:0xdad64c06297f0695!8m2!3d43.796065!4d6.2589579!16s%2Fg%2F11hz7dhm87?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D",
          "label": "GPS-Route 📍"
        }
      ]
    },
    "nl": {
      "name": "Waterval Saint Maurin",
      "desc": "Prachtige waterval die je ziet bij het stroomopwaarts gaan door de Gorges du Verdon",
      "links": [
        {
          "url": "video.html?youtube=https%3A%2F%2Fyoutube.com%2Fshorts%2F6_6PX8sX8Ig",
          "label": "Video bekijken ▶️"
        },
        {
          "url": "https://www.google.com/maps/place/Cascade+Saint+Maurin/@43.7960688,6.256383,17z/data=!3m1!4b1!4m6!3m5!1s0x12cbf1550ae39d99:0xdad64c06297f0695!8m2!3d43.796065!4d6.2589579!16s%2Fg%2F11hz7dhm87?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D",
          "label": "GPS-route 📍"
        }
      ]
    },
    "pano": [
      48.9,
      60.843
    ],
    "scale": 0.8
  },
  {
    "id": "galetas-pont",
    "cat": "visite",
    "coords": [
      43.80149,
      6.24933
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/pont-galetas.png",
    "fr": {
      "name": "Pont du Galetas",
      "desc": "Situé à l'entrée de la remontée des Gorges du Verdon, le pont du Galetas offre une vue exceptionnelle sur le lac!",
      "url": "https://www.google.com/maps/place/Pont+du+Galetas/@43.801699,6.2446141,17z/data=!4m14!1m7!3m6!1s0x12cbf0300a8e88ab:0x1ecd38f80a29cdb5!2sPont+du+Galetas!8m2!3d43.8016991!4d6.249485!16s%2Fg%2F11c2qfllx0!3m5!1s0x12cbf0300a8e88ab:0x1ecd38f80a29cdb5!8m2!3d43.8016991!4d6.249485!16s%2Fg%2F11c2qfllx0?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D"
    },
    "en": {
      "name": "Galetas bridge",
      "desc": "Located at the entrance of the lift of the Gorges du Verdon, the Galetas Bridge offers exceptional views of the lake!",
      "url": "https://www.google.com/maps/place/Pont+du+Galetas/@43.801699,6.2446141,17z/data=!4m14!1m7!3m6!1s0x12cbf0300a8e88ab:0x1ecd38f80a29cdb5!2sPont+du+Galetas!8m2!3d43.8016991!4d6.249485!16s%2Fg%2F11c2qfllx0!3m5!1s0x12cbf0300a8e88ab:0x1ecd38f80a29cdb5!8m2!3d43.8016991!4d6.249485!16s%2Fg%2F11c2qfllx0?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D"
    },
    "de": {
      "name": "Pont du Galetas",
      "desc": "Am Eingang zur Verdonschlucht gelegen, bietet die Galetas-Brücke einen atemberaubenden Blick auf den See!",
      "url": "https://www.google.com/maps/place/Pont+du+Galetas/@43.801699,6.2446141,17z/data=!4m14!1m7!3m6!1s0x12cbf0300a8e88ab:0x1ecd38f80a29cdb5!2sPont+du+Galetas!8m2!3d43.8016991!4d6.249485!16s%2Fg%2F11c2qfllx0!3m5!1s0x12cbf0300a8e88ab:0x1ecd38f80a29cdb5!8m2!3d43.8016991!4d6.249485!16s%2Fg%2F11c2qfllx0?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D"
    },
    "nl": {
      "name": "Pont du Galetas",
      "desc": "Gelegen bij de ingang van de Gorges du Verdon, biedt de Galetas-brug een uitzonderlijk uitzicht op het meer!",
      "url": "https://www.google.com/maps/place/Pont+du+Galetas/@43.801699,6.2446141,17z/data=!4m14!1m7!3m6!1s0x12cbf0300a8e88ab:0x1ecd38f80a29cdb5!2sPont+du+Galetas!8m2!3d43.8016991!4d6.249485!16s%2Fg%2F11c2qfllx0!3m5!1s0x12cbf0300a8e88ab:0x1ecd38f80a29cdb5!8m2!3d43.8016991!4d6.249485!16s%2Fg%2F11c2qfllx0?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D"
    },
    "pano": [
      48.276,
      60.15
    ],
    "scale": 1.1,
    "backintime": {
      "noClick": true,
      "ville": [
        "lac"
      ],
      "coords": [
        96.939,
        28.137
      ]
    }
  },
  {
    "id": "ancien-salles-backsalles",
    "cat": "toponyme",
    "hideFromMap": true,
    "coords": [
      43.77174,
      6.20028
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/lessalles/ancien.jpg",
    "fr": {
      "name": "📍Ancien village",
      "desc": "Découvrez l'évolution des Salles-sur-Verdon au cours des dernières décennie dans une animation...",
      "links": [
        {
          "url": "salles_backintime.html",
          "label": "retour vers le futur..."
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DLe36XX2qpW0",
          "label": "Reportage France 3 ▶️"
        }
      ]
    },
    "en": {
      "name": "📍Old village",
      "desc": "Discover the evolution of the Salles-sur-Verdon village over the last decades in an animation...",
      "links": [
        {
          "url": "salles_backintime.html?lang=EN",
          "label": "back to the futur..."
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DLe36XX2qpW0",
          "label": "France 3 TV show ▶️"
        }
      ]
    },
    "de": {
      "name": "📍Altes Dorf",
      "desc": "Entdecken Sie die Entwicklung von Les Salles-sur-Verdon über die letzten Jahrzehnte in einer Animation...",
      "links": [
        {
          "url": "salles_backintime.html?lang=DE",
          "label": "Zurück in die Zukunft..."
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DLe36XX2qpW0",
          "label": "Reportage France 3 ▶️"
        }
      ]
    },
    "nl": {
      "name": "📍Oud dorp",
      "desc": "Ontdek de evolutie van het dorp Les Salles-sur-Verdon over de afgelopen decennia in een animatie...",
      "links": [
        {
          "url": "salles_backintime.html?lang=NL",
          "label": "Terug naar de toekomst..."
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DLe36XX2qpW0",
          "label": "Reportage France 3 ▶️"
        }
      ]
    },
    "backintime": {
      "ville": [
        "salles"
      ],
      "coords": [
        38.55,
        49.47
      ]
    }
  },
  {
    "id": "ancien-salles",
    "cat": "toponyme",
    "coords": [
      43.77174,
      6.20028
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/lessalles/ancien.jpg",
    "fr": {
      "name": "📍Ancien village",
      "desc": "Découvrez l'évolution des Salles-sur-Verdon au cours des dernières décennie dans une animation...",
      "links": [
        {
          "url": "salles_backintime.html",
          "label": "retour vers le futur..."
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DLe36XX2qpW0",
          "label": "Reportage France 3 ▶️"
        }
      ]
    },
    "en": {
      "name": "📍Old village",
      "desc": "Discover the evolution of the Salles-sur-Verdon village over the last decades in an animation...",
      "links": [
        {
          "url": "salles_backintime.html?lang=EN",
          "label": "back to the futur..."
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DLe36XX2qpW0",
          "label": "France 3 TV show ▶️"
        }
      ]
    },
    "de": {
      "name": "📍Altes Dorf",
      "desc": "Entdecken Sie die Entwicklung von Les Salles-sur-Verdon über die letzten Jahrzehnte in einer Animation...",
      "links": [
        {
          "url": "salles_backintime.html?lang=DE",
          "label": "Zurück in die Zukunft..."
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DLe36XX2qpW0",
          "label": "Reportage France 3 ▶️"
        }
      ]
    },
    "nl": {
      "name": "📍Oud dorp",
      "desc": "Ontdek de evolutie van het dorp Les Salles-sur-Verdon over de afgelopen decennia in een animatie...",
      "links": [
        {
          "url": "salles_backintime.html?lang=NL",
          "label": "Terug naar de toekomst..."
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DLe36XX2qpW0",
          "label": "Reportage France 3 ▶️"
        }
      ]
    },
    "pano": [
      18.591,
      52.179
    ],
    "backintime": {
      "noClick": true,
      "ville": [
        "lac"
      ],
      "coords": [
        85.189,
        49.416
      ]
    }
  },
  {
    "id": "ancien-moustiers",
    "cat": "toponyme",
    "coords": [
      43.84796,
      6.22143
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/moustiers/ancien.jpg",
    "fr": {
      "name": "📍Moustiers",
      "desc": "Découvrez l'évolution du village au cours des dernières décennie dans une animation...",
      "links": [
        {
          "url": "moustiers_backintime.html",
          "label": "retour vers le futur..."
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D9-DuIpBI8ec",
          "label": "Reportage France 3 ▶️"
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fyoutu.be%2FxMaMBrJk9Aw",
          "label": "Village préféré des Français ▶️"
        }
      ]
    },
    "en": {
      "name": "📍Moustiers",
      "desc": "Discover the evolution of the village over the last decades in an animation...",
      "links": [
        {
          "url": "moustiers_backintime.html?lang=EN",
          "label": "back to the futur..."
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D9-DuIpBI8ec",
          "label": "France 3 TV show ▶️"
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fyoutu.be%2FxMaMBrJk9Aw",
          "label": "French preferred village ▶️"
        }
      ]
    },
    "de": {
      "name": "📍Moustiers",
      "desc": "Entdecken Sie die Entwicklung des Dorfes über die letzten Jahrzehnte in einer Animation...",
      "links": [
        {
          "url": "moustiers_backintime.html?lang=DE",
          "label": "Zurück in die Zukunft..."
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D9-DuIpBI8ec",
          "label": "Reportage France 3 ▶️"
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fyoutu.be%2FxMaMBrJk9Aw",
          "label": "Lieblingsdorf der Franzosen ▶️"
        }
      ]
    },
    "nl": {
      "name": "📍Moustiers",
      "desc": "Ontdek de evolutie van het dorp over de afgelopen decennia in een animatie...",
      "links": [
        {
          "url": "moustiers_backintime.html?lang=NL",
          "label": "Terug naar de toekomst..."
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D9-DuIpBI8ec",
          "label": "Reportage France 3 ▶️"
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fyoutu.be%2FxMaMBrJk9Aw",
          "label": "Favoriete dorp van de Fransen ▶️"
        }
      ]
    },
    "pano": [
      44.969,
      44.74
    ],
    "backintime": {
      "noClick": true,
      "ville": [
        "lac"
      ],
      "coords": [
        92.174,
        8.842
      ],
      "labelPos": "below"
    }
  },
  {
    "id": "ancien-lac",
    "cat": "toponyme",
    "coords": [
      43.78652,
      6.2047
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/lac_vallee.jpg",
    "fr": {
      "name": "📍Vallée du Verdon",
      "desc": "Découvrez la vallée avant la création du lac dans une animation...",
      "links": [
        {
          "url": "lac_backintime.html",
          "label": "retour vers le futur..."
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D1bll-_r4bHQ",
          "label": "Reportage RMC Decouverte ▶️"
        }
      ]
    },
    "en": {
      "name": "📍Verdon Valley",
      "desc": "Discover the valley before the creation of the lake in an animation...",
      "links": [
        {
          "url": "lac_backintime.html?lang=EN",
          "label": "back to the futur..."
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D1bll-_r4bHQ",
          "label": "RMC Decouverte TV show ▶️"
        }
      ]
    },
    "de": {
      "name": "📍Verdontal",
      "desc": "Entdecken Sie das Tal vor der Entstehung des Sees in einer Animation...",
      "links": [
        {
          "url": "lac_backintime.html?lang=DE",
          "label": "Zurück in die Zukunft..."
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D1bll-_r4bHQ",
          "label": "Reportage RMC Découverte ▶️"
        }
      ]
    },
    "nl": {
      "name": "📍Verdondal",
      "desc": "Ontdek de vallei vóór het ontstaan van het meer in een animatie...",
      "links": [
        {
          "url": "lac_backintime.html?lang=NL",
          "label": "Terug naar de toekomst..."
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D1bll-_r4bHQ",
          "label": "Reportage RMC Découverte ▶️"
        }
      ]
    },
    "backintime": {
      "noClick": true,
      "ville": [
        "lac"
      ],
      "coords": [
        52.292,
        39.001
      ]
    },
    "pano": [
      28.948,
      56.206
    ],
    "scale": 1
  },
  {
    "id": "logement-lac-moustiers",
    "cat": "logement",
    "hideFromMap": true,
    "coords": [
      0,
      0
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/moustiers-terrasse.jpg",
    "fr": {
      "name": "Bell'Étoile",
      "desc": "Position du logement par rapport au lac."
    },
    "en": {
      "name": "Bell'Étoile",
      "desc": "Accommodation location relative to the lake."
    },
    "de": {
      "name": "Bell'Étoile",
      "desc": "Lage der Unterkunft in Bezug auf den See."
    },
    "nl": {
      "name": "Bell'Étoile",
      "desc": "Ligging van de accommodatie ten opzichte van het meer."
    },
    "backintime": {
      "noClick": true,
      "ville": [
        "lac"
      ],
      "coords": [
        90.062,
        8.395
      ]
    }
  },
  {
    "id": "pont-aiguines",
    "cat": "toponyme",
    "hideFromMap": true,
    "coords": [
      43.7746,
      6.2114
    ],
    "img": "https://bellodulac.netlify.app/images/pont_aiguines.jpg",
    "fr": {
      "name": "📍Pont d'Aiguines",
      "desc": "Decouvrez l'ancien pont d'Aiguines, englouti lors de la mise en eau du lac de Sainte-Croix en 1974. Par temps sec, ses vestiges refont parfois surface.",
      "links": [
        {
          "url": "https://fr.aroundus.com/p/7414762-pont-d-aiguines",
          "label": "Plus d'information"
        }
      ]
    },
    "en": {
      "name": "📍Aiguines bridge",
      "desc": "Discover the old Aiguines bridge, submerged when Lake Sainte-Croix was flooded in 1974. In dry periods, its remains sometimes resurface.",
      "links": [
        {
          "url": "https://fr.aroundus.com/p/7414762-pont-d-aiguines",
          "label": "More details"
        }
      ]
    },
    "de": {
      "name": "📍Brücke von Aiguines",
      "desc": "Entdecken Sie die alte Brücke von Aiguines, die 1974 bei der Flutung des Lac de Sainte-Croix überflutet wurde. In trockenen Zeiten kommen ihre Überreste manchmal wieder zum Vorschein.",
      "links": [
        {
          "url": "https://fr.aroundus.com/p/7414762-pont-d-aiguines",
          "label": "Weitere Informationen"
        }
      ]
    },
    "nl": {
      "name": "📍Brug van Aiguines",
      "desc": "Ontdek de oude brug van Aiguines, die in 1974 onder water kwam te staan bij het vullen van het Meer van Sainte-Croix. In droge periodes komen de resten soms weer boven water.",
      "links": [
        {
          "url": "https://fr.aroundus.com/p/7414762-pont-d-aiguines",
          "label": "Meer informatie"
        }
      ]
    },
    "backintime": {
      "noClick": true,
      "ville": [
        "lac"
      ],
      "coords": [
        90.494,
        30.342
      ]
    }
  },
  {
    "id": "logement-lac-salles",
    "cat": "logement",
    "hideFromMap": true,
    "coords": [
      0,
      0
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/bello6-cover.jpg",
    "fr": {
      "name": "Bell'O du Lac",
      "desc": "Position du logement par rapport au lac."
    },
    "en": {
      "name": "Bell'O du Lac",
      "desc": "Accommodation location relative to the lake."
    },
    "de": {
      "name": "Bell'O du Lac",
      "desc": "Lage der Unterkunft in Bezug auf den See."
    },
    "nl": {
      "name": "Bell'O du Lac",
      "desc": "Ligging van de accommodatie ten opzichte van het meer."
    },
    "backintime": {
      "noClick": true,
      "ville": [
        "lac"
      ],
      "coords": [
        86.785,
        48.565
      ]
    }
  },
  {
    "id": "topo-lac-salles-sur-verdon-mrklhblt",
    "cat": "toponyme",
    "coords": [
      43.77493,
      6.21103
    ],
    "img": "https://bellodulac.netlify.app/images/salles_verdon.jpg",
    "fr": {
      "name": "📍Salles sur Verdon",
      "desc": "Le village des Salles-sur-Verdon est idéalement situé, sur les rives du lac de Sainte-Croix et à proximité des Gorges du Verdon.",
      "links": [
        {
          "url": "https://provence-alpes-cotedazur.com/decouvrir/villes/var/les-salles-sur-verdon/",
          "label": "Plus d'informations"
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DLe36XX2qpW0",
          "label": "Reportage France 3 ▶️"
        }
      ]
    },
    "en": {
      "name": "📍Salles sur Verdon",
      "desc": "The village of Les Salles-sur-Verdon is ideally located, on the shores of the lake of Sainte-Croix and near the Gorges du Verdon",
      "links": [
        {
          "url": "https://provence-alpes-cotedazur.com/decouvrir/villes/var/les-salles-sur-verdon/",
          "label": "More details"
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DLe36XX2qpW0",
          "label": "Reportage France 3 ▶️"
        }
      ]
    },
    "de": {
      "name": "📍Les Salles-sur-Verdon",
      "desc": "Das Dorf Les Salles-sur-Verdon liegt ideal an den Ufern des Lac de Sainte-Croix und in der Nähe der Verdonschlucht.",
      "links": [
        {
          "url": "https://provence-alpes-cotedazur.com/decouvrir/villes/var/les-salles-sur-verdon/",
          "label": "Weitere Informationen"
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DLe36XX2qpW0",
          "label": "Reportage France 3 ▶️"
        }
      ]
    },
    "nl": {
      "name": "📍Les Salles-sur-Verdon",
      "desc": "Het dorp Les Salles-sur-Verdon ligt ideaal aan de oevers van het Meer van Sainte-Croix en dicht bij de Gorges du Verdon.",
      "links": [
        {
          "url": "https://provence-alpes-cotedazur.com/decouvrir/villes/var/les-salles-sur-verdon/",
          "label": "Meer informatie"
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DLe36XX2qpW0",
          "label": "Reportage France 3 ▶️"
        }
      ]
    },
    "backintime": {
      "noClick": true,
      "ville": [
        "lac"
      ],
      "coords": [
        88.215,
        50.092
      ],
      "labelPos": "below"
    }
  },
  {
    "id": "topo-lac-bauduen-mrkjuc25",
    "cat": "toponyme",
    "coords": [
      43.732080727705345,
      6.1771488189697275
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/bauduen.png",
    "fr": {
      "name": "📍Bauduen",
      "desc": "Grande plage aménagée côté Var du lac Sainte-Croix. Port de plaisance, location de bateaux."
    },
    "en": {
      "name": "📍Bauduen",
      "desc": "Large equipped beach on the Var side of Lake Sainte-Croix. Marina and boat rentals."
    },
    "de": {
      "name": "📍Bauduen",
      "desc": "Großer, ausgestatteter Strand auf der Var-Seite des Lac de Sainte-Croix. Yachthafen und Bootsverleih."
    },
    "nl": {
      "name": "📍Bauduen",
      "desc": "Groot ingericht strand aan de Var-zijde van het Meer van Sainte-Croix. Jachthaven en bootverhuur."
    }
  },
  {
    "id": "topo-lac-bauduen-mrkjuc24",
    "cat": "toponyme",
    "hideFromMap": true,
    "coords": [
      43.732080727705345,
      6.1771488189697275
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/plage-bauduen.jpg",
    "fr": {
      "name": "📍Bauduen",
      "desc": "Grande plage aménagée côté Var du lac Sainte-Croix. Port de plaisance, location de bateaux.",
      "url": "https://www.lacs-gorges-verdon.fr/aquatique/bagnades-plages/5601-plage-de-bauduen.html",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "📍Bauduen",
      "desc": "Large equipped beach on the Var side of Lake Sainte-Croix. Marina and boat rentals.",
      "url": "https://www.lacs-gorges-verdon.fr/aquatique/bagnades-plages/5601-plage-de-bauduen.html",
      "urlLabel": "More details"
    },
    "de": {
      "name": "📍Bauduen",
      "desc": "Großer, ausgestatteter Strand auf der Var-Seite des Lac de Sainte-Croix. Yachthafen und Bootsverleih.",
      "url": "https://www.lacs-gorges-verdon.fr/aquatique/bagnades-plages/5601-plage-de-bauduen.html",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "📍Bauduen",
      "desc": "Groot ingericht strand aan de Var-zijde van het Meer van Sainte-Croix. Jachthaven en bootverhuur.",
      "url": "https://www.lacs-gorges-verdon.fr/aquatique/bagnades-plages/5601-plage-de-bauduen.html",
      "urlLabel": "Meer informatie"
    },
    "backintime": {
      "noClick": true,
      "ville": [
        "lac"
      ],
      "coords": [
        78.361,
        77.949
      ]
    }
  },
  {
    "id": "topo-lac-sainte-croix-du-verdon-mrkjwkq7",
    "cat": "toponyme",
    "coords": [
      43.76010700609544,
      6.154017448425293
    ],
    "img": "https://bellodulac.netlify.app/images/saintecroix.png",
    "fr": {
      "name": "📍Sainte-Croix-du-Verdon",
      "desc": "Plage du village de Sainte-Croix-du-Verdon, à l'extrémité ouest du lac. Eaux turquoise, cadre paisible."
    },
    "en": {
      "name": "📍Sainte-Croix-du-Verdon",
      "desc": "Beach at Sainte-Croix-du-Verdon village, western end of the lake. Turquoise waters, peaceful setting."
    },
    "de": {
      "name": "📍Sainte-Croix-du-Verdon",
      "desc": "Strand des Dorfes Sainte-Croix-du-Verdon, am westlichen Ende des Sees. Türkisfarbenes Wasser, ruhige Umgebung."
    },
    "nl": {
      "name": "📍Sainte-Croix-du-Verdon",
      "desc": "Strand van het dorp Sainte-Croix-du-Verdon, aan het westelijke uiteinde van het meer. Turquoise water, rustige omgeving."
    },
    "backintime": {
      "noClick": true,
      "ville": [
        "lac"
      ],
      "coords": [
        72.028,
        60.95
      ]
    }
  },
  {
    "id": "topo-lac-sainte-croix-du-verdon-mrkjwkq6",
    "cat": "toponyme",
    "hideFromMap": true,
    "coords": [
      43.76010700609544,
      6.154017448425293
    ],
    "img": "https://bellodulac.netlify.app/images/sainte_croix.jpg",
    "fr": {
      "name": "📍Sainte-Croix-du-Verdon",
      "desc": "Plage du village de Sainte-Croix-du-Verdon, à l'extrémité ouest du lac. Eaux turquoise, cadre paisible.",
      "url": "https://lesgorgesduverdon.fr/sainte-croix-du-verdon/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "📍Sainte-Croix-du-Verdon",
      "desc": "Beach at Sainte-Croix-du-Verdon village, western end of the lake. Turquoise waters, peaceful setting.",
      "url": "https://lesgorgesduverdon.fr/sainte-croix-du-verdon/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "📍Sainte-Croix-du-Verdon",
      "desc": "Strand des Dorfes Sainte-Croix-du-Verdon, am westlichen Ende des Sees. Türkisfarbenes Wasser, ruhige Umgebung.",
      "url": "https://lesgorgesduverdon.fr/sainte-croix-du-verdon/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "📍Sainte-Croix-du-Verdon",
      "desc": "Strand van het dorp Sainte-Croix-du-Verdon, aan het westelijke uiteinde van het meer. Turquoise water, rustige omgeving.",
      "url": "https://lesgorgesduverdon.fr/sainte-croix-du-verdon/",
      "urlLabel": "Meer informatie"
    },
    "backintime": {
      "noClick": true,
      "ville": [
        "lac"
      ],
      "coords": [
        72.028,
        60.95
      ]
    }
  },
  {
    "id": "topo-lac-pont-de-sainte-croix-mrkjxguc",
    "cat": "toponyme",
    "hideFromMap": true,
    "coords": [
      0,
      0
    ],
    "img": "https://bellodulac.netlify.app/images/pont_saintecroix.jpg",
    "fr": {
      "name": "📍Pont de Sainte-Croix",
      "desc": "Deuxième pont situé juste avant le barrage permettant de traverser le lac entre Baudinard et Sainte-Croix-du-Verdon"
    },
    "en": {
      "name": "📍Sainte-Croix Dam",
      "desc": "Second bridge located just before the dam, allowing one to cross the lake between Baudinard and Sainte-Croix-du-Verdon."
    },
    "de": {
      "name": "📍Brücke von Sainte-Croix",
      "desc": "Zweite Brücke kurz vor dem Staudamm, die eine Überquerung des Sees zwischen Baudinard und Sainte-Croix-du-Verdon ermöglicht."
    },
    "nl": {
      "name": "📍Brug van Sainte-Croix",
      "desc": "Tweede brug, net voor de stuwdam, waarmee je het meer kunt oversteken tussen Baudinard en Sainte-Croix-du-Verdon."
    },
    "backintime": {
      "noClick": true,
      "ville": [
        "lac"
      ],
      "coords": [
        69.699,
        75.743
      ]
    }
  },
  {
    "id": "topo-lac-gorges-de-baudinard-mrkke3qe",
    "cat": "toponyme",
    "hideFromMap": true,
    "coords": [
      0,
      0
    ],
    "img": "https://bellodulac.netlify.app/images/gorges_baudinard.jpg",
    "fr": {
      "name": "📍Gorges de Baudinard",
      "desc": "Situées entre le lac de Quinson et le barrage du lac de Sainte-Croix, son canyon étroit est entouré de falaises impressionnantes plongeant tout droit dans l’eau turquoise.",
      "url": "https://www.decouvrirlesud.fr/gorges-baudinard-verdon/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "📍Baudinard Gorge",
      "desc": "Located between Lake Quinson and the Sainte-Croix Lake dam, its narrow canyon is surrounded by impressive cliffs plunging straight into the turquoise water.",
      "url": "https://www.decouvrirlesud.fr/gorges-baudinard-verdon/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "📍Schlucht von Baudinard",
      "desc": "Zwischen dem Lac de Quinson und dem Staudamm des Lac de Sainte-Croix gelegen, ist die enge Schlucht von beeindruckenden Felswänden umgeben, die direkt ins türkisfarbene Wasser abfallen.",
      "url": "https://www.decouvrirlesud.fr/gorges-baudinard-verdon/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "📍Kloof van Baudinard",
      "desc": "Gelegen tussen het Meer van Quinson en de stuwdam van het Meer van Sainte-Croix, wordt de smalle kloof omringd door indrukwekkende kliffen die recht in het turquoise water uitmonden.",
      "url": "https://www.decouvrirlesud.fr/gorges-baudinard-verdon/",
      "urlLabel": "Meer informatie"
    },
    "backintime": {
      "noClick": true,
      "ville": [
        "lac"
      ],
      "coords": [
        63.813,
        70.342
      ]
    }
  },
  {
    "id": "topo-lac-lac-de-montpezat-mrkkz97z",
    "cat": "toponyme",
    "hideFromMap": true,
    "coords": [
      0,
      0
    ],
    "img": "https://bellodulac.netlify.app/images/lac_montpezat.png",
    "fr": {
      "name": "📍Lac de Montpezat",
      "desc": "Ce lac offre une expérience intime avec la nature, idéale pour les amateurs de tranquillité et d'activités en plein air",
      "url": "https://www.tourisme-alpes-haute-provence.com/lacs-et-gorges/lac-de-montpezat/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "📍Montpezat lake",
      "desc": "This lake offers an intimate experience with nature, ideal for lovers of tranquility and outdoor activities",
      "url": "https://www.tourisme-alpes-haute-provence.com/lacs-et-gorges/lac-de-montpezat/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "📍Lac de Montpezat",
      "desc": "Dieser See bietet ein intensives Naturerlebnis und ist ideal für alle, die Ruhe und Aktivitäten im Freien schätzen.",
      "url": "https://www.tourisme-alpes-haute-provence.com/lacs-et-gorges/lac-de-montpezat/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "📍Meer van Montpezat",
      "desc": "Dit meer biedt een intiem contact met de natuur, ideaal voor liefhebbers van rust en buitenactiviteiten.",
      "url": "https://www.tourisme-alpes-haute-provence.com/lacs-et-gorges/lac-de-montpezat/",
      "urlLabel": "Meer informatie"
    },
    "backintime": {
      "noClick": true,
      "ville": [
        "lac"
      ],
      "coords": [
        55.515,
        72.9
      ]
    }
  },
  {
    "id": "topo-lac-lac-d-artignosc-mrkkzsox",
    "cat": "toponyme",
    "hideFromMap": true,
    "coords": [
      43.7201611920567,
      6.090223789215088
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/plage-artignosc.jpg",
    "fr": {
      "name": "📍Lac d'Artignosc",
      "desc": "Location de canoë-kayak depuis la plage d’Artignosc",
      "url": "https://base-nautique-artignosc.fr/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "📍Artignosc lake",
      "desc": "Canoe-kayak journey Canoe from Artignosc beach",
      "url": "https://base-nautique-artignosc.fr/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "📍Lac d'Artignosc",
      "desc": "Kanu- und Kajakverleih am Strand von Artignosc",
      "url": "https://base-nautique-artignosc.fr/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "📍Meer van Artignosc",
      "desc": "Kano- en kajakverhuur vanaf het strand van Artignosc",
      "url": "https://base-nautique-artignosc.fr/",
      "urlLabel": "Meer informatie"
    },
    "backintime": {
      "noClick": true,
      "ville": [
        "lac"
      ],
      "coords": [
        56.303,
        87.1
      ],
      "labelPos": "below"
    }
  },
  {
    "id": "topo-lac-quinson-mrkl30kq",
    "cat": "toponyme",
    "coords": [
      43.69401,
      6.03751
    ],
    "img": "https://bellodulac.netlify.app/images/quinson.png",
    "fr": {
      "name": "📍Quinson",
      "desc": "Grande plage aménagée à côté du pont de Quinson."
    },
    "en": {
      "name": "📍Quinson",
      "desc": "Large beach area next to the Quinson bridge."
    },
    "de": {
      "name": "📍Quinson",
      "desc": "Großer, ausgestatteter Strand direkt neben der Brücke von Quinson."
    },
    "nl": {
      "name": "📍Quinson",
      "desc": "Groot ingericht strand naast de brug van Quinson."
    }
  },
  {
    "id": "topo-lac-quinson-mrkl29kq",
    "cat": "toponyme",
    "hideFromMap": true,
    "coords": [
      43.69390328311974,
      6.037218861795549
    ],
    "img": "https://bellodulac.netlify.app/images/plage-quinson.jpg",
    "fr": {
      "name": "📍Quinson",
      "desc": "Grande plage aménagée à côté du pont de Quinson.",
      "url": "https://www.la-provence-verte.net/activites/nature-montmeyan-plage-de-montmeyan-au-lac-de-quinson_1155.html",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "📍Quinson",
      "desc": "Large beach area next to the Quinson bridge.",
      "url": "https://www.la-provence-verte.net/activites/nature-montmeyan-plage-de-montmeyan-au-lac-de-quinson_1155.html",
      "urlLabel": "More details"
    },
    "de": {
      "name": "📍Quinson",
      "desc": "Großer, ausgestatteter Strand direkt neben der Brücke von Quinson.",
      "url": "https://www.la-provence-verte.net/activites/nature-montmeyan-plage-de-montmeyan-au-lac-de-quinson_1155.html",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "📍Quinson",
      "desc": "Groot ingericht strand naast de brug van Quinson.",
      "url": "https://www.la-provence-verte.net/activites/nature-montmeyan-plage-de-montmeyan-au-lac-de-quinson_1155.html",
      "urlLabel": "Meer informatie"
    },
    "backintime": {
      "noClick": true,
      "ville": [
        "lac"
      ],
      "coords": [
        44.538,
        98.897
      ]
    }
  },
  {
    "id": "esparron-de-verdon-village",
    "cat": "toponyme",
    "coords": [
      43.73898,
      5.97363
    ],
    "stars": 2,
    "img": "https://laperleduverdon.fr/wp-content/uploads/2022/01/Village-Verdon.jpg",
    "fr": {
      "name": "Esparron-de-Verdon",
      "desc": "Surnommé « la Perle du Verdon », ce village perché domine son lac aux eaux turquoise, à l'entrée des Basses Gorges. Ruelles provençales, château et petit port.",
      "url": "https://laperleduverdon.fr/esparron-de-verdon/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Esparron-de-Verdon",
      "desc": "Nicknamed \"the Pearl of the Verdon\", this hilltop village overlooks its turquoise lake at the entrance to the Lower Gorges. Provençal lanes, a château and a small harbour.",
      "url": "https://laperleduverdon.fr/esparron-de-verdon/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Esparron-de-Verdon",
      "desc": "Das auch als „Perle des Verdon\" bekannte Bergdorf thront über seinem türkisfarbenen See am Eingang zu den Basses Gorges. Provenzalische Gassen, ein Schloss und ein kleiner Hafen.",
      "url": "https://laperleduverdon.fr/esparron-de-verdon/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Esparron-de-Verdon",
      "desc": "Bijgenaamd \"de Parel van de Verdon\", torent dit dorp op een heuvel boven zijn turquoise meer, aan de ingang van de Basses Gorges. Provençaalse steegjes, een kasteel en een kleine haven.",
      "url": "https://laperleduverdon.fr/esparron-de-verdon/",
      "urlLabel": "Meer informatie"
    }
  },
  {
    "id": "topo-lac-lac-d-esparron-mrkl347r",
    "cat": "toponyme",
    "hideFromMap": true,
    "coords": [
      43.73637930389275,
      5.9671854972839355
    ],
    "img": "https://bellodulac.netlify.app/images/plage-esparron.jpg",
    "fr": {
      "name": "📍Lac d'Esparron",
      "desc": "Petit lac sauvage en aval des basses Gorges. Calanques d'eau douce, kayak et baignade tranquille.",
      "url": "https://www.tourisme-alpes-haute-provence.com/grands-espaces-naturels/768346_lac-esparron-de-verdon-le-lac-d-esparron-de-verdon/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "📍Lake Esparron",
      "desc": "Small wild lake downstream from the lower Gorges. Freshwater creeks, kayaking and quiet swimming.",
      "url": "https://www.tourisme-alpes-haute-provence.com/grands-espaces-naturels/768346_lac-esparron-de-verdon-le-lac-d-esparron-de-verdon/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "📍Esparron-See",
      "desc": "Kleiner wilder See unterhalb der unteren Schlucht. Süßwasserbuchten, Kajakfahren und ruhiges Baden.",
      "url": "https://www.tourisme-alpes-haute-provence.com/grands-espaces-naturels/768346_lac-esparron-de-verdon-le-lac-d-esparron-de-verdon/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "📍Meer van Esparron",
      "desc": "Klein wild meer stroomafwaarts van de lagere kloof. Zoetwaterkreekjes, kajakken en rustig zwemmen.",
      "url": "https://www.tourisme-alpes-haute-provence.com/grands-espaces-naturels/768346_lac-esparron-de-verdon-le-lac-d-esparron-de-verdon/",
      "urlLabel": "Meer informatie"
    },
    "backintime": {
      "noClick": true,
      "ville": [
        "lac"
      ],
      "coords": [
        20.746,
        76.847
      ]
    }
  },
  {
    "id": "topo-lac-basses-gorges-mrkl4060",
    "cat": "toponyme",
    "hideFromMap": true,
    "coords": [
      43.69479634538052,
      6.039627674142737
    ],
    "img": "https://bellodulac.netlify.app/images/quinson-rando.jpg",
    "fr": {
      "name": "📍Basses Gorges",
      "desc": "Remontée en canoë-kayak depuis le Pont du Quinson à Esparron ou randonnée sur l'ancien sentier du garde canal",
      "links": [
        {
          "url": "gpx/quinson_gorges_basses.pdf",
          "label": "Parcours en canoë-kayak"
        },
        {
          "url": "gpx/rando_quinson.html",
          "label": "Parcours en randonnée"
        }
      ]
    },
    "en": {
      "name": "📍Low Gorge",
      "desc": "Canoe or kayak trip upstream from the Pont du Quinson at Esparron, or a hike along the old canal keeper's path.",
      "links": [
        {
          "url": "gpx/quinson_gorges_basses.pdf",
          "label": "Canoe and kayak route"
        },
        {
          "url": "gpx/rando_quinson.html",
          "label": "Hiking route"
        }
      ]
    },
    "de": {
      "name": "📍Untere Schlucht",
      "desc": "Kanu- oder Kajaktour flussaufwärts ab der Pont du Quinson bei Esparron, oder eine Wanderung auf dem alten Weg des Kanalwärters.",
      "links": [
        {
          "url": "gpx/quinson_gorges_basses.pdf",
          "label": "Kanu- und Kajakroute"
        },
        {
          "url": "gpx/rando_quinson.html",
          "label": "Wanderroute"
        }
      ]
    },
    "nl": {
      "name": "📍Lage Kloof",
      "desc": "Kano- of kajaktocht stroomopwaarts vanaf de Pont du Quinson bij Esparron, of een wandeling langs het oude pad van de kanaalwachter.",
      "links": [
        {
          "url": "gpx/quinson_gorges_basses.pdf",
          "label": "Kano- en kajakroute"
        },
        {
          "url": "gpx/rando_quinson.html",
          "label": "Wandelroute"
        }
      ]
    },
    "backintime": {
      "noClick": true,
      "ville": [
        "lac"
      ],
      "coords": [
        30.672,
        92.613
      ]
    }
  },
  {
    "id": "topo-lac-lapalud-sur-verdon",
    "cat": "toponyme",
    "coords": [
      43.7798,
      6.3411
    ],
    "img": "https://www.closdebarbey.com/sites/default/files/styles/ban/public/2022-05/village-la-palud-sur-verdon_0118.jpg",
    "fr": {
      "name": "📍La Palud-sur-Verdon",
      "desc": "Capitale de l'escalade et point de départ idéal pour explorer la mythique Route des Crêtes au cœur des Gorges du Verdon."
    },
    "en": {
      "name": "📍La Palud-sur-Verdon",
      "desc": "Capital of climbing and the ideal starting point to explore the legendary Route des Crêtes in the heart of the Verdon Gorges."
    },
    "de": {
      "name": "📍La Palud-sur-Verdon",
      "desc": "Hauptstadt des Kletterns und idealer Ausgangspunkt, um die legendäre Route des Crêtes im Herzen der Verdon-Schlucht zu erkunden."
    },
    "nl": {
      "name": "📍La Palud-sur-Verdon",
      "desc": "Hoofdstad van het klimmen en het ideale vertrekpunt om de legendarische Route des Crêtes te verkennen, in het hart van de Gorges du Verdon."
    }
  },
  {
    "id": "topo-lac-aiguines-mrkl72un",
    "cat": "toponyme",
    "coords": [
      43.77614,
      6.24221
    ],
    "img": "https://bellodulac.netlify.app/images/aiguines.png",
    "fr": {
      "name": "📍Aiguines",
      "desc": "Point de vue sur les collines du haut-var depuis la table d'orientation en céramique avec un banc à l'ombre."
    },
    "en": {
      "name": "📍Aiguines",
      "desc": "Viewpoint overlooking the hills of the upper Var from the ceramic orientation table with a bench in the shade."
    },
    "de": {
      "name": "📍Aiguines",
      "desc": "Aussichtspunkt über die Hügel des oberen Var, mit einer keramischen Orientierungstafel und einer schattigen Bank."
    },
    "nl": {
      "name": "📍Aiguines",
      "desc": "Uitzichtpunt over de heuvels van de Haute-Var, met een keramische oriëntatietafel en een bankje in de schaduw."
    }
  },
  {
    "id": "topo-lac-aiguines-mrkl71un",
    "cat": "toponyme",
    "hideFromMap": true,
    "coords": [
      43.776906952666536,
      6.243630051612855
    ],
    "img": "https://bellodulac.netlify.app/images/aiguines_orientation.jpg",
    "fr": {
      "name": "📍Aiguines",
      "desc": "Point de vue sur les collines du haut-var depuis la table d'orientation en céramique avec un banc à l'ombre.",
      "url": "https://www.lacs-gorges-verdon.fr/voir-visiter/sites-et-monuments/3962-chateau-d-aiguines.html",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "📍Aiguines",
      "desc": "Viewpoint overlooking the hills of the upper Var from the ceramic orientation table with a bench in the shade.",
      "url": "https://www.lacs-gorges-verdon.fr/voir-visiter/sites-et-monuments/3962-chateau-d-aiguines.html",
      "urlLabel": "More details"
    },
    "de": {
      "name": "📍Aiguines",
      "desc": "Aussichtspunkt über die Hügel des oberen Var, mit einer keramischen Orientierungstafel und einer schattigen Bank.",
      "url": "https://www.lacs-gorges-verdon.fr/voir-visiter/sites-et-monuments/3962-chateau-d-aiguines.html",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "📍Aiguines",
      "desc": "Uitzichtpunt over de heuvels van de Haute-Var, met een keramische oriëntatietafel en een bankje in de schaduw.",
      "url": "https://www.lacs-gorges-verdon.fr/voir-visiter/sites-et-monuments/3962-chateau-d-aiguines.html",
      "urlLabel": "Meer informatie"
    },
    "backintime": {
      "noClick": true,
      "ville": [
        "lac"
      ],
      "coords": [
        95.563,
        47.442
      ]
    }
  },
  {
    "id": "topo-lac-gorges-du-verdon-mrklkq77",
    "cat": "toponyme",
    "hideFromMap": true,
    "coords": [
      43.79591,
      6.25826
    ],
    "img": "https://bellodulac.netlify.app/images/cascade_saintmaurin.png",
    "fr": {
      "name": "📍Gorges",
      "desc": "Superbe cascade à voir en remontant les gorges du Verdon",
      "links": [
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fshorts%2F6_6PX8sX8Ig",
          "label": "Voir la vidéo ▶️"
        },
        {
          "url": "https://www.google.com/maps/place/Cascade+Saint+Maurin/@43.7960688,6.256383,17z/data=!3m1!4b1!4m6!3m5!1s0x12cbf1550ae39d99:0xdad64c06297f0695!8m2!3d43.796065!4d6.2589579!16s%2Fg%2F11hz7dhm87?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D",
          "label": "Itinéraire GPS 📍"
        }
      ]
    },
    "en": {
      "name": "📍Gorge",
      "desc": "Superb waterfall to see when going up the Gorges du Verdon",
      "links": [
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fshorts%2F6_6PX8sX8Ig",
          "label": "Watch video ▶️"
        },
        {
          "url": "https://www.google.com/maps/place/Cascade+Saint+Maurin/@43.7960688,6.256383,17z/data=!3m1!4b1!4m6!3m5!1s0x12cbf1550ae39d99:0xdad64c06297f0695!8m2!3d43.796065!4d6.2589579!16s%2Fg%2F11hz7dhm87?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D",
          "label": "GPS Directions 📍"
        }
      ]
    },
    "de": {
      "name": "📍Schlucht",
      "desc": "Beeindruckender Wasserfall, den man beim Aufstieg durch die Verdon-Schlucht sehen kann",
      "links": [
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fshorts%2F6_6PX8sX8Ig",
          "label": "Video ansehen ▶️"
        },
        {
          "url": "https://www.google.com/maps/place/Cascade+Saint+Maurin/@43.7960688,6.256383,17z/data=!3m1!4b1!4m6!3m5!1s0x12cbf1550ae39d99:0xdad64c06297f0695!8m2!3d43.796065!4d6.2589579!16s%2Fg%2F11hz7dhm87?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D",
          "label": "GPS-Route 📍"
        }
      ]
    },
    "nl": {
      "name": "📍Kloof",
      "desc": "Prachtige waterval die je ziet wanneer je de Gorges du Verdon opvaart",
      "links": [
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fshorts%2F6_6PX8sX8Ig",
          "label": "Video bekijken ▶️"
        },
        {
          "url": "https://www.google.com/maps/place/Cascade+Saint+Maurin/@43.7960688,6.256383,17z/data=!3m1!4b1!4m6!3m5!1s0x12cbf1550ae39d99:0xdad64c06297f0695!8m2!3d43.796065!4d6.2589579!16s%2Fg%2F11hz7dhm87?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D",
          "label": "GPS-route 📍"
        }
      ]
    },
    "backintime": {
      "noClick": true,
      "ville": [
        "lac"
      ],
      "coords": [
        98.265,
        29.101
      ]
    }
  },
  {
    "id": "topo-lac-barrage-de-sainte-croix-mrklnw0t",
    "cat": "toponyme",
    "hideFromMap": true,
    "coords": [
      0,
      0
    ],
    "img": "https://bellodulac.netlify.app/images/barrage_saintecroix.jpg",
    "fr": {
      "name": "📍Barrage de Sainte-Croix",
      "desc": "Barrage hydroélectrique construit entre 1971 et 1974. Sa construction a donné naissance au lac de Sainte-Croix, la quatrième retenue artificielle de France métropolitaine la plus vaste",
      "links": [
        {
          "url": "https://fr.wikipedia.org/wiki/Barrage_de_Sainte-Croix",
          "label": "Plus d'informations"
        }
      ]
    },
    "en": {
      "name": "📍Sainte-Croix Dam",
      "desc": "Hydroelectric dam built between 1971 and 1974. Its construction created the Lac de Sainte-Croix, the fourth-largest artificial reservoir in metropolitan France.",
      "links": [
        {
          "url": "https://fr.wikipedia.org/wiki/Barrage_de_Sainte-Croix",
          "label": "More details"
        }
      ]
    },
    "de": {
      "name": "📍Staudamm Sainte-Croix",
      "desc": "Wasserkraftwerk, erbaut zwischen 1971 und 1974. Durch seinen Bau entstand der Lac de Sainte-Croix, der viertgrößte künstliche Stausee im französischen Mutterland.",
      "links": [
        {
          "url": "https://fr.wikipedia.org/wiki/Barrage_de_Sainte-Croix",
          "label": "Weitere Informationen"
        }
      ]
    },
    "nl": {
      "name": "📍Stuwdam van Sainte-Croix",
      "desc": "Waterkrachtdam, gebouwd tussen 1971 en 1974. Door de bouw ervan ontstond het Lac de Sainte-Croix, het op drie na grootste kunstmatige stuwmeer van het Franse vasteland.",
      "links": [
        {
          "url": "https://fr.wikipedia.org/wiki/Barrage_de_Sainte-Croix",
          "label": "Meer informatie"
        }
      ]
    },
    "backintime": {
      "noClick": true,
      "ville": [
        "lac"
      ],
      "coords": [
        68.294,
        76.086
      ],
      "labelPos": "below"
    }
  },
  {
    "id": "topo-lac-barrage-de-quinson-mrklqyui",
    "cat": "toponyme",
    "hideFromMap": true,
    "coords": [
      0,
      0
    ],
    "img": "https://bellodulac.netlify.app/images/barrage_quinson.jpg",
    "fr": {
      "name": "📍Barrage de Quinson",
      "desc": "Mis en service en 1975, il a une fonction de production électrique et anciennement d'irrigation ",
      "url": "https://fr.wikipedia.org/wiki/Barrage_de_Quinson",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "📍Quinson Dam",
      "desc": "Commissioned in 1975, it has a function of electricity production and formerly irrigation",
      "url": "https://fr.wikipedia.org/wiki/Barrage_de_Quinson",
      "urlLabel": "More details"
    },
    "de": {
      "name": "📍Staudamm Quinson",
      "desc": "1975 in Betrieb genommen, dient er der Stromerzeugung und diente früher auch der Bewässerung.",
      "url": "https://fr.wikipedia.org/wiki/Barrage_de_Quinson",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "📍Stuwdam van Quinson",
      "desc": "In 1975 in gebruik genomen, dient hij voor de elektriciteitsproductie en vroeger ook voor irrigatie.",
      "url": "https://fr.wikipedia.org/wiki/Barrage_de_Quinson",
      "urlLabel": "Meer informatie"
    },
    "backintime": {
      "noClick": true,
      "ville": [
        "lac"
      ],
      "coords": [
        51.617,
        99.132
      ]
    }
  },
  {
    "id": "topo-lac-ile-de-costebelle-mrklsu2y",
    "cat": "toponyme",
    "hideFromMap": true,
    "coords": [
      43.76670863279485,
      6.203927993774415
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/lac_costebelle.jpg",
    "fr": {
      "name": "📍Île de Costebelle",
      "desc": "En paddle ou en kayak découvrez la mystérieuse île de Costebelle en forme de coeur! Arrétez-vous sur une de ses plages pour pique-niquer",
      "url": "gpx/paddle_costebelle.html",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "📍Costebelle Island",
      "desc": "By paddle or kayak, discover the mysterious island of Costebelle with the shape of a heart! Stop at one of its beaches for a picnic.",
      "url": "gpx/paddle_costebelle.html?lang=EN",
      "urlLabel": "More details"
    },
    "de": {
      "name": "📍Insel Costebelle",
      "desc": "Entdecken Sie mit dem Paddleboard oder Kajak die geheimnisvolle, herzförmige Insel Costebelle! Machen Sie an einem ihrer Strände Halt für ein Picknick.",
      "url": "gpx/paddle_costebelle.html?lang=DE",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "📍Eiland Costebelle",
      "desc": "Ontdek per suppboard of kajak het mysterieuze, hartvormige eiland Costebelle! Stop op een van de stranden voor een picknick.",
      "url": "gpx/paddle_costebelle.html?lang=NL",
      "urlLabel": "Meer informatie"
    },
    "backintime": {
      "noClick": true,
      "ville": [
        "lac"
      ],
      "coords": [
        85.462,
        54.89
      ],
      "labelPos": "below"
    }
  },
  {
    "id": "falaise-cavaliers",
    "cat": "visite",
    "coords": [
      43.73778,
      6.34455
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/falaise_cavaliers.png",
    "fr": {
      "name": "Falaise des Cavaliers",
      "desc": "Halte majeure de la Corniche Sublime : à-pics vertigineux, spot réputé d'escalade, et point de départ de randonnées vers les gorges (sentiers de l'Imbut et Vidal). Bon endroit pour une pause pique-nique face au canyon.",
      "url": "https://www.komoot.com/fr-fr/highlight/4082072",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Falaise des Cavaliers",
      "desc": "A major stop on the Corniche Sublime: dizzying cliffs, a well-known climbing spot, and a trailhead for hikes into the gorge (Imbut and Vidal trails). A good spot for a picnic break facing the canyon.",
      "url": "https://www.komoot.com/fr-fr/highlight/4082072",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Falaise des Cavaliers",
      "desc": "Ein wichtiger Halt an der Corniche Sublime: schwindelerregende Steilwände, ein bekannter Klettererspot und Ausgangspunkt für Wanderungen in die Schlucht (Wege Imbut und Vidal). Ein guter Ort für eine Picknickpause mit Blick auf den Canyon.",
      "url": "https://www.komoot.com/fr-fr/highlight/4082072",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Falaise des Cavaliers",
      "desc": "Een belangrijke stop aan de Corniche Sublime: duizelingwekkende rotswanden, een bekende klimspot en vertrekpunt voor wandelingen de kloof in (paden Imbut en Vidal). Een fijne plek voor een picknickpauze met uitzicht op de canyon.",
      "url": "https://www.komoot.com/fr-fr/highlight/4082072",
      "urlLabel": "Meer informatie"
    }
  },
  {
    "id": "point-sublime-rougon",
    "cat": "visite",
    "coords": [
      43.794246,
      6.398025
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/point_sublime.jpg",
    "fr": {
      "name": "Point Sublime",
      "desc": "L'un des belvédères les plus photographiés du Grand Canyon du Verdon, juste sous le village perché de Rougon : vue plongeante sur l'entrée des gorges et le Couloir Samson. Grand parking (payant en saison) et l'Auberge du Point Sublime juste à côté pour un verre face au paysage.",
      "url": "https://www.verdontourisme.com/informations/patrimoine-naturel/le-point-sublime-5694502id/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Point Sublime",
      "desc": "One of the most photographed viewpoints of the Grand Canyon du Verdon, just below the perched village of Rougon: a sweeping view of the gorge's entrance and the Couloir Samson. Large car park (paid in season) and the Auberge du Point Sublime right next to it for a drink facing the view.",
      "url": "https://www.verdontourisme.com/en/informations/patrimoine-naturel-en/le-point-sublime-en-5694502id/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Point Sublime",
      "desc": "Einer der meistfotografierten Aussichtspunkte des Grand Canyon du Verdon, direkt unterhalb des hoch aufragenden Dorfes Rougon: ein weiter Blick auf den Eingang der Schlucht und den Couloir Samson. Großer Parkplatz (in der Saison kostenpflichtig) und die Auberge du Point Sublime gleich nebenan für einen Drink mit Aussicht.",
      "url": "https://www.verdontourisme.com/en/informations/patrimoine-naturel-en/le-point-sublime-en-5694502id/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Point Sublime",
      "desc": "Een van de meest gefotografeerde uitzichtpunten van de Grand Canyon du Verdon, net onder het hooggelegen dorpje Rougon: een weids uitzicht op de ingang van de kloof en de Couloir Samson. Grote parkeerplaats (betaald in het seizoen) en de Auberge du Point Sublime vlak ernaast voor een drankje met uitzicht.",
      "url": "https://www.verdontourisme.com/en/informations/patrimoine-naturel-en/le-point-sublime-en-5694502id/",
      "urlLabel": "Meer informatie"
    }
  },
  {
    "id": "rafting-hpo-decouverte",
    "cat": "sportaquatique",
    "coords": [
      43.821834,
      6.431388
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/rafting-explor-verdon.jpg",
    "fr": {
      "name": "Haute Provence Outdoor - Rafting Famille",
      "desc": "Type : Rafting. Parcours découverte dans les Gorges du Verdon, idéal pour les familles et les débutants. Le rendez-vous est au Camping Huttopia de Castellane. ⚠️ Attention : Soumis aux lâchers d'eau EDF. En juillet/août : uniquement les mardis et vendredis. Mai/juin/septembre : confirmation 24h à l'avance (en cas de fermeture : report, aqua rando ou canoë proposés).",
      "url": "https://haute-provence-outdoor.com/rafting-airboat-verdon/rafting-gorges-du-verdon-decouverte-parcours-famille/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Haute Provence Outdoor - Family Rafting",
      "desc": "Type: Rafting. Discovery route in the Gorges du Verdon, perfect for families and beginners. Meeting point at Huttopia Campsite in Castellane. ⚠️ Note: Subject to EDF dam water releases. July/August: Tuesdays and Fridays only. May/June/September: confirmation 24h in advance (alternatives if closed: reschedule, aqua walking, or canoeing).",
      "url": "https://haute-provence-outdoor.com/rafting-airboat-verdon/rafting-gorges-du-verdon-decouverte-parcours-famille/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Haute Provence Outdoor - Familien-Rafting",
      "desc": "Typ: Rafting. Entdeckungstour in der Verdon-Schlucht, ideal für Familien und Anfänger. Treffpunkt am Camping Huttopia in Castellane. ⚠️ Hinweis: Abhängig von den Wasserablässen des EDF-Staudamms. Juli/August: nur dienstags und freitags. Mai/Juni/September: Bestätigung 24 Stunden im Voraus (bei Ausfall: Verschiebung, Aqua-Wandern oder Kanufahren als Alternative).",
      "url": "https://haute-provence-outdoor.com/rafting-airboat-verdon/rafting-gorges-du-verdon-decouverte-parcours-famille/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Haute Provence Outdoor - Rafting voor het gezin",
      "desc": "Type: Raften. Ontdekkingstocht in de Gorges du Verdon, ideaal voor gezinnen en beginners. Verzamelpunt bij Camping Huttopia in Castellane. ⚠️ Let op: afhankelijk van de waterlozingen van de EDF-stuwdam. Juli/augustus: alleen op dinsdag en vrijdag. Mei/juni/september: bevestiging 24 uur van tevoren (bij annulering: alternatief met uitstel, aquawandelen of kanoën).",
      "url": "https://haute-provence-outdoor.com/rafting-airboat-verdon/rafting-gorges-du-verdon-decouverte-parcours-famille/",
      "urlLabel": "Meer informatie"
    }
  },
  {
    "id": "balcons-mescla",
    "cat": "visite",
    "coords": [
      43.7393,
      6.38114
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/balcon_mescla.png",
    "fr": {
      "name": "Balcons de la Mescla",
      "desc": "Sur la Corniche Sublime (rive gauche), deux belvédères surplombant de 250 m le confluent du Verdon et de l'Artuby (« Mescla » = mélange en provençal). Accessible en voiture ou via un petit détour depuis le sentier Blanc-Martel.",
      "url": "https://www.notreprovence.fr/points-vue-manquer-balcon-mescla-verdon.html",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Balcons de la Mescla",
      "desc": "On the Corniche Sublime (left bank), two viewpoints 250 m above the confluence of the Verdon and Artuby rivers (\"Mescla\" means blend in Provençal). Reachable by car or via a short detour from the Blanc-Martel trail.",
      "url": "https://www.notreprovence.fr/points-vue-manquer-balcon-mescla-verdon.html",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Balcons de la Mescla",
      "desc": "An der Corniche Sublime (linkes Ufer) gelegen: zwei Aussichtspunkte, 250 m über dem Zusammenfluss von Verdon und Artuby (\"Mescla\" bedeutet auf Provenzalisch „Mischung“). Mit dem Auto erreichbar oder über einen kleinen Umweg vom Blanc-Martel-Pfad.",
      "url": "https://www.notreprovence.fr/points-vue-manquer-balcon-mescla-verdon.html",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Balcons de la Mescla",
      "desc": "Aan de Corniche Sublime (linkeroever): twee uitzichtpunten, 250 m boven de samenvloeiing van de Verdon en de Artuby (\"Mescla\" betekent \"mengeling\" in het Provençaals). Bereikbaar met de auto of via een kleine omweg vanaf het Blanc-Martel-pad.",
      "url": "https://www.notreprovence.fr/points-vue-manquer-balcon-mescla-verdon.html",
      "urlLabel": "Meer informatie"
    }
  },
  {
    "id": "lacloc-sainte-croix",
    "cat": "sportaquatique",
    "coords": [
      43.75846,
      6.15338
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/lacloc-sainte-croix.jpg",
    "fr": {
      "name": "Lac-Loc Sainte-Croix-du-Verdon",
      "desc": "Type : Location nautique. Spécialiste depuis plus de 20 ans, situé au pied du village de Sainte-Croix-du-Verdon. Canoës, kayaks, pédalos et bateaux électriques, snack sur place (ouvert d'avril à septembre).",
      "url": "https://lacloc-saintecroix-verdon.com/",
      "urlLabel": "Site internet"
    },
    "en": {
      "name": "Lac-Loc Sainte-Croix-du-Verdon",
      "desc": "Type: Boat rental. A specialist for over 20 years, located at the foot of Sainte-Croix-du-Verdon village. Canoes, kayaks, pedal boats and electric boats, on-site snack bar (open April to September).",
      "url": "https://lacloc-saintecroix-verdon.com/",
      "urlLabel": "Website"
    },
    "de": {
      "name": "Lac-Loc Sainte-Croix-du-Verdon",
      "desc": "Typ: Bootsverleih. Seit über 20 Jahren Spezialist, am Fuße des Dorfes Sainte-Croix-du-Verdon gelegen. Kanus, Kajaks, Tretboote und Elektroboote, Snackbar vor Ort (geöffnet von April bis September).",
      "url": "https://lacloc-saintecroix-verdon.com/",
      "urlLabel": "Webseite"
    },
    "nl": {
      "name": "Lac-Loc Sainte-Croix-du-Verdon",
      "desc": "Type: Bootverhuur. Al meer dan 20 jaar specialist, gelegen aan de voet van het dorp Sainte-Croix-du-Verdon. Kano's, kajaks, waterfietsen en elektrische boten, snackbar ter plaatse (geopend van april tot september).",
      "url": "https://lacloc-saintecroix-verdon.com/",
      "urlLabel": "Website"
    }
  },
  {
    "id": "petit-port-sainte-croix",
    "cat": "sportaquatique",
    "coords": [
      43.75778,
      6.15266
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/petit_port.jpeg",
    "fr": {
      "name": "Le Petit Port",
      "desc": "Type : Location nautique. Au village de Sainte-Croix-du-Verdon : pédalos et bateaux électriques sans permis (4 et 6 places) pour naviguer sur le lac émeraude.",
      "url": "https://www.lepetitport04.com/",
      "urlLabel": "Site internet"
    },
    "en": {
      "name": "Le Petit Port",
      "desc": "Type: Boat rental. In Sainte-Croix-du-Verdon village: pedal boats and license-free electric boats (4 and 6 seats) to sail on the emerald lake.",
      "url": "https://www.lepetitport04.com/",
      "urlLabel": "Website"
    },
    "de": {
      "name": "Le Petit Port",
      "desc": "Typ: Bootsverleih. Im Dorf Sainte-Croix-du-Verdon: Tretboote und führerscheinfreie Elektroboote (4 und 6 Plätze), um auf dem smaragdgrünen See zu fahren.",
      "url": "https://www.lepetitport04.com/",
      "urlLabel": "Webseite"
    },
    "nl": {
      "name": "Le Petit Port",
      "desc": "Type: Bootverhuur. In het dorp Sainte-Croix-du-Verdon: waterfietsen en vaarbewijsvrije elektrische boten (4 en 6 plaatsen) om over het smaragdgroene meer te varen.",
      "url": "https://www.lepetitport04.com/",
      "urlLabel": "Website"
    }
  },
  {
    "id": "playa-location-sainte-croix",
    "cat": "sportaquatique",
    "coords": [
      43.73211,
      6.17792
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/playa-location.jpg",
    "fr": {
      "name": "La Playa Location",
      "desc": "Type : Location nautique. Bateaux électriques, pédalos, paddles, kayaks et canoës pour rejoindre le Grand Canyon ou les criques secrètes du lac de Sainte-Croix.",
      "url": "https://playalocation.fr/",
      "urlLabel": "Site internet"
    },
    "en": {
      "name": "La Playa Location",
      "desc": "Type: Boat rental. Electric boats, pedal boats, paddleboards, kayaks and canoes to reach the Grand Canyon or the secret coves of Lac de Sainte-Croix.",
      "url": "https://playalocation.fr/en/",
      "urlLabel": "Website"
    },
    "de": {
      "name": "La Playa Location",
      "desc": "Typ: Bootsverleih. Elektroboote, Tretboote, Paddleboards, Kajaks und Kanus, um den Grand Canyon oder die geheimen Buchten des Lac de Sainte-Croix zu erreichen.",
      "url": "https://playalocation.fr/en/",
      "urlLabel": "Webseite"
    },
    "nl": {
      "name": "La Playa Location",
      "desc": "Type: Bootverhuur. Elektrische boten, waterfietsen, suppboards, kajaks en kano's om de Grand Canyon of de geheime baaien van het Lac de Sainte-Croix te bereiken.",
      "url": "https://playalocation.fr/en/",
      "urlLabel": "Website"
    }
  },
  {
    "id": "aquattitude-montpezat",
    "cat": "sportaquatique",
    "coords": [
      43.7454,
      6.08625
    ],
    "stars": 2,
    "img": "https://www.aquattitude.com/wp-content/uploads/2021/05/christophe-tremeau-canoe-gorges-cascades-w1920-1160x653.png",
    "fr": {
      "name": "Aquattitude",
      "desc": "Type : Location nautique. Base nautique dans les Gorges de Baudinard, à Montpezat : canoë-kayak, paddle, pédalo et rafting. Ouvert en juillet-août, réservation conseillée.",
      "url": "https://www.aquattitude.com/fr/base-nautique/",
      "urlLabel": "Site internet"
    },
    "en": {
      "name": "Aquattitude",
      "desc": "Type: Boat rental. Water sports base in the Baudinard Gorges, in Montpezat: canoe-kayak, paddleboard, pedal boats and rafting. Open July-August, booking recommended.",
      "url": "https://www.aquattitude.com/en/nautic-base/",
      "urlLabel": "Website"
    },
    "de": {
      "name": "Aquattitude",
      "desc": "Typ: Bootsverleih. Wassersportbasis in den Baudinard-Schluchten bei Montpezat: Kanu-Kajak, Paddleboard, Tretboote und Rafting. Geöffnet Juli-August, Reservierung empfohlen.",
      "url": "https://www.aquattitude.com/en/nautic-base/",
      "urlLabel": "Webseite"
    },
    "nl": {
      "name": "Aquattitude",
      "desc": "Type: Bootverhuur. Watersportbasis in de Baudinard-kloof, in Montpezat: kano-kajak, suppboard, waterfietsen en raften. Geopend juli-augustus, reserveren aanbevolen.",
      "url": "https://www.aquattitude.com/en/nautic-base/",
      "urlLabel": "Website"
    }
  },
  {
    "id": "alize-bauduen",
    "cat": "sportaquatique",
    "coords": [
      43.73257,
      6.17979
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/alize-bauduen.jpg",
    "fr": {
      "name": "Alizé Electronic - Stand de Bauduen",
      "desc": "Type : Location de bateaux électriques sans permis, au départ du village de Bauduen. Pilotage facile, accessible à tous. Circuits suggérés : villages et barrage (2h), plages et île de Costebelle (3h), ou grand canyon jusqu'au Pont du Galetas (5-6h).",
      "url": "https://www.location-bateau-verdon.fr/lac-sainte-croix.php",
      "urlLabel": "Site internet"
    },
    "en": {
      "name": "Alizé Electronic - Bauduen Stand",
      "desc": "Type: License-free electric boat rental, departing from Bauduen village. Easy to pilot, accessible to everyone. Suggested routes: villages and dam (2h), beaches and Costebelle island (3h), or the Grand Canyon up to Pont du Galetas (5-6h).",
      "url": "https://www.location-bateau-verdon.fr/en/lac-sainte-croix.php",
      "urlLabel": "Website"
    },
    "de": {
      "name": "Alizé Electronic - Standort Bauduen",
      "desc": "Typ: Führerscheinfreier Elektrobootverleih, Abfahrt vom Dorf Bauduen. Einfach zu steuern, für jeden geeignet. Vorgeschlagene Routen: Dörfer und Staudamm (2 Std.), Strände und Île de Costebelle (3 Std.), oder der Grand Canyon bis zur Pont du Galetas (5-6 Std.).",
      "url": "https://www.location-bateau-verdon.fr/en/lac-sainte-croix.php",
      "urlLabel": "Webseite"
    },
    "nl": {
      "name": "Alizé Electronic - Standplaats Bauduen",
      "desc": "Type: Vaarbewijsvrije verhuur van elektrische boten, vertrek vanuit het dorp Bauduen. Eenvoudig te besturen, toegankelijk voor iedereen. Voorgestelde routes: dorpen en stuwdam (2 uur), stranden en het eiland Costebelle (3 uur), of de Grand Canyon tot aan de Pont du Galetas (5-6 uur).",
      "url": "https://www.location-bateau-verdon.fr/en/lac-sainte-croix.php",
      "urlLabel": "Website"
    }
  },
  {
    "id": "resto-o-a-la-bouche",
    "cat": "restaurant",
    "coords": [
      43.7348027,
      6.1729196
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/l-o-a-la-bouche.jpg",
    "fr": {
      "name": "L'O à la Bouche",
      "desc": "Type : Restauration. Situé dans le quartier des Aires à Bauduen, ce restaurant offre un cadre très agréable pour déjeuner ou dîner avec une belle vue surplombant le lac de Sainte-Croix.",
      "url": "https://www.tripadvisor.fr/Restaurant_Review-g315828-d10191952-Reviews-L_O_a_la_Bouche-Bauduen_Var_Provence_Alpes_Cote_d_Azur.html",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "L'O à la Bouche",
      "desc": "Type: Restaurant. Located in the Quartier des Aires in Bauduen, this restaurant offers a very pleasant setting for lunch or dinner with a beautiful view overlooking Lake Sainte-Croix.",
      "url": "https://www.tripadvisor.fr/Restaurant_Review-g315828-d10191952-Reviews-L_O_a_la_Bouche-Bauduen_Var_Provence_Alpes_Cote_d_Azur.html",
      "urlLabel": "More details"
    },
    "de": {
      "name": "L'O à la Bouche",
      "desc": "Typ: Restaurant. Im Quartier des Aires in Bauduen gelegen, bietet dieses Restaurant einen sehr angenehmen Rahmen für Mittag- oder Abendessen mit einem herrlichen Blick auf den Lac de Sainte-Croix.",
      "url": "https://www.tripadvisor.fr/Restaurant_Review-g315828-d10191952-Reviews-L_O_a_la_Bouche-Bauduen_Var_Provence_Alpes_Cote_d_Azur.html",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "L'O à la Bouche",
      "desc": "Type: Restaurant. Gelegen in de wijk Les Aires in Bauduen, biedt dit restaurant een zeer aangename sfeer om te lunchen of te dineren met een prachtig uitzicht over het Lac de Sainte-Croix.",
      "url": "https://www.tripadvisor.fr/Restaurant_Review-g315828-d10191952-Reviews-L_O_a_la_Bouche-Bauduen_Var_Provence_Alpes_Cote_d_Azur.html",
      "urlLabel": "Meer informatie"
    }
  },
  {
    "id": "commerce-boulangerie-salles",
    "cat": "commerce",
    "coords": [
      43.7744643,
      6.2093239
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/boulangerie_salles.jpg",
    "fr": {
      "name": "Boulangerie des Salles-sur-Verdon",
      "desc": "Type : Boulangerie / Pâtisserie. Située au cœur du village, idéale pour acheter votre pain frais, vos viennoiseries pour le petit-déjeuner ou de quoi préparer vos pique-niques avant de partir en balade.",
      "url": "https://www.google.com/maps/place/Boulangerie/@43.7744643,6.2093239,19.96z/data=!4m14!1m7!3m6!1s0x12cbe56268364233:0xd41e2f9043e03ddb!2sLe+Ch%C3%AAne+Vert!8m2!3d43.7741346!4d6.2092012!16s%2Fg%2F11bbtl9_qj!3m5!1s0x12cbe5626808f30d:0x6eb79f2905311d06!8m2!3d43.7744643!4d6.2093239!16s%2Fg%2F11btlzcpdj?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Voir sur la carte"
    },
    "en": {
      "name": "Les Salles-sur-Verdon Bakery",
      "desc": "Type: Bakery / Pastry shop. Located in the heart of the village, ideal for buying fresh bread, breakfast pastries, or picnic supplies before heading out to explore.",
      "url": "https://www.google.com/maps/place/Boulangerie/@43.7744643,6.2093239,19.96z/data=!4m14!1m7!3m6!1s0x12cbe56268364233:0xd41e2f9043e03ddb!2sLe+Ch%C3%AAne+Vert!8m2!3d43.7741346!4d6.2092012!16s%2Fg%2F11bbtl9_qj!3m5!1s0x12cbe5626808f30d:0x6eb79f2905311d06!8m2!3d43.7744643!4d6.2093239!16s%2Fg%2F11btlzcpdj?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "View on map"
    },
    "de": {
      "name": "Bäckerei von Les Salles-sur-Verdon",
      "desc": "Typ: Bäckerei / Konditorei. Mitten im Dorf gelegen, ideal um frisches Brot, Frühstücksgebäck oder Proviant für ein Picknick zu kaufen, bevor man auf Entdeckungstour geht.",
      "url": "https://www.google.com/maps/place/Boulangerie/@43.7744643,6.2093239,19.96z/data=!4m14!1m7!3m6!1s0x12cbe56268364233:0xd41e2f9043e03ddb!2sLe+Ch%C3%AAne+Vert!8m2!3d43.7741346!4d6.2092012!16s%2Fg%2F11bbtl9_qj!3m5!1s0x12cbe5626808f30d:0x6eb79f2905311d06!8m2!3d43.7744643!4d6.2093239!16s%2Fg%2F11btlzcpdj?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Auf der Karte ansehen"
    },
    "nl": {
      "name": "Bakkerij van Les Salles-sur-Verdon",
      "desc": "Type: Bakkerij / Banketbakkerij. Gelegen in het hart van het dorp, ideaal om vers brood, ontbijtgebak of picknickproviand te kopen voordat je op ontdekking gaat.",
      "url": "https://www.google.com/maps/place/Boulangerie/@43.7744643,6.2093239,19.96z/data=!4m14!1m7!3m6!1s0x12cbe56268364233:0xd41e2f9043e03ddb!2sLe+Ch%C3%AAne+Vert!8m2!3d43.7741346!4d6.2092012!16s%2Fg%2F11bbtl9_qj!3m5!1s0x12cbe5626808f30d:0x6eb79f2905311d06!8m2!3d43.7744643!4d6.2093239!16s%2Fg%2F11btlzcpdj?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Bekijk op de kaart"
    },
    "trace": {
      "logements": [
        "salles6",
        "salles8"
      ],
      "coords": [
        [
          43.77269,
          6.20827
        ],
        [
          43.77275,
          6.20832
        ],
        [
          43.77301,
          6.20835
        ],
        [
          43.77311,
          6.20844
        ],
        [
          43.77325,
          6.20856
        ],
        [
          43.77332,
          6.20862
        ],
        [
          43.77344,
          6.20873
        ],
        [
          43.77354,
          6.20881
        ],
        [
          43.7737,
          6.20894
        ],
        [
          43.77378,
          6.20901
        ],
        [
          43.77382,
          6.20901
        ],
        [
          43.77385,
          6.20898
        ],
        [
          43.77388,
          6.20892
        ],
        [
          43.77398,
          6.209
        ],
        [
          43.77411,
          6.20904
        ],
        [
          43.77421,
          6.20912
        ],
        [
          43.77441,
          6.2092
        ],
        [
          43.77444,
          6.20922
        ],
        [
          43.77449,
          6.20927
        ]
      ]
    }
  },
  {
    "id": "resto-auberge-des-salles",
    "cat": "restaurant",
    "coords": [
      43.77231,
      6.20815
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/auberge_salles.png",
    "fr": {
      "name": "L'Auberge des Salles",
      "desc": "Type : Restauration. Testé plusieurs fois en famille. Accès immédiat à gauche en sortant du jardin. Probablement la plus belle vue du lac, bon rapport qualité/prix.",
      "url": "https://www.google.com/maps/search/Auberge+des+Salles+sur+verdon",
      "urlLabel": "Voir sur la carte"
    },
    "en": {
      "name": "L'Auberge des Salles",
      "desc": "Type: Restaurant. Tested several times with family. Immediate access on the left leaving the garden. Probably the best view of the lake, good value for money.",
      "url": "https://www.google.com/maps/search/Auberge+des+Salles+sur+verdon",
      "urlLabel": "View on map"
    },
    "de": {
      "name": "L'Auberge des Salles",
      "desc": "Typ: Restaurant. Mehrfach mit der Familie getestet. Direkt links, wenn man den Garten verlässt. Wahrscheinlich der schönste Seeblick, gutes Preis-Leistungs-Verhältnis.",
      "url": "https://www.google.com/maps/search/Auberge+des+Salles+sur+verdon",
      "urlLabel": "Auf der Karte ansehen"
    },
    "nl": {
      "name": "L'Auberge des Salles",
      "desc": "Type: Restaurant. Meerdere keren met het gezin getest. Direct links wanneer je de tuin verlaat. Waarschijnlijk het mooiste uitzicht op het meer, goede prijs-kwaliteitverhouding.",
      "url": "https://www.google.com/maps/search/Auberge+des+Salles+sur+verdon",
      "urlLabel": "Bekijk op de kaart"
    },
    "trace": {
      "logements": [
        "salles6",
        "salles8"
      ],
      "coords": [
        [
          43.77269,
          6.20827
        ],
        [
          43.7726,
          6.2082
        ],
        [
          43.77253,
          6.20834
        ]
      ]
    }
  },
  {
    "id": "resto-la-fringale",
    "cat": "restaurant",
    "coords": [
      43.77434,
      6.2094
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/fringale_salles.jpg",
    "fr": {
      "name": "La Fringale",
      "desc": "Type : Restauration. Les meilleurs burgers du coin pour les amateurs. Un peu cher mais très bon !",
      "url": "https://www.tripadvisor.fr/Restaurant_Review-g1761554-d4471471-Reviews-La_Fringale-Les_Salles_sur_Verdon_Var_Provence_Alpes_Cote_d_Azur.html",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "La Fringale",
      "desc": "Type: Restaurant. The best burgers in the area for fans. A bit pricey but very good!",
      "url": "https://www.tripadvisor.fr/Restaurant_Review-g1761554-d4471471-Reviews-La_Fringale-Les_Salles_sur_Verdon_Var_Provence_Alpes_Cote_d_Azur.html",
      "urlLabel": "More details"
    },
    "de": {
      "name": "La Fringale",
      "desc": "Typ: Restaurant. Die besten Burger der Gegend für Liebhaber. Etwas teuer, aber sehr gut!",
      "url": "https://www.tripadvisor.fr/Restaurant_Review-g1761554-d4471471-Reviews-La_Fringale-Les_Salles_sur_Verdon_Var_Provence_Alpes_Cote_d_Azur.html",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "La Fringale",
      "desc": "Type: Restaurant. De beste burgers van de streek voor liefhebbers. Een beetje prijzig, maar erg lekker!",
      "url": "https://www.tripadvisor.fr/Restaurant_Review-g1761554-d4471471-Reviews-La_Fringale-Les_Salles_sur_Verdon_Var_Provence_Alpes_Cote_d_Azur.html",
      "urlLabel": "Meer informatie"
    },
    "trace": {
      "logements": [
        "salles6",
        "salles8"
      ],
      "coords": [
        [
          43.77269,
          6.20827
        ],
        [
          43.77275,
          6.20832
        ],
        [
          43.77301,
          6.20835
        ],
        [
          43.77311,
          6.20844
        ],
        [
          43.77325,
          6.20856
        ],
        [
          43.77332,
          6.20862
        ],
        [
          43.77344,
          6.20873
        ],
        [
          43.77354,
          6.20881
        ],
        [
          43.7737,
          6.20894
        ],
        [
          43.77378,
          6.20901
        ],
        [
          43.77382,
          6.20901
        ],
        [
          43.77385,
          6.20898
        ],
        [
          43.77388,
          6.20892
        ],
        [
          43.77398,
          6.209
        ],
        [
          43.77411,
          6.20904
        ],
        [
          43.77403,
          6.20922
        ],
        [
          43.77399,
          6.20932
        ],
        [
          43.77407,
          6.20939
        ],
        [
          43.77427,
          6.20956
        ]
      ]
    }
  },
  {
    "id": "resto-la-plancha",
    "cat": "restaurant",
    "coords": [
      43.774454,
      6.2101495
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/plancha_salles.png",
    "fr": {
      "name": "La Plancha",
      "desc": "Type : Restauration. Un peu en retrait dans le village. Cuisine au feu de bois, plus haut de gamme.",
      "url": "https://www.google.com/maps/place/La+Plancha+Cuisine+Au+Feu+De+Bois/@43.7743649,6.2091379,20z/data=!4m14!1m7!3m6!1s0x12cbe56268364233:0xd41e2f9043e03ddb!2sLe+Ch%C3%AAne+Vert!8m2!3d43.7741346!4d6.2092012!16s%2Fg%2F11bbtl9_qj!3m5!1s0x12cbe5621080672f:0xad5bffcd570c4c73!8m2!3d43.774454!4d6.2101495!16s%2Fg%2F1tf1l0hj?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Voir sur la carte"
    },
    "en": {
      "name": "La Plancha",
      "desc": "Type: Restaurant. Slightly set back in the village. Wood-fired cooking, higher end.",
      "url": "https://www.google.com/maps/place/La+Plancha+Cuisine+Au+Feu+De+Bois/@43.7743649,6.2091379,20z/data=!4m14!1m7!3m6!1s0x12cbe56268364233:0xd41e2f9043e03ddb!2sLe+Ch%C3%AAne+Vert!8m2!3d43.7741346!4d6.2092012!16s%2Fg%2F11bbtl9_qj!3m5!1s0x12cbe5621080672f:0xad5bffcd570c4c73!8m2!3d43.774454!4d6.2101495!16s%2Fg%2F1tf1l0hj?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "View on map"
    },
    "de": {
      "name": "La Plancha",
      "desc": "Typ: Restaurant. Etwas abseits im Dorf gelegen. Küche vom Holzfeuer, gehobenere Preisklasse.",
      "url": "https://www.google.com/maps/place/La+Plancha+Cuisine+Au+Feu+De+Bois/@43.7743649,6.2091379,20z/data=!4m14!1m7!3m6!1s0x12cbe56268364233:0xd41e2f9043e03ddb!2sLe+Ch%C3%AAne+Vert!8m2!3d43.7741346!4d6.2092012!16s%2Fg%2F11bbtl9_qj!3m5!1s0x12cbe5621080672f:0xad5bffcd570c4c73!8m2!3d43.774454!4d6.2101495!16s%2Fg%2F1tf1l0hj?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Auf der Karte ansehen"
    },
    "nl": {
      "name": "La Plancha",
      "desc": "Type: Restaurant. Iets afgelegen in het dorp. Koken op houtvuur, iets hogere prijsklasse.",
      "url": "https://www.google.com/maps/place/La+Plancha+Cuisine+Au+Feu+De+Bois/@43.7743649,6.2091379,20z/data=!4m14!1m7!3m6!1s0x12cbe56268364233:0xd41e2f9043e03ddb!2sLe+Ch%C3%AAne+Vert!8m2!3d43.7741346!4d6.2092012!16s%2Fg%2F11bbtl9_qj!3m5!1s0x12cbe5621080672f:0xad5bffcd570c4c73!8m2!3d43.774454!4d6.2101495!16s%2Fg%2F1tf1l0hj?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Bekijk op de kaart"
    },
    "trace": {
      "logements": [
        "salles6",
        "salles8"
      ],
      "coords": [
        [
          43.77269,
          6.20827
        ],
        [
          43.77275,
          6.20832
        ],
        [
          43.77301,
          6.20835
        ],
        [
          43.77311,
          6.20844
        ],
        [
          43.77325,
          6.20856
        ],
        [
          43.77332,
          6.20862
        ],
        [
          43.77344,
          6.20873
        ],
        [
          43.77354,
          6.20881
        ],
        [
          43.7737,
          6.20894
        ],
        [
          43.77378,
          6.20901
        ],
        [
          43.77382,
          6.20901
        ],
        [
          43.77385,
          6.20898
        ],
        [
          43.77388,
          6.20892
        ],
        [
          43.77398,
          6.209
        ],
        [
          43.77411,
          6.20904
        ],
        [
          43.77403,
          6.20922
        ],
        [
          43.77399,
          6.20932
        ],
        [
          43.77407,
          6.20939
        ],
        [
          43.77438,
          6.20964
        ],
        [
          43.77455,
          6.20979
        ],
        [
          43.7745,
          6.20992
        ],
        [
          43.77456,
          6.21006
        ]
      ]
    }
  },
  {
    "id": "resto-cote-lac",
    "cat": "restaurant",
    "coords": [
      43.77449,
      6.20904
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/cotelac_salles.jpg",
    "fr": {
      "name": "Le Côté Lac",
      "desc": "Type : Restauration. Recommandé par les voisins. À environ 100m à droite. Vue superbe sur le lac, gamme au-dessus.",
      "url": "https://www.google.com/maps/place/Restaurant+Le+C%C3%B4t%C3%A9+Lac/@43.7743649,6.2091379,20z/data=!4m14!1m7!3m6!1s0x12cbe56268364233:0xd41e2f9043e03ddb!2sLe+Ch%C3%AAne+Vert!8m2!3d43.7741346!4d6.2092012!16s%2Fg%2F11bbtl9_qj!3m5!1s0x12cbe56260466435:0x2d6795945b44acbb!8m2!3d43.7744815!4d6.2089652!16s%2Fg%2F12hn2n5mc?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Voir sur la carte"
    },
    "en": {
      "name": "Le Côté Lac",
      "desc": "Type: Restaurant. Recommended by neighbors. About 100m to the right. Superb view of the lake, higher end.",
      "url": "https://www.google.com/maps/place/Restaurant+Le+C%C3%B4t%C3%A9+Lac/@43.7743649,6.2091379,20z/data=!4m14!1m7!3m6!1s0x12cbe56268364233:0xd41e2f9043e03ddb!2sLe+Ch%C3%AAne+Vert!8m2!3d43.7741346!4d6.2092012!16s%2Fg%2F11bbtl9_qj!3m5!1s0x12cbe56260466435:0x2d6795945b44acbb!8m2!3d43.7744815!4d6.2089652!16s%2Fg%2F12hn2n5mc?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "View on map"
    },
    "de": {
      "name": "Le Côté Lac",
      "desc": "Typ: Restaurant. Von den Nachbarn empfohlen. Etwa 100 m rechts. Herrlicher Seeblick, gehobenere Preisklasse.",
      "url": "https://www.google.com/maps/place/Restaurant+Le+C%C3%B4t%C3%A9+Lac/@43.7743649,6.2091379,20z/data=!4m14!1m7!3m6!1s0x12cbe56268364233:0xd41e2f9043e03ddb!2sLe+Ch%C3%AAne+Vert!8m2!3d43.7741346!4d6.2092012!16s%2Fg%2F11bbtl9_qj!3m5!1s0x12cbe56260466435:0x2d6795945b44acbb!8m2!3d43.7744815!4d6.2089652!16s%2Fg%2F12hn2n5mc?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Auf der Karte ansehen"
    },
    "nl": {
      "name": "Le Côté Lac",
      "desc": "Type: Restaurant. Aanbevolen door de buren. Ongeveer 100 m naar rechts. Schitterend uitzicht op het meer, iets hogere prijsklasse.",
      "url": "https://www.google.com/maps/place/Restaurant+Le+C%C3%B4t%C3%A9+Lac/@43.7743649,6.2091379,20z/data=!4m14!1m7!3m6!1s0x12cbe56268364233:0xd41e2f9043e03ddb!2sLe+Ch%C3%AAne+Vert!8m2!3d43.7741346!4d6.2092012!16s%2Fg%2F11bbtl9_qj!3m5!1s0x12cbe56260466435:0x2d6795945b44acbb!8m2!3d43.7744815!4d6.2089652!16s%2Fg%2F12hn2n5mc?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Bekijk op de kaart"
    },
    "trace": {
      "logements": [
        "salles6",
        "salles8"
      ],
      "coords": [
        [
          43.77269,
          6.20827
        ],
        [
          43.77275,
          6.20832
        ],
        [
          43.77301,
          6.20835
        ],
        [
          43.77311,
          6.20844
        ],
        [
          43.77325,
          6.20856
        ],
        [
          43.77332,
          6.20862
        ],
        [
          43.77344,
          6.20873
        ],
        [
          43.77354,
          6.20881
        ],
        [
          43.7737,
          6.20894
        ],
        [
          43.77378,
          6.20901
        ],
        [
          43.77382,
          6.20901
        ],
        [
          43.77385,
          6.20898
        ],
        [
          43.77388,
          6.20892
        ],
        [
          43.77398,
          6.209
        ],
        [
          43.77411,
          6.20904
        ],
        [
          43.77421,
          6.20912
        ],
        [
          43.77441,
          6.2092
        ],
        [
          43.77442,
          6.20921
        ]
      ]
    }
  },
  {
    "id": "resto-chene-vert",
    "cat": "restaurant",
    "coords": [
      43.77414,
      6.20928
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/chenevert_salles.png",
    "fr": {
      "name": "Le Chêne Vert",
      "desc": "Type : Restauration. Testé plusieurs fois en famille. À environ 100m à droite en sortant du jardin.",
      "url": "https://www.google.com/maps/place/Le+Ch%C3%AAne+Vert/@43.7741356,6.2085575,19z/data=!3m1!4b1!4m6!3m5!1s0x12cbe56268364233:0xd41e2f9043e03ddb!8m2!3d43.7741346!4d6.2092012!16s%2Fg%2F11bbtl9_qj?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Voir sur la carte"
    },
    "en": {
      "name": "Le Chêne Vert",
      "desc": "Type: Restaurant. Tested several times with family. About 100m to the right when leaving the garden.",
      "url": "https://www.google.com/maps/place/Le+Ch%C3%AAne+Vert/@43.7741356,6.2085575,19z/data=!3m1!4b1!4m6!3m5!1s0x12cbe56268364233:0xd41e2f9043e03ddb!8m2!3d43.7741346!4d6.2092012!16s%2Fg%2F11bbtl9_qj?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "View on map"
    },
    "de": {
      "name": "Le Chêne Vert",
      "desc": "Typ: Restaurant. Mehrfach mit der Familie getestet. Etwa 100 m rechts, wenn man den Garten verlässt.",
      "url": "https://www.google.com/maps/place/Le+Ch%C3%AAne+Vert/@43.7741356,6.2085575,19z/data=!3m1!4b1!4m6!3m5!1s0x12cbe56268364233:0xd41e2f9043e03ddb!8m2!3d43.7741346!4d6.2092012!16s%2Fg%2F11bbtl9_qj?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Auf der Karte ansehen"
    },
    "nl": {
      "name": "Le Chêne Vert",
      "desc": "Type: Restaurant. Meerdere keren met het gezin getest. Ongeveer 100 m naar rechts wanneer je de tuin verlaat.",
      "url": "https://www.google.com/maps/place/Le+Ch%C3%AAne+Vert/@43.7741356,6.2085575,19z/data=!3m1!4b1!4m6!3m5!1s0x12cbe56268364233:0xd41e2f9043e03ddb!8m2!3d43.7741346!4d6.2092012!16s%2Fg%2F11bbtl9_qj?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D",
      "urlLabel": "Bekijk op de kaart"
    },
    "trace": {
      "logements": [
        "salles6",
        "salles8"
      ],
      "coords": [
        [
          43.77269,
          6.20827
        ],
        [
          43.77275,
          6.20832
        ],
        [
          43.77301,
          6.20835
        ],
        [
          43.77311,
          6.20844
        ],
        [
          43.77325,
          6.20856
        ],
        [
          43.77332,
          6.20862
        ],
        [
          43.77344,
          6.20873
        ],
        [
          43.77354,
          6.20881
        ],
        [
          43.7737,
          6.20894
        ],
        [
          43.77378,
          6.20901
        ],
        [
          43.77382,
          6.20901
        ],
        [
          43.77385,
          6.20898
        ],
        [
          43.77388,
          6.20892
        ],
        [
          43.77398,
          6.209
        ],
        [
          43.77411,
          6.20904
        ],
        [
          43.77403,
          6.20922
        ],
        [
          43.77399,
          6.20932
        ],
        [
          43.77407,
          6.20939
        ],
        [
          43.77409,
          6.2094
        ]
      ]
    }
  },
  {
    "id": "escale-du-verdon-salles",
    "cat": "restaurant",
    "coords": [
      43.7814,
      6.21307
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/escale_salles.png",
    "fr": {
      "name": "L'Escale du Verdon",
      "desc": "Snack Karaoké recommandé par nos voisins au camping municipale les Ruisses.",
      "url": "https://www.facebook.com/people/Lescale-du-Verdon/61589077108185",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "L'Escale du Verdon",
      "desc": "Snack Karaoke recommended by our neighbors at the municipal campsite les Ruisses.",
      "url": "https://www.facebook.com/people/Lescale-du-Verdon/61589077108185",
      "urlLabel": "More details"
    },
    "de": {
      "name": "L'Escale du Verdon",
      "desc": "Karaoke-Imbiss, empfohlen von unseren Nachbarn auf dem Gemeindecampingplatz Les Ruisses.",
      "url": "https://www.facebook.com/people/Lescale-du-Verdon/61589077108185",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "L'Escale du Verdon",
      "desc": "Karaoke-snackbar, aanbevolen door onze buren op de gemeentelijke camping Les Ruisses.",
      "url": "https://www.facebook.com/people/Lescale-du-Verdon/61589077108185",
      "urlLabel": "Meer informatie"
    },
    "trace": {
      "logements": [
        "salles6",
        "salles8"
      ],
      "coords": [
        [
          43.77269,
          6.20827
        ],
        [
          43.77275,
          6.20832
        ],
        [
          43.77301,
          6.20835
        ],
        [
          43.77311,
          6.20844
        ],
        [
          43.77325,
          6.20856
        ],
        [
          43.77332,
          6.20862
        ],
        [
          43.77323,
          6.20882
        ],
        [
          43.77315,
          6.20901
        ],
        [
          43.77323,
          6.20907
        ],
        [
          43.77325,
          6.20909
        ],
        [
          43.77316,
          6.20931
        ],
        [
          43.77323,
          6.20942
        ],
        [
          43.77321,
          6.20947
        ],
        [
          43.7732,
          6.20951
        ],
        [
          43.77335,
          6.20963
        ],
        [
          43.77373,
          6.2099
        ],
        [
          43.77377,
          6.20993
        ],
        [
          43.77385,
          6.21
        ],
        [
          43.77396,
          6.21011
        ],
        [
          43.77408,
          6.21026
        ],
        [
          43.77412,
          6.21031
        ],
        [
          43.77425,
          6.21056
        ],
        [
          43.77428,
          6.21061
        ],
        [
          43.77434,
          6.21074
        ],
        [
          43.77437,
          6.21086
        ],
        [
          43.77441,
          6.21099
        ],
        [
          43.77443,
          6.2111
        ],
        [
          43.77444,
          6.21118
        ],
        [
          43.77446,
          6.21126
        ],
        [
          43.77447,
          6.21133
        ],
        [
          43.7745,
          6.21149
        ],
        [
          43.77454,
          6.21163
        ],
        [
          43.77459,
          6.21173
        ],
        [
          43.77465,
          6.2118
        ],
        [
          43.77472,
          6.21188
        ],
        [
          43.7748,
          6.21193
        ],
        [
          43.77487,
          6.21197
        ],
        [
          43.77506,
          6.21206
        ],
        [
          43.77517,
          6.21211
        ],
        [
          43.77524,
          6.21213
        ],
        [
          43.77526,
          6.21214
        ],
        [
          43.77556,
          6.21228
        ],
        [
          43.77568,
          6.21234
        ],
        [
          43.77579,
          6.21242
        ],
        [
          43.77587,
          6.2125
        ],
        [
          43.77593,
          6.21262
        ],
        [
          43.77599,
          6.21281
        ],
        [
          43.77623,
          6.21264
        ],
        [
          43.77628,
          6.21301
        ],
        [
          43.77644,
          6.21282
        ],
        [
          43.77668,
          6.2131
        ],
        [
          43.7768,
          6.21289
        ],
        [
          43.77692,
          6.21264
        ],
        [
          43.77696,
          6.21268
        ],
        [
          43.777,
          6.21272
        ],
        [
          43.77712,
          6.21279
        ],
        [
          43.77717,
          6.21283
        ],
        [
          43.7773,
          6.21293
        ],
        [
          43.77735,
          6.213
        ],
        [
          43.77737,
          6.21307
        ],
        [
          43.77741,
          6.21308
        ],
        [
          43.77745,
          6.21308
        ],
        [
          43.77747,
          6.21305
        ],
        [
          43.77757,
          6.21285
        ],
        [
          43.7777,
          6.2126
        ],
        [
          43.77795,
          6.21222
        ],
        [
          43.77805,
          6.21208
        ],
        [
          43.77815,
          6.21197
        ],
        [
          43.77827,
          6.21185
        ],
        [
          43.77844,
          6.21171
        ],
        [
          43.77865,
          6.21155
        ],
        [
          43.77878,
          6.21144
        ],
        [
          43.77882,
          6.21146
        ],
        [
          43.77895,
          6.2114
        ],
        [
          43.77904,
          6.21138
        ],
        [
          43.77937,
          6.2113
        ],
        [
          43.77981,
          6.21131
        ],
        [
          43.77991,
          6.21134
        ],
        [
          43.78016,
          6.2114
        ],
        [
          43.78046,
          6.21155
        ],
        [
          43.78075,
          6.21175
        ],
        [
          43.78089,
          6.21183
        ],
        [
          43.78096,
          6.21194
        ],
        [
          43.78113,
          6.21209
        ],
        [
          43.78138,
          6.21243
        ],
        [
          43.78148,
          6.21259
        ],
        [
          43.78152,
          6.21267
        ],
        [
          43.78155,
          6.21267
        ],
        [
          43.78158,
          6.21269
        ],
        [
          43.78154,
          6.21278
        ],
        [
          43.78157,
          6.21281
        ]
      ]
    }
  },
  {
    "id": "snack-la-source",
    "cat": "restaurant",
    "coords": [
      43.77542,
      6.20707
    ],
    "stars": 2,
    "img": "https://static.secureholiday.net/static/Pictures/4987/00000543644.jpg",
    "fr": {
      "name": "Snack La Source",
      "desc": "Snack du Camping La Source, idéal pour une pause gourmande, des boissons fraîches ou un repas rapide à deux pas du lac.",
      "url": "https://www.tripadvisor.com/LocationPhotoDirectLink-g1761554-d6437594-i104543788-Camping_La_Source-Les_Salles_sur_Verdon_Var_Provence_Alpes_Cote_d_Azur.html",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Snack La Source",
      "desc": "Snack at Camping La Source, ideal for a gourmet break, cold drinks or a quick meal close to the lake.",
      "url": "https://www.tripadvisor.com/LocationPhotoDirectLink-g1761554-d6437594-i104543788-Camping_La_Source-Les_Salles_sur_Verdon_Var_Provence_Alpes_Cote_d_Azur.html",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Snack La Source",
      "desc": "Imbiss auf dem Camping La Source, ideal für eine kulinarische Pause, kühle Getränke oder eine schnelle Mahlzeit ganz in der Nähe des Sees.",
      "url": "https://www.tripadvisor.com/LocationPhotoDirectLink-g1761554-d6437594-i104543788-Camping_La_Source-Les_Salles_sur_Verdon_Var_Provence_Alpes_Cote_d_Azur.html",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Snack La Source",
      "desc": "Snackbar op Camping La Source, ideaal voor een lekkere pauze, koele drankjes of een snelle hap vlakbij het meer.",
      "url": "https://www.tripadvisor.com/LocationPhotoDirectLink-g1761554-d6437594-i104543788-Camping_La_Source-Les_Salles_sur_Verdon_Var_Provence_Alpes_Cote_d_Azur.html",
      "urlLabel": "Meer informatie"
    },
    "trace": {
      "logements": [
        "salles6",
        "salles8"
      ],
      "coords": [
        [
          43.77269,
          6.20827
        ],
        [
          43.77275,
          6.20832
        ],
        [
          43.77301,
          6.20835
        ],
        [
          43.77311,
          6.20844
        ],
        [
          43.77325,
          6.20856
        ],
        [
          43.77332,
          6.20862
        ],
        [
          43.77344,
          6.20873
        ],
        [
          43.77354,
          6.20881
        ],
        [
          43.77355,
          6.20879
        ],
        [
          43.77371,
          6.20842
        ],
        [
          43.7738,
          6.20848
        ],
        [
          43.77391,
          6.20822
        ],
        [
          43.7739,
          6.20816
        ],
        [
          43.77388,
          6.2081
        ],
        [
          43.77383,
          6.20807
        ],
        [
          43.77379,
          6.20804
        ],
        [
          43.77376,
          6.20801
        ],
        [
          43.77377,
          6.20799
        ],
        [
          43.77382,
          6.20797
        ],
        [
          43.77387,
          6.20797
        ],
        [
          43.77388,
          6.20789
        ],
        [
          43.77389,
          6.20779
        ],
        [
          43.77391,
          6.20769
        ],
        [
          43.77393,
          6.20757
        ],
        [
          43.77394,
          6.20748
        ],
        [
          43.77394,
          6.20742
        ],
        [
          43.77394,
          6.20737
        ],
        [
          43.77396,
          6.20734
        ],
        [
          43.77398,
          6.20726
        ],
        [
          43.77389,
          6.20721
        ],
        [
          43.77387,
          6.20719
        ],
        [
          43.77386,
          6.20716
        ],
        [
          43.77387,
          6.20712
        ],
        [
          43.77393,
          6.20674
        ],
        [
          43.77394,
          6.20671
        ],
        [
          43.77393,
          6.20665
        ],
        [
          43.77392,
          6.20661
        ],
        [
          43.77392,
          6.20657
        ],
        [
          43.77391,
          6.20652
        ],
        [
          43.77391,
          6.20649
        ],
        [
          43.77392,
          6.20647
        ],
        [
          43.77393,
          6.20646
        ],
        [
          43.77402,
          6.20642
        ],
        [
          43.77404,
          6.20641
        ],
        [
          43.77406,
          6.20638
        ],
        [
          43.77407,
          6.20636
        ],
        [
          43.77407,
          6.20633
        ],
        [
          43.77406,
          6.20628
        ],
        [
          43.77404,
          6.20625
        ],
        [
          43.77402,
          6.20624
        ],
        [
          43.774,
          6.20621
        ],
        [
          43.77399,
          6.20619
        ],
        [
          43.77399,
          6.20617
        ],
        [
          43.774,
          6.20613
        ],
        [
          43.77422,
          6.20624
        ],
        [
          43.77429,
          6.20627
        ],
        [
          43.77485,
          6.20657
        ],
        [
          43.77516,
          6.20671
        ],
        [
          43.77546,
          6.20684
        ],
        [
          43.77553,
          6.20702
        ],
        [
          43.77549,
          6.20708
        ],
        [
          43.77549,
          6.20708
        ]
      ]
    }
  },
  {
    "id": "resto-les-magnans",
    "cat": "restaurant",
    "coords": [
      43.84324,
      6.22143
    ],
    "stars": 3,
    "img": "https://bellodulac.netlify.app/images/lesmagnans_moustiers.png",
    "fr": {
      "name": "Les Magnans",
      "desc": "Notre restaurant préféré à Moustiers. Un peu excentré à l'entrée du village.",
      "url": "https://www.tripadvisor.fr/Restaurant_Review-g445024-d6896645-Reviews-Les_Magnans-Moustiers_Sainte_Marie_Digne_les_Bains_Alpes_de_Haute_Provence_Proven.html",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Les Magnans",
      "desc": "Our favorite restaurant in Moustiers. A little eccentric at the entrance of the village.",
      "url": "https://www.tripadvisor.fr/Restaurant_Review-g445024-d6896645-Reviews-Les_Magnans-Moustiers_Sainte_Marie_Digne_les_Bains_Alpes_de_Haute_Provence_Proven.html",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Les Magnans",
      "desc": "Unser Lieblingsrestaurant in Moustiers. Etwas abgelegen am Ortseingang.",
      "url": "https://www.tripadvisor.fr/Restaurant_Review-g445024-d6896645-Reviews-Les_Magnans-Moustiers_Sainte_Marie_Digne_les_Bains_Alpes_de_Haute_Provence_Proven.html",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Les Magnans",
      "desc": "Ons favoriete restaurant in Moustiers. Iets buiten het centrum, bij de ingang van het dorp.",
      "url": "https://www.tripadvisor.fr/Restaurant_Review-g445024-d6896645-Reviews-Les_Magnans-Moustiers_Sainte_Marie_Digne_les_Bains_Alpes_de_Haute_Provence_Proven.html",
      "urlLabel": "Meer informatie"
    },
    "trace": {
      "logements": [
        "moustiers"
      ],
      "coords": [
        [
          43.84717,
          6.22067
        ],
        [
          43.84714,
          6.22075
        ],
        [
          43.84713,
          6.22081
        ],
        [
          43.84714,
          6.22095
        ],
        [
          43.84714,
          6.22102
        ],
        [
          43.84713,
          6.22109
        ],
        [
          43.84708,
          6.22129
        ],
        [
          43.84702,
          6.22141
        ],
        [
          43.847,
          6.22143
        ],
        [
          43.84698,
          6.22145
        ],
        [
          43.84697,
          6.22147
        ],
        [
          43.84684,
          6.22159
        ],
        [
          43.8468,
          6.22162
        ],
        [
          43.84677,
          6.22162
        ],
        [
          43.8467,
          6.22159
        ],
        [
          43.84662,
          6.22154
        ],
        [
          43.84651,
          6.22144
        ],
        [
          43.84638,
          6.22136
        ],
        [
          43.84628,
          6.22132
        ],
        [
          43.84619,
          6.22134
        ],
        [
          43.84614,
          6.22136
        ],
        [
          43.84613,
          6.22137
        ],
        [
          43.84608,
          6.22137
        ],
        [
          43.84604,
          6.2214
        ],
        [
          43.84596,
          6.22138
        ],
        [
          43.8457,
          6.22128
        ],
        [
          43.84557,
          6.22128
        ],
        [
          43.84533,
          6.22132
        ],
        [
          43.8453,
          6.22135
        ],
        [
          43.84477,
          6.2214
        ],
        [
          43.84476,
          6.22129
        ],
        [
          43.84406,
          6.22129
        ],
        [
          43.84401,
          6.22131
        ],
        [
          43.84399,
          6.22131
        ],
        [
          43.84397,
          6.22127
        ],
        [
          43.84389,
          6.22134
        ],
        [
          43.84381,
          6.22143
        ],
        [
          43.84375,
          6.22149
        ],
        [
          43.84365,
          6.22155
        ],
        [
          43.84357,
          6.22157
        ],
        [
          43.84353,
          6.22158
        ],
        [
          43.84336,
          6.22159
        ],
        [
          43.84323,
          6.22158
        ],
        [
          43.84318,
          6.22158
        ],
        [
          43.84313,
          6.22157
        ],
        [
          43.84313,
          6.22154
        ],
        [
          43.84315,
          6.2214
        ],
        [
          43.84324,
          6.22141
        ]
      ]
    }
  },
  {
    "id": "resto-la-cascade-moustiers",
    "cat": "restaurant",
    "coords": [
      43.84682,
      6.22177
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/cascade_moustiers.jpg",
    "fr": {
      "name": "La Cascade",
      "desc": "Un cadre exceptionnel bercé par le bruit de la cascade au cœur du village de Moustiers-Sainte-Marie. Idéal pour un repas rafraîchissant dans un décor typique.",
      "url": "https://www.tripadvisor.fr/Search?q=La+Cascade+Moustiers-Sainte-Marie",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "La Cascade",
      "desc": "An exceptional setting lulled by the sound of the waterfall in the heart of the village of Moustiers-Sainte-Marie. Ideal for a refreshing meal in a typical decor.",
      "url": "https://www.tripadvisor.com/Search?q=La+Cascade+Moustiers-Sainte-Marie",
      "urlLabel": "More details"
    },
    "de": {
      "name": "La Cascade",
      "desc": "Ein außergewöhnliches Ambiente, begleitet vom Rauschen des Wasserfalls im Herzen des Dorfes Moustiers-Sainte-Marie. Ideal für eine erfrischende Mahlzeit in typischem Dekor.",
      "url": "https://www.tripadvisor.com/Search?q=La+Cascade+Moustiers-Sainte-Marie",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "La Cascade",
      "desc": "Een uitzonderlijke setting, verzacht door het geluid van de waterval, in het hart van het dorp Moustiers-Sainte-Marie. Ideaal voor een verfrissende maaltijd in een typisch decor.",
      "url": "https://www.tripadvisor.com/Search?q=La+Cascade+Moustiers-Sainte-Marie",
      "urlLabel": "Meer informatie"
    },
    "trace": {
      "logements": [
        "moustiers"
      ],
      "coords": [
        [
          43.84717,
          6.22067
        ],
        [
          43.84714,
          6.22075
        ],
        [
          43.84713,
          6.22081
        ],
        [
          43.84714,
          6.22095
        ],
        [
          43.84714,
          6.22102
        ],
        [
          43.84713,
          6.22109
        ],
        [
          43.84708,
          6.22129
        ],
        [
          43.84702,
          6.22141
        ],
        [
          43.847,
          6.22143
        ],
        [
          43.84698,
          6.22145
        ],
        [
          43.84697,
          6.22147
        ],
        [
          43.84684,
          6.22159
        ],
        [
          43.8468,
          6.22162
        ],
        [
          43.84676,
          6.22173
        ],
        [
          43.84676,
          6.22173
        ]
      ]
    }
  },
  {
    "id": "resto-part-des-anges",
    "cat": "restaurant",
    "coords": [
      43.84717,
      6.22051
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/partdesanges_moustiers.jpg",
    "fr": {
      "name": "La Part des Anges",
      "desc": "Type : Restauration. Une belle adresse pour se restaurer au cœur de Moustiers-Sainte-Marie.",
      "url": "https://www.tripadvisor.fr/Restaurant_Review-g445024-d14177404-Reviews-La_Part_Des_Anges-Moustiers_Sainte_Marie_Digne_les_Bains_Alpes_de_Haute_Provence.html",
      "urlLabel": "Voir sur la carte"
    },
    "en": {
      "name": "La Part des Anges",
      "desc": "Type: Restaurant. A lovely place to eat in the heart of Moustiers-Sainte-Marie.",
      "url": "https://www.tripadvisor.fr/Restaurant_Review-g445024-d14177404-Reviews-La_Part_Des_Anges-Moustiers_Sainte_Marie_Digne_les_Bains_Alpes_de_Haute_Provence.html",
      "urlLabel": "View on map"
    },
    "de": {
      "name": "La Part des Anges",
      "desc": "Typ: Restaurant. Ein schöner Ort zum Essen im Herzen von Moustiers-Sainte-Marie.",
      "url": "https://www.tripadvisor.fr/Restaurant_Review-g445024-d14177404-Reviews-La_Part_Des_Anges-Moustiers_Sainte_Marie_Digne_les_Bains_Alpes_de_Haute_Provence.html",
      "urlLabel": "Auf der Karte ansehen"
    },
    "nl": {
      "name": "La Part des Anges",
      "desc": "Type: Restaurant. Een heerlijke plek om te eten in het hart van Moustiers-Sainte-Marie.",
      "url": "https://www.tripadvisor.fr/Restaurant_Review-g445024-d14177404-Reviews-La_Part_Des_Anges-Moustiers_Sainte_Marie_Digne_les_Bains_Alpes_de_Haute_Provence.html",
      "urlLabel": "Bekijk op de kaart"
    },
    "trace": {
      "logements": [
        "moustiers"
      ],
      "coords": [
        [
          43.84717,
          6.22067
        ],
        [
          43.84719,
          6.22063
        ],
        [
          43.84723,
          6.22058
        ],
        [
          43.84723,
          6.22058
        ]
      ]
    }
  },
  {
    "id": "resto-tacos-mistral",
    "cat": "restaurant",
    "coords": [
      43.847,
      6.22131
    ],
    "stars": 1,
    "img": "https://bellodulac.netlify.app/images/tacosmistral_moustiers.png",
    "fr": {
      "name": "Tacos Mistral",
      "desc": "Type : Restauration rapide. Spécialités de tacos pour manger sur le pouce à Moustiers.",
      "url": "https://fr.restaurantguru.com/TandB-moustiers-sainte-marie-Moustiers-Sainte-Marie",
      "urlLabel": "Voir sur la carte"
    },
    "en": {
      "name": "Tacos Mistral",
      "desc": "Type: Fast food. Tacos specialties for a quick bite in Moustiers.",
      "url": "https://fr.restaurantguru.com/TandB-moustiers-sainte-marie-Moustiers-Sainte-Marie",
      "urlLabel": "View on map"
    },
    "de": {
      "name": "Tacos Mistral",
      "desc": "Typ: Fast Food. Taco-Spezialitäten für einen schnellen Snack in Moustiers.",
      "url": "https://fr.restaurantguru.com/TandB-moustiers-sainte-marie-Moustiers-Sainte-Marie",
      "urlLabel": "Auf der Karte ansehen"
    },
    "nl": {
      "name": "Tacos Mistral",
      "desc": "Type: Fastfood. Taco-specialiteiten voor een snelle hap in Moustiers.",
      "url": "https://fr.restaurantguru.com/TandB-moustiers-sainte-marie-Moustiers-Sainte-Marie",
      "urlLabel": "Bekijk op de kaart"
    },
    "trace": {
      "logements": [
        "moustiers"
      ],
      "coords": [
        [
          43.84717,
          6.22067
        ],
        [
          43.84714,
          6.22075
        ],
        [
          43.84703,
          6.22076
        ],
        [
          43.84697,
          6.2208
        ],
        [
          43.84696,
          6.22085
        ],
        [
          43.84694,
          6.22091
        ],
        [
          43.84696,
          6.22101
        ],
        [
          43.84697,
          6.22108
        ],
        [
          43.84702,
          6.22117
        ],
        [
          43.84705,
          6.2212
        ],
        [
          43.84706,
          6.22123
        ],
        [
          43.84702,
          6.22126
        ],
        [
          43.847,
          6.22131
        ]
      ]
    }
  },
  {
    "id": "resto-le-four-moustiers",
    "cat": "restaurant",
    "coords": [
      43.847207,
      6.2208514
    ],
    "stars": 2,
    "img": "https://bellodulac.netlify.app/images/lefour_moustiers.png",
    "fr": {
      "name": "Le Four",
      "desc": "Pizzeria au centre du village, cet établissement propose de délicieuses pizzas cuites au feu de bois à emporter ou à consommer sur place.",
      "url": "https://www.tripadvisor.fr/Restaurant_Review-g445024-d14832720-Reviews-Le_Four-Moustiers_Sainte_Marie_Digne_les_Bains_Alpes_de_Haute_Provence_Provence_.html",
      "urlLabel": "Voir sur la carte"
    },
    "en": {
      "name": "Le Four",
      "desc": "Pizzeria in the village center, this establishment offers delicious wood-fired pizzas to eat in or take away.",
      "url": "https://www.tripadvisor.fr/Restaurant_Review-g445024-d14832720-Reviews-Le_Four-Moustiers_Sainte_Marie_Digne_les_Bains_Alpes_de_Haute_Provence_Provence_.html",
      "urlLabel": "View on map"
    },
    "de": {
      "name": "Le Four",
      "desc": "Pizzeria im Ortszentrum, dieses Lokal bietet köstliche, im Holzofen gebackene Pizzen zum Mitnehmen oder vor Ort genießen.",
      "url": "https://www.tripadvisor.fr/Restaurant_Review-g445024-d14832720-Reviews-Le_Four-Moustiers_Sainte_Marie_Digne_les_Bains_Alpes_de_Haute_Provence_Provence_.html",
      "urlLabel": "Auf der Karte ansehen"
    },
    "nl": {
      "name": "Le Four",
      "desc": "Pizzeria in het centrum van het dorp, deze zaak biedt heerlijke in de houtoven gebakken pizza's om mee te nemen of ter plaatse te eten.",
      "url": "https://www.tripadvisor.fr/Restaurant_Review-g445024-d14832720-Reviews-Le_Four-Moustiers_Sainte_Marie_Digne_les_Bains_Alpes_de_Haute_Provence_Provence_.html",
      "urlLabel": "Bekijk op de kaart"
    }
  },
  {
    "id": "maison-truffe-aups",
    "cat": "visite",
    "coords": [
      43.62712,
      6.22475
    ],
    "stars": 2,
    "img": "https://maisondelatruffe-verdon.fr/wp-content/uploads/2015/10/img_decouvrez_1.jpg",
    "fr": {
      "name": "Maison de la Truffe d'Aups et du Verdon",
      "desc": "Musée et boutique consacrés à la truffe Mélanosporum, installés dans l'ancien Hospice Saint-Jacques (17e s.), place Martin Bidouré à Aups. Escape game gastronomique en saison.",
      "links": [
        {
          "url": "https://maisondelatruffe-verdon.fr/",
          "label": "Plus d'informations"
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D87yigYeBcGI",
          "label": "Voir la vidéo ▶️"
        }
      ]
    },
    "en": {
      "name": "Maison de la Truffe d'Aups et du Verdon",
      "desc": "Museum and shop dedicated to the black truffle, housed in the former 17th-century Saint-Jacques hospice on Place Martin Bidouré in Aups. Gourmet escape game in season.",
      "links": [
        {
          "url": "https://maisondelatruffe-verdon.fr/",
          "label": "More details"
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D87yigYeBcGI",
          "label": "Watch the video ▶️"
        }
      ]
    },
    "de": {
      "name": "Maison de la Truffe d'Aups et du Verdon",
      "desc": "Museum und Geschäft rund um die schwarze Trüffel, untergebracht im ehemaligen Hospiz Saint-Jacques aus dem 17. Jahrhundert an der Place Martin Bidouré in Aups. Gastronomisches Escape Game in der Saison.",
      "links": [
        {
          "url": "https://maisondelatruffe-verdon.fr/",
          "label": "Weitere Informationen"
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D87yigYeBcGI",
          "label": "Video ansehen ▶️"
        }
      ]
    },
    "nl": {
      "name": "Maison de la Truffe d'Aups et du Verdon",
      "desc": "Museum en winkel gewijd aan de zwarte truffel, gevestigd in het voormalige 17e-eeuwse hospice Saint-Jacques aan de Place Martin Bidouré in Aups. Culinaire escape game tijdens het seizoen.",
      "links": [
        {
          "url": "https://maisondelatruffe-verdon.fr/",
          "label": "Meer informatie"
        },
        {
          "url": "video.html?youtube=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D87yigYeBcGI",
          "label": "Video bekijken ▶️"
        }
      ]
    }
  },
  {
    "id": "pedalo-esparron",
    "cat": "sportaquatique",
    "coords": [
      43.73596,
      5.96868
    ],
    "stars": 2,
    "img": "https://laperleduverdon.fr/wp-content/uploads/2022/01/la-perle-du-verdon-location-pedalos-4places-2.jpg",
    "fr": {
      "name": "La Perle du Verdon - Location de pédalos",
      "desc": "Base nautique au petit port du village d'Esparron-de-Verdon, à l'entrée des Basses Gorges. Pédalos 4 et 6 places (avec toboggan), bateaux sans permis, canoës et kayaks. Ouvert de mi-avril à mi-octobre.",
      "url": "https://laperleduverdon.fr/tarifs/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "La Perle du Verdon - Pedal boat rental",
      "desc": "Water sports base at the small harbour of Esparron-de-Verdon, at the entrance to the Lower Gorges. 4- and 6-seat pedal boats (with slide), licence-free boats, canoes and kayaks. Open mid-April to mid-October.",
      "url": "https://laperleduverdon.fr/tarifs/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "La Perle du Verdon - Tretbootverleih",
      "desc": "Wassersportbasis im kleinen Hafen von Esparron-de-Verdon, am Eingang der unteren Schlucht. Tretboote für 4 und 6 Personen (mit Rutsche), führerscheinfreie Boote, Kanus und Kajaks. Geöffnet von Mitte April bis Mitte Oktober.",
      "url": "https://laperleduverdon.fr/tarifs/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "La Perle du Verdon - Waterfietsverhuur",
      "desc": "Watersportbasis in de kleine haven van Esparron-de-Verdon, bij de ingang van de Basses Gorges. Waterfietsen voor 4 en 6 personen (met glijbaan), vaarbewijsvrije boten, kano's en kajaks. Geopend van half april tot half oktober.",
      "url": "https://laperleduverdon.fr/tarifs/",
      "urlLabel": "Meer informatie"
    }
  },
  {
    "id": "montagnac-montpezat-village",
    "cat": "toponyme",
    "coords": [
      43.77939,
      6.09411
    ],
    "stars": 2,
    "img": "https://static.apidae-tourisme.com/filestore/objets-touristiques/images/83/127/8814419.jpg",
    "fr": {
      "name": "📍Montagnac-Montpezat",
      "desc": "Village discret au-dessus du lac de Montpezat. Egalement connu pour sa production de truffes (« Montagnac La Truffe »).",
      "url": "https://provence-alpes-cotedazur.com/decouvrir/villes/alpes-de-haute-provence/montagnac-montpezat/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "📍Montagnac-Montpezat",
      "desc": "A quiet village above Lake Montpezat. Also known for its truffle production (\"Montagnac La Truffe\").",
      "url": "https://provence-alpes-cotedazur.com/en/get-inspired/towns/alpes-de-haute-provence/montagnac-montpezat/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "📍Montagnac-Montpezat",
      "desc": "Ein ruhiges Dorf oberhalb des Lac de Montpezat. Auch bekannt für seine Trüffelproduktion („Montagnac La Truffe“).",
      "url": "https://provence-alpes-cotedazur.com/en/get-inspired/towns/alpes-de-haute-provence/montagnac-montpezat/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "📍Montagnac-Montpezat",
      "desc": "Een rustig dorpje boven het Lac de Montpezat. Ook bekend om zijn truffelproductie (\"Montagnac La Truffe\").",
      "url": "https://provence-alpes-cotedazur.com/en/get-inspired/towns/alpes-de-haute-provence/montagnac-montpezat/",
      "urlLabel": "Meer informatie"
    }
  },
  {
    "id": "bastide-moustiers",
    "cat": "restaurant",
    "coords": [
      43.83826,
      6.21807
    ],
    "stars": 3,
    "img": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/e5/bc/bf/terrasse-du-restaurant.jpg",
    "fr": {
      "name": "La Bastide de Moustiers",
      "desc": "Restaurant gastronomique une étoile au guide michelin créés par Alain Ducasse, dans une bastide provençale du 17e siècle avec jardin potager, à la sortie de Moustiers-Sainte-Marie.",
      "url": "https://fr.tripadvisor.ch/Restaurant_Review-g445024-d2659353-Reviews-La_Bastide_de_Moustiers_Hotel_Restaurant-Moustiers_Sainte_Marie_Digne_les_Bains_A.html",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "La Bastide de Moustiers",
      "desc": "Gourmet restaurant one star in the Michelin guide created by Alain Ducasse, in a 17th century Provencal bastide with vegetable garden, at the exit of Moustiers-Sainte-Marie.",
      "url": "https://fr.tripadvisor.ch/Restaurant_Review-g445024-d2659353-Reviews-La_Bastide_de_Moustiers_Hotel_Restaurant-Moustiers_Sainte_Marie_Digne_les_Bains_A.html",
      "urlLabel": "More details"
    },
    "de": {
      "name": "La Bastide de Moustiers",
      "desc": "Ein-Stern-Gourmetrestaurant im Guide Michelin, von Alain Ducasse gegründet, in einer provenzalischen Bastide aus dem 17. Jahrhundert mit Gemüsegarten, am Ortsausgang von Moustiers-Sainte-Marie.",
      "url": "https://fr.tripadvisor.ch/Restaurant_Review-g445024-d2659353-Reviews-La_Bastide_de_Moustiers_Hotel_Restaurant-Moustiers_Sainte_Marie_Digne_les_Bains_A.html",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "La Bastide de Moustiers",
      "desc": "Gastronomisch restaurant met één Michelinster, opgericht door Alain Ducasse, gevestigd in een 17e-eeuwse Provençaalse bastide met moestuin, aan de rand van Moustiers-Sainte-Marie.",
      "url": "https://fr.tripadvisor.ch/Restaurant_Review-g445024-d2659353-Reviews-La_Bastide_de_Moustiers_Hotel_Restaurant-Moustiers_Sainte_Marie_Digne_les_Bains_A.html",
      "urlLabel": "Meer informatie"
    }
  },
  {
    "id": "resto-pizzeria-ermitage",
    "cat": "restaurant",
    "coords": [
      43.7740913,
      6.217424
    ],
    "img": "https://bellodulac.netlify.app/images/pizzeria_ermitage.jpg",
    "fr": {
      "name": "Pizzeria de l'Ermitage",
      "desc": "Pizzeria à emporter ou sur place, au sein de l'Hôtel l'Ermitage. Pâte faite maison. Ouvert de mi-mars à fin octobre, tous les jours sauf le mardi, de 12h à 14h et de 19h à 21h.",
      "url": "https://www.tripadvisor.fr/Restaurant_Review-g1761554-d20989977-Reviews-Pizzeria_l_Ermitage-Les_Salles_sur_Verdon_Var_Provence_Alpes_Cote_d_Azur.html",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "Pizzeria de l'Ermitage",
      "desc": "Pizzeria, dine-in or takeaway, at the Hôtel l'Ermitage. Homemade dough. Open mid-March to end of October, every day except Tuesday, 12–2pm and 7–9pm.",
      "url": "https://www.tripadvisor.fr/Restaurant_Review-g1761554-d20989977-Reviews-Pizzeria_l_Ermitage-Les_Salles_sur_Verdon_Var_Provence_Alpes_Cote_d_Azur.html",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Pizzeria de l'Ermitage",
      "desc": "Pizzeria im Hôtel l'Ermitage, zum Vor-Ort-Essen oder Mitnehmen. Hausgemachter Teig. Geöffnet von Mitte März bis Ende Oktober, täglich außer dienstags, von 12 bis 14 Uhr und von 19 bis 21 Uhr.",
      "url": "https://www.tripadvisor.fr/Restaurant_Review-g1761554-d20989977-Reviews-Pizzeria_l_Ermitage-Les_Salles_sur_Verdon_Var_Provence_Alpes_Cote_d_Azur.html",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Pizzeria de l'Ermitage",
      "desc": "Pizzeria bij Hôtel l'Ermitage, om ter plaatse te eten of mee te nemen. Zelfgemaakt deeg. Geopend van half maart tot eind oktober, dagelijks behalve op dinsdag, van 12.00 tot 14.00 uur en van 19.00 tot 21.00 uur.",
      "url": "https://www.tripadvisor.fr/Restaurant_Review-g1761554-d20989977-Reviews-Pizzeria_l_Ermitage-Les_Salles_sur_Verdon_Var_Provence_Alpes_Cote_d_Azur.html",
      "urlLabel": "Meer informatie"
    }
  },
  {
    "id": "petit-train-moustiers",
    "cat": "visite",
    "coords": [
      43.846433,
      6.221353
    ],
    "stars": 2,
    "img": "https://bellodulac.vercel.app/assets/train_moustiers.jpg",
    "fr": {
      "name": "Le petit train des Alpes",
      "desc": "Petit train touristique qui monte jusqu'au centre du village avec un commentaire sur l'histoire de Moustiers. Pratique pour se garer en bas (parking Maïre ou parking du stade, gratuits) sans galérer à trouver une place au village. Plusieurs arrêts, tickets valables toute la journée. Tarifs : 5€ (3€ réduit : -65 ans/situation de handicap/3-11 ans), 3€ l'aller simple, 15€ le forfait famille (2 adultes + 2 enfants). Ouvert du 06/04 au 31/10, tous les jours de 10h à 12h et 14h à 18h (et jusqu'à 22h les soirs de marché nocturne en juillet-août).",
      "url": "https://www.moustiers.fr/fiche/le-petit-train-des-alpes/",
      "urlLabel": "Plus d'informations"
    },
    "en": {
      "name": "The Little Train of the Alps",
      "desc": "Tourist train that takes you up to the village centre with commentary on the history of Moustiers. Handy for parking at the bottom (free Maïre or stadium car parks) without the hassle of finding a spot in the village. Several stops, tickets valid all day. Rates: €5 (€3 reduced: 65+/disability/ages 3-11), €3 one-way, €15 family pass (2 adults + 2 children). Open 06/04 to 31/10, daily 10am-12pm and 2pm-6pm (until 10pm on night-market evenings in July-August).",
      "url": "https://www.moustiers.fr/en/fiche/le-petit-train-des-alpes-3/",
      "urlLabel": "More details"
    },
    "de": {
      "name": "Der kleine Zug der Alpen",
      "desc": "Touristenzug, der Sie mit Kommentaren zur Geschichte von Moustiers hinauf ins Dorfzentrum bringt. Praktisch, um unten zu parken (kostenlose Parkplätze Maïre oder Stade) ohne mühsame Parkplatzsuche im Dorf. Mehrere Haltestellen, Tickets den ganzen Tag gültig. Preise: 5 € (ermäßigt 3 €: ab 65 Jahren/bei Behinderung/3-11 Jahre), 3 € einfache Fahrt, 15 € Familienpass (2 Erwachsene + 2 Kinder). Geöffnet vom 06.04. bis 31.10., täglich von 10 bis 12 Uhr und von 14 bis 18 Uhr (an Abenden mit Nachtmarkt im Juli/August bis 22 Uhr).",
      "url": "https://www.moustiers.fr/en/fiche/le-petit-train-des-alpes-3/",
      "urlLabel": "Weitere Informationen"
    },
    "nl": {
      "name": "Het kleine treintje van de Alpen",
      "desc": "Toeristentreintje dat je met commentaar over de geschiedenis van Moustiers naar het dorpscentrum brengt. Handig om onderaan te parkeren (gratis parkeerplaatsen Maïre of bij het stadion) zonder gedoe om een plek in het dorp te vinden. Meerdere haltes, tickets de hele dag geldig. Tarieven: € 5 (verlaagd tarief € 3: 65+/beperking/3-11 jaar), € 3 enkele reis, € 15 familiepas (2 volwassenen + 2 kinderen). Geopend van 06/04 tot 31/10, dagelijks van 10.00 tot 12.00 uur en van 14.00 tot 18.00 uur (tot 22.00 uur op avonden met nachtmarkt in juli-augustus).",
      "url": "https://www.moustiers.fr/en/fiche/le-petit-train-des-alpes-3/",
      "urlLabel": "Meer informatie"
    }
  }
];
