/* ==========================================================================
   logements.js — Source de verite unique pour les 3 logements (Bell'Étoile /
   Bell'O du Lac 6p / Bell'O du Lac 8p), partagee par index.html, panorama.html,
   evenements.html et logements.html.

   - "default" : identifiant du logement utilise par defaut quand l'URL n'en
     precise aucun (index.html/panorama.html/logements.html). evenements.html
     n'utilise que 2 secteurs (salles/moustiers) : il derive son propre defaut
     coarse a partir de cette valeur (voir logoFamily/secteur dans chaque page).
   - "listings" : une entree par logement, cle = identifiant (moustiers, salles6,
     salles8). "order" sert uniquement a l'ordre d'affichage de logements.html.
   ========================================================================== */

window.LOGEMENTS_DATA = {
  default: "moustiers",

  listings: {
    moustiers: {
      id: "moustiers",
      order: 3,
      emoji: "🏡",
      label: { FR: "Bell'Étoile — Moustiers, terrasse vue village", EN: "Bell'Étoile — Moustiers, terrace with village view", DE: "Bell'Étoile — Moustiers, Terrasse mit Dorfblick", NL: "Bell'Étoile — Moustiers, terras met dorpsuitzicht" },
      title: { FR: "Bell'Étoile", EN: "Bell'Étoile", DE: "Bell'Étoile", NL: "Bell'Étoile" },
      place: { FR: "Moustiers-Sainte-Marie, Provence", EN: "Moustiers-Sainte-Marie, Provence", DE: "Moustiers-Sainte-Marie, Provence", NL: "Moustiers-Sainte-Marie, Provence" },
      desc:  { FR: "Vue imprenable & terrasse au centre de Moustiers", EN: "Stunning view & terrace in the heart of Moustiers", DE: "Traumhafter Blick & Terrasse im Herzen von Moustiers", NL: "Adembenemend uitzicht & terras in het hart van Moustiers" },
      cover: "https://bellodulac.netlify.app/images/moustiers-terrasse.jpg",
      logo:  "https://bellodulac.netlify.app/images/bell-etoile-logo.png",
      brand: { FR: "Bell'Étoile", EN: "Bell'Étoile", DE: "Bell'Étoile", NL: "Bell'Étoile" },
      address: "1055 Av. Frédéric Mistral, Moustiers-Sainte-Marie, 04360",
      coords: { lat: 43.84714, lon: 6.22078 },
      rating: 4.92,
      reviews: 12,
      room: "1631901662839629884",
      host_contact: "https://www.airbnb.fr/contact_host/1631901662839629884/send_message",
      welcome: {
        FR: "Bienvenue à Moustiers-Sainte-Marie ⭐ Classé parmi les plus beaux villages de France, votre logement est idéalement placé au cœur du village, à pied des restaurants, des commerces et des activités. Vous bénéficiez d'une terrasse privative panoramique et — rare à Moustiers — d'un dépose-minute juste devant la porte. Profitez du Lac de Sainte-Croix à ~10 minutes pour la baignade. Bon séjour !",
        EN: "Welcome to Moustiers-Sainte-Marie ⭐ Listed among France's most beautiful villages, your home is right in the heart of the village, a short walk from restaurants, shops and summer activities. You'll enjoy a private panoramic terrace and — rare here — a drop-off zone right outside the door. Lake Sainte-Croix is only ~10 minutes away for swimming. Enjoy your stay!",
        DE: "Willkommen in Moustiers-Sainte-Marie ⭐ Als eines der schönsten Dörfer Frankreichs ausgezeichnet, liegt Ihre Unterkunft ideal im Herzen des Dorfes, nur wenige Schritte von Restaurants, Geschäften und Sommeraktivitäten entfernt. Sie genießen eine private Panoramaterrasse und — selten in Moustiers — eine Absetzzone direkt vor der Tür. Der Lac de Sainte-Croix liegt nur ~10 Minuten entfernt zum Baden. Wir wünschen Ihnen einen schönen Aufenthalt!",
        NL: "Welkom in Moustiers-Sainte-Marie ⭐ Dit dorp, verkozen tot een van de mooiste van Frankrijk, herbergt uw woning midden in het centrum, op loopafstand van restaurants, winkels en zomeractiviteiten. Geniet van een eigen panoramaterras en — zeldzaam in Moustiers — een op- en afstapzone vlak voor de deur. Het Meer van Sainte-Croix ligt op ~10 minuten om te zwemmen. Fijn verblijf!"
      }
    },

    salles6: {
      id: "salles6",
      order: 2,
      emoji: "🌿",
      label: { FR: "Bell'O du Lac 6P — Les Salles-sur-Verdon", EN: "Bell'O du Lac 6P — Les Salles-sur-Verdon", DE: "Bell'O du Lac 6P — Les Salles-sur-Verdon", NL: "Bell'O du Lac 6P — Les Salles-sur-Verdon" },
      title: { FR: "Bell'O du Lac • 6 pers.", EN: "Bell'O du Lac • 6 guests", DE: "Bell'O du Lac • 6 Pers.", NL: "Bell'O du Lac • 6 pers." },
      place: { FR: "Les Salles-sur-Verdon, à 400m du lac", EN: "Les Salles-sur-Verdon, 400m from the lake", DE: "Les Salles-sur-Verdon, 400m vom See", NL: "Les Salles-sur-Verdon, op 400m van het meer" },
      desc:  { FR: "Maison 6 personnes, à pied du lac, chambre vue lac & jardin", EN: "6-guest house, walk to the lake, lake-view bedroom & garden", DE: "Haus für 6 Personen, zu Fuß zum See, Schlafzimmer mit Seeblick & Garten", NL: "Huis voor 6 personen, lopend naar het meer, slaapkamer met meerzicht & tuin" },
      cover: "https://bellodulac.netlify.app/images/bello6-cover.jpg",
      logo:  "https://bellodulac.netlify.app/images/bellodulac-logo.png",
      brand: { FR: "Bell'O du Lac", EN: "Bell'O du Lac", DE: "Bell'O du Lac", NL: "Bell'O du Lac" },
      address: "5 Rue Sainte-Catherine, Les Salles-sur-Verdon, 83630",
      coords: { lat: 43.77264860239855, lon: 6.208356320858003 },
      rating: 4.81,
      reviews: 16,
      room: "1401227916063751925",
      host_contact: "https://www.airbnb.fr/contact_host/1401227916063751925/send_message",
      welcome: {
        FR: "Bienvenue aux Salles-sur-Verdon 🌊 Votre maison familiale (6 personnes) est idéalement placée à ~400m du lac à pied, au cœur du village. Vous profitez d'un jardin paisible, à 2 pas des restaurants, du marché du jeudi matin et de la base nautique. Le Lac de Sainte-Croix et ses eaux turquoise vous attendent. Bon séjour !",
        EN: "Welcome to Les Salles-sur-Verdon 🌊 Your family home (sleeps 6) sits just ~400m from the lake on foot, in the heart of the village. Enjoy a peaceful garden, steps from restaurants, the Thursday market and the water-sports base. Turquoise Lake Sainte-Croix awaits. Enjoy your stay!",
        DE: "Willkommen in Les Salles-sur-Verdon 🌊 Ihr Familienhaus (6 Personen) liegt ideal, nur ~400m zu Fuß vom See entfernt, im Herzen des Dorfes. Genießen Sie einen ruhigen Garten, nur wenige Schritte von Restaurants, dem Donnerstagsmarkt und der Wassersportbasis entfernt. Der türkisfarbene Lac de Sainte-Croix erwartet Sie. Wir wünschen Ihnen einen schönen Aufenthalt!",
        NL: "Welkom in Les Salles-sur-Verdon 🌊 Uw gezinswoning (6 personen) ligt ideaal, op zo'n 400m lopen van het meer, midden in het dorp. Geniet van een rustige tuin, vlak bij restaurants, de donderdagmarkt en het watersportcentrum. Het turkooizen Meer van Sainte-Croix wacht op u. Fijn verblijf!"
      }
    },

    salles8: {
      id: "salles8",
      order: 1,
      emoji: "🏖️",
      label: { FR: "Bell'O du Lac 8P — Les Salles-sur-Verdon, vue lac", EN: "Bell'O du Lac 8P — Les Salles-sur-Verdon, lake view", DE: "Bell'O du Lac 8P — Les Salles-sur-Verdon, Seeblick", NL: "Bell'O du Lac 8P — Les Salles-sur-Verdon, meerzicht" },
      title: { FR: "Bell'O du Lac • 8 pers.", EN: "Bell'O du Lac • 8 guests", DE: "Bell'O du Lac • 8 Pers.", NL: "Bell'O du Lac • 8 pers." },
      place: { FR: "Les Salles-sur-Verdon, vue lac", EN: "Les Salles-sur-Verdon, lake view", DE: "Les Salles-sur-Verdon, Seeblick", NL: "Les Salles-sur-Verdon, meerzicht" },
      desc:  { FR: "Maison 8 personnes & jardin, à pied du lac, chambre vue lac", EN: "8-guest house with garden, walk to the lake, lake-view bedroom", DE: "Haus für 8 Personen mit Garten, zu Fuß zum See, Schlafzimmer mit Seeblick", NL: "Huis voor 8 personen met tuin, lopend naar het meer, slaapkamer met meerzicht" },
      cover: "https://bellodulac.netlify.app/images/bello8-cover.jpg",
      logo:  "https://bellodulac.netlify.app/images/bellodulac-logo.png",
      brand: { FR: "Bell'O du Lac", EN: "Bell'O du Lac", DE: "Bell'O du Lac", NL: "Bell'O du Lac" },
      address: "5 Rue Sainte-Catherine, Les Salles-sur-Verdon, 83630",
      coords: { lat: 43.77264860239855, lon: 6.208356320858003 },
      rating: 4.83,
      reviews: 6,
      room: "1396288753176684832",
      host_contact: "https://www.airbnb.fr/contact_host/1396288753176684832/send_message",
      welcome: {
        FR: "Bienvenue aux Salles-sur-Verdon 🏖️ Votre maison spacieuse (8 personnes) offre une superbe vue sur le Lac de Sainte-Croix. Depuis votre balcon, profitez des eaux turquoise du plus beau lac de Provence. À pied : lac, restaurants, marché du jeudi, terrain de boules et tennis gratuit. Bon séjour !",
        EN: "Welcome to Les Salles-sur-Verdon 🏖️ Your spacious home (sleeps 8) enjoys a stunning view over Lake Sainte-Croix. From the balcony, soak in the turquoise waters of Provence's most beautiful lake. On foot: the lake, restaurants, Thursday market, pétanque court and free tennis. Enjoy your stay!",
        DE: "Willkommen in Les Salles-sur-Verdon 🏖️ Ihr geräumiges Haus (8 Personen) bietet einen herrlichen Blick auf den Lac de Sainte-Croix. Genießen Sie von Ihrem Balkon aus die türkisfarbenen Gewässer des schönsten Sees der Provence. Zu Fuß erreichbar: See, Restaurants, Donnerstagsmarkt, Boule-Platz und kostenloser Tennisplatz. Wir wünschen Ihnen einen schönen Aufenthalt!",
        NL: "Welkom in Les Salles-sur-Verdon 🏖️ Uw ruime woning (8 personen) biedt een prachtig uitzicht op het Meer van Sainte-Croix. Geniet vanaf uw balkon van het turkooizen water van het mooiste meer van de Provence. Te voet bereikbaar: het meer, restaurants, de donderdagmarkt, jeu-de-boulesbaan en gratis tennisbaan. Fijn verblijf!"
      }
    }
  }
};
