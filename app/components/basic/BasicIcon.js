import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import './BasicIcon.css'

export default class BasicIcon extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
  }

  render() {
    const { name, size } = this.props

    const classes = classnames({
      'zmdi': true,
      [`zmdi-hc-${size}`]: true,
      [`zmdi-${name}`]: true,
    })

    return (
      <div className="basic-icon-wrapper">
        <i className={classes}/>
      </div>
    )
  }
}
