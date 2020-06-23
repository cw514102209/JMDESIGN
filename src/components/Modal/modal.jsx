import React from 'react'
import { Icon } from 'antd'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import ReactModal from 'react-modal'
import { omit, isUndefined } from 'lodash'

import Image from '../Image'
import Button from '../Button'

import './index.less'

ReactModal.defaultStyles.overlay = Object.assign(
  {},
  ReactModal.defaultStyles.overlay,
  {
    padding: 0,
    minWidth: 500,
    backgroundColor: 'rgba(35, 45, 65, 0.7)',
    zIndex: 2000,
    overflow: 'auto',
  },
)

ReactModal.defaultStyles.content = Object.assign(
  {},
  omit(ReactModal.defaultStyles.content, [
    'top',
    'left',
    'right',
    'bottom',
    'padding',
  ]),
  {
    width: 744,
    position: 'relative',
    margin: '0 auto',
  },
)

export default class Modal extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    headerClassName: PropTypes.string,
    bodyClassName: PropTypes.string,
    footerClassName: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    description: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    visible: PropTypes.bool,
    okText: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    cancelText: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    okButtonType: PropTypes.string,
    cancelButtonType: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    renderFooter: PropTypes.func,
    children: PropTypes.any,
    hideHeader: PropTypes.bool,
    hideFooter: PropTypes.bool,
    closable: PropTypes.bool,
    maskClosable: PropTypes.bool,
    fullScreen: PropTypes.bool,
    rightScreen: PropTypes.bool,
    disableSubmit: PropTypes.bool,
  }

  static defaultProps = {
    className: '',
    width: 600,
    visible: false,
    hideHeader: false,
    hideFooter: false,
    closable: true,
    maskClosable: true,
    fullScreen: false,
    rightScreen: false,
    isSubmitting: false,
    okButtonType: 'control',
    cancelButtonType: 'default',
    disableSubmit: false,
  }

  renderTitle() {
    const { icon, imageSrc, title, description, rightScreen } = this.props
    const size = rightScreen ? 48 : isUndefined(description) ? 20 : 40

    return (
      <div className="jm_modal_title">
        {imageSrc ? (
          <label className="jm_modal_image">
            <Image src={imageSrc} iconLetter={imageSrc} iconSize={size} />
          </label>
        ) : (
          icon && <Icon type={icon} style={{ fontSize: size }} />
        )}
        <div className="jm_modal_text">
          <div>{title}</div>
          {description && <p>{description}</p>}
        </div>
      </div>
    )
  }

  render() {
    const {
      className,
      width,
      visible,
      children,
      hideHeader,
      hideFooter,
      onOk,
      onCancel,
      okText,
      cancelText,
      okButtonType,
      cancelButtonType,
      closable,
      operations,
      headerClassName,
      bodyClassName,
      footerClassName,
      fullScreen,
      rightScreen,
      maskClosable,
      isSubmitting,
      icon,
      imageSrc,
      disableSubmit,
    } = this.props

    const style = {
      content: {},
    }

    const showIcon = (icon || imageSrc) && rightScreen

    if (!fullScreen && !rightScreen) {
      style.content.width = width
    }

    return (
      <ReactModal
        className={classnames('jm_modal_wrapper', className, {
          jm_modal_fullscreen: fullScreen,
          jm_modal_rightScreen: rightScreen,
        })}
        style={style}
        isOpen={visible}
        onRequestClose={onCancel}
        ariaHideApp={false}
        closeTimeoutMS={0}
        shouldCloseOnOverlayClick={maskClosable}
      >
        {!hideHeader && (
          <div className={classnames('jm_modal_header', headerClassName)}>
            {this.renderTitle()}
            {showIcon && (
              <div className="jm_modal_iconBg">
                {imageSrc ? (
                  <Image src={imageSrc} iconLetter={imageSrc} iconSize={200} />
                ) : (
                  <Icon type={icon} fontSize={{ fontSize: 200 }} />
                )}
              </div>
            )}
            {operations}
            {closable && (
              <Button
                className="jm_modal_close"
                icon="close"
                iconSize={24}
                type="control"
                onClick={onCancel}
                data-test="modal-close"
              />
            )}
          </div>
        )}
        <div className={classnames('jm_modal_body', bodyClassName)}>{children}</div>
        {!hideFooter && (
          <div className={classnames('jm_modal_footer', footerClassName)}>
            {onCancel && (
              <Button
                type={cancelButtonType}
                onClick={onCancel}
                data-test="modal-cancel"
              >
                {cancelText || '取消'}
              </Button>
            )}
            {onOk && (
              <Button
                type={okButtonType}
                loading={isSubmitting}
                disabled={disableSubmit || isSubmitting}
                onClick={onOk}
                data-test="modal-ok"
              >
                {okText || '确定'}
              </Button>
            )}
          </div>
        )}
      </ReactModal>
    )
  }
}
