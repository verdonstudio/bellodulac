# Bell'Étoile / Bell'O du Lac — liens de réservation

Ce site est un ensemble de pages statiques (pas de backend) qui affichent un
programme personnalisé par réservation : évènements locaux, carte, visites
proposées et panorama 360°. Tout le paramétrage passe par des **paramètres
d'URL**, lus par chaque page en JavaScript au chargement.

Ce document décrit ces paramètres et comment générer les liens sans les
écrire à la main.

## Générer un lien : `url-generator.html`

Ouvre **`url-generator.html`** dans un navigateur (depuis le dossier du site,
pas en fichier isolé, pour que `evenements.js` et `pois.js` se chargent).

Le formulaire te demande :

- le logement, la langue, les dates de séjour ;
- les évènements à mettre en avant (liste tirée en direct de `evenements.js`) ;
- l'affichage automatique des évènements de la période (`showevents`) ;
- l'ajout automatique de l'itinéraire de visites par défaut (`showpois`) ;
- des visites POI ajoutées manuellement, jour par jour ;
- en avancé : le bouton retour (`from`), le zoom/position de la carte, et le
  domaine utilisé pour les liens copiés.

Il génère :

1. les 4 liens directs (évènements, carte, programme, panorama) ;
2. le bloc JSON prêt à coller dans **`redirect.js`**, sous la clé du code de
   réservation.

Une fois le bloc collé dans `redirect.js`, le lien court à donner au
voyageur est :

```
https://bellodulac.netlify.app/display.html?res=CODE&action=highlights
```

(`action` peut aussi être `evenements`, `map` ou `panorama` — voir
`display.html`, qui lit `redirect.js` et redirige vers la bonne URL.)

## Les 4 pages et leurs paramètres

### Communs à (presque) toutes les pages

| Paramètre | Valeurs | Rôle |
|---|---|---|
| `lang` | `FR`, `EN` | Langue de l'interface. |
| `logement` | `moustiers`, `salles6`, `salles8` (alias tolérés : `etoile`, `bello6`, `bello8`, …) | Détermine le logo affiché, la position par défaut sur la carte, et l'itinéraire POI par défaut. |
| `edatestart` | `AAAA-MM-JJ` | Date d'arrivée du séjour. |
| `edateend` | `AAAA-MM-JJ` | Date de départ du séjour. |

### `evenements.html` — liste des évènements

Sert à parcourir les évènements locaux sur la période du séjour et à
construire une sélection (bouton « Voir ma sélection » → génère l'URL
`highlights.html` avec `ids`/`visits` remplis). N'a besoin que des
paramètres communs ci-dessus.

### `index.html` — carte

Paramètres communs, plus :

| Paramètre | Valeurs | Rôle |
|---|---|---|
| `zoom` | nombre | Niveau de zoom initial. |
| `pos` | `lat,lng` | Centre initial de la carte. |
| `poi` | id de POI | Ouvre directement la fiche de ce POI. |
| `cat` | liste de catégories séparées par `,` | Filtre les POIs affichés (ex. `parking_gratuit,parking_payant`). |

### `panorama.html` — vue 360°

Paramètres communs uniquement.

### `highlights.html` — programme personnalisé

C'est la page la plus riche. En plus des paramètres communs :

| Paramètre | Valeurs | Rôle |
|---|---|---|
| `ids` | liste d'id d'évènements séparés par `,` (URL-encodés) | Évènements ajoutés manuellement au programme. Pour un évènement récurrent, on utilise l'id de base (ex. `rec-moustiers-nocturne-mercredi`), pas une occurrence précise. |
| `visits` | liste de `poiId:AAAA-MM-JJ` séparés par `,` | Visites POI programmées à une date précise. |
| `from` | `evenements`, `index`, `panorama` | Détermine où mène le bouton retour. |
| `showevents` | `all`, `3stars` ou `today` | Ajoute automatiquement, en plus de `ids`, tous les évènements de la période (`all`), seulement les 3 étoiles (`3stars`), ou seulement les évènements du jour calendaire (`today` — indépendant de `edatestart`/`edateend`). Ces évènements ajoutés automatiquement n'ont pas de bouton de suppression. |
| `showpois` | `true`, `1` ou `today` | `true`/`1` ajoute l'itinéraire de visites par défaut du logement, jour par jour à partir de `edatestart` (voir ci-dessous). `today` ignore les dates de séjour et ajoute une seule « recommandation du jour » (voir plus bas). |

`showevents` et `showpois` sont gérés sur **toutes** les pages et sur tous
les boutons retour : une fois présents dans l'URL, ils sont conservés
automatiquement en naviguant entre `index.html`, `evenements.html`,
`highlights.html` et `panorama.html`.

## Le tag « today » (que faire aujourd'hui, sans réservation)

`redirect.js` contient une entrée spéciale `"today"` (à côté de `"default"`),
utilisable sans code de réservation :

```
https://bellodulac.netlify.app/display.html?res=today&action=highlights
```

Elle pointe vers `highlights.html?...&showevents=today&showpois=today`, donc
elle affiche automatiquement les évènements du jour et la recommandation POI
du jour — sans dates de séjour ni logement figés. `action` peut aussi être
`evenements`, `map` ou `panorama`.

Pour cibler un logement précis sur ce tag générique, il suffit d'ajouter
`&logement=...` sur le lien `display.html` lui-même :

```
https://bellodulac.netlify.app/display.html?res=today&action=highlights&logement=moustiers
```

`display.html` transmet tout paramètre supplémentaire (autre que `res` et
`action`) vers la page de destination, sans écraser ceux déjà fixés dans
`redirect.js` — c'est ce qui permet ce genre de lien générique paramétrable,
en plus des liens de réservation classiques (qui, eux, fixent déjà tout).

## Itinéraire de visites par défaut (`showpois=true`)

Défini dans `highlights.html`, constante `DEFAULT_POI_ITINERARY` : une liste
d'id de POI par famille de logement (`moustiers` ou `salles`), appliquée à
partir du 2e jour du séjour (le jour d'arrivée n'a jamais de visite par
défaut). Un séjour plus court que la liste ne reçoit que les premières
entrées ; un séjour plus long que la liste n'ajoute rien au-delà.

Pour modifier l'itinéraire par défaut, il suffit d'éditer ce tableau dans
`highlights.html` — aucun autre fichier à toucher.

```js
const DEFAULT_POI_ITINERARY = {
    moustiers: ['rando-moustiers', 'plage-galetas', 'aiguines-table-orientation',
                'topo-lac-basses-gorges-mrkl4060', 'plage-salles', 'plage-chabassole'],
    salles:    ['plage-salles', 'plage-galetas', 'aiguines-table-orientation',
                'rando-moustiers', 'topo-lac-basses-gorges-mrkl4060', 'plage-margaridon']
};
```

### Recommandation du jour (`showpois=today`)

Réutilise le même tableau `DEFAULT_POI_ITINERARY`, mais tourne dessus en
boucle sur l'année entière au lieu de le parcourir jour par jour à partir de
l'arrivée : l'index du jour est calculé par
`(jour de l'année - 1) % longueur du tableau`. Résultat : un POI différent
chaque jour, qui revient au début du tableau tous les *N* jours (*N* = 6
actuellement), et qui diffère selon la famille de logement (`moustiers` ou
`salles`) puisque chaque famille a son propre tableau. Aucune date de séjour
n'est nécessaire, contrairement à `showpois=true`.

## Fichiers de données

- **`evenements.js`** — `window.EVENTS_DATA` : évènements locaux (marchés,
  fêtes, concerts…), avec `id`, `cat`, `place`, `title`, `date` ou
  `recurrence`, `rating` (0 à 3), `img`, `url`.
- **`pois.js`** — `window.POIS` : points d'intérêt (plages, randos,
  panoramas…), avec `id`, `cat`, `coords`, `img`, et un bloc `fr`/`en`
  (`name`, `desc`, `url`).
- **`redirect.js`** — table `reservations[CODE][action] = "page.html?..."`,
  consommée par `display.html?res=CODE&action=...`.

`url-generator.html` lit `evenements.js` et `pois.js` directement, donc la
liste qu'il propose reste toujours synchronisée avec ces fichiers.
