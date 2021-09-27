import React from "react";

import App from "./App";

function LeaderBoard({ gameState }) {
  return (
    <div>
      <table className="center">
        <thead>
          {/* <tr>
            <th>Id</th>
            <th>Player Name</th>
            <th>X or O</th>
            <th>Number of Wins</th>
          </tr> */}
        </thead>
        <tbody>
          {/* {gameState.map(({ id, player_name, x_or_o, number_of_wins }) => (
            <tr key={id}>
              <td>{player_name}</td>
              <td>{x_or_o}</td>
              <td>{number_of_wins}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderBoard;
