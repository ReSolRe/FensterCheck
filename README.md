# FensterCheck – Mobile Fenster-Messerfassung

Mobile PWA zur systematischen Erfassung von Gasfüllgrad-Messungen und Fensterdaten bei Gebäudebegehungen.

**Live:** https://resolre.github.io/FensterCheck/

## Dateien

```
FensterCheck/
├── index.html      ← Hauptanwendung (komplett eigenständig)
├── sw.js           ← Service Worker (Offline-Caching)
├── manifest.json   ← PWA-Manifest (App-Installation)
└── README.md       ← Diese Anleitung
```

## Deployment

GitHub Pages ist aktiv unter:
```
https://resolre.github.io/FensterCheck/
```

### Lokaler Test

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

## Installation auf dem Mobilgerät

### Android (Chrome)

1. URL im Chrome-Browser aufrufen
2. Banner "Zum Startbildschirm hinzufügen" bestätigen
   – oder: Menü (⋮) → "App installieren" / "Zum Startbildschirm hinzufügen"
3. FensterCheck erscheint als eigenständige App

### iOS (Safari)

1. URL in Safari aufrufen (nicht Chrome!)
2. Teilen-Button (⬆) → "Zum Home-Bildschirm"
3. Namen bestätigen → "Hinzufügen"
4. FensterCheck erscheint als App-Icon

## Offline-Nutzung

Nach dem ersten Aufruf mit Internetverbindung werden alle Ressourcen
zwischengespeichert. Die App funktioniert anschliessend vollständig offline:

- Messungen erfassen und speichern ✓
- Fotos aufnehmen ✓
- Daten in IndexedDB persistent gespeichert ✓
- Export (CSV, Excel, JSON) offline möglich ✓

**Wichtig:** Beim ersten Aufruf muss eine Internetverbindung bestehen,
damit die externen Bibliotheken (React, SheetJS) geladen und gecacht werden.

## Datensicherheit

- Alle Daten bleiben lokal auf dem Gerät (IndexedDB)
- Keine Datenübertragung an Server
- Regelmässig JSON-Backup erstellen (Export → 💾 Backup)
- Für Mehrbenutzerbetrieb: JSON-Backup per AirDrop/E-Mail teilen
  und im zweiten Gerät unter Einrichtung → "JSON zusammenführen" importieren

## Browser-Kompatibilität

| Browser          | Status |
|-----------------|--------|
| Chrome Android  | ✓ Vollständig (PWA + Offline) |
| Safari iOS      | ✓ Vollständig (PWA + Offline ab iOS 16.4+) |
| Firefox Android | ✓ Funktional (kein PWA-Install) |
| Samsung Browser | ✓ Vollständig |

## Fehlerbehebung

**App lädt nicht offline:**
→ Beim ersten Aufruf mit Internet alle Seiten einmal öffnen,
  dann Flugmodus testen.

**Daten verschwunden:**
→ Browser-Daten / Websitedaten wurden gelöscht. Deshalb regelmässig
  JSON-Backup erstellen.

**Fotos werden nicht gespeichert:**
→ Kamerazugriff im Browser erlauben (Einstellungen → Datenschutz)

**Excel-Export funktioniert nicht:**
→ SheetJS-Bibliothek nicht geladen. Einmal mit Internet öffnen.
  Alternativ CSV-Export verwenden (keine externe Abhängigkeit).
