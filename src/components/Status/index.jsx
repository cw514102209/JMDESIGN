import { isUndefined } from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Indicator from '../Indicator'

import './index.less'

export default class Status extends PureComponent {
  static propTypes = {
    style: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    total: PropTypes.number,
    ready: PropTypes.number,
    type: PropTypes.string,
    flicker: PropTypes.bool,
  }

  static defaultProps = {
    type: 'success',
    total: 100,
    ready: 0,
    flicker: false,
  }

  render() {
    const { style, className, name, type, total, ready, flicker } = this.props

    return (
      <span className={classNames('jm_status_status', className)} style={style}>
        <Indicator className="jm_status_indicator" type={type} flicker={flicker} />
        <strong>{name}</strong>
        {!isUndefined(total) && !isUndefined(ready) && (
          <span>
            &nbsp;({ready}/{total})
          </span>
        )}
      </span>
    )
  }
}
