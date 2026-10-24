/* Genere les 3 pages commerciales par logement (additif : ne remplace pas
   logements.html ni index.html?logement=...). Appele par seo-build.js.
   Contenu complet des annonces : scripts/airbnb-data.js.
   Parametres d'URL : tous les parametres recus (lang, logement, res, action,
   edatestart, showevents, meteo, ...) sont conserves dans les liens sortants
   (retour, autres logements) et le parametre lang suit le selecteur de langue. */
const AB = require('./airbnb-data.js');
const I18N = require('./airbnb-i18n.js');
// Adresse de reception des demandes : jamais affichee, et assemblee cote navigateur
// au clic (pas d'adresse en clair dans le HTML).
const CONTACT_USER = 'verdonstudio', CONTACT_DOMAIN = 'gmail.com';

const PAGES = {
  salles6: {
    slug: 'location-salles-sur-verdon-6-personnes',
    title: "Location vacances 6 personnes aux Salles-sur-Verdon, à 400 m du lac | Bell'O du Lac",
    h1: "Maison de vacances 6 personnes avec jardin aux Salles-sur-Verdon, à 400 m du lac de Sainte-Croix",
    desc: "Bell'O du Lac 6 personnes : maison rénovée avec jardin, barbecue, climatisation et fibre, chambre vue lac, à 400 m à pied du lac de Sainte-Croix (Les Salles-sur-Verdon, Var). Réservation sur Airbnb ou demande directe.",
  },
  salles8: {
    slug: 'location-salles-sur-verdon-8-personnes',
    title: "Location vacances 8 personnes avec vue lac aux Salles-sur-Verdon | Bell'O du Lac",
    h1: "Maison de vacances 8 personnes avec jardin et vue sur le lac de Sainte-Croix, Les Salles-sur-Verdon",
    desc: "Bell'O du Lac 8 personnes : grande maison rénovée avec jardin, balcon vue lac, 2 salles de bain, climatisation et fibre, à pied du lac de Sainte-Croix (Les Salles-sur-Verdon, Var). Réservation sur Airbnb ou demande directe.",
  },
  moustiers: {
    slug: 'location-moustiers-sainte-marie',
    title: "Location vacances à Moustiers-Sainte-Marie, terrasse vue village | Bell'Étoile",
    h1: "Maison de village avec terrasse panoramique au cœur de Moustiers-Sainte-Marie, 4 personnes",
    desc: "Bell'Étoile : maison de village de 3 étages avec terrasse panoramique et dépose-minute devant la porte, au cœur de Moustiers-Sainte-Marie. Climatisation, fibre, 4 personnes. Réservation sur Airbnb ou demande directe.",
  },
};

const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const para = txt => String(txt).trim().split(/\n\s*\n/).map(p => `<p>${esc(p).replace(/\n/g, '<br>')}</p>`).join('');
const img = (u, w) => /^https?:/.test(u) ? `${u}?im_w=${w}` : u;
const abs = (BASE, u) => /^https?:/.test(u) ? u : BASE + u;
const fr1 = n => String(n).replace('.', ',');

function pageUrls() { return Object.values(PAGES).map(p => '/' + p.slug); }

const CSS = `
:root{--ink:#1e293b;--muted:#64748b;--primary:#0284c7;--primary2:#0369a1;--soft:#f0f9ff;--border:#e2e8f0}
*{box-sizing:border-box}body{margin:0;font-family:Inter,system-ui,sans-serif;color:var(--ink);background:linear-gradient(180deg,#fdfbf7,#fff7ed);min-height:100vh;line-height:1.6}
header.top{display:flex;justify-content:space-between;align-items:center;padding:10px 16px;max-width:1080px;margin:0 auto}
header.top a{color:var(--primary);text-decoration:none;font-weight:600;font-size:14px}
select{padding:6px 10px;border-radius:999px;border:1px solid var(--border);background:#fff}
main{max-width:1080px;margin:0 auto;padding:0 16px 40px}
h1{font-family:Georgia,serif;font-size:1.7rem;line-height:1.25;margin:8px 0 6px}
h2{font-family:Georgia,serif;font-size:1.3rem;margin:34px 0 10px}
h3{font-size:1rem;margin:16px 0 6px}
.stats{color:var(--muted);margin:2px 0 6px}.rating{font-weight:600}
.gallery{display:grid;grid-template-columns:2fr 1fr 1fr;grid-template-rows:200px 200px;gap:8px;border-radius:16px;overflow:hidden;margin:14px 0;position:relative}
.gallery img{width:100%;height:100%;object-fit:cover;display:block;cursor:pointer}
.gallery img:first-child{grid-row:1/3}
.allph{position:absolute;right:12px;bottom:12px;background:#fff;border:1px solid var(--ink);border-radius:10px;padding:8px 14px;font-weight:700;font-size:13px;cursor:pointer}
@media(max-width:700px){.gallery{grid-template-columns:1fr 1fr;grid-template-rows:220px 120px 120px}.gallery img:first-child{grid-column:1/3;grid-row:1}.gallery img:nth-child(n+4){display:none}}
.layout{display:grid;grid-template-columns:1fr 340px;gap:32px;align-items:start}
@media(max-width:900px){.layout{grid-template-columns:1fr}.book{position:static;top:auto;margin-top:24px}.stickybook{display:block}main{padding-bottom:70px}}
.stickybook{display:none;position:fixed;left:0;right:0;bottom:0;z-index:20;background:#fff;border-top:1px solid var(--border);padding:10px 16px;box-shadow:0 -4px 16px rgba(15,23,42,.1)}
.stickybook a{display:block;text-align:center;background:var(--primary);color:#fff;text-decoration:none;font-weight:700;padding:12px;border-radius:999px}
#avail{scroll-margin-top:12px}
.book{position:sticky;top:12px;background:#fff;border:1px solid var(--border);border-radius:16px;padding:16px;box-shadow:0 6px 24px rgba(15,23,42,.08)}
.book h2{margin:0 0 10px;font-size:1.1rem}
.fields{display:grid;grid-template-columns:1fr 1fr;gap:8px}
label{display:flex;flex-direction:column;font-size:12px;font-weight:600;color:var(--muted);gap:3px}
label.full{grid-column:1/3}
input,textarea{padding:9px 10px;border:1px solid var(--border);border-radius:10px;font:inherit;font-size:14px;width:100%}
.btn{display:block;width:100%;text-align:center;background:var(--primary);color:#fff;border:0;padding:11px 16px;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;cursor:pointer;margin-top:10px}
.btn:hover{background:var(--primary2)}.btn.o{background:#fff;color:var(--primary);border:1.5px solid var(--primary)}
.okbox{background:#ecfdf5;border:1px solid #10b981;color:#065f46;border-radius:12px;padding:12px 14px;font-size:14px;margin-top:12px}
.note{font-size:12px;color:var(--muted);margin-top:8px}
.or{text-align:center;font-size:12px;color:var(--muted);margin:10px 0 0}
.hl{display:grid;gap:10px}.hl div{background:#fff;border:1px solid var(--border);border-radius:12px;padding:10px 14px}.hl strong{display:block}
.beds{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px}
.beds figure{margin:0;background:#fff;border:1px solid var(--border);border-radius:12px;overflow:hidden}.beds img{width:100%;height:140px;object-fit:cover;display:block}.beds figcaption{padding:8px 12px;font-size:13px}
.am{columns:2;column-gap:24px}@media(max-width:600px){.am{columns:1}}.am section{break-inside:avoid;margin-bottom:12px}.am ul{margin:0;padding-left:18px}.na{color:var(--muted)}
.cats{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}.cats div{background:#fff;border:1px solid var(--border);border-radius:10px;padding:8px 12px;font-size:13px}.cats b{display:block;font-size:1.1rem}
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px}
.pill{background:#fff;border:1px solid var(--border);border-radius:16px;overflow:hidden;box-shadow:0 2px 10px rgba(15,23,42,.05)}
.pill img.cv{width:100%;height:160px;object-fit:cover;display:block}.pill .b{padding:14px}.pill .t{display:flex;align-items:center;gap:8px}.pill .t img{width:24px;height:24px;border-radius:50%;object-fit:cover}
.pill h3{margin:0;font-size:16px}.pill .pl{color:var(--primary);font-weight:600;font-size:12.5px;margin:4px 0}.pill .d{font-size:13px;color:var(--muted);margin:4px 0 8px}
.pill a.go{display:inline-block;background:var(--primary);color:#fff;text-decoration:none;font-weight:700;font-size:13px;padding:8px 16px;border-radius:999px;margin-top:8px}
dialog{border:0;padding:0;width:min(960px,96vw);height:92vh;border-radius:12px}dialog::backdrop{background:rgba(0,0,0,.7)}
dialog .x{position:sticky;top:0;display:flex;justify-content:space-between;align-items:center;background:#fff;padding:8px 14px;border-bottom:1px solid var(--border);z-index:2}
dialog .x button{border:1px solid var(--ink);background:#fff;border-radius:8px;padding:6px 12px;cursor:pointer;font-weight:700}
dialog .pics{padding:10px;display:grid;gap:10px}dialog .pics img{width:100%;border-radius:8px;display:block}
footer{font-size:11px;color:var(--muted);text-align:center;padding:20px 16px}
`;

function build(LOG, BASE, OG_IMAGE, SITE_NAME) {
  const out = {};
  const host = AB.host;
  for (const [id, p] of Object.entries(PAGES)) {
    const l = LOG.listings[id];
    const a = AB[id];
    const url = `${BASE}/${p.slug}`;
    const m = /^(.*?),\s*([^,]+?),\s*(\d{5})$/.exec(l.address || '');
    const others = Object.entries(PAGES).filter(([k]) => k !== id);
    const allAm = [].concat(...a.amenities.map(g => g[1]));
    const ld = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'LodgingBusiness', '@id': `${BASE}/logements.html#${l.id}`,
          identifier: String(l.room), name: l.label.FR, description: p.desc, url,
          image: a.photos.slice(0, 8).map(u => abs(BASE, img(u, 1440))),
          inLanguage: ['fr', 'en', 'de', 'nl'],
          address: { '@type': 'PostalAddress', streetAddress: m ? m[1] : l.address, addressLocality: m ? m[2] : undefined, postalCode: m ? m[3] : undefined, addressRegion: "Provence-Alpes-Côte d'Azur", addressCountry: 'FR' },
          geo: { '@type': 'GeoCoordinates', latitude: l.coords.lat, longitude: l.coords.lon },
          amenityFeature: allAm.map(n => ({ '@type': 'LocationFeatureSpecification', name: n, value: true })),
          sameAs: [`https://www.airbnb.fr/rooms/${l.room}`],
        },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${BASE}/` },
          { '@type': 'ListItem', position: 2, name: 'Nos logements', item: `${BASE}/logements.html` },
          { '@type': 'ListItem', position: 3, name: l.label.FR, item: url },
        ] },
      ],
    };
    const st = a.stats;
    const stats = `${st.guests} voyageurs · ${st.bedrooms} chambres · ${st.beds} lits · ${st.baths} salle${st.baths > 1 ? 's' : ''} de bain`;
    const clientData = { id, room: String(l.room), maxGuests: st.guests, title: l.label.FR, 
      photos: a.photos, u: CONTACT_USER.split('').reverse().join(''), d: CONTACT_DOMAIN };
    const baseDir = a.photos[0].replace(/[^/]+$/, '');

    // Contenu principal (colonne de gauche) dans une langue donnee : FR = source (airbnb-data.js),
    // EN/DE/NL = airbnb-i18n.js (textes propres au logement) + dict (libelles communs).
    const tr = (txt, lang) => lang === 'FR' ? txt : ((I18N.dict[txt] && I18N.dict[txt][lang]) || txt);
    const T10 = I18N[id];
    function content(lang) {
      const c = lang === 'FR' ? { highlights: a.highlights, description: a.description, sections: a.sections, locationText: a.locationText } : T10[lang];
      const fr = lang === 'FR';
      const hostLine = fr
        ? `<strong>${esc(host.name)}</strong> · Superhôte · ${host.years} ans en tant qu'hôte · ${fr1(host.rating)} / 5 (${host.reviews} évaluations)<br>Langue parlée : ${esc(host.languages)} · ${esc(host.response)}`
        : `<strong>${esc(host.name)}</strong> · ${tr('Superhôte', lang)} · ${host.years} ${tr("ans en tant qu'hôte", lang)} · ${host.rating} / 5 (${host.reviews} ${tr('évaluations', lang)})<br>${tr('Langue parlée : Français', lang)} · ${tr(host.response, lang)}`;
      const rn = n => fr ? fr1(n) : String(n);
      return `
    <p id="lead">${esc(l.desc[lang])}. ${esc(l.place[lang])}.</p>

    <h2>${tr('Points forts', lang)}</h2>
    <div class="hl">${c.highlights.map(h => `<div><strong>${esc(h[0])}</strong>${esc(h[1])}</div>`).join('')}</div>

    <h2>${tr('Description', lang)}</h2>
    ${para(c.description)}
    ${c.sections.map(sec => `<h3>${esc(fr ? tr(sec[0], 'FR') : tr(sec[0], lang))}</h3>${para(sec[1])}`).join('')}
    <p class="note">${tr("Numéro d'enregistrement", lang)} : ${esc(a.registration)}</p>

    <h2>${tr('Où vous dormirez', lang)}</h2>
    <div class="beds">${a.bedrooms.map(b => `<figure><img src="${img(a.photoFor(b[2]) || (baseDir + b[2]), 720)}" alt="${esc(tr(b[3] || b[0], lang))}" loading="lazy"><figcaption><strong>${esc(tr(b[0], lang))}</strong><br>${esc(tr(b[1], lang))}</figcaption></figure>`).join('')}</div>

    <h2>${tr('Ce que propose ce logement', lang)}</h2>
    <div class="am">${a.amenities.map(g => `<section><h3>${esc(tr(g[0], lang))}</h3><ul>${g[1].map(x => `<li>${esc(tr(x, lang))}</li>`).join('')}</ul></section>`).join('')}
    <section><h3>${tr('Non disponible', lang)}</h3><ul class="na">${a.notIncluded.map(x => `<li>${esc(tr(x, lang))}</li>`).join('')}</ul></section></div>

    <h2>${tr('Évaluations', lang)} (${rn(a.rating)} / 5 · ${a.reviews} ${tr('avis Airbnb', lang)})</h2>
    <div class="cats">${a.ratingCats.map(rc => `<div>${esc(tr(rc[0], lang))}<b>${rn(rc[1].toFixed(1))}</b></div>`).join('')}</div>

    <h2>${tr('Où se situe le logement', lang)}</h2>
    <p>${esc(c.locationText)}</p>

    <h2>${tr('Votre hôte', lang)}</h2>
    <p>${hostLine}</p>
  `;
    }
    const statsL = lang => {
      const f = n => tr(n, lang);
      return `${st.guests} ${f('voyageurs')} · ${st.bedrooms} ${f('chambres')} · ${st.beds} ${f('lits')} · ${st.baths} ${st.baths > 1 ? f('salles de bain') : f('salle de bain')}`;
    };
    const langData = { h1: { FR: p.h1 }, stats: { FR: stats }, html: {} };
    for (const lg of ['EN', 'DE', 'NL']) { langData.h1[lg] = T10[lg].h1; langData.stats[lg] = statsL(lg); langData.html[lg] = content(lg); }
    clientData.lang = langData;
    langData.pills = {};
    for (const [k] of others) { const ol = LOG.listings[k]; langData.pills[k] = { title: ol.title, place: ol.place, desc: ol.desc }; }

    out[p.slug + '.html'] = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(p.title)}</title>
<!-- Page generee par scripts/logement-pages.js + scripts/airbnb-data.js (via seo-build.js) - ne pas editer a la main -->
<meta name="description" content="${esc(p.desc)}">
<link rel="canonical" href="${url}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(SITE_NAME)}">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${abs(BASE, img(a.photos[0], 1200))}">
<meta property="og:locale" content="fr_FR">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(p.title)}">
<meta name="twitter:description" content="${esc(p.desc)}">
<meta name="twitter:image" content="${abs(BASE, img(a.photos[0], 1200))}">
<script type="application/ld+json">${JSON.stringify(ld).replace(/<\//g, '<\\/')}</script>
<script src="/analytics.js"></script>
<style>${CSS}</style>
</head>
<body>
<header class="top">
  <a id="back" href="/logements.html">← <span id="t-back">Nos logements</span></a>
  <select id="lang" aria-label="Langue"><option>FR</option><option>EN</option><option>DE</option><option>NL</option></select>
</header>
<main>
  <h1 id="h1">${esc(p.h1)}</h1>
  <p class="stats" id="stats">${esc(stats)}</p>
  <p class="rating">★ ${fr1(a.rating)} · ${a.reviews} <span id="t-reviews">avis sur Airbnb</span>${a.guestFavorite ? ' · <span id="t-fav">Coup de cœur voyageurs</span>' : ''}</p>

  <div class="gallery" id="gallery">
    ${a.photos.slice(0, 5).map((u, i) => `<img src="${img(u, 720)}" alt="${esc(l.label.FR)} - photo ${i + 1}" data-i="${i}"${i ? ' loading="lazy"' : ''}>`).join('\n    ')}
    <button class="allph" id="allph" type="button"><span id="t-allph">Voir les ${a.photos.length} photos</span></button>
  </div>

  <div class="layout">
  <div class="content" id="content">${content('FR')}</div>

  <aside class="book" id="avail">
    <h2 id="t-book">Réserver ce logement</h2>
    <form id="form">
      <div class="fields">
        <label><span id="t-in">Arrivée</span><input type="date" id="cin" required></label>
        <label><span id="t-out">Départ</span><input type="date" id="cout" required></label>
        <label class="full"><span id="t-ad">Voyageurs</span><input type="number" id="adults" min="1" max="${st.guests}" value="2"></label>
      </div>
      <button class="btn" type="submit" id="t-airbnb">Réserver sur Airbnb</button>
      <p class="or" id="t-or">ou</p>
      <details id="contactbox">
        <summary class="btn o" id="t-contact" style="list-style:none">Nous contacter pour réserver</summary>
        <div class="fields" style="margin-top:10px">
          <label class="full"><span id="t-name">Nom</span><input type="text" id="cname" autocomplete="name"></label>
          <label><span>Email</span><input type="email" id="cmail" autocomplete="email"></label>
          <label><span id="t-tel">Téléphone</span><input type="tel" id="ctel" autocomplete="tel"></label>
          <label class="full"><span id="t-msg">Message (facultatif)</span><textarea id="cmsg" rows="3"></textarea></label>
        </div>
        <input type="text" id="cweb" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px">
        <button class="btn" type="button" id="t-send">Envoyer la demande par email</button>
        <p class="note" id="t-status" role="status" style="font-weight:600"></p>
        <p class="note" id="t-mailnote">Nous vous répondons rapidement par email ou téléphone.</p>
      </details>
    </form>
    <p class="note" id="t-note">Réservation et paiement sécurisés sur Airbnb. D'autres moyens de réserver arrivent bientôt.</p>
  </aside>
  </div>

  <h2 id="t-more">Découvrir aussi</h2>
  <div class="cards">
    ${others.map(([k, o]) => { const ol = LOG.listings[k], oa = AB[k]; return `<div class="pill" data-lg="${k}"><img class="cv" src="${ol.cover}" alt="${esc(ol.title.FR)}" loading="lazy"><div class="b"><div class="t"><img src="${ol.logo}" alt=""><h3 class="pt">${esc(ol.title.FR)}</h3></div><p class="pl">${esc(ol.place.FR)}</p><p class="d">${esc(ol.desc.FR)}</p><p class="rating">★ ${fr1(oa.rating)} · ${oa.reviews} <span class="pw">avis</span></p><a class="go" data-lg="${k}" data-slug="${o.slug}" href="/${o.slug}">Voir ce logement</a></div></div>`; }).join('')}
  </div>
</main>
<div class="stickybook"><a href="#avail" id="t-stick">Réserver ce logement</a></div>
<footer>© 2026 Bell'O du Lac™ &amp; Bell'Étoile™. Tous droits réservés.</footer>

<dialog id="dlg"><div class="x"><strong>${esc(l.label.FR)}</strong><button type="button" id="dclose">✕</button></div><div class="pics" id="pics"></div></dialog>

<script>
(function(){
var D=${JSON.stringify(clientData).replace(/</g, '\\u003c')};
var T={
FR:{revw:'avis',back:'Nos logements',reviews:'avis sur Airbnb',fav:'Coup de cœur voyageurs',allph:'Voir les '+D.photos.length+' photos',hl:'Points forts',about:'Description',frnote:'',sleep:'Où vous dormirez',am:'Ce que propose ce logement',na:'Non disponible',rat:'Évaluations',loc:'Où se situe le logement',host:'Votre hôte',book:'Réserver ce logement',inn:'Arrivée',out:'Départ',ad:'Voyageurs',airbnb:'Réserver sur Airbnb',or:'ou',contact:'Nous contacter pour réserver',name:'Nom',tel:'Téléphone',msg:'Message (facultatif)',send:'Envoyer la demande par email',mailnote:"Nous vous répondons rapidement par email ou téléphone.",sending:'Envoi en cours…',sent:"Merci ! Votre demande est bien envoyée. Nous vous contacterons très prochainement pour vous communiquer les modalités de la réservation.",fail:"L'envoi automatique n'a pas abouti : votre messagerie va s'ouvrir avec la demande pré-remplie.",needmail:'Merci de renseigner votre nom et un email valide.',note:"Réservation et paiement sécurisés sur Airbnb. D'autres moyens de réserver arrivent bientôt.",more:'Découvrir aussi',go:'Voir ce logement',reg:"Numéro d'enregistrement",mailsub:'Demande de réservation',mailhello:'Bonjour, je souhaite réserver',errdates:'Merci de renseigner vos dates.'},
EN:{revw:'reviews',back:'Our stays',reviews:'reviews on Airbnb',fav:'Guest favourite',allph:'Show all '+D.photos.length+' photos',hl:'Highlights',about:'About this place',frnote:'Detailed description in French.',sleep:"Where you'll sleep",am:'What this place offers',na:'Not available',rat:'Ratings',loc:'Where it is',host:'Your host',book:'Book this stay',inn:'Check-in',out:'Check-out',ad:'Guests',airbnb:'Book on Airbnb',or:'or',contact:'Contact us to book',name:'Name',tel:'Phone',msg:'Message (optional)',send:'Send the request by email',mailnote:'We will reply quickly by email or phone.',sending:'Sending…',sent:"Thank you! Your request has been sent. We will contact you very soon with the booking details.",fail:'Automatic sending failed: your email app will open with the request pre-filled.',needmail:'Please enter your name and a valid email.',note:'Secure booking and payment on Airbnb. More ways to book are coming soon.',more:'Also discover',go:'View this stay',reg:'Registration number',mailsub:'Booking request',mailhello:'Hello, I would like to book',errdates:'Please enter your dates.'},
DE:{revw:'Bewertungen',back:'Unsere Unterkünfte',reviews:'Bewertungen auf Airbnb',fav:'Liebling unter den Gästen',allph:'Alle '+D.photos.length+' Fotos ansehen',hl:'Highlights',about:'Beschreibung',frnote:'Ausführliche Beschreibung auf Französisch.',sleep:'Schlafmöglichkeiten',am:'Ausstattung',na:'Nicht vorhanden',rat:'Bewertungen',loc:'Lage',host:'Ihr Gastgeber',book:'Diese Unterkunft buchen',inn:'Anreise',out:'Abreise',ad:'Gäste',airbnb:'Auf Airbnb buchen',or:'oder',contact:'Kontaktieren Sie uns zum Buchen',name:'Name',tel:'Telefon',msg:'Nachricht (optional)',send:'Anfrage per E-Mail senden',mailnote:'Wir antworten Ihnen schnell per E-Mail oder Telefon.',sending:'Wird gesendet…',sent:"Danke! Ihre Anfrage wurde gesendet. Wir melden uns in Kürze bei Ihnen mit den Details zur Buchung.",fail:'Der automatische Versand ist fehlgeschlagen: Ihr E-Mail-Programm öffnet sich mit der vorausgefüllten Anfrage.',needmail:'Bitte Namen und gültige E-Mail angeben.',note:'Sichere Buchung und Zahlung über Airbnb. Weitere Buchungswege folgen bald.',more:'Auch entdecken',go:'Unterkunft ansehen',reg:'Registrierungsnummer',mailsub:'Buchungsanfrage',mailhello:'Guten Tag, ich möchte buchen',errdates:'Bitte geben Sie Ihre Daten an.'},
NL:{revw:'beoordelingen',back:'Onze verblijven',reviews:'beoordelingen op Airbnb',fav:'Gastenfavoriet',allph:'Alle '+D.photos.length+' foto’s bekijken',hl:'Highlights',about:'Beschrijving',frnote:'Uitgebreide beschrijving in het Frans.',sleep:'Waar u slaapt',am:'Voorzieningen',na:'Niet beschikbaar',rat:'Beoordelingen',loc:'Locatie',host:'Uw gastheer',book:'Dit verblijf boeken',inn:'Aankomst',out:'Vertrek',ad:'Gasten',airbnb:'Boeken via Airbnb',or:'of',contact:'Neem contact op om te boeken',name:'Naam',tel:'Telefoon',msg:'Bericht (optioneel)',send:'Aanvraag per e-mail versturen',mailnote:'Wij antwoorden snel per e-mail of telefoon.',sending:'Bezig met verzenden…',sent:"Dank u! Uw aanvraag is verzonden. Wij nemen zeer binnenkort contact met u op over de boekingsmodaliteiten.",fail:'Automatisch verzenden is mislukt: uw e-mailprogramma opent met de ingevulde aanvraag.',needmail:'Vul uw naam en een geldig e-mailadres in.',note:'Veilig boeken en betalen via Airbnb. Meer boekingsmogelijkheden volgen binnenkort.',more:'Ontdek ook',go:'Verblijf bekijken',reg:'Registratienummer',mailsub:'Boekingsaanvraag',mailhello:'Hallo, ik wil graag boeken',errdates:'Vul uw data in.'}
};
var $=function(i){return document.getElementById(i)};
// --- Parametres d'URL : on conserve TOUS les parametres recus (res, action, edatestart,
// showevents, meteo, from...). lang suit le selecteur ; logement est force pour les liens sortants.
var qs=new URLSearchParams(location.search);
var frHtml=null;
var lang=(qs.get('lang')||'FR').toUpperCase();
if(!T[lang])lang='FR';
function query(logement){var p=new URLSearchParams(qs.toString());p.set('lang',lang);p.set('logement',logement||D.id);return p.toString();}
function syncUrl(){qs.set('lang',lang);try{history.replaceState(null,'',location.pathname+'?'+qs.toString()+location.hash);}catch(e){}}
function track(n,x){try{window.BDLAnalytics&&BDLAnalytics.track(n,Object.assign({logement:D.id},x||{}))}catch(e){}}
function set(id,k){var e=$(id);if(e)e.textContent=T[lang][k]}
function apply(){
 var t=T[lang];document.documentElement.lang=lang.toLowerCase();$('lang').value=lang;
 [['t-back','back'],['t-reviews','reviews'],['t-fav','fav'],['t-allph','allph'],['t-hl','hl'],['t-about','about'],['t-sleep','sleep'],['t-am','am'],['t-na','na'],['t-loc','loc'],['t-host','host'],['t-book','book'],['t-stick','book'],['t-in','inn'],['t-out','out'],['t-ad','ad'],['t-airbnb','airbnb'],['t-or','or'],['t-contact','contact'],['t-name','name'],['t-tel','tel'],['t-msg','msg'],['t-send','send'],['t-mailnote','mailnote'],['t-note','note'],['t-more','more'],['t-reg','reg']].forEach(function(p){set(p[0],p[1])});
 document.querySelectorAll('.pill a.go').forEach(function(a){a.textContent=t.go;a.href='/'+a.dataset.slug+'?'+query(a.dataset.lg);});
 var c=$('content');
 if(frHtml===null)frHtml=c.innerHTML;
 c.innerHTML=lang==='FR'?frHtml:D.lang.html[lang];
 $('h1').textContent=D.lang.h1[lang];$('stats').textContent=D.lang.stats[lang];
 document.querySelectorAll('.pill').forEach(function(pl){var k=pl.dataset.lg,d=D.lang.pills[k];pl.querySelector('.pt').textContent=d.title[lang];pl.querySelector('.pl').textContent=d.place[lang];pl.querySelector('.d').textContent=d.desc[lang];pl.querySelector('.pw').textContent=t.revw;});
 $('back').href='/logements.html?'+query();
 syncUrl();
}
$('lang').addEventListener('change',function(e){lang=e.target.value;apply();});
apply();
var today=new Date().toISOString().slice(0,10);$('cin').min=today;$('cout').min=today;
$('cin').addEventListener('change',function(){var d=new Date($('cin').value);if(isNaN(d))return;d.setDate(d.getDate()+1);var s=d.toISOString().slice(0,10);$('cout').min=s;if($('cout').value&&$('cout').value<s)$('cout').value=s;});
function guests(){return Math.min(D.maxGuests,Math.max(1,parseInt($('adults').value,10)||1))}
$('form').addEventListener('submit',function(e){
 e.preventDefault();
 var g=guests();
 var u='https://www.airbnb.fr/rooms/'+D.room+'?check_in='+$('cin').value+'&check_out='+$('cout').value+'&adults='+g;
 track('availability_request',{check_in:$('cin').value,check_out:$('cout').value,guests:g,channel:'airbnb'});
 window.open(u,'_blank','noopener');
});
$('t-send').addEventListener('click',function(){
 var t=T[lang],g=guests(),st=$('t-status'),btn=$('t-send');
 if(!$('cin').value||!$('cout').value){alert(t.errdates);$('cin').focus();return;}
 if(!$('cname').value.trim()||!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test($('cmail').value.trim())){alert(t.needmail);return;}
 function viaMailto(){
  var body=t.mailhello+' : '+D.title+'\\n\\n'+t.inn+' : '+$('cin').value+'\\n'+t.out+' : '+$('cout').value+'\\n'+t.ad+' : '+g+'\\n\\n'+t.name+' : '+$('cname').value+'\\nEmail : '+$('cmail').value+'\\n'+t.tel+' : '+$('ctel').value+(($('cmsg').value)?'\\n\\n'+$('cmsg').value:'');
  location.href='mailto:'+D.u.split('').reverse().join('')+'@'+D.d+'?subject='+encodeURIComponent(t.mailsub+' - '+D.title+' ('+$('cin').value+' → '+$('cout').value+')')+'&body='+encodeURIComponent(body);
 }
 btn.disabled=true;st.textContent=t.sending;
 fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({logement:D.title,cin:$('cin').value,cout:$('cout').value,guests:g,name:$('cname').value.trim(),email:$('cmail').value.trim(),phone:$('ctel').value.trim(),message:$('cmsg').value,lang:lang,page:location.href.split('?')[0],website:$('cweb').value})})
 .then(function(r){return r.json().catch(function(){return {ok:false}})})
 .then(function(j){
  if(j&&j.ok){st.textContent=t.sent;st.className='okbox';btn.style.display='none';track('availability_request',{check_in:$('cin').value,check_out:$('cout').value,guests:g,channel:'email_form'});}
  else{st.textContent=t.fail;btn.disabled=false;track('availability_request',{guests:g,channel:'email_fallback'});viaMailto();}
 })
 .catch(function(){st.textContent=t.fail;btn.disabled=false;viaMailto();});
});
$('contactbox').addEventListener('toggle',function(){if($('contactbox').open)track('contact_form_open',{})});
document.querySelectorAll('.pill a.go').forEach(function(a){a.addEventListener('click',function(){track('related_listing_click',{target:a.dataset.lg})})});
// Galerie : fenetre avec toutes les photos
var dlg=$('dlg'),pics=$('pics'),built=false;
function openGallery(i){
 if(!built){built=true;pics.innerHTML=D.photos.map(function(u,k){return '<img loading="lazy" id="ph'+k+'" src="'+(/^https?:/.test(u)?u+'?im_w=1080':u)+'" alt="'+D.title+' - photo '+(k+1)+'">'}).join('');}
 if(dlg.showModal)dlg.showModal();
 track('gallery_open',{});
 var el=$('ph'+(i||0));if(el)setTimeout(function(){el.scrollIntoView()},50);
}
$('allph').addEventListener('click',function(){openGallery(0)});
document.querySelectorAll('#gallery img').forEach(function(im){im.addEventListener('click',function(){openGallery(+im.dataset.i)})});
$('dclose').addEventListener('click',function(){dlg.close()});
dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});
})();
</script>
</body>
</html>
`;
  }
  return out;
}

module.exports = { PAGES, pageUrls, build };
