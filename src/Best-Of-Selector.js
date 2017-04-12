import React, { Component } from 'react';
import _ from 'lodash';
import './Best-Of-Selector.scss';

class BestOfSelector extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.refs.bestOf.value);
  }

  render() {
    return (
      <form
        className="App-best-of"
        onSubmit={this.onSubmit}
      >
        <label>Best of </label>
        <input
          ref="bestOf"
          type="number"
          min="1"
          max="99"
          defaultValue={this.props.bestOf}
        />
        <input
          type="submit"
          value="Play!"
        />
        <span>
          {this.props.bestOf}
        </span>
      </form>
    );
  }
}

BestOfSelector.defaultProps = _.defaults({
  bestOf: 3,
  onChange: _.noop,
}, Component.defaultProps);

export default BestOfSelector;
