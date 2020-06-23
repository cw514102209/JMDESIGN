import React from 'react'
import { Icon } from 'antd'
import PropTypes from 'prop-types'

import './index.less'

const STATES = {
  current: 'Setting up',
  finished: 'Has been set',
  notfinish: 'Not set',
}

const Step = ({ step, state }) => (
  <li className={styles[state]}>
    <div className={styles.icon}>
      <Icon type={step.icon || 'twitter'} size={40} />
    </div>
    <div className={styles.text}>
      <div>{step.title}</div>
      <p>{STATES[state]}</p>
    </div>
  </li>
)

export default class Steps extends React.Component {
  static propTypes = {
    steps: PropTypes.array.isRequired,
    current: PropTypes.number.isRequired,
  }

  getState = index => {
    const { current } = this.props
    if (index === current) {
      return 'current'
    } else if (index < current) {
      return 'finished'
    }

    return 'notfinish'
  }

  render() {
    const { steps } = this.props

    return (
      <div className={styles.steps}>
        <ul>
          {steps.map((step, index) => (
            <Step key={step.title} step={step} state={this.getState(index)} />
          ))}
        </ul>
      </div>
    )
  }
}
