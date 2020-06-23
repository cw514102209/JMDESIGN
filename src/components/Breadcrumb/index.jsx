import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import isEqual from 'react-fast-compare'
import { ReactComponent as BackIcon } from '../../assets/back.svg'

import './index.less'

export default class Breadcrumb extends React.Component {
  static propTypes = {
    routes: PropTypes.array,
    separator: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    backIcon: PropTypes.bool,
    goBack: PropTypes.func,
  }

  static defaultProps = {
    routes: [],
    separator: '/',
    backIcon: false,
    goBack() {
      window.history.back()
    },
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps.routes, this.props.routes)
  }

  preventDefault(event) {
    event.preventDefault()
  }

  render() {
    const { className, routes, separator, backIcon, goBack } = this.props

    const links = []
    routes.forEach((item, index) => {
      if (index === 0) {
        return links.push(
          <Link key={index} to={item.url}>
            {item.label}
          </Link>
        )
      }

      let link;

      if (index === routes.length - 1) {
        link = (
          <a key={index} onClick={this.preventDefault}>
            {item.label}
          </a>
        )
      } else {
        link = (
          <Link key={index} to={item.url}>
            {item.label}
          </Link>
        )
      }
      
      return links.push(
        <div key={`split-${index}`} className="jm_breadcrumb_split">
          {separator}
        </div>,
        link
      )
    })

    return (
      <div className={classnames('jm_breadcrumb_wrapper', className)}>
        {backIcon && <BackIcon onClick={goBack} />}
        {links}
      </div>
    )
  }
}
