import React from 'react'
import { Spin } from 'antd'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isEmpty, isFunction, get, throttle } from 'lodash'

import Empty from '../Empty'

import './index.less'

export default class ScrollLoad extends React.Component {
  static propTypes = {
    wrapperClassName: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    empty: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.node,
    ]),
    isEmpty: PropTypes.bool,
    loading: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    onFetch: PropTypes.func.isRequired,
  }

  static defaultProps = {
    wrapperClassName: '',
    width: '100%',
    height: '100%',
    isEmpty: false,
    loading: true,
    data: [],
    total: 10,
    page: 1,
    onFetch() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      loading: props.loading,
      loadMore: false,
    }

    this.containerRef = React.createRef()
  }

  componentDidMount() {
    this.props.onFetch()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading !== this.props.loading) {
      if (this.state.loadMore) {
        this.setState({
          loading: false,
          loadMore: this.isRemainingData(nextProps),
        })
      } else {
        this.setState({ loading: nextProps.loading })
      }
    }
  }

  isRemainingData = ({ data, total }) => !isEmpty(data) && data.length < total

  isElementAtBottom = ele =>
    Math.abs(ele.scrollTop + ele.clientHeight - ele.scrollHeight) < 1

  handleScroll = throttle(() => {
    const ele = get(this.containerRef, 'current') || {}

    if (this.isRemainingData(this.props) && this.isElementAtBottom(ele)) {
      this.setState({ loadMore: true }, () => {
        const { page, onFetch } = this.props
        onFetch({ more: true, page: page + 1 })
      })
    }
  }, 300)

  renderContent() {
    const { empty, data, loading, children } = this.props
    const { loadMore } = this.state

    if (loading && !loadMore) {
      return null
    }

    if (this.props.isEmpty || isEmpty(data) || !children) {
      return empty || <Empty className="jm_scrollload_empty" desc="暂无数据" />
    }

    return isFunction(children) ? children(data) : children
  }

  render() {
    const { wrapperClassName, className, width, minHeight, height } = this.props
    const { loading, loadMore } = this.state
    const allStyles = {
      width,
      height,
    }

    return (
      <div className={classnames('jm_scrollload_wrapper', wrapperClassName)}>
        <Spin spinning={loading}>
          <div
            ref={this.containerRef}
            className="jm_scrollload_main"
            style={allStyles}
            onScrollCapture={this.handleScroll}
          >
            <div
              className={classnames('jm_scrollload_content', className)}
              style={{ minHeight: minHeight || height }}
            >
              {this.renderContent()}
            </div>
            {loadMore && (
              <div className="jm_scrollload_loadMore">
                <Spin />
              </div>
            )}
          </div>
        </Spin>
      </div>
    )
  }
}
