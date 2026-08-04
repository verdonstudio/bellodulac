(function () {
    const GA_MEASUREMENT_ID = "G-DNTYRENFNL";

    if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID.indexOf('G-XXXX') !== -1) {
        console.warn('[Analytics] GA_MEASUREMENT_ID non configuré — voir analytics.js / README-analytics.md');
        window.BDLAnalytics = { trackPoi: function () {}, trackEvent: function () {}, trackGpx: function () {}, track: function () {} };
        return;
    }

    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    // Le site est reparti sur deux domaines (evenements.html sur Vercel, le reste sur
    // Netlify) : sans ce parametre, GA4 traiterait chaque passage de l'un a l'autre
    // (ex: bouton "Retour") comme une nouvelle session issue d'un site externe.
    // Ceci double la config faite dans l'interface GA4 (Flux de donnees > Configurer
    // vos domaines) pour ne pas dependre uniquement d'un reglage fait a la main.
    gtag('config', GA_MEASUREMENT_ID, {
        linker: {
            domains: ['bellodulac.vercel.app', 'bellodulac.netlify.app']
        }
    });

    function pageType() {
        let file = (location.pathname.split('/').pop() || 'index.html').split('?')[0];
        file = file.replace(/\.html?$/i, '') || 'index';
        if (file.indexOf('rando_') === 0) return 'rando';
        if (file.indexOf('_backintime') !== -1) return 'backintime';
        return file;
    }

    function currentLangLogement() {
        const params = new URLSearchParams(location.search);
        return { lang: params.get('lang') || '', logement: params.get('logement') || '' };
    }

    function send(eventName, extra) {
        try {
            const ctx = currentLangLogement();
            gtag('event', eventName, Object.assign({ page_type: pageType(), lang: ctx.lang, logement: ctx.logement }, extra || {}));
        } catch (e) {}
    }

    window.BDLAnalytics = {
        trackPoi: function (id, label, cat) { send('poi_click', { poi_id: id || '', poi_label: label || '', poi_cat: cat || '' }); },
        trackEvent: function (id, label, cat) { send('event_click', { event_id: id || '', event_label: label || '', event_cat: cat || '' }); },
        trackGpx: function (label) { send('gpx_download', { trail_label: label || '' }); },
        track: send
    };
})();
