import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './index.less'

export default class Indicator extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    flicker: PropTypes.bool,
  }

  static defaultProps = {
    type: 'success',
    flicker: false,
  }

  render() {
    const { className, type, flicker } = this.props

    return (
      <i
        className={classNames(
          'jm_indicator_icon',
          `jm_indicator_${type.toLowerCase()}`,
          {
            jm_indicator_flicker: flicker,
          },
          className,
        )}
      />
    )
  }
}
