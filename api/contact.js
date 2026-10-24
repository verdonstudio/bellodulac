// Fonction serverless Vercel : envoie la demande de reservation par email via Resend.
// Variables d'environnement (Vercel > Settings > Environment Variables) :
//   RESEND_API_KEY  (obligatoire)  cle API Resend
//   CONTACT_TO      (facultatif)   destinataire, defaut verdonstudio@gmail.com
//   CONTACT_FROM    (facultatif)   expediteur, defaut "Bell'O du Lac <onboarding@resend.dev>"
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const clip = (s, n) => String(s == null ? '' : s).slice(0, n);

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.status(405).json({ ok: false, error: 'method' }); return; }
  const key = process.env.RESEND_API_KEY;
  if (!key) { res.status(503).json({ ok: false, error: 'not_configured' }); return; }

  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = {}; } }
  b = b || {};
  if (b.website) { res.status(200).json({ ok: true }); return; } // champ piege anti-spam

  const d = {
    logement: clip(b.logement, 120), cin: clip(b.cin, 10), cout: clip(b.cout, 10),
    guests: parseInt(b.guests, 10) || 0, name: clip(b.name, 120), email: clip(b.email, 160),
    phone: clip(b.phone, 40), message: clip(b.message, 2000), lang: clip(b.lang, 2), page: clip(b.page, 300),
  };
  const okDate = s => /^\d{4}-\d{2}-\d{2}$/.test(s);
  const okMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email);
  if (!d.logement || !okDate(d.cin) || !okDate(d.cout) || d.cout <= d.cin || !d.name || !okMail) {
    res.status(400).json({ ok: false, error: 'invalid' }); return;
  }

  const rows = [['Logement', d.logement], ['Arrivée', d.cin], ['Départ', d.cout], ['Voyageurs', d.guests],
    ['Nom', d.name], ['Email', d.email], ['Téléphone', d.phone], ['Langue', d.lang], ['Message', d.message], ['Page', d.page]];
  const html = `<h2>Demande de réservation</h2><table cellpadding="6" style="border-collapse:collapse">` +
    rows.map(r => `<tr><td><b>${r[0]}</b></td><td>${esc(r[1]).replace(/\n/g, '<br>')}</td></tr>`).join('') + '</table>';
  const text = rows.map(r => `${r[0]} : ${r[1]}`).join('\n');

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || "Bell'O du Lac <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO || 'verdonstudio@gmail.com'],
        reply_to: d.email,
        subject: `Demande de réservation - ${d.logement} (${d.cin} → ${d.cout})`,
        html, text,
      }),
    });
    if (!r.ok) { res.status(502).json({ ok: false, error: 'send_failed' }); return; }
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(502).json({ ok: false, error: 'send_failed' });
  }
};
