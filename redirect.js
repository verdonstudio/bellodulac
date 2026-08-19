// Fichier : redirect.js
//display.html?res=default&action=evenements
const reservations = {
    "HMPN8MRZPS": {
        "evenements": "evenements.html?lang=EN&logement=moustiers&edatestart=2026-08-06&edateend=2026-08-09",
        "map": "index.html?lang=EN&logement=moustiers&zoom=13&pos=43.82945%2C6.21921&edatestart=2026-08-06&edateend=2026-08-09",
        "highlights": "highlights.html?lang=EN&logement=moustiers&edatestart=2026-08-06&edateend=2026-08-09&ids=evt-36%2C0608SURF%2C0608ASTROSOL%2Cevt-74%2C0708CINE%2Cevt-75%2Cevt-72%2Cevt-76%2Crec-bois-tourne-aiguines%2Cevt-16&from=evenements&visits=rando-moustiers%3A2026-08-06%2Cplage-galetas%3A2026-08-07%2Cplage-chabassole%3A2026-08-09%2Ctopo-lac-basses-gorges-mrkl4060%3A2026-08-08",
        "panorama": "panorama.html?lang=EN&logement=moustiers&edatestart=2026-08-06&edateend=2026-08-09",
        "today": "highlights.html?lang=EN&logement=moustiers&edatestart=2026-08-07&edateend=2026-08-10&showevents=today&showpois=today",
        "parking": "index.html?logement=moustiers&lang=EN&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1",
        "trash": "index.html?logement=moustiers&lang=EN&zoom=16&pos=43.84536%2C6.2203&cat=ordures",
        "martel" : "index.html?lang=EN&logement=moustiers&visits=rando-salles%3A2026-08-08%2Cplage-salles%3A2026-08-08&edatestart=2026-08-07&edateend=2026-08-10&showevents=today&showpois=today&zoom=12&pos=43.77109%2C6.30169&poi=blanc-martel"
    },
    "HMNQTFPKEP": {
        "evenements": "evenements.html?lang=FR&logement=salles8&edatestart=2026-08-09&edateend=2026-08-14",
        "map": "index.html?lang=FR&logement=salles8&zoom=12&pos=43.77258%2C6.20831&edatestart=2026-08-09&edateend=2026-08-14",
        "highlights": "highlights.html?edatestart=2026-08-09&edateend=2026-08-14&lang=FR&logement=salles8&ids=rec-bois-tourne-aiguines%2Cevt-12%2C1008PONEY%2Cevt-23%2Cevt-77%2C1108PETIT%2Crec-moustiers-nocturne-mercredi%2C1208MAMA%2C1208ACCRONOCT%2C1308SURF%2C1308GEO%2Cevt-36%2C1408CINE%2Cevt-78&from=evenements&visits=plage-salles%3A2026-08-09%2Cplage-margaridon%3A2026-08-10%2Cplage-galetas%3A2026-08-11%2Ctopo-lac-basses-gorges-mrkl4060%3A2026-08-12%2Crando-moustiers%3A2026-08-13%2Caiguines-table-orientation%3A2026-08-14",
        "panorama": "panorama.html?lang=FR&logement=moustiers&edatestart=2026-08-09&edateend=2026-08-14",
        "today": "highlights.html?lang=FR&logement=salles8&from=evenements&showevents=today&showpois=today",
        "parking": "index.html?logement=salles8&lang=FR&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1",
        "" : "https://bellodulac.vercel.app/index.html?logement=salles8&lang=FR&zoom=13&pos=43.73917%2C6.08299&fullscreen=1&poi=aquattitude-montpezat",
        "baudinard" : "https://bellodulac.vercel.app/index.html?logement=salles8&lang=FR&zoom=13&pos=43.73917%2C6.08299&fullscreen=1&poi=aquattitude-montpezat",
        "quinson" : "https://bellodulac.vercel.app/index.html?logement=salles8&lang=FR&zoom=16.5&pos=43.69367%2C6.04253&fullscreen=1&edit=1&poi=canoe-quinson",
        "galetas" : " https://bellodulac.vercel.app/index.html?logement=moustiers&lang=FR&zoom=15.5&pos=43.80229%2C6.25044&poi=canoe-galetas-1"
    },
    "HMDYW4ZT32": {
        "evenements": "evenements.html?lang=FR&logement=moustiers&edatestart=2026-08-10&edateend=2026-08-17",
        "map": "index.html?lang=FR&logement=moustiers&edatestart=2026-08-10&edateend=2026-08-17&zoom=13&pos=43.82945%2C6.21921",
        "highlights": "highlights.html?lang=FR&logement=moustiers&edatestart=2026-08-10&edateend=2026-08-17&from=evenements&showevents=3stars&showpois=true",
        "panorama": "panorama.html?lang=FR&logement=moustiers&edatestart=2026-08-10&edateend=2026-08-17",
        "today": "highlights.html?lang=FR&logement=moustiers&from=evenements&showevents=today&showpois=today",
        "parking": "index.html?logement=moustiers&lang=FR&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1",
        "trash": "index.html?logement=moustiers&lang=FR&zoom=16&pos=43.84536%2C6.2203&cat=ordures"
    },
    "HMXCDR8882": {
        "evenements": "evenements.html?lang=FR&logement=salles8&edatestart=2026-08-15&edateend=2026-08-21",
        "map": "index.html?lang=FR&logement=salles8&zoom=12&pos=43.77258%2C6.20831&edatestart=2026-08-15&edateend=2026-08-21",
        "highlights": "highlights.html?&edatestart=2026-08-15&edateend=2026-08-21&lang=FR&logement=salles8&ids=evt-79%2Cevt-80%2C1708PONEY%2Cevt-23%2C1808PATEVENT-SALLES%2Cevt-49%2Crec-boules-nocturnes-salles%2Crec-moustiers-nocturne-mercredi%2C1908ACCRONOCT%2Cevt-36%2C2008ASTRO%2C2008ASTROSOL%2C2108CINE%2Cevt-64b&from=evenements",
        "panorama": "panorama.html?lang=FR&logement=salles8&edatestart=2026-08-15&edateend=2026-08-21",
        "today": "highlights.html?lang=FR&logement=salles8&from=evenements&showevents=today&showpois=today",
        "parking": "index.html?logement=salles8&lang=FR&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1"
    },
    "HMHBKYZK28": {
        "evenements": "evenements.html?lang=FR&logement=moustiers&edatestart=2026-08-17&edateend=2026-08-22",
        "map": "index.html?lang=FR&logement=moustiers&zoom=13&pos=43.82945%2C6.21921&edatestart=2026-08-17&edateend=2026-08-22",
        "highlights": "highlights.html?lang=FR&logement=moustiers&from=evenements&showevents=3stars&showpois=true&edatestart=2026-08-17&edateend=2026-08-22",
        "panorama": "panorama.html?lang=FR&logement=moustiers&edatestart=2026-08-17&edateend=2026-08-22",
        "today": "highlights.html?lang=FR&logement=moustiers&from=evenements&showevents=today&showpois=today&edatestart=2026-08-17&edateend=2026-08-22",
        "parking": "index.html?logement=moustiers&lang=FR&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1",
        "trash": "index.html?logement=moustiers&lang=FR&zoom=16&pos=43.84536%2C6.2203&cat=ordures&edatestart=2026-08-17&edateend=2026-08-22"
    },
    "HMKZPX4TMA": {
        "home": "home.html?res=HMKZPX4TMA&lang=FR&logement=salles8",
        "map": "index.html?lang=FR&logement=salles8&edatestart=2026-08-22&edateend=2026-08-29&zoom=12&pos=43.77258%2C6.20831",
        "evenements": "evenements.html?lang=FR&logement=salles8&edatestart=2026-08-22&edateend=2026-08-29",
        "highlights": "highlights.html?lang=FR&logement=salles8&edatestart=2026-08-22&edateend=2026-08-29&from=evenements&showevents=3stars&showpois=true",
        "panorama": "panorama.html?lang=FR&logement=salles8&edatestart=2026-08-22&edateend=2026-08-29",
        "today": "highlights.html?lang=FR&logement=salles8&edatestart=2026-08-22&edateend=2026-08-29&from=evenements&showevents=today&showpois=today",
        "parking": "index.html?logement=salles8&lang=FR&edatestart=2026-08-22&edateend=2026-08-29&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1",
        "trash": "index.html?logement=salles8&lang=FR&edatestart=2026-08-22&edateend=2026-08-29&zoom=16&pos=43.84536%2C6.2203&cat=ordures&fullscreen=1",
        "baudinard": "index.html?logement=salles8&lang=FR&edatestart=2026-08-22&edateend=2026-08-29&zoom=13&pos=43.73917%2C6.08299&fullscreen=1&poi=aquattitude-montpezat",
        "quinson": "index.html?logement=salles8&lang=FR&edatestart=2026-08-22&edateend=2026-08-29&zoom=16.5&pos=43.69367%2C6.04253&fullscreen=1&poi=canoe-quinson",
        "galetas": "index.html?logement=salles8&lang=FR&edatestart=2026-08-22&edateend=2026-08-29&zoom=15.5&pos=43.80229%2C6.25044&poi=canoe-galetas-1",
        "plage-bellodulac1": "index.html?lang=FR&logement=salles8&edatestart=2026-08-22&edateend=2026-08-29&zoom=17&pos=43.77194%2C6.20816&fullscreen=1&trace=plage-salles",
        "plage-bellodulac2": "index.html?lang=FR&logement=salles8&edatestart=2026-08-22&edateend=2026-08-29&zoom=17&pos=43.77341%2C6.20707&fullscreen=1&trace=plage-margaridon",
        "martel": "index.html?lang=FR&logement=salles8&edatestart=2026-08-22&edateend=2026-08-29&zoom=12&pos=43.77109%2C6.30169&poi=blanc-martel"
    },
    "HMB2JRYYN5": {
        "home": "home.html?res=HMB2JRYYN5&lang=FR&logement=moustiers",
        "map": "index.html?lang=FR&logement=moustiers&edatestart=2026-08-25&edateend=2026-08-28&zoom=13&pos=43.82945%2C6.21921",
        "evenements": "evenements.html?lang=FR&logement=moustiers&edatestart=2026-08-25&edateend=2026-08-28",
        "highlights": "highlights.html?lang=FR&logement=moustiers&edatestart=2026-08-25&edateend=2026-08-28&from=evenements&showevents=3stars&showpois=true",
        "panorama": "panorama.html?lang=FR&logement=moustiers&edatestart=2026-08-25&edateend=2026-08-28",
        "today": "highlights.html?lang=FR&logement=moustiers&edatestart=2026-08-25&edateend=2026-08-28&from=evenements&showevents=today&showpois=today",
        "parking": "index.html?logement=moustiers&lang=FR&edatestart=2026-08-25&edateend=2026-08-28&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1",
        "trash": "index.html?logement=moustiers&lang=FR&edatestart=2026-08-25&edateend=2026-08-28&zoom=16&pos=43.84536%2C6.2203&cat=ordures&fullscreen=1",
        "baudinard": "index.html?logement=moustiers&lang=FR&edatestart=2026-08-25&edateend=2026-08-28&zoom=13&pos=43.73917%2C6.08299&fullscreen=1&poi=aquattitude-montpezat",
        "quinson": "index.html?logement=moustiers&lang=FR&edatestart=2026-08-25&edateend=2026-08-28&zoom=16.5&pos=43.69367%2C6.04253&fullscreen=1&poi=canoe-quinson",
        "galetas": "index.html?logement=moustiers&lang=FR&edatestart=2026-08-25&edateend=2026-08-28&zoom=15.5&pos=43.80229%2C6.25044&poi=canoe-galetas-1",
        "plage-bellodulac1": "index.html?lang=FR&logement=moustiers&edatestart=2026-08-25&edateend=2026-08-28&zoom=17&pos=43.77194%2C6.20816&fullscreen=1&trace=plage-salles",
        "plage-bellodulac2": "index.html?lang=FR&logement=moustiers&edatestart=2026-08-25&edateend=2026-08-28&zoom=17&pos=43.77341%2C6.20707&fullscreen=1&trace=plage-margaridon",
        "martel": "index.html?lang=FR&logement=moustiers&edatestart=2026-08-25&edateend=2026-08-28&zoom=12&pos=43.77109%2C6.30169&poi=blanc-martel"
    },
    "HMYRZQWQNF": {
        "home": "home.html?res=HMYRZQWQNF&lang=FR&logement=moustiers",
        "map": "index.html?lang=FR&logement=moustiers&edatestart=2026-08-31&edateend=2026-09-05&zoom=13&pos=43.82945%2C6.21921",
        "evenements": "evenements.html?lang=FR&logement=moustiers&edatestart=2026-08-31&edateend=2026-09-05",
        "highlights": "highlights.html?lang=FR&logement=moustiers&edatestart=2026-08-31&edateend=2026-09-05&from=evenements&showevents=3stars&showpois=true",
        "panorama": "panorama.html?lang=FR&logement=moustiers&edatestart=2026-08-31&edateend=2026-09-05",
        "today": "highlights.html?lang=FR&logement=moustiers&edatestart=2026-08-31&edateend=2026-09-05&from=evenements&showevents=today&showpois=today",
        "parking": "index.html?logement=moustiers&lang=FR&edatestart=2026-08-31&edateend=2026-09-05&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1",
        "trash": "index.html?logement=moustiers&lang=FR&edatestart=2026-08-31&edateend=2026-09-05&zoom=16&pos=43.84536%2C6.2203&cat=ordures&fullscreen=1",
        "baudinard": "index.html?logement=moustiers&lang=FR&edatestart=2026-08-31&edateend=2026-09-05&zoom=13&pos=43.73917%2C6.08299&fullscreen=1&poi=aquattitude-montpezat",
        "quinson": "index.html?logement=moustiers&lang=FR&edatestart=2026-08-31&edateend=2026-09-05&zoom=16.5&pos=43.69367%2C6.04253&fullscreen=1&poi=canoe-quinson",
        "galetas": "index.html?logement=moustiers&lang=FR&edatestart=2026-08-31&edateend=2026-09-05&zoom=15.5&pos=43.80229%2C6.25044&poi=canoe-galetas-1",
        "plage-bellodulac1": "index.html?lang=FR&logement=moustiers&edatestart=2026-08-31&edateend=2026-09-05&zoom=17&pos=43.77194%2C6.20816&fullscreen=1&trace=plage-salles",
        "plage-bellodulac2": "index.html?lang=FR&logement=moustiers&edatestart=2026-08-31&edateend=2026-09-05&zoom=17&pos=43.77341%2C6.20707&fullscreen=1&trace=plage-margaridon",
        "martel": "index.html?lang=FR&logement=moustiers&edatestart=2026-08-31&edateend=2026-09-05&zoom=12&pos=43.77109%2C6.30169&poi=blanc-martel"
    },
    "HMMBAKWMFD": {
        "home": "home.html?res=HMMBAKWMFD&lang=FR&logement=salles6",
        "map": "index.html?lang=FR&logement=salles6&edatestart=2026-09-08&edateend=2026-09-14&zoom=12&pos=43.77258%2C6.20831",
        "evenements": "evenements.html?lang=FR&logement=salles6&edatestart=2026-09-08&edateend=2026-09-14",
        "highlights": "highlights.html?lang=FR&logement=salles6&edatestart=2026-09-08&edateend=2026-09-14&from=evenements&showevents=3stars&showpois=true",
        "panorama": "panorama.html?lang=FR&logement=salles6&edatestart=2026-09-08&edateend=2026-09-14",
        "today": "highlights.html?lang=FR&logement=salles6&edatestart=2026-09-08&edateend=2026-09-14&from=evenements&showevents=today&showpois=today",
        "parking": "index.html?logement=salles6&lang=FR&edatestart=2026-09-08&edateend=2026-09-14&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1",
        "trash": "index.html?logement=salles6&lang=FR&edatestart=2026-09-08&edateend=2026-09-14&zoom=16&pos=43.84536%2C6.2203&cat=ordures&fullscreen=1",
        "baudinard": "index.html?logement=salles6&lang=FR&edatestart=2026-09-08&edateend=2026-09-14&zoom=13&pos=43.73917%2C6.08299&fullscreen=1&poi=aquattitude-montpezat",
        "quinson": "index.html?logement=salles6&lang=FR&edatestart=2026-09-08&edateend=2026-09-14&zoom=16.5&pos=43.69367%2C6.04253&fullscreen=1&poi=canoe-quinson",
        "galetas": "index.html?logement=salles6&lang=FR&edatestart=2026-09-08&edateend=2026-09-14&zoom=15.5&pos=43.80229%2C6.25044&poi=canoe-galetas-1",
        "plage-bellodulac1": "index.html?lang=FR&logement=salles6&edatestart=2026-09-08&edateend=2026-09-14&zoom=17&pos=43.77194%2C6.20816&fullscreen=1&trace=plage-salles",
        "plage-bellodulac2": "index.html?lang=FR&logement=salles6&edatestart=2026-09-08&edateend=2026-09-14&zoom=17&pos=43.77341%2C6.20707&fullscreen=1&trace=plage-margaridon",
        "martel": "index.html?lang=FR&logement=salles6&edatestart=2026-09-08&edateend=2026-09-14&zoom=12&pos=43.77109%2C6.30169&poi=blanc-martel"
    },
    "HM9FT3XCJQ": {
        "home": "home.html?res=HM9FT3XCJQ&lang=EN&logement=moustiers",
        "map": "index.html?lang=EN&logement=moustiers&edatestart=2026-09-10&edateend=2026-09-13&zoom=13&pos=43.82945%2C6.21921",
        "evenements": "evenements.html?lang=EN&logement=moustiers&edatestart=2026-09-10&edateend=2026-09-13",
        "highlights": "highlights.html?lang=EN&logement=moustiers&edatestart=2026-09-10&edateend=2026-09-13&from=evenements&showevents=3stars&showpois=true",
        "panorama": "panorama.html?lang=EN&logement=moustiers&edatestart=2026-09-10&edateend=2026-09-13",
        "today": "highlights.html?lang=EN&logement=moustiers&edatestart=2026-09-10&edateend=2026-09-13&from=evenements&showevents=today&showpois=today",
        "parking": "index.html?logement=moustiers&lang=EN&edatestart=2026-09-10&edateend=2026-09-13&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1",
        "trash": "index.html?logement=moustiers&lang=EN&edatestart=2026-09-10&edateend=2026-09-13&zoom=16&pos=43.84536%2C6.2203&cat=ordures&fullscreen=1",
        "baudinard": "index.html?logement=moustiers&lang=EN&edatestart=2026-09-10&edateend=2026-09-13&zoom=13&pos=43.73917%2C6.08299&fullscreen=1&poi=aquattitude-montpezat",
        "quinson": "index.html?logement=moustiers&lang=EN&edatestart=2026-09-10&edateend=2026-09-13&zoom=16.5&pos=43.69367%2C6.04253&fullscreen=1&poi=canoe-quinson",
        "galetas": "index.html?logement=moustiers&lang=EN&edatestart=2026-09-10&edateend=2026-09-13&zoom=15.5&pos=43.80229%2C6.25044&poi=canoe-galetas-1",
        "plage-bellodulac1": "index.html?lang=EN&logement=moustiers&edatestart=2026-09-10&edateend=2026-09-13&zoom=17&pos=43.77194%2C6.20816&fullscreen=1&trace=plage-salles",
        "plage-bellodulac2": "index.html?lang=EN&logement=moustiers&edatestart=2026-09-10&edateend=2026-09-13&zoom=17&pos=43.77341%2C6.20707&fullscreen=1&trace=plage-margaridon",
        "martel": "index.html?lang=EN&logement=moustiers&edatestart=2026-09-10&edateend=2026-09-13&zoom=12&pos=43.77109%2C6.30169&poi=blanc-martel"
    },
    "HMDXYHZQZN": {
        "home": "home.html?res=HMDXYHZQZN&lang=FR&logement=salles6",
        "map": "index.html?lang=FR&logement=salles6&edatestart=2026-09-25&edateend=2026-09-27&zoom=12&pos=43.77258%2C6.20831",
        "evenements": "evenements.html?lang=FR&logement=salles6&edatestart=2026-09-25&edateend=2026-09-27",
        "highlights": "highlights.html?lang=FR&logement=salles6&edatestart=2026-09-25&edateend=2026-09-27&from=evenements&showevents=3stars&showpois=true",
        "panorama": "panorama.html?lang=FR&logement=salles6&edatestart=2026-09-25&edateend=2026-09-27",
        "today": "highlights.html?lang=FR&logement=salles6&edatestart=2026-09-25&edateend=2026-09-27&from=evenements&showevents=today&showpois=today",
        "parking": "index.html?logement=salles6&lang=FR&edatestart=2026-09-25&edateend=2026-09-27&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1",
        "trash": "index.html?logement=salles6&lang=FR&edatestart=2026-09-25&edateend=2026-09-27&zoom=16&pos=43.84536%2C6.2203&cat=ordures&fullscreen=1",
        "baudinard": "index.html?logement=salles6&lang=FR&edatestart=2026-09-25&edateend=2026-09-27&zoom=13&pos=43.73917%2C6.08299&fullscreen=1&poi=aquattitude-montpezat",
        "quinson": "index.html?logement=salles6&lang=FR&edatestart=2026-09-25&edateend=2026-09-27&zoom=16.5&pos=43.69367%2C6.04253&fullscreen=1&poi=canoe-quinson",
        "galetas": "index.html?logement=salles6&lang=FR&edatestart=2026-09-25&edateend=2026-09-27&zoom=15.5&pos=43.80229%2C6.25044&poi=canoe-galetas-1",
        "plage-bellodulac1": "index.html?lang=FR&logement=salles6&edatestart=2026-09-25&edateend=2026-09-27&zoom=17&pos=43.77194%2C6.20816&fullscreen=1&trace=plage-salles",
        "plage-bellodulac2": "index.html?lang=FR&logement=salles6&edatestart=2026-09-25&edateend=2026-09-27&zoom=17&pos=43.77341%2C6.20707&fullscreen=1&trace=plage-margaridon",
        "martel": "index.html?lang=FR&logement=salles6&edatestart=2026-09-25&edateend=2026-09-27&zoom=12&pos=43.77109%2C6.30169&poi=blanc-martel"
    },
    "HMAZKZK5XA": {
        "home": "home.html?res=HMAZKZK5XA&lang=FR&logement=moustiers",
        "map": "index.html?lang=FR&logement=moustiers&edatestart=2026-10-01&edateend=2026-10-04&zoom=13&pos=43.82945%2C6.21921",
        "evenements": "evenements.html?lang=FR&logement=moustiers&edatestart=2026-10-01&edateend=2026-10-04",
        "highlights": "highlights.html?lang=FR&logement=moustiers&edatestart=2026-10-01&edateend=2026-10-04&from=evenements&showevents=3stars&showpois=true",
        "panorama": "panorama.html?lang=FR&logement=moustiers&edatestart=2026-10-01&edateend=2026-10-04",
        "today": "highlights.html?lang=FR&logement=moustiers&edatestart=2026-10-01&edateend=2026-10-04&from=evenements&showevents=today&showpois=today",
        "parking": "index.html?logement=moustiers&lang=FR&edatestart=2026-10-01&edateend=2026-10-04&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1",
        "trash": "index.html?logement=moustiers&lang=FR&edatestart=2026-10-01&edateend=2026-10-04&zoom=16&pos=43.84536%2C6.2203&cat=ordures&fullscreen=1",
        "baudinard": "index.html?logement=moustiers&lang=FR&edatestart=2026-10-01&edateend=2026-10-04&zoom=13&pos=43.73917%2C6.08299&fullscreen=1&poi=aquattitude-montpezat",
        "quinson": "index.html?logement=moustiers&lang=FR&edatestart=2026-10-01&edateend=2026-10-04&zoom=16.5&pos=43.69367%2C6.04253&fullscreen=1&poi=canoe-quinson",
        "galetas": "index.html?logement=moustiers&lang=FR&edatestart=2026-10-01&edateend=2026-10-04&zoom=15.5&pos=43.80229%2C6.25044&poi=canoe-galetas-1",
        "plage-bellodulac1": "index.html?lang=FR&logement=moustiers&edatestart=2026-10-01&edateend=2026-10-04&zoom=17&pos=43.77194%2C6.20816&fullscreen=1&trace=plage-salles",
        "plage-bellodulac2": "index.html?lang=FR&logement=moustiers&edatestart=2026-10-01&edateend=2026-10-04&zoom=17&pos=43.77341%2C6.20707&fullscreen=1&trace=plage-margaridon",
        "martel": "index.html?lang=FR&logement=moustiers&edatestart=2026-10-01&edateend=2026-10-04&zoom=12&pos=43.77109%2C6.30169&poi=blanc-martel"
    },
    "HMFFSNS4BJ": {
        "home": "home.html?res=HMFFSNS4BJ&lang=EN&logement=moustiers",
        "map": "index.html?lang=EN&logement=moustiers&edatestart=2026-10-16&edateend=2026-10-19&zoom=13&pos=43.82945%2C6.21921",
        "evenements": "evenements.html?lang=EN&logement=moustiers&edatestart=2026-10-16&edateend=2026-10-19",
        "highlights": "highlights.html?lang=EN&logement=moustiers&edatestart=2026-10-16&edateend=2026-10-19&from=evenements&showevents=3stars&showpois=true",
        "panorama": "panorama.html?lang=EN&logement=moustiers&edatestart=2026-10-16&edateend=2026-10-19",
        "today": "highlights.html?lang=EN&logement=moustiers&edatestart=2026-10-16&edateend=2026-10-19&from=evenements&showevents=today&showpois=today",
        "parking": "index.html?logement=moustiers&lang=EN&edatestart=2026-10-16&edateend=2026-10-19&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1",
        "trash": "index.html?logement=moustiers&lang=EN&edatestart=2026-10-16&edateend=2026-10-19&zoom=16&pos=43.84536%2C6.2203&cat=ordures&fullscreen=1",
        "baudinard": "index.html?logement=moustiers&lang=EN&edatestart=2026-10-16&edateend=2026-10-19&zoom=13&pos=43.73917%2C6.08299&fullscreen=1&poi=aquattitude-montpezat",
        "quinson": "index.html?logement=moustiers&lang=EN&edatestart=2026-10-16&edateend=2026-10-19&zoom=16.5&pos=43.69367%2C6.04253&fullscreen=1&poi=canoe-quinson",
        "galetas": "index.html?logement=moustiers&lang=EN&edatestart=2026-10-16&edateend=2026-10-19&zoom=15.5&pos=43.80229%2C6.25044&poi=canoe-galetas-1",
        "plage-bellodulac1": "index.html?lang=EN&logement=moustiers&edatestart=2026-10-16&edateend=2026-10-19&zoom=17&pos=43.77194%2C6.20816&fullscreen=1&trace=plage-salles",
        "plage-bellodulac2": "index.html?lang=EN&logement=moustiers&edatestart=2026-10-16&edateend=2026-10-19&zoom=17&pos=43.77341%2C6.20707&fullscreen=1&trace=plage-margaridon",
        "martel": "index.html?lang=EN&logement=moustiers&edatestart=2026-10-16&edateend=2026-10-19&zoom=12&pos=43.77109%2C6.30169&poi=blanc-martel"
    },
    "default": {
        "evenements": "evenements.html",
        "map": "index.html",
        "highlights": "highlights.html",
        "panorama": "panorama.html",
        "parking" : "index.html?logement=moustiers&lang=FR&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1",
        "parking-en" : "index.html?logement=moustiers&lang=EN&zoom=16.5&pos=43.84511%2C6.22124&cat=parking_gratuit%2Cparking_zonebleu%2Cparking_payant&fullscreen=1",
        "plage-bellodulac1" : "index.html?lang=FR&logement=salles8&zoom=17&pos=43.77194%2C6.20816&fullscreen=1&trace=plage-salles",
        "plage-bellodulac2" : "index.html?lang=FR&logement=salles8&zoom=17&pos=43.77341%2C6.20707&fullscreen=1&trace=plage-margaridon",
        "trash": "index.html?logement=moustiers&lang=FR&zoom=16&pos=43.84536%2C6.2203&cat=ordures&fullscreen=1",
        "trash-en": "index.html?logement=moustiers&lang=EN&zoom=16&pos=43.84536%2C6.2203&cat=ordures&fullscreen=1"    
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
    }
};