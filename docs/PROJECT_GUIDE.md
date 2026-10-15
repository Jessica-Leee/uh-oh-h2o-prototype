# Project guide

The app is a phone-sized frontend prototype. It uses a single HTML shell,
JavaScript-rendered screens, and illustrative data.

## Main flow

After onboarding, the bottom navigation opens Home, Map, Report, Forum, and
Advocate. Detail modals provide water-reading, site, and community context.
The map has separate data-center and reading layers.

## Where to make changes

| Change | File |
| --- | --- |
| Initial document, navigation buttons, and external assets | [`index.html`](../index.html) |
| Navigation state, screen rendering, modal handlers, and map behavior | [`app.js`](../app.js) |
| Sample readings, sites, threads, and other content | [`data.js`](../data.js) |
| Phone frame, cards, navigation, and screen styles | [`styles.css`](../styles.css) |
| Embedded-page layout | [`iframe-overrides.css`](../iframe-overrides.css) |
| Presentation mockups | [`ppt-mockups.html`](../ppt-mockups.html) |

## Manual review

Serve the repository with `python3 -m http.server 8000`, then open the local
URL in a browser. Check onboarding, all five navigation tabs, the back button,
map filters, a detail modal, and the report form's feedback. Leaflet, map tiles,
and fonts are loaded from external services.

Submission feedback is simulated. The prototype does not persist reports,
uploads, forum posts, or accounts. Its readings and status labels are example
content rather than live monitoring results.
