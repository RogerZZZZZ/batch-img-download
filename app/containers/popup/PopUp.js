import React, { Component, PropTypes } from 'react'
import { Checkbox, Button } from 'element-react'
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
    };
  }

  run(type) {
    const config = {
      checked: this.state.checked,
      type,
    }
    this.props.runExtract(config)
  }

  render() {
    return (
      <div className="container">
        <div className='header'>
          <img src="img/download.png" className='headerIcon'/>
        </div>
        <div>
          <Checkbox.Group value={this.state.checked}>
            {
              this.state.options.map((opt, idx) => {
                return (
                  <Checkbox.Button key={idx} label={opt}>
                    {opt}
                  </Checkbox.Button>
                )
              })
            }
          </Checkbox.Group>
        </div>
        <div className="button-container">
          <div>
            <Button onClick={this.run.bind(this, 'single')} className="button-item">Single</Button>
          </div>
          <div>
            <Button onClick={this.run.bind(this, 'scope')} className="button-item">Scope</Button>
          </div>
        </div>
      </div>
    );
  }
}
