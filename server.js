const WebSocket = require("ws");

const PORT = 8080;
const wss = new WebSocket.Server({ port: PORT });

// ===== GAME STATE =====
const WORDS = ["apple", "banana", "grape", "orange", "peach"];

let game = resetGame();

function resetGame() {
  return {
    word: WORDS[Math.floor(Math.random() * WORDS.length)],
    guesses: [],
    players: {},
  };
}

// ===== HELPERS =====
function broadcast(data) {
  const msg = JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
}

// ===== CONNECTION HANDLING =====
wss.on("connection", (ws) => {
  const id = Math.random().toString(36).slice(2);
  game.players[id] = { score: 0 };

  console.log(`Player connected: ${id}`);

  ws.send(
    JSON.stringify({
      type: "state",
      game,
    }),
  );

  ws.on("message", (message) => {
    const data = JSON.parse(message);

    if (data.type === "guess") {
      const guess = data.word.toLowerCase();

      if (game.guesses.includes(guess)) return;

      game.guesses.push(guess);

      if (guess === game.word) {
        game.players[id].score += 1;

        broadcast({
          type: "win",
          winner: id,
          word: game.word,
        });

        game = resetGame();

        broadcast({
          type: "state",
          game,
        });
      } else {
        broadcast({
          type: "state",
          game,
        });
      }
    }
  });

  ws.on("close", () => {
    delete game.players[id];
    console.log(`Player disconnected: ${id}`);
    broadcast({ type: "state", game });
  });
});

console.log(`🟢 Server running on ws://localhost:${PORT}`);
