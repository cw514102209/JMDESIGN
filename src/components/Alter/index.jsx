import React, { PureComponent } from 'react'
import { Icon } from 'antd'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './index.less'

const ICON_COLORS = {
  success: {
    color: '#52c41a',
  },
  info: {
    color: '#1890ff',
  },
  error: {
    color: '#f5222d',
  },
  warning: {
    color: '#faad14'
  },
}

const ICONS = {
  success: 'check-circle',
  info: 'info-circle',
  error: 'close-circle',
  warning: 'exclamation-circle',
  default: 'question-circle',
}

export default class Alert extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(['success', 'info', 'error', 'warning', 'default']),
    icon: PropTypes.string,
    message: PropTypes.string,
    description: PropTypes.string,
    showIcon: PropTypes.bool,
    closable: PropTypes.bool,
    closeText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  }

  static defaultProps = {
    type: 'default',
    showIcon: false,
    closable: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      hidden: false
    }
  }

  onHidden() {
    this.setState({ hidden: true })
  }

  renderIcon() {
    const { icon, type, message, description } = this.props
    const iconType = icon || ICONS[type]
    return (
      <Icon
        className={classnames('jm_alter_icon',
          {
            'jm_alter_large': message && description
          }
        )}
        theme="filled"
        type={iconType}
        style={ICON_COLORS[type]}
      />
    )
  }

  render() {
    const { hidden } = this.state
    const { className, type, showIcon, message, description, closable, closeText } = this.props

    return (
      <div className={classnames('jm_alter_wrapper', [`jm_alter_${type}`], { jm_alter_hidden: hidden }, className)}>
        {showIcon && this.renderIcon()}
        <div className="jm_alter_description">
          {message && <h3>{message}</h3>}
          <span>{description}</span>
        </div>
        {closable && (
          <div className="jm_alter_close" onClick={this.onHidden.bind(this)}>
            {closeText || <Icon type="close" />}
          </div>
        )}
      </div>
    )
  }
}