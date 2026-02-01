# Multiplayer Word Guessing Game

A game server where multiple clients connect and play a word-guessing game in real-time.

## Spielidee

Mehrere Spieler verbinden sich gleichzeitig mit einem Server und versuchen, ein geheimes Wort zu erraten. Wer das richtige Wort zuerst errät, bekommt einen Punkt. Danach startet das Spiel automatisch mit einem neuen Wort. Die Punktzahl jedes Spielers wird gespeichert, solange er verbunden ist.

## Architektur

- **Server (server.js):**

  - Läuft mit Node.js und nutzt die `ws`-Bibliothek für WebSockets.
  - Wählt zufällig ein Wort aus einer Liste.
  - Verarbeitet Rateversuche der Spieler und verwaltet den Spielstand.
  - Sendet nach jedem Versuch den aktuellen Stand an alle verbundenen Clients.
  - Startet ein neues Spiel, wenn das Wort erraten wurde.

- **Client (client/index.html):**
  - Einfache HTML/JS-Oberfläche für den Browser.
  - Baut eine WebSocket-Verbindung zum Server auf.
  - Spieler geben Rateversuche ein und sehen die bisherigen Versuche sowie Gewinnbenachrichtigungen im Log.

## Startanleitung

1. **Abhängigkeiten installieren**

   ```
   npm install ws
   ```

2. **Server starten**

   ```
   node server.js
   ```

   Der Server läuft dann auf `ws://localhost:8080`.

3. **Client öffnen**
   - Öffne die Datei `client/index.html` im Browser (z.B. per Doppelklick oder Rechtsklick → Öffnen mit... → Browser).
   - Jeder Mitspieler kann die Datei auf seinem Gerät öffnen (im gleichen Netzwerk ggf. `ws://<deine-ip>:8080` im Code anpassen).

## Spielablauf

- Jeder Spieler gibt ein Wort ein und klickt auf "Guess".
- Nach jedem Versuch werden die geratenen Wörter angezeigt.
- Wer das richtige Wort errät, gewinnt die Runde und das Spiel startet neu.
- Die Punktzahl wird auf dem Server gespeichert (aktuell nicht im Client angezeigt).

## Hinweise

- Das Spiel ist aktuell sehr einfach gehalten (keine Hinweise, keine Anzeige der Wortlänge, keine Spielernamen).
- Für ein besseres Spielerlebnis können weitere Features ergänzt werden (z.B. Anzeige der Punkte, Hinweise, Namenseingabe).
- Der Server muss für alle Spieler erreichbar sein (ggf. Firewall/Netzwerk beachten).

Viel Spaß beim Spielen und Entwickeln! Bei Fragen oder Feature-Wünschen gerne melden.
