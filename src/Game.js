import React, { Component } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import './Game.scss';

const OPTIONS = [
  <i name="0" className="fa fa-hand-rock-o" aria-hidden="true"></i>,
  <i name="1" className="fa fa-hand-paper-o" aria-hidden="true"></i>,
  <i name="2" className="fa fa-hand-scissors-o" aria-hidden="true"></i>
];

const DEFAULT_STATE = {
  resultText: '',
  playerMove: 0,
  computerMove: 0,
  playerScore: 0,
  computerScore: 0,
  winner: false,
  showResults: false,
};

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = DEFAULT_STATE;

    this.onClick = this.onClick.bind(this);
    this.back = this.back.bind(this);
    this.checkForVictory = this.checkForVictory.bind(this);
    this.hideResults = this.hideResults.bind(this);
  }

  onClick(e) {
    let playerMove = 0;
    let computerMove = 0;
    let resultText = '';
    let playerScore = this.state.playerScore;
    let computerScore = this.state.computerScore;

    if (e.target.tagName !== 'I') return;

    playerMove = parseInt(e.target.getAttribute('name'), 10);
    computerMove = this.getComputerMove();

    switch (true) {
      case playerMove === computerMove:
        resultText = 'ties';
        break;
      case playerMove > computerMove &&
        !(playerMove === 2 && computerMove === 0) ||
        (playerMove === 0 && computerMove === 2):
        resultText = 'beats';
        playerScore++;
        break;
      default:
        resultText = 'losses to';
        computerScore++;
    }

    this.setState({
      resultText,
      playerMove,
      computerMove,
      playerScore,
      computerScore,
    }, this.checkForVictory);
  }

  checkForVictory() {
    let winner;

    if (this.state.playerScore > this.props.bestOf / 2) {
      winner = 'Player';
    } else if (this.state.computerScore > this.props.bestOf / 2) {
      winner = 'Computer';
    }

    this.setState({
      showResults: true,
      winner,
    });
  }

  hideResults() {
    this.setState({
      showResults: false,
    });
  }

  getComputerMove() {
    return _.random(0, 2);
  }

  back() {
    this.setState(DEFAULT_STATE);
    this.props.onBack();
  }

  renderGame() {
    if (this.state.winner) {
      return (
        <div
          className={classnames('options', {
            show: !this.state.showResults
          })}
        >
          {this.state.winner} wins!
        </div>
      );
    }

    return (
      <div
        className={classnames('options', {
          show: !this.state.showResults
        })}
        onClick={this.onClick}
        children={OPTIONS}
      />
    );
  }

  renderResults() {
    return (
      <div
        className={classnames('result', {
          show: this.state.showResults
        })}
        onClick={this.hideResults}
      >
        {OPTIONS[this.state.playerMove]}
        {this.state.resultText}
        {OPTIONS[this.state.computerMove]}
      </div>
    );
  }

  render() {
    return (
      <div className="App-game">
        <div className="play-area">
          {this.renderGame()}
          {this.renderResults()}
        </div>
        <div className="score">
          {this.state.playerScore} - {this.state.computerScore}
        </div>
        <input
          value="Back"
          type="button"
          onClick={this.back}
        />
      </div>
    );
  }
}

Game.defaultProps = _.defaults({
  bestOf: 3,
  onBack: _.noop,
}, Component.defaultProps);

export default Game;
