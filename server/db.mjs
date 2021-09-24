import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

// export const getTasks = () => db.any("SELECT * FROM tasks");

// export const addTask = (name) =>
//   db.one("INSERT INTO tasks(name) VALUES(${name}) RETURNING *", { name });

//get users in db
export const getUsers = async () =>
  await db.any("SELECT * FROM tictactoe ORDER BY number_of_wins DESC LIMIT 5");
// export const getUsers = () => db.any("SELECT * FROM tictactoe");

// add users to db
export const addUser = async ({ player_name, x_or_o }) =>
  await db.any(
    "INSERT INTO tictactoe(player_name, x_or_o, number_of_wins) VALUES($1, $2, $3)",
    [player_name, x_or_o, 0],
  );

// export const addUser = ({ player_name, x_or_no }) =>
//   db.one(
//     "INSERT INTO tictactoe(player_name, x_or_o, number_of_wins) VALUES($1, $2) RETURNING *",
//     [player_name, x_or_o, 0],
//   );

// export const addPlayer = (name) =>
//   db.one(
//     "INSERT INTO players(name, wins, losses, ties) VALUES($1, $2, $3, $4) RETURNING *",
//     [name, 0, 0, 0],
//   );
// export const addUser = ({ player_name, x_or_no, number_of_wins }) =>
// db.one(
//   "INSERT INTO tictactoe(player_name, x_or_o, number_of_wins) VALUES(${player_name}, ${x_or_o}, ${number_of_wins}) RETURNING *",
//   { player_name, x_or_o, number_of_wins },
// );

//add user score by one each time
export const updateScore = ({ player_name }) =>
  db.one(
    "UPDATE tictactoe SET number_of_wins = number_of_wins + 1 WHERE player_name = ${player_name} RETURNING *",
    { player_name },
  );
// export const addScore = ({ player_name }) =>
//   db.one(
//     "UPDATE tictactoe SET number_of_wins = number_of_wins + 1 WHERE player_name = ${player_name} RETURNING *",
//     { player_name },
//   );

// select from the table top 5 in descending order
// export const getTopFive = () =>
//   db.any(
//     "SELECT number_of_wins FROM tictactoe GROUP BY number_of_wins ORDER BY number_of_wins DESC LIMIT 5",
//   );

function initDb() {
  let connection;

  if (process.env.DATABASE_URL === undefined) {
    dotenv.config({ path: "../.env" });
    connection = {
      user: "postgres",
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: 5442,
    };
  } else {
    connection = {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };
  }

  return pgp()(connection);
}
