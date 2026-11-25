# Моя електричка — MVP 0.3

Static Ukrainian PWA. Timetable transcribed from official route pages on 2026-11-25. Each row retains its operating days, full train route and validity dates. Route labels omit (Приміський) but retain (Північна). Sources:
- https://swrailway.gov.ua/timetable/eltrain/?sid1=92&sid2=85
- https://swrailway.gov.ua/timetable/eltrain/?sid1=85&sid2=92

## Local testing
Unzip, open Terminal in the extracted folder, run `python3 -m http.server 8000`, then open http://localhost:8000/. Run `node test.js` for timetable logic tests. Do not open index.html directly from Finder; the JSON fetch requires HTTP.

## GitHub Pages
Create a new repository (public for free GitHub Pages), upload the contents of this folder to its root, enable Settings > Pages > Deploy from a branch > main / root. Open the published HTTPS URL. On iPhone use Safari > Share > Add to Home Screen. On Android use Chrome's install/add to home screen option. Test offline after first successful online load and verify both external links on actual phones.

## Schedule maintenance
`timetable.json` is a manually verified snapshot, not a live feed. For each update compare both official pages, edit rows and checked date, run tests (adjust expected values for genuine schedule changes), and publish. Do not publish missing/partial data. Service worker uses network first with offline cache fallback. A warning appears after seven days without verification; validity dates are enforced. Automated extraction and permission/robots verification remain unresolved because the environment cannot directly fetch the source HTML. No automatic updater included. The Telegram link points to a specific private-group message; membership required. UZ app opening is not verified on devices. No actual delay feed.

Standalone preview v0.3 fixes embedded JSON syntax; Telegram message link retained pending a verified group-level link.
