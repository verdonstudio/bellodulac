# Bell'O du Lac / Bell'Étoile — Applications Android TV

Deux applications "kiosk" (WebView plein écran) pour Google TV / Android TV, une par logement.
Chaque application affiche simplement une page du site (par défaut `home.html`, ou `tv.html`
pour la vue orientée grand écran — voir plus bas), avec le logement déjà pré-sélectionné.

## Comment ça marche

1. Au démarrage, l'application va chercher un petit fichier JSON sur GitHub :
   - Bell'O du Lac (Les Salles-sur-Verdon) → [`config-salles.json`](./config-salles.json)
   - Bell'Étoile (Moustiers-Sainte-Marie) → [`config-moustiers.json`](./config-moustiers.json)
2. Ce fichier contient l'URL à afficher, plus deux liens fixes utilisés par les QR codes de
   `tv.html` (carte interactive et panorama 360°) :
   ```json
   {
     "url": "https://bellodulac.vercel.app/home.html?logement=salles8&lang=FR",
     "mapUrl": "https://bellodulac.vercel.app/index.html?logement=salles8&lang=FR",
     "panoramaUrl": "https://bellodulac.vercel.app/panorama.html?logement=salles8&lang=FR"
   }
   ```
3. **Pour changer l'URL affichée (changer la langue par défaut, passer sur `tv.html`, changer
   les liens des QR codes, etc.), il suffit de modifier ce fichier directement sur GitHub.**
   Pas besoin de reconstruire ni de réinstaller l'application — au prochain démarrage, la TV
   ira chercher la nouvelle configuration.
4. Si le fichier est injoignable au démarrage (pas de réseau, etc.), l'application affiche une
   URL de secours codée en dur dans l'app (`androidtv/app/build.gradle`, champ `DEFAULT_URL`).

Le message "Bienvenue {Nom} !" (sur `home.html` et `tv.html`) est géré entièrement côté site web
(voir `reservations.js` à la racine du dépôt) — il n'y a rien à faire côté application Android.

## `home.html` ou `tv.html` ?

- `home.html` : la page "mobile" classique, grille de tuiles cliquables (carte, évènements,
  programme, panorama, retour vers le futur...). Pensée pour un écran tactile.
- `tv.html` : vue pensée pour un grand écran vu à distance, sans interaction tactile. Affiche
  directement les évènements locaux et le programme personnalisé du séjour en cours (repris de
  `evenements.html` / `highlights.html`), plus deux QR codes (carte interactive, panorama 360°)
  à scanner avec le téléphone — leurs liens viennent des champs `mapUrl` / `panoramaUrl` ci-dessus.
  La reconnaissance du séjour en cours (nom du voyageur affiché, langue de la page, dates prises
  en compte pour "votre programme") se fait via `reservations.js` (champ `code`, qui doit
  correspondre à une entrée existante dans `redirect.js`) exactement comme sur `home.html`.

Pour utiliser `tv.html` au lieu de `home.html` sur une TV, il suffit de changer `"url"` dans le
fichier de config correspondant, par exemple :
`"url": "https://bellodulac.vercel.app/tv.html?logement=salles8&lang=FR"`.

## Installer l'APK sur la Google TV (méthode recommandée : appli "Downloader")

Un workflow GitHub Actions (`.github/workflows/build-android-tv.yml`) reconstruit automatiquement
les deux APK à chaque modification du dossier `androidtv/`, et les publie avec un **lien de
téléchargement public et stable** (pas besoin d'être connecté à GitHub, ni de dézipper quoi que
ce soit) :

- Bell'O du Lac (Les Salles-sur-Verdon) :
  `https://github.com/verdonstudio/bellodulac/releases/download/android-tv/bellodulac-tv-salles.apk`
- Bell'Étoile (Moustiers-Sainte-Marie) :
  `https://github.com/verdonstudio/bellodulac/releases/download/android-tv/bellodulac-tv-moustiers.apk`

Ces liens restent toujours les mêmes : à chaque nouveau build, le fichier est simplement remplacé
à la même adresse.

**Sur la TV :**
1. Installer l'application **"Downloader"** (AFTVnews) depuis le Play Store de la TV.
2. Au premier lancement, autoriser Downloader à installer des sources inconnues si demandé.
3. Dans Downloader, coller le lien correspondant à la maison (voir ci-dessus) et valider.
4. Une fois le téléchargement terminé, l'installation de l'APK se lance automatiquement — suivre
   les invites à l'écran.

**Alternative (si "Downloader" n'est pas disponible) :** copier l'APK sur une clé USB depuis un
ordinateur, puis utiliser un gestionnaire de fichiers TV (ex: "X-plore", "Send Files to TV") pour
l'installer directement.

Les deux applications ont des identifiants différents (`com.bellodulac.tv.salles` et
`com.bellodulac.tv.moustiers`), elles peuvent donc être installées côte à côte sans conflit —
mais en pratique chaque TV n'a besoin que de la sienne.

Pour lancer un build manuellement (par exemple pour forcer une mise à jour sans toucher aux
fichiers) : onglet **Actions** sur GitHub → workflow **"Build Android TV APKs"** → **"Run
workflow"**.

## Structure du projet

```
androidtv/
  config-salles.json         ← URL affichée par l'app "Salles" (à éditer sur GitHub)
  config-moustiers.json      ← URL affichée par l'app "Moustiers" (à éditer sur GitHub)
  app/
    build.gradle              ← définit les 2 variantes (flavors) salles / moustiers
    src/main/                 ← code commun (WebView kiosk, manifeste, thème)
    src/salles/res/           ← icône + bannière TV pour Bell'O du Lac
    src/moustiers/res/        ← icône + bannière TV pour Bell'Étoile
```
