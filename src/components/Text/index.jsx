import React from 'react'
import { Icon } from 'antd'
import PropTypes from 'prop-types'
import { isUndefined } from 'lodash'
import classNames from 'classnames'

import './index.less'

export default class Text extends React.PureComponent {
  static propTypes = {
    icon: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
    description: PropTypes.string
  }

  render() {
    const { icon, title, description, className } = this.props

    return (
      <div className={classNames('jm_text_wrapper', className)}>
        {icon && <Icon className="jm_text_icon" type={icon} style={{ fontSize: 40 }} />}
        <div className="jm_text_content">
          <div>{isUndefined(title) || title === '' ? '-' : title}</div>
          <p>{description}</p>
        </div>
      </div>
    )
  }
}
