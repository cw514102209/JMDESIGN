import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { get } from 'lodash'

import './index.less'

export default class Nav extends React.Component {
  static propTypes = {
    isDark: PropTypes.bool,
    route: PropTypes.object,
    match: PropTypes.object,
  }

  static defaultProps = {
    isDark: false,
    route: {},
    match: {},
  }

  render() {
    const { className, isDark, route, match } = this.props
    const routes = get(route, 'routes', [])

    return (
      <div
        className={classnames(
          'jm_nav_main',
          { jm_nav_dark: isDark },
          className
        )}
      >
        {routes.map(({ name, title }) => {
          if (!name) return null

          return (
            <NavLink
              key={name}
              className="jm_nav_item"
              activeClassName="jm_nav_active"
              to={`${match.url}/${name}`}
            >
              {title}
            </NavLink>
          )
        })}
      </div>
    )
  }
}
