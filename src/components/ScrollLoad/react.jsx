import React from 'react'
import ScrollLoad from './index'

export default class MyComponent extends React.Component {
  state = {
    isLoading: false,
    data: []
  }

  fetchNodes = () => {
    const { data } = this.state
    this.setState({ isLoading: true })
    setTimeout(() => {
      data.push(...[
        Math.random(), Math.random(), Math.random(), Math.random(), Math.random(),
        Math.random(), Math.random(), Math.random(), Math.random(), Math.random(),
      ])
      this.setState({ data, isLoading: false })
    }, 300)
  }

  render() {
    const { data, isLoading, page = 1 } = this.state
    return (
      <div>
        <ScrollLoad
          height={100}
          data={data}
          total={50}
          page={page}
          loading={isLoading}
          onFetch={this.fetchNodes}
        >
          {data.map((item, index) => (
            <div key={item}>
              {item}
            </div>
          ))}
        </ScrollLoad>
      </div>
    )
  }
}