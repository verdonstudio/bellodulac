/* Genere les 3 pages commerciales par logement (additif : ne remplace pas
   logements.html ni index.html?logement=...). Appele par seo-build.js.
   Uniquement des faits presents dans logements.js. */
const PAGES = {
  salles6: {
    slug: 'location-salles-sur-verdon-6-personnes',
    title: "Location vacances 6 personnes aux Salles-sur-Verdon, à 400 m du lac | Bell'O du Lac",
    h1: "Maison de vacances 6 personnes aux Salles-sur-Verdon, à 400 m du lac de Sainte-Croix",
    desc: "Bell'O du Lac 6 personnes : maison avec jardin et chambre vue lac, à 400 m à pied du lac de Sainte-Croix, au cœur des Salles-sur-Verdon (Var). Disponibilités et réservation sur Airbnb.",
    facts: ["Maison pour 6 personnes", "À environ 400 m du lac de Sainte-Croix, à pied", "Jardin", "Chambre avec vue sur le lac", "Restaurants, marché du jeudi matin et base nautique à proximité"],
    guests: 6,
  },
  salles8: {
    slug: 'location-salles-sur-verdon-8-personnes',
    title: "Location vacances 8 personnes avec vue lac aux Salles-sur-Verdon | Bell'O du Lac",
    h1: "Maison de vacances 8 personnes avec vue sur le lac de Sainte-Croix, Les Salles-sur-Verdon",
    desc: "Bell'O du Lac 8 personnes : maison avec jardin, balcon et chambre vue lac, à pied du lac de Sainte-Croix aux Salles-sur-Verdon (Var). Disponibilités et réservation sur Airbnb.",
    facts: ["Maison pour 8 personnes", "Vue sur le lac de Sainte-Croix depuis le balcon", "Jardin", "Chambre avec vue sur le lac", "À pied : lac, restaurants, marché du jeudi, terrain de boules et tennis gratuit"],
    guests: 8,
  },
  moustiers: {
    slug: 'location-moustiers-sainte-marie',
    title: "Location vacances à Moustiers-Sainte-Marie, terrasse vue village | Bell'Étoile",
    h1: "Location de vacances au cœur de Moustiers-Sainte-Marie, avec terrasse et vue sur le village",
    desc: "Bell'Étoile : logement avec terrasse privative panoramique au centre de Moustiers-Sainte-Marie, à pied des restaurants et commerces, dépose-minute devant la porte. Réservation sur Airbnb.",
    facts: ["Au cœur de Moustiers-Sainte-Marie, village classé parmi les plus beaux villages de France", "Terrasse privative panoramique avec vue sur le village", "Dépose-minute juste devant la porte", "À pied des restaurants, commerces et activités", "Lac de Sainte-Croix à environ 10 minutes pour la baignade"],
    guests: null,
  },
};

const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function pageUrls(base) { return Object.values(PAGES).map(p => '/' + p.slug); }

function build(LOG, BASE, OG_IMAGE, SITE_NAME) {
  const out = {};
  for (const [id, p] of Object.entries(PAGES)) {
    const l = LOG.listings[id];
    const url = `${BASE}/${p.slug}`;
    const m = /^(.*?),\s*([^,]+?),\s*(\d{5})$/.exec(l.address || '');
    const others = Object.entries(PAGES).filter(([k]) => k !== id);
    const ld = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'LodgingBusiness', '@id': `${BASE}/logements.html#${l.id}`,
          identifier: String(l.room), name: l.label.FR, description: p.desc, url, image: l.cover,
          inLanguage: ['fr', 'en', 'de', 'nl'],
          address: { '@type': 'PostalAddress', streetAddress: m ? m[1] : l.address, addressLocality: m ? m[2] : undefined, postalCode: m ? m[3] : undefined, addressRegion: "Provence-Alpes-Côte d'Azur", addressCountry: 'FR' },
          geo: { '@type': 'GeoCoordinates', latitude: l.coords.lat, longitude: l.coords.lon },
          sameAs: [`https://www.airbnb.fr/rooms/${l.room}`],
        },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${BASE}/` },
          { '@type': 'ListItem', position: 2, name: 'Nos logements', item: `${BASE}/logements.html` },
          { '@type': 'ListItem', position: 3, name: l.label.FR, item: url },
        ] },
      ],
    };
    const clientData = { id, room: String(l.room), contact: l.host_contact, guests: p.guests,
      label: l.label, desc: l.desc, place: l.place, welcome: l.welcome };
    const rating = l.rating && l.reviews ? `<p class="rating">★ ${String(l.rating).replace('.', ',')} · ${l.reviews} avis sur Airbnb</p>` : '';
    out[p.slug + '.html'] = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(p.title)}</title>
<!-- Page generee par scripts/logement-pages.js (via seo-build.js) - ne pas editer a la main -->
<meta name="description" content="${esc(p.desc)}">
<link rel="canonical" href="${url}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(SITE_NAME)}">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${l.cover}">
<meta property="og:locale" content="fr_FR">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(p.title)}">
<meta name="twitter:description" content="${esc(p.desc)}">
<meta name="twitter:image" content="${l.cover}">
<script type="application/ld+json">${JSON.stringify(ld).replace(/<\//g, '<\\/')}</script>
<script src="/analytics.js"></script>
<style>
:root{--ink:#1e293b;--muted:#64748b;--primary:#0284c7;--primary2:#0369a1;--soft:#f0f9ff;--border:#e2e8f0}
*{box-sizing:border-box}body{margin:0;font-family:Inter,system-ui,sans-serif;color:var(--ink);background:linear-gradient(180deg,#fdfbf7,#fff7ed);min-height:100vh;line-height:1.55}
header{display:flex;justify-content:space-between;align-items:center;padding:10px 16px;max-width:900px;margin:0 auto}
header a{color:var(--primary);text-decoration:none;font-weight:600;font-size:14px}
select{padding:6px 10px;border-radius:999px;border:1px solid var(--border);background:#fff}
main{max-width:900px;margin:0 auto;padding:0 16px 40px}
h1{font-family:Georgia,serif;font-size:1.7rem;line-height:1.25;margin:8px 0 6px}
h2{font-size:1.15rem;margin:28px 0 8px}
.cover{width:100%;max-height:420px;object-fit:cover;border-radius:16px;margin:12px 0}
.rating{font-weight:600;margin:4px 0}
ul{padding-left:20px}li{margin:4px 0}
.card{background:#fff;border:1px solid var(--border);border-radius:16px;padding:16px;margin-top:20px}
form{display:flex;flex-wrap:wrap;gap:10px;align-items:flex-end}
label{display:flex;flex-direction:column;font-size:12px;font-weight:600;color:var(--muted);gap:4px}
input{padding:9px 10px;border:1px solid var(--border);border-radius:10px;font-size:14px}
.btn{display:inline-block;background:var(--primary);color:#fff;border:0;padding:10px 18px;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;cursor:pointer}
.btn:hover{background:var(--primary2)}
.btn.o{background:#fff;color:var(--primary);border:1.5px solid var(--primary)}
.row{display:flex;flex-wrap:wrap;gap:10px;margin-top:12px}
.note{font-size:12px;color:var(--muted);margin-top:8px}
footer{font-size:11px;color:var(--muted);text-align:center;padding:20px 16px}
</style>
</head>
<body>
<header>
  <a id="back" href="/logements.html">← <span id="t-back">Nos logements</span></a>
  <select id="lang" aria-label="Langue"><option>FR</option><option>EN</option><option>DE</option><option>NL</option></select>
</header>
<main>
  <h1 id="h1">${esc(p.h1)}</h1>
  <p id="lead">${esc(l.desc.FR)}. ${esc(l.place.FR)}.</p>
  ${rating}
  <img class="cover" src="${l.cover}" alt="${esc(l.label.FR)}" loading="eager">
  <h2 id="t-facts">Points forts</h2>
  <ul>${p.facts.map(f => `<li>${esc(f)}</li>`).join('')}</ul>
  <h2 id="t-about">Présentation</h2>
  <p id="welcome">${esc(l.welcome.FR)}</p>
  <p><strong>Adresse :</strong> ${esc(l.address)}</p>

  <section class="card" id="avail">
    <h2 id="t-avail" style="margin-top:0">Vérifier les disponibilités</h2>
    <form id="form">
      <label><span id="t-in">Arrivée</span><input type="date" id="cin" required></label>
      <label><span id="t-out">Départ</span><input type="date" id="cout" required></label>
      <label><span id="t-ad">Voyageurs</span><input type="number" id="adults" min="1" max="${p.guests || 8}" value="2" style="width:90px"></label>
      <button class="btn" type="submit" id="t-go">Voir les disponibilités et tarifs sur Airbnb</button>
    </form>
    <p class="note" id="t-note">Vous serez redirigé vers l'annonce Airbnb avec vos dates : la réservation et le paiement se font sur Airbnb.</p>
    <div class="row">
      <a class="btn o" id="listing" href="https://www.airbnb.fr/rooms/${l.room}" target="_blank" rel="noopener" data-track="listing_click"><span id="t-listing">Voir l'annonce</span></a>
      <a class="btn o" id="contact" href="${l.host_contact}" target="_blank" rel="noopener" data-track="contact_host_click"><span id="t-contact">Contacter l'hôte</span></a>
    </div>
  </section>

  <h2 id="t-more">Découvrir aussi</h2>
  <ul>
    <li><a href="/index.html?logement=${id}" id="l-guide">Livret d'accueil et carte des bons plans autour du logement</a></li>
    <li><a href="/evenements.html?logement=${id}" id="l-events">Événements et marchés autour du lac de Sainte-Croix</a></li>
    ${others.map(([k, o]) => `<li><a href="/${o.slug}">${esc(LOG.listings[k].label.FR)}</a></li>`).join('')}
  </ul>
</main>
<footer>© 2026 Bell'O du Lac™ &amp; Bell'Étoile™. Tous droits réservés.</footer>
<script>
(function(){
var D=${JSON.stringify(clientData).replace(/</g, '\\u003c')};
var T={
FR:{back:'Nos logements',facts:'Points forts',about:'Présentation',avail:'Vérifier les disponibilités',inn:'Arrivée',out:'Départ',ad:'Voyageurs',go:'Voir les disponibilités et tarifs sur Airbnb',note:"Vous serez redirigé vers l'annonce Airbnb avec vos dates : la réservation et le paiement se font sur Airbnb.",listing:"Voir l'annonce",contact:"Contacter l'hôte",more:'Découvrir aussi',guide:"Livret d'accueil et carte des bons plans autour du logement",events:'Événements et marchés autour du lac de Sainte-Croix'},
EN:{back:'Our stays',facts:'Highlights',about:'About',avail:'Check availability',inn:'Check-in',out:'Check-out',ad:'Guests',go:'See availability and prices on Airbnb',note:'You will be taken to the Airbnb listing with your dates: booking and payment are handled by Airbnb.',listing:'View listing',contact:'Contact the host',more:'Also discover',guide:'Welcome guide and map of local tips',events:'Events and markets around Lake Sainte-Croix'},
DE:{back:'Unsere Unterkünfte',facts:'Highlights',about:'Beschreibung',avail:'Verfügbarkeit prüfen',inn:'Anreise',out:'Abreise',ad:'Gäste',go:'Verfügbarkeit und Preise auf Airbnb ansehen',note:'Sie werden mit Ihren Daten zur Airbnb-Anzeige weitergeleitet: Buchung und Zahlung erfolgen über Airbnb.',listing:'Anzeige ansehen',contact:'Gastgeber kontaktieren',more:'Auch entdecken',guide:'Willkommensbuch und Karte mit Tipps',events:'Veranstaltungen und Märkte rund um den Lac de Sainte-Croix'},
NL:{back:'Onze verblijven',facts:'Highlights',about:'Beschrijving',avail:'Beschikbaarheid controleren',inn:'Aankomst',out:'Vertrek',ad:'Gasten',go:'Beschikbaarheid en prijzen bekijken op Airbnb',note:'U wordt met uw data doorgestuurd naar de Airbnb-advertentie: boeking en betaling verlopen via Airbnb.',listing:'Bekijk advertentie',contact:'Contact met de gastheer',more:'Ontdek ook',guide:'Welkomstgids en kaart met tips',events:'Evenementen en markten rond het meer van Sainte-Croix'}
};
var $=function(i){return document.getElementById(i)};
var lang=(new URLSearchParams(location.search).get('lang')||'FR').toUpperCase();
if(!T[lang])lang='FR';
function track(n,x){try{window.BDLAnalytics&&BDLAnalytics.track(n,Object.assign({logement:D.id},x||{}))}catch(e){}}
function apply(){
 var t=T[lang];document.documentElement.lang=lang.toLowerCase();$('lang').value=lang;
 $('t-back').textContent=t.back;$('t-facts').textContent=t.facts;$('t-about').textContent=t.about;$('t-avail').textContent=t.avail;
 $('t-in').textContent=t.inn;$('t-out').textContent=t.out;$('t-ad').textContent=t.ad;$('t-go').textContent=t.go;$('t-note').textContent=t.note;
 $('t-listing').textContent=t.listing;$('t-contact').textContent=t.contact;$('t-more').textContent=t.more;$('l-guide').textContent=t.guide;$('l-events').textContent=t.events;
 if(lang!=='FR'){$('lead').textContent=D.desc[lang]+'. '+D.place[lang]+'.';$('welcome').textContent=D.welcome[lang];$('h1').textContent=D.label[lang];}
 var q='?lang='+lang;
 $('back').href='/logements.html'+q;$('l-guide').href='/index.html'+q+'&logement='+D.id;$('l-events').href='/evenements.html'+q+'&logement='+D.id;
}
$('lang').addEventListener('change',function(e){lang=e.target.value;apply();});
apply();
var today=new Date().toISOString().slice(0,10);$('cin').min=today;$('cout').min=today;
$('cin').addEventListener('change',function(){var d=new Date($('cin').value);if(isNaN(d))return;d.setDate(d.getDate()+1);var s=d.toISOString().slice(0,10);$('cout').min=s;if($('cout').value&&$('cout').value<s)$('cout').value=s;});
$('form').addEventListener('submit',function(e){
 e.preventDefault();
 var a=Math.max(1,parseInt($('adults').value,10)||1);
 var u='https://www.airbnb.fr/rooms/'+D.room+'?check_in='+$('cin').value+'&check_out='+$('cout').value+'&adults='+a;
 track('availability_request',{check_in:$('cin').value,check_out:$('cout').value,guests:a});
 window.open(u,'_blank','noopener');
});
document.querySelectorAll('[data-track]').forEach(function(el){el.addEventListener('click',function(){track(el.getAttribute('data-track'),{source:'logement_page'})})});
})();
</script>
</body>
</html>
`;
  }
  return out;
}

module.exports = { PAGES, pageUrls, build };
