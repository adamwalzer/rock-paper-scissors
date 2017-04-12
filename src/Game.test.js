import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import { mount } from 'enzyme';
import Game from './Game';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Game />, div);
});

test('Game calls callback onBack', () => {
  const ON_BACK = sinon.spy();
  const COMPONENT = mount(
    <Game onBack={ON_BACK} />
  );

  COMPONENT.find('input').simulate('click');

  // test that callback fired
  expect(ON_BACK.callCount).toBe(1);
});

test('Game sets state after click', () => {
  const COMPONENT = mount(
    <Game bestOf={20} />
  );

  // test that state sets right for rock
  COMPONENT.find('.options .fa-hand-rock-o').simulate('click');
  expect(COMPONENT.state().playerMove).toBe(0);

  // test that state sets right for paper
  COMPONENT.find('.options .fa-hand-paper-o').simulate('click');
  expect(COMPONENT.state().playerMove).toBe(1);

  // test that state sets right for scissors
  COMPONENT.find('.options .fa-hand-scissors-o').simulate('click');
  expect(COMPONENT.state().playerMove).toBe(2);
});

test('Game player and computer can win', () => {
  const COMPONENT = mount(
    <Game bestOf={3} />
  );

  // can player win?
  COMPONENT.node.setState({
    playerScore: 2
  });
  COMPONENT.node.checkForVictory();
  expect(COMPONENT.state().winner).toBe('Player');

  // can computer win?
  COMPONENT.node.setState({
    playerScore: 0,
    computerScore: 2,
  });
  COMPONENT.node.checkForVictory();
  expect(COMPONENT.state().winner).toBe('Computer');
});

test('Game starts timer', () => {
  const COMPONENT = mount(
    <Game bestOf={5} />
  );

  COMPONENT.node.startTimer();
  expect(COMPONENT.state().time).toBe(5);
});

test('Game keys work', () => {
  const E = new Event('keydown');
  const COMPONENT = mount(
    <Game bestOf={5} />
  );

  // rock
  COMPONENT.node.startTimer();
  E.keyCode = 49;
  window.dispatchEvent(E);
  expect(COMPONENT.state().playerMove).toBe(0);

  // paper
  COMPONENT.node.startTimer();
  E.keyCode = 50;
  window.dispatchEvent(E);
  expect(COMPONENT.state().playerMove).toBe(1);

  // scissors
  COMPONENT.node.startTimer();
  E.keyCode = 51;
  window.dispatchEvent(E);
  expect(COMPONENT.state().playerMove).toBe(2);
});
