import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import * as TodoActions from '../actions/todos';

@connect(
  state => ({
    todos: state.todos
  }),
  dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
  })
)
export default class Tab extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { actions } = this.props;

    return (
      <div>
        <Header addTodo={actions.addTodo} />
      </div>
    );
  }
}
