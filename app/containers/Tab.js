import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ImageActions from '../actions/images'


@connect(
  state => ({
    images: state.images
  }),
  dispatch => ({
    actions: bindActionCreators(ImageActions, dispatch)
  })
)
export default class Tab extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { actions, images } = this.props;

    console.log('------', images)

    return (
      <div>
        {
          images.map((image, idx) => 
            <img src={image.src} key={idx}/>
          )
        }
      </div>
    );
  }
}
