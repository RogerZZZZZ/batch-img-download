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
      source: ['Image'],
      modes: ['Single Select', 'Scope Select'],
      currMode: 'Single Select',
    };
  }

  run() {
    const config = {
      sources: this.state.source,
      mode: this.state.currMode,
    }
    this.props.runExtract(config)
    // window.close()
  }

  sourceSelect(val) {
    this.setState({
      source: val,
    })
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
            <Checkbox.Group value={this.state.source} onChange={this.sourceSelect.bind(this)}>
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
        </div>

        <div className="bottom-container">
          <Button onClick={this.run.bind(this)}>OK</Button>
        </div>
      </div>
    );
  }
}
