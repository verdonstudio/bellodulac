// Fichier : redirect.js
//display.html?res=default&action=evenements
const reservations = {
    "HMDYW4ZT32": {
        "evenements": "evenements.html?lang=FR&logement=moustiers&edatestart=10 août 2026&edateend=17 août 2026",
        "map": "index.html?lang=FR&logement=moustiers&zoom=13&pos=43.82945%2C6.21921",
        "highlights": "highlights.html?lang=FR&logement=moustiers&ids=rec-bois-tourne-aiguines%2Cevt-77%2C1108PETIT%2Crec-moustiers-artisanat-mardi%2Crec-moustiers-nocturne-mercredi%2Crec-aperitif-ferme-roumoules%2C1208MAMA%2Cevt-36%2C1308SURF%2C1408CINE%2Cevt-16%2Cevt-79%2Cevt-80%2Cevt-13%2C1708PONEY&from=evenements&edatestart=2026-08-10&edateend=2026-08-17&lang=FR&visits=rando-moustiers%3A2026-08-10%2Cplage-galetas%3A2026-08-11%2Cplage-salles%3A2026-08-12%2Caiguines-table-orientation%3A2026-08-14%2Caiguines%3A2026-08-14%2Cplage-chabassole%3A2026-08-15%2Cplage-sainte-croix%3A2026-08-17%2Ctopo-lac-basses-gorges-mrkl4060%3A2026-08-17",
        "panorama": "panorama.html?lang=FR&logement=moustiers",
        "today": "https://bellodulac.vercel.app/highlights.html?lang=FR&logement=moustiers&from=evenements&showevents=today&showpois=today",
        "parking": "index.html?logement=moustiers&lang=FR&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1",
        "trash": "https://bellodulac.vercel.app/?logement=moustiers&lang=FR&zoom=16&pos=43.84536%2C6.2203&cat=ordures"
    },
    "HMPN8MRZPS": {
        "evenements": "evenements.html?lang=EN&logement=moustiers&edatestart=2026-08-06&edateend=2026-08-09",
        "map": "index.html?lang=EN&logement=moustiers&zoom=13&pos=43.82945%2C6.21921&edatestart=2026-08-06&edateend=2026-08-09",
        "highlights": "highlights.html?lang=EN&logement=moustiers&edatestart=2026-08-06&edateend=2026-08-09&ids=evt-36%2C0608SURF%2C0608ASTROSOL%2Cevt-74%2C0708CINE%2Cevt-75%2Cevt-72%2Cevt-76%2Crec-bois-tourne-aiguines%2Cevt-16&from=evenements&visits=rando-moustiers%3A2026-08-06%2Cplage-galetas%3A2026-08-07%2Cplage-chabassole%3A2026-08-09%2Ctopo-lac-basses-gorges-mrkl4060%3A2026-08-08",
        "panorama": "panorama.html?lang=EN&logement=moustiers&edatestart=2026-08-06&edateend=2026-08-09",
        "today": "https://bellodulac.vercel.app/highlights.html?lang=EN&logement=moustiers&edatestart=2026-08-07&edateend=2026-08-10&showevents=today&showpois=today&visits=rando-salles%3A2026-08-08%2Cplage-salles%3A2026-08-08",
        "parking": "index.html?logement=moustiers&lang=EN&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1",
        "trash": "https://bellodulac.vercel.app/?logement=moustiers&lang=EN&zoom=16&pos=43.84536%2C6.2203&cat=ordures",
        "martel" : "https://bellodulac.vercel.app/index.html?lang=EN&logement=moustiers&visits=rando-salles%3A2026-08-08%2Cplage-salles%3A2026-08-08&edatestart=2026-08-07&edateend=2026-08-10&showevents=today&showpois=today&zoom=12&pos=43.77109%2C6.30169&poi=blanc-martel"
    },
    "HMNQTFPKEP": {
        "evenements": "evenements.html?lang=FR&logement=salles8&edatestart=2026-08-09&edateend=2026-08-14",
        "map": "index.html?lang=FR&logement=salles8&zoom=12&pos=43.77258%2C6.20831&edatestart=2026-08-09&edateend=2026-08-14",
        "highlights": "highlights.html?edatestart=2026-08-09&edateend=2026-08-14&lang=FR&logement=salles8&ids=rec-bois-tourne-aiguines%2Cevt-12%2C1008PONEY%2Cevt-23%2Cevt-77%2C1108PETIT%2Crec-moustiers-nocturne-mercredi%2C1208MAMA%2C1208ACCRONOCT%2C1308SURF%2C1308GEO%2Cevt-36%2C1408CINE%2Cevt-78&from=evenements&visits=plage-salles%3A2026-08-09%2Cplage-margaridon%3A2026-08-10%2Cplage-galetas%3A2026-08-11%2Ctopo-lac-basses-gorges-mrkl4060%3A2026-08-12%2Crando-moustiers%3A2026-08-13%2Caiguines-table-orientation%3A2026-08-14",
        "panorama": "panorama.html?lang=FR&logement=moustiers&edatestart=2026-08-09&edateend=2026-08-14",
        "today": "https://bellodulac.vercel.app/highlights.html?lang=FR&logement=salles8&from=evenements&showevents=today&showpois=today",
        "parking": "index.html?logement=salles8&lang=FR&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1"
    },
    "HMXCDR8882": {
        "evenements": "evenements.html?lang=FR&logement=salles8&edatestart=2026-08-15&edateend=2026-08-21",
        "map": "index.html?lang=FR&logement=salles8&zoom=12&pos=43.77258%2C6.20831&edatestart=2026-08-15&edateend=2026-08-21",
        "highlights": "highlights.html?&edatestart=2026-08-15&edateend=2026-08-21&lang=FR&logement=salles8&ids=evt-79%2Cevt-80%2C1708PONEY%2Cevt-23%2C1808PATEVENT-SALLES%2Cevt-49%2Crec-boules-nocturnes-salles%2Crec-moustiers-nocturne-mercredi%2C1908ACCRONOCT%2Cevt-36%2C2008ASTRO%2C2008ASTROSOL%2C2108CINE%2Cevt-64b&from=evenements",
        "panorama": "panorama.html?lang=FR&logement=salles8&edatestart=2026-08-15&edateend=2026-08-21",
        "today": "https://bellodulac.vercel.app/highlights.html?lang=FR&logement=salles8&from=evenements&showevents=today&showpois=today",
        "parking": "index.html?logement=salles8&lang=FR&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1"
    },
    "default": {
        "evenements": "evenements.html",
        "map": "index.html",
        "highlights": "highlights.html",
        "panorama": "panorama.html",
        "parking" : "index.html?logement=moustiers&lang=FR&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1",
        "parking-en" : "index.html?logement=moustiers&lang=EN&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1"
    },
    // Tag generique "que faire aujourd'hui" : pas lie a une reservation precise, pas de
    // dates ni de logement fixes -- showevents=today (evenements du jour calendaire) et
    // showpois=today (recommandation POI du jour, qui tourne selon la famille de logement,
    // voir DEFAULT_POI_ITINERARY dans highlights.html) se calculent tout seuls a l'ouverture.
    // Pour cibler un logement precis, ajouter &logement=moustiers|salles6|salles8 sur le
    // lien display.html?res=today&action=... lui-meme : display.html le transmet a la page
    // de destination (voir le passthrough ajoute dans display.html).
    "today": {
        "evenements": "evenements.html?lang=FR&showevents=today",
        "map": "index.html?lang=FR",
        "highlights": "highlights.html?lang=FR&showevents=today&showpois=today&from=evenements",
        "panorama": "panorama.html?lang=FR",
        "parking": "index.html?lang=FR&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1"
    },

    "HMHBKYZK28": {
        "evenements": "evenements.html?lang=FR&logement=moustiers&edatestart=2026-08-17&edateend=2026-08-22",
        "map": "index.html?lang=FR&logement=moustiers&zoom=13&pos=43.82945%2C6.21921&edatestart=2026-08-17&edateend=2026-08-22",
        "highlights": "highlights.html?lang=FR&logement=moustiers&ids=1708PONEY%2Cevt-23%2C1808PATEVENT-SALLES%2C1808PETIT%2Crec-moustiers-artisanat-mardi%2Cevt-49%2C1908ACCRONOCT%2Crec-aperitif-ferme-roumoules%2Crec-moustiers-nocturne-mercredi%2C2008ASTRO%2Cevt-36%2Cevt-64b%2C2108CINE%2Cevt-16%2Cevt-82&visits=rando-moustiers%3A2026-08-18%2Cplage-galetas%3A2026-08-19%2Caiguines-table-orientation%3A2026-08-20%2Ctopo-lac-basses-gorges-mrkl4060%3A2026-08-21%2Cplage-salles%3A2026-08-22&from=evenements&edatestart=2026-08-17&edateend=2026-08-22",
        "panorama": "panorama.html?lang=FR&logement=moustiers&edatestart=2026-08-17&edateend=2026-08-22",
        "today": "https://bellodulac.vercel.app/highlights.html?lang=FR&logement=moustiers&from=evenements&showevents=today&showpois=today",
        "parking": "index.html?logement=moustiers&lang=FR&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1",
        "trash": "https://bellodulac.vercel.app/?logement=moustiers&lang=FR&zoom=16&pos=43.84536%2C6.2203&cat=ordures"
    },
    "HMKZPX4TMA": {
        "evenements": "evenements.html?lang=FR&logement=salles8&edatestart=2026-08-22&edateend=2026-08-28",
        "map": "index.html?lang=FR&logement=salles8&zoom=12&pos=43.77258%2C6.20831&edatestart=2026-08-22&edateend=2026-08-28",
        "highlights": "highlights.html?edatestart=2026-08-22&edateend=2026-08-28&lang=FR&logement=salles8&ids=evt-81%2Cevt-82%2Crec-riez-marche-mercredi%2Cevt-30%2Cevt-29%2Cevt-48%2Cevt-12%2Cevt-13%2Cevt-23%2Crec-stecroix-mardi%2Crec-moustiers-artisanat-mardi%2Cevt-27%2Cevt-49%2Crec-aperitif-ferme-roumoules%2Crec-boules-nocturnes-salles%2Crec-moustiers-nocturne-mercredi%2Cevt-33%2C2708ASTROSOL%2C2708ASTRO%2Crec-riez-nocturne-jeudi%2Cevt-36%2Cevt-83%2Cevt-16&from=evenements&visits=plage-salles%3A2026-08-23%2Cplage-galetas%3A2026-08-24%2Caiguines-table-orientation%3A2026-08-25%2Crando-moustiers%3A2026-08-26%2Ctopo-lac-basses-gorges-mrkl4060%3A2026-08-27%2Cplage-margaridon%3A2026-08-28",
        "panorama": "panorama.html?lang=FR&logement=salles8&edatestart=2026-08-22&edateend=2026-08-28",
        "today": "https://bellodulac.vercel.app/highlights.html?lang=FR&logement=salles8&from=evenements&showevents=today&showpois=today",
        "parking": "index.html?logement=salles8&lang=FR&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1"
    },
    "HMYRZQWQNF": {
        "evenements": "evenements.html?lang=FR&logement=moustiers&edatestart=2026-08-31&edateend=2026-09-04",
        "map": "index.html?lang=FR&logement=moustiers&zoom=13&pos=43.82945%2C6.21921&edatestart=2026-08-31&edateend=2026-09-04",
        "highlights": "highlights.html?edatestart=2026-08-31&edateend=2026-09-04&lang=FR&logement=moustiers&ids=evt-23%2Crec-stecroix-mardi%2Cevt-48%2Cevt-49%2Crec-riez-marche-mercredi%2Cevt-30%2Cevt-33%2Cevt-29%2C0309ASTROSOL%2C0309ASTRO%2Cevt-36%2Cevt-16&from=evenements&visits=rando-moustiers%3A2026-09-01%2Cplage-galetas%3A2026-09-02%2Caiguines-table-orientation%3A2026-09-03%2Ctopo-lac-basses-gorges-mrkl4060%3A2026-09-04",
        "panorama": "panorama.html?lang=FR&logement=moustiers&edatestart=2026-08-31&edateend=2026-09-04",
        "today": "https://bellodulac.vercel.app/highlights.html?lang=FR&logement=moustiers&from=evenements&showevents=today&showpois=today",
        "parking": "index.html?logement=moustiers&lang=FR&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1",
        "trash": "https://bellodulac.vercel.app/?logement=moustiers&lang=FR&zoom=16&pos=43.84536%2C6.2203&cat=ordures"
    },
    "HMMBAKWMFD": {
        "evenements": "evenements.html?lang=FR&logement=salles6&edatestart=2026-09-08&edateend=2026-09-13",
        "map": "index.html?lang=FR&logement=salles6&zoom=12&pos=43.77258%2C6.20831&edatestart=2026-09-08&edateend=2026-09-13",
        "highlights": "highlights.html?edatestart=2026-09-08&edateend=2026-09-13&lang=FR&logement=salles6&ids=rec-stecroix-mardi%2Cevt-48%2Cevt-49%2Crec-riez-marche-mercredi%2Cevt-30%2Cevt-33%2Cevt-29%2C1009ASTROSOL%2C1009ASTRO%2Cevt-36%2Cevt-86%2C1109MAMA%2Cevt-16%2Cevt-12%2Cevt-13&from=evenements&visits=plage-salles%3A2026-09-09%2Cplage-galetas%3A2026-09-10%2Caiguines-table-orientation%3A2026-09-11%2Crando-moustiers%3A2026-09-12%2Ctopo-lac-basses-gorges-mrkl4060%3A2026-09-13",
        "panorama": "panorama.html?lang=FR&logement=salles6&edatestart=2026-09-08&edateend=2026-09-13",
        "today": "https://bellodulac.vercel.app/highlights.html?lang=FR&logement=salles6&from=evenements&showevents=today&showpois=today",
        "parking": "index.html?logement=salles6&lang=FR&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1"
    },
    "HMDXYHZQZN": {
        "evenements": "evenements.html?lang=FR&logement=salles6&edatestart=2026-09-25&edateend=2026-09-26",
        "map": "index.html?lang=FR&logement=salles6&zoom=12&pos=43.77258%2C6.20831&edatestart=2026-09-25&edateend=2026-09-26",
        "highlights": "highlights.html?edatestart=2026-09-25&edateend=2026-09-26&lang=FR&logement=salles6&ids=evt-16%2Cevt-87%2C2609MAMA%2Crec-riez-marche-mercredi%2Cevt-30%2Cevt-29%2Cevt-48&from=evenements&visits=plage-salles%3A2026-09-26",
        "panorama": "panorama.html?lang=FR&logement=salles6&edatestart=2026-09-25&edateend=2026-09-26",
        "today": "https://bellodulac.vercel.app/highlights.html?lang=FR&logement=salles6&from=evenements&showevents=today&showpois=today",
        "parking": "index.html?logement=salles6&lang=FR&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1"
    },
    "HMFFSNS4BJ": {
        "evenements": "evenements.html?lang=EN&logement=moustiers&edatestart=2026-10-16&edateend=2026-10-19",
        "map": "index.html?lang=EN&logement=moustiers&edatestart=2026-10-16&edateend=2026-10-19&zoom=13&pos=43.82945%2C6.21921",
        "highlights": "highlights.html?lang=EN&logement=moustiers&edatestart=2026-10-16&edateend=2026-10-19&from=evenements&showevents=3stars&showpois=true",
        "panorama": "panorama.html?lang=EN&logement=moustiers&edatestart=2026-10-16&edateend=2026-10-19",
        "today": "https://bellodulac.vercel.app/highlights.html?lang=EN&logement=moustiers&from=evenements&showevents=today&showpois=today",
        "parking": "index.html?logement=moustiers&lang=EN&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1",
        "trash": "https://bellodulac.vercel.app/?logement=moustiers&lang=EN&zoom=16&pos=43.84536%2C6.2203&cat=ordures"
    },
    "HMB2JRYYN5": {
        "evenements": "evenements.html?lang=FR&logement=moustiers&edatestart=2026-08-25&edateend=2026-08-28",
        "map": "index.html?lang=FR&logement=moustiers&edatestart=2026-08-25&edateend=2026-08-28&zoom=13&pos=43.82945%2C6.21921",
        "highlights": "highlights.html?lang=FR&logement=moustiers&edatestart=2026-08-25&edateend=2026-08-28&from=evenements&showevents=3stars&showpois=true",
        "panorama": "panorama.html?lang=FR&logement=moustiers&edatestart=2026-08-25&edateend=2026-08-28",
        "today": "https://bellodulac.vercel.app/highlights.html?lang=FR&logement=moustiers&from=evenements&showevents=today&showpois=today",
        "parking": "index.html?logement=moustiers&lang=FR&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1",
        "trash": "https://bellodulac.vercel.app/?logement=moustiers&lang=FR&zoom=16&pos=43.84536%2C6.2203&cat=ordures"
    }

};