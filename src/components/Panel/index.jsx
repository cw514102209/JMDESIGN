import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './index.less'

export default class Panel extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    extras: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  }

  render() {
    const { className, title, children, extras } = this.props
    return (
      <div
        className="jm_panel_wrapper"
        data-test={`panel-${
          title
            ? title
                .toLowerCase()
                .split(' ')
                .join('-')
            : 'default'
        }`}
      >
        {title && <div className="jm_panel_title">{title}</div>}
        <div className={classNames('jm_panel_children', className)}>{children}</div>
        {extras}
      </div>
    )
  }
}
