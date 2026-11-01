/* ==========================================================================
   depart-content.js — Textes des instructions de départ (FR / EN / DE / NL).

   Utilisé par :
   - depart.html (page ouverte via le QR code collé derrière la porte des WC)
   - scripts/build-depart-sheets.js (génère les fiches Word/PDF à imprimer)

   Pour modifier un texte : éditer ce fichier, puis (pour les fiches imprimables)
   relancer `node scripts/build-depart-sheets.js`. La page depart.html se met à
   jour toute seule.

   Logements : "moustiers" (Bell'Étoile) et "salles" (Bell'O du Lac, 6P et 8P :
   mêmes instructions). Les items "close" et "trash" diffèrent selon le logement.
   Placeholders : {name} {date} {time} {a} {b}
   ========================================================================== */
(function (root) {
  var LANGS = ['FR', 'EN', 'DE', 'NL'];

  // Heure de départ par défaut quand reservations.js n'a pas de champ "heure_depart".
  var DEFAULT_CHECKOUT_TIME = '10:00';

  var ui = {
    FR: {
      title: 'Instructions de départ',
      section: 'Avant votre départ…',
      hello: 'Bonjour {name},', helloAnon: 'Bonjour,',
      intro: "J'espère que vous passez un très bon séjour dans notre logement. Pour votre départ, voici quelques indications :",
      introSheet: 'Merci pour votre séjour ! Avant de partir, merci de penser à :',
      checkoutAt: 'Le logement doit être libéré au plus tard le {date} à {time}.',
      checkoutGeneric: 'Le logement doit être libéré au plus tard à {time} le jour de votre départ.',
      checkoutLabel: 'Heure de départ',
      stay: 'Séjour du {a} au {b}',
      closing: "Nous mettons tout notre cœur et notre énergie pour vous faire vivre de belles vacances et nous espérons que vous avez vécu une belle expérience et que vous repartez avec plein de souvenirs en tête ! Merci beaucoup pour tout.",
      hosts: 'Vos hôtes', signature: 'Sandrine et Stephan',
      mapLink: 'Voir la poubelle sur la carte (itinéraire à pied)',
      photoAlt: 'La poubelle, dans le petit chemin en face de la porte d’entrée',
      qrCaption: 'Scannez ce code pour afficher ces instructions personnalisées (date et heure de départ).',
      qrCaptionMoustiers: 'Scannez ce code pour afficher ces instructions personnalisées (date et heure de départ, plan pour accéder à la poubelle).',
      lang: 'Langue'
    },
    EN: {
      title: 'Departure instructions',
      section: 'Before you leave…',
      hello: 'Hello {name},', helloAnon: 'Hello,',
      intro: 'We hope you are having a wonderful stay in our accommodation. For your departure, here are a few reminders:',
      introSheet: 'Thank you for staying with us! Before you leave, please remember to:',
      checkoutAt: 'The accommodation must be vacated by {time} on {date} at the latest.',
      checkoutGeneric: 'The accommodation must be vacated by {time} on the day of departure.',
      checkoutLabel: 'Check-out time',
      stay: 'Stay from {a} to {b}',
      closing: 'We put all our heart and energy into giving you a lovely holiday, and we hope you had a wonderful experience and are leaving with plenty of memories! Thank you so much for everything.',
      hosts: 'Your hosts', signature: 'Sandrine and Stephan',
      mapLink: 'See the bin on the map (walking directions)',
      photoAlt: 'The bin, in the small lane opposite the front door',
      qrCaption: 'Scan this code to see these instructions personalised for you (check-out date and time).',
      qrCaptionMoustiers: 'Scan this code to see these instructions personalised for you (check-out date and time, map to the bin).',
      lang: 'Language'
    },
    DE: {
      title: 'Hinweise zur Abreise',
      section: 'Vor Ihrer Abreise…',
      hello: 'Hallo {name},', helloAnon: 'Guten Tag,',
      intro: 'Wir hoffen, Sie verbringen einen wunderbaren Aufenthalt in unserer Unterkunft. Zu Ihrer Abreise hier einige Hinweise:',
      introSheet: 'Vielen Dank für Ihren Aufenthalt! Bitte denken Sie vor der Abreise an Folgendes:',
      checkoutAt: 'Die Unterkunft muss spätestens am {date} um {time} Uhr geräumt sein.',
      checkoutGeneric: 'Die Unterkunft muss am Abreisetag spätestens um {time} Uhr geräumt sein.',
      checkoutLabel: 'Abreisezeit',
      stay: 'Aufenthalt vom {a} bis {b}',
      closing: 'Wir geben unser Herz und unsere ganze Energie, damit Sie schöne Ferien erleben, und hoffen, dass Sie einen wunderbaren Aufenthalt hatten und mit vielen Erinnerungen abreisen! Vielen Dank für alles.',
      hosts: 'Ihre Gastgeber', signature: 'Sandrine und Stephan',
      mapLink: 'Mülleimer auf der Karte ansehen (Fußweg)',
      photoAlt: 'Der Mülleimer in der kleinen Gasse gegenüber der Eingangstür',
      qrCaption: 'Scannen Sie diesen Code, um diese Hinweise persönlich angepasst anzuzeigen (Abreisedatum und -zeit).',
      qrCaptionMoustiers: 'Scannen Sie diesen Code, um diese Hinweise persönlich angepasst anzuzeigen (Abreisedatum und -zeit, Karte zum Mülleimer).',
      lang: 'Sprache'
    },
    NL: {
      title: 'Vertrekinstructies',
      section: 'Voordat u vertrekt…',
      hello: 'Hallo {name},', helloAnon: 'Hallo,',
      intro: 'We hopen dat u een heerlijk verblijf heeft in onze accommodatie. Voor uw vertrek hierbij een paar aanwijzingen:',
      introSheet: 'Bedankt voor uw verblijf! Denk er voor vertrek aan om:',
      checkoutAt: 'Het verblijf moet uiterlijk op {date} om {time} uur worden verlaten.',
      checkoutGeneric: 'Het verblijf moet op de dag van vertrek uiterlijk om {time} uur worden verlaten.',
      checkoutLabel: 'Vertrektijd',
      stay: 'Verblijf van {a} tot {b}',
      closing: 'Wij steken al ons hart en onze energie erin om u een mooie vakantie te bezorgen en hopen dat u een prachtige ervaring heeft gehad en met veel herinneringen vertrekt! Hartelijk dank voor alles.',
      hosts: 'Uw gastheren', signature: 'Sandrine en Stephan',
      mapLink: 'Bekijk de vuilnisbak op de kaart (wandelroute)',
      photoAlt: 'De vuilnisbak in het steegje tegenover de voordeur',
      qrCaption: 'Scan deze code om deze instructies persoonlijk voor u te bekijken (vertrekdatum en -tijd).',
      qrCaptionMoustiers: 'Scan deze code om deze instructies persoonlijk voor u te bekijken (vertrekdatum en -tijd, kaart naar de vuilnisbak).',
      lang: 'Taal'
    }
  };

  // Items communs, puis variantes par logement pour "close" et "trash".
  var common = {
    FR: {
      state: ['État du logement', "Merci de laisser le logement dans l'état dans lequel vous l'avez trouvé."],
      linen: ['Linge', 'Rassemblez les serviettes sales.'],
      kitchen: ['Cuisine', 'Laissez la cuisine propre, videz le frigo et le lave-vaisselle, et déposez la vaisselle sale restante dans la machine. Si vous pouvez également lancer le cycle de lavage de la vaisselle, cela nous aiderait énormément !'],
      keys: ['Clés', "Enfin, n'oubliez pas de déposer votre trousseau dans la boîte à clés."]
    },
    EN: {
      state: ['Condition of the accommodation', 'Please leave the accommodation in the same condition as you found it.'],
      linen: ['Linen', 'Please gather the dirty towels.'],
      kitchen: ['Kitchen', 'Leave the kitchen clean, empty the fridge and the dishwasher, and put any remaining dirty dishes in the machine. If you could also start the dishwasher cycle, it would help us enormously!'],
      keys: ['Keys', 'Finally, please leave your keys in the key box.']
    },
    DE: {
      state: ['Zustand der Unterkunft', 'Bitte hinterlassen Sie die Unterkunft in dem Zustand, in dem Sie sie vorgefunden haben.'],
      linen: ['Wäsche', 'Bitte sammeln Sie die schmutzigen Handtücher ein.'],
      kitchen: ['Küche', 'Hinterlassen Sie die Küche sauber, leeren Sie Kühlschrank und Geschirrspüler und stellen Sie das restliche schmutzige Geschirr in die Maschine. Wenn Sie zusätzlich das Spülprogramm starten könnten, würde uns das sehr helfen!'],
      keys: ['Schlüssel', 'Legen Sie zum Schluss Ihren Schlüsselbund bitte in den Schlüsselkasten.']
    },
    NL: {
      state: ['Staat van het verblijf', 'Laat het verblijf alstublieft achter zoals u het heeft aangetroffen.'],
      linen: ['Linnengoed', 'Verzamel de vuile handdoeken.'],
      kitchen: ['Keuken', 'Laat de keuken schoon achter, maak de koelkast en de vaatwasser leeg en zet het resterende vuile servies in de machine. Als u ook het afwasprogramma zou kunnen starten, helpt ons dat enorm!'],
      keys: ['Sleutels', 'Leg tot slot uw sleutels in de sleutelkluis.']
    }
  };

  var specific = {
    moustiers: {
      FR: {
        close: ['Fermetures', "Pensez à bien éteindre les chauffages, la climatisation et les lumières, ainsi qu'à bien fermer les fenêtres et les portes."],
        trash: ['Déchets', "N'oubliez pas de débarrasser vos déchets. La poubelle la plus proche est située dans le petit chemin juste en face de la porte d'entrée (là où se trouve le dépose-minute)."]
      },
      EN: {
        close: ['Closing up', 'Please switch off the heating, air conditioning and lights, and make sure the windows and doors are closed.'],
        trash: ['Rubbish', "Don't forget to take out your rubbish. The nearest bin is in the small lane right opposite the front door (where the drop-off zone is)."]
      },
      DE: {
        close: ['Schließen', 'Bitte schalten Sie Heizung, Klimaanlage und Lichter aus und schließen Sie Fenster und Türen.'],
        trash: ['Müll', 'Vergessen Sie nicht, Ihren Müll zu entsorgen. Der nächste Mülleimer befindet sich in der kleinen Gasse direkt gegenüber der Eingangstür (dort, wo die Absetzzone ist).']
      },
      NL: {
        close: ['Afsluiten', 'Zet de verwarming, airconditioning en verlichting uit en sluit de ramen en deuren goed.'],
        trash: ['Afval', 'Vergeet niet uw afval mee te nemen. De dichtstbijzijnde vuilnisbak staat in het steegje recht tegenover de voordeur (waar ook de stopplaats is).']
      }
    },
    salles: {
      FR: {
        close: ['Fermetures', "Pensez à bien éteindre les chauffages, la climatisation et les lumières, ainsi qu'à bien fermer les fenêtres, les portes et les volets."],
        trash: ['Déchets', "N'oubliez pas de débarrasser vos déchets. Le container de poubelle le plus proche est situé juste en face du portillon du jardin."]
      },
      EN: {
        close: ['Closing up', 'Please switch off the heating, air conditioning and lights, and make sure the windows, doors and shutters are closed.'],
        trash: ['Rubbish', "Don't forget to take out your rubbish. The nearest bin container is right opposite the garden gate."]
      },
      DE: {
        close: ['Schließen', 'Bitte schalten Sie Heizung, Klimaanlage und Lichter aus und schließen Sie Fenster, Türen und Fensterläden.'],
        trash: ['Müll', 'Vergessen Sie nicht, Ihren Müll zu entsorgen. Der nächste Müllcontainer steht direkt gegenüber der Gartenpforte.']
      },
      NL: {
        close: ['Afsluiten', 'Zet de verwarming, airconditioning en verlichting uit en sluit de ramen, deuren en luiken goed.'],
        trash: ['Afval', 'Vergeet niet uw afval mee te nemen. De dichtstbijzijnde afvalcontainer staat recht tegenover het tuinhekje.']
      }
    }
  };

  var ORDER = ['state', 'close', 'linen', 'kitchen', 'trash', 'keys'];

  var logements = {
    moustiers: {
      brand: "Bell'Étoile",
      // Position du POI "Poubelle – Bell'Étoile" (pois.js, id ordures-bell-etoile-moustiers)
      trashPoi: { pos: '43.84694,6.2209', photo: 'images/poubelle-moustiers.jpg' }
    },
    salles: { brand: "Bell'O du Lac" }
  };

  // Liste d'items [{k, b, t}] pour un logement/langue.
  function items(logement, lang) {
    var c = common[lang], s = specific[logement][lang], out = [];
    ORDER.forEach(function (k) {
      var pair = c[k] || s[k];
      out.push({ k: k, b: pair[0], t: pair[1] });
    });
    return out;
  }

  // "10:00" -> "10h00" (FR), "10:00 am" (EN), "10:00" (DE/NL)
  function fmtTime(lang, hhmm) {
    var m = String(hhmm).match(/^(\d{1,2})[:h](\d{2})$/); if (!m) return hhmm;
    var h = +m[1], mi = m[2];
    if (lang === 'FR') return h + 'h' + mi;
    if (lang === 'EN') return ((h % 12) || 12) + ':' + mi + (h < 12 ? ' am' : ' pm');
    return String(h).padStart(2, '0') + ':' + mi;
  }

  var api = { LANGS: LANGS, fmtTime: fmtTime, ui: ui, items: items, logements: logements, DEFAULT_CHECKOUT_TIME: DEFAULT_CHECKOUT_TIME };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.DEPART_CONTENT = api;
})(typeof window !== 'undefined' ? window : this);
