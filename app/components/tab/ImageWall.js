import React, { Component, PropTypes } from 'react';
import ImageHolder from './ImageHolder'
import './ImageWall.css'
import images from '../../reducers/images';

export default class ImageWall extends Component {

  static propTypes = {
    datas: PropTypes.array.isRequired,
  }

  render () {
    const { datas } = this.props
    return (
      <div className="image-wall">
        {
          datas.map((data, idx) => {
            return (
              <ImageHolder data={data} key={idx}/>
            )
          })
        }
        <img id="hidden-image" className="hidden-image"/>
      </div>
    )
  }
}