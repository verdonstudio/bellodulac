/* Telecharge les photos des annonces (URLs de scripts/airbnb-data.js) dans
   images/logements/<logement>/NN.<ext> et ecrit scripts/photos-local.json.
   Usage (depuis la racine du depot, Node 18+) :
     node scripts/download-photos.js
     node scripts/seo-build.js
   Les pages utilisent ensuite les photos locales (sinon : URLs Airbnb). */
const fs = require('fs');
const path = require('path');
const AB = require('./airbnb-data.js');
const ROOT = path.join(__dirname, '..');
const WIDTH = 1440;

(async () => {
  const map = {};
  for (const id of ['salles6', 'salles8', 'moustiers']) {
    const dir = path.join(ROOT, 'images', 'logements', id);
    fs.mkdirSync(dir, { recursive: true });
    map[id] = [];
    const list = AB[id].remote;
    for (let i = 0; i < list.length; i++) {
      const base = String(i + 1).padStart(2, '0');
      const existing = fs.readdirSync(dir).find(f => f.startsWith(base + '.'));
      if (existing) { map[id].push(`/images/logements/${id}/${existing}`); continue; }
      let ok = false;
      for (let t = 0; t < 3 && !ok; t++) {
        try {
          const r = await fetch(`${list[i]}?im_w=${WIDTH}`);
          if (!r.ok) throw new Error('HTTP ' + r.status);
          const ct = r.headers.get('content-type') || '';
          const ext = /png/.test(ct) ? 'png' : /webp/.test(ct) ? 'webp' : 'jpg';
          fs.writeFileSync(path.join(dir, `${base}.${ext}`), Buffer.from(await r.arrayBuffer()));
          map[id].push(`/images/logements/${id}/${base}.${ext}`);
          ok = true;
        } catch (e) { if (t === 2) console.error('ECHEC', id, i + 1, e.message); }
      }
      if (!ok) map[id].push(list[i]); // repli sur l'URL Airbnb
      process.stdout.write(`\r${id} ${i + 1}/${list.length}   `);
    }
    console.log();
  }
  fs.writeFileSync(path.join(__dirname, 'photos-local.json'), JSON.stringify(map, null, 1));
  console.log('OK : scripts/photos-local.json ecrit. Lancez maintenant : node scripts/seo-build.js');
})();
