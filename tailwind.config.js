/* Configuration Tailwind (compilation locale, remplace cdn.tailwindcss.com).
   Les classes sont detectees dans les pages HTML et dans les fichiers JS de donnees
   (pois.js, evenements.js...) qui peuvent en injecter. Apres avoir ajoute une nouvelle
   classe Tailwind dans le code :  npm install (une fois) puis  npm run css
   et commit du fichier tailwind.css regenere. */
module.exports = {
  content: ['./*.html', './*.js', './gpx/*.js', '!./tailwind.config.js'],
  theme: { extend: {} },
  plugins: [],
};
