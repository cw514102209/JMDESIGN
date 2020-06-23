import React, { PureComponent } from 'react'
import { Spin } from 'antd'
import { isString } from 'lodash'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './index.less'

export default class Card extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    loading: PropTypes.bool,
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.node,
    ]),
    extra: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.node,
    ]),
    header: PropTypes.node,
    empty: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.node,
    ]),
    isEmpty: PropTypes.bool,
    headStyle: PropTypes.string,
    bodyStyle: PropTypes.string,
  }

  static defaultProps = {
    title: '',
    type: 'default',
    isEmpty: false,
  }

  renderTitle() {
    const { header, headStyle, title, extra } = this.props

    if (header) {
      return (
        <div className={headStyle}>
          {header}
        </div>
      )
    }

    if (!title && !extra) return null

    return (
      <div className="jm_card_title">
        {extra && <div className="jm_card_extra">{extra}</div>}
        {title}
      </div>
    )
  }

  renderContent() {
    const { empty, children, isEmpty, bodyStyle } = this.props

    if (isEmpty || !children) {
      return isString(empty) ? (
        <div className="jm_card_empty">{empty}</div>
      ) : (
        empty
      )
    }

    return <div className={bodyStyle}>{children}</div>
  }

  render() {
    const {
      className,
      type,
      loading,
      ...rest
    } = this.props

    return (
      <div
        className={classnames('jm_card_wrapper', className, `jm_card_${type}`)}
        {...rest}
      >
        {this.renderTitle()}
        {loading ? (
          <Spin className="jm_card_loading" />
        ) : (
          this.renderContent()
        )}
      </div>
    )
  }
}
