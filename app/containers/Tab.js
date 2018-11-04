import React, { Component, PropTypes } from 'react'
import { Button, Message, MessageBox } from 'element-react'
import ImageWall from '../components/tab/ImageWall'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ImageActions from '../actions/images'
import 'element-theme-default'
import { downloadFromUrl } from '../lib/download'

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
    remove: PropTypes.func,
    download: PropTypes.func,
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      list: this.props.images.map(el => Object.assign(el, {checked: false}))
    }
    this.showMessage(`Successfully load ${this.props.images.length} pictures`, 'success')
  }

  getChildContext() {
    return {
      checked: this.chooseImage.bind(this),
      remove: this.removeImage.bind(this),
      download: this.downloadImage.bind(this),
    }
  }

  showMessage(message, type) {
    Message({
      message,
      type,
    })
  }

  chooseImage (checked, idx) {
    this.state.list[idx].checked = checked
  }

  downloadImage (src) {
    console.log(src, 'download')
  }

  removeImage (idx) {
    MessageBox.confirm('Are you sure to remove this image?', 'Warning', {
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    }).then(() => {
      Message({
        type: 'success',
        message: 'Remove Successfully!'
      })
      this.state.list.splice(idx, 1)
      this.setState({
        list: this.state.list
      })
      this.props.actions.removeImage(idx)
    })
  }

  download () {
    const waitingList = this.state.list.reduce((arr, el) => {
      if (el.checked) arr.push(el.src)
      return arr
    }, [])
    Promise.all(waitingList.map(downloadFromUrl)).then((e) => {
      this.showMessage(`Successfully download pictures`)
      console.log('successfully download', e)
    })
  }

  clearImages() {
    MessageBox.confirm('Are you sure to remove all images?', 'Warning', {
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    }).then(() => {
      Message({
        type: 'success',
        message: 'Remove Successfully!'
      })
      this.props.actions.clearImages()
    })
  }

  render() {
    return (
      <div>
        <ImageWall datas={this.state.list}/>

        <Button onClick={this.download.bind(this)}>Download</Button>
        <Button onClick={this.clearImages.bind(this)}>Clear</Button>
      </div>
    );
  }
}
