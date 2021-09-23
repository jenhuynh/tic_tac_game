import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

export const getTasks = () => db.any("SELECT * FROM tasks");

export const addTask = (name) =>
  db.one("INSERT INTO tasks(name) VALUES(${name}) RETURNING *", { name });

export const getUsers = () => db.any("SELECT * FROM tictactoe");

export const addUser = ({ player_name }) =>
  db.any(
    "INSERT INTO tictactoe(player_name, x_or_o, number_of_wins) VALUES(${player_name}, ${x_or_o}, ${number_of_wins}) RETURNING *",
    { player_name, x_or_o, number_of_wins },
  );

// select from the table top 5 in descending order
export const getTopFive = () =>
  db.any(
    "SELECT number_of_wins FROM tictactoe GROUP BY number_of_wins ORDER BY number_of_wins DESC LIMIT 5",
  );

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
