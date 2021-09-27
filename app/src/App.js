import React, { useEffect, useState } from "react";

import SquareComponent from "./SquareComponent";
import * as apiClient from "./apiClient";

// clears all the square values
const clearState = ["", "", "", "", "", "", "", "", "", ""];

// based off this YouTube Tutorial: https://www.youtube.com/watch?v=ZH9RXSVjj4Y

// App Component
function App() {
  //useState for users
  const [users, setUsers] = React.useState([]);
  // const [oSelected, setOSelected] = React.useState(null);
  // const [xSelected, setXSelected] = React.useState(null);
  //loadUsers function
  const loadUsers = async () => {
    const result = await apiClient.getUsers();
    setUsers(result);
    console.log(result);
  };

  //adduser function to reload with new list of users on the page
  const addUser = (user) => {
    console.log(user);
    //getting user and making insertion into db
    apiClient.addUser(user).then(loadUsers);
  };

  //updateScore function to change the scores
  const updateScore = (player_name) => {
    const winnerId = player_name == "X" ? users[0].users.id : users[0].users.id;
    console.log(player_name);
    // console.log(winnerId);
    //getting user and making insertion into db
    apiClient.updateScore(player_name).then(loadUsers);
  };
  //work with gameState which tracks the the winner

  //whatever user is the winner, add 1 to their database score

  //look for players in database, if they're there, set winCounter to player's winCount then update winCounter when player wins again

  // Game States: gameState, isXChange
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
      // console.log(winner);
      clearGame();
      alert(`You ${winner} won the Game !`);
      // console.log(winner);
    }
  }, [gameState]);

  //checks for winner
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
    // console.log(
    //   "Class: App, Function: checkWinner ==",
    //   gameState[0],
    //   gameState[1],
    //   gameState[2],
    // );
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
      <p className="heading-text">Tickety Tac Toe Game</p>
      <UsersList users={users} />
      <AddUsers addUser={addUser} updateScore={updateScore} />
      {/* <LeaderBoard /> */}
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
    <h2>Leaderboard of Players</h2>
    <table className="center">
      <thead>
        <tr>
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

const AddUsers = ({ winner, users, addUser, updateScore, checkWinner }) => {
  const onSubmit = (event) => {
    //onsubmit will check if it is an existing user and send them to updatescore function
    //check if users is in the database

    //if user is in database, add score

    //add user if new user and update score

    //winner passed down to app (either x or o)
    // let winner = checkWinner();
    // if (winner === "O") {
    //   console.log(winner);
    //   updateScore(users.player_name[(1, 3)]);
    //   // alert(`You ${winner} won the Game !`);
    // } else {
    //   updateScore(users.player_name[(0, 3, 4)]);
    // }

    //stops page from reloading after submitting
    event.preventDefault();
    //create element form as even target
    const form = event.currentTarget;
    const {
      player_name: { value: player_name },
      x_or_o: { value: x_or_o },
    } = form.elements;
    console.log(player_name, x_or_o);
    //call method addUser and connect to API CLient and calling function for API client to make post request
    addUser({ player_name, x_or_o });
    // updateScore({ player_name, x_or_o });
    //call adduser when you updateScore

    //everytimg add button is click, form is cleared
    form.reset();
  };
  return (
    <>
      <h3>Enter Player Information</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">
          Name
          <input name="player_name" placeholder="Enter name" required />
        </label>
        <label htmlFor="x_or_o">
          <input name="x_or_o" placeholder="Enter X or O" required />
        </label>
        <button>Add Player</button>
      </form>
      <h3>X or O?</h3>
      {/* <h3>PLayer Two</h3> */}
      {/* <form onSubmit={onSubmit}>
        <label htmlFor="name">
          Name
          <input name="player_name" placeholder="Enter name" required />
        </label>
        <label htmlFor="x_or_o">
          <input name="x_or_o" placeholder="Enter X or O" required />
        </label>
        <button>Add Player</button>
      </form> */}
    </>
  );
};

export default App;
