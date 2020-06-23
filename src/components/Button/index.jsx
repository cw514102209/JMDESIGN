import React, {PureComponent} from 'react'
import { Spin, Icon } from 'antd'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './index.less'

const antIcon = <Icon type="loading" style={{ fontSize: 18 }} spin />

export default class Button extends PureComponent {
  static propTypes = {
    type: PropTypes.string,
    htmlType: PropTypes.oneOf(['submit', 'button', 'reset']),
    className: PropTypes.string,
    size: PropTypes.oneOf(['small', 'normal', 'large']),
    icon: PropTypes.string,
    iconSize: PropTypes.number,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    noShadow: PropTypes.bool,
    ghost: PropTypes.bool,
    block: PropTypes.bool,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    type: 'default',
    htmlType: 'button',
    size: 'normal',
    loading: false,
    disabled: false,
    noShadow: false,
    ghost: false,
    block: false,
    onClick() {},
  }

  render() {
    const {
      children,
      className,
      type,
      htmlType,
      size,
      icon,
      iconSize,
      loading,
      noShadow,
      ghost,
      block,
      ...rest
    } = this.props
    return (
      <button
        className={classnames(
          'jm_btn_wrapper',
          `jm_btn_${type}`,
          `jm_btn_${size}`,
          {
            jm_btn_hasIcon: icon,
            jm_btn_loading: loading,
            jm_btn_noShadow: noShadow,
            jm_btn_ghost: ghost,
            jm_btn_block: block,
          },
          className,
        )}
        type={htmlType}
        data-test="button"
        {...rest}
      >
        {icon && <Icon type={icon} style={{ fontSize: iconSize }} />}
        {children && <div className="jm_btn_content">{children}</div>}
        {loading && <Spin indicator={antIcon} />}
      </button>
    )
  }
}