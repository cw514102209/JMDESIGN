import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import empty from '../../assets/empty.png'

import './index.less'

export default class Empty extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    imageStyle: PropTypes.object,
  }

  static defaultProps = {
    image: empty,
    description: '暂时没有相关数据',
  }

  render() {
    const { className, image, description, imageStyle } = this.props

    return (
      <div className={classnames('jm_empty_wrapper', className)}>
        <img src={image} style={imageStyle} alt="暂无数据" />
        <div className={'jm_empty_content'}>{description}</div>
      </div>
    )
  }
}