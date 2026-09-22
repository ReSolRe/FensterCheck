# FensterCheck – Mobile Fenstererfassung

Mobile PWA zur systematischen Erfassung von Fenstern bei Gebäudebegehungen: Gebäudeteile, Räume, Geometrie, Rahmen, Verglasung, thermische Kennwerte, Zustand und Fotos (1920 px). Optional Messreihen je Verglasung: Gasfüllgrad, Ug gemessen, Taupunkt.

**Live:** https://resolre.github.io/FensterCheck/

## Dateien

```
FensterCheck/
├── index.html      ← Hauptanwendung (komplett eigenständig)
├── sw.js           ← Service Worker (Offline-Caching)
├── manifest.json   ← PWA-Manifest (App-Installation)
├── lib/            ← Lokale Bibliotheken (React, Babel, SheetJS – kein CDN)
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
- Export (Excel, CSV, ZIP-Sicherung, JSON) offline möglich ✓

**Wichtig:** Beim ersten Aufruf muss eine Internetverbindung bestehen,
damit die App und ihre Bibliotheken geladen und gecacht werden. Alle
Bibliotheken werden lokal mitgeliefert (kein CDN) – danach läuft alles offline.
App-Updates werden beim Öffnen im Hintergrund geladen und sind beim
nächsten Öffnen aktiv.

## Datensicherheit

- Alle Daten bleiben lokal auf dem Gerät (IndexedDB)
- Keine Datenübertragung an Server
- Fotos liegen als Bilddateien in einem eigenen IndexedDB-Speicher (nicht im Projektobjekt)
- Regelmässig eine Sicherung erstellen: Projekt → 📦 „Sicherung: Daten + Fotos (ZIP)".
  Die ZIP enthält `fenstercheck.json` und alle Fotos lesbar benannt im Ordner `fotos/`.
- Für Mehrbenutzerbetrieb: ZIP (oder „Nur Daten (JSON)") per AirDrop/E-Mail teilen
  und im zweiten Gerät unter Einrichtung → „Räume zusammenführen" importieren.
  Ältere JSON-Backups mit eingebetteten Fotos lassen sich weiterhin importieren.
- iPhone/iPad: App zum Home-Bildschirm hinzufügen – sonst kann Safari die Daten
  nach 7 Tagen ohne Nutzung löschen.

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
  ZIP-Sicherung erstellen.

**Fotos werden nicht gespeichert:**
→ Kamerazugriff im Browser erlauben (Einstellungen → Datenschutz)

**Excel-Export funktioniert nicht:**
→ SheetJS-Bibliothek nicht geladen. Einmal mit Internet öffnen.
  Alternativ CSV-Export verwenden.
