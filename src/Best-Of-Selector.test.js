import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import { mount } from 'enzyme';
import BestOfSelector from './Best-Of-Selector';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BestOfSelector />, div);
});

test('BestOfSelector calls callback onSubmit', () => {
  const E = new Event('submit');
  const ON_SUBMIT = sinon.spy();
  const COMPONENT = mount(
    <BestOfSelector onSubmit={ON_SUBMIT} />
  );

  COMPONENT.find('form').simulate('submit', E);

  // test that callback fired
  expect(ON_SUBMIT.callCount).toBe(1);
});

test('BestOfSelector sets defaultValue', () => {
  const COMPONENT = mount(
    <BestOfSelector bestOf={5} />
  );

  // test that prop is set
  expect(COMPONENT.props().bestOf).toBe(5);

  // test that value is set
  expect(COMPONENT.node.refs.bestOf.value).toBe('5');
});
