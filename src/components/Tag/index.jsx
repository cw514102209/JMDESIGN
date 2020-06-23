import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './index.less'

export default class Tag extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    type: 'default',
  }

  render() {
    const { type, children, className } = this.props
    return (
      <span className={classNames('jm_tag_wrapper', `jm_tag_${type}`, className)}>
        {children}
      </span>
    )
  }
}
