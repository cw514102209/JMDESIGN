import React, { PureComponent } from 'react'
import { Icon } from 'antd'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isString } from 'lodash'

import './index.less'

export default class Banner extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(['white', 'light', 'dark', 'purple']),
    icon: PropTypes.string,
    iconClass: PropTypes.string,
    iconTheme: PropTypes.oneOf(['filled', 'outlined']),
    rightIcon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.element,
    ]),
    title: PropTypes.string,
    description: PropTypes.string,
    extra: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.element,
    ]),
  }

  static defaultProps = {
    type: 'light',
    icon: 'global',
    iconTheme: 'outlined',
  }

  renderRightIcon() {
    const { rightIcon } = this.props

    if (!rightIcon) return null

    if (isString(rightIcon)) {
      return <img className="jm_banner_rightIcon" src={rightIcon} alt="img" />
    }

    return rightIcon
  }

  renderExtraInfo() {
    const { extra } = this.props

    if (!extra) return null

    return extra
  }

  render() {
    const { className, iconClass, type, icon, iconTheme, title, description } = this.props

    return (
      <div className={classnames('jm_banner_wrapper', className, `jm_banner_${type}`)}>
        {this.renderRightIcon()}
        <div className={classnames('jm_banner_icon', iconClass)}>
          {icon && (
            <Icon
              type={icon}
              theme={iconTheme}
              style={{ fontSize: 36 }}
            />
          )}
        </div>
        <div className="jm_banner_title">
          <div className="jm_banner_h3">{title}</div>
          <p>{description}</p>
        </div>
        {this.renderExtraInfo()}
      </div>
    )
  }
}
