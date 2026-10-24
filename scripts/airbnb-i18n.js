/* Traductions (EN / DE / NL) du contenu des annonces de scripts/airbnb-data.js.
   Le français reste la langue source (airbnb-data.js). Les libellés communs
   (équipements, rubriques...) sont dans `dict` ; les textes propres à chaque
   logement sont dans salles6 / salles8 / moustiers (mêmes tableaux que le FR). */

const dict = {
  // Rubriques
  'Points forts': { EN: 'Highlights', DE: 'Highlights', NL: 'Highlights' },
  'Description': { EN: 'About this place', DE: 'Beschreibung', NL: 'Beschrijving' },
  'Le logement': { EN: 'The place', DE: 'Die Unterkunft', NL: 'Het verblijf' },
  'Accès des voyageurs': { EN: 'Guest access', DE: 'Zugang für Gäste', NL: 'Toegang voor gasten' },
  'Autres remarques': { EN: 'Other things to note', DE: 'Sonstige Hinweise', NL: 'Overige opmerkingen' },
  'À noter': { EN: 'Please note', DE: 'Bitte beachten', NL: 'Goed om te weten' },
  'Où vous dormirez': { EN: "Where you'll sleep", DE: 'Schlafmöglichkeiten', NL: 'Waar u slaapt' },
  'Ce que propose ce logement': { EN: 'What this place offers', DE: 'Ausstattung', NL: 'Voorzieningen' },
  'Non disponible': { EN: 'Not available', DE: 'Nicht vorhanden', NL: 'Niet beschikbaar' },
  'Évaluations': { EN: 'Ratings', DE: 'Bewertungen', NL: 'Beoordelingen' },
  'avis Airbnb': { EN: 'Airbnb reviews', DE: 'Airbnb-Bewertungen', NL: 'Airbnb-beoordelingen' },
  'Où se situe le logement': { EN: 'Where it is', DE: 'Lage', NL: 'Locatie' },
  'Votre hôte': { EN: 'Your host', DE: 'Ihr Gastgeber', NL: 'Uw gastheer' },
  "Numéro d'enregistrement": { EN: 'Registration number', DE: 'Registrierungsnummer', NL: 'Registratienummer' },
  'voyageurs': { EN: 'guests', DE: 'Gäste', NL: 'gasten' },
  'chambres': { EN: 'bedrooms', DE: 'Schlafzimmer', NL: 'slaapkamers' },
  'lits': { EN: 'beds', DE: 'Betten', NL: 'bedden' },
  'salle de bain': { EN: 'bathroom', DE: 'Badezimmer', NL: 'badkamer' },
  'salles de bain': { EN: 'bathrooms', DE: 'Badezimmer', NL: 'badkamers' },
  'Superhôte': { EN: 'Superhost', DE: 'Superhost', NL: 'Superhost' },
  "ans en tant qu'hôte": { EN: 'years hosting', DE: 'Jahre als Gastgeber', NL: 'jaar als gastheer' },
  'évaluations': { EN: 'reviews', DE: 'Bewertungen', NL: 'beoordelingen' },
  'Langue parlée : Français': { EN: 'Language spoken: French', DE: 'Gesprochene Sprache: Französisch', NL: 'Gesproken taal: Frans' },
  'Répond dans l’heure (taux de réponse : 100 %)': { EN: 'Responds within an hour (response rate: 100%)', DE: 'Antwortet innerhalb einer Stunde (Antwortrate: 100 %)', NL: 'Reageert binnen een uur (reactiepercentage: 100%)' },
  'Coup de cœur voyageurs': { EN: 'Guest favourite', DE: 'Liebling unter den Gästen', NL: 'Gastenfavoriet' },

  // Notes
  'Propreté': { EN: 'Cleanliness', DE: 'Sauberkeit', NL: 'Netheid' },
  'Précision': { EN: 'Accuracy', DE: 'Genauigkeit', NL: 'Nauwkeurigheid' },
  'Arrivée': { EN: 'Check-in', DE: 'Anreise', NL: 'Aankomst' },
  'Communication': { EN: 'Communication', DE: 'Kommunikation', NL: 'Communicatie' },
  'Emplacement': { EN: 'Location', DE: 'Lage', NL: 'Locatie' },
  'Qualité-prix': { EN: 'Value', DE: 'Preis-Leistung', NL: 'Prijs-kwaliteit' },

  // Couchages
  'Chambre 1': { EN: 'Bedroom 1', DE: 'Schlafzimmer 1', NL: 'Slaapkamer 1' },
  'Chambre 2': { EN: 'Bedroom 2', DE: 'Schlafzimmer 2', NL: 'Slaapkamer 2' },
  'Chambre 3': { EN: 'Bedroom 3', DE: 'Schlafzimmer 3', NL: 'Slaapkamer 3' },
  'Salon': { EN: 'Living room', DE: 'Wohnzimmer', NL: 'Woonkamer' },
  '1 lit queen size': { EN: '1 queen bed', DE: '1 Queensize-Bett', NL: '1 queensize bed' },
  '1 lit double': { EN: '1 double bed', DE: '1 Doppelbett', NL: '1 tweepersoonsbed' },
  '1 canapé convertible': { EN: '1 sofa bed', DE: '1 Schlafsofa', NL: '1 slaapbank' },
  'Grande chambre de 16 m² avec lit 160 cm': { EN: 'Large 16 m² bedroom with 160 cm bed', DE: 'Großes 16-m²-Schlafzimmer mit 160-cm-Bett', NL: 'Grote slaapkamer van 16 m² met bed van 160 cm' },
  'Chambre avec lit 140 cm': { EN: 'Bedroom with 140 cm bed', DE: 'Schlafzimmer mit 140-cm-Bett', NL: 'Slaapkamer met bed van 140 cm' },
  'Vaste salon baigné de lumière': { EN: 'Spacious, light-filled living room', DE: 'Geräumiges, lichtdurchflutetes Wohnzimmer', NL: 'Ruime, lichte woonkamer' },

  // Groupes d'équipements
  'Salle de bain': { EN: 'Bathroom', DE: 'Badezimmer', NL: 'Badkamer' },
  'Chambre et linge': { EN: 'Bedroom and linen', DE: 'Schlafzimmer und Wäsche', NL: 'Slaapkamer en linnengoed' },
  'Divertissement': { EN: 'Entertainment', DE: 'Unterhaltung', NL: 'Entertainment' },
  'Chauffage et climatisation': { EN: 'Heating and cooling', DE: 'Heizung und Klimaanlage', NL: 'Verwarming en airconditioning' },
  'Sécurité à la maison': { EN: 'Home safety', DE: 'Sicherheit', NL: 'Veiligheid' },
  'Internet et bureau': { EN: 'Internet and office', DE: 'Internet und Arbeitsplatz', NL: 'Internet en werkplek' },
  'Cuisine et salle à manger': { EN: 'Kitchen and dining', DE: 'Küche und Essbereich', NL: 'Keuken en eetruimte' },
  // 'Emplacement' (groupe) = même mot que la note ci-dessus
  'Extérieur': { EN: 'Outdoor', DE: 'Außenbereich', NL: 'Buiten' },
  'Parking et installations': { EN: 'Parking and facilities', DE: 'Parken und Einrichtungen', NL: 'Parkeren en faciliteiten' },
  'Services': { EN: 'Services', DE: 'Services', NL: 'Services' },

  // Équipements
  'Baignoire': { EN: 'Bathtub', DE: 'Badewanne', NL: 'Bad' },
  'Sèche-cheveux': { EN: 'Hair dryer', DE: 'Haartrockner', NL: 'Haardroger' },
  'Produits de nettoyage': { EN: 'Cleaning products', DE: 'Reinigungsmittel', NL: 'Schoonmaakmiddelen' },
  'Eau chaude': { EN: 'Hot water', DE: 'Warmwasser', NL: 'Warm water' },
  'Gel douche': { EN: 'Shower gel', DE: 'Duschgel', NL: 'Douchegel' },
  'Shampoing': { EN: 'Shampoo', DE: 'Shampoo', NL: 'Shampoo' },
  'Savon pour le corps': { EN: 'Body soap', DE: 'Körperseife', NL: 'Lichaamszeep' },
  'Lave-linge': { EN: 'Washing machine', DE: 'Waschmaschine', NL: 'Wasmachine' },
  'Lave-linge (gratuit)': { EN: 'Washing machine (free)', DE: 'Waschmaschine (kostenlos)', NL: 'Wasmachine (gratis)' },
  'Cintres': { EN: 'Hangers', DE: 'Kleiderbügel', NL: 'Kleerhangers' },
  'Linge de lit': { EN: 'Bed linen', DE: 'Bettwäsche', NL: 'Beddengoed' },
  'Étendoir à linge': { EN: 'Clothes drying rack', DE: 'Wäscheständer', NL: 'Wasrek' },
  'Espace de rangement pour les vêtements : placard': { EN: 'Clothing storage: wardrobe', DE: 'Kleiderstauraum: Schrank', NL: 'Kledingopslag: kast' },
  'Espace de rangement pour les vêtements': { EN: 'Clothing storage', DE: 'Kleiderstauraum', NL: 'Kledingopslag' },
  'Produits de base': { EN: 'Essentials', DE: 'Grundausstattung', NL: 'Basisbenodigdheden' },
  'Télévision': { EN: 'TV', DE: 'Fernseher', NL: 'Televisie' },
  'Climatisation': { EN: 'Air conditioning', DE: 'Klimaanlage', NL: 'Airconditioning' },
  'Ventilateurs portables': { EN: 'Portable fans', DE: 'Tragbare Ventilatoren', NL: 'Draagbare ventilatoren' },
  'Chauffage : système split sans évacuation': { EN: 'Heating: ductless split system', DE: 'Heizung: Split-System ohne Abluft', NL: 'Verwarming: split-systeem' },
  'Chauffage': { EN: 'Heating', DE: 'Heizung', NL: 'Verwarming' },
  'Chauffage radiant': { EN: 'Radiant heating', DE: 'Strahlungsheizung', NL: 'Stralingsverwarming' },
  'Wifi': { EN: 'Wifi', DE: 'WLAN', NL: 'Wifi' },
  'Espace de travail dédié': { EN: 'Dedicated workspace', DE: 'Eigener Arbeitsbereich', NL: 'Eigen werkplek' },
  'Routeur wifi portable': { EN: 'Portable wifi router', DE: 'Tragbarer WLAN-Router', NL: 'Draagbare wifi-router' },
  'Cuisine': { EN: 'Kitchen', DE: 'Küche', NL: 'Keuken' },
  'Réfrigérateur': { EN: 'Refrigerator', DE: 'Kühlschrank', NL: 'Koelkast' },
  'Mini réfrigérateur': { EN: 'Mini fridge', DE: 'Minikühlschrank', NL: 'Minikoelkast' },
  'Four à micro-ondes': { EN: 'Microwave', DE: 'Mikrowelle', NL: 'Magnetron' },
  'Tout le nécessaire pour cuisiner': { EN: 'Cooking basics', DE: 'Grundausstattung zum Kochen', NL: 'Basisbenodigdheden om te koken' },
  'Vaisselle et couverts': { EN: 'Dishes and cutlery', DE: 'Geschirr und Besteck', NL: 'Servies en bestek' },
  'Congélateur': { EN: 'Freezer', DE: 'Gefrierschrank', NL: 'Vriezer' },
  'Lave-vaisselle': { EN: 'Dishwasher', DE: 'Geschirrspüler', NL: 'Vaatwasser' },
  'Cuisinière électrique': { EN: 'Electric stove', DE: 'Elektroherd', NL: 'Elektrisch fornuis' },
  'Cuisinière à induction': { EN: 'Induction stove', DE: 'Induktionsherd', NL: 'Inductiefornuis' },
  'Four': { EN: 'Oven', DE: 'Backofen', NL: 'Oven' },
  'Cafetière : machine à expresso': { EN: 'Coffee maker: espresso machine', DE: 'Kaffeemaschine: Espressomaschine', NL: 'Koffiezetapparaat: espressomachine' },
  'Cafetière': { EN: 'Coffee maker', DE: 'Kaffeemaschine', NL: 'Koffiezetapparaat' },
  'Plaques de cuisson': { EN: 'Hob', DE: 'Kochfeld', NL: 'Kookplaat' },
  'Table à manger': { EN: 'Dining table', DE: 'Esstisch', NL: 'Eettafel' },
  'Bouilloire électrique': { EN: 'Electric kettle', DE: 'Wasserkocher', NL: 'Waterkoker' },
  'Verres à vin': { EN: 'Wine glasses', DE: 'Weingläser', NL: 'Wijnglazen' },
  'Ustensiles de barbecue': { EN: 'Barbecue utensils', DE: 'Grillbesteck', NL: 'Barbecuegereedschap' },
  'Café': { EN: 'Coffee', DE: 'Kaffee', NL: 'Koffie' },
  'Accès à un lac': { EN: 'Lake access', DE: 'Zugang zum See', NL: 'Toegang tot een meer' },
  'Accès partagé à la plage': { EN: 'Shared beach access', DE: 'Gemeinsamer Strandzugang', NL: 'Gedeelde toegang tot het strand' },
  'Entrée privée': { EN: 'Private entrance', DE: 'Privater Eingang', NL: 'Eigen ingang' },
  'Patio ou balcon privé': { EN: 'Private patio or balcony', DE: 'Private Terrasse oder privater Balkon', NL: 'Eigen patio of balkon' },
  'Arrière-cour privée': { EN: 'Private back garden', DE: 'Privater Hinterhof', NL: 'Eigen achtertuin' },
  "Mobilier d'extérieur": { EN: 'Outdoor furniture', DE: 'Gartenmöbel', NL: 'Buitenmeubilair' },
  'Espace repas en plein air': { EN: 'Outdoor dining area', DE: 'Essbereich im Freien', NL: 'Buiteneetruimte' },
  'Barbecue': { EN: 'Barbecue', DE: 'Grill', NL: 'Barbecue' },
  'Stationnement gratuit sur place': { EN: 'Free parking on premises', DE: 'Kostenloser Parkplatz vor Ort', NL: 'Gratis parkeren op het terrein' },
  'Stationnement gratuit dans la rue': { EN: 'Free street parking', DE: 'Kostenloses Parken an der Straße', NL: 'Gratis parkeren op straat' },
  'Arrivée autonome': { EN: 'Self check-in', DE: 'Selbstständiges Einchecken', NL: 'Zelfstandig inchecken' },
  'Boîte à clé sécurisée': { EN: 'Secure key box', DE: 'Sicherer Schlüsselkasten', NL: 'Beveiligde sleutelkluis' },
  'Détecteur de fumée': { EN: 'Smoke alarm', DE: 'Rauchmelder', NL: 'Rookmelder' },
  'Détecteur de monoxyde de carbone': { EN: 'Carbon monoxide alarm', DE: 'Kohlenmonoxidmelder', NL: 'Koolmonoxidemelder' },
  'Caméras de surveillance extérieures': { EN: 'Exterior security cameras', DE: 'Außenüberwachungskameras', NL: 'Beveiligingscamera’s buiten' },
  'Sèche-linge': { EN: 'Dryer', DE: 'Wäschetrockner', NL: 'Droger' },
};

const salles6 = {
  EN: {
    h1: '6-guest holiday house with garden in Les Salles-sur-Verdon, 400 m from Lake Sainte-Croix',
    highlights: [
      ['In Les Salles-sur-Verdon, by the lake', 'About a 5-minute walk from Lake Sainte-Croix, with restaurants and shops within walking distance.'],
      ['Private garden with barbecue and kitchen', 'A private garden with an outdoor dining area and a barbecue, plus a fully equipped kitchen with a dishwasher indoors.'],
      ['A responsive host', 'Guests mention the comfortable beds, and many praise the host, Sandrine, for her responsiveness and warm welcome.'],
    ],
    description: `Enjoy the Bell'O du Lac house🏡, tastefully renovated and well equipped, a 5-minute walk from the lake! 🏝️
=> Ground-floor living space with open kitchen, and garden
=> 3 bedrooms upstairs, one with a lake view + large TV, and 2 with a glimpse of the Château d'Aiguines 🏰

The pluses: 🥇
✅ Ideally located, everything on foot: lake 400 m away, restaurants, shops, markets and festivities!
✅ Air conditioning in the living area
✅ Fibre WIFI
✅ Garden
✅ Barbecue`,
    sections: [
      ['Le logement', `Outdoors🍀🍃🌿:
A 100 m² nicely landscaped garden🌳🌿 with an XL barbecue🥩🥓 and a garden table with 6 chairs for wonderful moments outside ☀️☀️🪴

Indoors:🏡
=> Ground floor: fully renovated open kitchen🍴 with a connected wall-mounted TV 📽️

=> Upstairs: Bedroom 1 with queen-size 160 bed and connected wall-mounted TV 📽️
Bedroom 2 with 140 double bed
Bedroom 3 with 140 double bed
Bathroom with bathtub
Separate WC.`],
      ['Accès des voyageurs', 'Secure key box for independent arrival and departure.'],
      ['Autres remarques', `⏩ air conditioning in the living area
⏩ fibre for a high-performance internet connection.
⏩ Bed linen and towels provided 🏡: for extra comfort, your beds will be made up and ready on arrival!`],
    ],
    locationText: "Les Salles-sur-Verdon, Provence-Alpes-Côte d'Azur, France",
  },
  DE: {
    h1: 'Ferienhaus für 6 Personen mit Garten in Les Salles-sur-Verdon, 400 m vom See Sainte-Croix',
    highlights: [
      ['In Les Salles-sur-Verdon, am See', 'Etwa 5 Gehminuten vom See Sainte-Croix entfernt, Restaurants und Geschäfte sind zu Fuß erreichbar.'],
      ['Privatgarten mit Grill und Küche', 'Ein privater Garten mit Essbereich im Freien und Grill sowie eine voll ausgestattete Küche mit Geschirrspüler im Haus.'],
      ['Eine reaktionsschnelle Gastgeberin', 'Gäste loben die bequemen Betten, und viele schätzen die Gastgeberin Sandrine für ihre schnelle Reaktion und herzliche Aufnahme.'],
    ],
    description: `Genießen Sie das Haus Bell'O du Lac🏡, geschmackvoll renoviert und gut ausgestattet, nur 5 Gehminuten vom See entfernt! 🏝️
=> Wohnbereich im Erdgeschoss mit offener Küche, und Garten
=> 3 Schlafzimmer im Obergeschoss, eines mit Seeblick + großem Fernseher, und 2 mit Blick auf das Schloss von Aiguines 🏰

Die Pluspunkte: 🥇
✅ Ideale Lage, alles zu Fuß: See in 400 m, Restaurants, Geschäfte, Märkte und Feste!
✅ Klimaanlage im Wohnbereich
✅ Glasfaser-WLAN
✅ Garten
✅ Grill`,
    sections: [
      ['Le logement', `Außenbereich🍀🍃🌿:
100 m² großer, hübsch bepflanzter Garten🌳🌿 mit XL-Grill🥩🥓 und Gartentisch mit 6 Stühlen für wunderbare Momente im Freien ☀️☀️🪴

Innenbereich:🏡
=> Erdgeschoss: komplett renovierte offene Küche🍴 mit vernetztem Wandfernseher 📽️

=> Obergeschoss: Schlafzimmer 1 mit Queensize-Bett 160 und vernetztem Wandfernseher 📽️
Schlafzimmer 2 mit Doppelbett 140
Schlafzimmer 3 mit Doppelbett 140
Badezimmer mit Badewanne
Separates WC.`],
      ['Accès des voyageurs', 'Sicherer Schlüsselkasten für eine selbstständige An- und Abreise.'],
      ['Autres remarques', `⏩ Klimaanlage im Wohnbereich
⏩ Glasfaser für eine leistungsstarke Internetverbindung.
⏩ Bettwäsche und Handtücher inklusive 🏡: für noch mehr Komfort sind Ihre Betten bei Ankunft bereits bezogen!`],
    ],
    locationText: "Les Salles-sur-Verdon, Provence-Alpes-Côte d'Azur, Frankreich",
  },
  NL: {
    h1: 'Vakantiehuis voor 6 personen met tuin in Les Salles-sur-Verdon, 400 m van het meer van Sainte-Croix',
    highlights: [
      ['In Les Salles-sur-Verdon, aan het meer', 'Ongeveer 5 minuten lopen van het meer van Sainte-Croix, met restaurants en winkels op loopafstand.'],
      ['Eigen tuin met barbecue en keuken', 'Een eigen tuin met buiteneetruimte en barbecue, plus een volledig uitgeruste keuken met vaatwasser binnen.'],
      ['Een snel reagerende gastvrouw', 'Gasten noemen de comfortabele bedden, en velen prijzen gastvrouw Sandrine om haar snelle reacties en warme ontvangst.'],
    ],
    description: `Geniet van het huis Bell'O du Lac🏡, smaakvol gerenoveerd en goed uitgerust, op 5 minuten lopen van het meer! 🏝️
=> Woonruimte op de begane grond met open keuken, en tuin
=> 3 slaapkamers boven, waarvan één met uitzicht op het meer + grote tv, en 2 met zicht op het kasteel van Aiguines 🏰

De pluspunten: 🥇
✅ Ideale ligging, alles te voet: meer op 400 m, restaurants, winkels, markten en festiviteiten!
✅ Airconditioning in de woonruimte
✅ Wifi via glasvezel
✅ Tuin
✅ Barbecue`,
    sections: [
      ['Le logement', `Buiten🍀🍃🌿:
Mooi beplante tuin van 100 m²🌳🌿 met XL-barbecue🥩🥓 en tuintafel met 6 stoelen voor heerlijke momenten buiten ☀️☀️🪴

Binnen:🏡
=> Begane grond: volledig gerenoveerde open keuken🍴 met aangesloten tv aan de muur 📽️

=> Verdieping: slaapkamer 1 met queensize bed 160 en aangesloten tv aan de muur 📽️
Slaapkamer 2 met tweepersoonsbed 140
Slaapkamer 3 met tweepersoonsbed 140
Badkamer met bad
Apart toilet.`],
      ['Accès des voyageurs', 'Beveiligde sleutelkluis voor zelfstandige aankomst en vertrek.'],
      ['Autres remarques', `⏩ airconditioning in de woonruimte
⏩ glasvezel voor een snelle internetverbinding.
⏩ Beddengoed en handdoeken inbegrepen 🏡: voor extra comfort zijn uw bedden bij aankomst al opgemaakt!`],
    ],
    locationText: "Les Salles-sur-Verdon, Provence-Alpes-Côte d'Azur, Frankrijk",
  },
};

const salles8 = {
  EN: {
    h1: '8-guest holiday house with garden and view of Lake Sainte-Croix, Les Salles-sur-Verdon',
    highlights: [
      ['In Les Salles-sur-Verdon, by the lake', 'A few steps from Lake Sainte-Croix, with restaurants, shops and the beach all within walking distance of the house.'],
      ['Private garden with outdoor dining', 'A private garden and a patio with an outdoor dining area and a barbecue space for al fresco meals.'],
      ['Spotless, with an attentive host', 'Guests highlight how clean and well maintained the house is, and thank the host for her helpful local tips.'],
    ],
    description: `Enjoy the large Bell'O house🏡 with its many amenities, a 5-minute walk from the lake.
Lovely lake view from the large bedroom. 🏞️
View of the Château d'Aiguines from 2 bedrooms 🏰

2 kitchens, living room + TV
2 possible entrances
Garden
WIFI
possibility to close off an area to make an independent studio
3 bedrooms, one of them spacious with lake view and large TV
1 sofa bed 140 cm
2 bathrooms
2 WCs

On foot: lake, restaurants, shops, market, festivities...`,
    sections: [
      ['Le logement', `Recently renovated house with a nicely landscaped small garden, a table with garden chairs and a barbecue.
Lakeside, beach 5 minutes on foot, perfect for family holidays!!

Also equipped with air conditioning in the living areas and fibre for a high-performance internet network.

Ground floor (a few steps)
- living area with equipped kitchen and wall-mounted TV.
- separated by a door, a completely independent studio area with its own outside access, flexible as a living room or a 4th bedroom with sofa bed, wall-mounted TV, shower room and separate WC.

First floor:
- bedroom 1 with 140 bed
- bedroom 2 with 140 bed
- bedroom 3 with 160 bed, large wall-mounted TV, desk and balcony with lake view.
- bathroom with bathtub
- separate WC`],
      ['Accès des voyageurs', 'A small gate gives you access to the garden and the house 🏡'],
      ['Autres remarques', `🌅 terrace of the XL bedroom with lake view
🎥 3 connected TVs
🎥 XL wall-mounted TV in the large bedroom
🌿🌳 small garden with XL barbecue for great summer moments. Table and 6 garden chairs.
Another outdoor area with a round table and 2 chairs on the studio side.
Bed linen and towels provided: so you can enjoy your stay from the moment you arrive, the beds will already be made up 👍`],
    ],
    locationText: "Les Salles-sur-Verdon, Provence-Alpes-Côte d'Azur, France (exact address provided after booking)",
  },
  DE: {
    h1: 'Ferienhaus für 8 Personen mit Garten und Blick auf den See Sainte-Croix, Les Salles-sur-Verdon',
    highlights: [
      ['In Les Salles-sur-Verdon, am See', 'Nur wenige Schritte vom See Sainte-Croix entfernt; Restaurants, Geschäfte und der Strand sind vom Haus aus zu Fuß erreichbar.'],
      ['Privatgarten mit Essbereich im Freien', 'Ein privater Garten und eine Terrasse mit Essbereich im Freien und Grillplatz für Mahlzeiten unter freiem Himmel.'],
      ['Makellos, mit aufmerksamer Gastgeberin', 'Gäste heben hervor, wie sauber und gepflegt das Haus ist, und danken der Gastgeberin für ihre hilfreichen Tipps vor Ort.'],
    ],
    description: `Genießen Sie das große Haus Bell'O🏡 mit seiner vielfältigen Ausstattung, nur 5 Gehminuten vom See entfernt.
Sehr schöner Seeblick aus dem großen Schlafzimmer. 🏞️
Blick auf das Schloss von Aiguines aus 2 Schlafzimmern 🏰

2 Küchen, Wohnzimmer + Fernseher
2 mögliche Eingänge
Garten
WLAN
Möglichkeit, einen Bereich abzutrennen und als unabhängiges Studio zu nutzen
3 Schlafzimmer, davon eines geräumig mit Seeblick und großem Fernseher
1 Schlafsofa 140 cm
2 Badezimmer
2 WCs

Zu Fuß erreichbar: See, Restaurants, Geschäfte, Markt, Feste...`,
    sections: [
      ['Le logement', `Kürzlich renoviertes Haus mit einem hübsch bepflanzten kleinen Garten, einem Tisch mit Gartenstühlen und einem Grill.
Am See, Strand in 5 Minuten zu Fuß, perfekt für Familienurlaub!!

Außerdem mit Klimaanlage in den Wohnbereichen und Glasfaser für ein leistungsstarkes Internet ausgestattet.

Erdgeschoss (einige Stufen)
- Wohnbereich mit ausgestatteter Küche und Wandfernseher.
- Durch eine Tür abgetrennt befindet sich ein komplett unabhängiger Studiobereich mit eigenem Außenzugang, flexibel nutzbar als Wohnzimmer oder 4. Schlafzimmer mit Schlafsofa, Wandfernseher, Duschbad und separatem WC.

1. Stock:
- Schlafzimmer 1 mit Bett 140
- Schlafzimmer 2 mit Bett 140
- Schlafzimmer 3 mit Bett 160, großem Wandfernseher, Schreibtisch und Balkon mit Seeblick.
- Badezimmer mit Badewanne
- separates WC`],
      ['Accès des voyageurs', 'Ein kleines Törchen führt zum Garten und zum Haus 🏡'],
      ['Autres remarques', `🌅 Terrasse des XL-Schlafzimmers mit Seeblick
🎥 3 vernetzte Fernseher
🎥 XL-Wandfernseher im großen Schlafzimmer
🌿🌳 kleiner Garten mit XL-Grill für schöne Sommermomente. Tisch und 6 Gartenstühle.
Ein weiterer Außenbereich mit rundem Tisch und 2 Stühlen auf der Studioseite.
Bettwäsche und Handtücher inklusive: Damit Sie Ihren Aufenthalt sofort genießen können, sind die Betten bereits bezogen 👍`],
    ],
    locationText: "Les Salles-sur-Verdon, Provence-Alpes-Côte d'Azur, Frankreich (genaue Adresse nach der Buchung)",
  },
  NL: {
    h1: 'Vakantiehuis voor 8 personen met tuin en uitzicht op het meer van Sainte-Croix, Les Salles-sur-Verdon',
    highlights: [
      ['In Les Salles-sur-Verdon, aan het meer', 'Op een paar stappen van het meer van Sainte-Croix; restaurants, winkels en het strand zijn vanaf het huis te voet bereikbaar.'],
      ['Eigen tuin met buiteneetruimte', 'Een eigen tuin en patio met buiteneetruimte en barbecueplek voor maaltijden in de open lucht.'],
      ['Smetteloos, met een attente gastvrouw', 'Gasten benadrukken hoe schoon en goed onderhouden het huis is, en bedanken de gastvrouw voor haar nuttige lokale tips.'],
    ],
    description: `Geniet van het grote huis Bell'O🏡 met zijn vele voorzieningen, op 5 minuten lopen van het meer.
Prachtig uitzicht op het meer vanuit de grote slaapkamer. 🏞️
Zicht op het kasteel van Aiguines vanuit 2 slaapkamers 🏰

2 keukens, woonkamer + tv
2 mogelijke ingangen
Tuin
WIFI
mogelijkheid om een ruimte af te sluiten als zelfstandige studio
3 slaapkamers, waarvan één ruim met uitzicht op het meer en grote tv
1 slaapbank 140 cm
2 badkamers
2 toiletten

Te voet bereikbaar: meer, restaurants, winkels, markt, festiviteiten...`,
    sections: [
      ['Le logement', `Onlangs gerenoveerd huis met een mooi beplante kleine tuin, een tafel met tuinstoelen en een barbecue.
Aan het meer, strand op 5 minuten lopen, perfect voor een gezinsvakantie!!

Ook uitgerust met airconditioning in de woonruimtes en glasvezel voor een snel internetnetwerk.

Begane grond (enkele treden)
- woonruimte met uitgeruste keuken en tv aan de muur.
- Door een deur gescheiden vindt u een volledig onafhankelijke studioruimte met eigen toegang buiten, flexibel te gebruiken als woonkamer of 4e slaapkamer met slaapbank, tv aan de muur, doucheruimte en apart toilet.

Eerste verdieping:
- slaapkamer 1 met bed 140
- slaapkamer 2 met bed 140
- slaapkamer 3 met bed 160, grote tv aan de muur, bureau en balkon met uitzicht op het meer.
- badkamer met bad
- apart toilet`],
      ['Accès des voyageurs', 'Een klein hekje geeft toegang tot de tuin en het huis 🏡'],
      ['Autres remarques', `🌅 terras van de XL-slaapkamer met uitzicht op het meer
🎥 3 aangesloten tv's
🎥 XL-tv aan de muur in de grote slaapkamer
🌿🌳 kleine tuin met XL-barbecue voor mooie zomermomenten. Tafel en 6 tuinstoelen.
Nog een buitenruimte met ronde tafel en 2 stoelen aan de kant van de studio.
Beddengoed en handdoeken inbegrepen: zodat u meteen kunt genieten, zijn de bedden al opgemaakt 👍`],
    ],
    locationText: "Les Salles-sur-Verdon, Provence-Alpes-Côte d'Azur, Frankrijk (exact adres na de boeking)",
  },
};

const moustiers = {
  EN: {
    h1: 'Village house with panoramic terrace in the heart of Moustiers-Sainte-Marie, sleeps 4',
    highlights: [
      ['In the heart of Moustiers-Sainte-Marie', 'Shops, restaurants and a market are just steps away in this charming perched Provençal village.'],
      ['Private terrace with village view', 'A private terrace with a view of the village, plus a fully equipped kitchen with an espresso machine and a dishwasher.'],
      ['An exceptional host', "Guests highlight Sandrine's kindness, her quick replies and her helpful local recommendations."],
    ],
    description: `💫🌄 Stay in the heart of Moustiers-Sainte-Marie in an entirely private village house blending old-world charm and contemporary touches. Enjoy an intimate terrace with a panoramic view over the valley, a glimpse of the lake and the cliffs, as well as Moustiers' emblematic star.

🏠 Although in the centre, there is a 15-minute stop right in front of the house to unload your luggage calmly – a rare and much appreciated convenience in Moustiers.
Fibre / air conditioning`,
    sections: [
      ['Le logement', `🏠 Layout & charm

The recently renovated village house spans 3 floors: 72 m² (Carrez law), about 90 m² in total.
💥 High-performance WIFI thanks to fibre 💥
💥 AIR CONDITIONING on the 3rd floor. 💥
The bedrooms on the 2nd floor stay naturally COOL in summer heat and are fitted with fans.

1st floor
➡️ private laundry room (not accessible to guests)

2nd floor:
➡️ 2 bedrooms, the 2nd opening directly off the 1st (en enfilade).
➡️ bathroom and WC, keeping the old-world charm with beams and typical volumes

3rd floor:
➡️ 🛋️ A spacious, light-filled living room with large windows, with AIR CONDITIONING.
140 cm sofa bed in the living room, offering flexibility in sleeping arrangements (either the 2nd bedroom or the living room): to use it, simply remove the linen from the second bed and unfold the sofa.
Connected wall-mounted TV
➡️ 🌅 An intimate terrace with a splendid view over the valley, the cliffs, a glimpse of Lake Sainte-Croix and the emblematic star.🌟
➡️ 🍴 And finally a new, modern kitchen under a sloping attic ceiling, fully equipped.

🚨 Maximum capacity of 4 people 🚨
Intimate terrace in the very centre, away from prying eyes.
🚨 This is a typical Moustiers house with a number of staircases, which may not suit people with reduced mobility or small children.

💥 A rare balance: being in the heart of the village while enjoying privacy and exceptional panoramas

📍 Everything on foot 🩴🩴
▶️ Restaurants
▶️ shops,
▶️ Provençal market, night market
▶️ hiking trailheads within a few steps.
An ideal base to discover the Gorges du Verdon, its many hikes and Lake Sainte-Croix.
🚘🚘 A 15-minute stop is located in front of the house, making it easy to drop off luggage before parking in a nearby car park ➡️💥 highly sought after in the very centre.`],
      ['Accès des voyageurs', 'Located in the very centre, close to restaurants and amenities.'],
      ['À noter', `The house is spread over several levels and has many stairs.
The house is not suitable for people with reduced mobility.`],
      ['Autres remarques', `🏡 The house is a charming 3-storey home, tastefully decorated to offer modern comfort while keeping its old-world charm.
For extra comfort: bed linen is provided for the 2 beds in the 2 bedrooms (1 bed 160 + 1 bed 140). Your beds will already be made up so you can enjoy your stay from the moment you arrive 😊.
Independent arrival with a secure key box.
📢 Rare in Moustiers: one of the best locations in the village, with a drop-off stop in front of the house 🚨`],
    ],
    locationText: "Moustiers-Sainte-Marie, Provence-Alpes-Côte d'Azur, France",
  },
  DE: {
    h1: 'Dorfhaus mit Panoramaterrasse im Herzen von Moustiers-Sainte-Marie, 4 Personen',
    highlights: [
      ['Im Herzen von Moustiers-Sainte-Marie', 'Geschäfte, Restaurants und ein Markt liegen nur wenige Schritte entfernt in diesem charmanten provenzalischen Bergdorf.'],
      ['Private Terrasse mit Dorfblick', 'Eine private Terrasse mit Blick auf das Dorf sowie eine voll ausgestattete Küche mit Espressomaschine und Geschirrspüler.'],
      ['Eine außergewöhnliche Gastgeberin', 'Gäste heben Sandrines Freundlichkeit, ihre schnellen Antworten und ihre hilfreichen Tipps vor Ort hervor.'],
    ],
    description: `💫🌄 Wohnen Sie im Herzen von Moustiers-Sainte-Marie in einem komplett privaten Dorfhaus, das den Charme alter Zeiten mit modernen Akzenten verbindet. Genießen Sie eine intime Terrasse mit Panoramablick über das Tal, mit Blick auf den See und die Felsen sowie auf den berühmten Stern von Moustiers.

🏠 Obwohl zentral gelegen, gibt es direkt vor dem Haus eine 15-Minuten-Haltezone, um in Ruhe Ihr Gepäck auszuladen – ein seltener und sehr geschätzter Komfort in Moustiers.
Glasfaser / Klimaanlage`,
    sections: [
      ['Le logement', `🏠 Aufteilung & Charme

Das kürzlich renovierte Dorfhaus erstreckt sich über 3 Etagen: 72 m² (Carrez-Gesetz), insgesamt etwa 90 m².
💥 Leistungsstarkes WLAN dank Glasfaser 💥
💥 KLIMAANLAGE im 3. Stock. 💥
Die Schlafzimmer im 2. Stock bleiben bei sommerlicher Hitze von Natur aus KÜHL und sind mit Ventilatoren ausgestattet.

1. Stock
➡️ private Waschküche (für Gäste nicht zugänglich)

2. Stock:
➡️ 2 Schlafzimmer, das 2. liegt direkt hinter dem 1. (Durchgangszimmer).
➡️ Badezimmer und WC mit dem Charme alter Zeiten, mit Balken und typischen Raumvolumen

3. Stock:
➡️ 🛋️ Ein geräumiger, lichtdurchfluteter Wohnraum mit großen Fenstern und KLIMAANLAGE.
Schlafsofa 140 cm im Wohnzimmer, das flexible Schlafmöglichkeiten bietet (entweder 2. Schlafzimmer oder Wohnzimmer): Dazu einfach die Bettwäsche des zweiten Schlafplatzes entfernen und das Sofa ausklappen.
Vernetzter Wandfernseher
➡️ 🌅 Eine intime Terrasse mit herrlichem Blick über das Tal, die Felsen, mit Blick auf den See Sainte-Croix und den berühmten Stern.🌟
➡️ 🍴 Und schließlich eine neue, moderne, voll ausgestattete Küche unter einer Dachschräge.

🚨 Maximale Belegung: 4 Personen 🚨
Intime Terrasse mitten im Zentrum, vor neugierigen Blicken geschützt.
🚨 Es handelt sich um ein typisches Haus von Moustiers mit mehreren Treppen, was für Personen mit eingeschränkter Mobilität und Kleinkinder nicht geeignet sein kann.

💥 Eine seltene Balance: im Herzen des Dorfes sein und dabei Privatsphäre und außergewöhnliche Panoramen genießen

📍 Alles zu Fuß 🩴🩴
▶️ Restaurants
▶️ Geschäfte,
▶️ provenzalischer Markt, Nachtmarkt
▶️ Ausgangspunkte für Wanderungen in wenigen Schritten.
Ideal, um die Verdon-Schlucht, ihre zahlreichen Wanderungen und den See Sainte-Croix zu entdecken.
🚘🚘 Eine Haltezone (15 Minuten) befindet sich vor dem Haus, so lässt sich das Gepäck bequem abladen, bevor Sie auf einem nahegelegenen Parkplatz parken ➡️💥 im Zentrum sehr gefragt.`],
      ['Accès des voyageurs', 'Im absoluten Zentrum gelegen, nahe Restaurants und Einrichtungen.'],
      ['À noter', `Das Haus erstreckt sich über mehrere Ebenen und hat viele Treppen.
Das Haus ist für Personen mit eingeschränkter Mobilität nicht geeignet.`],
      ['Autres remarques', `🏡 Das Haus ist ein charmantes 3-stöckiges Haus, geschmackvoll eingerichtet, um modernen Komfort zu bieten und dabei den Charme alter Zeiten zu bewahren.
Für noch mehr Komfort: Bettwäsche ist für die 2 Betten der 2 Schlafzimmer inklusive (1 Bett 160 + 1 Bett 140). Ihre Betten sind bereits bezogen, damit Sie Ihren Aufenthalt gleich nach der Ankunft genießen können 😊.
Selbstständige Anreise dank sicherem Schlüsselkasten.
📢 Selten in Moustiers: eine der besten Lagen im Dorf und dennoch eine Haltezone vor dem Haus 🚨`],
    ],
    locationText: "Moustiers-Sainte-Marie, Provence-Alpes-Côte d'Azur, Frankreich",
  },
  NL: {
    h1: 'Dorpshuis met panoramaterras in het hart van Moustiers-Sainte-Marie, 4 personen',
    highlights: [
      ['In het hart van Moustiers-Sainte-Marie', 'Winkels, restaurants en een markt liggen op een paar stappen in dit charmante Provençaalse bergdorp.'],
      ['Eigen terras met uitzicht op het dorp', 'Een eigen terras met uitzicht op het dorp, plus een volledig uitgeruste keuken met espressomachine en vaatwasser.'],
      ['Een uitzonderlijke gastvrouw', 'Gasten benadrukken de vriendelijkheid van Sandrine, haar snelle antwoorden en haar nuttige lokale aanbevelingen.'],
    ],
    description: `💫🌄 Verblijf in het hart van Moustiers-Sainte-Marie in een volledig privé dorpshuis dat oude charme combineert met eigentijdse accenten. Geniet van een intiem terras met panoramisch uitzicht over de vallei, met zicht op het meer en de kliffen, en de bekende ster van Moustiers.

🏠 Hoewel centraal gelegen, is er vlak voor het huis een stopplaats van 15 minuten om uw bagage rustig uit te laden – een zeldzaam en zeer gewaardeerd gemak in Moustiers.
Glasvezel / airconditioning`,
    sections: [
      ['Le logement', `🏠 Indeling & charme

Het onlangs gerenoveerde dorpshuis beslaat 3 verdiepingen: 72 m² (wet Carrez), in totaal ongeveer 90 m².
💥 Snelle WIFI dankzij glasvezel 💥
💥 AIRCONDITIONING op de 3e verdieping. 💥
De slaapkamers op de 2e verdieping blijven van nature KOEL bij zomerse hitte en zijn voorzien van ventilatoren.

1e verdieping
➡️ eigen wasruimte (niet toegankelijk voor gasten)

2e verdieping:
➡️ 2 slaapkamers, waarvan de 2e direct achter de 1e ligt (en suite).
➡️ badkamer en toilet met behoud van de oude charme, met balken en typische ruimtes

3e verdieping:
➡️ 🛋️ Een ruime, lichte woonkamer met grote ramen, met AIRCONDITIONING.
Slaapbank van 140 cm in de woonkamer, voor flexibele slaapindeling (de 2e slaapkamer of de woonkamer): haal daarvoor gewoon het beddengoed van het tweede slaapplaats af en klap de bank uit.
Aangesloten tv aan de muur
➡️ 🌅 Een intiem terras met prachtig uitzicht over de vallei, de kliffen, met zicht op het meer van Sainte-Croix en de bekende ster.🌟
➡️ 🍴 En tot slot een nieuwe, moderne, volledig uitgeruste keuken onder een schuin plafond.

🚨 Maximale capaciteit: 4 personen 🚨
Intiem terras midden in het centrum, beschut tegen nieuwsgierige blikken.
🚨 Dit is een typisch huis van Moustiers met een aantal trappen, wat mogelijk niet geschikt is voor personen met beperkte mobiliteit en jonge kinderen.

💥 Een zeldzaam evenwicht: in het hart van het dorp zijn en toch genieten van privacy en uitzonderlijke panorama's

📍 Alles te voet 🩴🩴
▶️ Restaurants
▶️ winkels,
▶️ Provençaalse markt, avondmarkt
▶️ startpunten van wandelingen op enkele stappen.
Ideaal vertrekpunt om de Gorges du Verdon, de vele wandelingen en het meer van Sainte-Croix te ontdekken.
🚘🚘 Een stopplaats (15 minuten) bevindt zich voor het huis, zodat u uw bagage gemakkelijk kunt afladen voordat u in een nabijgelegen parking parkeert ➡️💥 zeer gezocht in het centrum.`],
      ['Accès des voyageurs', 'Gelegen in het hyper-centrum, vlak bij restaurants en voorzieningen.'],
      ['À noter', `Het huis is verdeeld over meerdere niveaus en heeft veel trappen.
Het huis is niet geschikt voor personen met beperkte mobiliteit.`],
      ['Autres remarques', `🏡 Het huis is een charmant huis met 3 verdiepingen, smaakvol ingericht voor modern comfort met behoud van de oude charme.
Voor extra comfort: beddengoed is inbegrepen voor de 2 bedden in de 2 slaapkamers (1 bed 160 + 1 bed 140). Uw bedden zijn al opgemaakt, zodat u meteen na aankomst van uw verblijf kunt genieten 😊.
Zelfstandige aankomst dankzij een beveiligde sleutelkluis.
📢 Zeldzaam in Moustiers: een van de beste locaties in het dorp, met toch een stopplaats voor het huis 🚨`],
    ],
    locationText: "Moustiers-Sainte-Marie, Provence-Alpes-Côte d'Azur, Frankrijk",
  },
};

// Textes de la page ('Points forts' des fiches Airbnb, mis en avant) : les highlights
// sont fournis ci-dessus ; la description d'ouverture est dans `description`.
module.exports = { dict, salles6, salles8, moustiers };
