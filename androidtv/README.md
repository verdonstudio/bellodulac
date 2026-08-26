# Bell'O du Lac / Bell'Étoile — Applications Android TV

Deux applications "kiosk" (WebView plein écran) pour Google TV / Android TV, une par logement.
Chaque application affiche simplement le site `home.html`, avec le logement déjà pré-sélectionné.

## Comment ça marche

1. Au démarrage, l'application va chercher un petit fichier JSON sur GitHub :
   - Bell'O du Lac (Les Salles-sur-Verdon) → [`config-salles.json`](./config-salles.json)
   - Bell'Étoile (Moustiers-Sainte-Marie) → [`config-moustiers.json`](./config-moustiers.json)
2. Ce fichier contient juste l'URL à afficher, par exemple :
   ```json
   { "url": "https://bellodulac.vercel.app/home.html?logement=salles8&lang=FR" }
   ```
3. **Pour changer l'URL affichée (changer la langue par défaut, etc.), il suffit de modifier
   ce fichier directement sur GitHub.** Pas besoin de reconstruire ni de réinstaller
   l'application — au prochain démarrage, la TV ira chercher la nouvelle URL.
4. Si le fichier est injoignable au démarrage (pas de réseau, etc.), l'application affiche une
   URL de secours codée en dur dans l'app (`androidtv/app/build.gradle`, champ `DEFAULT_URL`).

Le message "Bienvenue {Nom} !" affiché sur `home.html` est géré entièrement côté site web
(voir `reservations.js` à la racine du dépôt) — il n'y a rien à faire côté application Android.

## Récupérer les APK (sans installer Android Studio)

Un workflow GitHub Actions (`.github/workflows/build-android-tv.yml`) reconstruit automatiquement
les deux APK à chaque modification du dossier `androidtv/`, ou à la demande :

1. Sur GitHub, onglet **Actions** → workflow **"Build Android TV APKs"**.
2. Cliquer sur **"Run workflow"** (bouton en haut à droite) pour le lancer manuellement, si besoin.
3. Une fois le run terminé (icône verte), l'ouvrir puis descendre jusqu'à la section **Artifacts** :
   - `bellodulac-tv-salles` → l'APK pour la TV des Salles-sur-Verdon (Bell'O du Lac)
   - `bellodulac-tv-moustiers` → l'APK pour la TV de Moustiers (Bell'Étoile)
4. Télécharger le `.zip`, il contient le fichier `.apk` à l'intérieur.

## Installer l'APK sur la Google TV

Le plus simple est d'utiliser un outil comme **"Send files to TV"** ou **ADB** :
- Activer le mode développeur sur la Google TV (Paramètres → À propos → cliquer 7 fois sur
  "Build") puis activer le débogage réseau ADB, ou
- Copier l'APK sur une clé USB et utiliser un gestionnaire de fichiers TV (ex: "X-plore",
  "Send Files to TV") pour l'installer directement.

Les deux applications ont des identifiants différents (`com.bellodulac.tv.salles` et
`com.bellodulac.tv.moustiers`), elles peuvent donc être installées côte à côte sans conflit —
mais en pratique chaque TV n'a besoin que de la sienne.

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
