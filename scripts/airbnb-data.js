/* Contenu des annonces Airbnb (source : pages publiques Airbnb, relevé du 24/10/2026).
   Utilisé par logement-pages.js. Pour mettre à jour : modifier ce fichier puis
   `node scripts/seo-build.js`. Photos : CDN Airbnb (a0.muscache.com). */
const PH = (room, files) => files.trim().split(/\s+/).map(f => `https://a0.muscache.com/im/pictures/hosting/Hosting-${room}/original/${f}`);

const _mod = {
  salles6: {
    airbnbTitle: 'Maison 6 Pers vue imprenable sur le lac et jardin',
    stats: { guests: 6, bedrooms: 3, beds: 3, baths: 1 },
    rating: 4.79, reviews: 19,
    ratingCats: [['Propreté', 4.8], ['Précision', 4.7], ['Arrivée', 5.0], ['Communication', 5.0], ['Emplacement', 4.9], ['Qualité-prix', 4.5]],
    highlights: [
      ['À Les Salles-sur-Verdon, au bord du lac', "À environ 5 minutes à pied du lac de Sainte-Croix, avec des restaurants et des commerces accessibles à pied."],
      ['Jardin privé avec barbecue et cuisine', "Un jardin privé avec un coin repas extérieur et un barbecue, ainsi qu'une cuisine entièrement équipée avec lave-vaisselle à l'intérieur."],
      ['Une hôte réactive', "Les voyageurs soulignent les lits confortables, et beaucoup louent l'hôte, Sandrine, pour sa réactivité et son accueil chaleureux."],
    ],
    description: `Profitez de la maison Bell'O du Lac🏡 rénovée avec goût et de ses nombreux équipements situé au bord du lac a 5 minutes à pieds! 🏝️
=> Espace de vie au RDC avec cuisine ouverte, et jardin
=> 3 chambres à l'étage dont une avec vue sur le lac + grande TV et 2 avec aperçu du Chateau d'Aiguines 🏰

Les + : 🥇
✅ Idéalement situé, accès à pieds: lac à 400m, restaurants, commerces, marchés et festivités !
✅ Climatisation dans la pièce de vie
✅ WIFI fibre
✅ Jardin
✅ Barbecue`,
    sections: [
      ['Le logement', `Extérieur🍀🍃🌿 :
Jardin de 100m2 joliment arboré 🌳🌿🌿avec barbecue xl🥩🥓 et table de jardin avec 6 chaises pour profiter de merveilleux moments extérieurs ☀️☀️🪴

Intérieur :🏡
=> RDC : Cuisine ouverte🍴 entièrement rénovée avec tv murale connectée 📽️

=> Etage : Chambre 1 avec lit Queen-size 160 et TV murale 📽️ connectée
Chambre 2 avec lit double 140
Chambre 3 avec lit double 140
Salle de bain avec baignoire
WC indépendants.`],
      ['Accès des voyageurs', 'Boite a clé sécurisée pour une arrivée et un départ indépendant.'],
      ['Autres remarques', `⏩climatisation dans la pièce de vie
⏩fibre pour une connexion internet performante.
⏩Linge de lit et de toilette fourni 🏡:pour toujours plus de confort vos lits seront prêts et dressés a votre arrivée !`],
    ],
    registration: 'LGV1204HTG',
    bedrooms: [
      ['Chambre 1', '1 lit queen size', '3a78d40e-1993-4d76-b237-aff4a9b28381.jpeg'],
      ['Chambre 2', '1 lit double', '3ea80995-990c-439c-a762-3b832fdb3f28.jpeg'],
      ['Chambre 3', '1 lit double', '2bf89784-696b-4cea-84c7-c920bed2429e.jpeg'],
    ],
    amenities: [
      ['Salle de bain', ['Baignoire', 'Sèche-cheveux', 'Produits de nettoyage', 'Eau chaude', 'Gel douche']],
      ['Chambre et linge', ['Lave-linge', 'Cintres', 'Linge de lit', 'Étendoir à linge', 'Espace de rangement pour les vêtements : placard']],
      ['Divertissement', ['Télévision']],
      ['Chauffage et climatisation', ['Climatisation', 'Ventilateurs portables', 'Chauffage : système split sans évacuation']],
      ['Internet et bureau', ['Wifi', 'Espace de travail dédié']],
      ['Cuisine et salle à manger', ['Cuisine', 'Réfrigérateur', 'Four à micro-ondes', 'Tout le nécessaire pour cuisiner', 'Vaisselle et couverts', 'Congélateur', 'Lave-vaisselle', 'Cuisinière électrique', 'Four', 'Cafetière : machine à expresso', 'Plaques de cuisson', 'Table à manger']],
      ['Emplacement', ['Accès à un lac', 'Entrée privée']],
      ['Extérieur', ['Patio ou balcon privé', 'Arrière-cour privée', "Mobilier d'extérieur", 'Espace repas en plein air', 'Barbecue']],
      ['Parking et installations', ['Stationnement gratuit sur place']],
      ['Services', ['Arrivée autonome', 'Boîte à clé sécurisée']],
    ],
    notIncluded: ['Caméras de surveillance extérieures', 'Sèche-linge', 'Produits de base', 'Détecteur de fumée', 'Détecteur de monoxyde de carbone'],
    locationText: "Les Salles-sur-Verdon, Provence-Alpes-Côte d'Azur, France",
    photos: PH('1401227916063751925', `3a3b0933-f66d-4bd4-9626-b6d6f75d3bc5.jpeg 15556561-124e-4b54-8940-738be2317184.png 7bc5ad99-33b1-4007-83cb-c9654c3f22a0.png 507db8f1-dbab-4d22-ae39-ded0d66775fd.png c9e76e66-7c66-4d70-8b0c-4e2c8499a6eb.png 95d11642-d25b-4613-aef6-a768b7c1859a.png ca1e7eb7-6489-4d57-84df-c2a17f3c5d92.jpeg f21628c4-c308-450c-b78b-e17973b54b72.jpeg 0af92975-025d-4198-821f-afc97a119901.jpeg 15a5d261-f322-4f32-88b1-efe0440218c6.jpeg af7543d3-9b09-4163-b523-9bc97d183463.jpeg a77e78ea-a0d1-4a7b-8f7f-65b4d1e0b4f7.jpeg 68124541-12fb-4090-a59a-f572de93d79d.jpeg 3a78d40e-1993-4d76-b237-aff4a9b28381.jpeg 6e5817d1-70fc-4ba3-aa57-6efd492897ef.jpeg 0ab7cca1-38f2-42ea-b8e9-e7bb47ca7fd4.jpeg af14973b-8b15-4e06-9199-441ec829a0fe.png 27648eae-da52-4ccb-849c-1207f06f7e65.jpeg 3ea80995-990c-439c-a762-3b832fdb3f28.jpeg 476e4b94-1acc-4cb8-be48-856646783468.jpeg b7822e64-a977-43f8-92dd-933378ecc124.jpeg 2bf89784-696b-4cea-84c7-c920bed2429e.jpeg e38a6cf9-37e3-429e-9bfe-0d4a6a7f5219.jpeg 105e25fa-63b1-41c0-8478-2869502744c8.jpeg 98591993-2810-42ee-97b6-0741bb750652.jpeg 1f07d79b-c144-4cd9-ad8b-2fad5a4ce2ab.jpeg 9dd225b6-6fb7-4226-9da4-0de1e09769b3.jpeg e27f83ec-e8dc-4bd2-9acc-37f0d78c9a2a.jpeg c2c5562a-fe64-465e-be7c-0942b91fcd51.jpeg 43ba4685-1b2b-4a52-9414-e0a09e6e0eec.jpeg b08e4f70-1ce5-491f-87a0-93d44677a7dc.jpeg e15b4aa3-c027-4d42-9466-c68420ea2b39.jpeg b98c42fc-e810-41c8-9b89-878495bcd806.jpeg c83f9386-88f6-4ebb-8fd1-bb38205247e9.jpeg`),
  },

  salles8: {
    airbnbTitle: 'Maison 8 pers avec jardin /jolie vue lac a pied',
    stats: { guests: 8, bedrooms: 3, beds: 4, baths: 2 },
    rating: 4.9, reviews: 10, guestFavorite: true,
    ratingCats: [['Propreté', 5.0], ['Précision', 4.9], ['Arrivée', 5.0], ['Communication', 5.0], ['Emplacement', 5.0], ['Qualité-prix', 4.5]],
    highlights: [
      ['À Les Salles-sur-Verdon, au bord du lac', "À quelques pas du lac de Sainte-Croix, avec des restaurants, des commerces et la plage tous accessibles à pied depuis la maison."],
      ['Jardin privé avec salle à manger extérieure', "Un jardin privé et un patio avec salle à manger extérieure et un espace barbecue pour les repas en plein air."],
      ['Impeccable, avec un hôte attentionné', "Les voyageurs soulignent à quel point la maison est propre et bien entretenue, et félicitent l'hôte pour ses conseils locaux utiles."],
    ],
    description: `Profitez de la Grande maison Bell'O🏡 et ses nombreux équipements située au bord du lac a 5 minutes à pieds.
Très jolie vue lac de la grande chambre. 🏞️
Aperçu du chateau d'Aiguines depuis 2 chambres 🏰

2 cuisines, salon + TV
2 entrées possibles
Jardin
WIFI
possibilité de fermer un espace pour être un studio indépendant
3 chambres dont l'une spacieuse avec vue sur le lac et grande TV
1 canapé lit convertible 140cm
2 SDB
2 WC

Accés à pieds : lac, restaurants, commerces, marché, festivités...`,
    sections: [
      ['Le logement', `Maison récemment rénovée constitué d'un jardinet joliment arboré ainsi qu'une table avec chaises de jardin et barbecue.
Bord de lac,plage a pied a 5 minutes parfait pour des vacances en famille !!

Également équipé de climatisation dans les espaces de vie et de la fibre pour un réseau internet performant.

Au RDC (quelques marches)
- espace de vie avec une cuisine équipée et une tv murale.
- séparé par une porte vous trouverez un espace studio complètement indépendant avec un autre accès extérieur, modulable pouvant servir de salon ou de 4ème chambre avec canapé-lit, tv murale, salle d'eau et WC indépendants.

Au 1 er étage :
- chambre 1 avec lit 140
- chambre 2 avec lit 140
- chambre 3 avec lit 160, grande TV murale, bureau et balcon avec vue sur le lac.
- salle de bain avec baignoire
- WC indépendants`],
      ['Accès des voyageurs', 'Un petit portillon vous donne accès au jardin et à la maison 🏡'],
      ['Autres remarques', `🌅 terrasse de la chambre xl vue lac
🎥3 tv connectées
🎥tv murale xl dans la grande chambre
🌿🌳 jardinet avec barbecue xl pour profiter de bons moments estivaux. table et 6 chaises de jardin.
Un autre espace extérieur avec une table ronde et 2 chaises côté studio.
Linge de lit et de toilette fourni :pour pouvoir profiter dès votre arrivée les lits seront déjà dressés 👍`],
    ],
    registration: 'LGV1203HTF',
    bedrooms: [
      ['Chambre 1', '1 lit queen size', '335f4c4f-7a7c-4deb-8e81-9ba040b10872.jpeg'],
      ['Chambre 2', '1 lit double', 'b9badbba-29d4-47f6-8859-8e56f407c516.jpeg'],
      ['Chambre 3', '1 lit double', '2a8d26a3-ee5d-4267-9b2c-490a7bbff9ce.jpeg'],
      ['Salon', '1 canapé convertible', 'b18c73fa-9c52-46e6-8ef3-a5490c0ce77a.jpeg'],
    ],
    amenities: [
      ['Salle de bain', ['Baignoire', 'Sèche-cheveux', 'Produits de nettoyage', 'Shampoing', 'Savon pour le corps', 'Eau chaude', 'Gel douche']],
      ['Chambre et linge', ['Lave-linge (gratuit)', 'Produits de base', 'Cintres', 'Linge de lit', 'Étendoir à linge', 'Espace de rangement pour les vêtements']],
      ['Divertissement', ['Télévision']],
      ['Chauffage et climatisation', ['Climatisation', 'Chauffage']],
      ['Internet et bureau', ['Wifi', 'Espace de travail dédié', 'Routeur wifi portable']],
      ['Cuisine et salle à manger', ['Cuisine', 'Four à micro-ondes', 'Tout le nécessaire pour cuisiner', 'Vaisselle et couverts', 'Mini réfrigérateur', 'Congélateur', 'Lave-vaisselle', 'Cuisinière à induction', 'Four', 'Bouilloire électrique', 'Cafetière', 'Verres à vin', 'Plaques de cuisson', 'Ustensiles de barbecue', 'Table à manger', 'Café']],
      ['Emplacement', ['Accès partagé à la plage', 'Accès à un lac', 'Entrée privée']],
      ['Extérieur', ['Patio ou balcon privé', 'Arrière-cour privée', "Mobilier d'extérieur", 'Espace repas en plein air', 'Barbecue']],
      ['Parking et installations', ['Stationnement gratuit sur place', 'Stationnement gratuit dans la rue']],
      ['Services', ['Arrivée autonome', 'Boîte à clé sécurisée']],
    ],
    notIncluded: ['Caméras de surveillance extérieures', 'Sèche-linge', 'Détecteur de fumée', 'Détecteur de monoxyde de carbone'],
    locationText: "Les Salles-sur-Verdon, Provence-Alpes-Côte d'Azur, France (adresse exacte communiquée après la réservation)",
    photos: PH('1396288753176684832', `08e6199b-e1ae-4170-897d-eb95256f45db.png 37c231a7-be7c-4636-86e7-c72faa345f03.png 78e119a2-76a6-40fc-b951-cc3ef8ed91ad.png caadebf9-a4a2-49dd-87b0-f7569d3033e2.jpeg ee737288-93fa-45ae-9b6b-5e0f4065f59c.jpeg 0bfbcb23-531f-4226-b6c3-6b0cc856e04f.jpeg b3fa2e1a-825e-487b-8748-bd36a72f5b14.jpeg 477a10b4-116f-420d-a580-d82f07548e86.jpeg 335f4c4f-7a7c-4deb-8e81-9ba040b10872.jpeg b9badbba-29d4-47f6-8859-8e56f407c516.jpeg 2a8d26a3-ee5d-4267-9b2c-490a7bbff9ce.jpeg b18c73fa-9c52-46e6-8ef3-a5490c0ce77a.jpeg 7aaed7d9-3e34-429b-923e-2a3ec52e5ce1.jpeg 1db50b66-19cd-4e36-957d-bd0e48b6090f.jpeg 2a29b40a-514f-4773-8b69-5b1715e2662e.jpeg f4e775ab-286b-4e9c-a986-5eaac8a22cef.png 68f57ef4-2906-49bd-862f-47eb2032a489.jpeg 0b336d42-5e06-442b-aa93-fca8cd6b200f.jpeg f9c02b56-fe09-4be5-a576-9a4e2258d3b2.jpeg 106cb944-21c5-4998-8eea-6c725a1e96db.jpeg b20731d1-01d6-4b92-b011-129b0ed61295.jpeg 12176a33-1e12-4c1e-8cf3-240b8ce62562.jpeg c81fcbf7-bafa-49c4-8084-d8ca65cbe6bd.jpeg 66059aba-48aa-4a8e-bff4-44e4b53b81c3.jpeg 85ca5711-9b48-4e13-8fe7-b9f81bd66b88.png 7fd0620f-94f6-43e3-a1d6-7f33d062a1ac.jpeg b24b77b0-8c8c-4657-92fd-0cc70d2b11b5.jpeg c1b4dd46-c45b-480d-9786-4af633cef186.jpeg 65f8d88c-d478-4c18-a26c-1f1870b29034.jpeg 7dce3789-a669-4508-a841-023feecf9832.jpeg 85c6dbe9-c4ee-4e5b-ada8-1dbd1ae82d8f.jpeg 91d7dd90-79ef-4a96-9ade-b49e6ae623bc.jpeg e378d261-4003-4701-9b03-639ad51d2418.jpeg e6232909-69ec-444e-bc5b-81d41c3dd1e3.jpeg 3658bb08-8c7a-46a5-bef0-63147d99db95.jpeg 4142e923-1a96-4ca2-83a4-15616cb5ed6b.jpeg 6cb62b9d-560a-41dd-8026-80f561440289.jpeg 200e400e-0d9a-44b6-a3a8-822883882ec9.png b3f1cdbd-c974-4c7d-84ee-c89d26f45330.png c6833ff8-cb54-42c5-a490-d85bdb88dbb3.jpeg f7fa656d-9da3-4169-9ac0-54fed258d015.jpeg 05d3e401-002a-4629-98a1-deb1230478b6.png 1407ce69-67a9-4eef-b6f1-2f9af63cb06b.png 8bd5c0d8-5c7e-4d5e-ac15-112b4a159b65.png d0951008-56bd-4d0a-a689-379f9534e903.png 24593f26-6f07-4833-83b3-1551fe85f09e.png 81d0c2a4-dbb5-4bea-9243-3454ebdb0376.jpeg 18272717-d8b3-4467-a24d-706305c5ea7d.jpeg 7596ba19-7375-41b7-a64b-2422149ab568.jpeg 63c479f3-a738-4a0c-b0c1-d8d658c55c69.jpeg d1c47d89-9118-4d92-a65a-ac3e09e9b56b.jpeg 9bb59f2a-e1ba-4742-881d-dcf84e3142a4.jpeg 5ec81ede-bb9d-4c61-ae2e-0e427e771f46.jpeg 15b705c7-7f36-4f07-90cd-ad6f25a04b4c.png`),
  },

  moustiers: {
    airbnbTitle: 'Vue imprenable /Terrasse au centre de Moustiers',
    stats: { guests: 4, bedrooms: 2, beds: 3, baths: 1 },
    rating: 4.95, reviews: 19,
    ratingCats: [['Propreté', 4.8], ['Précision', 4.8], ['Arrivée', 5.0], ['Communication', 4.9], ['Emplacement', 4.9], ['Qualité-prix', 4.8]],
    highlights: [
      ['Au cœur de Moustiers-Sainte-Marie', "Des commerces, des restaurants et un marché se trouvent à quelques pas dans ce charmant village provençal perché."],
      ['Terrasse privée avec vue sur le village', "Une terrasse privée avec vue sur le village, ainsi qu'une cuisine entièrement équipée avec machine à expresso et lave-vaisselle."],
      ['Une hôte exceptionnelle', "Les voyageurs soulignent la gentillesse de Sandrine, ses réponses rapides et ses recommandations locales utiles."],
    ],
    description: `💫🌄Séjournez au cœur de Moustiers-Sainte-Marie dans une maison de village entièrement privatisée mêlant charme de l’ancien et touches contemporaines. Profitez d’une terrasse intime avec vue panoramique sur la vallée, aperçu du lac et des falaises , ainsi que l’étoile emblématique de Moustiers.

🏠 Tout en étant au centre, il y a un arrêt 15 minutes devant la maison pour décharger vos bagages sereinement – un confort rare et très apprécié à Moustiers.
Fibre/climatisation`,
    sections: [
      ['Le logement', `🏠 Agencement & charme

La maison de village récemment rénovée se déploie sur 3 étages : maison de 72 m² loi Carrez (environ 90 m² au total).
💥WIFI performante grâce à la fibre💥
💥CLIMATISATION au 3ème étage.💥
Les chambres se situant au 2ème étage sont naturellement FRAÎCHES lors des chaleurs estivales et équipées de ventilateurs.

1er étage
➡️ buanderie privée (non accessible aux voyageurs)

2ᵉ étage :
➡️ 2 chambres dont la 2ème en ENFILADE de la 1ère.
➡️ salle de bain et WC, conservant le charme ancien avec poutres et volumes typiques

3ᵉ étage :
➡️🛋️ Un salon spacieux baigné de lumière avec ses baies vitrées équipé de la CLIMATISATION.
Canapé-lit 140 cm dans le salon, offrant flexibilité dans l’organisation des couchages (soit la 2ème chambre soit le salon) : pour en profiter, il suffit de retirer le linge du second couchage et de déployer le canapé.
Tv murale connectée
➡️🌅 Une terrasse intime avec une splendide vue sur la vallée, les falaises, aperçu du lac de Sainte-Croix et l'étoile emblématique.🌟
➡️🍴 Et enfin une cuisine neuve et moderne sous plafond mansardé (plafond en pente) entièrement équipée.

🚨 Capacité maximale de 4 personnes 🚨
Terrasse intime en plein centre, à l’abri des regards.
🚨 Il s'agit d'une maison typique de Moustiers qui présente naturellement un certain nombre d'escaliers (qui peut ne pas convenir aux personnes à mobilité réduite et enfants en bas âge).

💥 Un équilibre rare : être au cœur du village tout en profitant d’intimité et de panoramas exceptionnels

📍 Tout à pied🩴🩴
▶️ Restaurants
▶️ commerces,
▶️ marché provençal, nocturne
▶️ départs de randonnées accessibles en quelques pas.
Point de départ idéal pour découvrir les Gorges du Verdon, ses nombreuses randonnées et le Lac de Sainte-Croix.
🚘🚘 Un arrêt (15 minutes) se situe devant la maison offrant un grand confort et permettant de déposer les bagages avant de se garer dans un parking environnant ➡️💥 très recherché en hyper centre.`],
      ['Accès des voyageurs', 'Située en hyper centre proche restaurants et commodités.'],
      ['À noter', `La maison est répartie sur plusieurs niveaux et comporte de nombreux escaliers.
La maison ne convient pas aux personnes à mobilité réduite.`],
      ['Autres remarques', `🏡 La maison est une maison de 3 étages pleine de charme, décorée avec goût pour offrir le confort moderne tout en gardant le charme de l'ancien.
Pour toujours plus de confort : le linge de lit est fourni pour les 2 lits des 2 chambres (1 lit 160 + 1 lit 140). Vos lits seront déjà dressés pour pouvoir profiter de votre séjour dès votre arrivée 😊.
Procédure d'arrivée en toute autonomie grâce à une boîte à clés sécurisée.
📢 Rare à Moustiers : une des meilleures situations du village tout en ayant un dépose-minute devant la maison 🚨`],
    ],
    registration: 'POG1554HTO',
    bedrooms: [
      ['Chambre 1', '1 lit queen size', '059f89b3-3f54-477d-ae77-7c39d441e43b.jpeg', 'Grande chambre de 16 m² avec lit 160 cm'],
      ['Chambre 2', '1 lit double', '8e9ef54e-26ca-40eb-8756-ec85ece622aa.jpeg', 'Chambre avec lit 140 cm'],
      ['Salon', '1 canapé convertible', '4d66de8b-0ec7-4437-83dc-70c927001089.png', 'Vaste salon baigné de lumière'],
    ],
    amenities: [
      ['Salle de bain', ['Baignoire', 'Sèche-cheveux', 'Produits de nettoyage', 'Shampoing', 'Savon pour le corps', 'Eau chaude', 'Gel douche']],
      ['Chambre et linge', ['Cintres', 'Linge de lit', 'Espace de rangement pour les vêtements : placard']],
      ['Divertissement', ['Télévision']],
      ['Chauffage et climatisation', ['Climatisation', 'Ventilateurs portables', 'Chauffage radiant']],
      ['Sécurité à la maison', ['Détecteur de fumée']],
      ['Internet et bureau', ['Wifi']],
      ['Cuisine et salle à manger', ['Cuisine', 'Réfrigérateur', 'Four à micro-ondes', 'Tout le nécessaire pour cuisiner', 'Vaisselle et couverts', 'Congélateur', 'Lave-vaisselle', 'Cuisinière électrique', 'Four', 'Bouilloire électrique', 'Cafetière : machine à expresso', 'Plaques de cuisson', 'Table à manger', 'Café']],
      ['Emplacement', ['Entrée privée']],
      ['Extérieur', ['Patio ou balcon privé', "Mobilier d'extérieur", 'Espace repas en plein air']],
      ['Services', ['Arrivée autonome', 'Boîte à clé sécurisée']],
    ],
    notIncluded: ['Caméras de surveillance extérieures', 'Lave-linge', 'Sèche-linge', 'Produits de base', 'Détecteur de monoxyde de carbone'],
    locationText: "Moustiers-Sainte-Marie, Provence-Alpes-Côte d'Azur, France",
    photos: PH('1631901662839629884', `4d66de8b-0ec7-4437-83dc-70c927001089.png aee591eb-006f-474c-bdc4-996775730d18.jpeg 41a76e01-fe17-489a-aa31-a20ad2660bd2.png 99fcd89d-82b8-4213-8909-f1044656fd68.jpeg fe6110d5-46d2-44a2-81c2-bd743d24f19a.png 1c4d93a1-96a9-4a37-9f71-052394398b26.jpeg 059f89b3-3f54-477d-ae77-7c39d441e43b.jpeg 7373ef83-8d26-4bb9-8d4b-eb0c8b8a1638.png 8e9ef54e-26ca-40eb-8756-ec85ece622aa.jpeg 0a822710-dfcc-4195-bb72-79eec49095bc.png b907c2d2-50cb-44d3-ae6a-cad82dec77ff.png eb2ad47d-5945-49ac-bab4-5f1b68cc58c7.png 41aca3d1-7451-4d61-a04c-e1b631d3e5b3.jpeg 678aa701-7ab1-4eb9-a906-be37afb59ba8.jpeg cc6a3324-ea98-456e-a8fd-c01c9650040b.jpeg 66319d29-7e90-47d0-af3b-1c8a65e0a641.jpeg 5dcd3d8b-52da-4c05-aa9b-2dcaeae3ff91.jpeg a8e24ef9-07d2-47ed-ab51-ee25f8725d39.jpeg 8cc2ccdf-c7c6-4a10-a7a0-a275a86e2805.jpeg b78baf1f-2776-4c20-a47f-456b11144b82.jpeg 5e97f8d9-fa6c-4280-82d8-2c4ed73afeb4.jpeg 0c68dbbb-9084-4dd0-9521-fe9fd44f4803.jpeg 6cdabd4b-6bbd-438c-8aba-69def9ca38ec.jpeg 69e55583-d6bb-46ce-9e0a-a824482d1ad7.jpeg 66250cba-9857-4bfd-b4eb-7d8604631c24.jpeg 51a4a395-e821-46ff-bfd6-270d4a2a29f7.jpeg 6a5ed782-af5c-4603-8276-3b86ce0d869a.jpeg 34aac26d-2b8b-4d79-829b-88d540d54556.jpeg b172d048-3fcc-45a3-957a-d6dc6738313c.jpeg 1e61d8a2-50b2-4f18-a509-c9015885493b.jpeg 132367eb-a428-4091-9004-0a4889d43bf5.jpeg e5ca2883-fb30-4ba5-9dba-fbda0e87d611.jpeg 64c8d6c3-e42f-4c4c-af24-d4c094ec7d3f.jpeg 94ad51bf-3ee6-46c6-92c2-03400e623d72.jpeg 1a0704ae-334e-412b-96b5-1ce297a8df53.jpeg e33f0356-8cf8-4e09-822c-6fb27aea23bb.jpeg`),
  },

  host: { name: 'Sandrine', superhost: true, rating: 4.86, reviews: 50, years: 2, languages: 'Français', response: 'Répond dans l’heure (taux de réponse : 100 %)' },
};

// Photos locales (generees par scripts/download-photos.js) : si presentes, elles
// remplacent les URLs Airbnb ; l'ordre est identique (remote[i] <-> photos[i]).
const fs = require('fs'), path = require('path');
const lf = path.join(__dirname, 'photos-local.json');
const local = fs.existsSync(lf) ? JSON.parse(fs.readFileSync(lf, 'utf8')) : {};
for (const id of ['salles6', 'salles8', 'moustiers']) {
  _mod[id].remote = _mod[id].photos;
  if (local[id] && local[id].length === _mod[id].photos.length) _mod[id].photos = local[id];
  _mod[id].photoFor = file => { const i = _mod[id].remote.findIndex(u => u.endsWith('/' + file)); return i >= 0 ? _mod[id].photos[i] : null; };
}
module.exports = _mod;
