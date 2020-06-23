import React from 'react'
import Switch from './index'

export default class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  onChange(type) {
    this.setState(prevState => ({
      [`checked${type}`]: !prevState[`checked${type}`]
    }))
  }

  render() {
    const { checkeddefault, checkedprimary, checkedcontrol } = this.state
    return (
      <div>
        <Switch
          checked={checkeddefault}
          text={checkeddefault ? 'default' : 'off'}
          onChange={this.onChange.bind(this, 'default')}
        />
        <br /><br />
        <Switch
          type="primary"
          checked={checkedprimary}
          text={checkedprimary ? 'primary' : 'off'}
          onChange={this.onChange.bind(this, 'primary')}
        />
        <br /><br />
        <Switch
          type="control"
          checked={checkedcontrol}
          text={checkedcontrol ? 'control' : 'off'}
          onChange={this.onChange.bind(this, 'control')}
        />
      </div>
    )
  }
}