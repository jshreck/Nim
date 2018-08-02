import React, { Component } from 'react';
import Pile from './components/Pile'
import './App.css';

class App extends Component {
  state = {
    piles: {
      pile1: 0,
      pile2: 0,
      pile3: 0,
    },
    currentPlayer: {
      name: "Player 1",
      pile: 0,
      picked: 0,
    }
  }

  //at start, set piles to random numbers
  componentWillMount() {
    const piles = {
      // pile1: 1,
      // pile2: 1,
      // pile3: 1
      pile1: Math.floor(Math.random() * 20) + 1,
      pile2: Math.floor(Math.random() * 20) + 1,
      pile3: Math.floor(Math.random() * 20) + 1
    }
    this.setState({ piles: piles });
  }

  //when nextPlayer button clicked, set up next player (blank obj)
  nextPlayer = () => {

    this.setState((prevState) => {
      let currentPlayer = prevState.currentPlayer;
      if (currentPlayer.picked !==0) {
      currentPlayer.name === "Player 1" ? currentPlayer = "Player 2" : currentPlayer = "Player 1";
      const nextPlayer = {
        name: currentPlayer,
        pile: 0,
        picked: 0
      }
      return { currentPlayer: nextPlayer };
    }
    else {
      alert("Please pick at least 1 stick before switching players");
    }
    })
  }

  //when a stick is clicked
  handleStickClick = (e) => {
    const pileClicked = e.target.getAttribute("data-pile");
    console.log("clicked: " + pileClicked);

    this.checkSelection(pileClicked); //checkSelection -> takeAwayStick, checkGameStatus

  }


  checkSelection = (pile) => {
    this.setState((prevState) => {

      const currentPlayer = prevState.currentPlayer;

      //player must be picking from same pile
      if (currentPlayer.pile === 0 || currentPlayer.pile === pile) {
        currentPlayer.pile = pile;
        console.log("same pile or first pick, continue");

        //player must have picked <= 3 sticks
        if (currentPlayer.picked === 3) {
          alert("You cannot pick more than 3 sticks")
        }
        else {
          currentPlayer.picked++;
          console.log("3 or less sticks, continue");

          this.takeAwayStick(pile);
          console.log("current Player = " + currentPlayer);
          return { currentPlayer: currentPlayer }
        }
      }
      else {
        alert("You must choose sticks from the same pile");
      }
    });
  }

  takeAwayStick = (pile) => {
    this.setState((prevState) => {
      const piles = prevState.piles
      piles[pile]--;
      this.checkGameStatus();
      return { piles: piles };
    })
  }

  checkGameStatus = () => {
    console.log("hitting")
    let sum = 0;
    const piles = this.state.piles;

    for (let property in piles) {
      sum += piles[property];
      console.log(sum);
    }
    console.log(`Remaining sticks total = ${sum}`);

    if (sum <= 0) {
      alert(`Game Over, ${this.state.currentPlayer.name} loses. Refresh to play again.`);
    }
  }



  render() {
    return (
      <div>
        <br/>
        <button onClick={this.nextPlayer}>next player</button>
        <h3>{this.state.currentPlayer.name}</h3>

        {Object.keys(this.state.piles).map(((key, i) =>
          <div key={key}>
            <Pile
              numberSticks={this.state.piles[key]}
              handleStickClick={this.handleStickClick}
              pile={key}
            />
          </div>
        ))}

      </div>
    );
  }
}

export default App;
