import React from 'react'
import CodeEditor from './index'

export default class MyComponent extends React.Component {
  state = {
    valuesYaml: '',
  }

  handleYamlChange = value => {
    this.setState({ valuesYaml: value })
  }

  render() {
    const { valuesYaml } = this.state
    return (
      <div>
        <CodeEditor
          mode="yaml"
          value={valuesYaml}
          options={{
            readOnly: false,
            width: '100%',
            height: '100%',
          }}
          onChange={this.handleYamlChange}
        />
      </div>
    )
  }
}