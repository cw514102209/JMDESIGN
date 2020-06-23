import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import MarkdownIt from 'markdown-it'
import { Spin } from 'antd'

// import './index.less'

class Markdown extends React.Component {
  static propTypes = {
    source: PropTypes.string,
    hideLoading: PropTypes.bool,
    options: PropTypes.object,
  }

  static defaultProps = {
    hideLoading: false,
    source: '',
    options: {},
  }

  constructor(props) {
    super(props)

    this.iframeLoaded = false
    this.md = new MarkdownIt(props.options)
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    this.iframe.addEventListener('load', this.handleIFrameLoad)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.options !== this.props.options) {
      this.md = new MarkdownIt(nextProps.options)
    }
  }

  componentDidUpdate() {
    this.updateMarkdown()
  }

  componentWillUnmount() {
    this.iframe.removeEventListener('load', this.handleIFrameLoad)
    this.removeMediaListeners()
  }

  handleIFrameLoad = () => {
    this.iframeLoaded = true
    this.setState({
      loading: false,
    })
    this.updateMarkdown()
  }

  addMediaListeners() {
    const $document = this.iframe.contentDocument
    this.iframeMedias = $document.querySelectorAll('img, video, audio')

    if (this.iframeMedias && this.iframeMedias.length > 0) {
      Array.prototype.forEach.call(this.iframeMedias, img => {
        img.removeEventListener('load', this.updateIFrame)
        img.addEventListener('load', this.updateIFrame)
      })
    }
  }

  removeMediaListeners() {
    if (this.iframeMedias && this.iframeMedias.length > 0) {
      Array.prototype.forEach.call(this.iframeMedias, img => {
        img.removeEventListener('load', this.updateIFrame)
      })
    }
  }

  updateIFrame = () => {
    if (this.iframe) {
      this.iframe.style.height = `${this.iframe.contentWindow.document.body
        .scrollHeight + 16}px`
    }
  }

  updateMarkdown() {
    const $document = this.iframe.contentDocument
    if (this.iframeLoaded) {
      $document.body.innerHTML = this.md.render(this.props.source)
      this.iframe.style.height = `${$document.body.scrollHeight + 16}px`
    }

    this.removeMediaListeners()
    this.addMediaListeners()
  }

  handleIFrameRef = ref => {
    this.iframe = ref
  }

  render() {
    const { hideLoading, className } = this.props

    if (hideLoading) {
      return (
        <iframe
          className={classNames('jm_markdown', className)}
          ref={this.handleIFrameRef}
          src="/blank_md"
          name="frame_markdown"
          width="100%"
          frameBorder="0"
          scrolling="no"
        />
      )
    }

    return (
      <Spin spinning={this.state.loading}>
        <iframe
          className={classNames('jm_markdown', className)}
          ref={this.handleIFrameRef}
          src="/blank_md"
          name="frame_markdown"
          width="100%"
          frameBorder="0"
          scrolling="no"
        />
      </Spin>
    )
  }
}

export default Markdown
