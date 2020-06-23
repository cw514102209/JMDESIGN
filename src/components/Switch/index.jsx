import { isEmpty } from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Button from '../Button'
import './index.less'

export default class Switch extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    text: PropTypes.string,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    type: 'default',
    checked: false,
    onChange() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      on: props.checked,
    }
  }

  toggleSwitch = () => {
    const on = !this.state.on
    this.props.onChange(on)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.state.on) {
      this.setState({ on: nextProps.checked })
    }
  }

  render() {
    const { className, disabled, type, text } = this.props
    const { on } = this.state
    const hasText = !isEmpty(text)

    return (
      <Button
        className={classNames(
          'jm_switch_wrapper',
          {
            [`jm_switch_${type}`]: on,
          },
          className,
        )}
        type="default"
        onClick={this.toggleSwitch}
      >
        <label
          className={classNames('jm_switch_label', {
            jm_switch_disabled: disabled,
            jm_switch_on: on,
          })}
        >
          {hasText && <span className="jm_switch_inner">{text}</span>}
        </label>
      </Button>
    )
  }
}
