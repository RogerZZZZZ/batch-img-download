import React, { Component, PropTypes } from 'react'
import './SettingItem.css'

export default class SettingItem extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  slot() {
    return this.props.children
  }

  render() {
    const { title } = this.props
    return (
      <div className="item-container">
        <div className="title-wrap">
          <span>{title}</span>
        </div>
        <div className="button-container">
          {this.slot()}
        </div>
      </div>
    )
  }
}
