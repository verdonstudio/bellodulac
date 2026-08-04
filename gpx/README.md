# Visualisation de parcours

Visualisation HTML autonome (style Strava) d'un tracé GPX avec photos placées le long du parcours.

## Structure

```
parcours-viz/
├── index.html              ← Mode modulaire (nécessite serveur HTTP)
├── index-standalone.html   ← Mode hors-ligne (double-clic, GPX inline)
├── config.js               ← Configuration (titre, GPX, liste des photos)
└── data/
    ├── parcours.gpx
    └── photos/
        ├── 01.jpg
        ├── 02.jpg
        └── ...
```

## Deux modes d'ouverture

### Mode standalone (double-clic, hors-ligne)

Ouvre directement **`index-standalone.html`** dans ton navigateur (double-clic ou
glisser-déposer). Le GPX est intégré dans le fichier ; les photos sont lues
depuis `data/photos/`. Aucun serveur nécessaire.

### Mode modulaire (recommandé pour déploiement / partage)

Le `index.html` charge le GPX via `fetch()` — il faut donc le servir via HTTP.

```bash
cd parcours-viz
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

Pour le **déploiement** : drag-and-drop le dossier sur Netlify / Vercel / ton
hébergeur. Tout fonctionne en statique.

## Réutiliser pour un autre parcours

1. **Remplacer le tracé** : écrase `data/parcours.gpx` avec ton nouveau fichier
2. **Remplacer les photos** : supprime tout dans `data/photos/` et place tes nouvelles
   images (n'importe quels noms — référencés ensuite dans `config.js`)
3. **Adapter `config.js`** :
   - `title` et `subtitle`
   - Liste `photos` : un objet `{ src: "data/photos/xxx.jpg" }` par photo
4. **Si tu utilises `index-standalone.html`** : il faut régénérer le GPX inliné.
   Le plus simple : copie le contenu de ton nouveau `data/parcours.gpx` à la place
   de l'ancien, dans la balise `<script type="application/gpx+xml" id="gpx-inline">`
   à la fin du fichier `index-standalone.html`. Ou utilise simplement `index.html`
   via serveur HTTP, qui se met à jour tout seul.

Par défaut, les photos sont **réparties uniformément** le long du tracé dans
l'ordre de la liste.

## Ancrer une photo précisément

Trois manières d'override la position automatique :

```js
photos: [
  // Position par fraction (0 = départ, 1 = arrivée)
  { src: "data/photos/01.jpg", position: 0.42, caption: "Vue sur la chapelle" },

  // Position par kilomètres depuis le départ
  { src: "data/photos/02.jpg", km: 1.2 },

  // Position par coordonnées (snap au point GPX le plus proche)
  { src: "data/photos/03.jpg", lat: 43.85, lng: 6.22 },

  // Sans position : distribution automatique
  { src: "data/photos/04.jpg" }
]
```

`caption` est optionnel et s'affiche en bas du lightbox quand on clique sur
la photo.

## Personnaliser le fond de carte

Dans `config.js`, modifier `basemap` :

- `"topo"` (par défaut) : OpenTopoMap, relief — idéal en montagne
- `"voyager"` : CartoDB Voyager, clair et neutre
- `"positron"` : CartoDB Positron, très clair (focus tracé)
- `"osm"` : OpenStreetMap standard

## Personnaliser le style du tracé

```js
track: {
  color:   "#FC4C02",   // orange Strava (défaut)
  weight:  4,            // épaisseur en pixels
  opacity: 0.9
}
```

## Préparer les photos (pré-traitement)

Si tes photos sont des originaux haute résolution, réduis-les pour la perf web
(max ~1600 px de large, qualité 85). Avec ImageMagick :

```bash
cd data/photos
for f in *.jpg; do
  convert "$f" -resize '1600x1600>' -quality 85 "$f"
done
```

## Raccourcis clavier (lightbox)

- `←` / `→` : photo précédente / suivante
- `Échap` : fermer
