import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './index.less'

export default class Bar extends React.Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string,
    rightText: PropTypes.string,
  }

  static defaultProps = {
    value: 0,
  }

  render() {
    const { className, value, text, rightText } = this.props

    const style = {
      width: `${value * 100}%`,
    }

    let type = 'default'
    if (value >= 0.8) {
      type = 'warning'
    }
    if (value >= 0.95) {
      type = 'danger'
    }

    const textStyle = {
      left: value > 0.35 ? `${(value / 2) * 100}%` : `${(value + 0.01) * 100}%`,
      transform: value > 0.35 ? 'translateX(-50%)' : '',
      color: value > 0.35 ? '#fff' : '#79879c',
    }

    return (
      <div className={classnames('jm_bar_wrapper', { jm_bar_large: text }, className)}>
        <div className={classnames('jm_bar_use', `jm_bar_${type}`)} style={style} />
        {text && !!value && (
          <span className="jm_bar_text" style={textStyle}>
            {text}
          </span>
        )}
        <span className="jm_bar_rightText">{rightText || (text && '无限制')}</span>
      </div>
    )
  }
}
