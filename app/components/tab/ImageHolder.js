import React, { Component, PropTypes } from 'react'
import { Button, Checkbox } from 'element-react'
import BasicIcon from '../basic/BasicIcon'
import 'element-theme-default'
import './ImageHolder.css'
import images from '../../reducers/images';

export default class ImageHolder extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    idx: PropTypes.number.isRequired,
  }

  static contextTypes = {
    checked: PropTypes.func,
    download: PropTypes.func,
    remove: PropTypes.func,
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      checked: false,
    }
  }

  toggle(checked) {
    this.context.checked(checked, this.props.idx)
  }

  download() {
    console.log('download innser')
    this.context.download(this.props.data.src)
  }

  remove() {
    this.context.remove(this.props.idx)
  }

  render () {
    const { data } = this.props
    return (
      <div className="image-holder">
        <div className="image-container">
          <img src={data.src} className="image-item" />
        </div>
        <div className="operation-container">
          <Checkbox checked={this.state.checked} onChange={this.toggle.bind(this)}/>

          <div className="button-container">
            <BasicIcon onClick={this.remove.bind(this)} name="delete" size="2x"/>
            <BasicIcon onClick={this.download.bind(this)} name="download" size="2x"/>
          </div>
        </div>
      </div>
    )
  }
}