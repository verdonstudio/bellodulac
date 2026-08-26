# Bell'O du Lac / Bell'Étoile — Applications Android TV

Deux applications "kiosk" (WebView plein écran) pour Google TV / Android TV, une par logement.
Chaque application affiche `tv.html`, une vue en vignettes pensée pour un grand écran vu à
distance, avec le logement déjà pré-sélectionné.

## Comment ça marche

1. Au démarrage, l'application va chercher un petit fichier JSON sur GitHub :
   - Bell'O du Lac (Les Salles-sur-Verdon) → [`config-salles.json`](./config-salles.json)
   - Bell'Étoile (Moustiers-Sainte-Marie) → [`config-moustiers.json`](./config-moustiers.json)
2. Ce fichier contient l'URL à afficher, et la liste des vignettes affichées sur `tv.html` :
   ```json
   {
     "url": "https://bellodulac.vercel.app/tv.html?logement=salles8",
     "tiles": [
       { "key": "evenements", "type": "link" },
       { "key": "highlights", "type": "link" },
       { "key": "map", "type": "qr" },
       { "key": "panorama", "type": "qr" },
       { "key": "backintime", "type": "qr" }
     ]
   }
   ```
3. **Pour changer l'URL affichée, ajouter/retirer/réordonner une vignette, il suffit de
   modifier ce fichier directement sur GitHub.** Pas besoin de reconstruire ni de réinstaller
   l'application — au prochain démarrage, la TV ira chercher la nouvelle configuration.
4. Si le fichier est injoignable au démarrage (pas de réseau, etc.), l'application affiche une
   URL de secours codée en dur dans l'app (`androidtv/app/build.gradle`, champ `DEFAULT_URL`),
   et `tv.html` affiche lui-même 5 vignettes par défaut si sa propre lecture de la config échoue.

## Vidéo d'intro au lancement (optionnel)

Le champ `"url"` peut pointer vers `video.html` au lieu de `tv.html` directement, pour jouer une
vidéo (YouTube ou fichier) avant d'arriver sur l'écran normal. Il faut alors ajouter `next=...`
(encodé en URL) avec la page à ouvrir une fois la vidéo terminée :
```
https://bellodulac.vercel.app/video.html?youtube=https%3A%2F%2Fyoutu.be%2FfroZQJeAMr0&logement=moustiers&next=tv.html%3Flogement%3Dmoustiers
```
Un bouton "Passer l'intro" apparaît automatiquement en haut à droite dès qu'un `next` est fourni
(sécurité si la vidéo ne se termine jamais correctement) ; l'app enchaîne aussi automatiquement
sur `next` au bout de 3 minutes maximum, au cas où. C'est actuellement utilisé pour l'app
Moustiers uniquement (`config-moustiers.json`) — retirer `youtube=...&next=...` et faire pointer
`"url"` directement vers `tv.html?logement=...` pour désactiver l'intro.

Le message "Bienvenue {Nom} !" est géré entièrement côté site web (voir `reservations.js` à la
racine du dépôt) — il n'y a rien à faire côté application Android.

## Les vignettes de `tv.html`

Chaque entrée de `"tiles"` est un objet `{ "key": "...", "type": "link"|"qr" }` :
- `type: "link"` — vignette cliquable classique (comme sur `home.html`) : ouvre la page
  directement sur la TV. Utilisé pour "Évènements locaux" et "Votre programme".
- `type: "qr"` — vignette avec un QR code intégré, à scanner avec le téléphone (en plus de
  rester cliquable sur la TV elle-même). Utilisé pour "Carte interactive", "Panorama 360°" et
  "Retour vers le futur".

Cinq vignettes "standard" sont reconnues par leur seul `key` (icône, titre en 4 langues et lien
déjà tout définis dans `tv.html`, aucune config supplémentaire nécessaire) :
`evenements`, `highlights`, `map`, `panorama`, `backintime`.

**Lien affiché par vignette :** si un séjour est en cours (voir `reservations.js`), la vignette
utilise en priorité le lien déjà calculé pour cette réservation dans `redirect.js` (dates du
séjour et langue du voyageur incluses) — `evenements`→`evenements`, `highlights`→`highlights`,
`map`→`map`, `panorama`→`panorama`. Sinon (pas de séjour en cours, ou vignette sans équivalent
dans `redirect.js` comme `backintime`), elle retombe sur un lien par défaut calculé
automatiquement (`?logement=...&lang=...`, langue = FR si aucun séjour en cours).

**Que fait le clic sur une vignette "qr", directement sur la TV** (le scan au téléphone, lui,
ouvre toujours le lien normal) : par défaut (`"onClick": "modal"`, ou rien du tout), le QR code
s'agrande en plein écran pour faciliter le scan à distance depuis le canapé. Avec
`"onClick": "link"`, le clic ouvre directement le lien sur la TV elle-même (utile par exemple
pour `map`, qui affiche alors une liste de POI navigable à la télécommande à côté de la carte).
```json
{ "key": "panorama", "type": "qr", "onClick": "link" }
```

**Ajouter une vignette entièrement nouvelle** (pas dans la liste ci-dessus) : donner en plus
`"title"` (par langue), `"icon"` et `"defaultUrl"` directement dans la config, par exemple :
```json
{
  "key": "parking",
  "type": "qr",
  "icon": "🅿️",
  "title": { "FR": "Parking", "EN": "Parking", "DE": "Parkplatz", "NL": "Parkeren" },
  "defaultUrl": "index.html?logement=salles8&lang=FR&cat=parking_gratuit"
}
```

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
