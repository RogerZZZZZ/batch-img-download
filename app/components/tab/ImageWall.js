import React, { Component, PropTypes } from 'react';
import ImageHolder from './ImageHolder'

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
      </div>
    )
  }
}