import React, { Component } from 'react';
import { Checkbox } from 'element-react'
import 'element-theme-default'
import './PopUp.css'

export default class PopUp extends Component {

  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      options: ['Image', 'Background'],
      checked: ['Image'],
    };
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
      </div>
    );
  }
}
