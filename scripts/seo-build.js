#!/usr/bin/env node
/* ==========================================================================
   seo-build.js — genere/met a jour tout ce qui concerne le referencement
   (Google + moteurs IA) a partir des donnees du site.

   Usage (depuis la racine du repo) :  node scripts/seo-build.js
   A relancer apres chaque modification de logements.js / pois.js / evenements.js,
   puis commit + deploiement.

   Ce que le script ecrit :
     - sitemap.xml, llms.txt                (racine)
     - dans chaque page HTML publique, entre <!-- SEO:START --> et <!-- SEO:END --> :
         canonical, description, Open Graph, Twitter, favicon, JSON-LD
     - pages perso/techniques : meta robots noindex
     - index.html : bloc <noscript> (contenu texte lisible sans JavaScript, utile
       aux robots IA qui n'executent pas le JS), entre <!-- SEO-BODY:START/END -->
   Le script est idempotent : on peut le relancer sans dupliquer les blocs.
   robots.txt est un fichier statique (non genere) : le modifier a la main.
   ========================================================================== */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
// Domaine canonique unique. Le site existe aussi sur bellodulac.netlify.app (images
// encore servies depuis la-bas) : ce domaine-la ne doit pas etre indexe en double,
// d'ou le <link rel="canonical"> vers le domaine ci-dessous sur toutes les pages.
const BASE = 'https://bellodulac.vercel.app';
const OG_IMAGE = 'https://bellodulac.netlify.app/images/moustiers-terrasse.jpg';
const SITE_NAME = "Bell'O du Lac & Bell'Étoile";

function loadWindowData(file) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), sandbox);
  return sandbox.window;
}
const LOG = loadWindowData('logements.js').LOGEMENTS_DATA;
const POIW = loadWindowData('pois.js');
const EVT = loadWindowData('evenements.js').EVENTS_DATA;

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const today = new Date().toISOString().slice(0, 10);

// ---------- pages publiques (indexables) ----------
const PUBLIC_PAGES = {
  'index.html': {
    url: '/',
    desc: "Livret d'accueil numérique pour vos séjours dans le Verdon : logements à Moustiers-Sainte-Marie et aux Salles-sur-Verdon, infos pratiques, carte des bons plans, restaurants, événements et météo.",
  },
  'logements.html': {
    url: '/logements.html',
    desc: "Nos 3 logements dans le Verdon : Bell'Étoile à Moustiers-Sainte-Marie (terrasse vue village) et Bell'O du Lac aux Salles-sur-Verdon, près du lac de Sainte-Croix.",
  },
  'evenements.html': {
    url: '/evenements.html',
    desc: "Agenda des marchés, brocantes, fêtes et animations autour du lac de Sainte-Croix et des gorges du Verdon : Moustiers-Sainte-Marie, Les Salles-sur-Verdon, Aups, Riez, Aiguines.",
  },
  'infos.html': {
    url: '/infos.html',
    desc: "Infos pratiques pour votre séjour dans le Verdon : arrivée, départ, parking, déchets, contacts utiles.",
  },
  'commerces.html': {
    url: '/commerces.html',
    desc: "Commerces et services à Moustiers-Sainte-Marie et aux Salles-sur-Verdon : boulangeries, boucheries, supermarchés, pharmacies.",
  },
  'galerie.html': {
    url: '/galerie.html',
    desc: "Galerie photos du Verdon : Moustiers-Sainte-Marie, lac de Sainte-Croix, Les Salles-sur-Verdon.",
  },
  'panorama.html': {
    url: '/panorama.html',
    desc: "Panorama interactif à 360° du lac de Sainte-Croix et des environs de Moustiers-Sainte-Marie, avec points d'intérêt.",
  },
  'moustiers_backintime.html': {
    url: '/moustiers_backintime.html',
    desc: "Remonter le temps à Moustiers-Sainte-Marie : le village hier et aujourd'hui.",
  },
  'salles_backintime.html': {
    url: '/salles_backintime.html',
    desc: "Remonter le temps aux Salles-sur-Verdon : le village englouti par le lac de Sainte-Croix, hier et aujourd'hui.",
  },
  'lac_backintime.html': {
    url: '/lac_backintime.html',
    desc: "Remonter le temps au lac de Sainte-Croix : avant et après la mise en eau.",
  },
};

// ---------- pages perso / techniques (a ne PAS indexer) ----------
// home.html et tv.html affichent le nom du voyageur du jour ; display.html et
// highlights.html sont des liens de reservation personnalises.
const NOINDEX_PAGES = ['display.html', 'highlights.html', 'home.html', 'tv.html', 'video.html', 'url-generator.html'];

function replaceBlock(html, start, end, block, insertAfterRe) {
  const re = new RegExp(`[ \\t]*${start}[\\s\\S]*?${end}\\n?`, 'm');
  html = html.replace(re, '');
  if (!block) return html;
  const m = insertAfterRe.exec(html);
  if (!m) throw new Error('point d\'insertion introuvable pour ' + start);
  const at = m.index + m[0].length;
  return html.slice(0, at) + '\n' + block + html.slice(at);
}

function titleOf(html) {
  const m = /<title>([\s\S]*?)<\/title>/i.exec(html);
  return m ? m[1].trim() : SITE_NAME;
}

// ---------- JSON-LD ----------
function listingsJsonLd() {
  const out = [];
  for (const l of Object.values(LOG.listings)) {
    const m = /^(.*?),\s*([^,]+?),\s*(\d{5})$/.exec(l.address || '');
    const node = {
      '@type': 'VacationRental',
      '@id': `${BASE}/logements.html#${l.id}`,
      name: l.label.FR,
      description: l.desc.FR,
      url: `${BASE}/logements.html`,
      image: l.cover,
      inLanguage: ['fr', 'en', 'de', 'nl'],
      address: {
        '@type': 'PostalAddress',
        streetAddress: m ? m[1] : l.address,
        addressLocality: m ? m[2] : undefined,
        postalCode: m ? m[3] : undefined,
        addressCountry: 'FR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: l.coords.lat, longitude: l.coords.lon },
    };
    if (l.room) node.sameAs = [`https://www.airbnb.fr/rooms/${l.room}`];
    out.push(node);
  }
  return out;
}

function websiteJsonLd() {
  return {
    '@type': 'WebSite',
    '@id': `${BASE}/#website`,
    name: SITE_NAME,
    url: `${BASE}/`,
    inLanguage: ['fr', 'en', 'de', 'nl'],
  };
}

function eventsJsonLd() {
  const evts = (EVT.events || [])
    .filter(e => e.date && e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 60);
  const pick = (v, lang) => (v && typeof v === 'object') ? (v[lang] || v.FR || v.EN || '') : (v || '');
  return evts.map(e => {
    const url = pick(e.url, 'FR');
    const o = {
      '@type': 'Event',
      name: pick(e.title, 'FR'),
      startDate: e.date,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: {
        '@type': 'Place',
        name: e.place,
        address: { '@type': 'PostalAddress', addressLocality: e.place, addressCountry: 'FR' },
      },
      inLanguage: 'fr',
    };
    const d = pick(e.details, 'FR');
    if (d) o.description = d;
    if (e.img) o.image = e.img;
    if (url) o.url = url;
    return o;
  });
}

function jsonLdScript(graph) {
  const data = { '@context': 'https://schema.org', '@graph': graph };
  // "</" echappe pour ne jamais fermer la balise <script> par accident
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/<\//g, '<\\/')}</script>`;
}

// ---------- bloc <head> ----------
function headBlock(file, cfg, html) {
  const title = esc(titleOf(html));
  const canon = BASE + cfg.url;
  const lines = [
    '<!-- SEO:START (genere par scripts/seo-build.js - ne pas editer a la main) -->',
    `<meta name="description" content="${esc(cfg.desc)}">`,
    `<link rel="canonical" href="${canon}">`,
    `<link rel="icon" href="/favicon.svg" type="image/svg+xml">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}">`,
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${esc(cfg.desc)}">`,
    `<meta property="og:url" content="${canon}">`,
    `<meta property="og:image" content="${OG_IMAGE}">`,
    `<meta property="og:locale" content="fr_FR">`,
    `<meta property="og:locale:alternate" content="en_US">`,
    `<meta property="og:locale:alternate" content="de_DE">`,
    `<meta property="og:locale:alternate" content="nl_NL">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${title}">`,
    `<meta name="twitter:description" content="${esc(cfg.desc)}">`,
    `<meta name="twitter:image" content="${OG_IMAGE}">`,
  ];
  if (file === 'index.html') {
    lines.push(jsonLdScript([websiteJsonLd(), ...listingsJsonLd()]));
  } else if (file === 'logements.html') {
    lines.push(jsonLdScript(listingsJsonLd()));
  } else if (file === 'evenements.html') {
    lines.push(jsonLdScript(eventsJsonLd()));
  }
  lines.push('<!-- SEO:END -->');
  return lines.map(l => '  ' + l).join('\n');
}

function noindexBlock() {
  return [
    '  <!-- SEO:START (genere par scripts/seo-build.js - ne pas editer a la main) -->',
    '  <meta name="robots" content="noindex, nofollow">',
    '  <!-- SEO:END -->',
  ].join('\n');
}

// ---------- contenu <noscript> de index.html ----------
function noscriptBlock() {
  const L = Object.values(LOG.listings).sort((a, b) => (a.order || 0) - (b.order || 0));
  const cats = POIW.POI_CATEGORIES || {};
  const byCat = {};
  (POIW.POIS || []).forEach(p => {
    if (!p.fr || !p.fr.name) return;
    (byCat[p.cat] = byCat[p.cat] || []).push(p);
  });
  const catOrder = Object.keys(byCat).filter(c => !/^parking|^station|^relais|^laverie|^logement/.test(c));
  const parts = [];
  parts.push('<!-- SEO-BODY:START (genere par scripts/seo-build.js - ne pas editer a la main) -->');
  parts.push('<noscript>');
  parts.push(`<main style="max-width:760px;margin:0 auto;padding:16px;font-family:sans-serif;line-height:1.5">`);
  parts.push(`<h1>${esc(SITE_NAME)} — livret d'accueil pour votre séjour dans le Verdon</h1>`);
  parts.push('<p>Livret numérique de nos logements de vacances à Moustiers-Sainte-Marie (Alpes-de-Haute-Provence) et aux Salles-sur-Verdon (Var), près du lac de Sainte-Croix et des gorges du Verdon. Disponible en français, anglais, allemand et néerlandais. Cette page nécessite JavaScript pour l\'affichage complet (carte, météo, événements).</p>');
  parts.push('<h2>Nos logements</h2>');
  L.forEach(l => {
    parts.push(`<h3>${esc(l.label.FR)}</h3>`);
    parts.push(`<p>${esc(l.desc.FR)}. ${esc(l.place.FR)}. Adresse : ${esc(l.address)}.</p>`);
    parts.push(`<p>${esc((l.welcome && l.welcome.FR) || '')}</p>`);
  });
  parts.push('<p><a href="/logements.html">Voir tous nos logements</a> · <a href="/evenements.html">Événements du moment</a> · <a href="/infos.html">Infos pratiques</a> · <a href="/commerces.html">Commerces et services</a> · <a href="/panorama.html">Panorama 360°</a> · <a href="/galerie.html">Galerie photos</a></p>');
  parts.push('<h2>À voir et à faire autour de Moustiers-Sainte-Marie et du lac de Sainte-Croix</h2>');
  catOrder.forEach(c => {
    const label = (cats[c] && cats[c].fr) || c;
    parts.push(`<h3>${esc(label)}</h3><ul>`);
    byCat[c].forEach(p => {
      const d = (p.fr.desc || '').replace(/\s+/g, ' ').trim();
      parts.push(`<li><strong>${esc(p.fr.name)}</strong>${d ? ' — ' + esc(d.length > 220 ? d.slice(0, 217) + '…' : d) : ''}</li>`);
    });
    parts.push('</ul>');
  });
  parts.push('</main>');
  parts.push('</noscript>');
  parts.push('<!-- SEO-BODY:END -->');
  return parts.join('\n');
}

// ---------- ecriture ----------
function write(file, content) { fs.writeFileSync(path.join(ROOT, file), content, 'utf8'); }
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

// index.html : on retire d'abord un eventuel <meta name="description"> historique,
// remplace par celui du bloc SEO (un seul par page).
for (const [file, cfg] of Object.entries(PUBLIC_PAGES)) {
  if (!fs.existsSync(path.join(ROOT, file))) { console.warn('absent :', file); continue; }
  let html = read(file);
  html = html.replace(/[ \t]*<meta name="description"[^>]*>\n?/gi, '');
  html = replaceBlock(html, '<!-- SEO:START', '<!-- SEO:END -->', headBlock(file, cfg, html), /<title>[\s\S]*?<\/title>/i);
  if (file === 'index.html') {
    html = replaceBlock(html, '<!-- SEO-BODY:START', '<!-- SEO-BODY:END -->', noscriptBlock(), /<body[^>]*>/i);
  }
  // Viewport : on retire le blocage du zoom (mauvais pour l'accessibilite et penalise
  // sur mobile) sur les pages de contenu. Les pages "application" (panorama, cartes
  // back-in-time) gardent leurs gestes tactiles : on n'y touche pas.
  if (['logements.html', 'evenements.html', 'infos.html', 'commerces.html', 'galerie.html'].includes(file)) {
    html = html.replace(/,\s*maximum-scale=1\.0,\s*user-scalable=no/i, '');
  }
  write(file, html);
  console.log('OK   ', file);
}
for (const file of NOINDEX_PAGES) {
  if (!fs.existsSync(path.join(ROOT, file))) continue;
  let html = read(file);
  html = html.replace(/[ \t]*<meta name="robots"[^>]*>\n?/gi, '');
  html = replaceBlock(html, '<!-- SEO:START', '<!-- SEO:END -->', noindexBlock(), /<title>[\s\S]*?<\/title>/i);
  write(file, html);
  console.log('NOIDX', file);
}

// sitemap.xml
const urls = Object.values(PUBLIC_PAGES).map(c => c.url);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(u => `  <url>\n    <loc>${BASE}${u}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join('\n') +
  `\n</urlset>\n`);
console.log('OK    sitemap.xml');

// llms.txt
const lines = [];
lines.push(`# ${SITE_NAME}`);
lines.push('');
lines.push("> Livret d'accueil numérique et guide local (français, anglais, allemand, néerlandais) pour des logements de vacances à Moustiers-Sainte-Marie et aux Salles-sur-Verdon, près du lac de Sainte-Croix et des gorges du Verdon (Provence, France).");
lines.push('');
lines.push('## Logements');
Object.values(LOG.listings).sort((a, b) => (a.order || 0) - (b.order || 0)).forEach(l => {
  lines.push(`- [${l.label.FR}](${BASE}/logements.html) : ${l.desc.FR}. ${l.address}.`);
});
lines.push('');
lines.push('## Pages principales');
lines.push(`- [Livret d'accueil, carte des bons plans, météo](${BASE}/) : infos pratiques, restaurants, commerces, points d'intérêt.`);
lines.push(`- [Événements du Verdon](${BASE}/evenements.html) : marchés, brocantes, fêtes et animations, mis à jour régulièrement.`);
lines.push(`- [Infos pratiques](${BASE}/infos.html)`);
lines.push(`- [Commerces et services](${BASE}/commerces.html)`);
lines.push(`- [Panorama 360°](${BASE}/panorama.html)`);
lines.push(`- [Galerie photos](${BASE}/galerie.html)`);
lines.push('');
lines.push('## Notes');
lines.push('- Les pages utilisent le paramètre `?lang=FR|EN|DE|NL` pour la langue et `?logement=moustiers|salles6|salles8` pour le logement.');
lines.push('- Les liens avec un code de réservation (display.html, highlights.html, home.html, tv.html) sont personnels et non indexés.');
lines.push('');
write('llms.txt', lines.join('\n'));
console.log('OK    llms.txt');
