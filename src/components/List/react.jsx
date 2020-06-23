import React from 'react'
import List from './index'

export default class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: {
        a: 'aa',
        b: 'bb',
      }
    }
  }
  
  onAdd = () => {
    this.setState(pre => ({ list: Object.assign({}, pre.list, { [Math.random()]: 'value' }) }))
  }

  handleDelete = (key) => {
    console.log(key)
  }

  handleEdit = (key) => {
    console.log(key)
  }

  onClick = (key) => {
    console.log(key)
  }

  render() {
    const { list } = this.state
    return (
      <div>
        <List>
          {Object.entries(list).map(([key, _value]) => (
            <List.Item
              key={key}
              title={key}
              description={_value || '-'}
            />
          ))}
        </List>
        <br/><br/><br/>
        <List>
          {Object.entries(list).map(([key, _value]) => (
            <List.Item
              key={key}
              status="error"
              extras="extras"
              details={[{ title: 'title', description: 'description' }]}
              icon="home"
              title={key}
              description={_value || '-'}
              onDelete={this.handleDelete.bind(this, key)}
              onEdit={this.handleEdit.bind(this, key)}
              onClick={this.onClick.bind(this, key)}
            />
          ))}
          <List.Add
            title="添加数据"
            description="添加键/值对形式数据"
            onClick={this.onAdd}
          />
        </List>
      </div>
    )
  }
}