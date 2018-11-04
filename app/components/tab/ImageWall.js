import React, { Component, PropTypes } from 'react';
import ImageHolder from './ImageHolder'
import './ImageWall.css'
import images from '../../reducers/images';

export default class ImageWall extends Component {

  static propTypes = {
    datas: PropTypes.array.isRequired,
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      list: this.props.datas
    }
  }

  componentWillReceiveProps(nextProp) {
    this.setState({
      list: nextProp.datas
    })
  }

  render () {
    return (
      <div className="image-wall">
        {
          this.state.list.map((data, idx) => {
            return (
              <ImageHolder data={data} key={idx} idx={idx}/>
            )
          })
        }
      </div>
    )
  }
}