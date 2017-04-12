import React, { Component } from 'react';
import classnames from 'classnames';
import BestOfSelector from './Best-Of-Selector';
import Game from './Game';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      play: false,
      bestOf: 3,
    };

    this.onBestOfSelection = this.onBestOfSelection.bind(this);
    this.onGameBack = this.onGameBack.bind(this);
  }

  onBestOfSelection(bestOf) {
    this.setState({
      play: true,
      bestOf,
    });
  }

  onGameBack() {
    this.setState({
      play: false,
    });
  }

  getClassName() {
    return classnames('App', {
      play: this.state.play,
    });
  }

  render() {
    return (
      <div className={this.getClassName()}>
        <div className="App-header">
          <h2>Rock Paper Scissors!!!</h2>
        </div>
        <main>
          <BestOfSelector
            bestOf={this.state.bestOf}
            onSubmit={this.onBestOfSelection}
          />
          <Game
            bestOf={this.state.bestOf}
            onBack={this.onGameBack}
          />
        </main>
      </div>
    );
  }
}

export default App;
