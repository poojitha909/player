const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "cricketTeam.db");
let db = null;
const getPlayers = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000);
  } catch (e) {
    process.exit(1);
  }
};
getPlayers();

app.get("/players/", async (request, response) => {
  const query = `SELECT *
    FROM cricket_team
    ORDER BY player_id;`;
  const players = await db.all(query);
  response.send(players);
});

app.post("/players/", async (request, response) => {
  const details = request.body;
  const { player_id, player_name, jersey_number, role } = details;
  const playerCreate = `INSERT INTO
    cricket_team (player_id,player_name,jersey_number,role)
    VALUES 
   (
    ${player_id}
    ${player_name}
    ${jersey_number}
    ${role}
    );`;
  const addPlayer = await db.run(playerCreate);
  const playerId = addPlayer.lastID;
  response.send("Player Added to Team");
});
