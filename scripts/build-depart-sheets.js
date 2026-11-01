/* Génère les fiches "Instructions de départ" à imprimer (Word) : une par logement,
   4 pages (FR, EN, DE, NL), avec le QR code vers depart.html?logement=... .
   Textes : depart-content.js. Usage : node scripts/build-depart-sheets.js
   Sortie : fiches/FICHE_DEPART_MOUSTIERS.docx et fiches/FICHE_DEPART_SALLES.docx */
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Header, AlignmentType, BorderStyle,
  LevelFormat, PageBreak, Table, TableRow, TableCell, WidthType, ShadingType, VerticalAlign,
} = require('docx');
const C = require('../depart-content.js');

const ROOT = path.join(__dirname, '..');
const BASE = 'https://bellodulac.vercel.app/depart.html?logement=';
const SHEETS = {
  moustiers: { file: 'FICHE_DEPART_MOUSTIERS.docx', logo: 'fiches/logos/bell-etoile.png', logoH: 2.1, qr: 'fiches/qr-moustiers.png' },
  salles:    { file: 'FICHE_DEPART_SALLES.docx',    logo: 'fiches/logos/bellodulac.png',  logoH: 2.1, qr: 'fiches/qr-salles.png' },
};
const CM = 360000; // EMU par cm
const px = (file) => { const b = fs.readFileSync(path.join(ROOT, file)); return { w: b.readUInt32BE(16), h: b.readUInt32BE(20), buf: b }; };
const TITLE = '17365D', LINE = '4F81BD', HEAD = '365F91';

function img(file, heightCm) {
  const p = px(file); const hPx = Math.round(heightCm * 96 / 2.54); const wPx = Math.round(hPx * p.w / p.h);
  return new ImageRun({ type: 'png', data: p.buf, transformation: { width: wPx, height: hPx } });
}

function page(house, lang, isLast) {
  const u = C.ui[lang], sh = SHEETS[house];
  const kids = [];
  kids.push(new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { before: 120, after: 160 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: LINE, space: 4 } },
    children: [new TextRun({ text: u.title, font: 'Calibri', size: 56, color: TITLE })],
  }));
  kids.push(new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: u.introSheet, font: 'Cambria', size: 25 })] }));
  kids.push(new Paragraph({ spacing: { before: 120, after: 80 }, children: [new TextRun({ text: u.section.toUpperCase(), font: 'Calibri', size: 24, bold: true, color: HEAD })] }));

  // 1re consigne : heure de départ (version générique, la page web donne la date et l'heure exactes)
  const rows = [[u.checkoutLabel, u.checkoutGeneric.replace('{time}', C.fmtTime(lang, C.DEFAULT_CHECKOUT_TIME))]].concat(C.items(house, lang).map(i => [i.b, i.t]));
  rows.forEach(([b, t]) => kids.push(new Paragraph({
    numbering: { reference: 'bul', level: 0 }, spacing: { after: 90 },
    children: [new TextRun({ text: b + ' : ', bold: true, font: 'Cambria', size: 25 }), new TextRun({ text: t, font: 'Cambria', size: 25 })],
  })));

  kids.push(new Paragraph({ spacing: { before: 120, after: 60 }, children: [new TextRun({ text: u.closing, font: 'Cambria', size: 22, italics: true })] }));
  kids.push(new Paragraph({ alignment: AlignmentType.RIGHT, spacing: { after: 0 }, children: [new TextRun({ text: u.hosts, font: 'Cambria', size: 22 })] }));
  kids.push(new Paragraph({ alignment: AlignmentType.RIGHT, spacing: { after: 140 }, children: [new TextRun({ text: u.signature, font: 'Cambria', size: 22, bold: true })] }));

  // QR code + légende
  kids.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60, after: 60 }, children: [img(sh.qr, 4.6)] }));
  kids.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [new TextRun({ text: house === 'moustiers' ? u.qrCaptionMoustiers : u.qrCaption, font: 'Calibri', size: 21, color: '444444' })] }));
  kids.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 0 }, children: [new TextRun({ text: BASE + house, font: 'Calibri', size: 17, color: '888888' })] }));
  if (!isLast) kids.push(new Paragraph({ children: [new PageBreak()] }));
  return kids;
}

async function build(house) {
  const sh = SHEETS[house];
  const children = [];
  C.LANGS.forEach((lang, i) => children.push(...page(house, lang, i === C.LANGS.length - 1)));
  const header = new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [img(sh.logo, sh.logoH)] })] });
  const doc = new Document({
    creator: "Bell'O du Lac & Bell'Étoile",
    title: 'Instructions de départ — ' + C.logements[house].brand,
    styles: { default: { document: { run: { font: 'Cambria', size: 25 } } } },
    numbering: { config: [{ reference: 'bul', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] }] },
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1100, right: 1134, bottom: 700, left: 1134, header: 400, footer: 300 } } },
      headers: { default: header },
      children,
    }],
  });
  const out = path.join(ROOT, 'fiches', sh.file);
  fs.writeFileSync(out, await Packer.toBuffer(doc));
  console.log('OK', path.relative(ROOT, out));
}


// ---------- Version 1 page : les 4 langues sur une seule feuille A4 (grille 2 x 2) ----------
const CAPTION = {
  moustiers: ['FR  Scannez : instructions personnalisées + plan de la poubelle', 'EN  Scan: personalised instructions + map to the bin', 'DE  Scannen: persönliche Hinweise + Karte zum Mülleimer', 'NL  Scan: persoonlijke instructies + kaart naar de vuilnisbak'],
  salles:    ['FR  Scannez : instructions personnalisées (date et heure de départ)', 'EN  Scan: personalised instructions (check-out date and time)', 'DE  Scannen: persönliche Hinweise (Abreisedatum und -zeit)', 'NL  Scan: persoonlijke instructies (vertrekdatum en -tijd)'],
};
const NB = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const DOT = { style: BorderStyle.DOTTED, size: 4, color: 'AAAAAA' };

function cell(house, lang, borders) {
  const u = C.ui[lang];
  const kids = [];
  kids.push(new Paragraph({
    spacing: { after: 60 }, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: LINE, space: 2 } },
    children: [new TextRun({ text: lang + '  ', font: 'Calibri', size: 20, bold: true, color: LINE }), new TextRun({ text: u.title, font: 'Calibri', size: 30, color: TITLE })],
  }));
  const rows = [[u.checkoutLabel, u.checkoutGeneric.replace('{time}', C.fmtTime(lang, C.DEFAULT_CHECKOUT_TIME))]].concat(C.items(house, lang).map(i => [i.b, i.t]));
  rows.forEach(([b, t]) => kids.push(new Paragraph({
    numbering: { reference: 'bul', level: 0 }, spacing: { after: 50 },
    children: [new TextRun({ text: b + ' : ', bold: true, font: 'Cambria', size: 20 }), new TextRun({ text: t, font: 'Cambria', size: 20 })],
  })));
  return new TableCell({
    width: { size: 5200, type: WidthType.DXA }, borders, verticalAlign: VerticalAlign.TOP,
    margins: { top: 100, bottom: 80, left: 140, right: 140 },
    children: kids,
  });
}

async function buildOnePage(house) {
  const sh = SHEETS[house];
  const row = (a, b, top) => new TableRow({ children: [
    cell(house, a, { top: top ? NB : DOT, bottom: NB, left: NB, right: DOT }),
    cell(house, b, { top: top ? NB : DOT, bottom: NB, left: NB, right: NB }),
  ] });
  const table = new Table({
    width: { size: 10400, type: WidthType.DXA }, columnWidths: [5200, 5200],
    rows: [row('FR', 'EN', true), row('DE', 'NL', false)],
  });
  const header = new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [img(sh.logo, 1.7)] })] });
  const qrRow = new Table({
    width: { size: 10400, type: WidthType.DXA }, columnWidths: [2600, 7800],
    rows: [new TableRow({ children: [
      new TableCell({ width: { size: 2600, type: WidthType.DXA }, borders: { top: NB, bottom: NB, left: NB, right: NB }, verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [img(sh.qr, 4.2)] })] }),
      new TableCell({ width: { size: 7800, type: WidthType.DXA }, borders: { top: NB, bottom: NB, left: NB, right: NB }, verticalAlign: VerticalAlign.CENTER,
        children: CAPTION[house].map(t => new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: t.slice(0, 2) + '  ', bold: true, font: 'Calibri', size: 20, color: LINE }), new TextRun({ text: t.slice(4), font: 'Calibri', size: 20, color: '333333' })] }))
          .concat([new Paragraph({ spacing: { before: 60 }, children: [new TextRun({ text: BASE + house, font: 'Calibri', size: 15, color: '888888' }), new TextRun({ text: '      Sandrine & Stephan', font: 'Cambria', size: 20, bold: true })] })]) }),
    ] })],
  });
  const doc = new Document({
    creator: "Bell'O du Lac & Bell'Étoile",
    title: 'Instructions de départ (1 page) — ' + C.logements[house].brand,
    styles: { default: { document: { run: { font: 'Cambria', size: 20 } } } },
    numbering: { config: [{ reference: 'bul', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 300, hanging: 200 } } } }] }] },
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 900, right: 753, bottom: 500, left: 753, header: 300, footer: 200 } } },
      headers: { default: header },
      children: [table, new Paragraph({ spacing: { before: 60, after: 60 }, border: { top: { style: BorderStyle.SINGLE, size: 6, color: LINE, space: 4 } }, children: [] }), qrRow],
    }],
  });
  const out = path.join(ROOT, 'fiches', sh.file.replace('.docx', '_1PAGE.docx'));
  fs.writeFileSync(out, await Packer.toBuffer(doc));
  console.log('OK', path.relative(ROOT, out));
}

(async () => { for (const h of Object.keys(SHEETS)) { await build(h); await buildOnePage(h); } })();
