import React, { useEffect, useState } from "react";

import LeaderBoard from "./LeaderBoard";
import SquareComponent from "./SquareComponent";
import * as apiClient from "./apiClient";

// clears all the square values
const clearState = ["", "", "", "", "", "", "", "", "", ""];

// based off this YouTube Tutorial: https://www.youtube.com/watch?v=ZH9RXSVjj4Y

// App Component
function App() {
  //useState for users
  const [users, setUsers] = React.useState([]);
  const loadUsers = async () => {
    setUsers(await apiClient.getUsers());
  };

  // Two States: 1) gameState, 2) isXChange
  //**  determines the winner?************************************************************???
  const [gameState, updateGameState] = useState(clearState);
  // changes X to O
  const [isXChange, updateIsXChange] = useState(false);

  // click function that an index
  const onUserClicked = (index) => {
    // takes the array from gameState
    let strings = Array.from(gameState);
    // ** checks the array from gameState, if it has the index, just return*****************???
    if (strings[index]) return;
    strings[index] = isXChange ? "X" : "O";
    updateIsXChange(!isXChange);
    updateGameState(strings);
  };

  const clearGame = () => {
    updateGameState(clearState);
  };
  useEffect(() => {
    loadUsers();
    let winner = checkWinner();
    if (winner) {
      clearGame();
      alert(`You ${winner} won the Game !`);
    }
  }, [gameState]);

  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    console.log(
      "Class: App, Function: checkWinner ==",
      gameState[0],
      gameState[1],
      gameState[2],
    );
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        return gameState[a];
      }
    }
    return null;
  };

  return (
    <div className="app-header">
      <p className="heading-text">Tic-Tac-Toe</p>
      <UsersList users={users} />
      <LeaderBoard />
      <div className="row jc-center">
        <SquareComponent
          className="b-bottom-right"
          onClick={() => onUserClicked(0)}
          state={gameState[0]}
        />
        <SquareComponent
          className="b-bottom-right"
          onClick={() => onUserClicked(1)}
          state={gameState[1]}
        />
        <SquareComponent
          className="b-bottom"
          onClick={() => onUserClicked(2)}
          state={gameState[2]}
        />
      </div>
      <div className="row jc-center">
        <SquareComponent
          className="b-bottom-right"
          onClick={() => onUserClicked(3)}
          state={gameState[3]}
        />
        <SquareComponent
          className="b-bottom-right"
          onClick={() => onUserClicked(4)}
          state={gameState[4]}
        />
        <SquareComponent
          className="b-bottom"
          onClick={() => onUserClicked(5)}
          state={gameState[5]}
        />
      </div>
      <div className="row jc-center">
        <SquareComponent
          className="b-right"
          onClick={() => onUserClicked(6)}
          state={gameState[6]}
        />
        <SquareComponent
          className="b-right"
          onClick={() => onUserClicked(7)}
          state={gameState[7]}
        />
        <SquareComponent
          onClick={() => onUserClicked(8)}
          state={gameState[8]}
        />
      </div>
      <button className="clear-button" onClick={clearGame}>
        Clear Game
      </button>
    </div>
  );
}

const UsersList = ({ users }) => (
  <>
    <h2>Users</h2>
    <table className="center">
      <thead>
        <tr>
          <th>Id</th>
          <th>Player Name</th>
          <th>X or O</th>
          <th>Number of Wins</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ id, player_name, x_or_o, number_of_wins }) => (
          <tr key={id}>
            <td>{player_name}</td>
            <td>{x_or_o}</td>
            <td>{number_of_wins}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
);

export default App;
