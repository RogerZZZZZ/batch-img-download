import React, { Component, PropTypes } from 'react'
import { Checkbox, Button, Radio } from 'element-react'
import SettingItem from 'APP/components/popup/SettingItem'
import 'element-theme-default'
import './PopUp.css'

export default class PopUp extends Component {

  static propTypes = {
    runExtract: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      options: ['Image', 'Background'],
      checked: ['Image'],
      modes: ['Single Select', 'Scope Select'],
      currMode: 'Single Select',
    };
  }

  run(type) {
    const config = {
      checked: this.state.checked,
      type,
    }
    this.props.runExtract(config)
  }

  modeSelect(val) {
    this.setState({
      currMode: val,
    })
  }

  render() {
    return (
      <div className="container">
        <div className='header'>
          <img src="img/download.png" className='header-icon'/>
        </div>
        <div className="setting-container">
          <SettingItem title="Image Sources">
            <Checkbox.Group value={this.state.checked}>
              {
                this.state.options.map((opt, idx) => {
                  return (
                    <Checkbox.Button key={idx} label={opt}>{opt}</Checkbox.Button>
                  )
                })
              }
            </Checkbox.Group>
          </SettingItem>

          <SettingItem title="Mode Select">
            <Radio.Group value={this.state.currMode} onChange={this.modeSelect.bind(this)}>
                {
                  this.state.modes.map((mode, idx) => {
                    return (
                      <Radio.Button key={idx} value={mode}>{mode}</Radio.Button>
                    )
                  })
                }
              </Radio.Group>
          </SettingItem>
          
            {/* <Button onClick={this.run.bind(this, 'single')} className="button-item">Single</Button> */}
          <div>
            <Button onClick={this.run.bind(this)} className="button-item"></Button>
          </div>
        </div>
      </div>
    );
  }
}
