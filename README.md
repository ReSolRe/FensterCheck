# FensterCheck

Internes Werkzeug. Anleitung, Installationshinweise und Datenschutz stehen direkt in der App unter ℹ️ „Info & Anleitung".

## Dateien

```
FensterCheck/
├── index.html      ← Anwendung (eigenständig, kein Build-Schritt)
├── sw.js           ← Service Worker (Offline-Cache)
├── manifest.json   ← PWA-Manifest
├── lib/            ← Lokale Bibliotheken (React, Babel, SheetJS)
└── README.md
```

## Lokaler Test

```bash
python -m http.server 8080
# → http://localhost:8080/index.html
```

## Lizenz

© 2026 – alle Rechte vorbehalten. Nutzung und Weitergabe nur mit Zustimmung (siehe Lizenz in der App).
