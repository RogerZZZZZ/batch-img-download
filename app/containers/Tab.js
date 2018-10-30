import React, { Component, PropTypes } from 'react'
import { Button } from 'element-react'
import ImageWall from '../components/tab/ImageWall'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ImageActions from '../actions/images'
import 'element-theme-default'

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
  }

  static childContextTypes = {
    checked: PropTypes.func,
  }

  getChildContext() {
    return {
      checked: this.chooseImage.bind(this),
    }
  }

  chooseImage (checked, idx) {
    this.state.list[idx].checked = checked
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      list: this.props.images.map(el => Object.assign(el, {checked: false}))
    }
  }

  download () {
    console.log(this.state)
  }

  render() {
    const { actions, images } = this.props;

    return (
      <div>
        <ImageWall datas={images}/>

        <Button onClick={this.download.bind(this)}>Download</Button>
      </div>
    );
  }
}
