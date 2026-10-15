# Uh-Oh H2O: Community Water Prototype

An interactive mobile-web prototype for exploring community water information around Northern Virginia data centers. It connects a map, sample water readings, neighborhood discussions, and reporting flows in a phone-sized interface.

## Implemented

- Onboarding, tab navigation, back navigation, and reusable detail modals.
- Leaflet map with separate data-center and water-reading layers and filters.
- Haversine distance calculations for nearby-site context.
- Water-reading details, alerts, community threads, reporting forms, and advocacy screens.

Built with HTML, CSS, and vanilla JavaScript. `data.js` supplies illustrative content; `app.js` manages screens and interactions. This is a frontend prototype with **no backend**.

## Run locally

From the repository root, serve the static files:

```sh
python3 -m http.server 8000
```

Open [localhost:8000](http://localhost:8000). No npm build or API key is required. The map tiles, Leaflet CDN files, and web fonts require an internet connection.

## Scope and limitations

Uploads, reports, forum posts, replies, and advocacy actions demonstrate intended interactions. Their submission buttons show feedback rather than storing or transmitting a real contribution. There is no account system or live monitoring pipeline.

Water readings are mock data, and real-site locations are approximate. The displayed status labels demonstrate interface behavior and are not validated water-quality assessments.

## Files and credits

- `index.html`: application shell.
- `app.js`: navigation, screen rendering, and interactions.
- `data.js`: prototype content.
- `styles.css`: layout and visual components.
- `iframe-overrides.css`: layout adjustments when embedded in another page.
- `ppt-mockups.html`: a separate presentation/mockup surface.

For the screen flow and source-code map, see the [project guide](docs/PROJECT_GUIDE.md).

JavaScript syntax can be checked locally with Node.js:

```sh
node --check data.js
node --check app.js
```

These commands check syntax. Map loading and interaction behavior still need a
browser check with an internet connection.

Maps use [Leaflet](https://leafletjs.com/) and [OpenStreetMap](https://www.openstreetmap.org/copyright) tiles. The application retains the map attribution in its tile-layer configuration.
