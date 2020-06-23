import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { Icon } from 'antd'

import img from '../../assets/default-user.svg'

import './index.less'

export default class Avatar extends React.Component {
  static propTypes = {
    imgSize: PropTypes.number,
    src: PropTypes.string,
    icon: PropTypes.string,
    size: PropTypes.number,
    shape: PropTypes.oneOf(['circle', 'square']),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    to: PropTypes.string,
    alt: PropTypes.string,
  }

  static defaultProps = {
    size: 20,
    shape: 'circle',
  }

  render() {
    const { imgSize, src, icon, size, shape, title, description, to, alt } = this.props

    const titleComponent = to ? <Link to={to}>{title}</Link> : title

    return (
      <div
        className={classNames('jm_avatar_wrapper', { jm_avatar_link: to })}
      >
        {!src && !icon && (
          <img
            className="jm_avatar_image"
            src={img}
            alt="avatar"
          />
        )}
        {src && (
          <img
            className="jm_avatar_image"
            style={{ width: imgSize, height: imgSize }}
            src={src}
            alt={alt}
          />
        )}
        {icon && (
          <div className={classNames('jm_avatar_icon', { jm_avatar_square: shape === 'square' })}>
            <Icon className="jm_avatar_icon" type={icon} style={{ fontSize: size }} />
          </div>
        )}
        <div className="jm_avatar_text">
          <div className="jm_avatar_title">{titleComponent}</div>
          <div className="jm_avatar_description">{description}</div>
        </div>
      </div>
    )
  }
}
